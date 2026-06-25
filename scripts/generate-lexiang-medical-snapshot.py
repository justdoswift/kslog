#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DOCX = Path("/Users/gepeng/Downloads/乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx")
OUTPUT_PATH = ROOT / "src" / "lexiang-medical-snapshot.ts"
WORD_NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
SOURCE_DOC = "乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx"


@dataclass
class WordItem:
    kind: str
    value: str | list[list[str]]


def cell_text(element: ET.Element) -> str:
    return "".join(node.text or "" for node in element.findall(".//w:t", WORD_NS)).strip()


def table_rows(table: ET.Element) -> list[list[str]]:
    rows: list[list[str]] = []
    for tr in table.findall(".//w:tr", WORD_NS):
        cells = [cell_text(tc) for tc in tr.findall("./w:tc", WORD_NS)]
        if any(cells):
            rows.append(cells)
    return rows


def parse_docx(path: Path) -> list[WordItem]:
    with zipfile.ZipFile(path) as archive:
        root = ET.fromstring(archive.read("word/document.xml"))

    body = root.find("w:body", WORD_NS)
    if body is None:
        raise ValueError("missing word body")

    items: list[WordItem] = []
    for child in body:
        tag = child.tag.rsplit("}", 1)[-1]
        if tag == "p":
            text = cell_text(child)
            if text:
                items.append(WordItem("p", text))
        elif tag == "tbl":
            items.append(WordItem("tbl", table_rows(child)))
    return items


def normalize_header(value: str) -> str:
    return re.sub(r"\s+", "", value)


def header_index(header: list[str], *names: str) -> int | None:
    normalized = [normalize_header(cell) for cell in header]
    for name in names:
        if name in normalized:
            return normalized.index(name)
    return None


def read_cell(row: list[str], index: int | None) -> str:
    if index is None or index >= len(row):
        return ""
    return row[index].strip()


def is_param_table(rows: list[list[str]]) -> bool:
    if not rows:
        return False
    header = [normalize_header(cell) for cell in rows[0]]
    return "参数" in header and ("参数名称" in header or "参数说明" in header)


def is_interface_list_table(rows: list[list[str]]) -> bool:
    if not rows:
        return False
    header = [normalize_header(cell) for cell in rows[0]]
    return len(header) >= 4 and header[1] == "接口名称" and header[2] == "接口路径"


def collect_interface_list(items: list[WordItem]) -> dict[str, dict[str, str]]:
    result: dict[str, dict[str, str]] = {}
    current_category = ""
    for item in items:
        if item.kind != "tbl":
            continue
        rows = item.value
        assert isinstance(rows, list)
        if not is_interface_list_table(rows):
            continue
        for row in rows[1:]:
            if len(row) < 4 or not row[1].strip() or not row[2].strip():
                continue
            current_category = row[0].strip() or current_category
            result[row[1].strip()] = {
                "category": current_category,
                "listPath": row[2].strip(),
                "description": row[3].strip(),
            }
    return result


def section_indices(items: list[WordItem]) -> list[tuple[int, int]]:
    starts: list[int] = []
    for index, item in enumerate(items):
        if item.kind == "p" and re.match(r"^3\.\d+\.\d+\s+", str(item.value)):
            starts.append(index)

    sections: list[tuple[int, int]] = []
    for position, start in enumerate(starts):
        end = starts[position + 1] if position + 1 < len(starts) else len(items)
        sections.append((start, end))
    return sections


def extract_path(text: str) -> str | None:
    if "接口服务路径：" not in text:
        return None
    raw = text.split("接口服务路径：", 1)[1].strip()
    match = re.search(r"(/api/[^\s]+)$", raw)
    return match.group(1) if match else raw


def extract_section_metadata(items: list[WordItem], start: int, end: int) -> tuple[str | None, str]:
    path = None
    description = ""
    for item in items[start:end]:
        if item.kind != "p":
            continue
        text = str(item.value)
        path = path or extract_path(text)
        if text.startswith("接口描述："):
            description = text.split("接口描述：", 1)[1].strip()
    return path, description


def field_from_row(row: list[str], header: list[str], group: str) -> dict[str, str] | None:
    key_i = header_index(header, "参数", "参数名称")
    name_i = header_index(header, "参数名称", "参数说明")
    required_i = header_index(header, "必选", "必填", "是否必填")
    type_i = header_index(header, "类型", "类型定义", "数据类型")
    length_i = header_index(header, "长度")
    desc_i = header_index(header, "描述", "说明")

    key = read_cell(row, key_i)
    if not key or key == "参数":
        return None
    return {
        "key": key,
        "name": read_cell(row, name_i),
        "type": read_cell(row, type_i),
        "length": read_cell(row, length_i),
        "required": read_cell(row, required_i),
        "description": read_cell(row, desc_i),
        "group": group,
    }


def fields_from_table(rows: list[list[str]], group: str) -> list[dict[str, str]]:
    if not is_param_table(rows):
        return []
    header = rows[0]
    result: list[dict[str, str]] = []
    for row in rows[1:]:
        field = field_from_row(row, header, group)
        if field:
            result.append(field)
    return result


def default_value(field: dict[str, str]) -> Any:
    field_type = field.get("type", "").lower()
    if "list" in field_type:
        return []
    if any(token in field_type for token in ("number", "int", "decimal", "numeric", "double", "float")):
        return 0
    if "bool" in field_type:
        return False
    return ""


def template_from_fields(fields: list[dict[str, str]]) -> dict[str, Any]:
    return {field["key"]: default_value(field) for field in fields}


def extract_a_number(text: str) -> str | None:
    match = re.match(r"^A[-－](\d+)", text.strip(), re.I)
    return match.group(1) if match else None


def map_a_number_to_list_field(fields: list[dict[str, str]]) -> dict[str, str]:
    result: dict[str, str] = {}
    for field in fields:
        if "list" not in field.get("type", "").lower():
            continue
        match = re.search(r"详见A[-－](\d+)", field.get("description", ""), re.I)
        if match:
            result[match.group(1)] = field["key"]
    return result


def extract_label_key(label: str) -> str | None:
    compact = re.sub(r"\s+", "", label)
    match = re.search(r"([A-Za-z][A-Za-z0-9_]*)(?:$|[）)])", compact)
    return match.group(1) if match else None


def collect_input_tables(items: list[WordItem], start: int, end: int) -> list[tuple[str, list[list[str]]]]:
    tables: list[tuple[str, list[list[str]]]] = []
    in_input = False
    last_label = ""

    for item in items[start:end]:
        if item.kind == "p":
            text = str(item.value).strip()
            if text == "输入参数":
                in_input = True
                continue
            if in_input and text == "输出参数":
                break
            if in_input:
                last_label = text
            continue
        if in_input and item.kind == "tbl":
            rows = item.value
            assert isinstance(rows, list)
            if is_param_table(rows):
                tables.append((last_label, rows))
    return tables


def build_section_template(tables: list[tuple[str, list[list[str]]]]) -> tuple[list[dict[str, str]], dict[str, Any]]:
    if not tables:
        return [], {}

    main_fields = fields_from_table(tables[0][1], "请求参数")
    fields = list(main_fields)
    template = template_from_fields(main_fields)

    data_fields: list[dict[str, str]] = []
    nested_tables: list[tuple[str, str | None, list[dict[str, str]]]] = []

    for label, rows in tables[1:]:
        a_number = extract_a_number(label)
        group = label or "明细参数"
        table_fields = fields_from_table(rows, group)
        if not table_fields:
            continue
        fields.extend(table_fields)
        if a_number == "1" and "data" in template:
            data_fields = table_fields
        else:
            nested_tables.append((label, a_number, table_fields))

    if data_fields and "data" in template:
        data_template = template_from_fields(data_fields)
        list_key_by_a_number = map_a_number_to_list_field(data_fields)
        data_field_keys = {field["key"] for field in data_fields}
        assigned_nested_keys: set[str] = set()

        for label, a_number, nested_fields in nested_tables:
            label_key = extract_label_key(label)
            label_key_candidate = (
                label_key if label_key in data_field_keys and label_key not in assigned_nested_keys else None
            )
            nested_key = (
                label_key_candidate
                or (list_key_by_a_number.get(a_number) if a_number else None)
                or label_key
            )
            if nested_key:
                data_template[nested_key] = [template_from_fields(nested_fields)]
                assigned_nested_keys.add(nested_key)
        template["data"] = data_template

    return dedupe_fields(fields), template


def dedupe_fields(fields: list[dict[str, str]]) -> list[dict[str, str]]:
    seen: set[tuple[str, str, str]] = set()
    result: list[dict[str, str]] = []
    for field in fields:
        identity = (field["group"], field["key"], field["name"])
        if identity in seen:
            continue
        seen.add(identity)
        result.append(field)
    return result


def build_snapshot(items: list[WordItem]) -> list[dict[str, Any]]:
    interface_list = collect_interface_list(items)
    snapshot: list[dict[str, Any]] = []

    for start, end in section_indices(items):
        section_title = str(items[start].value)
        name = re.sub(r"^3\.\d+\.\d+\s+", "", section_title).strip()
        if name == "获取自助开票二维码":
            continue
        path, description = extract_section_metadata(items, start, end)
        if not path:
            continue
        tables = collect_input_tables(items, start, end)
        fields, template = build_section_template(tables)
        list_entry = interface_list.get(name, {})
        snapshot.append(
            {
                "category": list_entry.get("category", ""),
                "name": name,
                "path": path,
                "method": "POST",
                "description": description or list_entry.get("description", ""),
                "sourceDoc": SOURCE_DOC,
                "sectionTitle": section_title,
                "fields": fields,
                "template": template,
            }
        )

    return snapshot


def write_output(snapshot: list[dict[str, Any]]) -> None:
    payload = json.dumps(snapshot, ensure_ascii=False, indent=2)
    output = (
        'import type { LexiangInterfaceInfo } from "./types.js";\n\n'
        "// Generated by scripts/generate-lexiang-medical-snapshot.py.\n"
        "// Source Word document is intentionally not bundled with the package.\n"
        f"export const LEXIANG_MEDICAL_INTERFACES = {payload} as const satisfies readonly LexiangInterfaceInfo[];\n"
    )
    OUTPUT_PATH.write_text(output, encoding="utf-8")


def main() -> int:
    docx_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_DOCX
    if not docx_path.exists():
        print(f"docx does not exist: {docx_path}", file=sys.stderr)
        return 1
    snapshot = build_snapshot(parse_docx(docx_path))
    write_output(snapshot)
    print(f"generated {len(snapshot)} interfaces -> {OUTPUT_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

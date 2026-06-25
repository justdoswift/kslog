export declare const LEXIANG_GENERAL_INTERFACES: readonly [{
    readonly category: "登录认证";
    readonly name: "请求登录电子税务局";
    readonly path: "/api/standard/v1/rpa/100101001";
    readonly method: "POST";
    readonly description: "请求登录电子税务局。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.1.1 请求登录电子税务局";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号/统一社会信用代码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "开票点编码";
        readonly group: "请求参数";
    }, {
        readonly key: "ywxt";
        readonly name: "业务系统";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "0:进项业务系统 1:销项业务系统默认1:销项业务系统";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly kpdbm: "";
        readonly ywxt: "";
    };
}, {
    readonly category: "登录认证";
    readonly name: "确认登录电子税务局";
    readonly path: "/api/standard/v1/rpa/100101002";
    readonly method: "POST";
    readonly description: "根据纳税人识别号、办税员账号、手机验证码信息向乐享平台发起确认登录请求，登录电子税务局。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.1.2 确认登录电子税务局";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号/统一社会信用代码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "dxyzm";
        readonly name: "短信验证码";
        readonly type: "String";
        readonly length: "6";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "ywxt";
        readonly name: "业务系统";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "0:进项业务系统 1:销项业务系统默认1:销项业务系统";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly kpdbm: "";
        readonly dxyzm: "";
        readonly ywxt: "";
    };
}, {
    readonly category: "登录认证";
    readonly name: "请求电子税务局二维码认证";
    readonly path: "/api/standard/v1/rpa/100101004";
    readonly method: "POST";
    readonly description: "根据纳税人识别号、办税员账号向乐享平台发起电子税务局二维码认证请求。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.1.3 请求电子税务局二维码认证";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号/统一社会信用代码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly kpdbm: "";
    };
}, {
    readonly category: "登录认证";
    readonly name: "查询电子税务局登陆及身份授权状态";
    readonly path: "/api/standard/v1/rpa/100101003";
    readonly method: "POST";
    readonly description: "根据纳税人识别号、办税员账号向乐享平台查询电子税务局登陆和身份授权状态。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.1.4 查询电子税务局登陆及身份授权状态";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号/统一社会信用代码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "ywxt";
        readonly name: "业务系统";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "0:进项业务系统 1:销项业务系统默认1:销项业务系统";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly kpdbm: "";
        readonly ywxt: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "全电蓝字发票开具";
    readonly path: "/api/standard/v1/rpa/102101001";
    readonly method: "POST";
    readonly description: "数电蓝字发票开具接口，支持不动产经营租赁、不动产销售、自产农产品销售、农产品收购、旅客运输、货物运输等特定行业数电发票开具。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.1 全电蓝字发票开具";
    readonly fields: [{
        readonly key: "serialNumber";
        readonly name: "流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "是";
        readonly description: "用于唯一标识一笔业务，针对同一笔业务若变更流水号则会导致重复开票";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "data";
        readonly name: "发票数据";
        readonly type: "Object";
        readonly length: "";
        readonly required: "是";
        readonly description: "发票数据，详见A-1发票数据data";
        readonly group: "请求参数";
    }, {
        readonly key: "kpms";
        readonly name: "开票模式";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "0:直接开具，1、审核开票(仅推送待开信息，在乐享平台审核开具)。如未传入，默认直接开具。";
        readonly group: "请求参数";
    }, {
        readonly key: "callBackUrl";
        readonly name: "回调地址";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "如果传入回调地址，则根据回调地址主动推送开票结果；详见：回传全电发票开具结果（单笔）";
        readonly group: "请求参数";
    }, {
        readonly key: "fppz";
        readonly name: "发票票种";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "发票票种。01：全电专；02：全电普。";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "tdys";
        readonly name: "特定要素";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "特定要素详见附录1";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "cezslxDm";
        readonly name: "差额征税类型代码";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "空：非差额发票 01：全额开票 02：差额开票值为01,02时，发票明细只能一行";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "cekcqd";
        readonly name: "差额扣除清单";
        readonly type: "List";
        readonly length: "";
        readonly required: "否";
        readonly description: "当差额征税类型代码/cezslxDm不为空，且发票明细扣除额大于0时，必传。详见A-9差额扣除清单";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfnsrsbh";
        readonly name: "（销售方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "（销售方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfmc";
        readonly name: "(销售方)名称";
        readonly type: "String";
        readonly length: "300";
        readonly required: "是";
        readonly description: "(销售方)名称";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfdz";
        readonly name: "销售方地址";
        readonly type: "String";
        readonly length: "300";
        readonly required: "否";
        readonly description: "销售方地址";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfdh";
        readonly name: "销售方电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "销售方电话";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sfzsxsfdwdz";
        readonly name: "是否展示销售方地址电话";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：展示 N：不展示。默认N:不展示";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfkhh";
        readonly name: "销售方开户行";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "销售方开户行";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfzh";
        readonly name: "销售方账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "销售方账号";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sfzsxsfyhzh";
        readonly name: "是否展示销售方银行账号";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：展示 N：不展示。默认N:不展示";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfzrrbz";
        readonly name: "销售方自然人标志";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：销售方是自然人，N：销售方非自 然人。未传入则默认为：N 非自然人。";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfnsrsbh";
        readonly name: "（购买方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "否";
        readonly description: "（购买方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfmc";
        readonly name: "(购买方)名称";
        readonly type: "String";
        readonly length: "300";
        readonly required: "是";
        readonly description: "(购买方)名称";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfdz";
        readonly name: "购买方地址";
        readonly type: "String";
        readonly length: "300";
        readonly required: "否";
        readonly description: "购买方地址";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfdh";
        readonly name: "购买方电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "购买方电话";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sfzsgmfdwdz";
        readonly name: "是否展示购买方地址电话";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：展示 N：不展示。默认N:不展示";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfkhh";
        readonly name: "购买方开户行";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "购买方开户行";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfzh";
        readonly name: "购买方账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "购买方账号";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sfzsgmfyhzh";
        readonly name: "是否展示购买方银行账号";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：展示 N：不展示 默认N:不展示";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfjbr";
        readonly name: "购买方经办人姓名";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "购买方经办人姓名";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jbrsfzjhm";
        readonly name: "购买方经办人证件号码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "购买方经办人证件号码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfjbrlxdh";
        readonly name: "购买方经办人联系电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "购买方经办人联系电话";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfzrrbz";
        readonly name: "购买方自然人标志";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：购买方是自然人，N：购买方非自 然人。未传入则默认为非自然人。";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hjje";
        readonly name: "合计金额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "合计金额";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hjse";
        readonly name: "合计税额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "合计税额";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jshj";
        readonly name: "价税合计";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "价税合计";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "skyhmc";
        readonly name: "收款银行名称";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "收款银行名称";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "skyhzh";
        readonly name: "收款银行账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "收款银行账号";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jsfs";
        readonly name: "结算方式";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "结算方式详见附录2";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ysxwfsd";
        readonly name: "应税行为发生地";
        readonly type: "String";
        readonly length: "11";
        readonly required: "否";
        readonly description: "应税行为发生地";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "kpr";
        readonly name: "开票人";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "开票人";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "kprzjhm";
        readonly name: "开票人证件号码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "开票人证件号码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "kprzjlx";
        readonly name: "开票人证件类型";
        readonly type: "String";
        readonly length: "4";
        readonly required: "否";
        readonly description: "开票人证件类型";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "skrxm";
        readonly name: "收款人姓名";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "fhrxm";
        readonly name: "复核人姓名";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "bz";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "200";
        readonly required: "否";
        readonly description: "备注";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "bdczlfwList";
        readonly name: "不动产租赁服务";
        readonly type: "List";
        readonly length: "";
        readonly required: "否";
        readonly description: "当特定要素/tdys传06，开具不动产租赁服务发票时需填写，详见A-4 不动产租赁服务注：不动产租赁服务发票明细/并且规格型号必须为空，单位必须填写不动产面积单位编码，详见附录18:不动产面积单位";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "bdcxsfw";
        readonly name: "不动产销售服务";
        readonly type: "Object";
        readonly length: "";
        readonly required: "否";
        readonly description: "当特定要素/tdys传05，开具不动产销售服务发票时需填写，详见A-5 不动产销售服务注：不动产销售服务发票明细/并且规格型号必须为空，单位必须填写不动产面积单位编码，详见附录18:不动产面积单位";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ncpsg";
        readonly name: "农产品收购";
        readonly type: "Object";
        readonly length: "";
        readonly required: "否";
        readonly description: "当特定要素/tdys传16，开具农产品收购发票时需填写，详见A-6 农产品收购注：开具农产品收购发票时，购买方相关入参应填写开票方数据，销售方相关入参根据销售对象实际情况填写";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hwys";
        readonly name: "货物运输";
        readonly type: "List";
        readonly length: "";
        readonly required: "否";
        readonly description: "当特定要素/tdys传04，开具货物运输服务发票时需填写，详见A-7 货物运输JSON格式列表。特殊业务信息支持多个list，建议不要超2000行";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jzfw";
        readonly name: "建筑服务";
        readonly type: "Object";
        readonly length: "";
        readonly required: "否";
        readonly description: "当特定要素/tdys传03，开具建筑服务发票时需填写，详见A-8 建筑服务。";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "lkys";
        readonly name: "旅客运输";
        readonly type: "List";
        readonly length: "";
        readonly required: "否";
        readonly description: "当特定要素/tdys传09，开具旅客运输服务发票时需填写，详见A-10 旅客运输JSON格式列表";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zfbzh";
        readonly name: "交款人支付宝账户";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "交款人如果使用支付宝结算，可传入交款人的支付宝UserID，用于电子票据归集到支付宝发票管家";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "wxddh";
        readonly name: "微信支付订单号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "微信结算时，可传入交款人支付成功的订单号，用来发微信服务通知";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sjhm";
        readonly name: "发票接收手机号";
        readonly type: "String";
        readonly length: "11";
        readonly required: "否";
        readonly description: "如需要用于电子票归集、电子票据短信通知，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "yxdz";
        readonly name: "发票接收邮箱";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "如需用于电子票归集、电子票据邮箱通知，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ywlx";
        readonly name: "业务类型";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ywdh";
        readonly name: "业务单号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ywrq";
        readonly name: "业务日期";
        readonly type: "Date";
        readonly length: "";
        readonly required: "否";
        readonly description: "yyyy-MM-dd HH:mm:ss";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hth";
        readonly name: "合同号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "fpmx";
        readonly name: "发票明细";
        readonly type: "List";
        readonly length: "";
        readonly required: "是";
        readonly description: "发票明细详见A-2,JSON格式列表";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "fjys";
        readonly name: "附加要素";
        readonly type: "List";
        readonly length: "";
        readonly required: "否";
        readonly description: "附加要素详见A-3,JSON格式列表";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "煤炭发热量";
        readonly name: "否";
        readonly type: "5";
        readonly length: "煤炭开票金额超过一千万时必填。";
        readonly required: "String";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "干基全硫";
        readonly name: "否";
        readonly type: "5";
        readonly length: "煤炭开票金额超过一千万时必填。";
        readonly required: "String";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "干燥无灰基挥发分";
        readonly name: "否";
        readonly type: "5";
        readonly length: "煤炭开票金额超过一千万时必填。";
        readonly required: "String";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "mxxh";
        readonly name: "明细序号";
        readonly type: "Number";
        readonly length: "8";
        readonly required: "是";
        readonly description: "明细序号";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "xmmc";
        readonly name: "项目名称";
        readonly type: "String";
        readonly length: "200";
        readonly required: "是";
        readonly description: "项目名称，无需传入简称";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "ggxh";
        readonly name: "规格型号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "规格型号";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "dw";
        readonly name: "单位";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "单位";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "sl";
        readonly name: "数量";
        readonly type: "String";
        readonly length: "15,13";
        readonly required: "否";
        readonly description: "数量如“单位”栏次非空，则本栏次必须非空开具成品油特定要素发票时，小数位最多8位";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "dj";
        readonly name: "单价";
        readonly type: "String";
        readonly length: "15,13";
        readonly required: "否";
        readonly description: "单价如“单位”栏次非空，则本栏次必须非空";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "je";
        readonly name: "金额（不含税）";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "金额（不含税）";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "slv";
        readonly name: "增值税税率/征收率";
        readonly type: "Number";
        readonly length: "10,6";
        readonly required: "是";
        readonly description: "增值税税率/征收率";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "se";
        readonly name: "税额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "税额";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "hsje";
        readonly name: "含税金额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "含税金额";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "kce";
        readonly name: "扣除额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "否";
        readonly description: "扣除额差额征税类型代码为“01：全额开票”时，0<=扣除额<=含税金额；差额征税类型代码为“02：差额开票”时，0<扣除额<=含税金额；扣除额不为 0 的时候必须填写差额扣除清单，且所有差额扣除凭证“本次扣除金额”之和应当等于扣除额;";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "spfwssflbm";
        readonly name: "商品和服务税收分类编码";
        readonly type: "String";
        readonly length: "19";
        readonly required: "是";
        readonly description: "商品和服务税收分类编码";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "fphxz";
        readonly name: "发票行性质";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "发票行性质00:正常行01:折扣行02:被折扣行";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "yhzcbs";
        readonly name: "优惠政策标识";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "优惠政策标识详见附录3";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "mtzldm";
        readonly name: "煤炭种类代码";
        readonly type: "String";
        readonly length: "4";
        readonly required: "否";
        readonly description: "税收分类编码为1020101000000000000、1020102000000000000、1020199000000000000必填。煤炭种类代码详见附录23";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "fjysmc";
        readonly name: "附加要素名称";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "附加要素名称";
        readonly group: "A-3 附加要素fjys";
    }, {
        readonly key: "fjyslx";
        readonly name: "附加要素类型";
        readonly type: "String";
        readonly length: "10";
        readonly required: "否";
        readonly description: "附加要素类型";
        readonly group: "A-3 附加要素fjys";
    }, {
        readonly key: "fjysz";
        readonly name: "附加要素值";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "附加要素值";
        readonly group: "A-3 附加要素fjys";
    }, {
        readonly key: "cqzsbh";
        readonly name: "产权证书/不动产权证号";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "产权证书/不动产权证号，需必填无“产权证书/不动产权证号”时，填写“无“";
        readonly group: "A-4 不动产租赁服务";
    }, {
        readonly key: "bdcdzS";
        readonly name: "不动产地址省";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "必须以省、自治区、特别行政区、北京市、 天津市、上海市、重庆市任意一个关键词结尾";
        readonly group: "A-4 不动产租赁服务";
    }, {
        readonly key: "bdcdzS1";
        readonly name: "不动产地址市";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须以市、盟、自治州、地区任意一个关键词结尾，如福州市";
        readonly group: "A-4 不动产租赁服务";
    }, {
        readonly key: "bdcdzXQ";
        readonly name: "不动产县区";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须区、县任意一个关键词结尾，如鼓楼区";
        readonly group: "A-4 不动产租赁服务";
    }, {
        readonly key: "bdcxxdz";
        readonly name: "不动产详细地址";
        readonly type: "String";
        readonly length: "80";
        readonly required: "是";
        readonly description: "不动产详细地址，必须包含街、路、村、乡、镇、道、巷、号任意一个关键词，如魁岐东路136号";
        readonly group: "A-4 不动产租赁服务";
    }, {
        readonly key: "zlqq";
        readonly name: "租赁期起";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "格式:yyyy-MM-dd";
        readonly group: "A-4 不动产租赁服务";
    }, {
        readonly key: "zlqz";
        readonly name: "租赁期止";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "格式:yyyy-MM-dd";
        readonly group: "A-4 不动产租赁服务";
    }, {
        readonly key: "kdsbz";
        readonly name: "跨地（市）标志";
        readonly type: "String";
        readonly length: "1";
        readonly required: "是";
        readonly description: "Y:是 N:否";
        readonly group: "A-4 不动产租赁服务";
    }, {
        readonly key: "bdcxstdys";
        readonly name: "不动产销售特定要素";
        readonly type: "List";
        readonly length: "";
        readonly required: "是";
        readonly description: "不动产销售特定要素信息，详见A-5.1不动产销售特定要素信息列表";
        readonly group: "A-5 不动产销售服务";
    }, {
        readonly key: "dfgtgmbz";
        readonly name: "多方共同购买标志";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "当特定要素/tdys传05，开具不动产销售服务发票时需填；Y：多方共同购买 N：非多方共同购买不填默认N:非多方共同购买";
        readonly group: "A-5 不动产销售服务";
    }, {
        readonly key: "gtgmfxx";
        readonly name: "共同购买方信息";
        readonly type: "List";
        readonly length: "";
        readonly required: "否";
        readonly description: "当多方共同购买标志/dfgtgmbz为Y时，必填，详见A-5.2 共同购买方信息";
        readonly group: "A-5 不动产销售服务";
    }, {
        readonly key: "cqzsbh";
        readonly name: "产权证书/不动产权证号";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "产权证书/不动产权证号，需必填无“产权证书/不动产权证号”时，填写“无”";
        readonly group: "A-5.1 不动产销售特定要素列表";
    }, {
        readonly key: "bdcdzS";
        readonly name: "不动产地址省";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "必须以省、自治区、特别行政区、北京市、 天津市、上海市、重庆市任意一个关键词结尾";
        readonly group: "A-5.1 不动产销售特定要素列表";
    }, {
        readonly key: "bdcdzS1";
        readonly name: "不动产地址市";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须以市、盟、自治州、地区任意一个关键词结尾,如福州市";
        readonly group: "A-5.1 不动产销售特定要素列表";
    }, {
        readonly key: "bdcdzXQ";
        readonly name: "不动产县区";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须区、县任意一个关键词结尾，如鼓楼区";
        readonly group: "A-5.1 不动产销售特定要素列表";
    }, {
        readonly key: "bdcxxdz";
        readonly name: "不动产详细地址";
        readonly type: "String";
        readonly length: "80";
        readonly required: "是";
        readonly description: "不动产详细地址，必须包含街、路、村、乡、镇、道、巷、号任意一个关键词，如魁岐东路136号";
        readonly group: "A-5.1 不动产销售特定要素列表";
    }, {
        readonly key: "bdcdwdm";
        readonly name: "不动产单位代码";
        readonly type: "String";
        readonly length: "28";
        readonly required: "否";
        readonly description: "“不动产单位代码”和“网签合同备案编号”两者只能填一个";
        readonly group: "A-5.1 不动产销售特定要素列表";
    }, {
        readonly key: "wqhtbabh";
        readonly name: "网签合同备案编 号";
        readonly type: "String";
        readonly length: "28";
        readonly required: "否";
        readonly description: "“不动产单位代码”和“网签合同备案编号”两者只能填一个";
        readonly group: "A-5.1 不动产销售特定要素列表";
    }, {
        readonly key: "tdzzsxmbh";
        readonly name: "土地增值税项目 编号";
        readonly type: "String";
        readonly length: "16";
        readonly required: "否";
        readonly description: "土地增值税项目编号";
        readonly group: "A-5.1 不动产销售特定要素列表";
    }, {
        readonly key: "hdjsjg";
        readonly name: "核定计税价格";
        readonly type: "Number";
        readonly length: "18,2";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-5.1 不动产销售特定要素列表";
    }, {
        readonly key: "sjcjhsje";
        readonly name: "实际成交含税金额";
        readonly type: "Number";
        readonly length: "18,2";
        readonly required: "否";
        readonly description: "当核定计税价格有值时必须填写";
        readonly group: "A-5.1 不动产销售特定要素列表";
    }, {
        readonly key: "kdsbz";
        readonly name: "跨地（市）标志";
        readonly type: "String";
        readonly length: "1";
        readonly required: "是";
        readonly description: "Y:是 N:否";
        readonly group: "A-5.1 不动产销售特定要素列表";
    }, {
        readonly key: "gtgmf";
        readonly name: "共同购买方";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "只能填写汉字、英文大小写";
        readonly group: "A-5.2共同购买方信息列表";
    }, {
        readonly key: "zjlx";
        readonly name: "证件类型";
        readonly type: "String";
        readonly length: "3";
        readonly required: "否";
        readonly description: "详见附录20：证件类型";
        readonly group: "A-5.2共同购买方信息列表";
    }, {
        readonly key: "zjhm";
        readonly name: "证件号码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-5.2共同购买方信息列表";
    }, {
        readonly key: "ncpsgzjlx";
        readonly name: "农产品收购证件类型";
        readonly type: "String";
        readonly length: "3";
        readonly required: "是";
        readonly description: "详见附录21：农产品收购证件类型";
        readonly group: "A-6 农产品收购";
    }, {
        readonly key: "xsfzrrzjlxDm";
        readonly name: "销售方自然人证件类型";
        readonly type: "String";
        readonly length: "3";
        readonly required: "否";
        readonly description: "乐企模式必填;见附录24：销售方自然人证件类型";
        readonly group: "A-6 农产品收购";
    }, {
        readonly key: "xsfzrrzjhm";
        readonly name: "销售方自然人证件号码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "乐企模式必填";
        readonly group: "A-6 农产品收购";
    }, {
        readonly key: "xsfzrrgjDm";
        readonly name: "销售方自然人国籍代码";
        readonly type: "String";
        readonly length: "3";
        readonly required: "否";
        readonly description: "乐企模式必填:见附录25：销售方自然人国籍代码";
        readonly group: "A-6 农产品收购";
    }, {
        readonly key: "ysgjzl";
        readonly name: "运输工具种类";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "填写运输工具种类编码，详见附录19：运输工具种类";
        readonly group: "A-7 货物运输";
    }, {
        readonly key: "ysgjph";
        readonly name: "运输工具牌号";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-7 货物运输";
    }, {
        readonly key: "qydS";
        readonly name: "起运地省";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "必须以省、自治区、特别行政区、北京市、 天津市、上海市、重庆市任意一个关键词结尾";
        readonly group: "A-7 货物运输";
    }, {
        readonly key: "qydS1";
        readonly name: "起运地市";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须以市、盟、自治州、地区任意一个关键词结尾,如福州市";
        readonly group: "A-7 货物运输";
    }, {
        readonly key: "qydXQ";
        readonly name: "起运地县区";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须区、县任意一个关键词结尾，如鼓楼区";
        readonly group: "A-7 货物运输";
    }, {
        readonly key: "dddS";
        readonly name: "到达地省";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "必须以省、自治区、特别行政区、北京市、 天津市、上海市、重庆市任意一个关键词结尾";
        readonly group: "A-7 货物运输";
    }, {
        readonly key: "dddS1";
        readonly name: "到达地市";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须以市、盟、自治州、地区任意一个关键词结尾,如福州市";
        readonly group: "A-7 货物运输";
    }, {
        readonly key: "dddXQ";
        readonly name: "到达地县区";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须区、县任意一个关键词结尾，如鼓楼区";
        readonly group: "A-7 货物运输";
    }, {
        readonly key: "yshwmc";
        readonly name: "运输货物名称";
        readonly type: "String";
        readonly length: "80";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-7 货物运输";
    }, {
        readonly key: "tdzzsxmbh";
        readonly name: "土地增值税项目 编号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "土地增值税项目编号";
        readonly group: "A-8 建筑服务";
    }, {
        readonly key: "fwfsdS";
        readonly name: "服务发生地省";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "必须以省、自治区、特别行政区、北京市、 天津市、上海市、重庆市任意一个关键词结尾";
        readonly group: "A-8 建筑服务";
    }, {
        readonly key: "fwfsdS1";
        readonly name: "服务发生地市";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须以市、盟、自治州、地区任意一个关键词结尾,如福州市";
        readonly group: "A-8 建筑服务";
    }, {
        readonly key: "fwfsdXQ";
        readonly name: "服务发生地区县";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须区、县任意一个关键词结尾，如鼓楼区";
        readonly group: "A-8 建筑服务";
    }, {
        readonly key: "fwfsdxxdz";
        readonly name: "服务发生地详细地址";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "服务发生地详细地址";
        readonly group: "A-8 建筑服务";
    }, {
        readonly key: "jzxmmc";
        readonly name: "建筑项目名称";
        readonly type: "String";
        readonly length: "80";
        readonly required: "是";
        readonly description: "建筑项目名称";
        readonly group: "A-8 建筑服务";
    }, {
        readonly key: "kdsbz";
        readonly name: "跨地（市）标志";
        readonly type: "String";
        readonly length: "1";
        readonly required: "是";
        readonly description: "Y:是 N:否";
        readonly group: "A-8 建筑服务";
    }, {
        readonly key: "pzlx";
        readonly name: "凭证类型";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "见附录22差额征税凭证类型";
        readonly group: "A-9 差额扣除清单";
    }, {
        readonly key: "fpdm";
        readonly name: "发票代码";
        readonly type: "String";
        readonly length: "12";
        readonly required: "否";
        readonly description: "凭证类型02，03，04时，必传";
        readonly group: "A-9 差额扣除清单";
    }, {
        readonly key: "fphm";
        readonly name: "发票号码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "凭证类型01，02，03，04时，必传";
        readonly group: "A-9 差额扣除清单";
    }, {
        readonly key: "cepzhm";
        readonly name: "差额凭证号码";
        readonly type: "String";
        readonly length: "40";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-9 差额扣除清单";
    }, {
        readonly key: "kjrq";
        readonly name: "开具日期";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "格式：yyyy-MM-dd凭证类型01，02，03，04时，必传";
        readonly group: "A-9 差额扣除清单";
    }, {
        readonly key: "pzhjje";
        readonly name: "凭证合计金额";
        readonly type: "number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-9 差额扣除清单";
    }, {
        readonly key: "bckcje";
        readonly name: "本次扣除金额";
        readonly type: "number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "该值小于等于凭证合计金额";
        readonly group: "A-9 差额扣除清单";
    }, {
        readonly key: "bz";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "凭证类型08，09时，必传";
        readonly group: "A-9 差额扣除清单";
    }, {
        readonly key: "cxr";
        readonly name: "出行人";
        readonly type: "String";
        readonly length: "50";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-10 旅客运输";
    }, {
        readonly key: "cxrq";
        readonly name: "出行日期";
        readonly type: "Date";
        readonly length: "10";
        readonly required: "是";
        readonly description: "格式：yyyy-MM-dd";
        readonly group: "A-10 旅客运输";
    }, {
        readonly key: "sfzjlx";
        readonly name: "身份证件类型";
        readonly type: "String";
        readonly length: "50";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-10 旅客运输";
    }, {
        readonly key: "sfzjhm";
        readonly name: "身份证件号码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-10 旅客运输";
    }, {
        readonly key: "cfdS";
        readonly name: "出发地省";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "必须以省、自治区、特别行政区、北京市、 天津市、上海市、重庆市任意一个关键词结尾";
        readonly group: "A-10 旅客运输";
    }, {
        readonly key: "cfdS1";
        readonly name: "出发地市";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须以市、盟、自治州、地区任意一个关键词结尾,如福州市";
        readonly group: "A-10 旅客运输";
    }, {
        readonly key: "cfdXQ";
        readonly name: "出发地县区";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须区、县任意一个关键词结尾，如鼓楼区";
        readonly group: "A-10 旅客运输";
    }, {
        readonly key: "dddS";
        readonly name: "到达地省";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "必须以省、自治区、特别行政区、北京市、 天津市、上海市、重庆市任意一个关键词结尾";
        readonly group: "A-10 旅客运输";
    }, {
        readonly key: "dddS1";
        readonly name: "到达地市";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须以市、盟、自治州、地区任意一个关键词结尾,如福州市";
        readonly group: "A-10 旅客运输";
    }, {
        readonly key: "dddXQ";
        readonly name: "到达地县区";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "必须区、县任意一个关键词结尾，如鼓楼区";
        readonly group: "A-10 旅客运输";
    }, {
        readonly key: "jtgjlx";
        readonly name: "交通工具类型";
        readonly type: "String";
        readonly length: "5";
        readonly required: "是";
        readonly description: "填写交通工具类型编码，详见附录15 交通工具类型";
        readonly group: "A-10 旅客运输";
    }, {
        readonly key: "jtgjdj";
        readonly name: "交通工具等级";
        readonly type: "String";
        readonly length: "5";
        readonly required: "否";
        readonly description: "当交通工具类型/jtgjlx值为1、2、7时必填，填写交通工具等级编码，详见附录16 交通工具等级";
        readonly group: "A-10 旅客运输";
    }];
    readonly template: {
        readonly serialNumber: "";
        readonly kpdbm: "";
        readonly data: {
            readonly fppz: "";
            readonly tdys: "";
            readonly cezslxDm: "";
            readonly cekcqd: [{
                readonly pzlx: "";
                readonly fpdm: "";
                readonly fphm: "";
                readonly cepzhm: "";
                readonly kjrq: "";
                readonly pzhjje: 0;
                readonly bckcje: 0;
                readonly bz: "";
            }];
            readonly xsfnsrsbh: "";
            readonly xsfmc: "";
            readonly xsfdz: "";
            readonly xsfdh: "";
            readonly sfzsxsfdwdz: "";
            readonly xsfkhh: "";
            readonly xsfzh: "";
            readonly sfzsxsfyhzh: "";
            readonly xsfzrrbz: "";
            readonly gmfnsrsbh: "";
            readonly gmfmc: "";
            readonly gmfdz: "";
            readonly gmfdh: "";
            readonly sfzsgmfdwdz: "";
            readonly gmfkhh: "";
            readonly gmfzh: "";
            readonly sfzsgmfyhzh: "";
            readonly gmfjbr: "";
            readonly jbrsfzjhm: "";
            readonly gmfjbrlxdh: "";
            readonly gmfzrrbz: "";
            readonly hjje: 0;
            readonly hjse: 0;
            readonly jshj: 0;
            readonly skyhmc: "";
            readonly skyhzh: "";
            readonly jsfs: "";
            readonly ysxwfsd: "";
            readonly kpr: "";
            readonly kprzjhm: "";
            readonly kprzjlx: "";
            readonly skrxm: "";
            readonly fhrxm: "";
            readonly bz: "";
            readonly bdczlfwList: [{
                readonly cqzsbh: "";
                readonly bdcdzS: "";
                readonly bdcdzS1: "";
                readonly bdcdzXQ: "";
                readonly bdcxxdz: "";
                readonly zlqq: "";
                readonly zlqz: "";
                readonly kdsbz: "";
            }];
            readonly bdcxsfw: "";
            readonly ncpsg: "";
            readonly hwys: [{
                readonly ysgjzl: "";
                readonly ysgjph: "";
                readonly qydS: "";
                readonly qydS1: "";
                readonly qydXQ: "";
                readonly dddS: "";
                readonly dddS1: "";
                readonly dddXQ: "";
                readonly yshwmc: "";
            }];
            readonly jzfw: "";
            readonly lkys: [{
                readonly cxr: "";
                readonly cxrq: "";
                readonly sfzjlx: "";
                readonly sfzjhm: "";
                readonly cfdS: "";
                readonly cfdS1: "";
                readonly cfdXQ: "";
                readonly dddS: "";
                readonly dddS1: "";
                readonly dddXQ: "";
                readonly jtgjlx: "";
                readonly jtgjdj: "";
            }];
            readonly zfbzh: "";
            readonly wxddh: "";
            readonly sjhm: "";
            readonly yxdz: "";
            readonly ywlx: "";
            readonly ywdh: "";
            readonly ywrq: "";
            readonly hth: "";
            readonly fpmx: [{
                readonly mxxh: 0;
                readonly xmmc: "";
                readonly ggxh: "";
                readonly dw: "";
                readonly sl: "";
                readonly dj: "";
                readonly je: 0;
                readonly slv: 0;
                readonly se: 0;
                readonly hsje: 0;
                readonly kce: 0;
                readonly spfwssflbm: "";
                readonly fphxz: "";
                readonly yhzcbs: "";
                readonly mtzldm: "";
            }];
            readonly fjys: [{
                readonly fjysmc: "";
                readonly fjyslx: "";
                readonly fjysz: "";
            }];
            readonly 煤炭发热量: "";
            readonly 干基全硫: "";
            readonly 干燥无灰基挥发分: "";
        };
        readonly kpms: "";
        readonly callBackUrl: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "全电红字发票开具（红字确认单申请并开具）";
    readonly path: "/api/standard/v1/rpa/102101008";
    readonly method: "POST";
    readonly description: "通过该接口发起红字确认单申请，如果发起方为销方且无需确认情况下，乐享平台自动开具出红票并返回红票信息；如果红字确认单需要接收方确认，乐享平台返回红字确认单信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.2 全电红字发票开具（红字确认单申请并开具）";
    readonly fields: [{
        readonly key: "serialNumber";
        readonly name: "流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "是";
        readonly description: "流水号";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "data";
        readonly name: "确认单数据";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "红字确认单数据，详见：A-1 确认单数据data";
        readonly group: "请求参数";
    }, {
        readonly key: "kpms";
        readonly name: "开票模式";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "0:直接开具，1、审核开票(仅推送待开信息，在乐享平台审核开具)。如未传入，默认直接开具。";
        readonly group: "请求参数";
    }, {
        readonly key: "callBackUrl";
        readonly name: "回调地址";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "如果传入回调地址，则根据回调地址主动推送开票结果；详见：回传全电发票开具结果（单笔）";
        readonly group: "请求参数";
    }, {
        readonly key: "fqfnsrsbh";
        readonly name: "发起方纳税人识别号";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "发起方纳税人识别号";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "lrfsf";
        readonly name: "录入方身份";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "0:销方，1:购方；不填默认为0:销方";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "jsfnsrsbh";
        readonly name: "接收方统一社会信用代码/纳税人识别号/身份证件号码";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "录入方身份为销方，冲红非乐享平台开具的蓝票时jsfnsrsbh和jsfmc不可同时为空";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "jsfmc";
        readonly name: "接收方名称";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "录入方身份为销方，冲红非乐享平台开具的蓝票时jsfnsrsbh和jsfmc不可同时为空";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "lzfpdm";
        readonly name: "蓝字发票发票代码";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "蓝字发票发票代码";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "lzfphm";
        readonly name: "蓝字发票发票号码";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "蓝字发票发票号码";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "lzkprq";
        readonly name: "蓝字发票开票日期";
        readonly type: "date";
        readonly length: "";
        readonly required: "是";
        readonly description: "蓝字发票开票日期yyyy-MM-dd HH:mm:ss";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "lzfplx";
        readonly name: "蓝字发票类型";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "见附录5，默认为：81电子发票（增值税专用发票）";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "chyyDm";
        readonly name: "红字发票冲红原因代码";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "红字发票冲红原因代码详见附录4；商品服务编码仅为服务时红冲原因不允许选择 “02,销售退回”;商品服务编码仅为货物或劳务时,红冲原因不允许选择“03,服务中止”;";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "bfch";
        readonly name: "部分冲红";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "0：全额冲红 1：部分冲红";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "hzcxje";
        readonly name: "红字冲销金额";
        readonly type: "Number";
        readonly length: "";
        readonly required: "否";
        readonly description: "红字冲销金额，部分冲红时必填";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "hzcxse";
        readonly name: "红字冲销税额";
        readonly type: "Number";
        readonly length: "";
        readonly required: "否";
        readonly description: "红字冲销税额，部分冲红时必填";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "hzqrdmxList";
        readonly name: "红字确认单明细";
        readonly type: "List";
        readonly length: "";
        readonly required: "否";
        readonly description: "部分冲红时必填详见：A-2 红字确认单明细hzqrdmxList";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "ywlx";
        readonly name: "业务类型";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "ywdh";
        readonly name: "业务单号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "ywrq";
        readonly name: "业务日期";
        readonly type: "Date";
        readonly length: "";
        readonly required: "否";
        readonly description: "yyyy-MM-dd HH:mm:ss";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "lzmxxh";
        readonly name: "蓝字发票明细序号";
        readonly type: "Number";
        readonly length: "";
        readonly required: "是";
        readonly description: "蓝字发票明细序号";
        readonly group: "A-2 红字确认单明细hzqrdmxList";
    }, {
        readonly key: "xh";
        readonly name: "序号";
        readonly type: "Number";
        readonly length: "";
        readonly required: "是";
        readonly description: "序号";
        readonly group: "A-2 红字确认单明细hzqrdmxList";
    }, {
        readonly key: "fpspsl";
        readonly name: "数量";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "数量";
        readonly group: "A-2 红字确认单明细hzqrdmxList";
    }, {
        readonly key: "je";
        readonly name: "金额";
        readonly type: "Number";
        readonly length: "";
        readonly required: "是";
        readonly description: "金额";
        readonly group: "A-2 红字确认单明细hzqrdmxList";
    }, {
        readonly key: "se";
        readonly name: "税额";
        readonly type: "Number";
        readonly length: "";
        readonly required: "是";
        readonly description: "税额";
        readonly group: "A-2 红字确认单明细hzqrdmxList";
    }];
    readonly template: {
        readonly serialNumber: "";
        readonly kpdbm: "";
        readonly data: {
            readonly fqfnsrsbh: "";
            readonly lrfsf: "";
            readonly jsfnsrsbh: "";
            readonly jsfmc: "";
            readonly lzfpdm: "";
            readonly lzfphm: "";
            readonly lzkprq: "";
            readonly lzfplx: "";
            readonly chyyDm: "";
            readonly bfch: "";
            readonly hzcxje: 0;
            readonly hzcxse: 0;
            readonly hzqrdmxList: [{
                readonly lzmxxh: 0;
                readonly xh: 0;
                readonly fpspsl: "";
                readonly je: 0;
                readonly se: 0;
            }];
            readonly ywlx: "";
            readonly ywdh: "";
            readonly ywrq: "";
        };
        readonly kpms: "";
        readonly callBackUrl: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "全电发票开具结果查询";
    readonly path: "/api/standard/v1/rpa/102101005";
    readonly method: "POST";
    readonly description: "通过业务流水号，获取数电发票开具结果，支持蓝字和红字发票查询。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.3 全电发票开具结果查询";
    readonly fields: [{
        readonly key: "serialNumber";
        readonly name: "流水号";
        readonly type: "String";
        readonly length: "64";
        readonly required: "是";
        readonly description: "流水号";
        readonly group: "请求参数";
    }, {
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "纳税人识别号";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly serialNumber: "";
        readonly nsrsbh: "";
        readonly kpdbm: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "全电蓝字发票开具结果查询-支持流水号模糊查找";
    readonly path: "/api/standard/v1/rpa/102101009";
    readonly method: "POST";
    readonly description: "";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.4 全电蓝字发票开具结果查询-支持流水号模糊查找";
    readonly fields: [{
        readonly key: "serialNumber";
        readonly name: "流水号";
        readonly type: "String";
        readonly length: "64";
        readonly required: "是";
        readonly description: "流水号";
        readonly group: "请求参数";
    }, {
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "纳税人识别号";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "kprqq";
        readonly name: "开票起始日期";
        readonly type: "Date";
        readonly length: "";
        readonly required: "是";
        readonly description: "格式：yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "kprqz";
        readonly name: "开票截止日期";
        readonly type: "Date";
        readonly length: "";
        readonly required: "是";
        readonly description: "格式：yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "kpzt";
        readonly name: "开票状态";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "00:成功01:失败02:待开03:开票中04:作废直接开票模式为实时开票，仅返回00：成功开具的结果，审核开票模式为异步开票，提供00,01,02,03,04等开票结果返回";
        readonly group: "输出参数，开具结果列表";
    }, {
        readonly key: "sbyy";
        readonly name: "失败原因";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "失败原因仅在审核开票模式下,且kpzt/开票状态为01时返回";
        readonly group: "输出参数，开具结果列表";
    }, {
        readonly key: "lzfpbz";
        readonly name: "蓝字发票标识";
        readonly type: "String";
        readonly length: "1";
        readonly required: "是";
        readonly description: "蓝字发票标识，0:蓝字发票1:红字发票";
        readonly group: "输出参数，开具结果列表";
    }, {
        readonly key: "fphm";
        readonly name: "发票号码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "发票号码";
        readonly group: "输出参数，开具结果列表";
    }, {
        readonly key: "kprq";
        readonly name: "开票日期";
        readonly type: "date";
        readonly length: "";
        readonly required: "是";
        readonly description: "开票日期，格式yyyy-MM-dd HH:mm:ss";
        readonly group: "输出参数，开具结果列表";
    }, {
        readonly key: "h5url";
        readonly name: "h5地址";
        readonly type: "String";
        readonly length: "100";
        readonly required: "是";
        readonly description: "";
        readonly group: "输出参数，开具结果列表";
    }, {
        readonly key: "uuid";
        readonly name: "红字确认单uuid";
        readonly type: "String";
        readonly length: "32";
        readonly required: "否";
        readonly description: "红字确认单uuid";
        readonly group: "输出参数，开具结果列表";
    }, {
        readonly key: "hzqrdbh";
        readonly name: "红字确认单编号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "红字确认单编号";
        readonly group: "输出参数，开具结果列表";
    }, {
        readonly key: "fpwjurls";
        readonly name: "发票文件地址";
        readonly type: "Object";
        readonly length: "";
        readonly required: "否";
        readonly description: "发票文件地址，详见A-1发票文件fpwjurls";
        readonly group: "输出参数，开具结果列表";
    }];
    readonly template: {
        readonly serialNumber: "";
        readonly nsrsbh: "";
        readonly kpdbm: "";
        readonly kprqq: "";
        readonly kprqz: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "批量开具全电蓝字发票（异步）";
    readonly path: "/api/standard/v1/rpa/102101006";
    readonly method: "POST";
    readonly description: "批量开具数电蓝字发票，该接口为异步接口，支持开具完成后回调业务系统同步开具结果。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.5 批量开具全电蓝字发票（异步）";
    readonly fields: [{
        readonly key: "serialNumber";
        readonly name: "开票流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "taxPayerNo";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "否";
        readonly description: "纳税人识别号";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "data";
        readonly name: "发票数据";
        readonly type: "Object";
        readonly length: "";
        readonly required: "是";
        readonly description: "发票数据，包含多张蓝票信息的集合json，详见A-1,JSON格式列表。最多100笔数据。";
        readonly group: "请求参数";
    }, {
        readonly key: "kpms";
        readonly name: "开票模式";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "0:直接开具，1、审核开票(仅推送待开信息，在乐享平台审核开具)。如未传入，默认直接开具。";
        readonly group: "请求参数";
    }, {
        readonly key: "callBackUrl";
        readonly name: "回调地址";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "如果传入回调地址，则根据回调地址主动推送开票结果；详见：回传全电发票开具结果";
        readonly group: "请求参数";
    }, {
        readonly key: "serialNum";
        readonly name: "业务流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "是";
        readonly description: "用于唯一标识一笔业务，针对同一笔业务若变更流水号则会导致重复开票";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "fppz";
        readonly name: "发票票种";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "发票票种。01：全电专；02：全电普。";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "tdys";
        readonly name: "特定要素";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "特定要素详见附录1";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "cezslxDm";
        readonly name: "差额征税类型代码";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "空：非差额发票 01：全额开票 02：差额开票值为01,02时，发票明细只能一行";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfnsrsbh";
        readonly name: "（销售方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "（销售方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfmc";
        readonly name: "(销售方)名称";
        readonly type: "String";
        readonly length: "300";
        readonly required: "是";
        readonly description: "(销售方)名称";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfdz";
        readonly name: "销售方地址";
        readonly type: "String";
        readonly length: "300";
        readonly required: "否";
        readonly description: "销售方地址";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfdh";
        readonly name: "销售方电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "销售方电话";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfkhh";
        readonly name: "销售方开户行";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "销售方开户行";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfzh";
        readonly name: "销售方账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "销售方账号";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sfzsxsfyhzh";
        readonly name: "是否展示销售方银行账号";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：展示 N：不展示。默认N:不展示";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfnsrsbh";
        readonly name: "（购买方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "否";
        readonly description: "（购买方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfmc";
        readonly name: "(购买方)名称";
        readonly type: "String";
        readonly length: "300";
        readonly required: "是";
        readonly description: "(购买方)名称";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfdz";
        readonly name: "购买方地址";
        readonly type: "String";
        readonly length: "300";
        readonly required: "否";
        readonly description: "购买方地址";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfdh";
        readonly name: "购买方电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "购买方电话";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfkhh";
        readonly name: "购买方开户行";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "购买方开户行";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfzh";
        readonly name: "购买方账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "购买方账号";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sfzsgmfyhzh";
        readonly name: "是否展示购买方银行账号";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：展示 N：不展示 默认N:不展示";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfjbr";
        readonly name: "购买方经办人姓名";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "购买方经办人姓名";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jbrsfzjhm";
        readonly name: "购买方经办人证件号码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "购买方经办人证件号码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfjbrlxdh";
        readonly name: "购买方经办人联系电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "购买方经办人联系电话";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "gmfzrrbz";
        readonly name: "购买方自然人标志";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：购买方是自然人，N：购买方非自 然人。未传入则默认为非自然人。";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hjje";
        readonly name: "合计金额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "合计金额";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hjse";
        readonly name: "合计税额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "合计税额";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jshj";
        readonly name: "价税合计";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "价税合计";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "skyhmc";
        readonly name: "收款银行名称";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "收款银行名称";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "skyhzh";
        readonly name: "收款银行账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "收款银行账号";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jsfs";
        readonly name: "结算方式";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "结算方式详见附录2";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ysxwfsd";
        readonly name: "应税行为发生地";
        readonly type: "String";
        readonly length: "11";
        readonly required: "否";
        readonly description: "应税行为发生地";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "kpr";
        readonly name: "开票人";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "开票人";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "kprzjhm";
        readonly name: "开票人证件号码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "开票人证件号码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "kprzjlx";
        readonly name: "开票人证件类型";
        readonly type: "String";
        readonly length: "4";
        readonly required: "否";
        readonly description: "开票人证件类型";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "skrxm";
        readonly name: "收款人姓名";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "fhrxm";
        readonly name: "复核人姓名";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "bz";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "200";
        readonly required: "否";
        readonly description: "备注";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zfbzh";
        readonly name: "交款人支付宝账户";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "交款人如果使用支付宝结算，可传入交款人的支付宝UserID，用于电子票据归集到支付宝发票管家";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "wxddh";
        readonly name: "微信支付订单号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "微信结算时，可传入交款人支付成功的订单号，用来发微信服务通知";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sjhm";
        readonly name: "发票接收手机号";
        readonly type: "String";
        readonly length: "11";
        readonly required: "否";
        readonly description: "如需要用于电子票归集、电子票据短信通知，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "yxdz";
        readonly name: "发票接收邮箱";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "如需用于电子票归集、电子票据邮箱通知，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "fpmx";
        readonly name: "发票明细";
        readonly type: "List";
        readonly length: "";
        readonly required: "是";
        readonly description: "发票明细详见A-2,JSON格式列表";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "fjys";
        readonly name: "附加要素";
        readonly type: "List";
        readonly length: "";
        readonly required: "否";
        readonly description: "附加要素详见A-3,JSON格式列表";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ywlx";
        readonly name: "业务类型";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ywdh";
        readonly name: "业务单号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ywrq";
        readonly name: "业务日期";
        readonly type: "Date";
        readonly length: "";
        readonly required: "否";
        readonly description: "yyyy-MM-dd HH:mm:ss";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hth";
        readonly name: "合同号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "煤炭发热量";
        readonly name: "否";
        readonly type: "5";
        readonly length: "煤炭开票金额超过一千万时必填。";
        readonly required: "String";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "干基全硫";
        readonly name: "否";
        readonly type: "5";
        readonly length: "煤炭开票金额超过一千万时必填。";
        readonly required: "String";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "干燥无灰基挥发分";
        readonly name: "否";
        readonly type: "5";
        readonly length: "煤炭开票金额超过一千万时必填。";
        readonly required: "String";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "mxxh";
        readonly name: "明细序号";
        readonly type: "Number";
        readonly length: "8";
        readonly required: "是";
        readonly description: "明细序号";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "xmmc";
        readonly name: "项目名称";
        readonly type: "String";
        readonly length: "200";
        readonly required: "是";
        readonly description: "项目名称，无需传入简称";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "ggxh";
        readonly name: "规格型号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "规格型号";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "dw";
        readonly name: "单位";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "单位";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "sl";
        readonly name: "数量";
        readonly type: "String";
        readonly length: "15,13";
        readonly required: "否";
        readonly description: "数量如“单位”栏次非空，则本栏次必须非空开具成品油特定要素发票时，小数位最多8位";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "dj";
        readonly name: "单价";
        readonly type: "String";
        readonly length: "15,13";
        readonly required: "否";
        readonly description: "单价如“单位”栏次非空，则本栏次必须非空";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "je";
        readonly name: "金额（不含税）";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "金额（不含税）";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "slv";
        readonly name: "增值税税率/征收率";
        readonly type: "Number";
        readonly length: "10,6";
        readonly required: "是";
        readonly description: "增值税税率/征收率";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "se";
        readonly name: "税额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "税额";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "hsje";
        readonly name: "含税金额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "含税金额";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "kce";
        readonly name: "扣除额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "否";
        readonly description: "扣除额";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "spfwssflbm";
        readonly name: "商品和服务税收分类编码";
        readonly type: "String";
        readonly length: "19";
        readonly required: "是";
        readonly description: "商品和服务税收分类编码";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "fphxz";
        readonly name: "发票行性质";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "发票行性质00:正常行01:折扣行02:被折扣行";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "yhzcbs";
        readonly name: "优惠政策标识";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "优惠政策标识详见附录3";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "mtzldm";
        readonly name: "煤炭种类代码";
        readonly type: "String";
        readonly length: "4";
        readonly required: "否";
        readonly description: "税收分类编码为1020101000000000000、1020102000000000000、1020199000000000000必填。煤炭种类代码详见附录23";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "fjysmc";
        readonly name: "附加要素名称";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "附加要素名称";
        readonly group: "A-3 附加要素fjys";
    }, {
        readonly key: "fjyslx";
        readonly name: "附加要素类型";
        readonly type: "String";
        readonly length: "10";
        readonly required: "否";
        readonly description: "附加要素类型";
        readonly group: "A-3 附加要素fjys";
    }, {
        readonly key: "fjysz";
        readonly name: "附加要素值";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "附加要素值";
        readonly group: "A-3 附加要素fjys";
    }];
    readonly template: {
        readonly serialNumber: "";
        readonly taxPayerNo: "";
        readonly kpdbm: "";
        readonly data: {
            readonly serialNum: "";
            readonly fppz: "";
            readonly tdys: "";
            readonly cezslxDm: "";
            readonly xsfnsrsbh: "";
            readonly xsfmc: "";
            readonly xsfdz: "";
            readonly xsfdh: "";
            readonly xsfkhh: "";
            readonly xsfzh: "";
            readonly sfzsxsfyhzh: "";
            readonly gmfnsrsbh: "";
            readonly gmfmc: "";
            readonly gmfdz: "";
            readonly gmfdh: "";
            readonly gmfkhh: "";
            readonly gmfzh: "";
            readonly sfzsgmfyhzh: "";
            readonly gmfjbr: "";
            readonly jbrsfzjhm: "";
            readonly gmfjbrlxdh: "";
            readonly gmfzrrbz: "";
            readonly hjje: 0;
            readonly hjse: 0;
            readonly jshj: 0;
            readonly skyhmc: "";
            readonly skyhzh: "";
            readonly jsfs: "";
            readonly ysxwfsd: "";
            readonly kpr: "";
            readonly kprzjhm: "";
            readonly kprzjlx: "";
            readonly skrxm: "";
            readonly fhrxm: "";
            readonly bz: "";
            readonly zfbzh: "";
            readonly wxddh: "";
            readonly sjhm: "";
            readonly yxdz: "";
            readonly fpmx: [{
                readonly mxxh: 0;
                readonly xmmc: "";
                readonly ggxh: "";
                readonly dw: "";
                readonly sl: "";
                readonly dj: "";
                readonly je: 0;
                readonly slv: 0;
                readonly se: 0;
                readonly hsje: 0;
                readonly kce: 0;
                readonly spfwssflbm: "";
                readonly fphxz: "";
                readonly yhzcbs: "";
                readonly mtzldm: "";
            }];
            readonly fjys: [{
                readonly fjysmc: "";
                readonly fjyslx: "";
                readonly fjysz: "";
            }];
            readonly ywlx: "";
            readonly ywdh: "";
            readonly ywrq: "";
            readonly hth: "";
            readonly 煤炭发热量: "";
            readonly 干基全硫: "";
            readonly 干燥无灰基挥发分: "";
        };
        readonly kpms: "";
        readonly callBackUrl: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "批量开具全电蓝字发票结果查询";
    readonly path: "/api/standard/v1/rpa/102101007";
    readonly method: "POST";
    readonly description: "通过开票批次流水号，获取数电发票开具结果。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.6 批量开具全电蓝字发票结果查询";
    readonly fields: [{
        readonly key: "batchSerialNumber";
        readonly name: "开票处理流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "是";
        readonly description: "3.2.3返回的开票处理流水号信息。";
        readonly group: "请求参数";
    }, {
        readonly key: "taxPayerNo";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "纳税人识别号";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly batchSerialNumber: "";
        readonly taxPayerNo: "";
        readonly kpdbm: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "全电蓝字发票全额红冲";
    readonly path: "/api/standard/v1/rpa/102101025";
    readonly method: "POST";
    readonly description: "通过蓝字发票关键要素，全额冲红数电蓝字发票。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.7 全电蓝字发票全额红冲";
    readonly fields: [{
        readonly key: "serialNumber";
        readonly name: "流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "是";
        readonly description: "流水号";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "data";
        readonly name: "确认单数据";
        readonly type: "Object";
        readonly length: "";
        readonly required: "是";
        readonly description: "红字确认单数据，详见：A-1 确认单数据data";
        readonly group: "请求参数";
    }, {
        readonly key: "fqfnsrsbh";
        readonly name: "发起方纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "发起方纳税人识别号";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "lzfpdm";
        readonly name: "蓝字发票发票代码";
        readonly type: "String";
        readonly length: "12";
        readonly required: "否";
        readonly description: "蓝字发票发票代码";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "lzfphm";
        readonly name: "蓝字发票发票号码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "蓝字发票发票号码";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "lzkprq";
        readonly name: "蓝字发票开票时间";
        readonly type: "date";
        readonly length: "";
        readonly required: "是";
        readonly description: "蓝字发票开票时间yyyy-MM-dd HH:mm:ss";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "lzfplx";
        readonly name: "蓝字发票类型";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "见附录5，默认为：81电子发票（增值税专用发票）";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "lzfpjym";
        readonly name: "蓝字发票校验码";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "蓝字发票校验码（当蓝字发票为纸质票时必填）";
        readonly group: "A-1 确认单数据data";
    }, {
        readonly key: "chyyDm";
        readonly name: "红字发票冲红原因代码";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "红字发票冲红原因代码详见附录4";
        readonly group: "A-1 确认单数据data";
    }];
    readonly template: {
        readonly serialNumber: "";
        readonly kpdbm: "";
        readonly data: {
            readonly fqfnsrsbh: "";
            readonly lzfpdm: "";
            readonly lzfphm: "";
            readonly lzkprq: "";
            readonly lzfplx: "";
            readonly lzfpjym: "";
            readonly chyyDm: "";
        };
    };
}, {
    readonly category: "开票接口";
    readonly name: "全电红字确认单查询";
    readonly path: "/api/standard/v1/rpa/102101010";
    readonly method: "POST";
    readonly description: "通过红字确认单编号、录入日期区间等要素，获取红字确认单信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.8 全电红字确认单查询";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "纳税人识别号";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "hzqrdbh";
        readonly name: "红字确认单编号";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "lrrqq";
        readonly name: "录入日期起";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "录入日期起，格式：yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "lrrqz";
        readonly name: "录入日期止";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "录入日期止，格式：yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "yhjslx";
        readonly name: "用户角色类型";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "0：销方(默认) 1:购方";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly kpdbm: "";
        readonly hzqrdbh: "";
        readonly lrrqq: "";
        readonly lrrqz: "";
        readonly yhjslx: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "全电红字确认单确认（确认并开具）";
    readonly path: "/api/standard/v1/rpa/102101026";
    readonly method: "POST";
    readonly description: "通过红字确认单编号，进行红字确认单确认并开具红票。如果为销方确认，乐享平台自动开具红票并返回红票信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.9 全电红字确认单确认（确认并开具）";
    readonly fields: [{
        readonly key: "serialNumber";
        readonly name: "流水号";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "流水号";
        readonly group: "请求参数";
    }, {
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "纳税人识别号";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "qrlx";
        readonly name: "确认类型";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "确认类型，Y:同意N:不同意";
        readonly group: "请求参数";
    }, {
        readonly key: "hzqrdbh";
        readonly name: "红字确认单编号";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "lrrqq";
        readonly name: "录入日期起";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "录入日期起，格式：yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "lrrqz";
        readonly name: "录入日期止";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "录入日期止，格式：yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "yhjslx";
        readonly name: "用户角色类型";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "0：销方(默认) 1:购方";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly serialNumber: "";
        readonly nsrsbh: "";
        readonly kpdbm: "";
        readonly qrlx: "";
        readonly hzqrdbh: "";
        readonly lrrqq: "";
        readonly lrrqz: "";
        readonly yhjslx: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "全电红字确认单撤销";
    readonly path: "/api/standard/v1/rpa/102101024";
    readonly method: "POST";
    readonly description: "红字确认单发起方通过确认单编号、录入日期区间等要素，撤销红字确认单申请。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.10 全电红字确认单撤销";
    readonly fields: [{
        readonly key: "serialNumber";
        readonly name: "流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "hzqrdbh";
        readonly name: "红字确认单编号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "lrrqq";
        readonly name: "录入日期起";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "录入日期起，格式：yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "lrrqz";
        readonly name: "录入日期止";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "录入日期止，格式：yyyy-MM-dd";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly serialNumber: "";
        readonly nsrsbh: "";
        readonly kpdbm: "";
        readonly hzqrdbh: "";
        readonly lrrqq: "";
        readonly lrrqz: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "查看全电发票H5页面地址";
    readonly path: "/api/standard/v1/rpa/103101014";
    readonly method: "POST";
    readonly description: "通过发票号码、开具日期，获取数电发票h5地址。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.11 查看全电发票H5页面地址";
    readonly fields: [];
    readonly template: {};
}, {
    readonly category: "开票接口";
    readonly name: "获取开票动态二维码";
    readonly path: "/api/standard/v1/rpa/102101029";
    readonly method: "POST";
    readonly description: "业务系统推送待开票信息，乐享平台返回开票二维码；用户扫码后录入抬头信息，申请开具数电发票。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.12 获取开票动态二维码";
    readonly fields: [{
        readonly key: "serialNumber";
        readonly name: "流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "是";
        readonly description: "用于唯一标识一笔业务，针对同一笔业务若变更流水号则会导致重复开票";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "data";
        readonly name: "发票数据";
        readonly type: "Object";
        readonly length: "";
        readonly required: "是";
        readonly description: "发票数据，详见A-1发票数据data";
        readonly group: "请求参数";
    }, {
        readonly key: "fppz";
        readonly name: "发票票种";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "发票票种。01：全电专；02：全电普。";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "tdys";
        readonly name: "特定要素";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "特定要素详见附录1";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "cezslxDm";
        readonly name: "差额征税类型代码";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "空：非差额发票 01：全额开票 02：差额开票";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfnsrsbh";
        readonly name: "（销售方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "（销售方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfmc";
        readonly name: "(销售方)名称";
        readonly type: "String";
        readonly length: "300";
        readonly required: "是";
        readonly description: "(销售方)名称";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfdz";
        readonly name: "销售方地址";
        readonly type: "String";
        readonly length: "300";
        readonly required: "否";
        readonly description: "销售方地址";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfdh";
        readonly name: "销售方电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "销售方电话";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfkhh";
        readonly name: "销售方开户行";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "销售方开户行";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfzh";
        readonly name: "销售方账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "销售方账号";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sfzsxsfyhzh";
        readonly name: "是否展示销售方银行账号";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：展示 N：不展示。默认N:不展示";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xsfzrrbz";
        readonly name: "销售方自然人标志";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：销售方是自然人，N：销售方非自 然人。未传入则默认为：N 非自然人。";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hjje";
        readonly name: "合计金额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "合计金额";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hjse";
        readonly name: "合计税额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "合计税额";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jshj";
        readonly name: "价税合计";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "价税合计";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "skyhmc";
        readonly name: "收款银行名称";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "收款银行名称";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "skyhzh";
        readonly name: "收款银行账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "收款银行账号";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jsfs";
        readonly name: "结算方式";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "结算方式详见附录2";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ysxwfsd";
        readonly name: "应税行为发生地";
        readonly type: "String";
        readonly length: "11";
        readonly required: "否";
        readonly description: "应税行为发生地";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "kpr";
        readonly name: "开票人";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "开票人";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "kprzjhm";
        readonly name: "开票人证件号码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "开票人证件号码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "kprzjlx";
        readonly name: "开票人证件类型";
        readonly type: "String";
        readonly length: "4";
        readonly required: "否";
        readonly description: "开票人证件类型";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "skrxm";
        readonly name: "收款人姓名";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "fhrxm";
        readonly name: "复核人姓名";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ywrq";
        readonly name: "业务日期";
        readonly type: "date";
        readonly length: "";
        readonly required: "否";
        readonly description: "业务日期，格式yyyy-MM-dd HH:mm:ss";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "bz";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "200";
        readonly required: "否";
        readonly description: "备注";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zfbzh";
        readonly name: "交款人支付宝账户";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "交款人如果使用支付宝结算，可传入交款人的支付宝UserID，用于电子票据归集到支付宝发票管家";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "wxddh";
        readonly name: "微信支付订单号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "微信结算时，可传入交款人支付成功的订单号，用来发微信服务通知";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sjhm";
        readonly name: "发票接收手机号";
        readonly type: "String";
        readonly length: "11";
        readonly required: "否";
        readonly description: "如需要用于电子票归集、电子票据短信通知，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "yxdz";
        readonly name: "发票接收邮箱";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "如需用于电子票归集、电子票据邮箱通知，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "fpmx";
        readonly name: "发票明细";
        readonly type: "List";
        readonly length: "";
        readonly required: "是";
        readonly description: "发票明细详见A-2,JSON格式列表";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "mxxh";
        readonly name: "明细序号";
        readonly type: "Number";
        readonly length: "8";
        readonly required: "是";
        readonly description: "明细序号";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "xmmc";
        readonly name: "项目名称";
        readonly type: "String";
        readonly length: "200";
        readonly required: "是";
        readonly description: "项目名称，无需传入简称";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "ggxh";
        readonly name: "规格型号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "规格型号";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "dw";
        readonly name: "单位";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "单位";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "sl";
        readonly name: "数量";
        readonly type: "String";
        readonly length: "15,13";
        readonly required: "否";
        readonly description: "数量如“单位”栏次非空，则本栏次必须非空";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "dj";
        readonly name: "单价";
        readonly type: "String";
        readonly length: "15,13";
        readonly required: "否";
        readonly description: "单价如“单位”栏次非空，则本栏次必须非空";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "je";
        readonly name: "金额（不含税）";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "金额（不含税）";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "slv";
        readonly name: "增值税税率/征收率";
        readonly type: "Number";
        readonly length: "10,6";
        readonly required: "是";
        readonly description: "增值税税率/征收率";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "se";
        readonly name: "税额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "税额";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "hsje";
        readonly name: "含税金额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "含税金额";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "kce";
        readonly name: "扣除额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "否";
        readonly description: "扣除额";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "spfwssflbm";
        readonly name: "商品和服务税收分类编码";
        readonly type: "String";
        readonly length: "19";
        readonly required: "是";
        readonly description: "商品和服务税收分类编码";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "fphxz";
        readonly name: "发票行性质";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "发票行性质00:正常行01:折扣行02:被折扣行";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "yhzcbs";
        readonly name: "优惠政策标识";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "优惠政策标识详见附录3";
        readonly group: "A-2 发票明细fpmx";
    }];
    readonly template: {
        readonly serialNumber: "";
        readonly kpdbm: "";
        readonly data: {
            readonly fppz: "";
            readonly tdys: "";
            readonly cezslxDm: "";
            readonly xsfnsrsbh: "";
            readonly xsfmc: "";
            readonly xsfdz: "";
            readonly xsfdh: "";
            readonly xsfkhh: "";
            readonly xsfzh: "";
            readonly sfzsxsfyhzh: "";
            readonly xsfzrrbz: "";
            readonly hjje: 0;
            readonly hjse: 0;
            readonly jshj: 0;
            readonly skyhmc: "";
            readonly skyhzh: "";
            readonly jsfs: "";
            readonly ysxwfsd: "";
            readonly kpr: "";
            readonly kprzjhm: "";
            readonly kprzjlx: "";
            readonly skrxm: "";
            readonly fhrxm: "";
            readonly ywrq: "";
            readonly bz: "";
            readonly zfbzh: "";
            readonly wxddh: "";
            readonly sjhm: "";
            readonly yxdz: "";
            readonly fpmx: [{
                readonly mxxh: 0;
                readonly xmmc: "";
                readonly ggxh: "";
                readonly dw: "";
                readonly sl: "";
                readonly dj: "";
                readonly je: 0;
                readonly slv: 0;
                readonly se: 0;
                readonly hsje: 0;
                readonly kce: 0;
                readonly spfwssflbm: "";
                readonly fphxz: "";
                readonly yhzcbs: "";
            }];
        };
    };
}, {
    readonly category: "开票接口";
    readonly name: "全电发票重新交付";
    readonly path: "/api/standard/v1/rpa/102101030";
    readonly method: "POST";
    readonly description: "通过该接口申请重新交付数电发票，支持按原渠道交付，或传入新的渠道重新交付。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.13 全电发票重新交付";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "fphm";
        readonly name: "发票号码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "kprq";
        readonly name: "开票日期";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "格式yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "yqdbs";
        readonly name: "原渠道标识";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "0：原渠道；1：非原渠道；如未传入，默认原渠道。";
        readonly group: "请求参数";
    }, {
        readonly key: "jfqd";
        readonly name: "交付渠道";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "2：邮箱；3：票据云。非原渠道此参数必填。";
        readonly group: "请求参数";
    }, {
        readonly key: "jfyj";
        readonly name: "交付依据";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "邮箱渠道时:传入邮箱信息;票据云渠道时:传入邮箱信息或手机号。非原渠道此参数必填。";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly fphm: "";
        readonly kprq: "";
        readonly yqdbs: "";
        readonly jfqd: "";
        readonly jfyj: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "待开发票版式文件预览";
    readonly path: "/api/standard/v1/rpa/103101031";
    readonly method: "POST";
    readonly description: "业务系统传入待开票信息，乐享平台返回发票预览文件。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.14 待开发票版式文件预览";
    readonly fields: [{
        readonly key: "fppz";
        readonly name: "发票票种";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "发票票种。01：全电专；02：全电普。";
        readonly group: "请求参数";
    }, {
        readonly key: "tdys";
        readonly name: "特定要素";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "特定要素详见附录1";
        readonly group: "请求参数";
    }, {
        readonly key: "cezslxDm";
        readonly name: "差额征税类型代码";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "空：非差额发票 01：全额开票 02：差额开票";
        readonly group: "请求参数";
    }, {
        readonly key: "xsfnsrsbh";
        readonly name: "（销售方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "（销售方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly group: "请求参数";
    }, {
        readonly key: "xsfmc";
        readonly name: "(销售方)名称";
        readonly type: "String";
        readonly length: "300";
        readonly required: "是";
        readonly description: "(销售方)名称";
        readonly group: "请求参数";
    }, {
        readonly key: "xsfdz";
        readonly name: "销售方地址";
        readonly type: "String";
        readonly length: "300";
        readonly required: "否";
        readonly description: "销售方地址";
        readonly group: "请求参数";
    }, {
        readonly key: "xsfdh";
        readonly name: "销售方电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "销售方电话";
        readonly group: "请求参数";
    }, {
        readonly key: "xsfkhh";
        readonly name: "销售方开户行";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "销售方开户行";
        readonly group: "请求参数";
    }, {
        readonly key: "xsfzh";
        readonly name: "销售方账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "销售方账号";
        readonly group: "请求参数";
    }, {
        readonly key: "sfzsxsfyhzh";
        readonly name: "是否展示销售方银行账号";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：展示 N：不展示。默认N:不展示";
        readonly group: "请求参数";
    }, {
        readonly key: "xsfzrrbz";
        readonly name: "销售方自然人标志";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：销售方是自然人，N：销售方非自然人。未传入则默认为：N 非自然人。";
        readonly group: "请求参数";
    }, {
        readonly key: "gmfnsrsbh";
        readonly name: "（购买方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "否";
        readonly description: "（购买方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly group: "请求参数";
    }, {
        readonly key: "gmfmc";
        readonly name: "(购买方)名称";
        readonly type: "String";
        readonly length: "300";
        readonly required: "是";
        readonly description: "(购买方)名称";
        readonly group: "请求参数";
    }, {
        readonly key: "gmfdz";
        readonly name: "购买方地址";
        readonly type: "String";
        readonly length: "300";
        readonly required: "否";
        readonly description: "购买方地址";
        readonly group: "请求参数";
    }, {
        readonly key: "gmfdh";
        readonly name: "购买方电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "购买方电话";
        readonly group: "请求参数";
    }, {
        readonly key: "gmfkhh";
        readonly name: "购买方开户行";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "购买方开户行";
        readonly group: "请求参数";
    }, {
        readonly key: "gmfzh";
        readonly name: "购买方账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "购买方账号";
        readonly group: "请求参数";
    }, {
        readonly key: "sfzsgmfyhzh";
        readonly name: "是否展示购买方银行账号";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：展示 N：不展示 默认N:不展示";
        readonly group: "请求参数";
    }, {
        readonly key: "gmfjbr";
        readonly name: "购买方经办人姓名";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "购买方经办人姓名";
        readonly group: "请求参数";
    }, {
        readonly key: "jbrsfzjhm";
        readonly name: "购买方经办人证件号码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "购买方经办人证件号码";
        readonly group: "请求参数";
    }, {
        readonly key: "gmfjbrlxdh";
        readonly name: "购买方经办人联系电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "购买方经办人联系电话";
        readonly group: "请求参数";
    }, {
        readonly key: "gmfzrrbz";
        readonly name: "购买方自然人标志";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：购买方是自然人，N：购买方非自然人。未传入则默认为非自然人。";
        readonly group: "请求参数";
    }, {
        readonly key: "hjje";
        readonly name: "合计金额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "合计金额";
        readonly group: "请求参数";
    }, {
        readonly key: "hjse";
        readonly name: "合计税额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "合计税额";
        readonly group: "请求参数";
    }, {
        readonly key: "jshj";
        readonly name: "价税合计";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "价税合计";
        readonly group: "请求参数";
    }, {
        readonly key: "skyhmc";
        readonly name: "收款银行名称";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "收款银行名称";
        readonly group: "请求参数";
    }, {
        readonly key: "skyhzh";
        readonly name: "收款银行账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "收款银行账号";
        readonly group: "请求参数";
    }, {
        readonly key: "jsfs";
        readonly name: "结算方式";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "结算方式详见附录2";
        readonly group: "请求参数";
    }, {
        readonly key: "ysxwfsd";
        readonly name: "应税行为发生地";
        readonly type: "String";
        readonly length: "11";
        readonly required: "否";
        readonly description: "应税行为发生地";
        readonly group: "请求参数";
    }, {
        readonly key: "kpr";
        readonly name: "开票人";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "开票人";
        readonly group: "请求参数";
    }, {
        readonly key: "kprzjhm";
        readonly name: "开票人证件号码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "开票人证件号码";
        readonly group: "请求参数";
    }, {
        readonly key: "kprzjlx";
        readonly name: "开票人证件类型";
        readonly type: "String";
        readonly length: "4";
        readonly required: "否";
        readonly description: "开票人证件类型";
        readonly group: "请求参数";
    }, {
        readonly key: "ywrq";
        readonly name: "业务日期";
        readonly type: "date";
        readonly length: "";
        readonly required: "否";
        readonly description: "业务日期，格式yyyy-MM-dd HH:mm:ss";
        readonly group: "请求参数";
    }, {
        readonly key: "bz";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "200";
        readonly required: "否";
        readonly description: "备注";
        readonly group: "请求参数";
    }, {
        readonly key: "fpmx";
        readonly name: "发票明细";
        readonly type: "List";
        readonly length: "";
        readonly required: "是";
        readonly description: "发票明细详见A-2,JSON格式列表";
        readonly group: "请求参数";
    }, {
        readonly key: "fjys";
        readonly name: "附加要素";
        readonly type: "List";
        readonly length: "";
        readonly required: "否";
        readonly description: "附加要素详见A-3,JSON格式列表";
        readonly group: "请求参数";
    }, {
        readonly key: "mxxh";
        readonly name: "明细序号";
        readonly type: "Number";
        readonly length: "8";
        readonly required: "是";
        readonly description: "明细序号";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "xmmc";
        readonly name: "项目名称";
        readonly type: "String";
        readonly length: "200";
        readonly required: "是";
        readonly description: "项目名称，无需传入简称";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "ggxh";
        readonly name: "规格型号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "规格型号";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "dw";
        readonly name: "单位";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "单位";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "sl";
        readonly name: "数量";
        readonly type: "String";
        readonly length: "15,13";
        readonly required: "否";
        readonly description: "数量如“单位”栏次非空，则本栏次必须非空";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "dj";
        readonly name: "单价";
        readonly type: "String";
        readonly length: "15,13";
        readonly required: "否";
        readonly description: "单价如“单位”栏次非空，则本栏次必须非空";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "je";
        readonly name: "金额（不含税）";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "金额（不含税）";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "slv";
        readonly name: "增值税税率/征收率";
        readonly type: "Number";
        readonly length: "10,6";
        readonly required: "是";
        readonly description: "增值税税率/征收率";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "se";
        readonly name: "税额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "税额";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "hsje";
        readonly name: "含税金额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "含税金额";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "kce";
        readonly name: "扣除额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "否";
        readonly description: "扣除额";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "spfwssflbm";
        readonly name: "商品和服务税收分类编码";
        readonly type: "String";
        readonly length: "19";
        readonly required: "是";
        readonly description: "商品和服务税收分类编码";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "fphxz";
        readonly name: "发票行性质";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "发票行性质00:正常行01:折扣行02:被折扣行";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "yhzcbs";
        readonly name: "优惠政策标识";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "优惠政策标识详见附录3";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "fjysmc";
        readonly name: "附加要素名称";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "附加要素名称";
        readonly group: "A-3 附加要素fjys";
    }, {
        readonly key: "fjyslx";
        readonly name: "附加要素类型";
        readonly type: "String";
        readonly length: "10";
        readonly required: "否";
        readonly description: "附加要素类型";
        readonly group: "A-3 附加要素fjys";
    }, {
        readonly key: "fjysz";
        readonly name: "附加要素值";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "附加要素值";
        readonly group: "A-3 附加要素fjys";
    }];
    readonly template: {
        readonly fppz: "";
        readonly tdys: "";
        readonly cezslxDm: "";
        readonly xsfnsrsbh: "";
        readonly xsfmc: "";
        readonly xsfdz: "";
        readonly xsfdh: "";
        readonly xsfkhh: "";
        readonly xsfzh: "";
        readonly sfzsxsfyhzh: "";
        readonly xsfzrrbz: "";
        readonly gmfnsrsbh: "";
        readonly gmfmc: "";
        readonly gmfdz: "";
        readonly gmfdh: "";
        readonly gmfkhh: "";
        readonly gmfzh: "";
        readonly sfzsgmfyhzh: "";
        readonly gmfjbr: "";
        readonly jbrsfzjhm: "";
        readonly gmfjbrlxdh: "";
        readonly gmfzrrbz: "";
        readonly hjje: 0;
        readonly hjse: 0;
        readonly jshj: 0;
        readonly skyhmc: "";
        readonly skyhzh: "";
        readonly jsfs: "";
        readonly ysxwfsd: "";
        readonly kpr: "";
        readonly kprzjhm: "";
        readonly kprzjlx: "";
        readonly ywrq: "";
        readonly bz: "";
        readonly fpmx: [];
        readonly fjys: [];
    };
}, {
    readonly category: "开票接口";
    readonly name: "红字确认单下载";
    readonly path: "/api/standard/v1/rpa/103101035";
    readonly method: "POST";
    readonly description: "查询红字确认单版式文件信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.17 红字确认单下载";
    readonly fields: [];
    readonly template: {};
}, {
    readonly category: "开票接口";
    readonly name: "3.2.17全电红字确认单列表查询（通过蓝字票号）";
    readonly path: "/api/standard/v1/rpa/102101036";
    readonly method: "POST";
    readonly description: "";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.17全电红字确认单列表查询（通过蓝字票号）";
    readonly fields: [];
    readonly template: {};
}, {
    readonly category: "开票接口";
    readonly name: "销项发票查询（按开票来源）";
    readonly path: "/api/standard/v1/rpa/102101027";
    readonly method: "POST";
    readonly description: "销项发票信息批量查询。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.2.18 销项发票查询（按开票来源）";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "fplx";
        readonly name: "发票类型";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "附录5:发票类型代码";
        readonly group: "请求参数";
    }, {
        readonly key: "qsrq";
        readonly name: "起始日期";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "开票起始日期：格式yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "zzrq";
        readonly name: "终止日期";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "开票终止日期：格式yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "kply";
        readonly name: "开票来源";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "默认查询所有开票来源0:接口开票1:页面开票2:扫码开票3:批量开票(页面批量导入开票)4:移动开票5:协同开票";
        readonly group: "请求参数";
    }, {
        readonly key: "ym";
        readonly name: "页码";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "每页返回100条数据，从1开始";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly fplx: "";
        readonly qsrq: "";
        readonly zzrq: "";
        readonly kply: "";
        readonly ym: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "发票信息查询";
    readonly path: "/api/standard/v1/rpa/103101001";
    readonly method: "POST";
    readonly description: "通过发票类型、发票号码、开具日期等要素，获取发票明细信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.3.1 发票信息查询";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "纳税人识别号";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "fplx";
        readonly name: "发票类型";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "fpdm";
        readonly name: "发票代码";
        readonly type: "String";
        readonly length: "12";
        readonly required: "否";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "fphm";
        readonly name: "发票号码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "kprq";
        readonly name: "开票日期";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "格式：yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "sjlx";
        readonly name: "数据类型";
        readonly type: "String";
        readonly length: "1";
        readonly required: "是";
        readonly description: "0：进项票 1：销项票";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly kpdbm: "";
        readonly fplx: "";
        readonly fpdm: "";
        readonly fphm: "";
        readonly kprq: "";
        readonly sjlx: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "全电发票xml文件下载";
    readonly path: "/api/standard/v1/rpa/103101005";
    readonly method: "POST";
    readonly description: "通过发票号码、开具日期等要素，下载发票xml文件信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.3.2 全电发票xml文件下载";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "纳税人识别号";
        readonly group: "请求参数";
    }, {
        readonly key: "kpdbm";
        readonly name: "开票点编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "fplx";
        readonly name: "发票类型";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "见附录5";
        readonly group: "请求参数";
    }, {
        readonly key: "fpdm";
        readonly name: "发票代码";
        readonly type: "String";
        readonly length: "12";
        readonly required: "否";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "fphm";
        readonly name: "发票号码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "kprq";
        readonly name: "开票日期";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "格式yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "sjlx";
        readonly name: "数据类型";
        readonly type: "String";
        readonly length: "1";
        readonly required: "是";
        readonly description: "0：进项票 1：销项票";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly kpdbm: "";
        readonly fplx: "";
        readonly fpdm: "";
        readonly fphm: "";
        readonly kprq: "";
        readonly sjlx: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "全电发票版式文件下载";
    readonly path: "/api/standard/v1/rpa/103101006";
    readonly method: "POST";
    readonly description: "通过发票号码、开具日期等要素，下载发票版式文件。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.3.3 全电发票版式文件下载";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "纳税人识别号";
        readonly group: "请求参数";
    }, {
        readonly key: "fplx";
        readonly name: "发票类型";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "见附录5";
        readonly group: "请求参数";
    }, {
        readonly key: "fphm";
        readonly name: "发票号码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "kprq";
        readonly name: "开票日期";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "格式yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "wjlx";
        readonly name: "文件类型";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "PDF,OFD, 默认PDF";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly fplx: "";
        readonly fphm: "";
        readonly kprq: "";
        readonly wjlx: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "推送待开票订单信息";
    readonly path: "/api/standard/v1/rpa/102102001";
    readonly method: "POST";
    readonly description: "业务系统通过该接口推送订单信息，财务人员登录乐享平台拆分/合并开具数电发票。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.4.1 推送待开票订单信息";
    readonly fields: [{
        readonly key: "serialNumber";
        readonly name: "批次流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "纳税人识别号";
        readonly group: "请求参数";
    }, {
        readonly key: "data";
        readonly name: "订单数据";
        readonly type: "Object";
        readonly length: "";
        readonly required: "是";
        readonly description: "订单数据，详见A-1,JSON格式列表。最多100笔数据。";
        readonly group: "请求参数";
    }, {
        readonly key: "type";
        readonly name: "拆分/合并标识";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "0：不处理、仅接收数据，1：自动拆分，2：自动合并。如未传入，默认0：不处理。";
        readonly group: "请求参数";
    }, {
        readonly key: "callBackUrl";
        readonly name: "回调地址";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "如果传入回调地址，则根据回调地址主动推送开票结果；详见：回传合并/拆分开具结果";
        readonly group: "请求参数";
    }, {
        readonly key: "serialNum";
        readonly name: "流水单编号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "是";
        readonly description: "用于唯一标识一笔业务，针对同一笔业务若变更流水号则会导致重复开票";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "fppz";
        readonly name: "发票票种";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "发票票种。01：数电专；02：数电普。";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "xsfnsrsbh";
        readonly name: "（销售方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "（销售方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "xsfmc";
        readonly name: "(销售方)名称";
        readonly type: "String";
        readonly length: "300";
        readonly required: "是";
        readonly description: "(销售方)名称";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "xsfdz";
        readonly name: "销售方地址";
        readonly type: "String";
        readonly length: "300";
        readonly required: "否";
        readonly description: "销售方地址";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "xsfdh";
        readonly name: "销售方电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "销售方电话";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "xsfkhh";
        readonly name: "销售方开户行";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "销售方开户行";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "xsfzh";
        readonly name: "销售方账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "销售方账号";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "gmfnsrsbh";
        readonly name: "（购买方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "否";
        readonly description: "（购买方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "gmfmc";
        readonly name: "(购买方)名称";
        readonly type: "String";
        readonly length: "300";
        readonly required: "是";
        readonly description: "(购买方)名称";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "gmfdz";
        readonly name: "购买方地址";
        readonly type: "String";
        readonly length: "300";
        readonly required: "否";
        readonly description: "购买方地址";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "gmfdh";
        readonly name: "购买方电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "购买方电话";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "gmfkhh";
        readonly name: "购买方开户行";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "购买方开户行";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "gmfzh";
        readonly name: "购买方账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "购买方账号";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "gmfjbr";
        readonly name: "购买方经办人姓名";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "购买方经办人姓名";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "jbrsfzjhm";
        readonly name: "购买方经办人证件号码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "购买方经办人证件号码";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "gmfjbrlxdh";
        readonly name: "购买方经办人联系电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "购买方经办人联系电话";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "gmfzrrbz";
        readonly name: "购买方自然人标志";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y：购买方是自然人，N：购买方非自 然人。未传入则默认为非自然人。";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "hjje";
        readonly name: "合计金额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "合计金额";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "hjse";
        readonly name: "合计税额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "合计税额";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "jshj";
        readonly name: "价税合计";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "价税合计";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "skyhmc";
        readonly name: "收款银行名称";
        readonly type: "String";
        readonly length: "120";
        readonly required: "否";
        readonly description: "收款银行名称";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "skyhzh";
        readonly name: "收款银行账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "收款银行账号";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "jsfs";
        readonly name: "结算方式";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "结算方式详见附录2";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "kpr";
        readonly name: "开票人姓名";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "skrxm";
        readonly name: "收款人姓名";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "fhrxm";
        readonly name: "复核人姓名";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "sjhm";
        readonly name: "发票接收手机号";
        readonly type: "String";
        readonly length: "11";
        readonly required: "否";
        readonly description: "短信交付手机号码";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "yxdz";
        readonly name: "发票接收邮箱";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "邮箱交付";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "bz";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "300";
        readonly required: "否";
        readonly description: "备注";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "ywlx";
        readonly name: "业务类型";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "ywdh";
        readonly name: "业务单号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "否";
        readonly description: "合同号";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "ywrq";
        readonly name: "业务日期";
        readonly type: "date";
        readonly length: "";
        readonly required: "否";
        readonly description: "业务日期，格式yyyy-MM-dd HH:mm:ss";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "fpmx";
        readonly name: "发票明细";
        readonly type: "List";
        readonly length: "";
        readonly required: "是";
        readonly description: "发票明细详见A-2,JSON格式列表";
        readonly group: "A-1 订单数据data";
    }, {
        readonly key: "mxxh";
        readonly name: "明细序号";
        readonly type: "Number";
        readonly length: "8";
        readonly required: "是";
        readonly description: "明细序号";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "xmmc";
        readonly name: "项目名称";
        readonly type: "String";
        readonly length: "200";
        readonly required: "是";
        readonly description: "项目名称，无需传入简称";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "ggxh";
        readonly name: "规格型号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "规格型号";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "dw";
        readonly name: "单位";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "单位";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "sl";
        readonly name: "数量";
        readonly type: "String";
        readonly length: "15,13";
        readonly required: "否";
        readonly description: "数量如“单位”栏次非空，则本栏次必须非空";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "dj";
        readonly name: "单价";
        readonly type: "String";
        readonly length: "15,13";
        readonly required: "否";
        readonly description: "单价如“单位”栏次非空，则本栏次必须非空";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "je";
        readonly name: "金额（不含税）";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "金额（不含税）";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "slv";
        readonly name: "增值税税率/征收率";
        readonly type: "Number";
        readonly length: "10,6";
        readonly required: "是";
        readonly description: "增值税税率/征收率";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "se";
        readonly name: "税额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "税额";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "hsje";
        readonly name: "含税金额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "含税金额";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "kce";
        readonly name: "扣除额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "否";
        readonly description: "扣除额";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "spfwssflbm";
        readonly name: "商品和服务税收分类编码";
        readonly type: "String";
        readonly length: "19";
        readonly required: "是";
        readonly description: "商品和服务税收分类编码";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "fphxz";
        readonly name: "发票行性质";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "发票行性质00:正常行01:折扣行02:被折扣行";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "yhzcbs";
        readonly name: "优惠政策标识";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "优惠政策标识详见附录3";
        readonly group: "A-2 订单明细fpmx";
    }, {
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "";
        readonly group: "以下请求参数列表仅列出了接口请求参数和部分公共参数。";
    }, {
        readonly key: "serialNumber";
        readonly name: "批次流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "是";
        readonly description: "调用推送待开票订单信息接口时传入的批次号";
        readonly group: "以下请求参数列表仅列出了接口请求参数和部分公共参数。";
    }, {
        readonly key: "total";
        readonly name: "推送笔数";
        readonly type: "Number";
        readonly length: "";
        readonly required: "是";
        readonly description: "推送笔数";
        readonly group: "以下请求参数列表仅列出了接口请求参数和部分公共参数。";
    }, {
        readonly key: "data";
        readonly name: "开票结果集合";
        readonly type: "List";
        readonly length: "";
        readonly required: "是";
        readonly description: "详见A-1开票结果集合";
        readonly group: "以下请求参数列表仅列出了接口请求参数和部分公共参数。";
    }, {
        readonly key: "serialNum";
        readonly name: "流水单编号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-1 开票结果集合data";
    }, {
        readonly key: "detail";
        readonly name: "发票明细";
        readonly type: "Object";
        readonly length: "";
        readonly required: "是";
        readonly description: "流水单编号对应的发票明细，详见B-2发票信息列表";
        readonly group: "A-1 开票结果集合data";
    }, {
        readonly key: "mxxh";
        readonly name: "明细序号";
        readonly type: "Number";
        readonly length: "8";
        readonly required: "是";
        readonly description: "明细序号";
        readonly group: "B-2 发票信息 detail";
    }, {
        readonly key: "fplx";
        readonly name: "发票类型";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "发票类型详见附录5";
        readonly group: "B-2 发票信息 detail";
    }, {
        readonly key: "fphm";
        readonly name: "发票号码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "";
        readonly group: "B-2 发票信息 detail";
    }, {
        readonly key: "kprq";
        readonly name: "开票日期";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "格式yyyy-MM-dd HH:mm:ss";
        readonly group: "B-2 发票信息 detail";
    }, {
        readonly key: "h5url";
        readonly name: "全电发票H5页面URL";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "B-2 发票信息 detail";
    }];
    readonly template: {
        readonly serialNumber: "";
        readonly nsrsbh: "";
        readonly data: {
            readonly serialNum: "";
            readonly detail: [{
                readonly mxxh: 0;
                readonly fplx: "";
                readonly fphm: "";
                readonly kprq: "";
                readonly h5url: "";
            }];
            readonly fpmx: [{
                readonly mxxh: 0;
                readonly xmmc: "";
                readonly ggxh: "";
                readonly dw: "";
                readonly sl: "";
                readonly dj: "";
                readonly je: 0;
                readonly slv: 0;
                readonly se: 0;
                readonly hsje: 0;
                readonly kce: 0;
                readonly spfwssflbm: "";
                readonly fphxz: "";
                readonly yhzcbs: "";
            }];
        };
        readonly type: "";
        readonly callBackUrl: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "借票申请操作状态信息查询";
    readonly path: "/api/standard/v1/105101001";
    readonly method: "POST";
    readonly description: "业务系统通过流水号查询借票申请操作状态信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.5.2 借票申请操作状态信息查询";
    readonly fields: [{
        readonly key: "wxtywlsh";
        readonly name: "外系统业务流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "否";
        readonly description: "外系统传入的业务流水号申请单业务流水号集合为空时此参数必填";
        readonly group: "请求参数";
    }, {
        readonly key: "sqdywlshjh";
        readonly name: "申请单业务流水号集合";
        readonly type: "List< String>";
        readonly length: "0-10";
        readonly required: "否";
        readonly description: "申请单业务流水号集合";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly wxtywlsh: "";
        readonly sqdywlshjh: [];
    };
}, {
    readonly category: "开票接口";
    readonly name: "借票到账状态更新";
    readonly path: "/api/standard/v1/105101002";
    readonly method: "POST";
    readonly description: "业务系统通过流水号更新对应的借票申请记录的到账状态。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.5.3 借票到账状态更新";
    readonly fields: [{
        readonly key: "wxtywlsh";
        readonly name: "外系统业务流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "否";
        readonly description: "外系统传入的业务流水号申请单对应的业务流水号为空时此参数必填";
        readonly group: "请求参数";
    }, {
        readonly key: "sqdywlsh";
        readonly name: "申请单业务流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "否";
        readonly description: "申请单对应的业务流水号";
        readonly group: "请求参数";
    }, {
        readonly key: "dzzt";
        readonly name: "到账状态";
        readonly type: "String";
        readonly length: "1";
        readonly required: "是";
        readonly description: "1:已到账";
        readonly group: "请求参数";
    }, {
        readonly key: "yhhdbhjh";
        readonly name: "银行回单编号集合";
        readonly type: "List<String>";
        readonly length: "";
        readonly required: "否";
        readonly description: "";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly wxtywlsh: "";
        readonly sqdywlsh: "";
        readonly dzzt: "";
        readonly yhhdbhjh: [];
    };
}, {
    readonly category: "开票接口";
    readonly name: "借票申请撤销";
    readonly path: "/api/standard/v1/105101003";
    readonly method: "POST";
    readonly description: "业务系统通过流水号撤销对应的借票申请记录。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.5.4 借票申请撤销";
    readonly fields: [{
        readonly key: "wxtywlsh";
        readonly name: "外系统业务流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "否";
        readonly description: "外系统传入的业务流水号申请单对应的业务流水号为空时此参数必填";
        readonly group: "请求参数";
    }, {
        readonly key: "sqdywlsh";
        readonly name: "申请单业务流水号";
        readonly type: "String";
        readonly length: "32";
        readonly required: "否";
        readonly description: "申请单对应的业务流水号";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly wxtywlsh: "";
        readonly sqdywlsh: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "商户登记";
    readonly path: "/api/standard/v1/rpa/101101012";
    readonly method: "POST";
    readonly description: "业务系统将商户的税务信息同步给乐享平台，进行商户的信息初始化操作。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.1 商户登记";
    readonly fields: [{
        readonly key: "xsfnsrsbh";
        readonly name: "商户纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "接入单位新增登记的销售方纳税人识别号，若该接入单位下已经存在传入的xsfnsrsbh，则做更新操作";
        readonly group: "请求参数";
    }, {
        readonly key: "xsfmc";
        readonly name: "商户名称";
        readonly type: "String";
        readonly length: "300";
        readonly required: "是";
        readonly description: "企业名称";
        readonly group: "请求参数";
    }, {
        readonly key: "xsfdz";
        readonly name: "商户地址";
        readonly type: "String";
        readonly length: "300";
        readonly required: "是";
        readonly description: "企业地址";
        readonly group: "请求参数";
    }, {
        readonly key: "xsfdh";
        readonly name: "商户电话";
        readonly type: "String";
        readonly length: "60";
        readonly required: "是";
        readonly description: "企业联系电话";
        readonly group: "请求参数";
    }, {
        readonly key: "xsfkhh";
        readonly name: "商户开户行";
        readonly type: "String";
        readonly length: "120";
        readonly required: "是";
        readonly description: "企业开户银行";
        readonly group: "请求参数";
    }, {
        readonly key: "xsfzh";
        readonly name: "商户账号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "是";
        readonly description: "企业银行账号";
        readonly group: "请求参数";
    }, {
        readonly key: "sjswjg";
        readonly name: "省级税务机关";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "详见附录14省级税务机关";
        readonly group: "请求参数";
    }, {
        readonly key: "yjjf";
        readonly name: "邮件交付";
        readonly type: "Object";
        readonly length: "";
        readonly required: "否";
        readonly description: "详见A1 邮件交付";
        readonly group: "请求参数";
    }, {
        readonly key: "ktcp";
        readonly name: "开通产品";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "0：进项,1：销项,2：进项和销项。不传默认开通1：销项";
        readonly group: "请求参数";
    }, {
        readonly key: "sfkt";
        readonly name: "是否开通";
        readonly type: "String";
        readonly length: "1";
        readonly required: "是";
        readonly description: "0:不开通1:开通并使用系统默认邮件服务器2:开通并使用自定义邮件服务器不传默认0：不开通";
        readonly group: "A-1 邮件交付";
    }, {
        readonly key: "fsfwq";
        readonly name: "发送服务器";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "仅当sfkt/是否开通值为2时填写";
        readonly group: "A-1 邮件交付";
    }, {
        readonly key: "fsfwqdk";
        readonly name: "发送服务器端口";
        readonly type: "String";
        readonly length: "19";
        readonly required: "否";
        readonly description: "仅当sfkt/是否开通值为2时填写";
        readonly group: "A-1 邮件交付";
    }, {
        readonly key: "ssl";
        readonly name: "启用ssl";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "0:不启用，1：启用仅当sfkt/是否开通值为2时填写";
        readonly group: "A-1 邮件交付";
    }, {
        readonly key: "yxzh";
        readonly name: "邮箱账号";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "仅当sfkt/是否开通值为2时填写";
        readonly group: "A-1 邮件交付";
    }, {
        readonly key: "yxmm";
        readonly name: "邮箱密码";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "仅当sfkt/是否开通值为2时填写";
        readonly group: "A-1 邮件交付";
    }];
    readonly template: {
        readonly xsfnsrsbh: "";
        readonly xsfmc: "";
        readonly xsfdz: "";
        readonly xsfdh: "";
        readonly xsfkhh: "";
        readonly xsfzh: "";
        readonly sjswjg: "";
        readonly yjjf: "";
        readonly ktcp: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "用户登记";
    readonly path: "/api/standard/v1/rpa/101101011";
    readonly method: "POST";
    readonly description: "业务系统将商户的税局开票人账号数据登记到乐享平台。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.2 用户登记";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "czlx";
        readonly name: "操作类型";
        readonly type: "String";
        readonly length: "1";
        readonly required: "是";
        readonly description: "1:登记，若该税号下已经存在传入的sjzh税局账号，则做更新操作2:删除";
        readonly group: "请求参数";
    }, {
        readonly key: "sjzh";
        readonly name: "税局账号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "电子税局登录账号，居民身份证号码、手机号码或用户名。其他业务接口调用时，使用此处传入的税局账号，作为开票点编码。";
        readonly group: "请求参数";
    }, {
        readonly key: "sjmm";
        readonly name: "税局密码";
        readonly type: "String";
        readonly length: "50";
        readonly required: "是";
        readonly description: "电子税局登录密码，采用SM4加密传输，密钥为appKey";
        readonly group: "请求参数";
    }, {
        readonly key: "yhxm";
        readonly name: "用户姓名";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "用户姓名（实名）";
        readonly group: "请求参数";
    }, {
        readonly key: "sjhm";
        readonly name: "手机号码";
        readonly type: "String";
        readonly length: "11";
        readonly required: "否";
        readonly description: "手机号码";
        readonly group: "请求参数";
    }, {
        readonly key: "dlsflx";
        readonly name: "登录身份类型";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "默认值09：开票员01：法定代表人02：财务负责人03：办税员04：涉税服务人员05：管理员07：领票人09：开票员99：其他人员";
        readonly group: "请求参数";
    }, {
        readonly key: "gjsy";
        readonly name: "是否归集使用";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "Y:是,N:否。不传默认N:否";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly czlx: "";
        readonly sjzh: "";
        readonly sjmm: "";
        readonly yhxm: "";
        readonly sjhm: "";
        readonly dlsflx: "";
        readonly gjsy: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "商品信息同步";
    readonly path: "/api/standard/v1/rpa/101101013";
    readonly method: "POST";
    readonly description: "业务系统通过该接口，同步开票项目信息到乐享平台。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.3 商品信息同步";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "data";
        readonly name: "商品信息";
        readonly type: "Object";
        readonly length: "";
        readonly required: "是";
        readonly description: "商品信息数据，包含多笔商品信息的集合json，详见A-1,JSON格式列表。最多100笔数据。";
        readonly group: "请求参数";
    }, {
        readonly key: "spbm";
        readonly name: "商品编码";
        readonly type: "String";
        readonly length: "50";
        readonly required: "是";
        readonly description: "商品信息的唯一标识，不允许重复";
        readonly group: "A-1 商品信息data";
    }, {
        readonly key: "spmc";
        readonly name: "商品名称";
        readonly type: "String";
        readonly length: "100";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-1 商品信息data";
    }, {
        readonly key: "spfwssflbm";
        readonly name: "商品和服务税收分类编码";
        readonly type: "String";
        readonly length: "19";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 商品信息data";
    }, {
        readonly key: "ggxh";
        readonly name: "规格型号";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 商品信息data";
    }, {
        readonly key: "dw";
        readonly name: "计量单位";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 商品信息data";
    }, {
        readonly key: "dj";
        readonly name: "单价";
        readonly type: "String";
        readonly length: "15,13";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 商品信息data";
    }, {
        readonly key: "slv";
        readonly name: "增值税税率/征收率";
        readonly type: "Number";
        readonly length: "10,6";
        readonly required: "否";
        readonly description: "增值税税率/征收率";
        readonly group: "A-1 商品信息data";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly data: {
            readonly spbm: "";
            readonly spmc: "";
            readonly spfwssflbm: "";
            readonly ggxh: "";
            readonly dw: "";
            readonly dj: "";
            readonly slv: 0;
        };
    };
}, {
    readonly category: "开票接口";
    readonly name: "客户信息同步";
    readonly path: "/api/standard/v1/rpa/101101014";
    readonly method: "POST";
    readonly description: "业务系统通过该接口，同步客户信息到乐享平台。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.4 客户信息同步";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "data";
        readonly name: "客户信息";
        readonly type: "Object";
        readonly length: "";
        readonly required: "是";
        readonly description: "客户信息数据，包含多笔客户信息的集合json，详见A-1,JSON格式列表。最多100笔数据。";
        readonly group: "请求参数";
    }, {
        readonly key: "khdm";
        readonly name: "客户代码";
        readonly type: "String";
        readonly length: "50";
        readonly required: "是";
        readonly description: "客户信息的唯一标识，不允许重复";
        readonly group: "A-1 客户信息data";
    }, {
        readonly key: "khmc";
        readonly name: "客户名称";
        readonly type: "String";
        readonly length: "200";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-1 客户信息data";
    }, {
        readonly key: "khnsrsbh";
        readonly name: "客户统一社会信用代码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 客户信息data";
    }, {
        readonly key: "khyh";
        readonly name: "开户银行";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 客户信息data";
    }, {
        readonly key: "yhzh";
        readonly name: "银行账户";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 客户信息data";
    }, {
        readonly key: "dwdz";
        readonly name: "单位地址";
        readonly type: "String";
        readonly length: "200";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 客户信息data";
    }, {
        readonly key: "dhhm";
        readonly name: "电话号码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 客户信息data";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly data: {
            readonly khdm: "";
            readonly khmc: "";
            readonly khnsrsbh: "";
            readonly khyh: "";
            readonly yhzh: "";
            readonly dwdz: "";
            readonly dhhm: "";
        };
    };
}, {
    readonly category: "开票接口";
    readonly name: "客户信息查询";
    readonly path: "/api/standard/v1/101101026";
    readonly method: "POST";
    readonly description: "业务系统通过该接口，查询乐享平台客户信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.5 客户信息查询";
    readonly fields: [{
        readonly key: "customerType";
        readonly name: "抬头类型";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "1-个人 2-单位(不填就是全查)";
        readonly group: "请求参数";
    }, {
        readonly key: "customerName";
        readonly name: "客户名称";
        readonly type: "String";
        readonly length: "300";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly customerType: "";
        readonly customerName: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "供应商信息查询";
    readonly path: "/api/standard/v1/rpa/101101016";
    readonly method: "POST";
    readonly description: "业务系统通过该接口，查询乐享平台供应商信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.6 供应商信息查询";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "gyscjsjq";
        readonly name: "供应商创建时间起";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "gyscjsjz";
        readonly name: "供应商创建时间止";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "dqys";
        readonly name: "当前页数";
        readonly type: "Number";
        readonly length: "";
        readonly required: "是";
        readonly description: "页号";
        readonly group: "请求参数";
    }, {
        readonly key: "myxsts";
        readonly name: "每页显示条数";
        readonly type: "Number";
        readonly length: "";
        readonly required: "是";
        readonly description: "每页显示条数";
        readonly group: "请求参数";
    }, {
        readonly key: "qyzt";
        readonly name: "启用状态";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "参数为空默认全部状态启用状态: 0:禁用 1:启用";
        readonly group: "请求参数";
    }, {
        readonly key: "gysgxsjq";
        readonly name: "供应商更新时间起";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "yyyy-MM-dd";
        readonly group: "请求参数";
    }, {
        readonly key: "gysgxsjz";
        readonly name: "供应商更新时间止";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "yyyy-MM-dd";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly gyscjsjq: "";
        readonly gyscjsjz: "";
        readonly dqys: 0;
        readonly myxsts: 0;
        readonly qyzt: "";
        readonly gysgxsjq: "";
        readonly gysgxsjz: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "用户信息查询";
    readonly path: "/api/standard/v1/101101017";
    readonly method: "POST";
    readonly description: "业务系统通过该接口，查询乐享平台用户信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.7 用户信息查询";
    readonly fields: [{
        readonly key: "yhzh";
        readonly name: "用户账号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "用户账号";
        readonly group: "请求参数";
    }, {
        readonly key: "yhbm";
        readonly name: "用户编码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "用户编码";
        readonly group: "请求参数";
    }, {
        readonly key: "yhmc";
        readonly name: "用户名称";
        readonly type: "String";
        readonly length: "10";
        readonly required: "否";
        readonly description: "用户名称";
        readonly group: "请求参数";
    }, {
        readonly key: "ssjgmc";
        readonly name: "所属机构名称";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "所属机构名称";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly yhzh: "";
        readonly yhbm: "";
        readonly yhmc: "";
        readonly ssjgmc: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "用户信息新增";
    readonly path: "/api/standard/v1/101101018";
    readonly method: "POST";
    readonly description: "业务系统通过该接口，新增乐享平台用户信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.8 用户信息新增";
    readonly fields: [{
        readonly key: "yhxxxzlb";
        readonly name: "用户信息新增列表";
        readonly type: "List";
        readonly length: "";
        readonly required: "是";
        readonly description: "详细见A-1 用户信息新增列表yhxxxzlb,单次新增最多为50条";
        readonly group: "请求参数";
    }, {
        readonly key: "xh";
        readonly name: "序号";
        readonly type: "Number";
        readonly length: "";
        readonly required: "是";
        readonly description: "序号从1开始, 递增";
        readonly group: "A-1用户信息新增列表yhxxxzlb";
    }, {
        readonly key: "yhbm";
        readonly name: "用户编码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-1用户信息新增列表yhxxxzlb";
    }, {
        readonly key: "sjh";
        readonly name: "手机号";
        readonly type: "String";
        readonly length: "11";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-1用户信息新增列表yhxxxzlb";
    }, {
        readonly key: "yhzh";
        readonly name: "用户账号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-1用户信息新增列表yhxxxzlb";
    }, {
        readonly key: "yhmc";
        readonly name: "用户名称";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-1用户信息新增列表yhxxxzlb";
    }, {
        readonly key: "sfzhm";
        readonly name: "身份证号码";
        readonly type: "String";
        readonly length: "18";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1用户信息新增列表yhxxxzlb";
    }, {
        readonly key: "yxdz";
        readonly name: "邮箱";
        readonly type: "String";
        readonly length: "50";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-1用户信息新增列表yhxxxzlb";
    }, {
        readonly key: "ssjgmc";
        readonly name: "所属机构名称";
        readonly type: "String";
        readonly length: "200";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-1用户信息新增列表yhxxxzlb";
    }, {
        readonly key: "ssbmmc";
        readonly name: "所属部门名称";
        readonly type: "String";
        readonly length: "200";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1用户信息新增列表yhxxxzlb";
    }, {
        readonly key: "bz";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1用户信息新增列表yhxxxzlb";
    }];
    readonly template: {
        readonly yhxxxzlb: [];
    };
}, {
    readonly category: "开票接口";
    readonly name: "用户信息编辑";
    readonly path: "/api/standard/v1/101101019";
    readonly method: "POST";
    readonly description: "业务系统通过该接口，编辑乐享平台用户信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.9 用户信息编辑";
    readonly fields: [{
        readonly key: "yhbm";
        readonly name: "用户编码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "sjh";
        readonly name: "手机号";
        readonly type: "String";
        readonly length: "11";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "yhzh";
        readonly name: "用户账号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "yhmc";
        readonly name: "用户名称";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "sfzhm";
        readonly name: "身份证号码";
        readonly type: "String";
        readonly length: "18";
        readonly required: "否";
        readonly description: "默认为空";
        readonly group: "请求参数";
    }, {
        readonly key: "yxdz";
        readonly name: "邮箱";
        readonly type: "String";
        readonly length: "50";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "ssjgmc";
        readonly name: "所属机构名称";
        readonly type: "String";
        readonly length: "200";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "ssbmmc";
        readonly name: "所属部门名称";
        readonly type: "String";
        readonly length: "200";
        readonly required: "否";
        readonly description: "默认为空";
        readonly group: "请求参数";
    }, {
        readonly key: "bz";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "默认为空";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly yhbm: "";
        readonly sjh: "";
        readonly yhzh: "";
        readonly yhmc: "";
        readonly sfzhm: "";
        readonly yxdz: "";
        readonly ssjgmc: "";
        readonly ssbmmc: "";
        readonly bz: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "用户信息停用/启用";
    readonly path: "/api/standard/v1/101101020";
    readonly method: "POST";
    readonly description: "业务系统通过该接口，启用/停用乐享平台用户信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.10 用户信息停用/启用";
    readonly fields: [{
        readonly key: "yhzh";
        readonly name: "用户账号";
        readonly type: "String";
        readonly length: "";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "zt";
        readonly name: "状态";
        readonly type: "String";
        readonly length: "1";
        readonly required: "是";
        readonly description: "0：停用 1：启用";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly yhzh: "";
        readonly zt: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "租户能力信息查询";
    readonly path: "/api/standard/v1/101101021";
    readonly method: "POST";
    readonly description: "业务系统通过该接口，查询乐享平台租户能力信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.11 租户能力信息查询";
    readonly fields: [{
        readonly key: "nsrsbh";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "26";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }, {
        readonly key: "nllx";
        readonly name: "能力类型";
        readonly type: "String";
        readonly length: "2";
        readonly required: "是";
        readonly description: "0:验证查重1: OCR识别2:AI识别3:短信包4:进项归集5:销项开票";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly nllx: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "供应商信息同步";
    readonly path: "/api/standard/v1/101101023";
    readonly method: "POST";
    readonly description: "业务系统通过该接口，同步客户信息到乐享平台。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.12 供应商信息同步";
    readonly fields: [{
        readonly key: "taxPayerNo";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "统一社会信用代码/纳税人识别号，不填默认为当前单位";
        readonly group: "请求参数";
    }, {
        readonly key: "supplierList";
        readonly name: "供应商信息列表";
        readonly type: "List<Supplier>";
        readonly length: "1-500";
        readonly required: "是";
        readonly description: "见A-1Supplier 数据长度不超过 500 条";
        readonly group: "请求参数";
    }, {
        readonly key: "supplierCode";
        readonly name: "供应商编码";
        readonly type: "String";
        readonly length: "50";
        readonly required: "是";
        readonly description: "供应商编码，当前单位唯一（编码相同时，则更新当前供应商信息）";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "supplierName";
        readonly name: "供应商名称";
        readonly type: "String";
        readonly length: "50";
        readonly required: "是";
        readonly description: "供应商名称，当前单位唯一";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "taxpayerType";
        readonly name: "纳税人类型";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "1.小规模纳税人;2. 一般纳税人; 3. 自然人";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "supplierTaxPayerNo";
        readonly name: "供应商统一社会信用代码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "供应商编码和供应商纳税人识别号不能同时为空。";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "isBlacklisted";
        readonly name: "是否属于黑名单";
        readonly type: "String";
        readonly length: "-";
        readonly required: "否";
        readonly description: "供应商是否被列入黑名单。0：否，1：是，默认为0：否";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "remarks";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "255";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "unitAddress";
        readonly name: "单位地址";
        readonly type: "String";
        readonly length: "255";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "unitPhoneNumber";
        readonly name: "单位电话号码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "contactPersonName";
        readonly name: "联系人姓名";
        readonly type: "String";
        readonly length: "32";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "contactPersonPosition";
        readonly name: "联系人职务";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "contactPersonPhoneNumber";
        readonly name: "联系人电话";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "contactPersonEmail";
        readonly name: "联系人邮箱";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "contactPersonIDNumber";
        readonly name: "联系人证件号码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "recAccList";
        readonly name: "银行帐户信息列表";
        readonly type: "List<RecAcc>";
        readonly length: "0-500";
        readonly required: "否";
        readonly description: "见B-1RecAcc 数据长度不超过 500 条";
        readonly group: "A-1-供应商信息 Supplier";
    }, {
        readonly key: "bankName";
        readonly name: "开户银行";
        readonly type: "String";
        readonly length: "128";
        readonly required: "是";
        readonly description: "";
        readonly group: "B-1-供应商信息 RecAcc";
    }, {
        readonly key: "bankAccount";
        readonly name: "银行账户";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "B-1-供应商信息 RecAcc";
    }, {
        readonly key: "isMainAccount";
        readonly name: "是否默认账号";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "1-是，0 否，不传默认列表第一条为默认账号";
        readonly group: "B-1-供应商信息 RecAcc";
    }, {
        readonly key: "accType";
        readonly name: "账号类型";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "1-对公账户 0-个人账户 不传默认为 1";
        readonly group: "B-1-供应商信息 RecAcc";
    }, {
        readonly key: "accRemarks";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "255";
        readonly required: "否";
        readonly description: "";
        readonly group: "B-1-供应商信息 RecAcc";
    }];
    readonly template: {
        readonly taxPayerNo: "";
        readonly supplierList: [];
    };
}, {
    readonly category: "开票接口";
    readonly name: "供应商信息删除";
    readonly path: "/api/standard/v1/101101024";
    readonly method: "POST";
    readonly description: "业务系统通过该接口，删除乐享平台客户信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.13 供应商信息删除";
    readonly fields: [{
        readonly key: "taxPayerNo";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "统一社会信用代码/纳税人识别号，不填默认为当前单位";
        readonly group: "请求参数";
    }, {
        readonly key: "supplierCode";
        readonly name: "供应商编码";
        readonly type: "String";
        readonly length: "50";
        readonly required: "是";
        readonly description: "";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly taxPayerNo: "";
        readonly supplierCode: "";
    };
}, {
    readonly category: "开票接口";
    readonly name: "供应商列表查询";
    readonly path: "/api/standard/v1/101101022";
    readonly method: "POST";
    readonly description: "业务系统通过该接口，查询乐享平台供应商信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范v1.0.62（销项）.docx";
    readonly sectionTitle: "3.6.14 供应商列表查询";
    readonly fields: [{
        readonly key: "taxPayerNo";
        readonly name: "纳税人识别号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "统一社会信用代码/纳税人识别号，不填默认为当前单位";
        readonly group: "请求参数";
    }, {
        readonly key: "supplierCodeList";
        readonly name: "供应商编码列表";
        readonly type: "List< String>";
        readonly length: "1-500";
        readonly required: "否";
        readonly description: "数据长度不超过 500 条";
        readonly group: "请求参数";
    }, {
        readonly key: "supplierInfo";
        readonly name: "供应商编码或名称";
        readonly type: "String";
        readonly length: "";
        readonly required: "否";
        readonly description: "供应商名称或编码模糊搜索";
        readonly group: "请求参数";
    }, {
        readonly key: "current";
        readonly name: "当前页";
        readonly type: "Integer";
        readonly length: "10";
        readonly required: "否";
        readonly description: "取值需要不小于1，不填默认为 1";
        readonly group: "请求参数";
    }, {
        readonly key: "pageSize";
        readonly name: "每页条数";
        readonly type: "Integer";
        readonly length: "10";
        readonly required: "否";
        readonly description: "默认值为30。取值范围在[1,100]之间";
        readonly group: "请求参数";
    }];
    readonly template: {
        readonly taxPayerNo: "";
        readonly supplierCodeList: [];
        readonly supplierInfo: "";
        readonly current: 0;
        readonly pageSize: 0;
    };
}];

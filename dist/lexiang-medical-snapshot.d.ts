export declare const LEXIANG_MEDICAL_INTERFACES: readonly [{
    readonly category: "登陆认证";
    readonly name: "请求登录电子税务局";
    readonly path: "/api/standard/v1/rpa/100101001";
    readonly method: "POST";
    readonly description: "用于RPA模式下登陆电子税务局。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx";
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
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly kpdbm: "";
    };
}, {
    readonly category: "登陆认证";
    readonly name: "确认登录电子税务局";
    readonly path: "/api/standard/v1/rpa/100101002";
    readonly method: "POST";
    readonly description: "单位内部系统根据纳税人识别号、办税员账号、手机验证码信息向税务数字服务平台发起确认登录请求，登录电子税务局。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx";
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
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly kpdbm: "";
        readonly dxyzm: "";
    };
}, {
    readonly category: "登陆认证";
    readonly name: "请求电子税务局二维码认证";
    readonly path: "/api/standard/v1/rpa/100101004";
    readonly method: "POST";
    readonly description: "单位内部系统根据纳税人识别号、办税员账号向税务数字服务平台发起电子税务局二维码认证请求。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx";
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
    readonly category: "登陆认证";
    readonly name: "查询电子税务局登陆及身份授权状态";
    readonly path: "/api/standard/v1/rpa/100101003";
    readonly method: "POST";
    readonly description: "企业根据纳税人识别号、办税员账号向税务数字服务平台查询电子税务局登陆和身份授权状态。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx";
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
    }];
    readonly template: {
        readonly nsrsbh: "";
        readonly kpdbm: "";
    };
}, {
    readonly category: "";
    readonly name: "医疗门诊全电蓝字发票开具";
    readonly path: "/api/medical/v1/rpa/10210100111";
    readonly method: "POST";
    readonly description: "单位内部系统发起开具蓝票服务请求，实时开具全电蓝字发票。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx";
    readonly sectionTitle: "3.2.1 医疗门诊全电蓝字发票开具";
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
        readonly key: "kpms";
        readonly name: "开票模式";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "0：直接开具；1、审核开票（仅推送待开信息，在乐享平台审核开具）；2、患者自助开票（仅推送订单信息，患者扫码后自助申请开票；订单信息最多保留3个月，超期需到窗口人工开票）。如未传入，默认直接开具。";
        readonly group: "请求参数";
    }, {
        readonly key: "data";
        readonly name: "发票数据";
        readonly type: "String";
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
        readonly key: "qyDm";
        readonly name: "区域代码";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "省级行政区域代码详见附录2";
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
        readonly key: "gmfnsrsbh";
        readonly name: "（购买方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "（购买方）统一社会信用代码/纳税人识别号/身份证件号码。开具数电专票时，必填";
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
        readonly description: "结算方式详见附录3";
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
        readonly length: "50";
        readonly required: "是";
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
        readonly description: "证件类型编码，见附录11：开票人证件类型";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "skrxm";
        readonly name: "收款人姓名";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "fhrxm";
        readonly name: "复核人姓名";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "bz";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "300";
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
        readonly key: "klx";
        readonly name: "卡类型";
        readonly type: "String";
        readonly length: "10";
        readonly required: "否";
        readonly description: "附录1：卡类型列表";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "kh";
        readonly name: "卡号";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "根据卡类型填写";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "yljglx";
        readonly name: "医疗机构类型";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "填写医疗机构类型名称。值域见附录8:医疗机构类型";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "qtyljglx";
        readonly name: "其他医疗机构类型";
        readonly type: "String";
        readonly length: "33";
        readonly required: "否";
        readonly description: "填写上述医疗机构类型没有的类型，“医疗机构类型”和“其他医疗机构类型”只能填写一个";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ybjgbm";
        readonly name: "医保机构编码";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "医保机构的唯一编码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "yblxbm";
        readonly name: "医保类型编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "01：职工基本医疗保险02：城乡居民基本医疗保险03：离休04：其他医疗保险05：自费";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "qtyblx";
        readonly name: "其他医保类型";
        readonly type: "String";
        readonly length: "33";
        readonly required: "否";
        readonly description: "填写上述医保类型代码没有的类型，“医保类型代码”和“其他医保类型”只能填写一个";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hzybbh";
        readonly name: "患者医保编号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "参保人在医保系统中的唯一标识(医保号)，医保实时结算必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ybxzqhm";
        readonly name: "参保地医保区划";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "医保机构的唯一标识，医保结算时必须填写";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jzrq";
        readonly name: "就诊日期";
        readonly type: "String";
        readonly length: "19";
        readonly required: "是";
        readonly description: "患者就医时间格式：yyyy-MM-dd HH:mm:ss";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jzksmc";
        readonly name: "就诊科室名称";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hzjzbh";
        readonly name: "患者就诊编号";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "患者每次就诊一次就生成的一个新的编号。（患者登记号）";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hzwyid";
        readonly name: "患者唯一ID";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "患者在业务系统中的唯一标识ID，类似身份证号码。";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hzxm";
        readonly name: "患者姓名";
        readonly type: "String";
        readonly length: "50";
        readonly required: "是";
        readonly description: "患者姓名。未填入，默认取购买方名称";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hzsfzjlxDm";
        readonly name: "患者身份证件类型代码";
        readonly type: "String";
        readonly length: "3";
        readonly required: "是";
        readonly description: "患者身份证件类型代码，详见附录7。未填入默认为201：居民身份证";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hzsfzjhm";
        readonly name: "患者身份证件号码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "未填入且购买方是自然人时，默认取购买方身份证件号码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xb";
        readonly name: "性别";
        readonly type: "String";
        readonly length: "4";
        readonly required: "是";
        readonly description: "值为：男、女";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "nl";
        readonly name: "年龄";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "blh";
        readonly name: "病历号";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jbbm";
        readonly name: "疾病编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "tsbzmc";
        readonly name: "特殊病种名称";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "对接医保上传电子结算凭证，附加信息：";
        readonly name: "";
        readonly type: "";
        readonly length: "";
        readonly required: "";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zyzddm";
        readonly name: "主要诊断代码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zyzdmc";
        readonly name: "主要诊断名称";
        readonly type: "String";
        readonly length: "255";
        readonly required: "否";
        readonly description: "对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "cyzddm";
        readonly name: "次要诊断代码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "cyzdmc";
        readonly name: "次要诊断名称";
        readonly type: "String";
        readonly length: "255";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jydybqh";
        readonly name: "就医地医保区划";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "就医地医保机构的唯一标识，医保结算时必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xzlx";
        readonly name: "险种类型";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "详见附录9，医保实时结算必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jzkssj";
        readonly name: "开始时间";
        readonly type: "String";
        readonly length: "19";
        readonly required: "否";
        readonly description: "格式：yyyy-MM-dd HH:mm:ss对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jzjssj";
        readonly name: "结束时间";
        readonly type: "String";
        readonly length: "19";
        readonly required: "否";
        readonly description: "格式：yyyy-MM-dd HH:mm:ss 对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sylb";
        readonly name: "生育类别";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jhsysslb";
        readonly name: "计划生育手术类别";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "tc";
        readonly name: "胎次";
        readonly type: "Number";
        readonly length: "3";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "yzs";
        readonly name: "孕周数";
        readonly type: "Number";
        readonly length: "2";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "tes";
        readonly name: "胎儿数";
        readonly type: "Number";
        readonly length: "3";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "lyfs";
        readonly name: "离院方式";
        readonly type: "String";
        readonly length: "3";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ssczdm";
        readonly name: "手术操作代码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ssczmc";
        readonly name: "手术操作名称";
        readonly type: "String";
        readonly length: "500";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "swrq";
        readonly name: "死亡日期";
        readonly type: "String";
        readonly length: "8";
        readonly required: "否";
        readonly description: "yyyyMMdd";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zzysdm";
        readonly name: "主诊医师代码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zzysxm";
        readonly name: "主诊医师姓名";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ylfl";
        readonly name: "医疗分类";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "详见附录10。对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ddyljgbh";
        readonly name: "定点医疗机构编号";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ddyljgmc";
        readonly name: "定点医疗机构名称";
        readonly type: "String";
        readonly length: "255";
        readonly required: "否";
        readonly description: "对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jgjgdm";
        readonly name: "监管机构代码";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "grzhzf";
        readonly name: "个人账户支付";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "按政策规定用个人账户支付参保人的医疗费用（含基本医疗保险目录范围内和目录范围外的费用）；如无金额，填写0";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "fhfwje";
        readonly name: "符合范围金额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "如无金额，填写0。医保实时结算必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ybtcjjzf";
        readonly name: "医保统筹基金支付";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "患者本次就医所发生的医疗费用中按规定由基本医疗保险统筹基金支付的金额；如无金额，填写0。医保实时结算必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "qtybzf";
        readonly name: "其它医保支付";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "患者本次就医所发生的医疗费用中按规定由大病保险、医疗救助、公务员医疗补助、大额补充、企业补充等基金或资金支付的金额；如无金额，填写0";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zfje";
        readonly name: "自费金额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "患者本次就医所发生的医疗费用中按照有关规定不属于基本医疗保险目录范围而全部由个人支付的费用；如无金额，填写0";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "grzf1";
        readonly name: "个人自负";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "医保患者起付标准内个人支付费用；如无金额，填写0";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "grzf2";
        readonly name: "个人自付";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "患者本次就医所发生的医疗费用中由个人负担的属于基本医疗保险目录范围内自付部分的金额；开展按病种、病组、床日等打包付费方式且由患者定额付费的费用。该项为个人所得税大病医疗专项附加扣除信；息项如无金额，填写0";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "grxjzf";
        readonly name: "个人现金支付";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "个人通过现金、银行卡、微信、支付宝等渠道支付的金额；如无金额，填写0";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "yjje";
        readonly name: "预缴金额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "bjje";
        readonly name: "补缴金额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "tfje";
        readonly name: "退费金额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "grzhye";
        readonly name: "个人账户余额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "bxzje";
        readonly name: "报销总金额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "否";
        readonly description: "医保结算后返回的总金额";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jsh";
        readonly name: "结算号";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "医保结算后生成的号码/入账唯一值，医保实时结算必填。";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jssj";
        readonly name: "结算时间";
        readonly type: "String";
        readonly length: "19";
        readonly required: "否";
        readonly description: "患者就医时间，格式：yyyy-MM-dd HH:mm:ss，医保实时结算必填";
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
        readonly key: "fpmx";
        readonly name: "发票明细";
        readonly type: "List";
        readonly length: "";
        readonly required: "是";
        readonly description: "发票明细详见A-2,JSON格式列表";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sszdyysmx";
        readonly name: "省市自定义要素明细";
        readonly type: "List";
        readonly length: "";
        readonly required: "否";
        readonly description: "省市自定义要素明细详见A-4,JSON格式列表";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zdxxlb";
        readonly name: "诊断信息列表";
        readonly type: "List";
        readonly length: "";
        readonly required: "否";
        readonly description: "诊断信息列表详见A-5,JSON格式列表";
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
        readonly description: "数量如“单位”栏次非空，则本栏次必须非空。对接医保上传电子结算凭证时，必填";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "dj";
        readonly name: "单价";
        readonly type: "String";
        readonly length: "15,13";
        readonly required: "否";
        readonly description: "单价如“单位”栏次非空，则本栏次必须非空。对接医保上传电子结算凭证时，必填";
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
        readonly description: "优惠政策标识详见附录4";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "fymx";
        readonly name: "费用明细";
        readonly type: "String";
        readonly length: "200";
        readonly required: "否";
        readonly description: "最大33个汉字乐企开票时可用，RPA暂不支持";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "ylfwgbm";
        readonly name: "医疗服务贯标码";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "乐企开票时可用，RPA暂不支持";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "qt";
        readonly name: "其他";
        readonly type: "String";
        readonly length: "33";
        readonly required: "否";
        readonly description: "其他";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "sszdyysxh";
        readonly name: "省市自定义要素序号";
        readonly type: "Number";
        readonly length: "2";
        readonly required: "是";
        readonly description: "省市自定义要素序号从“1”开始的连续正整数";
        readonly group: "A-4 省市自定义要素明细sszdyysList";
    }, {
        readonly key: "sszdyysmc";
        readonly name: "省市自定义要素名称";
        readonly type: "String";
        readonly length: "33";
        readonly required: "否";
        readonly description: "若“省市自定义要素内容”栏次非空，则本栏次必须非空；";
        readonly group: "A-4 省市自定义要素明细sszdyysList";
    }, {
        readonly key: "sszdyysnr";
        readonly name: "省市自定义要素内容";
        readonly type: "String";
        readonly length: "33";
        readonly required: "否";
        readonly description: "若“省市自定义要素名称”栏次非空，则本栏次必须非空";
        readonly group: "A-4 省市自定义要素明细sszdyysList";
    }, {
        readonly key: "mxxh";
        readonly name: "明细序号";
        readonly type: "Number";
        readonly length: "8";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-4 诊断列表zdxxlb";
    }, {
        readonly key: "cryzdlb";
        readonly name: "出入院诊断类别";
        readonly type: "String";
        readonly length: "6";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-4 诊断列表zdxxlb";
    }, {
        readonly key: "zdlb";
        readonly name: "诊断类别";
        readonly type: "String";
        readonly length: "3";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-4 诊断列表zdxxlb";
    }, {
        readonly key: "zzzbz";
        readonly name: "主诊断标志";
        readonly type: "String";
        readonly length: "3";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-4 诊断列表zdxxlb";
    }, {
        readonly key: "zddm";
        readonly name: "诊断代码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-4 诊断列表zdxxlb";
    }, {
        readonly key: "zdmc";
        readonly name: "诊断名称";
        readonly type: "String";
        readonly length: "255";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-4 诊断列表zdxxlb";
    }, {
        readonly key: "zdsj";
        readonly name: "诊断时间";
        readonly type: "String";
        readonly length: "19";
        readonly required: "是";
        readonly description: "yyyy-MM-dd HH:mm:ss";
        readonly group: "A-4 诊断列表zdxxlb";
    }, {
        readonly key: "zdysdm";
        readonly name: "诊断医师代码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-4 诊断列表zdxxlb";
    }, {
        readonly key: "zdysxm";
        readonly name: "诊断医师姓名";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-4 诊断列表zdxxlb";
    }];
    readonly template: {
        readonly serialNumber: "";
        readonly kpdbm: "";
        readonly kpms: "";
        readonly data: {
            readonly fppz: "";
            readonly qyDm: "";
            readonly cezslxDm: "";
            readonly xsfnsrsbh: "";
            readonly xsfmc: "";
            readonly xsfdz: "";
            readonly xsfdh: "";
            readonly xsfkhh: "";
            readonly xsfzh: "";
            readonly gmfnsrsbh: "";
            readonly gmfmc: "";
            readonly gmfdz: "";
            readonly gmfdh: "";
            readonly gmfkhh: "";
            readonly gmfzh: "";
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
            readonly klx: "";
            readonly kh: "";
            readonly yljglx: "";
            readonly qtyljglx: "";
            readonly ybjgbm: "";
            readonly yblxbm: "";
            readonly qtyblx: "";
            readonly hzybbh: "";
            readonly ybxzqhm: "";
            readonly jzrq: "";
            readonly jzksmc: "";
            readonly hzjzbh: "";
            readonly hzwyid: "";
            readonly hzxm: "";
            readonly hzsfzjlxDm: "";
            readonly hzsfzjhm: "";
            readonly xb: "";
            readonly nl: "";
            readonly blh: "";
            readonly jbbm: "";
            readonly tsbzmc: "";
            readonly "\u5BF9\u63A5\u533B\u4FDD\u4E0A\u4F20\u7535\u5B50\u7ED3\u7B97\u51ED\u8BC1\uFF0C\u9644\u52A0\u4FE1\u606F\uFF1A": "";
            readonly zyzddm: "";
            readonly zyzdmc: "";
            readonly cyzddm: "";
            readonly cyzdmc: "";
            readonly jydybqh: "";
            readonly xzlx: "";
            readonly jzkssj: "";
            readonly jzjssj: "";
            readonly sylb: "";
            readonly jhsysslb: "";
            readonly tc: 0;
            readonly yzs: 0;
            readonly tes: 0;
            readonly lyfs: "";
            readonly ssczdm: "";
            readonly ssczmc: "";
            readonly swrq: "";
            readonly zzysdm: "";
            readonly zzysxm: "";
            readonly ylfl: "";
            readonly ddyljgbh: "";
            readonly ddyljgmc: "";
            readonly jgjgdm: "";
            readonly grzhzf: 0;
            readonly fhfwje: 0;
            readonly ybtcjjzf: 0;
            readonly qtybzf: 0;
            readonly zfje: 0;
            readonly grzf1: 0;
            readonly grzf2: 0;
            readonly grxjzf: 0;
            readonly yjje: 0;
            readonly bjje: 0;
            readonly tfje: 0;
            readonly grzhye: 0;
            readonly bxzje: 0;
            readonly jsh: "";
            readonly jssj: "";
            readonly ywrq: "";
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
                readonly fymx: "";
                readonly ylfwgbm: "";
                readonly qt: "";
            }];
            readonly sszdyysmx: [{
                readonly sszdyysxh: 0;
                readonly sszdyysmc: "";
                readonly sszdyysnr: "";
            }];
            readonly zdxxlb: [{
                readonly mxxh: 0;
                readonly cryzdlb: "";
                readonly zdlb: "";
                readonly zzzbz: "";
                readonly zddm: "";
                readonly zdmc: "";
                readonly zdsj: "";
                readonly zdysdm: "";
                readonly zdysxm: "";
            }];
        };
    };
}, {
    readonly category: "";
    readonly name: "医疗住院全电蓝字发票开具";
    readonly path: "/api/medical/v1/rpa/10210100110";
    readonly method: "POST";
    readonly description: "单位内部系统发起开具蓝票服务请求，实时开具全电蓝字发票。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx";
    readonly sectionTitle: "3.2.2 医疗住院全电蓝字发票开具";
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
        readonly key: "kpms";
        readonly name: "开具模式";
        readonly type: "String";
        readonly length: "1";
        readonly required: "否";
        readonly description: "0：直接开具；1、审核开票（仅推送待开信息，在乐享平台审核开具）；2、患者自助开票（仅推送订单信息，患者扫码后自助申请开票；订单信息最多保留3个月，超期需到窗口人工开票）。如未传入，默认直接开具。";
        readonly group: "请求参数";
    }, {
        readonly key: "data";
        readonly name: "发票数据";
        readonly type: "String";
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
        readonly key: "qyDm";
        readonly name: "区域代码";
        readonly type: "String";
        readonly length: "2";
        readonly required: "否";
        readonly description: "省级行政区域代码详见附录2";
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
        readonly key: "gmfnsrsbh";
        readonly name: "（购买方）统一社会信用代码/纳税人识别号/身份证件号码";
        readonly type: "String";
        readonly length: "26";
        readonly required: "否";
        readonly description: "（购买方）统一社会信用代码/纳税人识别号/身份证件号码。开具数电专票时，必填";
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
        readonly description: "结算方式详见附录3";
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
        readonly length: "50";
        readonly required: "是";
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
        readonly description: "证件类型编码，见附录11：开票人证件类型";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "skrxm";
        readonly name: "收款人姓名";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "fhrxm";
        readonly name: "复核人姓名";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "bz";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "300";
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
        readonly key: "klx";
        readonly name: "卡类型";
        readonly type: "String";
        readonly length: "10";
        readonly required: "否";
        readonly description: "附录1：卡类型列表";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "kh";
        readonly name: "卡号";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "根据卡类型填写";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "yljglx";
        readonly name: "医疗机构类型";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "填写医疗机构类型名称。值域见附录8:医疗机构类型代码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "qtyljglx";
        readonly name: "其他医疗机构类型";
        readonly type: "String";
        readonly length: "33";
        readonly required: "否";
        readonly description: "填写上述医疗机构类型没有的类型，“医疗机构类型”和“其他医疗机构类型”只能填写一个。";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ybjgbm";
        readonly name: "医保机构编码";
        readonly type: "String";
        readonly length: "60";
        readonly required: "否";
        readonly description: "医保机构的唯一编码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "yblxbm";
        readonly name: "医保类型编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "01：职工基本医疗保险02：城乡居民基本医疗保险03：离休04：其他医疗保险05：自费";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "qtyblx";
        readonly name: "其他医保类型";
        readonly type: "String";
        readonly length: "33";
        readonly required: "否";
        readonly description: "填写上述医保类型代码没有的类型，“医保类型代码”和“其他医保类型”只能填写一个。";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hzybbh";
        readonly name: "患者医保编号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "参保人在医保系统中的唯一标识(医保号)，医保实时结算必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ybxzqhm";
        readonly name: "参保地医保区划";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "医保机构的唯一标识，医保实时结算必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ryksmc";
        readonly name: "入院科室名称";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "cyksmc";
        readonly name: "出院科室名称";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hzjzbh";
        readonly name: "患者住院号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "从入院到出院结束后，整个流程的唯一号";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zyjzbh";
        readonly name: "住院就诊编号";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "住院期间，存在多次结算，结算后会重新生成一个住院就诊编号，如无就诊编号，可等于患者住院号";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hzwyid";
        readonly name: "患者唯一ID";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "患者在业务系统中的唯一标识ID，类似身份证号码。";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hzxm";
        readonly name: "患者姓名";
        readonly type: "String";
        readonly length: "50";
        readonly required: "是";
        readonly description: "患者姓名。未填入，默认取购买方名称";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hzsfzjlxDm";
        readonly name: "患者身份证件类型代码";
        readonly type: "String";
        readonly length: "3";
        readonly required: "是";
        readonly description: "患者身份证件类型代码，详见附录7。未填入默认为201：居民身份证";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "hzsfzjhm";
        readonly name: "患者身份证件号码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "未填入且购买方是自然人时，默认取购买方身份证件号码";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xb";
        readonly name: "性别";
        readonly type: "String";
        readonly length: "4";
        readonly required: "是";
        readonly description: "值为：男、女";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "nl";
        readonly name: "年龄";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "bq";
        readonly name: "病区";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ch";
        readonly name: "床号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "blh";
        readonly name: "病历号";
        readonly type: "String";
        readonly length: "20";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jbbm";
        readonly name: "疾病编码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zyrq";
        readonly name: "住院日期";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "格式:yyyy-MM-dd";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "cyrq";
        readonly name: "出院日期";
        readonly type: "String";
        readonly length: "10";
        readonly required: "是";
        readonly description: "格式:yyyy-MM-dd";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zyts";
        readonly name: "住院天数";
        readonly type: "Number";
        readonly length: "6,2";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zyzddm";
        readonly name: "主要诊断代码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zyzdmc";
        readonly name: "主要诊断名称";
        readonly type: "String";
        readonly length: "255";
        readonly required: "否";
        readonly description: "对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "cyzddm";
        readonly name: "次要诊断代码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "cyzdmc";
        readonly name: "次要诊断名称";
        readonly type: "String";
        readonly length: "255";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jydybqh";
        readonly name: "就医地医保区划";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "就医地医保机构的唯一标识，医保结算时必须填写";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "xzlx";
        readonly name: "险种类型";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "详见附录9，医保实时结算必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jzkssj";
        readonly name: "开始时间";
        readonly type: "String";
        readonly length: "19";
        readonly required: "否";
        readonly description: "yyyy-MM-dd HH:mm:ss 对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jzjssj";
        readonly name: "结束时间";
        readonly type: "String";
        readonly length: "19";
        readonly required: "否";
        readonly description: "yyyy-MM-dd HH:mm:ss 对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sylb";
        readonly name: "生育类别";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jhsysslb";
        readonly name: "计划生育手术类别";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "tc";
        readonly name: "胎次";
        readonly type: "Number";
        readonly length: "3";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "yzs";
        readonly name: "孕周数";
        readonly type: "Number";
        readonly length: "2";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "tes";
        readonly name: "胎儿数";
        readonly type: "Number";
        readonly length: "3";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "lyfs";
        readonly name: "离院方式";
        readonly type: "String";
        readonly length: "3";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ssczdm";
        readonly name: "手术操作代码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ssczmc";
        readonly name: "手术操作名称";
        readonly type: "String";
        readonly length: "500";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "swrq";
        readonly name: "死亡日期";
        readonly type: "String";
        readonly length: "8";
        readonly required: "否";
        readonly description: "yyyyMMdd";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zzysdm";
        readonly name: "主诊医师代码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zzysxm";
        readonly name: "主诊医师姓名";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zyzzddm";
        readonly name: "住院主诊断代码";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zyzzdmc";
        readonly name: "住院主诊断名称";
        readonly type: "String";
        readonly length: "300";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ylfl";
        readonly name: "医疗分类";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "详见附录10。对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ddyljgbh";
        readonly name: "定点医疗机构编号";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ddyljgmc";
        readonly name: "定点医疗机构名称";
        readonly type: "String";
        readonly length: "255";
        readonly required: "否";
        readonly description: "对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jgjgdm";
        readonly name: "监管机构代码";
        readonly type: "String";
        readonly length: "6";
        readonly required: "否";
        readonly description: "对接医保上传电子结算凭证时，必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "grzhzf";
        readonly name: "个人账户支付";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "按政策规定用个人账户支付参保人的医疗费用（含基本医疗保险目录范围内和目录范围外的费用）；如无金额，填写0";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "fhfwje";
        readonly name: "符合范围金额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "如无金额，填写0。医保实时结算必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "ybtcjjzf";
        readonly name: "医保统筹基金支付";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "患者本次就医所发生的医疗费用中按规定由基本医疗保险统筹基金支付的金额；如无金额，填写0。医保实时结算必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "qtybzf";
        readonly name: "其它医保支付";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "患者本次就医所发生的医疗费用中按规定由大病保险、医疗救助、公务员医疗补助、大额补充、企业补充等基金或资金支付的金额；如无金额，填写0";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zfje";
        readonly name: "自费金额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "患者本次就医所发生的医疗费用中按照有关规定不属于基本医疗保险目录范围而全部由个人支付的费用；如无金额，填写0";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "grzf1";
        readonly name: "个人自负";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "医保患者起付标准内个人支付费用；如无金额，填写0";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "grzf2";
        readonly name: "个人自付";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "患者本次就医所发生的医疗费用中由个人负担的属于基本医疗保险目录范围内自付部分的金额；开展按病种、病组、床日等打包付费方式且由患者定额付费的费用。该项为个人所得税大病医疗专项附加扣除信；息项如无金额，填写0";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "grxjzf";
        readonly name: "个人现金支付";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "是";
        readonly description: "个人通过现金、银行卡、微信、支付宝等渠道支付的金额；如无金额，填写0";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "yjje";
        readonly name: "预缴金额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "bjje";
        readonly name: "补缴金额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "tfje";
        readonly name: "退费金额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "grzhye";
        readonly name: "个人账户余额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "bxzje";
        readonly name: "报销总金额";
        readonly type: "Number";
        readonly length: "14,2";
        readonly required: "否";
        readonly description: "医保结算后返回的总金额";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jkr";
        readonly name: "交款人";
        readonly type: "String";
        readonly length: "33";
        readonly required: "否";
        readonly description: "住院收费明细中的交款人";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "skdw";
        readonly name: "收款单位";
        readonly type: "String";
        readonly length: "33";
        readonly required: "否";
        readonly description: "住院收费明细中的收款单位";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jsh";
        readonly name: "结算号";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "医保结算后生成的号码/入账唯一值。医保实时结算必填";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "jssj";
        readonly name: "结算时间";
        readonly type: "String";
        readonly length: "19";
        readonly required: "否";
        readonly description: "患者就医时间格式：yyyy-MM-dd HH:mm:ss医保实时结算必填";
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
        readonly key: "fpmx";
        readonly name: "发票明细";
        readonly type: "List";
        readonly length: "";
        readonly required: "是";
        readonly description: "发票明细详见A-2,JSON格式列表";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sfmx";
        readonly name: "收费明细";
        readonly type: "List";
        readonly length: "";
        readonly required: "是";
        readonly description: "收费明细详见A-3,JSON格式列表";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "sszdyysmx";
        readonly name: "省市自定义要素明细";
        readonly type: "List";
        readonly length: "";
        readonly required: "否";
        readonly description: "省市自定义要素明细详见A-4,JSON格式列表";
        readonly group: "A-1 发票数据data";
    }, {
        readonly key: "zdxxlb";
        readonly name: "诊断信息列表";
        readonly type: "List";
        readonly length: "";
        readonly required: "否";
        readonly description: "诊断信息列表详见A-5,JSON格式列表";
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
        readonly description: "数量如“单位”栏次非空，则本栏次必须非空。对接医保上传电子结算凭证时，必填";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "dj";
        readonly name: "单价";
        readonly type: "String";
        readonly length: "15,13";
        readonly required: "否";
        readonly description: "单价如“单位”栏次非空，则本栏次必须非空。对接医保上传电子结算凭证时，必填";
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
        readonly key: "bz";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "33";
        readonly required: "否";
        readonly description: "备注";
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
        readonly description: "优惠政策标识详见附录4";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "fymx";
        readonly name: "费用明细";
        readonly type: "String";
        readonly length: "100";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-2 发票明细fpmx";
    }, {
        readonly key: "zysfmxxh";
        readonly name: "住院收费明细序号";
        readonly type: "Number";
        readonly length: "8";
        readonly required: "是";
        readonly description: "住院收费明细中对应的明细序号";
        readonly group: "A-3 收费明细fpmx";
    }, {
        readonly key: "mxxh";
        readonly name: "发票明细序号";
        readonly type: "Number";
        readonly length: "8";
        readonly required: "是";
        readonly description: "住院收费明细对应的发票票面明细序号";
        readonly group: "A-3 收费明细fpmx";
    }, {
        readonly key: "fymx";
        readonly name: "费用明细";
        readonly type: "String";
        readonly length: "33";
        readonly required: "是";
        readonly description: "住院收费明细某行明细的项目名称。";
        readonly group: "A-3 收费明细fpmx";
    }, {
        readonly key: "sl";
        readonly name: "数量";
        readonly type: "String";
        readonly length: "25";
        readonly required: "否";
        readonly description: "住院收费明细某行明细的数量";
        readonly group: "A-3 收费明细fpmx";
    }, {
        readonly key: "dw";
        readonly name: "单位";
        readonly type: "String";
        readonly length: "300";
        readonly required: "否";
        readonly description: "住院收费明细某行明细的单位";
        readonly group: "A-3 收费明细fpmx";
    }, {
        readonly key: "je";
        readonly name: "金额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "住院收费明细某行明细的金额";
        readonly group: "A-3 收费明细fpmx";
    }, {
        readonly key: "slv";
        readonly name: "增值税税率/征收率";
        readonly type: "Number";
        readonly length: "10,6";
        readonly required: "是";
        readonly description: "增值税税率/征收率";
        readonly group: "A-3 收费明细fpmx";
    }, {
        readonly key: "se";
        readonly name: "税额";
        readonly type: "Number";
        readonly length: "16,2";
        readonly required: "是";
        readonly description: "住院收费明细某行明细的税额";
        readonly group: "A-3 收费明细fpmx";
    }, {
        readonly key: "ylfwgbm";
        readonly name: "医疗服务贯标码";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "医疗服务贯标码";
        readonly group: "A-3 收费明细fpmx";
    }, {
        readonly key: "fyfssj";
        readonly name: "费用发生时间";
        readonly type: "String";
        readonly length: "19";
        readonly required: "否";
        readonly description: "yyyy-MM-dd HH:mm:ss。对接医保上传电子结算凭证时，必填";
        readonly group: "A-3 收费明细fpmx";
    }, {
        readonly key: "ylmlbm";
        readonly name: "医疗目录编码";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "对接医保上传电子结算凭证时，必填";
        readonly group: "A-3 收费明细fpmx";
    }, {
        readonly key: "bz";
        readonly name: "备注";
        readonly type: "String";
        readonly length: "33";
        readonly required: "否";
        readonly description: "备注";
        readonly group: "A-3 收费明细fpmx";
    }, {
        readonly key: "sszdyysxh";
        readonly name: "省市自定义要素序号";
        readonly type: "Number";
        readonly length: "2";
        readonly required: "是";
        readonly description: "省市自定义要素序号从“1”开始的连续正整数";
        readonly group: "A-4 省市自定义要素明细sszdyysmx";
    }, {
        readonly key: "sszdyysmc";
        readonly name: "省市自定义要素名称";
        readonly type: "String";
        readonly length: "33";
        readonly required: "否";
        readonly description: "若“省市自定义要素内容”栏次非空，则本栏次必须非空；";
        readonly group: "A-4 省市自定义要素明细sszdyysmx";
    }, {
        readonly key: "sszdyysnr";
        readonly name: "省市自定义要素内容";
        readonly type: "String";
        readonly length: "33";
        readonly required: "否";
        readonly description: "若“省市自定义要素名称”栏次非空，则本栏次必须非空";
        readonly group: "A-4 省市自定义要素明细sszdyysmx";
    }, {
        readonly key: "mxxh";
        readonly name: "明细序号";
        readonly type: "Number";
        readonly length: "8";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-5 诊断列表zdxxlb";
    }, {
        readonly key: "cryzdlb";
        readonly name: "出入院诊断类别";
        readonly type: "String";
        readonly length: "6";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-5 诊断列表zdxxlb";
    }, {
        readonly key: "zdlb";
        readonly name: "诊断类别";
        readonly type: "String";
        readonly length: "3";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-5 诊断列表zdxxlb";
    }, {
        readonly key: "zzzbz";
        readonly name: "主诊断标志";
        readonly type: "String";
        readonly length: "3";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-5 诊断列表zdxxlb";
    }, {
        readonly key: "zddm";
        readonly name: "诊断代码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-5 诊断列表zdxxlb";
    }, {
        readonly key: "zdmc";
        readonly name: "诊断名称";
        readonly type: "String";
        readonly length: "255";
        readonly required: "是";
        readonly description: "";
        readonly group: "A-5 诊断列表zdxxlb";
    }, {
        readonly key: "zdsj";
        readonly name: "诊断时间";
        readonly type: "String";
        readonly length: "19";
        readonly required: "是";
        readonly description: "yyyy-MM-dd HH:mm:ss";
        readonly group: "A-5 诊断列表zdxxlb";
    }, {
        readonly key: "zdysdm";
        readonly name: "诊断医师代码";
        readonly type: "String";
        readonly length: "30";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-5 诊断列表zdxxlb";
    }, {
        readonly key: "zdysxm";
        readonly name: "诊断医师姓名";
        readonly type: "String";
        readonly length: "50";
        readonly required: "否";
        readonly description: "";
        readonly group: "A-5 诊断列表zdxxlb";
    }];
    readonly template: {
        readonly serialNumber: "";
        readonly kpdbm: "";
        readonly kpms: "";
        readonly data: {
            readonly fppz: "";
            readonly qyDm: "";
            readonly cezslxDm: "";
            readonly xsfnsrsbh: "";
            readonly xsfmc: "";
            readonly xsfdz: "";
            readonly xsfdh: "";
            readonly xsfkhh: "";
            readonly xsfzh: "";
            readonly gmfnsrsbh: "";
            readonly gmfmc: "";
            readonly gmfdz: "";
            readonly gmfdh: "";
            readonly gmfkhh: "";
            readonly gmfzh: "";
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
            readonly klx: "";
            readonly kh: "";
            readonly yljglx: "";
            readonly qtyljglx: "";
            readonly ybjgbm: "";
            readonly yblxbm: "";
            readonly qtyblx: "";
            readonly hzybbh: "";
            readonly ybxzqhm: "";
            readonly ryksmc: "";
            readonly cyksmc: "";
            readonly hzjzbh: "";
            readonly zyjzbh: "";
            readonly hzwyid: "";
            readonly hzxm: "";
            readonly hzsfzjlxDm: "";
            readonly hzsfzjhm: "";
            readonly xb: "";
            readonly nl: "";
            readonly bq: "";
            readonly ch: "";
            readonly blh: "";
            readonly jbbm: "";
            readonly zyrq: "";
            readonly cyrq: "";
            readonly zyts: 0;
            readonly zyzddm: "";
            readonly zyzdmc: "";
            readonly cyzddm: "";
            readonly cyzdmc: "";
            readonly jydybqh: "";
            readonly xzlx: "";
            readonly jzkssj: "";
            readonly jzjssj: "";
            readonly sylb: "";
            readonly jhsysslb: "";
            readonly tc: 0;
            readonly yzs: 0;
            readonly tes: 0;
            readonly lyfs: "";
            readonly ssczdm: "";
            readonly ssczmc: "";
            readonly swrq: "";
            readonly zzysdm: "";
            readonly zzysxm: "";
            readonly zyzzddm: "";
            readonly zyzzdmc: "";
            readonly ylfl: "";
            readonly ddyljgbh: "";
            readonly ddyljgmc: "";
            readonly jgjgdm: "";
            readonly grzhzf: 0;
            readonly fhfwje: 0;
            readonly ybtcjjzf: 0;
            readonly qtybzf: 0;
            readonly zfje: 0;
            readonly grzf1: 0;
            readonly grzf2: 0;
            readonly grxjzf: 0;
            readonly yjje: 0;
            readonly bjje: 0;
            readonly tfje: 0;
            readonly grzhye: 0;
            readonly bxzje: 0;
            readonly jkr: "";
            readonly skdw: "";
            readonly jsh: "";
            readonly jssj: "";
            readonly ywrq: "";
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
                readonly bz: "";
                readonly hsje: 0;
                readonly kce: 0;
                readonly spfwssflbm: "";
                readonly fphxz: "";
                readonly yhzcbs: "";
                readonly fymx: "";
            }];
            readonly sfmx: [{
                readonly zysfmxxh: 0;
                readonly mxxh: 0;
                readonly fymx: "";
                readonly sl: "";
                readonly dw: "";
                readonly je: 0;
                readonly slv: 0;
                readonly se: 0;
                readonly ylfwgbm: "";
                readonly fyfssj: "";
                readonly ylmlbm: "";
                readonly bz: "";
            }];
            readonly sszdyysmx: [{
                readonly sszdyysxh: 0;
                readonly sszdyysmc: "";
                readonly sszdyysnr: "";
            }];
            readonly zdxxlb: [{
                readonly mxxh: 0;
                readonly cryzdlb: "";
                readonly zdlb: "";
                readonly zzzbz: "";
                readonly zddm: "";
                readonly zdmc: "";
                readonly zdsj: "";
                readonly zdysdm: "";
                readonly zdysxm: "";
            }];
        };
    };
}, {
    readonly category: "";
    readonly name: "全电蓝字发票开具结果查询";
    readonly path: "/api/standard/v1/rpa/102101005";
    readonly method: "POST";
    readonly description: "单位内部系统通过流水号和纳税人识别号发起蓝票开具接口服务请求，获取发票开具结果。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx";
    readonly sectionTitle: "3.2.3 全电蓝字发票开具结果查询";
    readonly fields: [{
        readonly key: "serialNumber";
        readonly name: "流水号";
        readonly type: "String";
        readonly length: "32";
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
    readonly name: "全电蓝字发票全额红冲";
    readonly path: "/api/standard/v1/rpa/102101025";
    readonly method: "POST";
    readonly description: "单位内部系统组装红字确认单数据发起全电红字发票开具请求，进行红字确认单申请并开具红票操作，全额冲红全电蓝字发票。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx";
    readonly sectionTitle: "3.2.4 全电蓝字发票全额红冲";
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
        readonly description: "红字发票冲红原因代码详见附录6";
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
    readonly name: "全电发票版式文件下载";
    readonly path: "/api/standard/v1/rpa/103101006";
    readonly method: "POST";
    readonly description: "查询开具的全电发票版式文件，支持PDF。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx";
    readonly sectionTitle: "3.2.5 全电发票版式文件下载";
    readonly fields: [{
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
        readonly fplx: "";
        readonly fphm: "";
        readonly kprq: "";
        readonly wjlx: "";
    };
}, {
    readonly category: "发票查看";
    readonly name: "查看全电发票H5页面地址";
    readonly path: "/api/standard/v1/rpa/103101014";
    readonly method: "POST";
    readonly description: "查询全电发票H5页面地址信息。";
    readonly sourceDoc: "乐享协同数字化电子发票接口规范（医疗） v1.0.18.docx";
    readonly sectionTitle: "3.3.1 查看全电发票H5页面地址";
    readonly fields: [];
    readonly template: {};
}];

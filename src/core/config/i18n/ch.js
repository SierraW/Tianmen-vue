// China
export const locale = {
  TRANSLATOR: {
    SELECT: "选择你的语言"
  },
  GREETING: {
    HI: "您好，",
    SIGN_OUT: "登出账号",
    USER_PROFILE: "用户资料"
  },
  ALL_HIS: {
    TABLE: "历史列表"
  },
  CATEGORY: {
    EMPTY_TITLE: "空白信息",
    EMPTY_BODY: "不能上传空白信息",
    PAGE: "客户分类管理",
    ADD: "增加",
    EXIST_SOURCE_TITLE: "类别已存在",
    EXIST_SOURCE_BODY: "类别信息已存在，无需重复添加"
  },
  SOURCE: {
    EMPTY: "空白",
    EMPTY_TITLE: "空白信息",
    EMPTY_BODY: "不能上传空白信息",
    COLL: "展开",
    PAGE: "客户来源管理",
    ADD: "增加",
    EXIST_SOURCE_TITLE: "来源已存在",
    EXIST_SOURCE_BODY: "来源信息已存在，无需重复添加"
  },
  STATE: {
    LOAD: "正在加载...",
    CANCEL: "取消",
    CANCELED: "正在取消...",
    TITLE: "状态",
    SUCCESS: "数据更新成功",
    FAIL: "数据更新失败，请重试。",
    UNEXPECTED_REFRESH: "检测到页面不正常刷新，正在返回上一页...",
    SUBS:
      "您确定要把这位客户拉入您的仪表板吗？拉入之后，没有其他人能看见这位客户，意味着您要全权负责这位客户的后续跟进了。",
    UNSUBS:
      '您确定要把这位客户放入"公海"吗？在这之后，其他人就能看到，并可能把这位客户拉入到他们的服务列表中了。',
    DEL: "您确定要删除这位客户吗？此操作不可撤回。"
  },
  ACT: {
    TAB: "激活码",
    ADD_COM: {
      TAB: "新增公司",
      NAME: "公司名称",
      SUBMIT: "添加",
      NOTI:
        "为了减少使用的内存资源，本页面采用了懒加载机制。请在添加公司之后刷新本页面，以正常使用刚添加的公司。"
    },
    MOD_NAME: "注册码生成器",
    NUM: "需要生成的激活码数量",
    ROLE: {
      NAME: "用户权限",
      ADMIN: "超级管理员",
      DEV: "管理员",
      USR: "用户"
    },
    TITLE: {
      NAME: "荣誉称号",
      FS: "Fine Studio",
      CS: "Customers",
      DEV: "开发者",
      PROM: "项目经理",
      UID: "UI设计师",
      ACM: "客户经理",
      USR: "用户"
    },
    COM: {
      NAME: "所属公司",
      FS: "Fine Studio"
    },
    DES: "短说明（选填）",
    CODE: {
      TAB: "激活码历史",
      TABLE_NAME: "激活码状态"
    },
    SUCCESS: {
      TITLE: "本次生成的激活码",
      DES: "短说明",
      NOTI:
        '为了减少使用的内存资源，本页面采用了懒加载机制。如需在"激活码历史"页面查看最近生成的激活码历史，请刷新本页面。'
    }
  },
  CUSTOMER: {
    HANDLER_NAME_EMPTY: "无数据",
    HANDLER_OCEAN: "公海",
    HANDLER_ID: "用户识别码: {id}",
    HANDLER: "负责人",
    DEL: "删除用户",
    CAT: "分类",
    NEW: "添加新客户",
    NEW_CUS_ID: "XinYongHu",
    CUS_ID: "客户识别码: {id}",
    OCEAN: "公海",
    STATES: "客户列表",
    MANAGEMENT: "管理面板",
    OCEAN_STATES: "公海客户列表",
    COM: "公司/邮箱",
    CON: "联系方式",
    PROG: "进度",
    ACTI: "行动",
    PUSH: "拉入此用户",
    POP: "放弃客户至公海",
    EDIT: "编辑客户资料",
    TRACK: "跟踪客户进程",
    SUPPORT_HISTORY: "管理历史",
    MESSAGE: "留言",
    ADD_MSG: "加入留言",
    ENTER_MSG: "输入新留言",
    ADVANCED_OPT: "添加项目",
    SUBMIT: "提交",
    RESET: "重置",
    HISTORY_ADV: {
      ROOT: "项目名称",
      IS_ROOT: "这是一个父类别",
      TYPE: "项目名称",
      MORE_OPT: "更多选项"
    },
    DATA: {
      WECHAT: "微信号",
      TRA: "客户来源",
      TRA_PLA: "如：YouTube视频广告",
      CAT: "客户分类",
      CAT_PLA: "如：小程序、App开发、网页开发",
      COM: "客户公司名",
      NAME: "客户姓名",
      EMAIL: "电子邮件",
      PHONE: "电话",
      GENDER: {
        NAME: "称呼",
        MALE: "先生",
        FEMALE: "女士"
      },
      EMPTY: "暂无信息",
      DESCRIPTION: "补充描述",
      PHONE_ALREADY_EXIST:
        "这个电话号码{number}已经拥有记录在册的档案了，还要继续添加吗？",
      PROGRESS: {
        IN_PROGRESS_GROUP: "进度",
        NOT_CON: "尚未联系",
        CONTACTING: "联系中 1/7",
        FIRST_CON: "初次交谈 2/7",
        PLANNING: "方案整理中 3/7",
        REQ_GATHERING: "需求沟通 4/7",
        PLANNING_SECOND: "方案整理中 5/7",
        PRICE_NEGOTIATING: "价格谈判 6/7",
        CONTRACT: "成功签约"
      },
      STATE: "项目失败"
    },
    WARNINGS: {
      RESEVERED_KEYWORD_TITLE: "系统预留名称",
      RESEVERED_KEYWORD_BODY:
        "其中一个或多个系统预留名称被占用。系统预定名称有：system、user-defined、message 不区分大小写。",
      EMPTY_MESSAGE_TITLE: "空白信息",
      EMPTY_MESSAGE_BODY: "不能留下空白信息的记录",
      PHONE_INVALID_TITLE: "电话号码格式错误",
      PHONE_INVALID_BODY:
        "电话号码需要以区域码为前缀，参考样式：+16476543210。您输入的号码为{number}。",
      EMPTY_TYPE_TITLE: "空白项目名称",
      EMPTY_TYPE_BODY: "项目名称不可留空。"
    }
  },
  MENU: {
    PROF: "个人中心",
    ALL_HIS: "所有记录",
    TAG: "标签管理",
    VER: "版本",
    ADMIN: "所有客户",
    NEW: "新",
    DATA: "客户信息",
    ACTIONS: "行动",
    ACTIVATION: "注册码",
    CREATE_POST: "创建新帖子",
    PAGES: "Pages",
    FEATURES: "特征",
    APPS: "应用",
    DASHBOARD: "仪表板"
  },
  AUTH: {
    GENERAL: {
      OR: "要么",
      SUBMIT_BUTTON: "提交",
      NO_ACCOUNT: "没有账号？",
      SIGNUP_BUTTON: "注册",
      FORGOT_BUTTON: "忘记密码",
      BACK_BUTTON: "背部",
      PRIVACY: "隐私",
      LEGAL: "法律",
      CONTACT: "联系"
    },
    LOGIN: {
      TITLE: "创建帐号",
      BUTTON: "签到"
    },
    FORGOT: {
      TITLE: "Forgot Password?",
      DESC: "Enter your email to reset your password",
      SUCCESS: "Your account has been successfully reset."
    },
    REGISTER: {
      TITLE: "Sign Up",
      DESC: "Enter your details to create your account",
      SUCCESS: "Your account has been successfuly registered."
    },
    INPUT: {
      EMAIL: "Email",
      FULLNAME: "Fullname",
      PASSWORD: "Password",
      CONFIRM_PASSWORD: "Confirm Password",
      USERNAME: "用戶名"
    },
    VALIDATION: {
      INVALID: "{{name}} is not valid",
      REQUIRED: "{{name}} is required",
      MIN_LENGTH: "{{name}} minimum length is {{min}}",
      AGREEMENT_REQUIRED: "Accepting terms & conditions are required",
      NOT_FOUND: "The requested {{name}} is not found",
      INVALID_LOGIN: "The login detail is incorrect",
      REQUIRED_FIELD: "Required field",
      MIN_LENGTH_FIELD: "Minimum field length:",
      MAX_LENGTH_FIELD: "Maximum field length:",
      INVALID_FIELD: "Field is not valid"
    }
  },
  ECOMMERCE: {
    COMMON: {
      SELECTED_RECORDS_COUNT: "Selected records count: ",
      ALL: "All",
      SUSPENDED: "Suspended",
      ACTIVE: "Active",
      FILTER: "Filter",
      BY_STATUS: "by Status",
      BY_TYPE: "by Type",
      BUSINESS: "Business",
      INDIVIDUAL: "Individual",
      SEARCH: "Search",
      IN_ALL_FIELDS: "in all fields"
    },
    ECOMMERCE: "eCommerce",
    CUSTOMERS: {
      CUSTOMERS: "顾客",
      CUSTOMERS_LIST: "客户名单",
      NEW_CUSTOMER: "New Customer",
      DELETE_CUSTOMER_SIMPLE: {
        TITLE: "Customer Delete",
        DESCRIPTION: "Are you sure to permanently delete this customer?",
        WAIT_DESCRIPTION: "Customer is deleting...",
        MESSAGE: "Customer has been deleted"
      },
      DELETE_CUSTOMER_MULTY: {
        TITLE: "Customers Delete",
        DESCRIPTION: "Are you sure to permanently delete selected customers?",
        WAIT_DESCRIPTION: "Customers are deleting...",
        MESSAGE: "Selected customers have been deleted"
      },
      UPDATE_STATUS: {
        TITLE: "Status has been updated for selected customers",
        MESSAGE: "Selected customers status have successfully been updated"
      },
      EDIT: {
        UPDATE_MESSAGE: "Customer has been updated",
        ADD_MESSAGE: "Customer has been created"
      }
    }
  }
};

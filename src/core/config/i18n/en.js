// USA
export const locale = {
  TRANSLATOR: {
    SELECT: "Select your language"
  },
  GREETING: {
    HI: "Hi,",
    SIGN_OUT: "Sign Out",
    USER_PROFILE: "User Profile"
  },
  STATE: {
    TITLE: "State",
    SUCCESS: "Upload successful!",
    FAIL: "Data upload failed... Please try again later.",
    UNEXPECTED_REFRESH: "Unexpected refresh detected",
    SUBS:
      "Are you sure to hold this customer? You will be responsible for connecting this customer after subscription.",
    UNSUBS:
      "Are you sure to release this customer? This action cannot be cancel."
  },
  ACT: {
    MOD_NAME: "Activation Code Generator",
    NUM: "Number of codes needed",
    ROLE: {
      NAME: "User Role",
      ADMIN: "Root",
      DEV: "Admin",
      USR: "User"
    },
    TITLE: {
      NAME: "User Group",
      FS: "Fine Studio",
      CS: "Customers"
    },
    COM: {
      NAME: "Company",
      FS: "Fine Studio"
    },
    DES: "Short Descriptions (Optional)"
  },
  CUSTOMER: {
    NEW: "Add New User",
    NEW_CUS_ID: "NewCustomer",
    CUS_ID: "Customer ID: {id}",
    OCEAN: "Ocean",
    STATES: "Customer List",
    MANAGEMENT: "Management Panel",
    OCEAN_STATES: "CUSTOMER OCEAN",
    COM: "Company / Email",
    CON: "CONTACT",
    PROG: "PROGRESS",
    ACTI: "ACTION",
    PUSH: "Subscribe this Customer",
    POP: "Unsubscribe",
    EDIT: "Edit Profile",
    TRACK: "Track Footprint",
    SUPPORT_HISTORY: "Support History",
    MESSAGE: "Message",
    ADD_MSG: "Leave a Message",
    ENTER_MSG: "Enter New Message",
    ADVANCED_OPT: "Advanced Options",
    SUBMIT: "Submit",
    RESET: "Reset",
    HISTORY_ADV: {
      ROOT: "Root",
      IS_ROOT: "This is a root",
      TYPE: "Type",
      MORE_OPT: "More Options"
    },
    DATA: {
      TRA: "Where to know us?",
      TRA_PLA: "Example: YouTube Ads",
      COM: "Customer's Company Name",
      NAME: "Customer's Name",
      EMAIL: "Email",
      PHONE: "Phone",
      GENDER: {
        NAME: "Gender",
        MALE: "Male",
        FEMALE: "Female"
      },
      EMPTY: "No Data",
      DESCRIPTION: "Descriptions",
      PHONE_ALREADY_EXIST:
        "This phone number {number} already has a associated profile.",
      PROGRESS: {
        IN_PROGRESS_GROUP: "Progressing",
        NOT_CON: "Have not being contact",
        CONTACTING: "Contacting 1/7",
        FIRST_CON: "Contacted 2/7",
        PLANNING: "Planning 3/7",
        REQ_GATHERING: "Requirement gathering 4/7",
        PLANNING_SECOND: "Detail planning 5/7",
        PRICE_NEGOTIATING: "Price negotiating 6/7",
        CONTRACT: "Successful"
      },
      STATE: "Project failed"
    },
    WARNINGS: {
      RESEVERED_KEYWORD_TITLE: "Reserved keyword",
      RESEVERED_KEYWORD_BODY:
        "One of system reserve keyword are being used. Reverved keyword are: system, user-defined.",
      EMPTY_MESSAGE_TITLE: "Empty Message Body",
      EMPTY_MESSAGE_BODY: "Must not pass empty message body.",
      PHONE_INVALID_TITLE: "Phone Number invalid",
      PHONE_INVALID_BODY:
        "Phone number needs area code as prefix, your input is {number}. Valid phone number example: +16476543210"
    }
  },
  MENU: {
    NEW: "new",
    DATA: "Customer Data",
    ACTIONS: "Actions",
    ACTIVATION: "Activation Code",
    CREATE_POST: "Create New Post",
    PAGES: "Pages",
    FEATURES: "Features",
    APPS: "Apps",
    DASHBOARD: "Dashboard"
  },
  AUTH: {
    GENERAL: {
      OR: "Or",
      SUBMIT_BUTTON: "Submit",
      NO_ACCOUNT: "Don't have an account?",
      SIGNUP_BUTTON: "Sign Up",
      FORGOT_BUTTON: "Forgot Password",
      BACK_BUTTON: "Back",
      PRIVACY: "Privacy",
      LEGAL: "Legal",
      CONTACT: "Contact"
    },
    LOGIN: {
      TITLE: "Login Account",
      BUTTON: "Sign In"
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
      USERNAME: "Username"
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
      CUSTOMERS: "Customers",
      CUSTOMERS_LIST: "Customers list",
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

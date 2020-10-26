// France
export const locale = {
  TRANSLATOR: {
    SELECT: "choisissez votre langue"
  },
  GREETING: {
    HI: "Bonjour,",
    SIGN_OUT: "Déconnexion",
    USER_PROFILE: "Profil utilisateur"
  },
  STATE: {
    TITLE: "State",
    SUCCESS: "Téléchargement réussi!",
    FAIL:
      "Échec du téléchargement des données ... Veuillez réessayer plus tard.",
    UNEXPECTED_REFRESH: "Unexpected refresh detected",
    SUBS:
      "Are you sure to hold this customer? You will be responsible for connecting this customer after subscription.",
    UNSUBS:
      "Are you sure to release this customer? This action cannot be cancel.",
    DEL:
      "Are you sure you want to delete this customer? This action cannot be undo."
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
    DEL: "Delete Costomer",
    TRA: "Where to know us?",
    TRA_PLA: "Example: YouTube Ads",
    NEW: "Ajouter un nouvel utilisateur",
    NEW_CUS_ID: "NouveauClient",
    CUS_ID: "Client id: {id}",
    OCEAN: "Océan",
    STATES: "Liste des clients",
    MANAGEMENT: "Panneau de gestion",
    OCEAN_STATES: "Océan client",
    COM: "Entreprise / Email",
    CON: "CONTACT",
    PROG: "PROGRÈS",
    ACTI: "ACTION",
    PUSH: "Abonnez-vous à ce client",
    POP: "Se désabonner",
    EDIT: "Modifier le profil",
    TRACK: "Suivre l'empreinte",
    SUPPORT_HISTORY: "Historique de l'assistance",
    MESSAGE: "Message",
    ADD_MSG: "laisser un message",
    ENTER_MSG: "Entrer un nouveau message",
    ADVANCED_OPT: "Options avancées",
    SUBMIT: "Soumettre",
    RESET: "Réinitialiser",
    HISTORY_ADV: {
      ROOT: "Root",
      IS_ROOT: "This is a root",
      TYPE: "Type",
      MORE_OPT: "More Options"
    },
    DATA: {
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
        CONTACTING: "Contacting",
        FIRST_CON: "Contacted",
        PLANNING: "Planning",
        REQ_GATHERING: "Requirement gathering",
        PLANNING_SECOND: "Stage planning",
        PRICE_NEGOTIATING: "Price negotiating",
        CONTRACT: "Successful"
      },
      STATE: "Project failed"
    },
    WARNINGS: {
      RESEVERED_KEYWORD_TITLE: "Reserved keyword",
      RESEVERED_KEYWORD_BODY:
        "One of system reserve keyword are being used. Reverved keyword are: system, user-defined",
      EMPTY_MESSAGE_TITLE: "Empty Message Body",
      EMPTY_MESSAGE_BODY: "Must not pass empty message body.",
      PHONE_INVALID_TITLE: "Phone Number invalid",
      PHONE_INVALID_BODY:
        "Phone number needs area code as prefix, your input is {number}. Valid phone number example: +16476543210"
    }
  },
  MENU: {
    NEW: "Nouveau",
    DATA: "Customer Data",
    ACTIONS: "Actions",
    ACTIVATION: "Code d'activation",
    CREATE_POST: "Créer un nouveau message",
    PAGES: "Pages",
    FEATURES: "Caractéristiques",
    APPS: "Apps",
    DASHBOARD: "Tableau de bord"
  },
  AUTH: {
    GENERAL: {
      OR: "Ou",
      SUBMIT_BUTTON: "Soumettre",
      NO_ACCOUNT: "Ne pas avoir de compte?",
      SIGNUP_BUTTON: "Registre",
      FORGOT_BUTTON: "Mot de passe oublié",
      BACK_BUTTON: "Back",
      PRIVACY: "Privacy",
      LEGAL: "Legal",
      CONTACT: "Contact"
    },
    LOGIN: {
      TITLE: "Créer un compte",
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
      PASSWORD: "Mot de passe",
      CONFIRM_PASSWORD: "Confirm Password",
      USERNAME: "Nom d'utilisateur"
    },
    VALIDATION: {
      INVALID: "{{name}} n'est pas valide",
      REQUIRED: "{{name}} est requis",
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
      SELECTED_RECORDS_COUNT: "Nombre d'enregistrements sélectionnés: ",
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
    ECOMMERCE: "éCommerce",
    CUSTOMERS: {
      CUSTOMERS: "Les clients",
      CUSTOMERS_LIST: "Liste des clients",
      NEW_CUSTOMER: "Nouveau client",
      DELETE_CUSTOMER_SIMPLE: {
        TITLE: "Suppression du client",
        DESCRIPTION: "Êtes-vous sûr de supprimer définitivement ce client?",
        WAIT_DESCRIPTION: "Le client est en train de supprimer ...",
        MESSAGE: "Le client a été supprimé"
      },
      DELETE_CUSTOMER_MULTY: {
        TITLE: "Supprimer les clients",
        DESCRIPTION:
          "Êtes-vous sûr de supprimer définitivement les clients sélectionnés?",
        WAIT_DESCRIPTION: "Les clients suppriment ...",
        MESSAGE: "Les clients sélectionnés ont été supprimés"
      },
      UPDATE_STATUS: {
        TITLE: "Le statut a été mis à jour pour les clients sélectionnés",
        MESSAGE:
          "Le statut des clients sélectionnés a été mis à jour avec succès"
      },
      EDIT: {
        UPDATE_MESSAGE: "Le client a été mis à jour",
        ADD_MESSAGE: "Le client a été créé"
      }
    }
  }
};

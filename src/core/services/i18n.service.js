const i18nService = {
  defaultLanguage: "ch",

  languages: [
    {
      lang: "ch",
      name: "简体中文",
      flag: process.env.BASE_URL + "media/svg/flags/034-china.svg"
    },
    {
      lang: "en",
      name: "English",
      flag: process.env.BASE_URL + "media/svg/flags/226-united-states.svg"
    },
    {
      lang: "fr",
      name: "française",
      flag: process.env.BASE_URL + "media/svg/flags/195-france.svg"
    }
  ],

  /**
   * Keep the active language in the localStorage
   * @param lang
   */
  setActiveLanguage(lang) {
    localStorage.setItem("language", lang);
  },

  /**
   * Get the current active language
   * @returns {string | string}
   */
  getActiveLanguage() {
    return localStorage.getItem("language") || this.defaultLanguage;
  }
};

export default i18nService;

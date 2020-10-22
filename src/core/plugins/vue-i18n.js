import Vue from "vue";
import VueI18n from "vue-i18n";

// Localisation language list
import { locale as en } from "@/core/config/i18n/en";
import { locale as ch } from "@/core/config/i18n/ch";
import { locale as fr } from "@/core/config/i18n/fr";

Vue.use(VueI18n);

let messages = {};
messages = { ...messages, ch, en, fr };

// get current selected language
const lang = localStorage.getItem("language") || "ch";

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: lang, // set locale
  fallbackLocale: "en",
  messages // set locale messages
});

export default i18n;

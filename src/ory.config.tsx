import type { OryClientConfiguration } from "@ory/elements-react";

const config: OryClientConfiguration = {
  sdk: {
    url: import.meta.env.VITE_ORY_SDK_URL,
  },
  project: {
    name: "Dumb Money Game",
    default_locale: "en",
    locale_behavior: "respect_accept_language",
    default_redirect_url: "/",
    registration_enabled: true,
    verification_enabled: false,
    recovery_enabled: true,
    registration_ui_url: "/auth/registration",
    verification_ui_url: "/auth/verification",
    recovery_ui_url: "/auth/recovery",
    login_ui_url: "/auth/login",
    error_ui_url: "/auth/error",
    settings_ui_url: "/settings",
  },
};

export default config;

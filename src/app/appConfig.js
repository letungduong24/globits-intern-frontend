const APPLICATION_PATH = "/";
module.exports = Object.freeze({
    AUTH_MODE: window.Configs.AUTH_MODE || "Keycloak",
    ROOT_PATH: window.Configs.ROOT_PATH || APPLICATION_PATH,
    ACTIVE_LAYOUT: window.Configs.ACTIVE_LAYOUT || "layout1", //layout1 = vertical, layout2=horizontal
    API_ENPOINT: window.Configs.API_ENPOINT || "https://test.globits.net:8080", //local
    LOGIN_PAGE: APPLICATION_PATH + "session/signin", //Nếu là Spring
    HOME_PAGE: APPLICATION_PATH + "dashboard", //Nếu là Spring
});
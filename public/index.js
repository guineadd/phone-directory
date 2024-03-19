import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/styles.css";
import Login from "./components/login/login.js";
import loginTemplate from "./components/login/login.html";
import Catalog from "./components/catalog/catalog.js";
import catalogTemplate from "./components/catalog/catalog.html";
import notificationsTemplate from "./components/notifications/notifications.html";
import Notifications from "./components/notifications/notifications.js";

// insert html templates into containers
const loginElement = document.getElementById("login-container");
loginElement.innerHTML = loginTemplate;

const catalogElement = document.getElementById("catalog-container");
catalogElement.innerHTML = catalogTemplate;

const notificationsElement = document.getElementById("notification-bar");
notificationsElement.innerHTML = notificationsTemplate;

const login = new Login();
const catalog = new Catalog();
const notifications = new Notifications();

catalog.render();
login.render();
catalog.setComponents(login, notifications);
login.setComponents(catalog, notifications);

import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/styles.css";
import Login from "./components/login/login.js";
import Catalog from "./components/catalog/catalog.js";
import Notifications from "./components/notifications/notifications.js";
import UserManagement from "./components/user-management/user-management.js";
import ΕxportPdf from "./components/export-pdf/export-pdf.js";

import loginTemplate from "./components/login/login.html";
import catalogTemplate from "./components/catalog/catalog.html";
import notificationsTemplate from "./components/notifications/notifications.html";
import userManagementTemplate from "./components/user-management/user-management.html";
import exportTemplate from "./components/export-pdf/export-pdf.html";

// insert html templates into containers
const loginElement = document.getElementById("login-container");
loginElement.innerHTML = loginTemplate;

const catalogElement = document.getElementById("catalog-container");
catalogElement.innerHTML = catalogTemplate;

const notificationsElement = document.getElementById("notification-bar");
notificationsElement.innerHTML = notificationsTemplate;

const userManagementElement = document.getElementById("user-management-container");
userManagementElement.innerHTML = userManagementTemplate;

const exportElement = document.getElementById("export-pdf-container");
exportElement.innerHTML = exportTemplate;

const login = new Login();
const catalog = new Catalog();
const notifications = new Notifications();
const userManagement = new UserManagement();
const exportPdf = new ΕxportPdf();

catalog.render();
login.render();
userManagement.render();
exportPdf.render();

catalog.setComponents(login, notifications);
login.setComponents(catalog, notifications);
userManagement.setComponents(login, notifications);

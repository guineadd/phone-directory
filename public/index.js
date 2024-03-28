import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/styles.css";
import Login from "./components/login/login.js";
import Catalog from "./components/catalog/catalog.js";
import Notifications from "./components/notifications/notifications.js";
import UserManagement from "./components/user-management/user-management.js";

import loginTemplate from "./components/login/login.html";
import catalogTemplate from "./components/catalog/catalog.html";
import notificationsTemplate from "./components/notifications/notifications.html";
import userManagementTemplate from "./components/user-management/user-management.html";

// insert html templates into containers
const loginElement = document.getElementById("login-container");
loginElement.innerHTML = loginTemplate;

const catalogElement = document.getElementById("catalog-container");
catalogElement.innerHTML = catalogTemplate;

const notificationsElement = document.getElementById("notification-bar");
notificationsElement.innerHTML = notificationsTemplate;

const userManagementElement = document.getElementById("user-management-container");
userManagementElement.innerHTML = userManagementTemplate;

const login = new Login();
const catalog = new Catalog();
const notifications = new Notifications();
const userManagement = new UserManagement();

if (sessionStorage.getItem("loggedUserType")) {
  const headerUsers = document.getElementById("header-users");
  document.getElementById("add-division-modal-button").classList.remove("hidden");
  document.getElementById("edit-division-order-button").classList.remove("hidden");

  const loginBtn = document.getElementById("login-button");
  loginBtn.innerHTML = `LOG OUT <i class="fa fa-right-from-bracket"></i>`;

  if (sessionStorage.getItem("loggedUserType") === "admin") {
    headerUsers.classList.remove("hidden");
  }
}

catalog.render();
login.render();
userManagement.render();
catalog.setComponents(login, notifications, userManagement);
login.setComponents(catalog, userManagement, notifications);
userManagement.setComponents(catalog, login, notifications);

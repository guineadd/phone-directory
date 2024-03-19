export default class Catalog {
  constructor() {
    this.loginBtn = null;
    this.showLoginModal = this.showLoginModal.bind(this);
  }

  render() {
    this.loginBtn = document.getElementById("login-button");
    this.removeClickListener(this.loginBtn, this.showLoginModal);
    this.addClickListener(this.loginBtn, this.showLoginModal);
  }

  setComponents(notifications) {
    this.notificationsComponent = notifications;
  }

  showLoginModal() {
    const loginModalContainer = document.getElementById("login-modal-container");
    if (loginModalContainer) {
      loginModalContainer.classList.remove("hidden");
    }
  }

  addClickListener(element, handler) {
    if (element) {
      element.addEventListener("click", handler);
    }
  }

  removeClickListener(element, handler) {
    if (element) {
      element.removeEventListener("click", handler);
    }
  }
}

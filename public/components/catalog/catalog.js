export default class Catalog {
  constructor() {
    this.homeBtn = null;
  }

  async render() {
    this.homeBtn = document.getElementById("home-btn");
  }

  setComponents(notifications) {
    this.notificationsComponent = notifications;
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

export default class UserManagement {
  constructor() {
    this.cancelUserModalBtn = null;
    this.hideUserModal = this.hideUserModal.bind(this);
  }

  setComponents(login, notifications) {
    this.notificationsComponent = notifications;
  }

  render() {
    this.userModalContainer = document.getElementById("user-management-modal-container");
    this.cancelUserModalBtn = document.getElementById("close-user-modal-button");
    this.cancelUserModalBtn.removeEventListener("click", this.hideUserModal);
    this.cancelUserModalBtn.addEventListener("click", this.hideUserModal);
  }

  hideUserModal() {
    if (this.userModalContainer) {
      this.userModalContainer.classList.add("hidden");
    }
  }
}

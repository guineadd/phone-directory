export default class UserManagement {
  constructor() {
    this.userModalContainer = null;
    this.cancelUserModalBtn = null;
    this.createUserBtn = null;
    this.username = null;
    this.password = null;
    this.userTypeId = null;
    this.selectedUserId = null;
    this.hideUserModal = this.hideUserModal.bind(this);
  }

  setComponents(catalog, login, notifications) {
    this.catalogComponent = catalog;
    this.notificationsComponent = notifications;
  }

  render() {
    this.userModalContainer = document.getElementById("user-management-modal-container");
    this.cancelUserModalBtn = document.getElementById("close-user-modal-button");
    this.createUserBtn = document.getElementById("create-user-button");
    this.username = document.getElementById("new-username");
    this.password = document.getElementById("new-password");
    this.userTypeId = document.getElementById("new-user-type");

    this.username.removeEventListener("input", () => this.validateCreateUser());
    this.password.removeEventListener("input", () => this.validateCreateUser());
    this.userTypeId.removeEventListener("change", () => this.validateCreateUser());
    this.username.addEventListener("input", () => this.validateCreateUser());
    this.password.addEventListener("input", () => this.validateCreateUser());
    this.userTypeId.addEventListener("change", () => this.validateCreateUser());

    this.createUserBtn.removeEventListener("click", () => this.addUser());
    this.createUserBtn.addEventListener("click", () => this.addUser());

    this.cancelUserModalBtn.removeEventListener("click", this.hideUserModal);
    this.cancelUserModalBtn.addEventListener("click", this.hideUserModal);
  }

  async buildUsers() {
    const response = await fetch("/get-users");
    const users = await response.json();

    const usersContainer = document.getElementById("users-table-body");
    usersContainer.innerHTML = "";

    users.forEach((user, index) => {
      const userContainer = document.createElement("div");
      userContainer.classList.add(
        "text-xl",
        "py-1",
        "my-1",
        "flex",
        "flex-row",
        index % 2 === 0 ? "bg-general-barsSecondary" : "bg-general-barsPrimary",
        "text-white",
        "rounded-lg",
      );

      const id = document.createElement("p");
      id.classList.add("w-2/12", "text-center");
      id.textContent = user.id;
      userContainer.appendChild(id);

      const username = document.createElement("p");
      username.classList.add("w-4/12", "text-center");
      username.textContent = user.username;
      userContainer.appendChild(username);

      const userType = document.createElement("p");
      userType.classList.add("w-3/12", "text-center");
      userType.textContent = user.UserType.type;
      userContainer.appendChild(userType);

      const deleteButtonContainer = document.createElement("div");
      deleteButtonContainer.classList.add("w-3/12", "flex", "justify-center");
      userContainer.appendChild(deleteButtonContainer);

      const deleteButton = document.createElement("button");
      deleteButton.classList.add(
        "px-3",
        "bg-white",
        "hover:bg-buttons-delete",
        "hover:text-white",
        "rounded-lg",
        "cursor-pointer",
        "text-lg",
        "text-stone-600",
        "font-semibold",
      );
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        this.catalogComponent.showModal("confirmation-modal-container", "user-management-modal-container", "userManagementModal");
        this.selectedUserId = user.id;
      });

      deleteButtonContainer.appendChild(deleteButton);
      usersContainer.appendChild(userContainer);
    });
  }

  async addUser() {
    const username = this.username.value.trim();
    const password = this.password.value.trim();
    const userTypeId = this.userTypeId.value;

    const response = await fetch("/add-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        userTypeId,
      }),
    });

    console.log(userTypeId);

    await this.catalogComponent.addLog(
      "ADD USER",
      `User ${username} has been added as ${userTypeId === "1" ? "admin" : "editor"}`,
    );

    this.username.value = "";
    this.password.value = "";
    this.userTypeId.value = "";
    this.username.focus();

    this.createUserBtn.classList.add("disabled");

    if (response.status === 200) {
      this.notificationsComponent.render(
        200,
        `User ${username} added successfully as ${userTypeId === "1" ? "admin" : "editor"}`,
      );
      await this.buildUsers();
    } else {
      this.notificationsComponent.render(500, "Error adding user. The user may already exist");
    }
  }

  async deleteUser(userId) {
    const response = await fetch(`/delete-user/${userId}`, {
      method: "DELETE",
    });

    if (response.status === 200) {
      this.notificationsComponent.render(200, "User deleted successfully");
      this.catalogComponent.hideModal("confirmation-modal-container", "user-management-modal-container", "userManagementModal");
      this.buildUsers();

      await this.catalogComponent.addLog("DELETE USER", `User with ID ${userId} has been deleted`);
    } else {
      this.notificationsComponent.render(500, "Error deleting user");
    }
  }

  validateCreateUser() {
    if (this.username.value === "" || this.password.value === "" || this.userTypeId.value === "") {
      this.createUserBtn.classList.add("disabled");
    } else {
      this.createUserBtn.classList.remove("disabled");
    }
  }

  hideUserModal() {
    if (this.userModalContainer) {
      this.userModalContainer.classList.add("hidden");

      this.username.value = "";
      this.password.value = "";
      this.userTypeId.value = "";
    }
  }
}

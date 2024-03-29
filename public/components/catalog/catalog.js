export default class Catalog {
  constructor() {
    this.loginBtn = null;
    this.cancelDepartmentModalBtn = null;
    this.cancelContactModalBtn = null;
    this.cancelModalBtn = null;
    this.closeAddBtn = null;
    this.closeConfirmBtn = null;
    this.addDepartmentModalBtn = null;
    this.addDepartmentBtn = null;
    this.saveDepartmentBtn = null;
    this.rearrangeDepartmentBtn = null;
    this.editingDepartmentOrder = null;
    this.deleteDepartmentBtn = null;
    this.confirmDeleteBtn = null;
    this.cancelAddBtn = null;
    this.cancelDeleteBtn = null;
    this.searchContactsInput = null;
    this.addContactBtn = null;
    this.saveContactBtn = null;
    this.deleteContactBtn = null;
    this.activeModal = null;
    this.dragStartListener = null;
    this.dragEndListener = null;
    this.dragOverListener = null;
    this.departmentContainer = null;
    this.departmentContainerBody = null;
  }

  render() {
    this.loginBtn = document.getElementById("login-button");
    this.createPdfBtn = document.getElementById("export-button");
    this.addDepartmentModalBtn = document.getElementById("add-department-modal-button");
    this.addDepartmentBtn = document.getElementById("add-department-button");
    this.saveDepartmentBtn = document.getElementById("save-department-button");
    this.deleteDepartmentBtn = document.getElementById("delete-department-button");
    this.rearrangeDepartmentBtn = document.getElementById("edit-department-order-button");
    this.confirmDeleteBtn = document.getElementById("confirm-delete-button");
    this.cancelAddBtn = document.getElementById("cancel-add-button");
    this.cancelDeleteBtn = document.getElementById("cancel-delete-button");
    this.searchContactsInput = document.getElementById("search-contacts");
    this.cancelDepartmentModalBtn = document.getElementById("close-edit-button");
    this.cancelContactModalBtn = document.getElementById("close-contact-button");
    this.closeAddBtn = document.getElementById("close-add-button");
    this.closeConfirmBtn = document.getElementById("close-confirm-button");
    this.addContactBtn = document.getElementById("add-contact-button");
    this.saveContactBtn = document.getElementById("save-contact-button");
    this.deleteContactBtn = document.getElementById("delete-contact-button");
    this.departmentContainer = document.getElementById("catalog-departments");
    this.buildDepartments();

    this.searchContactsInput.removeEventListener("input", () => this.searchContacts());
    this.searchContactsInput.addEventListener("input", () => this.searchContacts());

    const telInputHandler = event => {
      const telephonesInput = event.target;
      const telephonesValue = telephonesInput.value;

      // remove any characters that are not numbers, commas, or spaces
      let sanitizedValue = telephonesValue.replace(/[^0-9, ]/g, "");

      // remove zeros at the start of the string or immediately after a comma followed by any number of spaces
      sanitizedValue = sanitizedValue.replace(/^0+|,( )*0+/g, match => (match.includes(",") ? ", " : ""));

      // limit to three digits in a row
      sanitizedValue = sanitizedValue.replace(/(\d{3})\d+/g, "$1");

      // update the input field value with the sanitized value
      telephonesInput.value = sanitizedValue;

      // trigger the validation function
      this.validateContactDetails();
    };

    const departmentName = document.getElementById("add-department-name");

    const contactTel = document.getElementById("contact-tel");
    const selectedContactTel = document.getElementById("selected-contact-tel");
    const contactFirstName = document.getElementById("contact-first-name");
    const selectedContactFirstName = document.getElementById("selected-contact-first-name");
    const contactLastName = document.getElementById("contact-last-name");
    const selectedContactLastName = document.getElementById("selected-contact-last-name");

    departmentName.addEventListener("input", () => this.validateDepartmentDetails());
    // departmentOrder.addEventListener("input", () => this.validateDepartmentDetails());

    contactTel.addEventListener("input", event => telInputHandler(event));
    selectedContactTel.addEventListener("input", event => telInputHandler(event));
    contactFirstName.addEventListener("input", () => this.validateContactDetails());
    selectedContactFirstName.addEventListener("input", () => this.validateContactDetails());
    contactLastName.addEventListener("input", () => this.validateContactDetails());
    selectedContactLastName.addEventListener("input", () => this.validateContactDetails());

    this.removeClickListener(this.addDepartmentModalBtn, () => {
      this.activeModal = "addDepartmentModal";
      this.showModal("department-add-modal-container", "", "addDepartmentModal");
    });
    this.addClickListener(this.addDepartmentModalBtn, () => {
      this.activeModal = "addDepartmentModal";
      this.showModal("department-add-modal-container", "", "addDepartmentModal");
    });

    this.removeClickListener(this.cancelAddBtn, () => {
      departmentName.value = "";
      this.addDepartmentBtn.classList.add("disabled");
      this.hideModal("department-add-modal-container");
    });
    this.addClickListener(this.cancelAddBtn, () => {
      departmentName.value = "";
      this.addDepartmentBtn.classList.add("disabled");
      this.hideModal("department-add-modal-container");
    });

    this.removeClickListener(this.closeAddBtn, () => {
      departmentName.value = "";
      this.addDepartmentBtn.classList.add("disabled");
      this.hideModal("department-add-modal-container");
    });
    this.addClickListener(this.closeAddBtn, () => {
      departmentName.value = "";
      this.addDepartmentBtn.classList.add("disabled");
      this.hideModal("department-add-modal-container");
    });

    this.editingDepartmentOrder = true;
    this.rearrangeDepartmentBtn.addEventListener("click", () => {
      if (this.editingDepartmentOrder) {
        this.editDepartmentOrder();
        this.rearrangeDepartmentBtn.textContent = "Save order";
      } else {
        this.saveDepartmentOrder();
        this.rearrangeDepartmentBtn.textContent = "Edit order";
      }

      this.editingDepartmentOrder = !this.editingDepartmentOrder;
    });

    this.dragStartListener = event => {
      const draggable = event.target;
      draggable.classList.add("dragging");
    };

    this.dragEndListener = event => {
      const draggable = event.target;
      draggable.classList.remove("dragging");
    };

    this.dragOverListener = event => {
      event.preventDefault();
      const afterElement = this.getDrafAfterElement(this.departmentContainerBody, event.clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElement === null) {
        this.departmentContainerBody.appendChild(draggable);
      } else {
        this.departmentContainerBody.insertBefore(draggable, afterElement);
      }
    };

    // this.removeClickListener(this.closeAddBtn, () => {
    //   departmentName.value = "";
    //   this.addDepartmentBtn.classList.add("disabled");
    //   this.hideModal("department-add-modal-container");
    // });
    // this.addClickListener(this.closeAddBtn, () => {
    //   departmentName.value = "";
    //   this.addDepartmentBtn.classList.add("disabled");
    //   this.hideModal("department-add-modal-container");
    // });

    this.removeClickListener(this.deleteDepartmentBtn, () =>
      this.showModal("confirmation-modal-container", "department-edit-modal-container", "editDepartmentModal"),
    );
    this.addClickListener(this.deleteDepartmentBtn, () =>
      this.showModal("confirmation-modal-container", "department-edit-modal-container", "editDepartmentModal"),
    );
    this.removeClickListener(this.deleteContactBtn, () =>
      this.showModal("confirmation-modal-container", "contact-edit-modal-container", "editContactModal"),
    );
    this.addClickListener(this.deleteContactBtn, () =>
      this.showModal("confirmation-modal-container", "contact-edit-modal-container", "editContactModal"),
    );
    this.removeClickListener(this.closeConfirmBtn, () =>
      this.hideModal("confirmation-modal-container", "department-edit-modal-container", "editDepartmentModal"),
    );
    this.addClickListener(this.closeConfirmBtn, () =>
      this.hideModal("confirmation-modal-container", "department-edit-modal-container", "editDepartmentModal"),
    );

    this.removeClickListener(this.closeConfirmBtn, () =>
      this.hideModal("confirmation-modal-container", "contact-edit-modal-container", "editContactModal"),
    );
    this.addClickListener(this.closeConfirmBtn, () =>
      this.hideModal("confirmation-modal-container", "contact-edit-modal-container", "editContactModal"),
    );

    this.removeClickListener(this.closeConfirmBtn, () =>
      this.hideModal("confirmation-modal-container", "user-management-modal-container", "userManagementModal"),
    );
    this.addClickListener(this.closeConfirmBtn, () =>
      this.hideModal("confirmation-modal-container", "user-management-modal-container", "userManagementModal"),
    );

    this.removeClickListener(this.cancelDeleteBtn, () =>
      this.hideModal("confirmation-modal-container", "department-edit-modal-container", "editDepartmentModal"),
    );
    this.addClickListener(this.cancelDeleteBtn, () =>
      this.hideModal("confirmation-modal-container", "department-edit-modal-container", "editDepartmentModal"),
    );

    this.removeClickListener(this.cancelDeleteBtn, () =>
      this.hideModal("confirmation-modal-container", "user-management-modal-container", "userManagementModal"),
    );
    this.addClickListener(this.cancelDeleteBtn, () =>
      this.hideModal("confirmation-modal-container", "user-management-modal-container", "userManagementModal"),
    );

    // this.removeClickListener(this.cancelAddBtn, () => this.hideModal("department-add-modal-container"));
    // this.addClickListener(this.cancelAddBtn, () => this.hideModal("department-add-modal-container"));

    this.removeClickListener(this.cancelDeleteBtn, () =>
      this.hideModal("confirmation-modal-container", "contact-edit-modal-container", "editContactModal"),
    );
    this.addClickListener(this.cancelDeleteBtn, () =>
      this.hideModal("confirmation-modal-container", "contact-edit-modal-container", "editContactModal"),
    );

    this.removeClickListener(this.cancelDepartmentModalBtn, () => {
      document.getElementById("contact-first-name").value = "";
      document.getElementById("contact-last-name").value = "";
      document.getElementById("contact-comment").value = "";
      document.getElementById("contact-tel").value = "";

      this.hideModal("department-edit-modal-container");
    });
    this.addClickListener(this.cancelDepartmentModalBtn, () => {
      document.getElementById("contact-first-name").value = "";
      document.getElementById("contact-last-name").value = "";
      document.getElementById("contact-comment").value = "";
      document.getElementById("contact-tel").value = "";

      this.hideModal("department-edit-modal-container");
    });

    this.removeClickListener(this.cancelContactModalBtn, () => this.hideModal("contact-edit-modal-container"));
    this.addClickListener(this.cancelContactModalBtn, () => this.hideModal("contact-edit-modal-container"));

    this.removeClickListener(this.addDepartmentBtn, () => this.addDepartment());
    this.addClickListener(this.addDepartmentBtn, () => this.addDepartment());

    this.removeClickListener(this.saveDepartmentBtn, () => this.saveDepartment());
    this.addClickListener(this.saveDepartmentBtn, () => this.saveDepartment());

    this.removeClickListener(this.confirmDeleteBtn, () => {
      if (this.activeModal === "editDepartmentModal") {
        this.deleteDepartment();
      } else if (this.activeModal === "editContactModal") {
        this.deleteContact();
      } else {
        this.userManagementComponent.deleteUser(this.userManagementComponent.selectedUserId);
      }
    });
    this.addClickListener(this.confirmDeleteBtn, () => {
      if (this.activeModal === "editDepartmentModal") {
        this.deleteDepartment();
      } else if (this.activeModal === "editContactModal") {
        this.deleteContact();
      } else {
        this.userManagementComponent.deleteUser(this.userManagementComponent.selectedUserId);
      }
    });

    this.removeClickListener(this.addContactBtn, () => this.addContact());
    this.addClickListener(this.addContactBtn, () => this.addContact());

    this.removeClickListener(this.saveContactBtn, () => this.editContact());
    this.addClickListener(this.saveContactBtn, () => this.editContact());

    this.removeClickListener(this.loginBtn, () => this.showModal("login-modal-container"));
    this.addClickListener(this.loginBtn, () => this.showModal("login-modal-container"));
  }

  setComponents(login, notifications, userManagement) {
    this.notificationsComponent = notifications;
    this.userManagementComponent = userManagement;
  }

  showModal(modal1Id, modal2Id, activeModal) {
    const modal1 = document.getElementById(modal1Id);
    if (modal1) {
      if (modal1Id === "login-modal-container" && sessionStorage.getItem("loggedUserType")) {
        return;
      }

      if (modal1Id === "department-edit-modal-container") {
        const selectedDepartment = document.querySelector(".department-list-item.selected");
        const selectedDepartmentId = selectedDepartment.id.split("-")[1];

        if (selectedDepartmentId === "2") {
          document.getElementById("delete-department-button").classList.add("disabled");
        } else {
          document.getElementById("delete-department-button").classList.remove("disabled");
        }
      }

      modal1.classList.remove("hidden");

      if (modal1Id === "login-modal-container") {
        const username = document.getElementById("username");
        username.focus();
      } else if (modal1Id === "department-add-modal-container") {
        const departmentName = document.getElementById("add-department-name");
        departmentName.focus();
      }

      const message = document.getElementById("confirmation-message");
      if (activeModal === "editDepartmentModal") {
        message.textContent =
          "Are you sure you want to delete this department? All contacts will be moved to the last department.";
      } else if (activeModal === "editContactModal") {
        message.textContent = "Are you sure you want to delete this contact? This action cannot be undone.";
      } else if (activeModal === "userManagementModal") {
        message.textContent = "Are you sure you want to delete this user? This action cannot be undone.";
      }

      if (modal2Id && activeModal === this.activeModal) {
        const modal2 = document.getElementById(modal2Id);
        modal2.classList.add("hidden");
      }
    }
  }

  hideModal(modal1Id, modal2Id, activeModal) {
    const modal1 = document.getElementById(modal1Id);
    if (modal1) {
      modal1.classList.add("hidden");

      if (modal2Id && activeModal === this.activeModal) {
        const modal2 = document.getElementById(modal2Id);
        modal2.classList.remove("hidden");

        if (activeModal === "userManagementModal") {
          document.getElementById("new-username").focus();
        }
      }
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

  editDepartmentOrder() {
    const draggables = document.querySelectorAll(".department-list-item-draggable");
    this.departmentContainer.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    this.departmentContainer.style.boxShadow = "0 0 10px 3px rgba(255, 255, 255)";

    draggables.forEach(draggable => {
      draggable.style.cursor = "grab";
      const buttons = draggable.querySelectorAll("button");
      buttons.forEach(button => {
        button.style.cursor = "grab";
      });
      draggable.addEventListener("dragstart", this.dragStartListener);
      draggable.addEventListener("dragend", this.dragEndListener);
    });

    this.departmentContainerBody.addEventListener("dragover", this.dragOverListener);
  }

  async saveDepartmentOrder() {
    const departmentList = document.querySelectorAll(".department-list-item-draggable");
    const departmentObjectsArray = [];

    departmentList.forEach((department, index) => {
      const button = department.querySelector("button");
      const buttonText = button.textContent;
      const divId = department.getAttribute("id").split("-");
      const idNumber = divId[1].trim();

      if (buttonText.trim() !== "ΧΩΡΙΣ ΚΑΤΗΓΟΡΙΑ" && buttonText.trim() !== "ΔΙΕΥΘΥΝΣΗ") {
        const departmentObject = {
          id: idNumber,
          name: buttonText,
          order: index + 2,
        };
        departmentObjectsArray.push(departmentObject);
      }
    });

    await fetch("/update-department-order", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(departmentObjectsArray),
    });

    const draggables = document.querySelectorAll(".department-list-item-draggable");

    draggables.forEach(draggable => {
      draggable.style.cursor = "pointer";
      const buttons = draggable.querySelectorAll("button");
      buttons.forEach(button => {
        button.style.cursor = "pointer";
      });

      draggable.removeEventListener("dragstart", this.dragStartListener);
      draggable.removeEventListener("dragend", this.dragEndListener);
      this.departmentContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      this.departmentContainer.style.boxShadow = "none";
    });

    await this.addLog("UPDATE DEPARTMENT ORDER", "The order of the departments has been updated");

    this.departmentContainer.removeEventListener("dragover", this.dragOverListener);
    this.notificationsComponent.render(200, "Successfully updated departments' order.");
  }

  getDrafAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".department-list-item-draggable:not(.dragging)")];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }

        return closest;
      },
      { offset: Number.NEGATIVE_INFINITY },
    ).element;
  }

  async buildDepartments() {
    const response = await fetch("/get-departments");
    const data = await response.json();
    data.sort((a, b) => a.order - b.order);
    const uncategorized = data.shift();
    data.push(uncategorized);

    this.departmentContainer.innerHTML = `
      <div id="catalog-departments-head" class="w-[100%] flex flex-col items-center"></div>
      <div id="catalog-departments-body" class="w-[100%] flex flex-col items-center"></div>
      <div id="catalog-departments-foot" class="w-[100%] flex flex-col items-center"></div>
    `;
    this.departmentContainerBody = document.getElementById("catalog-departments-body");

    for (const department of data) {
      const departmentListItem = document.createElement("div");
      departmentListItem.classList.add("department-list-item");
      if (department.id !== 1 && department.id !== 2) {
        departmentListItem.classList.add("department-list-item-draggable");
        departmentListItem.setAttribute("draggable", true);
      }

      departmentListItem.id = `department-${department.id}`;

      const button = document.createElement("button");
      button.textContent = department.name;
      departmentListItem.appendChild(button);

      if (department.order === 1) {
        document.getElementById("catalog-departments-head").appendChild(departmentListItem);
      } else if (department.order === -1) {
        document.getElementById("catalog-departments-foot").appendChild(departmentListItem);
      } else {
        document.getElementById("catalog-departments-body").appendChild(departmentListItem);
      }

      departmentListItem.addEventListener("click", () => {
        if (departmentListItem.classList.contains("selected")) {
          departmentListItem.classList.remove("selected");

          const contacts = document.getElementById("catalog-contacts");
          contacts.innerHTML = "";
        } else {
          const selectedDepartment = document.querySelector(".department-list-item.selected");
          // correct
          if (selectedDepartment) {
            selectedDepartment.classList.remove("selected");
          }

          this.buildContacts(department.id);
        }
      });
    }

    const firstDepartment = document.querySelectorAll(".department-list-item")[0];
    const firstId = firstDepartment.id.split("-")[1];

    this.buildContacts(Number(firstId));
  }

  async addDepartment() {
    const departmentName = document.getElementById("add-department-name");

    const response = await fetch("/add-department", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: departmentName.value.toUpperCase().trim() }),
    });

    if (response.status !== 200) {
      departmentName.value = "";
      departmentName.focus();
      return this.notificationsComponent.render(500, "Error adding department. The department may already exist");
    }

    const data = await response.text();
    console.log(data);

    this.buildDepartments();
    await this.addLog("ADD DEPARTMENT", `The department ${departmentName.value.toUpperCase().trim()} has been added`);

    departmentName.value = "";

    this.hideModal("department-add-modal-container");
    this.notificationsComponent.render(200, "The department has been added");
  }

  async saveDepartment() {
    const selectedDepartment = document.querySelector(".department-list-item.selected");
    const departmentId = selectedDepartment.id.split("-")[1];

    const response = await fetch(`/get-contacts/${departmentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    const departmentName = document.getElementById("department-name").value.toUpperCase().trim();

    if (departmentName === data.department.name) {
      document.getElementById("contact-first-name").value = "";
      document.getElementById("contact-last-name").value = "";
      document.getElementById("contact-comment").value = "";
      document.getElementById("contact-tel").value = "";

      this.hideModal("department-edit-modal-container");
      return this.notificationsComponent.render(500, "No changes have been made");
    }

    const saveResponse = await fetch("/update-department", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: departmentId, name: departmentName }),
    });

    const saveData = await saveResponse.text();
    console.log(saveData);

    const department = document.getElementById(`department-${departmentId}`);
    department.innerHTML = departmentName;

    const cardDepartmentName = document.getElementById("card-department-name");
    cardDepartmentName.textContent = departmentName;

    await this.addLog("UPDATE DEPARTMENT NAME", `${data.department.name} has been renamed to ${departmentName}`);

    document.getElementById("contact-first-name").value = "";
    document.getElementById("contact-last-name").value = "";
    document.getElementById("contact-comment").value = "";
    document.getElementById("contact-tel").value = "";

    this.hideModal("department-edit-modal-container");
    this.notificationsComponent.render(200, "The changes have been saved");
  }

  async deleteDepartment() {
    const selectedDepartment = document.querySelector(".department-list-item.selected");
    const departmentId = selectedDepartment.id.split("-")[1];

    const response = await fetch(`/delete-department/${departmentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.text();
    console.log(data);

    const department = document.getElementById(`department-${departmentId}`);
    department.remove();

    this.buildDepartments();

    await this.addLog("DELETE DEPARTMENT", `The department with ID ${departmentId} has been deleted`);

    this.hideModal("confirmation-modal-container");
    this.notificationsComponent.render(200, "The department has been deleted");
  }

  async buildContacts(departmentId) {
    const response = await fetch(`/get-contacts/${departmentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ departmentId }),
    });

    const data = await response.json();

    const selectedDepartment = document.getElementById(`department-${departmentId}`);
    selectedDepartment.classList.add("selected");

    const contacts = document.getElementById("catalog-contacts");
    contacts.innerHTML = "";

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container", "flex", "w-full", "h-full");

    const card = document.createElement("div");
    card.classList.add(
      "card",
      "relative",
      "rounded-lg",
      "shadow-custom",
      "flex",
      "flex-col",
      "bg-general-tabs",
      "mx-auto",
      "w-11/12",
      "h-4/6",
    );

    const department = document.createElement("div");
    department.classList.add(
      "rounded-tl-lg",
      "rounded-tr-lg",
      "font-semibold",
      "text-center",
      "h-fit",
      "p-3",
      "w-full",
      "bg-general-tabs",
    );
    department.id = "card-department-name";
    department.textContent = data.department.name;

    const editButton = document.createElement("button");
    editButton.classList.add("absolute", "top-2", "right-2");

    const editIcon = document.createElement("i");
    editIcon.classList.add("hover:text-buttons-submit", "fa-solid", "fa-edit", "text-2xl");
    editIcon.addEventListener("click", async () => {
      const departmentResponse = await fetch(`/get-department/${departmentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const departmentData = await departmentResponse.json();

      const departmentName = document.getElementById("department-name");
      departmentName.value = departmentData.name;

      document.getElementById("add-contact-button").classList.add("disabled");

      this.activeModal = "editDepartmentModal";
      this.showModal("department-edit-modal-container");
    });

    editButton.appendChild(editIcon);
    if (sessionStorage.getItem("loggedUserType")) {
      editButton.classList.remove("hidden");
    } else {
      editButton.classList.add("hidden");
    }

    const contactInfoHeaders = document.createElement("div");
    contactInfoHeaders.classList.add("card-headers", "flex", "flex-row", "justify-between", "p-3");

    const nameHeader = document.createElement("p");
    nameHeader.classList.add("underline", "font-semibold");
    nameHeader.textContent = "ΟΝΟΜΑΤΕΠΩΝΥΜΟ";

    const telHeader = document.createElement("p");
    telHeader.classList.add("underline", "font-semibold");
    telHeader.textContent = "ΤΗΛΕΦΩΝΟ";

    contactInfoHeaders.appendChild(nameHeader);
    contactInfoHeaders.appendChild(telHeader);

    card.appendChild(department);

    if (departmentId !== 1) {
      card.appendChild(editButton);
    }

    card.appendChild(contactInfoHeaders);

    const contactInfoContainer = document.createElement("div");
    contactInfoContainer.classList.add("contact-info-container", "overflow-auto");

    if (departmentId === 2) {
      data.contacts.sort((a, b) => a.id - b.id);
    } else {
      data.contacts.sort((a, b) => a.lastName.localeCompare(b.lastName));
    }

    for (const [index, contact] of data.contacts.entries()) {
      const contactInfo = document.createElement("div");
      contactInfo.id = `contact-${contact.id}`;
      contactInfo.classList.add("contact-card", "flex", "flex-col", "justify-between");

      const contactRow = document.createElement("div");
      contactRow.classList.add(
        sessionStorage.getItem("loggedUserType") ? "contact-row-edit" : "contact-row",
        "flex",
        "flex-row",
        "justify-between",
        "px-3",
        "py-2",
        index % 2 === 0 ? "odd" : "even",
      );

      const name = document.createElement("p");
      name.textContent = contact.comment
        ? `${contact.lastName} ${contact.firstName} (${contact.comment})`
        : `${contact.lastName} ${contact.firstName}`;

      const tel = document.createElement("p");
      tel.textContent =
        contact.Telephones.length === 1
          ? `${contact.Telephones[0].tel}`
          : `${contact.Telephones.map(item => item.tel).join("/")}`;

      contactRow.appendChild(name);
      contactRow.appendChild(tel);
      contactInfo.appendChild(contactRow);

      contactInfoContainer.appendChild(contactInfo);

      if (sessionStorage.getItem("loggedUserType")) {
        contactRow.addEventListener("click", async () => {
          const contactId = document.getElementById("selected-contact-id");
          contactId.value = contact.id;

          const contactFirstName = document.getElementById("selected-contact-first-name");
          contactFirstName.value = contact.firstName;

          const contactLastName = document.getElementById("selected-contact-last-name");
          contactLastName.value = contact.lastName;

          const contactTel = document.getElementById("selected-contact-tel");
          contactTel.value =
            contact.Telephones.length === 1 ? contact.Telephones[0].tel : contact.Telephones.map(item => item.tel).join(", ");

          const contactEditComment = document.getElementById("selected-contact-comment");
          contactEditComment.value = contact.comment;

          const response = await fetch("/get-departments");
          const data = await response.json();

          const departmentSelection = document.getElementById("selected-contact-department");
          departmentSelection.innerHTML = "";

          for (const department of data) {
            const option = document.createElement("option");
            option.value = department.id;
            option.textContent = department.name;

            if (Number(departmentId) === department.id) {
              option.selected = true;
            }

            departmentSelection.appendChild(option);
          }

          this.activeModal = "editContactModal";
          this.showModal("contact-edit-modal-container");
        });
      }
    }

    card.appendChild(contactInfoContainer);
    cardContainer.appendChild(card);
    contacts.appendChild(cardContainer);
  }

  async searchContacts() {
    const query = this.searchContactsInput.value.toUpperCase();

    if (query.length === 0) {
      const selectedDepartment = document.querySelector(".department-list-item.selected");
      const departmentId = selectedDepartment.id.split("-")[1];
      this.buildContacts(Number(departmentId));
      return;
    }

    const response = await fetch("/search-contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();

    const contacts = document.getElementById("catalog-contacts");
    contacts.innerHTML = "";

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container", "flex", "w-full", "h-full");

    const card = document.createElement("div");
    card.classList.add(
      "card",
      "relative",
      "rounded-lg",
      "shadow-custom",
      "flex",
      "flex-col",
      "bg-general-tabs",
      "mx-auto",
      "w-11/12",
      "h-4/6",
    );

    const department = document.createElement("div");
    department.classList.add("rounded-lg", "font-semibold", "text-center", "h-fit", "p-3", "w-full", "bg-general-tabs");
    department.textContent = "ΑΝΑΖΗΤΗΣΗ";

    const contactInfoHeaders = document.createElement("div");
    contactInfoHeaders.classList.add("card-headers", "flex", "flex-row", "justify-between", "p-3");

    const detailsHeader = document.createElement("div");
    detailsHeader.classList.add("flex", "flex-row", "justify-between", "w-full");

    const nameHeader = document.createElement("p");
    nameHeader.classList.add("underline", "font-semibold");
    nameHeader.style = "text-align: left; width: 40%;";
    nameHeader.textContent = "ΟΝΟΜΑΤΕΠΩΝΥΜΟ";

    const departmentHeader = document.createElement("p");
    departmentHeader.classList.add("underline", "font-semibold");
    departmentHeader.style = "text-align: center; width: 30%;";
    departmentHeader.textContent = "ΤΜΗΜΑ";

    detailsHeader.appendChild(nameHeader);
    detailsHeader.appendChild(departmentHeader);

    const telHeader = document.createElement("p");
    telHeader.classList.add("underline", "font-semibold");
    telHeader.style = "width: 30%; text-align: right;";
    telHeader.textContent = "ΤΗΛΕΦΩΝΟ";

    contactInfoHeaders.appendChild(detailsHeader);
    contactInfoHeaders.appendChild(telHeader);

    card.appendChild(department);
    card.appendChild(contactInfoHeaders);

    const contactInfoContainer = document.createElement("div");
    contactInfoContainer.classList.add("contact-info-container", "overflow-auto");

    data.sort((a, b) => a.lastName.localeCompare(b.lastName));

    for (const [index, contact] of data.entries()) {
      const contactInfo = document.createElement("div");
      contactInfo.id = `contact-${contact.id}`;
      contactInfo.classList.add("contact-card", "flex", "flex-col", "justify-between");

      const contactRow = document.createElement("div");
      contactRow.classList.add(
        sessionStorage.getItem("loggedUserType") ? "contact-row-edit" : "contact-row",
        "flex",
        "flex-row",
        "justify-between",
        "px-3",
        "py-2",
        index % 2 === 0 ? "odd" : "even",
      );

      const detailsInfo = document.createElement("div");
      detailsInfo.classList.add("flex", "flex-row", "justify-between", "w-full", "text-center");

      const name = document.createElement("p");
      name.style = "text-align: left; width: 40%; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;";
      name.textContent = contact.comment
        ? `${contact.lastName} ${contact.firstName} (${contact.comment})`
        : `${contact.lastName} ${contact.firstName}`;

      const department = document.createElement("p");
      department.id = `search-department-${contact.Department.id}`;
      department.style = "text-align: center; width: 30%; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;";
      department.textContent = contact.Department.name;

      detailsInfo.appendChild(name);
      detailsInfo.appendChild(department);

      const tel = document.createElement("p");
      tel.style = "width: 30%; text-align: right;";
      tel.textContent =
        contact.Telephones.length === 1
          ? `${contact.Telephones[0].tel}`
          : `${contact.Telephones.map(item => item.tel).join("/")}`;

      contactRow.appendChild(detailsInfo);
      contactRow.appendChild(tel);
      contactInfo.appendChild(contactRow);

      contactInfoContainer.appendChild(contactInfo);

      if (sessionStorage.getItem("loggedUserType")) {
        contactRow.addEventListener("click", async () => {
          const contactId = document.getElementById("selected-contact-id");
          contactId.value = contact.id;

          const contactFirstName = document.getElementById("selected-contact-first-name");
          contactFirstName.value = contact.firstName;

          const contactLastName = document.getElementById("selected-contact-last-name");
          contactLastName.value = contact.lastName;

          const contactTel = document.getElementById("selected-contact-tel");
          contactTel.value =
            contact.Telephones.length === 1 ? contact.Telephones[0].tel : contact.Telephones.map(item => item.tel).join(", ");

          const contactEditComment = document.getElementById("selected-contact-comment");
          contactEditComment.value = contact.comment;

          const response = await fetch("/get-departments");
          const data = await response.json();

          const departmentSelection = document.getElementById("selected-contact-department");
          departmentSelection.innerHTML = "";

          for (const department of data) {
            const option = document.createElement("option");
            option.value = department.id;
            option.textContent = department.name;

            if (contact.Department.id === department.id) {
              option.selected = true;
            }

            departmentSelection.appendChild(option);
          }

          this.activeModal = "editContactModal";
          this.showModal("contact-edit-modal-container");
        });
      }
    }

    card.appendChild(contactInfoContainer);
    cardContainer.appendChild(card);
    contacts.appendChild(cardContainer);
  }

  async addContact() {
    const selectedDepartment = document.querySelector(".department-list-item.selected");
    const departmentId = selectedDepartment.id.split("-")[1];
    const firstName = document.getElementById("contact-first-name").value.toUpperCase().trim();
    const lastName = document.getElementById("contact-last-name").value.toUpperCase().trim();
    const comment = document.getElementById("contact-comment").value.toUpperCase().trim();
    const telephones = document
      .getElementById("contact-tel")
      .value.split(",")
      .map(tel => tel.trim());

    const response = await fetch("/add-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ departmentId, firstName, lastName, comment, telephones }),
    });

    const data = await response.text();
    console.log(data);

    this.buildContacts(Number(departmentId));

    await this.addLog(
      "ADD CONTACT",
      `The contact ${lastName} ${firstName} has been added to the department with ID ${departmentId}`,
    );

    document.getElementById("contact-first-name").value = "";
    document.getElementById("contact-last-name").value = "";
    document.getElementById("contact-comment").value = "";
    document.getElementById("contact-tel").value = "";

    this.hideModal("department-edit-modal-container");
    this.notificationsComponent.render(200, "The contact has been added");
  }

  async deleteContact() {
    const contactId = document.getElementById("selected-contact-id").value;

    const response = await fetch("/delete-contact", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: Number(contactId) }),
    });

    const data = await response.text();
    console.log(data);

    const selectedDepartment = document.querySelector(".department-list-item.selected");
    const departmentId = selectedDepartment.id.split("-")[1];

    this.buildContacts(Number(departmentId));

    await this.addLog("DELETE CONTACT", `The contact with ID ${contactId} has been deleted`);

    this.hideModal("confirmation-modal-container");
    this.notificationsComponent.render(200, "The contact has been deleted");
  }

  async editContact() {
    const contactId = document.getElementById("selected-contact-id").value;
    const selectedDepartment = document.querySelector(".department-list-item.selected");
    const selectedDepartmentId = selectedDepartment.id.split("-")[1];
    const departmentId = document.getElementById("selected-contact-department").value;
    const firstName = document.getElementById("selected-contact-first-name").value.toUpperCase().trim();
    const lastName = document.getElementById("selected-contact-last-name").value.toUpperCase().trim();
    const comment = document.getElementById("selected-contact-comment").value.toUpperCase().trim();
    const telephones = document
      .getElementById("selected-contact-tel")
      .value.split(",")
      .map(tel => tel.trim());

    const response = await fetch(`/get-contact/${contactId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    const dataTelephones = data.Telephones.map(item => item.tel);

    const searchDepartment = document.getElementById(`search-department-${data.departmentId}`);
    const searchDepartmentId = searchDepartment?.id.split("-")[2];

    if (
      firstName === data.firstName &&
      lastName === data.lastName &&
      comment === data.comment &&
      (selectedDepartmentId === departmentId || searchDepartmentId === departmentId) &&
      JSON.stringify(telephones) === JSON.stringify(dataTelephones)
    ) {
      this.hideModal("contact-edit-modal-container");
      return this.notificationsComponent.render(500, "No changes have been made");
    }

    const saveResponse = await fetch("/update-contact", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contactId, departmentId, firstName, lastName, comment, telephones }),
    });

    const saveData = await saveResponse.text();
    console.log(saveData);

    this.buildContacts(Number(selectedDepartmentId));

    await this.addLog("UPDATE CONTACT", `The contact ${lastName} ${firstName} has been updated`);

    this.hideModal("contact-edit-modal-container");
    this.notificationsComponent.render(200, "The contact has been updated");
  }

  validateDepartmentDetails() {
    const departmentName = document.getElementById("add-department-name").value;

    if (departmentName.trim().length === 0) {
      this.addDepartmentBtn.classList.add("disabled");
    } else {
      this.addDepartmentBtn.classList.remove("disabled");
    }
  }

  validateContactDetails() {
    let startingSelector;
    let activeBtn;

    const editDepartmentModal = document.getElementById("department-edit-modal-container");
    const editContactModal = document.getElementById("contact-edit-modal-container");

    if (!editDepartmentModal.classList.contains("hidden") && editContactModal.classList.contains("hidden")) {
      startingSelector = "contact";
      activeBtn = this.addContactBtn;
    } else if (editDepartmentModal.classList.contains("hidden") && !editContactModal.classList.contains("hidden")) {
      startingSelector = "selected";
      activeBtn = this.saveContactBtn;
    }

    const elements = Array.from(document.querySelectorAll(`[id^="${startingSelector}"]`));

    let isValid = true;

    elements.forEach(element => {
      if (element.id.includes("first-name") || element.id.includes("last-name") || element.id.includes("tel")) {
        const { value } = document.getElementById(element.id);

        // Specific validation for telephone numbers
        if (element.id.includes("tel")) {
          const validTel = value.split(",").every(tel => tel.trim().length === 3);
          if (!validTel) {
            isValid = false;
          }
        } else if (value.trim().length === 0) {
          // General validation for other inputs
          isValid = false;
        }
      }
    });

    // Enable/disable add contact button based on overall validity
    if (isValid) {
      activeBtn.classList.remove("disabled");
    } else {
      activeBtn.classList.add("disabled");
    }
  }

  async addLog(action, description) {
    await fetch("/add-log", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: sessionStorage.getItem("loggedUser"),
        action,
        description,
      }),
    });
  }
}

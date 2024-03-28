export default class Catalog {
  constructor() {
    this.loginBtn = null;
    this.cancelDivisionModalBtn = null;
    this.cancelContactModalBtn = null;
    this.cancelModalBtn = null;
    this.closeAddBtn = null;
    this.closeConfirmBtn = null;
    this.addDivisionModalBtn = null;
    this.addDivisionBtn = null;
    this.saveDivisionBtn = null;
    this.rearrangeDivisionBtn = null;
    this.editingDivisionOrder = null;
    this.deleteDivisionBtn = null;
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
    this.divisionContainer = null;
  }

  render() {
    this.loginBtn = document.getElementById("login-button");
    this.createPdfBtn = document.getElementById("export-button");
    this.addDivisionModalBtn = document.getElementById("add-division-modal-button");
    this.addDivisionBtn = document.getElementById("add-division-button");
    this.saveDivisionBtn = document.getElementById("save-division-button");
    this.deleteDivisionBtn = document.getElementById("delete-division-button");
    this.rearrangeDivisionBtn = document.getElementById("edit-division-order-button");
    this.confirmDeleteBtn = document.getElementById("confirm-delete-button");
    this.cancelAddBtn = document.getElementById("cancel-add-button");
    this.cancelDeleteBtn = document.getElementById("cancel-delete-button");
    this.searchContactsInput = document.getElementById("search-contacts");
    this.cancelDivisionModalBtn = document.getElementById("close-edit-button");
    this.cancelContactModalBtn = document.getElementById("close-contact-button");
    this.closeAddBtn = document.getElementById("close-add-button");
    this.closeConfirmBtn = document.getElementById("close-confirm-button");
    this.addContactBtn = document.getElementById("add-contact-button");
    this.saveContactBtn = document.getElementById("save-contact-button");
    this.deleteContactBtn = document.getElementById("delete-contact-button");
    this.divisionContainer = document.getElementById("catalog-divisions");
    this.buildDivisions();

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

    const divisionName = document.getElementById("add-division-name");

    const contactTel = document.getElementById("contact-tel");
    const selectedContactTel = document.getElementById("selected-contact-tel");
    const contactFirstName = document.getElementById("contact-first-name");
    const selectedContactFirstName = document.getElementById("selected-contact-first-name");
    const contactLastName = document.getElementById("contact-last-name");
    const selectedContactLastName = document.getElementById("selected-contact-last-name");

    divisionName.addEventListener("input", () => this.validateDivisionDetails());
    // divisionOrder.addEventListener("input", () => this.validateDivisionDetails());

    contactTel.addEventListener("input", event => telInputHandler(event));
    selectedContactTel.addEventListener("input", event => telInputHandler(event));
    contactFirstName.addEventListener("input", () => this.validateContactDetails());
    selectedContactFirstName.addEventListener("input", () => this.validateContactDetails());
    contactLastName.addEventListener("input", () => this.validateContactDetails());
    selectedContactLastName.addEventListener("input", () => this.validateContactDetails());

    this.removeClickListener(this.addDivisionModalBtn, () => {
      this.activeModal = "addDivisionModal";
      this.showModal("division-add-modal-container", "", "addDivisionModal");
    });
    this.addClickListener(this.addDivisionModalBtn, () => {
      this.activeModal = "addDivisionModal";
      this.showModal("division-add-modal-container", "", "addDivisionModal");
    });

    this.removeClickListener(this.cancelAddBtn, () => {
      divisionName.value = "";
      this.addDivisionBtn.classList.add("disabled");
      this.hideModal("division-add-modal-container");
    });
    this.addClickListener(this.cancelAddBtn, () => {
      divisionName.value = "";
      this.addDivisionBtn.classList.add("disabled");
      this.hideModal("division-add-modal-container");
    });

    this.removeClickListener(this.closeAddBtn, () => {
      divisionName.value = "";
      this.addDivisionBtn.classList.add("disabled");
      this.hideModal("division-add-modal-container");
    });
    this.addClickListener(this.closeAddBtn, () => {
      divisionName.value = "";
      this.addDivisionBtn.classList.add("disabled");
      this.hideModal("division-add-modal-container");
    });

    this.editingDivisionOrder = true;
    this.rearrangeDivisionBtn.addEventListener("click", () => {
      if (this.editingDivisionOrder) {
        this.editDivisionOrder();
        this.rearrangeDivisionBtn.textContent = "Save order";
      } else {
        this.saveDivisionOrder();
        this.rearrangeDivisionBtn.textContent = "Edit order";
      }

      this.editingDivisionOrder = !this.editingDivisionOrder;
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
      const afterElement = this.getDrafAfterElement(this.divisionContainer, event.clientY);
      const draggable = document.querySelector(".dragging");
      if (afterElement === null) {
        this.divisionContainer.appendChild(draggable);
      } else {
        this.divisionContainer.insertBefore(draggable, afterElement);
      }
    };

    this.removeClickListener(this.closeAddBtn, () => {
      divisionName.value = "";
      this.addDivisionBtn.classList.add("disabled");
      this.hideModal("division-add-modal-container");
    });
    this.addClickListener(this.closeAddBtn, () => {
      divisionName.value = "";
      this.addDivisionBtn.classList.add("disabled");
      this.hideModal("division-add-modal-container");
    });

    this.removeClickListener(this.deleteDivisionBtn, () =>
      this.showModal("confirmation-modal-container", "division-edit-modal-container", "editDivisionModal"),
    );
    this.addClickListener(this.deleteDivisionBtn, () =>
      this.showModal("confirmation-modal-container", "division-edit-modal-container", "editDivisionModal"),
    );
    this.removeClickListener(this.deleteContactBtn, () =>
      this.showModal("confirmation-modal-container", "contact-edit-modal-container", "editContactModal"),
    );
    this.addClickListener(this.deleteContactBtn, () =>
      this.showModal("confirmation-modal-container", "contact-edit-modal-container", "editContactModal"),
    );
    this.removeClickListener(this.closeConfirmBtn, () =>
      this.hideModal("confirmation-modal-container", "division-edit-modal-container", "editDivisionModal"),
    );
    this.addClickListener(this.closeConfirmBtn, () =>
      this.hideModal("confirmation-modal-container", "division-edit-modal-container", "editDivisionModal"),
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
      this.hideModal("confirmation-modal-container", "division-edit-modal-container", "editDivisionModal"),
    );
    this.addClickListener(this.cancelDeleteBtn, () =>
      this.hideModal("confirmation-modal-container", "division-edit-modal-container", "editDivisionModal"),
    );

    this.removeClickListener(this.cancelDeleteBtn, () =>
      this.hideModal("confirmation-modal-container", "user-management-modal-container", "userManagementModal"),
    );
    this.addClickListener(this.cancelDeleteBtn, () =>
      this.hideModal("confirmation-modal-container", "user-management-modal-container", "userManagementModal"),
    );

    this.removeClickListener(this.cancelAddBtn, () => this.hideModal("division-add-modal-container"));
    this.addClickListener(this.cancelAddBtn, () => this.hideModal("division-add-modal-container"));

    this.removeClickListener(this.cancelDeleteBtn, () =>
      this.hideModal("confirmation-modal-container", "contact-edit-modal-container", "editContactModal"),
    );
    this.addClickListener(this.cancelDeleteBtn, () =>
      this.hideModal("confirmation-modal-container", "contact-edit-modal-container", "editContactModal"),
    );

    this.removeClickListener(this.cancelDivisionModalBtn, () => {
      document.getElementById("contact-first-name").value = "";
      document.getElementById("contact-last-name").value = "";
      document.getElementById("contact-comment").value = "";
      document.getElementById("contact-tel").value = "";

      this.hideModal("division-edit-modal-container");
    });
    this.addClickListener(this.cancelDivisionModalBtn, () => {
      document.getElementById("contact-first-name").value = "";
      document.getElementById("contact-last-name").value = "";
      document.getElementById("contact-comment").value = "";
      document.getElementById("contact-tel").value = "";

      this.hideModal("division-edit-modal-container");
    });

    this.removeClickListener(this.cancelContactModalBtn, () => this.hideModal("contact-edit-modal-container"));
    this.addClickListener(this.cancelContactModalBtn, () => this.hideModal("contact-edit-modal-container"));

    this.removeClickListener(this.addDivisionBtn, () => this.addDivision());
    this.addClickListener(this.addDivisionBtn, () => this.addDivision());

    this.removeClickListener(this.saveDivisionBtn, () => this.saveDivision());
    this.addClickListener(this.saveDivisionBtn, () => this.saveDivision());

    this.removeClickListener(this.confirmDeleteBtn, () => {
      if (this.activeModal === "editDivisionModal") {
        this.deleteDivision();
      } else if (this.activeModal === "editContactModal") {
        this.deleteContact();
      } else {
        this.userManagementComponent.deleteUser(this.userManagementComponent.selectedUserId);
      }
    });
    this.addClickListener(this.confirmDeleteBtn, () => {
      if (this.activeModal === "editDivisionModal") {
        this.deleteDivision();
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

      modal1.classList.remove("hidden");

      if (modal1Id === "login-modal-container") {
        const username = document.getElementById("username");
        username.focus();
      } else if (modal1Id === "division-add-modal-container") {
        const divisionName = document.getElementById("add-division-name");
        divisionName.focus();
      }

      const message = document.getElementById("confirmation-message");
      if (activeModal === "editDivisionModal") {
        message.textContent = "Are you sure you want to delete this division? All contacts will be moved to the last division.";
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

  editDivisionOrder() {
    const draggables = document.querySelectorAll(".division-list-item");
    this.divisionContainer.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
    this.divisionContainer.style.boxShadow = "0 0 10px 3px rgba(255, 255, 255)";

    draggables.forEach(draggable => {
      draggable.style.cursor = "grab";
      const buttons = draggable.querySelectorAll("button");
      buttons.forEach(button => {
        button.style.cursor = "grab";
      });
      draggable.addEventListener("dragstart", this.dragStartListener);
      draggable.addEventListener("dragend", this.dragEndListener);
    });

    this.divisionContainer.addEventListener("dragover", this.dragOverListener);
  }

  async saveDivisionOrder() {
    const divisionList = document.querySelectorAll(".division-list-item");
    const divisionObjectsArray = [];

    divisionList.forEach((division, index) => {
      const button = division.querySelector("button");
      const buttonText = button.textContent;
      const divId = division.getAttribute("id").split("-");
      const idNumber = divId[1].trim();

      if (buttonText.trim() !== "ΧΩΡΙΣ ΚΑΤΗΓΟΡΙΑ") {
        const divisionObject = {
          id: idNumber,
          name: buttonText,
          order: index + 1,
        };
        divisionObjectsArray.push(divisionObject);
      }
    });

    await fetch("/update-division-order", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(divisionObjectsArray),
    });

    const draggables = document.querySelectorAll(".division-list-item");

    draggables.forEach(draggable => {
      draggable.style.cursor = "pointer";
      const buttons = draggable.querySelectorAll("button");
      buttons.forEach(button => {
        button.style.cursor = "pointer";
      });

      draggable.removeEventListener("dragstart", this.dragStartListener);
      draggable.removeEventListener("dragend", this.dragEndListener);
      this.divisionContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
      this.divisionContainer.style.boxShadow = "none";
    });

    this.divisionContainer.removeEventListener("dragover", this.dragOverListener);
    this.notificationsComponent.render(200, "Successfully updated divisions' order.");
  }

  getDrafAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll(".division-list-item:not(.dragging)")];

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

  async buildDivisions() {
    const response = await fetch("/get-divisions");
    const data = await response.json();
    data.sort((a, b) => a.order - b.order);
    const uncategorized = data.shift();
    data.push(uncategorized);

    this.divisionContainer.innerHTML = "";

    for (const division of data) {
      const divisionListItem = document.createElement("div");
      divisionListItem.classList.add("division-list-item");
      divisionListItem.setAttribute("draggable", true);
      divisionListItem.id = `division-${division.id}`;

      const button = document.createElement("button");
      button.textContent = division.name;

      divisionListItem.appendChild(button);
      this.divisionContainer.appendChild(divisionListItem);

      divisionListItem.addEventListener("click", () => {
        if (divisionListItem.classList.contains("selected")) {
          divisionListItem.classList.remove("selected");

          const contacts = document.getElementById("catalog-contacts");
          contacts.innerHTML = "";
        } else {
          const selectedDivision = document.querySelector(".division-list-item.selected");
          // correct
          if (selectedDivision) {
            selectedDivision.classList.remove("selected");
          }

          this.buildContacts(division.id);
        }
      });
    }

    const firstDivision = document.querySelectorAll(".division-list-item")[0];
    const firstId = firstDivision.id.split("-")[1];

    this.buildContacts(Number(firstId));
  }

  async addDivision() {
    const divisionName = document.getElementById("add-division-name");

    const response = await fetch("/add-division", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: divisionName.value.toUpperCase() }),
    });

    const data = await response.text();
    console.log(data);

    this.buildDivisions();

    divisionName.value = "";

    this.hideModal("division-add-modal-container");
    this.notificationsComponent.render(200, "The division has been added");
  }

  async saveDivision() {
    const selectedDivision = document.querySelector(".division-list-item.selected");
    const divisionId = selectedDivision.id.split("-")[1];

    const response = await fetch(`/get-contacts/${divisionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    const divisionName = document.getElementById("division-name").value.toUpperCase();

    if (divisionName === data.division.name) {
      document.getElementById("contact-first-name").value = "";
      document.getElementById("contact-last-name").value = "";
      document.getElementById("contact-comment").value = "";
      document.getElementById("contact-tel").value = "";

      this.hideModal("division-edit-modal-container");
      return this.notificationsComponent.render(500, "No changes have been made");
    }

    const saveResponse = await fetch("/update-division", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: divisionId, name: divisionName }),
    });

    const saveData = await saveResponse.text();
    console.log(saveData);

    const division = document.getElementById(`division-${divisionId}`);
    division.innerHTML = divisionName;

    const cardDivisionName = document.getElementById("card-division-name");
    cardDivisionName.textContent = divisionName;

    document.getElementById("contact-first-name").value = "";
    document.getElementById("contact-last-name").value = "";
    document.getElementById("contact-comment").value = "";
    document.getElementById("contact-tel").value = "";

    this.hideModal("division-edit-modal-container");
    this.notificationsComponent.render(200, "The changes have been saved");
  }

  async deleteDivision() {
    const selectedDivision = document.querySelector(".division-list-item.selected");
    const divisionId = selectedDivision.id.split("-")[1];

    const response = await fetch(`/delete-division/${divisionId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.text();
    console.log(data);

    const division = document.getElementById(`division-${divisionId}`);
    division.remove();

    this.buildDivisions();

    this.hideModal("confirmation-modal-container");
    this.notificationsComponent.render(200, "The division has been deleted");
  }

  async buildContacts(divisionId) {
    const response = await fetch(`/get-contacts/${divisionId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ divisionId }),
    });

    const data = await response.json();

    const selectedDivision = document.getElementById(`division-${divisionId}`);
    selectedDivision.classList.add("selected");

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

    const division = document.createElement("div");
    division.classList.add(
      "rounded-tl-lg",
      "rounded-tr-lg",
      "font-semibold",
      "text-center",
      "h-fit",
      "p-3",
      "w-full",
      "bg-general-tabs",
    );
    division.id = "card-division-name";
    division.textContent = data.division.name;

    const editButton = document.createElement("button");
    editButton.classList.add("absolute", "top-2", "right-2");

    const editIcon = document.createElement("i");
    editIcon.classList.add("hover:text-login-submit", "fa-solid", "fa-edit", "text-2xl");
    editIcon.addEventListener("click", async () => {
      const divisionResponse = await fetch(`/get-division/${divisionId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const divisionData = await divisionResponse.json();

      const divisionName = document.getElementById("division-name");
      divisionName.value = divisionData.name;

      document.getElementById("add-contact-button").classList.add("disabled");

      this.activeModal = "editDivisionModal";
      this.showModal("division-edit-modal-container");
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

    card.appendChild(division);

    if (divisionId !== 1) {
      card.appendChild(editButton);
    }

    card.appendChild(contactInfoHeaders);

    const contactInfoContainer = document.createElement("div");
    contactInfoContainer.classList.add("contact-info-container", "overflow-auto");

    if (divisionId === 2) {
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

          const response = await fetch("/get-divisions");
          const data = await response.json();

          const divisionSelection = document.getElementById("selected-contact-division");
          divisionSelection.innerHTML = "";

          for (const division of data) {
            const option = document.createElement("option");
            option.value = division.id;
            option.textContent = division.name;

            if (Number(divisionId) === division.id) {
              option.selected = true;
            }

            divisionSelection.appendChild(option);
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
      const selectedDivision = document.querySelector(".division-list-item.selected");
      const divisionId = selectedDivision.id.split("-")[1];
      this.buildContacts(Number(divisionId));
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

    const division = document.createElement("div");
    division.classList.add("rounded-lg", "font-semibold", "text-center", "h-fit", "p-3", "w-full", "bg-general-tabs");
    division.textContent = "ΑΝΑΖΗΤΗΣΗ";

    const contactInfoHeaders = document.createElement("div");
    contactInfoHeaders.classList.add("card-headers", "flex", "flex-row", "justify-between", "p-3");

    const detailsHeader = document.createElement("div");
    detailsHeader.classList.add("flex", "flex-row", "justify-between", "w-full");

    const nameHeader = document.createElement("p");
    nameHeader.classList.add("underline", "font-semibold");
    nameHeader.style = "text-align: left; width: 40%;";
    nameHeader.textContent = "ΟΝΟΜΑΤΕΠΩΝΥΜΟ";

    const divisionHeader = document.createElement("p");
    divisionHeader.classList.add("underline", "font-semibold");
    divisionHeader.style = "text-align: center; width: 30%;";
    divisionHeader.textContent = "ΤΜΗΜΑ";

    detailsHeader.appendChild(nameHeader);
    detailsHeader.appendChild(divisionHeader);

    const telHeader = document.createElement("p");
    telHeader.classList.add("underline", "font-semibold");
    telHeader.style = "width: 30%; text-align: right;";
    telHeader.textContent = "ΤΗΛΕΦΩΝΟ";

    contactInfoHeaders.appendChild(detailsHeader);
    contactInfoHeaders.appendChild(telHeader);

    card.appendChild(division);
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

      const division = document.createElement("p");
      division.id = `search-division-${contact.Division.id}`;
      division.style = "text-align: center; width: 30%; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;";
      division.textContent = contact.Division.name;

      detailsInfo.appendChild(name);
      detailsInfo.appendChild(division);

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

          const response = await fetch("/get-divisions");
          const data = await response.json();

          const divisionSelection = document.getElementById("selected-contact-division");
          divisionSelection.innerHTML = "";

          for (const division of data) {
            const option = document.createElement("option");
            option.value = division.id;
            option.textContent = division.name;

            if (contact.Division.id === division.id) {
              option.selected = true;
            }

            divisionSelection.appendChild(option);
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
    const selectedDivision = document.querySelector(".division-list-item.selected");
    const divisionId = selectedDivision.id.split("-")[1];
    const firstName = document.getElementById("contact-first-name").value.toUpperCase();
    const lastName = document.getElementById("contact-last-name").value.toUpperCase();
    const comment = document.getElementById("contact-comment").value.toUpperCase();
    const telephones = document
      .getElementById("contact-tel")
      .value.split(",")
      .map(tel => tel.trim());

    const response = await fetch("/add-contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ divisionId, firstName, lastName, comment, telephones }),
    });

    const data = await response.text();
    console.log(data);

    this.buildContacts(Number(divisionId));

    document.getElementById("contact-first-name").value = "";
    document.getElementById("contact-last-name").value = "";
    document.getElementById("contact-comment").value = "";
    document.getElementById("contact-tel").value = "";

    this.hideModal("division-edit-modal-container");
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

    const selectedDivision = document.querySelector(".division-list-item.selected");
    const divisionId = selectedDivision.id.split("-")[1];

    this.buildContacts(Number(divisionId));

    this.hideModal("confirmation-modal-container");
    this.notificationsComponent.render(200, "The contact has been deleted");
  }

  async editContact() {
    const contactId = document.getElementById("selected-contact-id").value;
    const selectedDivision = document.querySelector(".division-list-item.selected");
    const selectedDivisionId = selectedDivision.id.split("-")[1];
    const divisionId = document.getElementById("selected-contact-division").value;
    const firstName = document.getElementById("selected-contact-first-name").value.toUpperCase();
    const lastName = document.getElementById("selected-contact-last-name").value.toUpperCase();
    const comment = document.getElementById("selected-contact-comment").value.toUpperCase();
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

    const searchDivision = document.getElementById(`search-division-${data.divisionId}`);
    const searchDivisionId = searchDivision?.id.split("-")[2];

    if (
      firstName === data.firstName &&
      lastName === data.lastName &&
      comment === data.comment &&
      (selectedDivisionId === divisionId || searchDivisionId === divisionId) &&
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
      body: JSON.stringify({ contactId, divisionId, firstName, lastName, comment, telephones }),
    });

    const saveData = await saveResponse.text();
    console.log(saveData);

    this.buildContacts(Number(selectedDivisionId));

    this.hideModal("contact-edit-modal-container");
    this.notificationsComponent.render(200, "The contact has been updated");
  }

  validateDivisionDetails() {
    const divisionName = document.getElementById("add-division-name").value;

    if (divisionName.trim().length === 0) {
      this.addDivisionBtn.classList.add("disabled");
    } else {
      this.addDivisionBtn.classList.remove("disabled");
    }
  }

  validateContactDetails() {
    let startingSelector;
    let activeBtn;

    const editDivisionModal = document.getElementById("division-edit-modal-container");
    const editContactModal = document.getElementById("contact-edit-modal-container");

    if (!editDivisionModal.classList.contains("hidden") && editContactModal.classList.contains("hidden")) {
      startingSelector = "contact";
      activeBtn = this.addContactBtn;
    } else if (editDivisionModal.classList.contains("hidden") && !editContactModal.classList.contains("hidden")) {
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
}

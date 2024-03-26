export default class Catalog {
  constructor() {
    this.loginBtn = null;
    this.cancelModalBtn = null;
    this.closeConfirmBtn = null;
    this.saveDivisionBtn = null;
    this.rearrangeDivisionBtn = null;
    this.deleteDivisionBtn = null;
    this.confirmDeleteBtn = null;
    this.cancelDeleteBtn = null;
    this.searchContactsInput = null;
    this.addContactBtn = null;
  }

  render() {
    this.loginBtn = document.getElementById("login-button");
    this.saveDivisionBtn = document.getElementById("save-division-button");
    this.deleteDivisionBtn = document.getElementById("delete-division-button");
    this.rearrangeDivisionBtn = document.getElementById("edit-division-order-button");
    this.confirmDeleteBtn = document.getElementById("confirm-delete-button");
    this.cancelDeleteBtn = document.getElementById("cancel-delete-button");
    this.searchContactsInput = document.getElementById("search-contacts");
    this.cancelModalBtn = document.getElementById("close-edit-button");
    this.closeConfirmBtn = document.getElementById("close-confirm-button");
    this.addContactBtn = document.getElementById("add-contact-button");
    this.buildDivisions();

    this.searchContactsInput.removeEventListener("input", () => this.searchContacts());
    this.searchContactsInput.addEventListener("input", () => this.searchContacts());

    const contactTel = document.getElementById("contact-tel");
    contactTel.addEventListener("input", event => {
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
      this.validateAddContact();
    });

    this.removeClickListener(this.rearrangeDivisionBtn, () => this.editDivisions());
    this.addClickListener(this.rearrangeDivisionBtn, () => this.editDivisions());

    this.removeClickListener(this.deleteDivisionBtn, () =>
      this.showModal("confirmation-modal-container", "division-edit-modal-container"),
    );
    this.addClickListener(this.deleteDivisionBtn, () =>
      this.showModal("confirmation-modal-container", "division-edit-modal-container"),
    );

    this.removeClickListener(this.closeConfirmBtn, () =>
      this.hideModal("confirmation-modal-container", "division-edit-modal-container"),
    );
    this.addClickListener(this.closeConfirmBtn, () =>
      this.hideModal("confirmation-modal-container", "division-edit-modal-container"),
    );

    this.removeClickListener(this.cancelDeleteBtn, () =>
      this.hideModal("confirmation-modal-container", "division-edit-modal-container"),
    );
    this.addClickListener(this.cancelDeleteBtn, () =>
      this.hideModal("confirmation-modal-container", "division-edit-modal-container"),
    );

    this.removeClickListener(this.cancelModalBtn, () => this.hideModal("division-edit-modal-container"));
    this.addClickListener(this.cancelModalBtn, () => this.hideModal("division-edit-modal-container"));

    this.removeClickListener(this.saveDivisionBtn, () => this.saveDivision());
    this.addClickListener(this.saveDivisionBtn, () => this.saveDivision());

    this.removeClickListener(this.confirmDeleteBtn, () => this.deleteDivision());
    this.addClickListener(this.confirmDeleteBtn, () => this.deleteDivision());

    this.removeClickListener(this.addContactBtn, () => this.addContact());
    this.addClickListener(this.addContactBtn, () => this.addContact());

    this.removeClickListener(this.loginBtn, () => this.showModal("login-modal-container"));
    this.addClickListener(this.loginBtn, () => this.showModal("login-modal-container"));
  }

  setComponents(login, notifications) {
    this.notificationsComponent = notifications;
  }

  showModal(modal1Id, modal2Id) {
    const modal1 = document.getElementById(modal1Id);
    if (modal1) {
      modal1.classList.remove("hidden");
      if (modal2Id) {
        const modal2 = document.getElementById(modal2Id);
        modal2.classList.add("hidden");
      }
    }
  }

  hideModal(modal1Id, modal2Id) {
    const modal1 = document.getElementById(modal1Id);
    if (modal1) {
      modal1.classList.add("hidden");
      if (modal2Id) {
        const modal2 = document.getElementById(modal2Id);
        modal2.classList.remove("hidden");
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

  editDivisions() {
    console.log("Edit");
    const draggables = document.querySelectorAll(".division-list-item");
    const dragContainer = document.querySelectorAll(".catalog-divisions");
    console.log("draggables", draggables);

    draggables.forEach(draggable => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });

      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
      });
    });

    dragContainer.forEach(container => {
      container.addEventListener("dragover", event => {
        event.preventDefault();
        const afterElement = this.getDrafAfterElement(container, event.clientY);
        const draggable = document.querySelector(".dragging");
        if (afterElement === null) {
          container.appendChild(draggable);
        } else {
          container.insertBefore(draggable, afterElement);
        }
      });
    });
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

    const uncategorized = data.shift();
    data.push(uncategorized);

    const divisions = document.getElementById("catalog-divisions");
    divisions.innerHTML = "";

    for (const division of data) {
      const divisionListItem = document.createElement("div");
      divisionListItem.classList.add("division-list-item");
      divisionListItem.setAttribute("draggable", true);
      divisionListItem.id = `division-${division.id}`;

      const button = document.createElement("button");
      button.textContent = division.name;

      divisionListItem.appendChild(button);
      divisions.appendChild(divisionListItem);

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

    this.buildContacts(firstId);
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

    const divisionName = document.getElementById("division-name").value;
    const divisionOrder = document.getElementById("division-order").value;

    if (divisionName === data.division.name && Number(divisionOrder) === data.division.order) {
      this.hideModal("division-edit-modal-container");
      return this.notificationsComponent.render(500, "No changes have been made");
    }

    const saveResponse = await fetch("/update-division", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: divisionId, name: divisionName, order: divisionOrder }),
    });

    const saveData = await saveResponse.text();
    console.log(saveData);

    const division = document.getElementById(`division-${divisionId}`);
    division.innerHTML = divisionName;

    const cardDivisionName = document.getElementById("card-division-name");
    cardDivisionName.textContent = divisionName;

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
    division.classList.add("rounded-lg", "font-semibold", "text-center", "h-fit", "p-3", "w-full", "bg-general-tabs");
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

      const divisionOrder = document.getElementById("division-order");
      divisionOrder.value = divisionData.order;

      this.showModal("division-edit-modal-container");
    });

    editButton.appendChild(editIcon);

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

    for (const [index, contact] of data.contacts.entries()) {
      const contactInfo = document.createElement("div");
      contactInfo.id = `contact-${contact.id}`;
      contactInfo.classList.add("contact-card", "flex", "flex-col", "justify-between");

      const contactRow = document.createElement("div");
      contactRow.classList.add(
        "contact-row",
        "flex",
        "flex-row",
        "justify-between",
        "px-3",
        "py-2",
        index % 2 === 0 ? "odd" : "even",
      );

      const name = document.createElement("p");
      name.textContent = contact.comment
        ? `${contact.firstName} ${contact.lastName} (${contact.comment})`
        : `${contact.firstName} ${contact.lastName}`;

      const tel = document.createElement("p");
      tel.textContent =
        contact.Telephones.length === 1
          ? `${contact.Telephones[0].tel}`
          : `${contact.Telephones.map(item => item.tel).join("/")}`;

      contactRow.appendChild(name);
      contactRow.appendChild(tel);
      contactInfo.appendChild(contactRow);

      contactInfoContainer.appendChild(contactInfo);
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
      this.buildContacts(divisionId);
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

    const nameHeader = document.createElement("p");
    nameHeader.classList.add("underline", "font-semibold");
    nameHeader.textContent = "ΟΝΟΜΑΤΕΠΩΝΥΜΟ";

    const telHeader = document.createElement("p");
    telHeader.classList.add("underline", "font-semibold");
    telHeader.textContent = "ΤΗΛΕΦΩΝΟ";

    contactInfoHeaders.appendChild(nameHeader);
    contactInfoHeaders.appendChild(telHeader);

    card.appendChild(division);
    card.appendChild(contactInfoHeaders);

    const contactInfoContainer = document.createElement("div");
    contactInfoContainer.classList.add("contact-info-container", "overflow-auto");

    for (const [index, contact] of data.entries()) {
      const contactInfo = document.createElement("div");
      contactInfo.id = `contact-${contact.id}`;
      contactInfo.classList.add("contact-card", "flex", "flex-col", "justify-between");

      const contactRow = document.createElement("div");
      contactRow.classList.add(
        "contact-row",
        "flex",
        "flex-row",
        "justify-between",
        "px-3",
        "py-2",
        index % 2 === 0 ? "odd" : "even",
      );

      const name = document.createElement("p");
      name.textContent = contact.comment
        ? `${contact.firstName} ${contact.lastName} (${contact.comment})`
        : `${contact.firstName} ${contact.lastName}`;

      const tel = document.createElement("p");
      tel.textContent =
        contact.Telephones.length === 1
          ? `${contact.Telephones[0].tel}`
          : `${contact.Telephones.map(item => item.tel).join("/")}`;

      contactRow.appendChild(name);
      contactRow.appendChild(tel);
      contactInfo.appendChild(contactRow);

      contactInfoContainer.appendChild(contactInfo);
    }

    card.appendChild(contactInfoContainer);
    cardContainer.appendChild(card);
    contacts.appendChild(cardContainer);
  }

  async addContact() {
    const selectedDivision = document.querySelector(".division-list-item.selected");
    const divisionId = selectedDivision.id.split("-")[1];
    const firstName = document.getElementById("contact-first-name").value;
    const lastName = document.getElementById("contact-last-name").value;
    const comment = document.getElementById("contact-comment").value;
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
  }

  validateAddContact() {
    const firstName = document.getElementById("contact-first-name").value;
    const lastName = document.getElementById("contact-last-name").value;
    const telephones = document.getElementById("contact-tel").value;

    const validTel = telephones.split(",").every(tel => tel.trim().length === 3);

    if (firstName.length > 0 && lastName.length > 0 && validTel) {
      this.addContactBtn.classList.remove("disabled");
    } else {
      this.addContactBtn.classList.add("disabled");
    }
  }
}

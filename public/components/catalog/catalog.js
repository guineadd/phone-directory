export default class Catalog {
  constructor() {
    this.loginBtn = null;
    this.showLoginModal = this.showLoginModal.bind(this);
    this.cancelModalBtn = null;
  }

  render() {
    this.loginBtn = document.getElementById("login-button");
    this.removeClickListener(this.loginBtn, this.showLoginModal);
    this.addClickListener(this.loginBtn, this.showLoginModal);

    this.cancelModalBtn = document.getElementById("close-edit-button");
    this.removeClickListener(this.cancelModalBtn, this.hideDivisionEditModal);
    this.addClickListener(this.cancelModalBtn, this.hideDivisionEditModal);

    this.buildDivisions();
    this.buildContacts(1);
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

  showDivisionEditModal() {
    const divisionEditModalContainer = document.getElementById("division-edit-modal-container");
    if (divisionEditModalContainer) {
      divisionEditModalContainer.classList.remove("hidden");
    }
  }

  hideDivisionEditModal() {
    const divisionEditModalContainer = document.getElementById("division-edit-modal-container");
    if (divisionEditModalContainer) {
      divisionEditModalContainer.classList.add("hidden");
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

  async buildDivisions() {
    const response = await fetch("/get-divisions");
    const data = await response.json();

    const divisions = document.getElementById("catalog-divisions");

    for (const division of data) {
      const divisionListItem = document.createElement("div");
      divisionListItem.classList.add("division-list-item");
      divisionListItem.id = `division-${division.id}`;

      const button = document.createElement("button");
      button.textContent = division.name;

      divisionListItem.appendChild(button);
      divisions.appendChild(divisionListItem);

      divisionListItem.addEventListener("click", () => {
        if (divisionListItem.classList.contains("selected")) {
          divisionListItem.classList.toggle("selected");

          const contacts = document.getElementById("catalog-contacts");
          contacts.innerHTML = "";
        } else {
          this.buildContacts(division.id);
        }
      });
    }
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
    selectedDivision.classList.toggle("selected");

    const contacts = document.getElementById("catalog-contacts");
    contacts.innerHTML = "";

    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container", "flex", "w-full");

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
    division.textContent = data.division.name;

    const editButton = document.createElement("button");
    editButton.classList.add("absolute", "top-2", "right-2");

    const editIcon = document.createElement("i");
    editIcon.classList.add("hover:text-login-submit", "fa-solid", "fa-edit", "text-2xl");
    editIcon.addEventListener("click", this.showDivisionEditModal);

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
    card.appendChild(editButton);
    card.appendChild(contactInfoHeaders);

    for (const [index, contact] of data.contacts.entries()) {
      const contactInfo = document.createElement("div");
      contactInfo.id = `contact-${contact.id}`;
      contactInfo.classList.add("contact-card", "flex", "flex-col", "justify-between", "overflow-auto");

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
      tel.textContent = contact.secondaryTel ? `${contact.primaryTel}/${contact.secondaryTel}` : `${contact.primaryTel}`;

      contactRow.appendChild(name);
      contactRow.appendChild(tel);
      contactInfo.appendChild(contactRow);

      card.appendChild(contactInfo);
    }

    cardContainer.appendChild(card);
    contacts.appendChild(cardContainer);
  }
}

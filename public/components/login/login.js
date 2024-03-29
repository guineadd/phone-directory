export default class Login {
  constructor() {
    this.username = null;
    this.password = null;
    this.loginBtn = null;
    this.signInBtn = null;
    this.headerUsers = null;
    this.cancelModalBtn = null;
    this.loginModalContainer = null;
    this.userManagementModalContainer = null;
    this.hideLoginModal = this.hideLoginModal.bind(this);
    this.signIn = this.signIn.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    // this.loginAttempts = null;
  }

  setComponents(catalog, userManagement, notifications) {
    this.catalogComponent = catalog;
    this.userManagementComponent = userManagement;
    this.notificationsComponent = notifications;
  }

  render() {
    this.userManagementModalContainer = document.getElementById("user-management-modal-container");
    this.loginModalContainer = document.getElementById("login-modal-container");
    this.username = document.getElementById("username");
    this.password = document.getElementById("password");
    this.loginBtn = document.getElementById("login-button");
    this.signInBtn = document.getElementById("sign-in-button");
    this.headerUsers = document.getElementById("header-users");
    this.cancelModalBtn = document.getElementById("close-modal-button");

    this.username.removeEventListener("keyup", this.inputHandler);
    this.password.removeEventListener("keyup", this.inputHandler);
    this.signInBtn.removeEventListener("click", this.signIn);
    this.cancelModalBtn.removeEventListener("click", this.hideLoginModal);

    this.username.addEventListener("keyup", this.inputHandler);
    this.password.addEventListener("keyup", this.inputHandler);
    this.loginBtn.addEventListener("click", () => {
      if (sessionStorage.getItem("loggedUserType")) {
        this.signOut();
      }
    });
    this.signInBtn.addEventListener("click", this.signIn);
    this.cancelModalBtn.addEventListener("click", this.hideLoginModal);

    this.headerUsers.addEventListener("click", async () => {
      this.userManagementModalContainer.classList.remove("hidden");
      this.catalogComponent.activeModal = "userManagementModal";
      await this.userManagementComponent.buildUsers();

      document.getElementById("new-username").focus();
    });
  }

  hideLoginModal() {
    if (this.loginModalContainer) {
      this.username.value = "";
      this.password.value = "";
      this.loginModalContainer.classList.add("hidden");
    }
  }

  inputHandler(event) {
    if (this.username.value === "" || this.password.value === "") {
      this.signInBtn.classList.add("disabled");
    } else {
      this.signInBtn.classList.remove("disabled");
    }

    if (event.key === "Enter" && !this.signInBtn.classList.contains("disabled")) {
      this.signInBtn.click();
    }
  }

  async signIn() {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.username.value,
        password: this.password.value,
      }),
    });

    const data = await response.json();
    sessionStorage.setItem("loggedUser", this.username.value);

    this.username.value = "";
    this.password.value = "";

    if (response.status !== 200) {
      console.log(data?.message);
      this.username.focus();

      return this.notificationsComponent.render(500, data?.message);
    }

    if (data.userTypeId === 1) {
      this.headerUsers.classList.remove("hidden");
    }

    sessionStorage.setItem("loggedUserType", data.UserType.type);
    this.loginBtn.innerHTML = `LOG OUT <i class="fa fa-right-from-bracket"></i>`;

    await this.catalogComponent.buildDepartments();

    document.getElementById("add-department-modal-button").classList.remove("hidden");
    document.getElementById("edit-department-order-button").classList.remove("hidden");

    this.loginModalContainer.classList.add("hidden");

    document.getElementById("search-contacts").focus();
    this.notificationsComponent.render(200, `Successfully signed in as ${data.UserType.type}`);
    console.log(`Succesfully signed in as ${data.UserType.type}.`);
  }

  async signOut() {
    this.headerUsers.classList.add("hidden");

    sessionStorage.clear();
    await this.catalogComponent.buildDepartments();

    document.getElementById("add-department-modal-button").classList.add("hidden");
    document.getElementById("edit-department-order-button").classList.add("hidden");

    this.loginBtn.innerHTML = `LOG IN <i class="fa fa-right-from-bracket"></i>`;

    document.getElementById("search-contacts").focus();
    this.notificationsComponent.render(200, "Successfully signed out");
    console.log("Successfully signed out.");
  }

  // inputHandler(event) {
  //   if (event.key === "Enter" && !this.loginBtn.classList.contains("disabled")) {
  //     this.loginBtn.click();
  //   }
  // }

  // login() {
  //   document.body.style.cursor = "wait";
  //   this.loginAttempts = sessionStorage.getItem("login-attempts") ? Number(sessionStorage.getItem("login-attempts")) : 0;
  //   let status;
  //   const body = {
  //     username: this.username.value,
  //     password: this.password.value,
  //   };

  //   fetch(`/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(body),
  //   })
  //     .then(res => {
  //       this.username.value = "";
  //       this.password.value = "";
  //       status = res.status;

  //       if (!res.ok) {
  //         this.loginAttempts++;
  //         sessionStorage.setItem("login-attempts", this.loginAttempts);

  //         if (this.loginAttempts >= 3) {
  //           const countdown = 10;
  //           this.loginBtn.classList.add("disabled");
  //           this.startCountdown(countdown);
  //         } else {
  //           this.errorMessage("Invalid credentials. Please try again.");
  //           this.validate();
  //         }

  //         this.username.focus();
  //         this.notificationsComponent.render(status, "Invalid username and/or password. Try again.");
  //         throw new Error(
  //           `HTTP error. Status: ${
  //             status === 500 ? status + " - Invalid credentials. Probably. Blame the API for lack of statuses =)" : status
  //           }`,
  //         );
  //       }

  //       return res.text();
  //     })
  //     .then(data => {
  //       console.clear();
  //       this.errorMessage("");
  //       console.log(data);

  //       sessionStorage.setItem("isLogged", true);
  //       this.loginModalContainer.classList.toggle("hidden");
  //       this.applicationsComponent.render();
  //       document.body.style.cursor = "unset";
  //       return this.notificationsComponent.render(status, "Successfully signed in.");
  //     })
  //     .catch(err => {
  //       document.body.style.cursor = "unset";
  //       console.error(`Error signing in: ${err}`);
  //     });
  // }

  // errorMessage(message) {
  //   const errorMessage = document.getElementById("login-failed");
  //   errorMessage.textContent = message;
  // }

  // startCountdown(seconds) {
  //   let countdown = seconds;

  //   const loginCountdown = setInterval(() => {
  //     if (countdown === 0) {
  //       clearInterval(loginCountdown);
  //       this.errorMessage("");
  //       this.loginAttempts = 0;
  //       sessionStorage.setItem("login-attempts", this.loginAttempts);

  //       if (this.username.value !== "" && this.password.value !== "") {
  //         this.loginBtn.classList.remove("disabled");
  //       }
  //     } else {
  //       this.errorMessage(`Too many attempts. Try again in ${countdown} sec.`);
  //       countdown--;
  //     }

  //     sessionStorage.setItem("countdown", countdown);
  //   }, 1000);
  // }
}

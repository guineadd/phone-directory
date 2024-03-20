export default class Login {
  constructor() {
    this.username = null;
    this.password = null;
    this.signInBtn = null;
    this.cancelModalBtn = null;
    this.loginModalContainer = null;
    this.userManagementModalContainer = null;
    this.hideLoginModal = this.hideLoginModal.bind(this);
    this.signIn = this.signIn.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    // this.loginAttempts = null;
  }

  setComponents(notifications) {
    this.notificationsComponent = notifications;
  }

  render() {
    this.userManagementModalContainer = document.getElementById("user-management-modal-container");
    this.loginModalContainer = document.getElementById("login-modal-container");
    this.username = document.getElementById("username");
    this.password = document.getElementById("password");
    this.signInBtn = document.getElementById("sign-in-button");
    this.cancelModalBtn = document.getElementById("close-modal-button");

    this.username.removeEventListener("keyup", this.inputHandler);
    this.password.removeEventListener("keyup", this.inputHandler);
    this.signInBtn.removeEventListener("click", this.signIn);
    this.cancelModalBtn.removeEventListener("click", this.hideLoginModal);

    this.username.addEventListener("keyup", this.inputHandler);
    this.password.addEventListener("keyup", this.inputHandler);
    this.signInBtn.addEventListener("click", this.signIn);
    this.cancelModalBtn.addEventListener("click", this.hideLoginModal);
  }

  hideLoginModal() {
    if (this.loginModalContainer) {
      this.loginModalContainer.classList.add("hidden");
    }
  }

  inputHandler(event) {
    if (event.key === "Enter" && !this.signInBtn.classList.contains("disabled")) {
      this.signInBtn.click();
    }
  }

  signIn() {
    if (this.username.value === "admin" && this.password.value === "admin") {
      console.log("succesfully signed in as admin");
      this.loginModalContainer.classList.add("hidden");

      const buttonContainer = document.createElement("div");
      buttonContainer.classList.add("w-[140px]");

      const adminButton = document.createElement("button");
      adminButton.innerHTML = `USERS <i class="fa-solid fa-user"></i>`;
      adminButton.classList.add("bg-buttons-primary", "hover:bg-general-details", "w-full", "rounded-lg", "py-1", "px-2");

      adminButton.addEventListener("click", () => {
        this.userManagementModalContainer.classList.remove("hidden");
      });

      buttonContainer.appendChild(adminButton);

      const headerButtons = document.getElementById("header-buttons");
      headerButtons.insertBefore(buttonContainer, headerButtons.firstChild);
    } else if (this.username.value === "user" && this.password.value === "user") {
      console.log("succesfully signed in");
      this.loginModalContainer.classList.add("hidden");
    } else {
      console.log("wrong credentials");
    }
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

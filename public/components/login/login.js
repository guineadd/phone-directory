export default class Login {
  constructor() {
    this.username = null;
    this.password = null;
    this.loginBtn = null;
    this.loginModalContainer = null;
    this.inputHandler = this.inputHandler.bind(this);
    this.validate = this.validate.bind(this);
    this.login = this.login.bind(this);
    this.loginAttempts = null;
  }

  render() {
    this.username = document.getElementById("username");
    this.password = document.getElementById("password");
    this.loginBtn = document.getElementById("sign-in");
    this.loginModalContainer = document.getElementById("login-modal-container");

    this.username.removeEventListener("input", this.validate);
    this.password.removeEventListener("input", this.validate);
    this.loginBtn.removeEventListener("click", this.login);
    this.username.addEventListener("input", this.validate);
    this.password.addEventListener("input", this.validate);
    this.loginBtn.addEventListener("click", this.login);

    this.username.removeEventListener("keyup", this.inputHandler);
    this.password.removeEventListener("keyup", this.inputHandler);
    this.username.addEventListener("keyup", this.inputHandler);
    this.password.addEventListener("keyup", this.inputHandler);

    if (Number(sessionStorage.getItem("login-attempts")) >= 3) {
      this.startCountdown(Number(sessionStorage.getItem("countdown")));
    }
  }

  setComponents(applications, notifications) {
    this.applicationsComponent = applications;
    this.notificationsComponent = notifications;
  }

  inputHandler(event) {
    if (event.key === "Enter" && !this.loginBtn.classList.contains("disabled")) {
      this.loginBtn.click();
    }
  }

  login() {
    document.body.style.cursor = "wait";
    this.loginAttempts = sessionStorage.getItem("login-attempts") ? Number(sessionStorage.getItem("login-attempts")) : 0;
    let status;
    const body = {
      username: this.username.value,
      password: this.password.value,
    };

    fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(res => {
        this.username.value = "";
        this.password.value = "";
        status = res.status;

        if (!res.ok) {
          this.loginAttempts++;
          sessionStorage.setItem("login-attempts", this.loginAttempts);

          if (this.loginAttempts >= 3) {
            const countdown = 10;
            this.loginBtn.classList.add("disabled");
            this.startCountdown(countdown);
          } else {
            this.errorMessage("Invalid credentials. Please try again.");
            this.validate();
          }

          this.username.focus();
          this.notificationsComponent.render(status, "Invalid username and/or password. Try again.");
          throw new Error(
            `HTTP error. Status: ${
              status === 500 ? status + " - Invalid credentials. Probably. Blame the API for lack of statuses =)" : status
            }`,
          );
        }

        return res.text();
      })
      .then(data => {
        console.clear();
        this.errorMessage("");
        console.log(data);

        sessionStorage.setItem("isLogged", true);
        this.loginModalContainer.classList.toggle("hidden");
        this.applicationsComponent.render();
        document.body.style.cursor = "unset";
        return this.notificationsComponent.render(status, "Successfully signed in.");
      })
      .catch(err => {
        document.body.style.cursor = "unset";
        console.error(`Error signing in: ${err}`);
      });
  }

  validate() {
    if (this.username.value === "" || this.password.value === "") {
      this.loginBtn.classList.add("disabled");
    } else {
      if (Number(sessionStorage.getItem("login-attempts")) >= 3) return;
      this.loginBtn.classList.remove("disabled");
    }
  }

  errorMessage(message) {
    const errorMessage = document.getElementById("login-failed");
    errorMessage.textContent = message;
  }

  startCountdown(seconds) {
    let countdown = seconds;

    const loginCountdown = setInterval(() => {
      if (countdown === 0) {
        clearInterval(loginCountdown);
        this.errorMessage("");
        this.loginAttempts = 0;
        sessionStorage.setItem("login-attempts", this.loginAttempts);

        if (this.username.value !== "" && this.password.value !== "") {
          this.loginBtn.classList.remove("disabled");
        }
      } else {
        this.errorMessage(`Too many attempts. Try again in ${countdown} sec.`);
        countdown--;
      }

      sessionStorage.setItem("countdown", countdown);
    }, 1000);
  }
}

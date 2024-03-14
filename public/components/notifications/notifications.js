export default class Notifications {
  constructor() {
    this.bar = null;
    this.notificationContainer = null;
    this.notificationQueue = [];
  }

  render(status, message) {
    this.bar = document.getElementById("notification-bar");
    this.notificationContainer = document.querySelector(".notification-container");

    const notificationElement = document.createElement("span");
    notificationElement.classList.add("notification");
    notificationElement.innerHTML = message;

    if (status === 200 || status === 204) {
      notificationElement.classList.add("success");
    } else if (status >= 400 && status <= 500) {
      notificationElement.classList.add("error");
    } else if (status === 0) {
      notificationElement.classList.add("warning");
    }

    this.notificationQueue.push(notificationElement);
    return this.showNextNotification(message);
  }

  showNextNotification(message) {
    if (this.notificationQueue.length > 0) {
      const nextNotification = this.notificationQueue.shift();
      nextNotification.style.opacity = 0;
      this.notificationContainer.appendChild(nextNotification);

      setTimeout(() => {
        nextNotification.style.opacity = 1;

        setTimeout(() => {
          nextNotification.style.opacity = 0;
          setTimeout(() => {
            this.notificationContainer.removeChild(nextNotification);
            this.showNextNotification();
          }, 300);
        }, 3000);
      }, 0);

      return message;
    }
  }
}

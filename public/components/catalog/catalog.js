import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default class Catalog {
  constructor() {
    this.loginBtn = null;
    this.createPdfBtn = null;
    this.showLoginModal = this.showLoginModal.bind(this);
    this.createPdf = this.createPdf.bind(this);
  }

  render() {
    this.loginBtn = document.getElementById("login-button");
    this.createPdfBtn = document.getElementById("export-button");

    this.removeClickListener(this.loginBtn, this.showLoginModal);
    this.addClickListener(this.loginBtn, this.showLoginModal);
    this.removeClickListener(this.createPdfBtn, this.createPdf);
    this.addClickListener(this.createPdfBtn, this.createPdf);
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

  createPdf() {
    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });
    const pdfContainer = document.getElementById("pdf-container");

    html2canvas(pdfContainer, { scale: 4 }).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 277);
      pdf.save("filename.pdf");
    });
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
}

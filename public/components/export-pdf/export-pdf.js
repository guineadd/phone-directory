import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default class ExportPdf {
  constructor() {
    this.showDivSelectionModalBtn = null;
    this.fetchPdfData = this.fetchPdfData.bind(this);
    this.closeSelectionModalBtn = null;
    this.closeSelectionModal = this.closeSelectionModal.bind(this);
    this.exportPdfBtn = null;
    this.exportPdf = this.exportPdf.bind(this);
    this.selectAllChecksBtn = null;
    this.selectAllChecks = this.selectAllChecks.bind(this);
    this.pageIndex = null;
    this.pdfData = null;
  }

  render() {
    this.showDivSelectionModalBtn = document.getElementById("show-department-selection-modal");
    this.closeSelectionModalBtn = document.getElementById("close-select-button");
    this.exportPdfBtn = document.getElementById("export-pdf");
    this.selectAllChecksBtn = document.getElementById("select-all");

    this.showDivSelectionModalBtn.removeEventListener("click", this.fetchPdfData);
    this.showDivSelectionModalBtn.addEventListener("click", this.fetchPdfData);

    this.closeSelectionModalBtn.removeEventListener("click", this.closeSelectionModal);
    this.closeSelectionModalBtn.addEventListener("click", this.closeSelectionModal);

    this.exportPdfBtn.removeEventListener("click", this.exportPdf);
    this.exportPdfBtn.addEventListener("click", this.exportPdf);

    this.selectAllChecksBtn.removeEventListener("click", this.selectAllChecks);
    this.selectAllChecksBtn.addEventListener("click", this.selectAllChecks);
  }

  setComponents(notifications) {
    this.notificationsComponent = notifications;
  }

  async fetchPdfData() {
    const response = await fetch(`/get-all-contacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    data.sort((a, b) => a.order - b.order);

    const filteredData = data.filter(item => item.name !== "ΧΩΡΙΣ ΚΑΤΗΓΟΡΙΑ");

    const modal = document.getElementById("department-selection-modal-container");
    modal.classList.remove("hidden");
    const departmentSelectionArea = document.getElementById("department-selection-area");
    departmentSelectionArea.innerHTML = "";

    for (const department of filteredData) {
      const departmentSelectItem = document.createElement("div");
      departmentSelectItem.classList.add(
        "flex",
        "flex-row",
        "bg-general-barsPrimary",
        "rounded-[10px]",
        "p-2",
        "m-2",
        "w-[350px]",
        "justify-between",
        "hover:bg-general-hover",
        "cursor-pointer",
      );

      departmentSelectItem.innerHTML = `
        <div>${department.name}</div>
        <input id="selected-department-${department.id}" type="checkbox" class="department-checkbox h-6 w-6 cursor-pointer rounded-lg">
      `;

      const checkbox = departmentSelectItem.querySelector(`#selected-department-${department.id}`);

      departmentSelectItem.addEventListener("click", () => {
        checkbox.checked = !checkbox.checked;
      });

      checkbox.addEventListener("click", event => {
        event.stopPropagation();
      });

      departmentSelectionArea.appendChild(departmentSelectItem);
    }

    this.pdfData = filteredData;
  }

  selectAllChecks() {
    const checkboxes = document.querySelectorAll(".department-checkbox");

    checkboxes.forEach(checkbox => {
      checkbox.checked = this.selectAllChecksBtn.checked;
    });
  }

  exportPdf() {
    const departmentSelectionArea = document.getElementById("department-selection-area");
    const inputsSelected = departmentSelectionArea.querySelectorAll("input[type='checkbox']:checked");
    const modal = document.getElementById("department-selection-modal-container");
    const selectedInputIds = [];

    inputsSelected.forEach(input => {
      const idString = input.id.split("-");
      const idNumber = idString[2].trim();
      selectedInputIds.push(idNumber);
    });

    const filteredPdfData = this.pdfData.filter(item => selectedInputIds.includes(item.id.toString()));

    if (filteredPdfData.length === 0) {
      this.notificationsComponent.render(500, "Choose at least one department to continue");
      return;
    }

    this.selectAllChecksBtn.checked = false;
    modal.classList.add("hidden");
    document.getElementById("preview-container").innerHTML = "";
    document.getElementById("off-screen-container").innerHTML = "";
    this.pageIndex = 1;
    this.createPdfPage();
    this.insertDepartments(filteredPdfData);
  }

  closeSelectionModal() {
    this.selectAllChecksBtn.checked = false;
    const modal = document.getElementById("department-selection-modal-container");
    modal.classList.add("hidden");
  }

  createPdfPage() {
    const div = document.createElement("div");
    div.classList.add("h-[1400px]", "w-[1000px]", "mb-[10px]", "flex", "flex-col", "bg-white", "items-center", "text-black");
    div.setAttribute("id", `pdf-container-${this.pageIndex}`);
    div.innerHTML = `
      <div class="w-[90%] h-[60px] flex justify-between pb-4">
        <div>
          <img src="../../../assets/images/olylogo.png" width="110" height="60">
        </div>
        <div class="flex flex-col justify-center items-end">
          <span class="font-semibold text-base">ΕΝΗΜΕΡΩΘΗΚΕ: ${document.getElementById("updated-at").innerHTML}</span>
          <span class="font-semibold text-base">ΚΑΤΑΛΟΓΟΣ ΕΣΩΤΕΡΙΚΩΝ ΤΗΛΕΦΩΝΩΝ</span>
        </div>
      </div>
      <div id="pdf-departments-${this.pageIndex}" class="h-[1300px] w-[100%] flex flex-row">
        <div id="page-${this.pageIndex}-first-column" class="h-[100%] w-[50%] flex flex-col"></div>
        <div id="page-${this.pageIndex}-second-column" class="h-[100%] w-[50%] flex flex-col"></div>
      </div>
    `;

    document.getElementById("preview-container").appendChild(div);
  }

  insertDepartments(data) {
    const offScreenContainer = document.getElementById("off-screen-container");
    let firstColHeight = 0;
    let secondColHeight = 0;
    const COLUMN_MAX_HEIGHT = 1300;

    data.forEach(department => {
      const departmentDiv = document.createElement("div");
      departmentDiv.classList.add("w-[500px]", "flex", "flex-col");
      departmentDiv.innerHTML = `
        <div>
          <div
            class="flex justify-center bg-buttons-delete text-white font-semibold text-base border-x-[1px]
            border-t-[1px] border-b-[0px] border-black">${department.name}
          </div>
          <div class="flex flex-col">
            <table id="tab-table-${department.id}" class="w-full border border-collapse text-sm">
              <tbody id="tab-body-${department.id}"></tbody>
            </table>
          </div>
        </div>
      `;

      if (department.id === 2) {
        department.Contacts.sort((a, b) => a.id - b.id);
      } else {
        department.Contacts.sort((a, b) => a.lastName.localeCompare(b.lastName));
      }

      const tableBody = departmentDiv.querySelector(`#tab-body-${department.id}`);

      for (const [index, contact] of department.Contacts.entries()) {
        const rowDiv = document.createElement("tr");
        rowDiv.innerHTML = `
          <td class="border-collapse border-y-[1px] border-l-[1px] border-r-[0px] border-black pl-1">${contact.lastName} ${contact.firstName}</td>
          <td class="border-collapse border-y-[1px] border-x-0 border-black ">${contact.comment.length > 0 ? "(" + contact.comment + ")" : ""}</td>
          <td class="border-collapse border border-black text-center text-base font-bold w-[80px]">
          ${contact.Telephones.map(telephone => telephone.tel).join("/")}</td>
        `;
        rowDiv.classList.add(index % 2 === 0 ? "bg-general-zebraOdd" : "bg-general-zebraEven");
        tableBody.appendChild(rowDiv);
      }

      offScreenContainer.appendChild(departmentDiv);
      const departmentHeight = departmentDiv.offsetHeight;
      firstColHeight += departmentHeight;

      if (firstColHeight < COLUMN_MAX_HEIGHT) {
        document.getElementById(`page-${this.pageIndex}-first-column`).appendChild(departmentDiv);
      } else if (firstColHeight >= COLUMN_MAX_HEIGHT) {
        secondColHeight += departmentHeight;
        if (secondColHeight >= COLUMN_MAX_HEIGHT) {
          firstColHeight = 0;
          secondColHeight = 0;
          this.pageIndex++;
          this.createPdfPage();
          document.getElementById(`page-${this.pageIndex}-first-column`).appendChild(departmentDiv);
        } else {
          document.getElementById(`page-${this.pageIndex}-second-column`).appendChild(departmentDiv);
        }
      }
    });

    this.createPdf();
  }

  async createPdf() {
    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
    });

    const pdfContainers = Array.from(document.querySelectorAll('[id^="pdf-container-"]'));
    const canvasPromises = pdfContainers.map(container => html2canvas(container, { scale: 4 }));
    const canvases = await Promise.all(canvasPromises);

    for (let i = 0; i < canvases.length; i++) {
      if (i !== 0) {
        pdf.addPage();
      }

      pdf.addImage(canvases[i].toDataURL("image/jpeg"), "JPEG", 10, 5, 190, 290);
    }

    pdf.save("ΤΗΛΕΦΩΝΙΚΟΣ ΚΑΤΑΛΟΓΟΣ.pdf");
  }
}

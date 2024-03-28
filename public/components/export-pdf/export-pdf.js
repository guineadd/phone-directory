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
    this.showDivSelectionModalBtn = document.getElementById("show-division-selection-modal");
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

    const modal = document.getElementById("division-selection-modal-container");
    modal.classList.remove("hidden");
    const divisionSelectionArea = document.getElementById("division-selection-area");
    divisionSelectionArea.innerHTML = "";

    for (const division of filteredData) {
      const divisionSelectItem = document.createElement("div");
      divisionSelectItem.classList.add(
        "flex",
        "flex-row",
        "bg-general-background",
        "rounded-[10px]",
        "p-2",
        "m-2",
        "w-[350px]",
        "justify-between",
        "hover:bg-general-details",
        "cursor-pointer",
      );

      divisionSelectItem.innerHTML = `
        <div>${division.name}</div>
        <input id="selected-division-${division.id}" type="checkbox" class="division-checkbox h-6 w-6 cursor-pointer rounded-lg">
      `;

      const checkbox = divisionSelectItem.querySelector(`#selected-division-${division.id}`);

      divisionSelectItem.addEventListener("click", () => {
        checkbox.checked = !checkbox.checked;
      });

      checkbox.addEventListener("click", event => {
        event.stopPropagation();
      });

      divisionSelectionArea.appendChild(divisionSelectItem);
    }

    this.pdfData = filteredData;
  }

  selectAllChecks() {
    const checkboxes = document.querySelectorAll(".division-checkbox");

    checkboxes.forEach(checkbox => {
      checkbox.checked = this.selectAllChecksBtn.checked;
    });
  }

  exportPdf() {
    const divisionSelectionArea = document.getElementById("division-selection-area");
    const inputsSelected = divisionSelectionArea.querySelectorAll("input[type='checkbox']:checked");
    const modal = document.getElementById("division-selection-modal-container");
    const selectedInputIds = [];

    inputsSelected.forEach(input => {
      const idString = input.id.split("-");
      const idNumber = idString[2].trim();
      selectedInputIds.push(idNumber);
    });

    const filteredPdfData = this.pdfData.filter(item => selectedInputIds.includes(item.id.toString()));

    this.selectAllChecksBtn.checked = false;
    modal.classList.add("hidden");
    document.getElementById("preview-container").innerHTML = "";
    this.pageIndex = 1;
    this.createPdfPage();
    this.insertDivisions(filteredPdfData);
  }

  closeSelectionModal() {
    this.selectAllChecksBtn.checked = false;
    const modal = document.getElementById("division-selection-modal-container");
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
      <div id="pdf-divisions-${this.pageIndex}" class="h-[1300px] flex flex-wrap flex-col"></div>
    `;

    document.getElementById("preview-container").appendChild(div);
  }

  insertDivisions(data) {
    let totalHeight = 0;
    let secondColHeight = 0;

    data.forEach(division => {
      const divisionDiv = document.createElement("div");
      divisionDiv.classList.add("w-[500px]", "flex", "flex-col");
      divisionDiv.innerHTML = `
        <div>
          <div
            class="flex justify-center bg-red-700 text-white font-semibold text-base border-x-[1px] border-t-[1px] border-b-[0px] border-black">
            ${division.name}
          </div>
          <div class="flex flex-col">
            <table id="tab-table-${division.id}" class="w-full border border-collapse text-sm">
              <tbody id="tab-body-${division.id}"></tbody>
            </table>
          </div>
        </div>
      `;

      if (division.id === 2) {
        division.Contacts.sort((a, b) => a.id - b.id);
      } else {
        division.Contacts.sort((a, b) => a.lastName.localeCompare(b.lastName));
      }

      const tableBody = divisionDiv.querySelector(`#tab-body-${division.id}`);

      for (const [index, contact] of division.Contacts.entries()) {
        const rowDiv = document.createElement("tr");
        rowDiv.innerHTML = `
            <td class="border-collapse border-y-[1px] border-l-[1px] border-r-[0px] border-black pl-1">${contact.lastName} ${contact.firstName}</td>
            <td class="border-collapse border-y-[1px] border-x-0 border-black ">${contact.comment.length > 0 ? "(" + contact.comment + ")" : ""}</td>
            <td class="border-collapse border border-black text-center font-bold w-[80px]">
            ${contact.Telephones[0].tel}
            ${contact.Telephones.length > 1 ? "/" + contact.Telephones[1].tel : ""}
            </td>
          `;
        rowDiv.classList.add(index % 2 === 0 ? "bg-general-zebraOdd" : "bg-general-zebraEven");
        tableBody.appendChild(rowDiv);
      }

      const divisionContainer = document.getElementById(`pdf-divisions-${this.pageIndex}`);
      divisionContainer.appendChild(divisionDiv);
      totalHeight += divisionDiv.clientHeight;

      if (totalHeight > 1200) {
        secondColHeight += divisionDiv.clientHeight;
        document.getElementById(`pdf-container-1`).classList.remove("w-[1000px]");
      }

      if (secondColHeight > 1200 && divisionContainer.clientWidth === 1000) {
        this.pageIndex++;
        this.createPdfPage();
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

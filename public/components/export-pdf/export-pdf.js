import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default class ExportPdf {
  constructor() {
    this.exportPdfBtn = null;
    this.fetchPdfData = this.fetchPdfData.bind(this);
    this.pageIndex = null;
    this.pdfData = null;
  }

  render() {
    this.exportPdfBtn = document.getElementById("export-button");

    this.exportPdfBtn.removeEventListener("click", this.fetchPdfData);
    this.exportPdfBtn.addEventListener("click", this.fetchPdfData);
  }

  async fetchPdfData() {
    const response = await fetch(`/get-all-contacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    const filteredData = data.filter(item => item.name !== "ΧΩΡΙΣ ΚΑΤΗΓΟΡΙΑ");

    console.log("data", filteredData);
    document.getElementById("preview-container").innerHTML = "";
    this.pdfData = filteredData;
    this.pageIndex = 1;
    this.createPdfPage();
    this.insertDivisions();
  }

  createPdfPage() {
    const div = document.createElement("div");
    div.classList.add("h-[1550px]", "mb-[10px]", "flex", "flex-col", "bg-white", "items-center", "text-black");
    div.setAttribute("id", `pdf-container-${this.pageIndex}`);
    div.innerHTML = `
      <div class="w-[90%] h-[60px] flex justify-between pb-4">
        <div>
          <img src="../../../assets/images/olylogo.png" width="110" height="60">
        </div>
        <div class="flex flex-col items-end pr-[20px]">
          <span class="font-semibold text-base">ΚΑΤΑΛΟΓΟΣ ΕΣΩΤΕΡΙΚΩΝ ΤΗΛΕΦΩΝΩΝ</span>
          <span class="font-semibold text-sm">Ενημερώθηκε 02/02/2024</span>
        </div>
      </div>
      <div id="pdf-divisions-${this.pageIndex}" class="h-[1450px] flex flex-wrap flex-col"></div>
    `;
    document.getElementById("preview-container").appendChild(div);
  }

  insertDivisions() {
    let totalHeight = 0;
    let secondColHeight = 0;

    this.pdfData.forEach(division => {
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

      const tableBody = divisionDiv.querySelector(`#tab-body-${division.id}`);

      division.Contacts.forEach((contact, index) => {
        const rowDiv = document.createElement("tr");
        rowDiv.innerHTML = `
            <td class="border-collapse border-y-[1px] border-l-[1px] border-r-[0px] border-black pl-1">${contact.lastName} ${contact.firstName}</td>
            <td class="border-collapse border-y-[1px] border-x-0 border-black ">${contact.comment.length > 0 ? "(" + contact.comment + ")" : ""}</td>
            <td class="border-collapse border border-black text-center font-bold w-[70px]">
            ${contact.Telephones[0].tel}
            ${contact.Telephones.length > 1 ? "/" + contact.Telephones[1].tel : ""}
            </td>
          `;
        rowDiv.classList.add(index % 2 === 0 ? "bg-general-zebraOdd" : "bg-general-zebraEven");
        tableBody.appendChild(rowDiv);
      });
      const divisionContainer = document.getElementById(`pdf-divisions-${this.pageIndex}`);
      divisionContainer.appendChild(divisionDiv);
      totalHeight += divisionDiv.clientHeight;

      if (totalHeight > 1450) {
        secondColHeight += divisionDiv.clientHeight;
      }

      if (secondColHeight > 1450 && divisionContainer.clientWidth === 1000) {
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

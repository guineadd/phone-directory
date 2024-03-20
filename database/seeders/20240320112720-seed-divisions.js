"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert(
      "Divisions",
      [
        { name: "ΔΙΕΥΘΥΝΣΗ", order: 1, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΥΠΕΥΘΥΝΟΣ ISO", order: 2, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΤΜΗΜΑ ΜΗΧΑΝΟΓΡΑΦΗΣΗΣ", order: 3, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΓΡΑΜΜΑΤΕΙΑ ΔΙΟΙΚΗΣΗΣ", order: 4, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΓΡΑΜΜΑΤΕΙΑ (RECEPTION)", order: 5, createdAt: new Date(), updatedAt: new Date() },
        { name: "INTERNATIONAL SALES DIRECTOR", order: 6, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΕΞΑΓΩΓΕΣ", order: 7, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΤΜΗΜΑ D.MARKETING/ΔΗΜΙΟΥΡΓΙΚΟ", order: 8, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΤΜΗΜΑ ΗΛ/ΚΩΝ ΜΕΛΕΤΩΝ", order: 9, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΕΡΕΥΝΑ", order: 10, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΓΡΑΦΕΙΟ ΘΕΣΣΑΛΟΝΙΚΗΣ", order: 11, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΛΟΓΙΣΤΗΡΙΟ", order: 12, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΤΕΧΝΙΚΗ ΥΠΟΣΤΗΡΙΞΗ", order: 13, createdAt: new Date(), updatedAt: new Date() },
        { name: "QUALITY DEPARTMENT", order: 14, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΕΣΤΙΑΤΟΡΙΟ", order: 15, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΓΕΝΙΚΟΣ ΔΙΕΥΘΥΝΤΗΣ", order: 16, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΤΜΗΜΑ ΑΝΘΡΩΠΙΝΟΥ ΔΥΝΑΜΙΚΟΥ", order: 17, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΠΩΛΗΤΕΣ", order: 18, createdAt: new Date(), updatedAt: new Date() },
        { name: "SUPPLY CHAIN MANAGER", order: 19, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΤΜΗΜΑ LOGISTICS", order: 20, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΤΜΗΜΑ ΠΡΟΜΗΘΕΙΩΝ", order: 21, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΑΠΟΘΗΚΗ Α' ΥΛΩΝ", order: 22, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΑΠΟΘΗΚΗ ΠΛΑΣΤΙΚΩΝ", order: 23, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΑΠΟΘΗΚΗ ΕΤΟΙΜΩΝ", order: 24, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΓΡΑΦΕΙΟ ΠΑΡΑΓΩΓΗΣ", order: 25, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΤΜΗΜΑ ΤΕΧΝΙΚΗΣ ΑΝΑΛΥΣΗΣ", order: 26, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΤΜΗΜΑ PVT", order: 27, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΠΑΡΑΓΩΓΗ", order: 28, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΤΥΠΟΓΡΑΦΕΙΟ", order: 29, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΚΑΘΑΡΙΟΤΗΤΑ", order: 30, createdAt: new Date(), updatedAt: new Date() },
        { name: "ΥΠΟΚΑΤΑΣΤΗΜΑ", order: 31, createdAt: new Date(), updatedAt: new Date() },
      ],
      {},
    );
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Divisions", null, {});
  },
};

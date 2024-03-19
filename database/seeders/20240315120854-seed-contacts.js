"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const contactsSeedData = [
      {
        divisionId: 1,
        firstName: "ΠΑΝΑΓΙΩΤΗΣ",
        lastName: "ΑΡΒΑΝΙΤΙΔΗΣ",
        comment: "",
        primaryTel: "105",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 1,
        firstName: "ΝΙΚΟΣ",
        lastName: "ΛΑΚΑΣΑΣ",
        comment: "",
        primaryTel: "104",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 1,
        firstName: "ΝΙΚΟΣ",
        lastName: "ΑΡΒΑΝΙΤΙΔΗΣ",
        comment: "CEO",
        primaryTel: "114",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 1,
        firstName: "ΔΗΜΗΤΡΗΣ",
        lastName: "ΛΑΚΑΣΑΣ",
        comment: "CEO",
        primaryTel: "207",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 1,
        firstName: "ΠΑΝΑΓΙΩΤΗΣ",
        lastName: "ΑΡΒΑΝΙΤΙΔΗΣ",
        comment: "",
        primaryTel: "105",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 1,
        firstName: "ΔΙΟΝΥΣΗΣ",
        lastName: "ΛΑΚΑΣΑΣ",
        comment: "CTO",
        primaryTel: "112",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 1,
        firstName: "ΡΕΝΑ",
        lastName: "ΑΡΒΑΝΙΤΙΔΟΥ",
        comment: "",
        primaryTel: "105",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 2,
        firstName: "ΛΑΚΑΣΑΣ",
        lastName: "ΘΩΜΑΣ",
        comment: "",
        primaryTel: "221",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 3,
        firstName: "ΠΑΝΑΓΙΩΤΗΣ",
        lastName: "ΚΟΣΜΙΔΗΣ",
        comment: "",
        primaryTel: "113",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 3,
        firstName: "ΒΑΛΕΡΙΟΣ",
        lastName: "ΚΡΙΣΙΟΥΚ",
        comment: "",
        primaryTel: "481",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 3,
        firstName: "ΚΥΡΙΑΚΟΣ",
        lastName: "ΓΕΩΡΓΙΑΔΗΣ",
        comment: "",
        primaryTel: "428",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 4,
        firstName: "ΚΙΚΗ",
        lastName: "ΓΛΥΚΟΥ",
        comment: "",
        primaryTel: "203",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 5,
        firstName: "ΜΑΡΙΑ",
        lastName: "ΠΑΠΑΔΗΜΗΤΡΙΟΥ",
        comment: "",
        primaryTel: "201",
        secondaryTel: "202",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 6,
        firstName: "ΧΑΡΑΛΑΜΠΟΣ",
        lastName: "ΚΑΡΑΚΙΔΗΣ",
        comment: "",
        primaryTel: "295",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 7,
        firstName: "ΠΑΝΤΕΛΗΣ",
        lastName: "ΑΝΤΑΡ",
        comment: "ΔΙΕΥΘΥΝΤΗΣ ΕΞΑΓΩΓΩΝ",
        primaryTel: "206",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 7,
        firstName: "ΝΙΚΟΣ",
        lastName: "ΑΝΤΑΡ",
        comment: "",
        primaryTel: "248",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 7,
        firstName: "ΑΝΤΩΝΗΣ",
        lastName: "ΑΡΓΥΡΟΠΟΥΛΟΣ",
        comment: "KEY ACCOUNT MANAGER",
        primaryTel: "416",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 7,
        firstName: "ΟΛΓΑ",
        lastName: "ΜΥΡΙΣΑ",
        comment: "",
        primaryTel: "209",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 7,
        firstName: "ΙΩΑΝΝΑ",
        lastName: "ΤΣΙΛΑΚΟΠΟΥΛΟΥ",
        comment: "",
        primaryTel: "218",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 7,
        firstName: "ΔΑΦΝΗ",
        lastName: "ΧΑΤΖΗΓΙΟΒΑΝΑΚΗ",
        comment: "",
        primaryTel: "247",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 8,
        firstName: "ΔΩΡΑ",
        lastName: "ΓΕΡΟΝΤΙΔΟΥ",
        comment: "",
        primaryTel: "245",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 8,
        firstName: "ΕΛΙΣΑΒΕΤ",
        lastName: "ΠΑΛΑΙΟΛΟΓΟΥ",
        comment: "",
        primaryTel: "245",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 8,
        firstName: "ΕΛΕΝΑ",
        lastName: "ΤΟΠΑΛΙΔΟΥ",
        comment: "",
        primaryTel: "257",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 9,
        firstName: "ΘΑΝΑΣΗΣ",
        lastName: "ΕΛΕΥΘΕΡΟΥΔΗΣ",
        comment: "",
        primaryTel: "215",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 9,
        firstName: "ΑΝΑΣΤΑΣΙΟΣ",
        lastName: "ΚΟΠΤΕΡΙΔΗΣ",
        comment: "",
        primaryTel: "283",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 9,
        firstName: "ΠΕΡΣΕΦΟΝΗ",
        lastName: "ΜΠΕΤΣΙΟΥ",
        comment: "",
        primaryTel: "432",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΑΣΤΕΡΙΟΣ",
        lastName: "ΘΕΟΔΩΡΟΥ",
        comment: "",
        primaryTel: "231",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΑΣΤΕΡΙΟΣ",
        lastName: "ΚΑΛΟΓΕΡΑΣ",
        comment: "",
        primaryTel: "431",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΧΡΗΣΤΟΣ",
        lastName: "ΚΑΠΟΥΡΑΝΗΣ",
        comment: "",
        primaryTel: "431",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΙΩΑΝΝΗΣ",
        lastName: "ΚΑΡΑΓΙΑΝΝΗΣ",
        comment: "",
        primaryTel: "287",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΠΩΛΙΝΑ",
        lastName: "ΚΑΡΑΓΙΑΝΝΙΔΟΥ",
        comment: "",
        primaryTel: "130",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΘΕΟΔΩΡΟΣ",
        lastName: "ΚΛΕΙΣΙΑΡΗΣ",
        comment: "",
        primaryTel: "447",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΜΑΡΙΑ",
        lastName: "ΚΟΣΙΒΑ",
        comment: "",
        primaryTel: "140",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΒΑΣΙΛΗΣ",
        lastName: "ΚΩΤΟΥΛΑΣ",
        comment: "",
        primaryTel: "259",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΔΗΜΗΤΡΗΣ",
        lastName: "ΜΑΝΤΑΓΚΙΩΖΗΣ",
        comment: "",
        primaryTel: "435",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΓΙΩΡΓΟΣ",
        lastName: "ΜΑΝΤΗΣ",
        comment: "",
        primaryTel: "238",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΔΗΜΗΤΡΗΣ",
        lastName: "ΜΗΤΣΙΤΣΙΚΑΣ",
        comment: "",
        primaryTel: "477",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΑΠΟΣΤΟΛΗΣ",
        lastName: "ΝΕΤΣΙΟΣ",
        comment: "",
        primaryTel: "239",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΣΤΑΜΑΤΗΣ",
        lastName: "ΝΙΚΟΛΟΠΟΥΛΟΣ",
        comment: "",
        primaryTel: "242",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΧΑΡΗΣ",
        lastName: "ΑΝΑΝΙΑΔΗΣ",
        comment: "",
        primaryTel: "483",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΙΩΑΝΝΗΣ",
        lastName: "ΠΑΥΛΟΥ",
        comment: "",
        primaryTel: "280",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΒΑΣΙΛΗΣ",
        lastName: "ΤΣΑΡΟΥΧΑΣ",
        comment: "",
        primaryTel: "277",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΗΛΙΑΣ",
        lastName: "ΤΣΟΛΟΓΙΑΝΝΗΣ",
        comment: "",
        primaryTel: "129",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΓΡΗΓΟΡΗΣ",
        lastName: "ΦΟΥΝΤΟΠΟΥΛΟΣ",
        comment: "",
        primaryTel: "484",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΓΙΑΝΝΗΣ",
        lastName: "ΧΑΡΙΤΟΥΔΗΣ",
        comment: "",
        primaryTel: "234",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 10,
        firstName: "ΧΑΡΑΞΗ",
        lastName: "ΠΛΑΚΕΤΩΝ",
        comment: "LPKF 3ος ΟΡΟΦΟΣ",
        primaryTel: "236",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 11,
        firstName: "ΓΙΩΡΓΟΣ",
        lastName: "ΒΟΥΤΣΗΣ",
        comment: "",
        primaryTel: "705",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 11,
        firstName: "ΟΡΕΣΤΗΣ",
        lastName: "ΓΕΩΡΓΙΑΔΗΣ",
        comment: "",
        primaryTel: "710",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 11,
        firstName: "ΔΗΜΗΤΡΗΣ",
        lastName: "ΚΥΠΡΙΑΝΟΥ",
        comment: "",
        primaryTel: "706",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 11,
        firstName: "ΛΕΝΑ",
        lastName: "ΜΑΡΑΒΕΛΙΑ",
        comment: "ΑΝΑΠΤΥΞΙΑΚΑ ΠΡΟΓΡΑΜΜΑΤΑ",
        primaryTel: "708",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 11,
        firstName: "ΚΩΣΤΑΣ",
        lastName: "ΧΑΡΑΛΑΜΠΙΔΗΣ",
        comment: "",
        primaryTel: "709",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 12,
        firstName: "ΓΙΑΝΝΗΣ",
        lastName: "ΑΛΕΞΟΠΟΥΛΟΣ",
        comment: "ΟΙΚ. ΔΙΕΥΘΥΝΤΗΣ",
        primaryTel: "222",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 12,
        firstName: "ΕΝΤΟΥΑΡΝΤ",
        lastName: "ΓΚΙΟΚΧΙΛΑΪ",
        comment: "",
        primaryTel: "224",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 12,
        firstName: "ΧΡΥΣΟΥΛΑ",
        lastName: "ΕΛΕΥΘΕΡΟΧΩΡΙΝΟΥ",
        comment: "",
        primaryTel: "226",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 12,
        firstName: "ΔΗΜΗΤΡΗΣ",
        lastName: "ΚΑΡΡΑΣ",
        comment: "ΠΡΟΪΣΤΑΜΕΝΟΣ",
        primaryTel: "274",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 12,
        firstName: "ΠΟΠΗ",
        lastName: "ΛΑΚΑΣΑ",
        comment: "",
        primaryTel: "225",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 12,
        firstName: "ΘΑΝΑΣΗΣ",
        lastName: "ΣΤΕΡΓΙΟΥΛΑΣ",
        comment: "",
        primaryTel: "223",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 12,
        firstName: "ΧΡΗΣΤΟΣ",
        lastName: "ΚΟΥΝΑΤΙΔΗΣ",
        comment: "",
        primaryTel: "253",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 13,
        firstName: "ΑΝΤΩΝΗΣ",
        lastName: "ΚΟΜΠΑΤΣΙΑΡΗΣ",
        comment: "",
        primaryTel: "111",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 13,
        firstName: "ΚΩΣΤΑΣ",
        lastName: "ΙΩΑΝΝΙΔΗΣ",
        comment: "ΗΛΕΚΤΡΟΛΟΓΟΣ/ΥΔΡΑΥΛΙΚΟΣ",
        primaryTel: "442",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 14,
        firstName: "ΚΩΣΤΑΣ",
        lastName: "ΔΡΑΜΑΛΗΣ",
        comment: "",
        primaryTel: "442",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 14,
        firstName: "ΙΣΑΑΚ",
        lastName: "ΠΑΥΛΙΔΗΣ",
        comment: "",
        primaryTel: "486",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 15,
        firstName: "ΖΕΤΑ",
        lastName: "ΘΩΜΑΗ",
        comment: "",
        primaryTel: "143",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 16,
        firstName: "ΠΟΛΥΚΑΡΠΟΣ",
        lastName: "ΠΑΠΑΔΟΠΟΥΛΟΣ",
        comment: "",
        primaryTel: "473",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 17,
        firstName: "ΣΟΦΙΑ",
        lastName: "ΧΑΤΖΗΦΩΤΗ",
        comment: "",
        primaryTel: "294",
        secondaryTel: "487",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 17,
        firstName: "ΙΣΙΔΩΡΑ",
        lastName: "ΓΙΑΤΣΙΔΟΥ",
        comment: "",
        primaryTel: "228",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 18,
        firstName: "ΓΙΩΡΓΟΣ",
        lastName: "ΛΑΜΠΡΙΑΝΙΔΗΣ",
        comment: "",
        primaryTel: "270",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 18,
        firstName: "ΝΙΚΟΣ",
        lastName: "ΑΡΒΑΝΙΤΙΔΗΣ",
        comment: "",
        primaryTel: "271",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 18,
        firstName: "ΑΝΤΩΝΗΣ",
        lastName: "ΜΑΝΤΟΥΛΙΔΗΣ",
        comment: "",
        primaryTel: "219",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 18,
        firstName: "ΕΛΕΝΑ",
        lastName: "ΒΑΛΕΝΤΙΝΑ",
        comment: "",
        primaryTel: "296",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 19,
        firstName: "ΘΕΟΔΩΡΟΣ",
        lastName: "ΜΠΑΜΙΧΑΣ",
        comment: "",
        primaryTel: "478",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 20,
        firstName: "ΣΙΜΟΣ",
        lastName: "ΣΤΥΛΙΑΝΙΔΗΣ",
        comment: "",
        primaryTel: "472",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 21,
        firstName: "ΓΙΑΝΝΗΣ",
        lastName: "ΑΡΑΜΠΑΤΖΗΣ",
        comment: "",
        primaryTel: "110",
        secondaryTel: "410",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 21,
        firstName: "ΚΩΣΤΑΣ",
        lastName: "ΓΡΗΓΟΡΙΑΔΗΣ",
        comment: "",
        primaryTel: "448",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 21,
        firstName: "ΜΑΡΙΑ",
        lastName: "ΝΑΝΑΚΟΥ",
        comment: "",
        primaryTel: "276",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 22,
        firstName: "ΧΑΡΗΣ",
        lastName: "ΒΑΒΥΛΑΣ",
        comment: "",
        primaryTel: "475",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 22,
        firstName: "ΚΟΙΝΟ",
        lastName: "ΤΗΛΕΦΩΝΟ",
        comment: "",
        primaryTel: "175",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 22,
        firstName: "ΗΛΙΑΣ",
        lastName: "ΜΟΥΧΤΑΡΟΠΟΥΛΟΣ",
        comment: "",
        primaryTel: "492",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 22,
        firstName: "ΓΙΩΡΓΟΣ",
        lastName: "ΤΟΠΤΣΗΣ",
        comment: "",
        primaryTel: "494",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 23,
        firstName: "ΓΙΩΡΓΟΣ",
        lastName: "ΜΠΑΜΠΑΝΗΣ",
        comment: "",
        primaryTel: "493",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 23,
        firstName: "ΑΝΤΩΝΗΣ",
        lastName: "ΛΑΚΑΣΑΣ",
        comment: "",
        primaryTel: "491",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 24,
        firstName: "ΔΗΜΗΤΡΗΣ",
        lastName: "ΤΣΑΛΑΜΠΑΝΑΣ",
        comment: "",
        primaryTel: "120",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 24,
        firstName: "ΓΙΑΝΝΗΣ",
        lastName: "ΚΑΡΙΨΙΑΔΗΣ",
        comment: "ΣΥΣΚΕΥΑΣΙΑ",
        primaryTel: "281",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 24,
        firstName: "ΗΛΙΑΣ",
        lastName: "ΜΠΑΚΑΛΙΔΗΣ",
        comment: "",
        primaryTel: "445",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 25,
        firstName: "ΗΛΙΑΣ",
        lastName: "ΛΟΤΖΑΝΙΩΤΗΣ",
        comment: "",
        primaryTel: "497",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 25,
        firstName: "ΤΑΣΟΣ",
        lastName: "ΓΙΟΥΒΑΝΙΔΗΣ",
        comment: "",
        primaryTel: "427",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 25,
        firstName: "ΚΩΝΣΤΑΝΤΙΝΟΣ",
        lastName: "ΔΕΛΗΓΙΑΝΝΗΣ",
        comment: "",
        primaryTel: "433",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 25,
        firstName: "ΒΑΓΓΕΛΗΣ",
        lastName: "ΘΕΟΧΑΡΟΠΟΥΛΟΣ",
        comment: "",
        primaryTel: "434",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 25,
        firstName: "ΜΑΚΗΣ",
        lastName: "ΣΑΛΙΑΡΑΣ",
        comment: "",
        primaryTel: "151",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 25,
        firstName: "ΕΥΓΕΝΙΑ",
        lastName: "ΣΑΛΑΜΑΝΙΩΤΗ",
        comment: "",
        primaryTel: "495",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 25,
        firstName: "ΚΑΛΥΨΩ",
        lastName: "ΤΣΙΝΙΚΟΥ",
        comment: "",
        primaryTel: "252",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 26,
        firstName: "ΑΘΑΝΑΣΙΟΣ",
        lastName: "ΛΑΚΑΣΑΣ",
        comment: "",
        primaryTel: "482",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 27,
        firstName: "ΠΑΝΑΓΙΩΤΑ",
        lastName: "ΠΑΝΑΓΙΩΤΟΠΟΥΛΟΥ",
        comment: "",
        primaryTel: "498",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΑΝΘΗ",
        lastName: "ΒΑΡΣΑΜΟΠΟΥΛΟΥ",
        comment: "",
        primaryTel: "286",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΓΙΩΡΓΟΣ",
        lastName: "ΒΟΥΛΤΣΙΔΗΣ",
        comment: "ΤΜΗΜΑ CBS",
        primaryTel: "263",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΠΑΝΑΓΙΩΤΗΣ",
        lastName: "ΓΚΟΡΙΔΗΣ",
        comment: "LASER",
        primaryTel: "444",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΑΙΜΙΛΙΟΣ",
        lastName: "ΜΟΥΧΤΑΡΟΠΟΥΛΟΣ",
        comment: "LASER",
        primaryTel: "444",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΣΑΚΗΣ",
        lastName: "ΔΟΥΝΑΒΗΣ",
        comment: "",
        primaryTel: "260",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΔΗΜΟΣ",
        lastName: "ΔΩΡΟΚΙΔΗΣ",
        comment: "ΤΜΗΜΑ SMD",
        primaryTel: "268",
        secondaryTel: "480",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΒΑΣΩ",
        lastName: "ΙΩΣΙΦΙΔΟΥ",
        comment: "",
        primaryTel: "244",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΓΙΩΡΓΟΣ",
        lastName: "ΚΕΜΕΡΙΔΗΣ",
        comment: "SMD ΠΙΛΟΤΙΚΗΣ ΠΑΡΑΓΩΓΗΣ",
        primaryTel: "264",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΕΛΠΙΔΑ",
        lastName: "ΚΟΜΠΑΤΣΙΑΡΗ",
        comment: "",
        primaryTel: "235",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΚΟΙΝΟ",
        lastName: "ΤΗΛΕΦΩΝΟ",
        comment: "1ος ΟΡΟΦΟΣ",
        primaryTel: "250",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΚΛΕΑΡΧΟΣ",
        lastName: "ΛΑΚΑΣΑΣ",
        comment: "",
        primaryTel: "262",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΚΩΣΤΑΣ",
        lastName: "ΛΑΚΑΣΑΣ",
        comment: "",
        primaryTel: "436",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΔΗΜΗΤΡΗΣ",
        lastName: "ΛΑΝΤΖΑΣ",
        comment: "",
        primaryTel: "289",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΔΗΜΗΤΡΗΣ",
        lastName: "ΘΕΟΧΑΡΟΠΟΥΛΟΣ",
        comment: "ΑΛΟΥΜΙΝΙΑ",
        primaryTel: "266",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΘΩΜΑΣ",
        lastName: "ΜΟΥΧΤΑΡΟΠΟΥΛΟΣ",
        comment: "",
        primaryTel: "254",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΣΩΤΗΡΗΣ",
        lastName: "ΜΠΟΥΡΑΣ",
        comment: "",
        primaryTel: "476",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΓΙΩΡΓΟΣ",
        lastName: "ΠΑΠΑΪΩΑΝΝΟΥ",
        comment: "",
        primaryTel: "438",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΔΗΜΗΤΡΗΣ",
        lastName: "ΠΑΠΑΪΩΑΝΝΟΥ",
        comment: "",
        primaryTel: "449",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΣΥΣΤΗΜΑΤΑ",
        lastName: "",
        comment: "",
        primaryTel: "261",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΚΩΣΤΑΣ",
        lastName: "ΣΙΔΗΡΟΠΟΥΛΟΣ",
        comment: "",
        primaryTel: "265",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΚΩΣΤΑΣ",
        lastName: "ΣΤΕΦΑΝΗΣ",
        comment: "",
        primaryTel: "499",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΜΙΧΑΛΗΣ",
        lastName: "ΤΖΑΝΙΔΑΚΗΣ",
        comment: "ADDRESS",
        primaryTel: "255",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΓΙΑΝΝΗΣ",
        lastName: "ΤΖΙΟΚΑΣ",
        comment: "ΤΜΗΜΑ ΠΛΑΣΤΙΚΩΝ",
        primaryTel: "169",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΣΑΚΗΣ",
        lastName: "ΤΟΛΙΟΣ",
        comment: "ΜΠΑΝΙΟ SMD",
        primaryTel: "446",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΤΟΥΝΕΛ",
        lastName: "",
        comment: "",
        primaryTel: "437",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΑΝΔΡΕΑΣ",
        lastName: "ΧΑΛΚΙΑΣ",
        comment: "ΤΥΠΟΠΟΙΗΤΗΡΙΟ",
        primaryTel: "415",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 28,
        firstName: "ΜΑΝΩΛΗΣ",
        lastName: "ΨΑΡΡΑΣ",
        comment: "",
        primaryTel: "293",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 29,
        firstName: "ΕΥΡΙΠΙΔΗΣ",
        lastName: "ΘΕΟΔΟΣΙΟΥ",
        comment: "",
        primaryTel: "496",
        secondaryTel: "288",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 30,
        firstName: "ΔΗΜΗΤΡΑ",
        lastName: "ΚΑΡΑΓΙΑΝΝΗ",
        comment: "",
        primaryTel: "485",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 30,
        firstName: "ΓΙΩΡΓΟΣ - ΜΠΕΧΑΡ",
        lastName: "ΝΤΟΞΑΝΙ",
        comment: "",
        primaryTel: "285",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 31,
        firstName: "ΝΙΚΟΣ",
        lastName: "ΑΓΓΕΛΟΠΟΥΛΟΣ",
        comment: "",
        primaryTel: "605",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 31,
        firstName: "ΑΣΤΕΡΗΣ",
        lastName: "ΑΣΤΕΡΙΟΥ",
        comment: "",
        primaryTel: "606",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 31,
        firstName: "ΑΘΑΝΑΣΙΟΣ",
        lastName: "ΑΣΤΕΡΙΟΥ",
        comment: "",
        primaryTel: "608",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 31,
        firstName: "ΑΛΕΞΑΝΔΡΑ",
        lastName: "ΜΑΝΤΖΟΥΤΣΟΥ",
        comment: "",
        primaryTel: "600",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        divisionId: 31,
        firstName: "ΤΑΣΟΣ",
        lastName: "ΔΗΜΑΚΟΠΟΥΛΟΣ",
        comment: "",
        primaryTel: "607",
        secondaryTel: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Bulk insert into Contacts table
    return queryInterface.bulkInsert("Contacts", contactsSeedData, {});
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete("Contacts", null, {});
  },
};
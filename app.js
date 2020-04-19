// Дэлгэцтэй ажиллах контроллэр
var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// Санхүүтэй ажиллах контроллэр
var financeController = (function () {
  // private function
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // private function
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // ptivate data
  var data = {
    Items: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: "100",
      exp: "1500",
    },
  };

  return {
    addItem: function (type, desc, val) {
      // console.log("item added..." + type + desc + val);
      var item, id;
      if (data.Items[type].length === 0) id = 1;
      else {
        id = data.Items[type][data.Items[type].length - 1].id + 1;
      }
      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        // type exp
        item = new Expense(id, desc, val);
      }
      data.Items[type].push(item);
    },
    seeData: function () {
      return data;
    },
  };
})();

// Програмын холбогч контроллэр
var appController = (function (uiCtrl, fnCtrl) {
  var CtrlAddItem = function () {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    var input = uiController.getInput();
    console.log(input);
    // 2. Олж авсан өгөгдлүүдээ санхүүгын контроллэрт дамжуулж тэнд хадгална.
    financeController.addItem(input.type, input.description, input.value);
    // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
    // 4. Төсвийг тооцоолно.
    // Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
  };
  var setupEventListener = function () {
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      CtrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        CtrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("Application started... ");
      setupEventListener();
    },
  };
})(uiController, financeController);

appController.init();

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
    addListItem: function (item, type) {
      // орлого зарлагын элемэнтийг үзүүлсэн html-ийг бэлтгэнэ.
      var html;
      var list;
      if (type === "inc") {
        list = ".income__list";
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">%%VALUE%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = ".expenses__list";
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">%%VALUE%%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // Тэр html дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө.
      html = html.replace("%id%", item.id);
      html = html.replace("%%DESCRIPTION%%", item.description);
      html = html.replace("%%VALUE%%", item.value);
      // Бэлтгэсэн html - ээ DOM- руу хийж өгнө.
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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
      return item;
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
    var item = financeController.addItem(
      input.type,
      input.description,
      input.value
    );
    // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
    uiController.addListItem(item, input.type);
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

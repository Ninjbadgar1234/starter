// Дэлгэцтэй ажиллах контроллэр
var uiController = (function () {})();

// Санхүүтэй ажиллах контроллэр
var financeController = (function () {})();

// Програмын холбогч контроллэр
var appController = (function (uiCtrl, fnCtrl) {
  var CtrlAddItem = function () {
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    console.log("Дэлгэцнээс өгөгдлөө авах хэсэг.");
    // 2. Олж авсан өгөгдлүүдээ санхүүгын контроллэрт дамжуулж тэнд хадгална.
    // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
    // 4. Төсвийг тооцоолно.
    // Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
  };
  document.querySelector(".add__btn").addEventListener("click", function () {
    CtrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      CtrlAddItem();
    }
  });
})(uiController, financeController);

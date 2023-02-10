"use strict";

/* Check if stored forecast is for the same city&country and if it's not older than 10 minutes */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkCookie = checkCookie;
var _widget_from_cookie = require("./widget_from_cookie.js");
var _widget_visible = require("./widget_visible.js");
var _dom_variables = _interopRequireDefault(require("./dom_variables.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var variables = (0, _dom_variables["default"])();
function checkCookie(city, country, now) {
  /* Check if forecast is stored in cookies */
  var cookie = document.cookie.split("; ").find(function (item) {
    return item.startsWith("forecast=");
  });
  if (cookie) {
    var cookieData = JSON.parse(cookie.split("=")[1]);
    var cookieSavedTime = new Date(cookieData.time);

    /* Add 10 minutes to the time of cookie storage for displaying in the widget */
    var cookieSavedTimeUntil = new Date(cookieData.time);
    cookieSavedTimeUntil.setMinutes(cookieSavedTimeUntil.getMinutes() + 10);

    /* Check if stored forecast is for the same city&country and if it's not older than 10 minutes */
    if (cookieData.city === city && cookieData.country === country && now - cookieSavedTime < 600000) {
      console.log("Saved cookie :");
      console.table(cookieData);

      /* Fill the widget with data from cookies */
      (0, _widget_from_cookie.fillWidgetWithCookie)(cookieData, cookieSavedTime, cookieSavedTimeUntil);

      /* Make forecast visible and close preloader */
      (0, _widget_visible.showWidget)();
      variables.modal.close();
      return true;
    }
    return false;
  }
}
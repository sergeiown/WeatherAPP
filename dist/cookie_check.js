"use strict";

/* Check if stored forecast is for the same city&country and if it's not older than 10 minutes */
import { fillWidgetWithCookie } from "./widget_from_cookie.js";
import { showWidget } from "./widget_visible.js";
import { getDomVariables } from "./dom_variables.js";
var variables = getDomVariables();
export function checkCookie(city, country, now) {
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
      fillWidgetWithCookie(cookieData, cookieSavedTime, cookieSavedTimeUntil);

      /* Make forecast visible and close preloader */
      showWidget();
      variables.modal.close();
      return true;
    }
    return false;
  }
}
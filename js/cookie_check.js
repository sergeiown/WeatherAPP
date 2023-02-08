/* Check if stored forecast is for the same city&country and if it's not older than 10 minutes */

import { fillWidgetWithCookie } from "./widget_from_cookie.js";
import getDomVariables from "./dom_variables.js";

const variables = getDomVariables();

export function checkCookie(city, country, now) {
  /* Check if forecast is stored in cookies */
  const cookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith("forecast="));

  if (cookie) {
    const cookieData = JSON.parse(cookie.split("=")[1]);
    const cookieSavedTime = new Date(cookieData.time);

    /* Check if stored forecast is for the same city and if it's not older than 10 minutes */
    if (cookieData.city === city && now - cookieSavedTime < 600000) {
      console.log(cookie);

      /* Fill the widget with data from cookies */
      fillWidgetWithCookie(cookieData, cookieSavedTime);

      variables.modal.close();

      return true;
    }
    return false;
  }
}

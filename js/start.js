/* Check if the Safari browser is in use and the version of iOS. Use the navigator.userAgent. */

function isOldIOS() {
  let ua = navigator.userAgent;

  /* matches "safari" but not "chrome" or "android" */
  let isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  /* matches iOS versions 1.0 through 9.9 */
  let isOldIOS = /OS [1-9]_[0-9](.*) like Mac/i.test(ua);
  /* matches iOS versions 10.0 through 10.3 */
  let isIOS10 = /OS 10_[0-3](.*) like Mac/i.test(ua);

  return isSafari && (isOldIOS || isIOS10);
}

console.clear();

if (!isOldIOS()) {
  var script = document.createElement("script");
  script.src = "./js/app.js";
  script.type = "module";
  document.head.appendChild(script);
  console.log("This is a modern browser");
  console.log(navigator.userAgent);
} else {
  var script = document.createElement("script");
  script.src = "./dist/app.js";
  script.type = "module";
  document.head.appendChild(script);
  console.log("This is an outdated browser");
  console.log(navigator.userAgent);
}

/* Check if the Safari browser is in use and the version of that browser. Use the navigator.userAgent property which contains a string with information about the browser. */

function isOldSafari() {
  var ua = navigator.userAgent;
  var isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  var isOldIOS = /OS [1-6](.*) like Mac/i.test(ua);
  return isSafari && isOldIOS;
}
console.clear();
if (isOldSafari()) {
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
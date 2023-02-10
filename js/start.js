/* Check if the Safari browser is in use and the version of that browser. Use the navigator.userAgent property which contains a string with information about the browser. */

function isOldBrowser() {
  var ua = navigator.userAgent;
  var isSafari = /^((?!chrome|android).)*safari/i.test(ua);

  console.log(isSafari);
  if (isSafari) {
    var version = /Version\/([0-9]+)\..+/.exec(ua);

    console.log(version);
    if (version && parseInt(version[1]) < 7) {
      return true;
    }
  }
  return false;
}

console.clear();

if (!isOldBrowser()) {
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

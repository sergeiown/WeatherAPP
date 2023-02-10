"use strict";

/* make the button visible enough for the user */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cycleButtonColors = cycleButtonColors;
var _dom_variables = _interopRequireDefault(require("./dom_variables.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var variables = (0, _dom_variables.default)();
function cycleButtonColors() {
  var buttonColors = ["#1D3F72", "#5699D2", "#D8EBF9", "#71C2CC", "#4996A2", "#785471", "#E8CDC5", "#EEE7D8"];
  var colorIndex = 0;
  setInterval(function () {
    variables.button.style.color = buttonColors[colorIndex % buttonColors.length];
    colorIndex++;
  }, 1000);
}
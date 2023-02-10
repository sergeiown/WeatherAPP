"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.limitCountries = limitCountries;
exports.synchronizeСountry = synchronizeСountry;
var _dom_variables = _interopRequireDefault(require("./dom_variables.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var variables = (0, _dom_variables.default)();

/* check which countries are suitable for the selected city */
function synchronizeСountry(cities) {
  var matchingCountries = [];
  var currentCityName = variables.cityName.value.toLowerCase();
  var _iterator = _createForOfIteratorHelper(cities),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var city = _step.value;
      if (city.name.toLowerCase() === currentCityName) {
        variables.countrySelect.value = city.country;
        matchingCountries.push(city.country);
      }
    }
    // console.log(matchingCountries);
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return matchingCountries;
}

/* Reduce the list of countries added to the option */
function limitCountries(matchingCountries) {
  var countryOptions = variables.countrySelect.options;
  for (var i = 0; i < countryOptions.length; i++) {
    if (!matchingCountries.includes(countryOptions[i].value)) {
      variables.countrySelect.remove(i);
      i--;
    }
  }
}
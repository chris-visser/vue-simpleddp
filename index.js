"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _simpleddp = _interopRequireDefault(require("simpleddp"));

var _isomorphicWs = _interopRequireDefault(require("isomorphic-ws"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  install(Vue, options) {
    console.log(options);
    const api = new _simpleddp.default(_objectSpread({
      endpoint: 'ws://localhost:3030/websocket',
      SocketConstructor: _isomorphicWs.default,
      reconnectInterval: 5000
    }, options));
    Vue.prototype.api = api;

    _asyncToGenerator(function* () {
      yield api.connect();
      console.log('Connected to server');
    })();

    Vue.prototype.$subscribe =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(function* (publicationName, ...args) {
        return api.sub(publicationName, ...args).ready();
      });

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }();

    Vue.prototype.find = function (collectionName) {
      const collection = api.collection(collectionName);
      return collection.fetch();
    };
  }

};
exports.default = _default;

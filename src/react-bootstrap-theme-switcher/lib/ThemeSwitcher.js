'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeSwitcher = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lazyloader = require('./lazyloader');

var _lazyloader2 = _interopRequireDefault(_lazyloader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function setItem(key, obj) {
  if (!key) return null;
  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (err) {
    return null;
  }
}

function getItem(key) {
  if (!key) return null;
  try {
    var item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (err) {
    return null;
  }
}

// check if boootstrap and jquery javascript files are loaded
function isJsLoaded() {
  var head = document.getElementsByTagName('head')[0];
  var nodes = head.childNodes;
  var loaded = false;
  for (var ix = 0; ix < nodes.length; ix++) {
    var node = nodes.item(ix);
    if (node.href && node.href.indexOf('jquery.min.js') > -1) {
      loaded = true;
    }
  }
  return loaded;
}

// remove any bootstrap links
function removeCurrentTheme() {
  var head = document.getElementsByTagName('head')[0];
  var nodes = head.childNodes;
  var list = [];
  for (var ix = 0; ix < nodes.length; ix++) {
    var node = nodes.item(ix);
    if (node.href && node.href.indexOf('bootstrap') > -1) {
      list.push(node);
    }
  }
  list.forEach(function (node) {
    head.removeChild(node);
  });
}

//------------------------------------------------------------------------------
// Top level ThemeSwitcher Component
//------------------------------------------------------------------------------

var ThemeSwitcher = function (_React$Component) {
  _inherits(ThemeSwitcher, _React$Component);

  function ThemeSwitcher(props) {
    _classCallCheck(this, ThemeSwitcher);

    var _this = _possibleConstructorReturn(this, (ThemeSwitcher.__proto__ || Object.getPrototypeOf(ThemeSwitcher)).call(this, props));

    _this.load = _this.load.bind(_this);
    _this.loadDefault = _this.loadDefault.bind(_this);

    _this.themePath = props.themePath || '/themes/';
    if (_this.themePath.charAt(_this.themePath.length - 1) !== '/') {
      _this.themePath = _this.themePath + '/';
    }
    _this.state = { loaded: false, currentTheme: null };
    return _this;
  }

  _createClass(ThemeSwitcher, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // load bootstrap javascript just at first mount
      if (!isJsLoaded()) {
        _lazyloader2.default.load(this.themePath + 'js/jquery.min.js', function () {
          _lazyloader2.default.load(this.themePath + 'js/bootstrap.min.js', function () {
            this.load(); // load default theme
          }.bind(this));
        }.bind(this));
      }
    }
  }, {
    key: 'loadDefault',
    value: function loadDefault() {
      _lazyloader2.default.load(this.themePath + 'default/bootstrap.min.css', function () {
        _lazyloader2.default.load(this.themePath + 'default/bootstrap-theme.min.css', function () {
          this.setState({ loaded: true, currentTheme: 'default' });
        }.bind(this));
      }.bind(this));
    }
  }, {
    key: 'load',
    value: function load(theme) {
      this.setState({ loaded: false });
      removeCurrentTheme();

      var name = theme;
      if (!name) {
        // see if a theme was previously stored, will return null if storedThemeKey not set
        name = getItem(this.props.storeThemeKey);
      }
      if (!name) {
        name = this.props.defaultTheme;
      }
      if (name === 'default') {
        return this.loadDefault();
      }

      _lazyloader2.default.load(this.themePath + name + '/bootstrap.min.css', function () {
        setItem(this.props.storeThemeKey, name);
        this.setState({ loaded: true, currentTheme: name });
      }.bind(this));
    }

    // pass reference to this down to ThemeChooser component

  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        themeSwitcher: this,
        themes: this.props.themes,
        currentTheme: this.state.currentTheme
      };
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.state.loaded) return null;
      return this.props.children || _react2.default.createElement('span', null);
    }
  }]);

  return ThemeSwitcher;
}(_react2.default.Component);

ThemeSwitcher.childContextTypes = {
  themeSwitcher: _propTypes2.default.object,
  themes: _propTypes2.default.array,
  currentTheme: _propTypes2.default.string
};

ThemeSwitcher.propTypes = {
  themePath: _propTypes2.default.string,
  defaultTheme: _propTypes2.default.string,
  storeThemeKey: _propTypes2.default.string,
  themes: _propTypes2.default.array
};

ThemeSwitcher.defaultProps = {
  themePath: '/themes',
  defaultTheme: 'default',
  storeThemeKey: null,
  themes: ['default', 'yeti', 'superhero', 'paper', 'lumen', 'darkly', 'simplex', 'cerulean', 'sandstone', 'cosmo', 'cyborg', 'slate', 'flatly', 'journal', 'readable', 'spacelab', 'united']
};

exports.ThemeSwitcher = ThemeSwitcher;
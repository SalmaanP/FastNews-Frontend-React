'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeChooser = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.substring(1);
}

var ThemeChooser = function (_React$Component) {
  _inherits(ThemeChooser, _React$Component);

  function ThemeChooser(props, context) {
    _classCallCheck(this, ThemeChooser);

    var _this = _possibleConstructorReturn(this, (ThemeChooser.__proto__ || Object.getPrototypeOf(ThemeChooser)).call(this, props));

    _this.onSelect = _this.onSelect.bind(_this);
    _this.doCallback = _this.doCallback.bind(_this);

    // get themes from context and sort them for display
    _this.themes = [];
    context.themes.forEach(function (theme) {
      _this.themes.push(theme);
    });
    _this.themes.sort();
    return _this;
  }

  _createClass(ThemeChooser, [{
    key: 'doCallback',
    value: function doCallback() {}
  }, {
    key: 'onSelect',
    value: function onSelect(e) {
      e.preventDefault();
      var chosenTheme = e.target.getAttribute('data-theme');
      this.context.themeSwitcher.load(chosenTheme);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var style = this.props.style || {};
      var menu = _react2.default.createElement(
        'li',
        { className: 'nav-item dropdown', style: style },
        _react2.default.createElement(
          'a',
          { className: 'nav-link dropdown-toggle', id: 'theme-menu',
            'data-toggle': 'dropdown', 'aria-haspopup': 'true', 'aria-expanded': 'true' },
          'Theme \xA0'
          //   ,
          // _react2.default.createElement('span', { className: 'caret' })
        ),
        _react2.default.createElement(
          'ul',
          { className: 'dropdown-menu' },

            _react2.default.createElement(
                'li',
                { key: 'readable', className: 'readable' === _this2.context.currentTheme ? 'active' : '' },
                _react2.default.createElement(
                    'a',
                    { href: '#', 'data-theme': 'readable', onClick: _this2.onSelect },
                    capitalize('light')
                )
            ),
            _react2.default.createElement(
                'li',
                { key: 'darkly', className: 'darkly' === _this2.context.currentTheme ? 'active' : '' },
                _react2.default.createElement(
                    'a',
                    { href: '#', 'data-theme': 'darkly', onClick: _this2.onSelect },
                    capitalize('dark')
                )
            )



                // this.themes.map(function (theme) {
          //   var active = theme === _this2.context.currentTheme ? 'active' : '';
          //   return _react2.default.createElement(
          //     'li',
          //     { key: theme, className: active },
          //     _react2.default.createElement(
          //       'a',
          //       { href: '#', 'data-theme': theme, onClick: _this2.onSelect },
          //       capitalize(theme)
          //     )
          //   );
          // })
        )
      );

      return menu;
    }
  }]);

  return ThemeChooser;
}(_react2.default.Component);

ThemeChooser.contextTypes = {
  themeSwitcher: _propTypes2.default.object,
  themes: _propTypes2.default.array,
  currentTheme: _propTypes2.default.string
};

exports.ThemeChooser = ThemeChooser;
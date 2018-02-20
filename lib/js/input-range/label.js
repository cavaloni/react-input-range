'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Label;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @ignore
 * @param {Object} props
 * @param {InputRangeClassNames} props.classNames
 * @param {Function} props.formatLabel
 * @param {string} props.type
 */
function Label(props) {
  var labelValue = props.formatLabel ? props.formatLabel(props.children, props.type) : props.children;

  var labelStyle = void 0;
  if (props.styles) labelStyle = props.styles.label;

  return _react2.default.createElement(
    'span',
    { className: props.classNames[props.type + 'Label'], style: labelStyle },
    _react2.default.createElement(
      'span',
      { className: props.classNames.labelContainer },
      labelValue
    )
  );
}

/**
 * @type {Object}
 * @property {Function} children
 * @property {Function} classNames
 * @property {Function} formatLabel
 * @property {Function} type
 */
Label.propTypes = {
  children: _propTypes2.default.node.isRequired,
  classNames: _propTypes2.default.objectOf(_propTypes2.default.string).isRequired,
  formatLabel: _propTypes2.default.func,
  styles: _propTypes2.default.shape({
    label: _propTypes2.default.string
  }).isRequired,
  type: _propTypes2.default.string.isRequired
};
module.exports = exports['default'];
//# sourceMappingURL=label.js.map
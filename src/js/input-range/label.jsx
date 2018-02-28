import React from 'react';
import PropTypes from 'prop-types';

/**
 * @ignore
 * @param {Object} props
 * @param {InputRangeClassNames} props.classNames
 * @param {Function} props.formatLabel
 * @param {string} props.type
 */
export default function Label(props) {
  const labelValue = props.formatLabel ? props.formatLabel(props.children, props.type) : props.children;

  let labelStyle;
  if (props.styles) labelStyle = props.styles.label;

  return (
    <span className={props.classNames[`${props.type}Label`]} style={labelStyle} >
      <span className={props.classNames.labelContainer}>
        {labelValue}
      </span>
    </span>
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
  children: PropTypes.node.isRequired,
  classNames: PropTypes.objectOf(PropTypes.string).isRequired,
  formatLabel: PropTypes.func,
  styles: PropTypes.shape({
    label: PropTypes.string,
  }),
  type: PropTypes.string.isRequired,
};

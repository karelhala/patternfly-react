import React from 'react';
import styles from '@patternfly/patternfly-next/layouts/Alignment/styles.css';
import PropTypes from 'prop-types';
import { css, getModifier } from '@patternfly/react-styles';

export const AlignmentVariant = {
  left: 'left',
  center: 'center',
  right: 'right'
};

const propTypes = {
  variant: PropTypes.oneOf(Object.keys(AlignmentVariant)),
  children: PropTypes.node,
  className: PropTypes.string
};

const defaultProps = {
  variant: 'left',
  children: null,
  className: null
};

const Alignment = ({ variant, children, className, ...props }) => (
  <div
    {...props}
    className={css(styles.alignment, getModifier(styles, variant), className)}
  >
    {children}
  </div>
);

Alignment.propTypes = propTypes;
Alignment.defaultProps = defaultProps;

export default Alignment;

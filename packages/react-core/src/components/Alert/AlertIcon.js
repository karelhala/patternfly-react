import React from 'react';
import { css } from '@patternfly/react-styles';
import PropTypes from 'prop-types';
import styles from '@patternfly/patternfly-next/components/Alert/styles.css';

import {
  CheckCircle,
  ExclamationCircle,
  ExclamationTriangle,
  InfoCircle
} from '@patternfly/react-icons';

export const variantIcons = {
  success: CheckCircle,
  danger: ExclamationCircle,
  warning: ExclamationTriangle,
  info: InfoCircle
};

const propTypes = {
  variant: PropTypes.oneOf(Object.keys(variantIcons)).isRequired,
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

const AlertIcon = ({ variant, className, ...props }) => {
  const Icon = variantIcons[variant];
  return (
    <div {...props} className={css(styles.alertIcon, className)}>
      <Icon size="md" />
    </div>
  );
};

AlertIcon.propTypes = propTypes;
AlertIcon.defaultProps = defaultProps;

export default AlertIcon;

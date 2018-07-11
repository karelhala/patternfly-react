import React from 'react';
import styles from '@patternfly/patternfly-next/layouts/Page/styles.css';
import { css } from '@patternfly/react-styles';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

const defaultProps = {
  children: null,
  className: ''
};

const Sidebar = ({ className, children, ...props }) => (
  <div className={css(styles.pageSidebar, className)}>{children}</div>
);

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;

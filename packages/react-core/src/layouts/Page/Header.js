import React from 'react';
import styles from '@patternfly/patternfly-next/layouts/Page/styles.css';
import PropTypes from 'prop-types';
import { css } from '@patternfly/react-styles';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

const defaultProps = {
  children: null,
  className: ''
};

const Header = ({ children, className, ...props }) => (
  <header
    {...props}
    role="banner"
    className={css(styles.pageHeader, className)}
  >
    {children}
  </header>
);

export default Header;

export const HeaderSidebar = ({ children, className, ...props }) => (
  <header {...props} className={css(styles.pageHeaderSideBar, className)}>
    {children}
  </header>
);

export const HeaderMain = ({ children, className, ...props }) => (
  <header {...props} className={css(styles.pageHeaderSideBar, className)}>
    {children}
  </header>
);

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

HeaderSidebar.propTypes = propTypes;
HeaderSidebar.defaultProps = defaultProps;

HeaderMain.propTypes = propTypes;
HeaderMain.defaultProps = defaultProps;

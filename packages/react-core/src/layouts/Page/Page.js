import React from 'react';
import styles from '@patternfly/patternfly-next/layouts/Page/styles.css';
import PropTypes from 'prop-types';
import { css } from '@patternfly/react-styles';
import Sidebar from './Sidebar';
import Header from './Header';

const propTypes = {
  header: PropTypes.node,
  sidebar: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string
};

const defaultProps = {
  header: null,
  sidebar: null,
  children: null,
  className: ''
};

const Page = ({ header, sidebar, children, className, ...props }) => (
  <div {...props} className={css(styles.page, className)}>
    {header && <Header>{header}</Header>}
    {sidebar && <Sidebar>{sidebar}</Sidebar>}
    <main role="main" className={css(styles.main)}>
      {children}
    </main>
  </div>
);

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;

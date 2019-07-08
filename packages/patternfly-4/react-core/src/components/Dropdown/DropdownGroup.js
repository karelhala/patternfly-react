import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@patternfly/react-styles';
import { DropdownContext } from './dropdownConstants';

const propTypes = {
  /**  */
  hideGroup: PropTypes.bool,
  /** Checkboxes within group */
  children: PropTypes.node,
  /** Additional classes added to the DropdownGroup control */
  className: PropTypes.string,
  /** Group label */
  label: PropTypes.node,
  /** Additional props are spread to the container <div> */
  '': PropTypes.any // eslint-disable-line react/require-default-props
};

const defaultProps = {
  children: null,
  className: '',
  label: ''
};

const DropdownGroup = ({ children, className, hideGroup, label, ...props }) => (
  <DropdownContext.Consumer>
    {({
      sectionClass,
      sectionTitleClass,
      sectionComponent: SectionComponent,
      groupHeaderComponent: groupHeaderComponent
    }) => {
      const HeaderComponent = groupHeaderComponent || 'h1';
      return (
      <SectionComponent {...props} className={css(sectionClass, className)}>
        {label && (
          <HeaderComponent className={css(sectionTitleClass)} aria-hidden>
            {label}
          </HeaderComponent>
        )}
        {!hideGroup ? <ul role="none">{children}</ul> : children}
      </SectionComponent>
    )}}
  </DropdownContext.Consumer>
);

DropdownGroup.propTypes = propTypes;
DropdownGroup.defaultProps = defaultProps;

export default DropdownGroup;

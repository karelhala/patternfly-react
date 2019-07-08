import React from 'react';

export const DropdownPosition = {
  right: 'right',
  left: 'left'
};

export const DropdownDirection = {
  up: 'up',
  down: 'down'
};

export const DropdownContext = React.createContext({
  onSelect: () => {},
  id: '',
  toggleIconClass: '',
  toggleTextClass: '',
  textComponent: '',
  menuClass: '',
  itemClass: '',
  toggleClass: '',
  baseClass: '',
  baseComponent: 'div',
  groupHeaderComponent: 'h1',
  sectionClass: '',
  sectionTitleClass: '',
  sectionComponent: 'section',
  disabledClass: '',
  hoverClass: '',
  separatorClass: '',
  autoFocus: false,
  enuComponent: 'ul'
});

export const DropdownArrowContext = React.createContext({
  keyHandler: null,
  sendRef: null
});

import * as React from 'react';

export enum DropdownPosition {
  right = 'right',
  left = 'left'
}

export enum DropdownDirection {
  up = 'up',
  down = 'down'
}

export const DropdownContext: React.Context<{
  onSelect: (event: any) => void,
  id?: string,
  toggleIconClass?: string,
  toggleTextClass?: string,
  textComponent?: string,
  menuClass?: string,
  itemClass?: string,
  toggleClass?: string,
  baseClass?: string,
  baseComponent?: string,
  groupHeaderComponent?: string,
  sectionClass?: string,
  sectionTitleClass?: string,
  sectionComponent?: string,
  disabledClass?: string,
  hoverClass?: string,
  separatorClass?: string,
  autoFocus?: boolean,
  menuComponent?: string
}>

export const DropdownArrowContext: React.Context<{
  keyHandler: (index: number, position: any, custom: boolean) => void,
  sendRef: (index: number, node: any, isDisabled: boolean) => void
}>

import * as React from 'react';

export interface SelectContextInterface {
  selected: string | string[];
  activeChild: React.ReactElement
  variant?: SelectVariant
}

export interface RefObject {
  ref: React.RefObject<HTMLElement>
}

export const SelectContext = React.createContext<SelectContextInterface | null>(null);

export const SelectProvider = SelectContext.Provider;
export const SelectConsumer = SelectContext.Consumer;

export enum SelectVariant {
  multi = 'multi',
  single = 'single',
  checkbox = 'checkbox',
  typeahead = 'typeahead',
  typeaheadMulti = 'typeaheadmulti'
}

export const KeyTypes = {
  Tab: 'Tab',
  Space: ' ',
  Escape: 'Escape',
  Enter: 'Enter',
  ArrowUp: 'ArrowUp',
  ArrowDown: 'ArrowDown'
};

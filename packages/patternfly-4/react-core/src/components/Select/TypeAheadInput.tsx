import * as React from 'react';
import styles from '@patternfly/react-styles/css/components/Select/select';
import { css } from '@patternfly/react-styles';

export interface TypeAheadInputProps extends React.HTMLProps<HTMLInputElement> {
  /** Classes applied to the root of input typeahed. */
  className?: string;
  /** Aria active descendant attribute prop. */
  ariaActiveDescendant?: string;
  /** Textual placeholder of input. */
  placeholder?: string;
  /** Textual value of input. */
  inputValue?: string;
  /** Accessibility aria label. */
  ariaLabel?: string;
}

export const TypeAheadInput = ({
  className,
  ariaActiveDescendant,
  ariaLabel,
  placeholder,
  inputValue,
  ...props
}: TypeAheadInputProps) => (
  <input
    className={css(styles.formControl, styles.selectToggleTypeahead, className)}
    aria-activedescendant={ariaActiveDescendant}
    id="select-typeahead"
    aria-label={ariaLabel}
    placeholder={placeholder as string}
    value={inputValue !== null ? inputValue : ''}
    type="text"
    autoComplete="off"
    {...props}
  />
)

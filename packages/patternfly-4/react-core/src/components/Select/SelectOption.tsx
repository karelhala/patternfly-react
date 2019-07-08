import * as React from 'react';
import styles from '@patternfly/react-styles/css/components/Select/select';
import { default as checkStyles } from '@patternfly/react-styles/css/components/Check/check';
import { css } from '@patternfly/react-styles';
import { CheckIcon } from '@patternfly/react-icons';
import { SelectConsumer, SelectVariant } from './selectConstants';
import { Omit } from '../../helpers/typeUtils';
import { DropdownItem, DropdownItemProps } from '../Dropdown';

export interface SelectOptionProps extends Omit<React.HTMLProps<HTMLElement>, 'type' | 'ref'> {
  /** Additional classes added to the Select Option */
  className?: string;
  /** Internal index of the option */
  index?: number;
  /** The value for the option */
  value: string;
  /** Text shown as option title */
  text?: React.ReactElement | string | number;
  /** Flag indicating if the option is disabled */
  isDisabled?: boolean;
  /** Flag indicating if the option acts as a placeholder */
  isPlaceholder?: boolean;
  /** Optional callback for click event */
  onClick?: (event: React.MouseEvent | React.ChangeEvent) => void;
}

export const SelectOption: React.FunctionComponent<SelectOptionProps & DropdownItemProps> = React.forwardRef(({
  className = '',
  children,
  isPlaceholder = false,
  value = '',
  text,
  onClick,
  ...props
}: SelectOptionProps & DropdownItemProps, ref) => (
    <SelectConsumer>
      {({ selected, activeChild, variant }) => {
        const isSelected = selected && selected.includes((text as string) || value);
        const isFocused = activeChild && value === activeChild.props.value;
        return (
          <DropdownItem
            component={variant === SelectVariant.checkbox ? 'label': 'button'}
            ref={ref}
            onClick={(e) => {
              if ((e.target as HTMLElement).tagName !== 'INPUT') {
                e.preventDefault();
              }
            }}
            className={css(
              isSelected && styles.modifiers.selected,
              isFocused && styles.modifiers.focus,
              variant === SelectVariant.checkbox && checkStyles.check,
              className
            )}
            aria-selected={isSelected || null}
            {...props}
          >
            {
              variant !== SelectVariant.checkbox ?
              (text || value) :
              <input
                className={css(checkStyles.checkInput)}
                type="checkbox"
                checked={isSelected || false}
                onChange={(e) => e.stopPropagation()}
              />
            }
            {
              isSelected &&
              variant !== SelectVariant.checkbox &&
              <CheckIcon className={css(styles.selectMenuItemIcon)} aria-hidden />
            }
            {
              variant === SelectVariant.checkbox &&
              <span className={css(checkStyles.checkLabel)}>{text || value}</span>
            }
          </DropdownItem>
        )}
      }
    </SelectConsumer>
));

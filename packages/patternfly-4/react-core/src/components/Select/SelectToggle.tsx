import * as React from 'react';
import styles from '@patternfly/react-styles/css/components/Select/select';
import buttonStyles from '@patternfly/react-styles/css/components/Button/button';
import { css } from '@patternfly/react-styles';
import { TimesCircleIcon } from '@patternfly/react-icons';
import { DropdownToggle, DropdownToggleProps } from '../Dropdown';
import { KeyTypes, SelectVariant } from './selectConstants';

export interface SelectToggleProps extends React.HTMLProps<HTMLElement> {
  /** Flag to indicate if select is expanded */
  isExpanded?: boolean;
  /** Selected item */
  selections?: string[] | string;
  /** Label for clear selection button of type ahead select variants */
  ariaLabelClear?: string;
  /** Callback for typeahead clear button */
  onClear?: (event: React.MouseEvent) => void;
  /** Internal callback for toggle keyboard navigation */
  handleTypeaheadKeys?: (position: string) => void;
  onClose?: any;
  /** Type of the toggle button, defaults to 'button' */
  type?: 'reset' | 'button' | 'submit' | undefined;
  /** Id of label for the Select aria-labelledby */
  ariaLabelledBy?: string;
  /** Label for toggle of select variants */
  ariaLabelToggle?: string;
  /** Flag for variant, determines toggle rules and interaction */
  variant?: 'multi' | 'single' | 'checkbox' | 'typeahead' | 'typeaheadmulti';
}

export class SelectToggle extends React.Component<SelectToggleProps & DropdownToggleProps> {

  static defaultProps = {
    className: '',
    isExpanded: false,
    isFocused: false,
    isHovered: false,
    isActive: false,
    isPlain: false,
    variant: false,
    ariaLabelledBy: '',
    ariaLabelToggle: '',
    type: 'button',
    onToggle: Function.prototype,
    onClose: Function.prototype
  };

  render() {
    const {
      className,
      children,
      isExpanded,
      isFocused,
      isActive,
      isHovered,
      isPlain,
      variant,
      onToggle,
      onClose,
      handleTypeaheadKeys,
      parentRef,
      selections,
      onClear,
      ariaLabelClear,
      id,
      type,
      ariaLabelledBy,
      ariaLabelToggle,
      ...props
    } = this.props;
    const toggleProps: {
      id: string;
      'aria-labelledby': string;
      'aria-expanded': boolean;
      'aria-haspopup': 'listbox' | null;
    } = {
      id,
      'aria-labelledby': ariaLabelledBy,
      'aria-expanded': isExpanded,
      'aria-haspopup': (variant !== SelectVariant.checkbox && 'listbox') || null
    };

    const isTypeahead = variant === SelectVariant.typeahead || variant === SelectVariant.typeaheadMulti;
    return (
      <React.Fragment>
        {isTypeahead ? (
          <div
            className={css(styles.selectToggle, isTypeahead && styles.modifiers.typeahead)}
            onClick={() => {
              if (!isExpanded) {
                onToggle(true);
              }
            }}
          >
            <div className={css(styles.selectToggleWrapper)} style={{ zIndex: 2 }}>
              {children}
            </div>
            {selections && selections.length > 0 && (
              <button
                className={css(styles.button, styles.modifiers.plain, styles.selectToggleClear)}
                onClick={e => {
                  onToggle(false);
                  onClear(e);
                }}
                aria-label={ariaLabelClear}
              >
                <TimesCircleIcon aria-hidden />
              </button>
            )}
            <DropdownToggle
              isOpen={isExpanded}
              onToggle={onToggle}
              parentRef={parentRef}
              {...props}
            />
          </div>
        ) : (
          <DropdownToggle
            isOpen={isExpanded}
            onToggle={onToggle}
            parentRef={parentRef}
            {...props}
          >
            {children}
        </DropdownToggle>)}
      </React.Fragment>
    )
    // return (
      // <React.Fragment>
      //   {!isTypeahead && (
      //     <button
      //       {...props}
      //       {...toggleProps}
      //       ref={this.toggle as React.RefObject<HTMLButtonElement>}
      //       type={type}
      //       className={css(
      //         styles.selectToggle,
      //         isFocused && styles.modifiers.focus,
      //         isHovered && styles.modifiers.hover,
      //         isActive && styles.modifiers.active,
      //         isPlain && styles.modifiers.plain,
      //         className
      //       )}
      //       onClick={_event => {
      //         onToggle(!isExpanded);
      //         if (isExpanded) {
      //           onClose();
      //         }
      //       }}
      //       onKeyDown={this.onKeyDown}
      //     >
      //       {children}
      //       <CaretDownIcon className={css(styles.selectToggleArrow)} />
      //     </button>
      //   )}
      //   {isTypeahead && (
      //     <div
      //       {...props}
      //       ref={this.toggle as React.RefObject<HTMLDivElement>}
      //       className={css(
      //         styles.selectToggle,
      //         isFocused && styles.modifiers.focus,
      //         isHovered && styles.modifiers.hover,
      //         isActive && styles.modifiers.active,
      //         isPlain && styles.modifiers.plain,
      //         isTypeahead && styles.modifiers.typeahead,
      //         className
      //       )}
      //       onClick={_event => {
      //         onToggle(true);
      //       }}
      //       onKeyDown={this.onKeyDown}
      //     >
      //       {children}
      //       <button
      //         {...toggleProps}
      //         className={css(buttonStyles.button, styles.selectToggleButton)}
      //         aria-label={ariaLabelToggle}
      //         onClick={_event => {
      //           _event.stopPropagation();
      //           onToggle(!isExpanded);
      //           if (isExpanded) {
      //             onClose();
      //           }
      //         }}
      //       >
      //         <CaretDownIcon className={css(styles.selectToggleArrow)} />
      //       </button>
      //     </div>
      //   )}
      // </React.Fragment>
    // );
  }
}


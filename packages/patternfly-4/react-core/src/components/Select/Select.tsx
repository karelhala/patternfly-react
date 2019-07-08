import * as React from 'react';
import styles from '@patternfly/react-styles/css/components/Select/select';
import badgeStyles from '@patternfly/react-styles/css/components/Badge/badge';
import { css } from '@patternfly/react-styles';
import { SelectOption } from './SelectOption';
import { SelectToggle } from './SelectToggle';
import { SelectVariant, SelectProvider, KeyTypes, RefObject } from './selectConstants';
import { Chip, ChipGroup } from '../ChipGroup';
import {  getNextIndex } from '../../helpers/util';
import { Omit } from '../../helpers/typeUtils';
import { DropdownContext, DropdownItemProps } from '../Dropdown';
import { DropdownWithContext } from '../Dropdown/Dropdown';
import { TypeAheadInput } from './TypeAheadInput';

// seed for the aria-labelledby ID
let currentId = 0;

export interface SelectProps extends Omit<React.HTMLProps<HTMLDivElement>, 'onSelect' | 'ref' | 'checked' | 'selected'> {
  /** Content rendered inside the Select */
  children: React.ReactElement[];
  /** Classes applied to the root of the Select */
  className?: string;
  /** Flag to indicate if select is expanded */
  isExpanded?: boolean;
  /** Flag to indicate if select options are grouped */
  isGrouped?: boolean;
  /** Title text of Select */
  placeholderText?: string | React.ReactNode;
  /** Selected item */
  selections?: string[] | string;
  /** Id for select toggle element */
  toggleId?: string;
  /** Adds accessible text to Select */
  'aria-label'?: string;
  /** Id of label for the Select aria-labelledby */
  ariaLabelledBy?: string;
  /** Label for input field of type ahead select variants */
  ariaLabelTypeAhead?: string;
  /** Label for clear selection button of type ahead select variants */
  ariaLabelClear?: string;
  /** Label for toggle of type ahead select variants */
  ariaLabelToggle?: string;
  /** Label for remove chip button of multiple type ahead select variant */
  ariaLabelRemove?: string;
  /**  */
  onFilter?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Callback for selection behavior */
  onSelect?: (event: React.MouseEvent | React.ChangeEvent, value: string, isPlaceholder?: boolean) => void;
  /** Callback for toggle button behavior */
  onToggle: (isExpanded: boolean) => void;
  /** Callback for typeahead clear button */
  onClear?: (event: React.MouseEvent) => void;
  /** Flag to enable/disable root of select component */
  isDisabled?: boolean;
  /** Variant of rendered Select */
  variant?: SelectVariant;
  /** Width of the select container as a number of px or string percentage */
  width?: string | number;
}

export interface SelectState {
  openedOnEnter: boolean;
  typeaheadInputValue: string;
  typeaheadActiveChild?: React.ReactElement;
  typeaheadFilteredChildren: React.ReactNode[];
  typeaheadCurrIndex: number;
}

export class Select extends React.Component<SelectProps, SelectState> {
  private refCollection: DropdownItemProps & RefObject[] = [];

  static defaultProps = {
    children: [] as React.ReactElement[],
    className: '',
    toggleId: null as string,
    isExpanded: false,
    isGrouped: false,
    isDisabled: false,
    'aria-label': '',
    ariaLabelledBy: '',
    ariaLabelTypeAhead: '',
    ariaLabelClear: 'Clear all',
    ariaLabelToggle: 'Options menu',
    ariaLabelRemove: 'Remove',
    selections: '',
    placeholderText: '',
    variant: SelectVariant.single,
    width: '',
    onClear: Function.prototype
  };

  state = {
    openedOnEnter: false,
    typeaheadInputValue: '',
    typeaheadActiveChild: null as React.ReactElement,
    typeaheadFilteredChildren: React.Children.toArray(this.props.children),
    typeaheadCurrIndex: -1
  };

  onClose = () => {
    this.setState({
      openedOnEnter: false,
      typeaheadInputValue: null,
      typeaheadActiveChild: null,
      typeaheadFilteredChildren: React.Children.toArray(this.props.children),
      typeaheadCurrIndex: -1
    });
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input: RegExp;
    try {
      input = new RegExp(e.target.value, 'i');
    } catch (err) {
      input = new RegExp(e.target.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    }
    const typeaheadFilteredChildren =
      e.target.value !== ''
        ? React.Children.toArray(this.props.children).filter(
            (child: React.ReactNode) => (child as React.ReactElement).props.value.search(input) === 0 ||
              (child as React.ReactElement).props.text.search(input) === 0
          )
        : React.Children.toArray(this.props.children);
    if (typeaheadFilteredChildren.length === 0) {
      typeaheadFilteredChildren.push(<SelectOption isDisabled key={0} value="No results found" />);
    }
    this.setState({
      typeaheadInputValue: e.target.value,
      typeaheadCurrIndex: -1,
      typeaheadFilteredChildren,
      typeaheadActiveChild: null
    });
  };

  clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    this.setState({
      typeaheadInputValue: '',
      typeaheadActiveChild: null,
      typeaheadFilteredChildren: React.Children.toArray(this.props.children),
      typeaheadCurrIndex: -1
    });
  };

  enhanceChildren = (children: React.ReactElement[]) => {
    const { isGrouped } = this.props;
    return React.Children
    .toArray(children)
    .filter((child: React.ReactElement) => isGrouped ||
      (child.props.hasOwnProperty('value') && !child.props.isDisabled)
    )
    .map((child: React.ReactElement, key: number) => React.cloneElement(child, {
      ref: (ref: DropdownItemProps & RefObject) => {
        if (ref && child.props.hasOwnProperty('value') && !child.props.isDisabled) {
          this.refCollection[key] = ref;
        }
        return ref;
      }
    }));
  }

  handleTypeaheadKeys = (keyType: string) => {
    const { isExpanded, onSelect, onToggle } = this.props;
    const { typeaheadCurrIndex, typeaheadActiveChild, typeaheadFilteredChildren } = this.state;
    if (keyType === KeyTypes.Enter && typeaheadActiveChild) {
      onSelect(null, typeaheadActiveChild.props.value);

      const currentElement: HTMLElement = (this.refCollection[typeaheadCurrIndex] as DropdownItemProps & RefObject).ref.current;
      this.setState({
        typeaheadInputValue: currentElement.innerText || ''
      });
    } else if ((keyType === KeyTypes.ArrowDown || keyType === KeyTypes.ArrowUp)) {
      const filteredChildren = typeaheadFilteredChildren
        .filter((child: React.ReactNode) => (child as React.ReactElement).props.hasOwnProperty('value') &&
          !(child as React.ReactElement).props.isDisabled
        );

      const direction = keyType === KeyTypes.ArrowUp ? 'up' : 'down';

      const index = getNextIndex(
        direction === 'up' && typeaheadCurrIndex === -1 ? 0 : typeaheadCurrIndex,
        direction,
        filteredChildren
      );

      const currentElement: HTMLElement = (this.refCollection[index] as DropdownItemProps & RefObject).ref.current;

      this.setState({
        typeaheadInputValue: currentElement.innerText || '',
        typeaheadActiveChild: filteredChildren[index] as React.ReactElement,
        typeaheadCurrIndex: index
      });

      if (!isExpanded) {
        onToggle(true);
      }
    }
  };

  chipped = () => {
    const { variant, onSelect, ariaLabelRemove, selections } = this.props;
    const isChipped = (variant === SelectVariant.typeaheadMulti || variant === SelectVariant.multi) && (selections && selections.length !== 0);
    return isChipped && (
      <ChipGroup>
        {selections &&
          (selections as string[]).map(item => (
            <Chip key={item} onClick={e => onSelect(e, item)} closeBtnAriaLabel={ariaLabelRemove}>
              {item}
            </Chip>
          ))}
      </ChipGroup>
    );
  }

  badged = () => {
    const { variant, selections } = this.props;
    const hasBadge = variant === SelectVariant.checkbox && selections && selections.length > 0;
    return hasBadge && (
      <div className={css(styles.selectToggleBadge)}>
        <span className={css(badgeStyles.badge, badgeStyles.modifiers.read)}>{selections.length}</span>
      </div>
    )
  }

  render() {
    const {
      children,
      className,
      variant,
      onToggle,
      onSelect,
      onClear,
      toggleId,
      isExpanded,
      isGrouped,
      selections,
      ariaLabelTypeAhead,
      isDisabled,
      'aria-label': ariaLabel,
      placeholderText,
      width,
      ...props
    } = this.props;
    const { typeaheadInputValue, typeaheadActiveChild } = this.state;
    const selectToggleId = toggleId || `pf-toggle-id-${currentId++}`;
    let childPlaceholderText = null;
    if (!selections && !placeholderText) {
      const childPlaceholder = React.Children.toArray(children.filter(child => child.props.isPlaceholder === true));
      childPlaceholderText =
        (childPlaceholder[0] && childPlaceholder[0].props.value) || (children[0] && children[0].props.value);
    }

    const isTypeahed = (variant === SelectVariant.typeaheadMulti || variant === SelectVariant.typeahead);

    return (
      <SelectProvider value={{
        selected: selections,
        activeChild: typeaheadActiveChild,
        variant
      }}>
        <DropdownContext.Provider value={{
          onSelect: (event) => {
            this.clearSelection(event);
            const target = event.target.tagName === 'INPUT' ? event.target.parentElement : event.target;
            onSelect(event, target.innerText)
          },
          menuClass: styles.selectMenu,
          itemClass: styles.selectMenuItem,
          toggleClass: isTypeahed ? css(styles.button, styles.selectToggleButton) : styles.selectToggle,
          baseClass: styles.select,
          toggleIconClass: styles.selectToggleArrow,
          toggleTextClass: styles.selectToggleWrapper,
          textComponent: 'div',
          baseComponent: 'div',
          menuComponent: isGrouped ? 'ul' : 'div',
          sectionClass: styles.selectMenuGroup,
          sectionTitleClass: styles.selectMenuGroupTitle,
          sectionComponent: 'div',
          groupHeaderComponent: 'div',
          disabledClass: styles.modifiers.disabled,
          hoverClass: styles.modifiers.hover,
          separatorClass: styles.selectSeparator,
          autoFocus: isTypeahed
        }}>
          <DropdownWithContext
            {...props}
            dropdownItems={
              this.enhanceChildren(
                (this.state.typeaheadFilteredChildren as React.ReactElement[]) || 
                (children as React.ReactElement[])
              )
            }
            isOpen={isExpanded}
            className={className}
            aria-label={ariaLabel}
            toggle={
              <SelectToggle
                // {...props}
                id={selectToggleId}
                variant={variant}
                isExpanded={isExpanded}
                onToggle={(isOpen: boolean) => {
                  if (!isOpen) {
                    this.onClose();
                  }
                  onToggle(isOpen);
                }}
                isDisabled={isDisabled}
                aria-label={ariaLabel}
                selections={selections}
                onClear={(e) => {
                  this.clearSelection(e);
                  onClear(e);
                }}
              >
                {this.chipped()}
                {!isTypeahed && (
                  <span className={css(styles.selectToggleText)}>
                  {
                    (typeof selections === 'string' && selections) ||
                    placeholderText ||
                    childPlaceholderText
                  }
                  </span>
                )}
                {this.badged()}
                {
                  isTypeahed && (<TypeAheadInput
                    ariaActiveDescendant={typeaheadActiveChild && typeaheadActiveChild.props.id}
                    placeholder={placeholderText as string}
                    ariaLabel={ariaLabelTypeAhead}
                    inputValue={SelectVariant.typeahead === variant ? selections as string : typeaheadInputValue}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChange(event)}
                    onKeyDown={(event) => this.handleTypeaheadKeys(event.key)}
                  />
                )}

              </SelectToggle>
            }
            isGrouped={isGrouped}
          />
        </DropdownContext.Provider>
      </SelectProvider>
    )
  }
}

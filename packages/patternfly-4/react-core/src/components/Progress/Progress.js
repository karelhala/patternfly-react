import React, { Component } from 'react';
import styles from '@patternfly/patternfly-next/components/Progress/progress.css';
import { css, getModifier } from '@patternfly/react-styles';
import PropTypes from 'prop-types';
import ProgressContainer, { ProgressMeasureLocation, ProgressVariant } from './ProgressContainer';

export const ProgressSize = {
  sm: 'sm',
  md: 'md',
  lg: 'lg'
};

const propTypes = {
  /** Classname for progress component. */
  className: PropTypes.string,
  /** Size variant of progress. */
  size: PropTypes.oneOf(Object.values(ProgressSize)),
  /** Where the measure percent will be located. */
  measureLocation: PropTypes.oneOf(Object.values(ProgressMeasureLocation)),
  /** Status variant of progress. */
  variant: PropTypes.oneOf(Object.values(ProgressVariant)),
  /** Title above progress. */
  title: PropTypes.string,
  /** Label to indicate what progress is showing. */
  label: PropTypes.node,
  /** Actual value of progress. */
  value: PropTypes.number,
  /** DOM id for progress component. */
  id: PropTypes.string,
  /** Minimal value of progress. */
  min: PropTypes.number,
  /** Maximum value of progress. */
  max: PropTypes.number,
  /** Dynamic description of progress. */
  valueText: PropTypes.string
};

const defaultProps = {
  className: '',
  measureLocation: ProgressMeasureLocation.top,
  variant: ProgressVariant.info,
  id: '',
  title: '',
  min: 0,
  max: 100,
  size: null,
  value: 0,
  valueText: null
};

class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uniqueId:
        props.id ||
        `progress-${new Date().getTime()}${Math.random()
          .toString(36)
          .slice(2)}`
    };
  }

  render() {
    const { className, size, id, value, title, label, variant, measureLocation, min, max, valueText, ...props } = this.props;
    const { uniqueId } = this.state;
    const additionalProps = {
      ...props,
      ...(valueText ? { 'aria-valuetext': valueText } : { 'aria-describedby': `${id}-description` })
    };
    let limitedValue;
    limitedValue = value < min ? min : value;
    limitedValue = limitedValue > max ? max : limitedValue;
    return (
      <div
        {...additionalProps}
        className={css(
          styles.progress,
          getModifier(styles, variant, ''),
          getModifier(styles, measureLocation, ''),
          getModifier(styles, measureLocation === ProgressMeasureLocation.inside ? ProgressSize.lg : size, ''),
          className
        )}
        id={uniqueId}
        role="progressbar"
        aria-valuemin={min}
        aria-valuenow={limitedValue}
        aria-valuemax={max}
      >
        <ProgressContainer
          parentId={uniqueId}
          value={limitedValue}
          title={title}
          label={label}
          variant={variant}
          measureLocation={measureLocation}
        />
      </div>
    );
  }
}

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;

export default Progress;

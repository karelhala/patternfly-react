import { HTMLProps, SFC } from 'react';
import { OneOf } from '../../typeUtils';

export const AlignmentVariant: {
  primary: 'primary';
  secondary: 'secondary';
  tertiary: 'tertiary';
  danger: 'danger';
  link: 'link';
  action: 'action';
};

export interface AlignmentProps extends HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  variant?: OneOf<typeof AlignmentVariant, keyof typeof AlignmentVariant>;
}

declare const Alignment: SFC<AlignmentProps>;

export default Alignment;

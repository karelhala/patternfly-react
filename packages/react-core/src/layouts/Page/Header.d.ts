import { SFC, HTMLProps, ReactNode } from 'react';
import { OneOf } from '../../typeUtils';

export interface HeaderSidebarProps extends HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export declare const HeaderSidebar: SFC<HeaderSidebarProps>;

export interface HeaderMainProps extends HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export declare const HeaderMain: SFC<HeaderMainProps>;

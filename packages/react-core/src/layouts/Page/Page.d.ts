import { SFC, HTMLProps, ReactNode } from 'react';
import { OneOf } from '../../typeUtils';

export interface PageProps extends HTMLProps<HTMLDivElement> {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

declare const Page: SFC<PageProps>;

export default Page;

import React from 'react';
import { mount } from 'enzyme';
import Page from './Page';
import { HeaderMain, HeaderSidebar } from './Header';

test('replace with useful test name', () => {
  const view = mount(
    <Page
      header={
        <React.Fragment>
          <HeaderMain />
          <HeaderSidebar />
        </React.Fragment>
      }
      sidebar="Nav"
    >
      Page Layout Content
    </Page>
  );
  expect(view).toMatchSnapshot();
});

import React from 'react';
import ComponentDocs from '../../components/componentDocs';
import PropTypes from 'prop-types';
import { Page } from '@patternfly/react-core';
import Example from '../../components/example';

const propTypes = {
  data: PropTypes.any.isRequired
};

const PageDocs = ({ data }) => (
  <ComponentDocs data={data}>
    <Example title="Example Title">
      <Page>Example Goes Here</Page>
    </Example>
  </ComponentDocs>
);

PageDocs.propTypes = propTypes;

export const query = graphql`
  query PageDocsQuery {
    componentMetadata(displayName: { eq: "Page" }) {
      ...ComponentDocs
    }
  }
`;

export default PageDocs;

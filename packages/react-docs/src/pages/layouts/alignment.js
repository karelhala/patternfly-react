import React from 'react';
import ComponentDocs from '../../components/componentDocs';
import PropTypes from 'prop-types';
import { Alignment, AlignmentVariant } from '@patternfly/react-core';
import Example from '../../components/example';

const propTypes = {
  data: PropTypes.any.isRequired
};

console.log(AlignmentVariant);

const AlignmentDocs = ({ data }) => (
  <ComponentDocs data={data}>
    {Object.keys(AlignmentVariant).map(type => (
      <Example title={`${type} Alignment`}>
        <Alignment variant={type}>Content</Alignment>
      </Example>
    ))}
  </ComponentDocs>
);

AlignmentDocs.propTypes = propTypes;

export const query = graphql`
  query AlignmentDocsQuery {
    componentMetadata(displayName: { eq: "Alignment" }) {
      ...ComponentDocs
    }
  }
`;

export default AlignmentDocs;

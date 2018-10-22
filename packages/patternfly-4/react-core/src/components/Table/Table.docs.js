import { Table } from '@patternfly/react-core';
import Simple from './examples/SimpleTable';
import Sortable from './examples/SortableTable';
import Selectable from './examples/SelectableTable';

export default {
  title: 'Table',
  components: {
    Table,
  },
  examples: [Simple, Sortable, Selectable]
};

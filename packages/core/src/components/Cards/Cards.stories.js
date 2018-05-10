import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import {
  baseCardAddWithInfo,
  baseCardHeightMatchingStory,
  aggregateCardAddWithInfo,
  trendCardAddWithInfo,
  utilizationCardAddWithInfo,
  utilizationBarCardStory
} from './Stories/index';

import { name } from '../../../package.json';

const stories = storiesOf(`${name}/Cards`, module);
stories.addDecorator(withKnobs);

baseCardAddWithInfo(stories);
baseCardHeightMatchingStory(stories);
aggregateCardAddWithInfo(stories);
trendCardAddWithInfo(stories);
utilizationBarCardStory(stories);
utilizationCardAddWithInfo(stories);

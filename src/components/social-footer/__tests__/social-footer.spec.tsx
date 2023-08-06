import React from 'react';
import {render} from '@testing-library/react-native';
import SocialFooter, {SocialStringOptions} from '../social-footer';

describe('Social Footer', () => {
  it('Renders with numbers', () => {
    const {queryByText} = render(
      <SocialFooter
        redditSubs={1}
        redditUsers={2}
        twitterFollow={3}
        twitterStatus={4}
      />,
    );
    const expectedArray = [
      '1',
      '2',
      '3',
      '4',
      'Reddit subs',
      'Twitter followers',
      'Reddit users',
      'Twitter status',
    ];

    for (const expectedString of expectedArray) {
      expect(queryByText(expectedString)).not.toBeNull();
    }
  });

  it('Renders with not found', () => {
    const {queryByText, queryAllByText} = render(
      <SocialFooter
        redditSubs={SocialStringOptions.NotFound}
        redditUsers={SocialStringOptions.NotFound}
        twitterFollow={SocialStringOptions.Empty}
        twitterStatus={4}
      />,
    );

    expect(queryAllByText(SocialStringOptions.NotFound)).toHaveLength(2);
    const expectedArray = [SocialStringOptions.Empty, '4'];
    for (const expectedString of expectedArray) {
      expect(queryByText(expectedString)).not.toBeNull();
    }
  });
});

import React from 'react';
import {AppNavigation} from '@navigation';
import store from '@store/store';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

export default App;

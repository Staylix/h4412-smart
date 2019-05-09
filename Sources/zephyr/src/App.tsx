import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from './store';

import { Grommet } from 'grommet';
import Page from './components/Page';
import { theme } from './constants/themes';

class App extends Component<any> {

    render() {
        return (
            <Provider store={store}>
                <Grommet theme={theme}>
                    <Page />
                </Grommet>
            </Provider>
        );
    }
}

export default App;

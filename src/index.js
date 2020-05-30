import React, { Component } from 'react';
import { View, Text , StatusBar} from 'react-native';

import './config/reactotronConfig'
import Routes from './routes'
class App extends Component {
    render() {
        return (
            <>
                <StatusBar barStyle='light-content' backgroundColor='#7159c1'/>
                <Routes />
            </>
        )
    }
}

export default App;
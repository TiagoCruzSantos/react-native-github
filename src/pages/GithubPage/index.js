import React, { Component } from 'react'
import { WebView } from 'react-native-webview'

class GithubPage extends Component{
    render(){
        return (<WebView source={{uri: this.props.route.params.repository.html_url}} style={{flex: 1}}/>)
    }
}

export default GithubPage
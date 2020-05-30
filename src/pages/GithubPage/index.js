import React, { Component } from 'react'
import { View } from 'react-native'

class GithubPage extends Component{
    render(){
        console.log(this.props.route.params.repository.html_url)
        return (<View></View>)
    }
}

export default GithubPage
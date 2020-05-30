import React, { Component } from 'react'
import api from '../../services/api'
import PropTypes from 'prop-types'
import { Container, Header, Avatar, Bio, Name, Stars, Starred, OwnerAvatar, Info, Title, Author } from './style'
import { ActivityIndicator } from 'react-native'

function parseLink(headerLink){
    let re = /<([^\?]+\?[a-z]+=([\d]+))>;[\s]*rel="([a-z]+)"/g;
    let arrRes = [];
    let obj = {};
    while ((arrRes = re.exec(headerLink)) !== null) {
        obj[arrRes[3]] = {
        url: arrRes[1],
        page: arrRes[2]
        };
    }
    return obj;
}

export default class User extends Component{

    static propTypes = {
        route: PropTypes.shape({
            params: PropTypes.object
        }).isRequired
    }

    state = {
        stars: [],
        loading: false,
        page: 1,
        lastPage:1,
        refreshing: false
    }

    async componentDidMount(){
        const {user} = this.props.route.params
        
        this.setState({loading: true})
        var lastPage = 1
        const response = await api.get(`/users/${user.login}/starred`)
        if(response.headers.link){
            lastPage = parseInt(parseLink(response.headers.link).last?.page)
        }
        this.setState({stars: response.data, loading: false, lastPage})
    }

    async refreshList(user){
        this.setState({refreshing: true})
        const response = await api.get(`/users/${user.login}/starred`)
        this.setState({stars: response.data, refreshing: false, page: 1})
    }

    async loadMore(user){
        
        const {page, lastPage, stars} = this.state

        if(page !== lastPage){
            const response = await api.get(`/users/${user}/starred`, {params: {
                page: page + 1
            }})
            this.setState({page: page+1, stars: stars.concat(response.data)})
        }
    }

    render(){
        const {user} = this.props.route.params
        const {stars, loading} = this.state

        return (
            <Container>
                <Header>
                    <Avatar source={{uri: user.avatar_url}}/>
                    <Name>{user.name}</Name>
                    <Bio>{user.bio}</Bio>
                </Header>

                {loading ? <ActivityIndicator color="#7159c1" size={200}/> : 
                (<Stars data={stars} keyExtractor={(star) => String(star.id)} renderItem={({item}) => (
                    <Starred>
                        <OwnerAvatar source={{uri: item.owner.avatar_url}}/>
                        <Info>
                            <Title onPress={() => {}}>{item.name}</Title>
                            <Author>{item.owner.login}</Author>
                        </Info>
                    </Starred>
                )} onEndReachedThreshold={0.2} onEndReached={() => this.loadMore(user.login)} onRefresh={() => this.refreshList(user)} refreshing={this.state.refreshing}/>)}
            </Container>
        )
    }
}
import React, { Component } from 'react'
import {Keyboard, ActivityIndicator} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage";
import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../services/api';
import PropTypes from 'prop-types'

import { Container, Form, Input, SubmitButton, List, User, Avatar, Name, Bio, ProfileButton, ProfileButtonText } from "./style";

export default class Main extends Component{

    state = {
        newUser: '',
        users: [],
        loading: false
    }

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func
        }).isRequired,

    }

    async componentDidMount(){
        const users = await AsyncStorage.getItem('users')

        if(users){
            this.setState({users: JSON.parse(users)})
        }
    }

    componentDidUpdate(_, prevState){
        if(prevState.users !== this.state.users){
            AsyncStorage.setItem('users', JSON.stringify(this.state.users))
        }
    }

    handleAddUser = async () => {
        const {users, newUser} = this.state

        this.setState({loading: true})

        const response = await api.get(`/users/${newUser}`)

        this.setState({
            newUser: '',
            users: [...users, response.data],
            loading: false
        })

        Keyboard.dismiss()
    }

    handleNavigate = (user) => {
        this.props.navigation.navigate('User', { user })
    }

    render(){

        const {newUser, users, loading} = this.state

        return (
            <Container>
                <Form>
                    <Input autoCorrrect={false} autoCaptalize='none' placeholder='Adicionar usuário' value={newUser} onChangeText={text => this.setState({ newUser: text})} returnKeyType='send' onSubmitEditing={this.handleAddUser}/>
                    <SubmitButton loading={loading} onPress={this.handleAddUser}>
                        {loading ? <ActivityIndicator color="#fff"/> : <Icon name='add' size={20} color='#FFF'/>}
                    </SubmitButton>
                </Form>
                <List
                    data={users}
                    keyExtractor={user => user.login}
                    renderItem={({item}) => (
                        <User>
                            <Avatar source={{uri: item.avatar_url}}/>
                            <Name>{item.name}</Name>
                            <Bio>{item.bio}</Bio>

                            <ProfileButton onPress={() => this.handleNavigate(item)}>
                                <ProfileButtonText>Ver perfil</ProfileButtonText>
                            </ProfileButton>
                        </User>
                    )}
                />
            </Container>
        )
    }
}
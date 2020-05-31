import { NavigationContainer, StackActions } from '@react-navigation/native';
import React from 'react'
import Main from "./pages/Main";
import User from './pages/User';
import GithubPage from './pages/GithubPage'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator()

function Routes(){
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Main' screenOptions={
                    {
                        headerTitleStyle:{
                            alignSelf:'center'
                        },
                        headerTitleAlign: 'center',
                        headerBackTitleVisible: false,
                        headerStyle: {
                            backgroundColor:'#7159c1'
                        }, 
                        headerTintColor: "#fff"
                    }}>
                <Stack.Screen name='Main' component={Main} options={{title:"Usuários"}}/>
                <Stack.Screen name='User' component={User} options={({ route }) => ({ title: route.params.user.name })}/>
                <Stack.Screen name='GithubPage' component={GithubPage} options={({route}) => ({title: route.params.repository.name})}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes
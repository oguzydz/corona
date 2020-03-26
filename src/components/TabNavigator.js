import React, { Component } from 'react';
import { View } from 'react-native';


// Redux
import { connect } from 'react-redux'

// Screen'lar import ediliyor.
import HomeScreen from '../screen/Home/HomeScreen';
import AboutScreen from '../screen/About/AboutScreen';

// Styles
import Colors from './Colors';
import styles from './TabStyles'

// Icon & Navigation
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

class TabNavigator extends Component {

    styles = () => {
        if (this.props.theme === "light") {
            return styles.light;
        } else {
            return styles.dark;
        }
    }

    render() {
        const Tab = createBottomTabNavigator();
        return (
            <Tab.Navigator

                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'heartbeat'
                                : 'heartbeat';
                            if (focused === true) {
                                return <View style={[this.styles().boxIcon, {paddingBottom: 1}]}>
                                    <FontAwesome5 name={iconName} size={size} color={color} />
                                </View>
                            }else {
                                return <FontAwesome5 name={iconName} size={size} color={color} />
                            }

                        } else if (route.name === 'About') {
                            iconName = focused ? 'fingerprint' : 'fingerprint';
                            if (focused === true) {
                                return <View style={this.styles().boxIcon}>
                                    <FontAwesome5 name={iconName} size={size} color={color} />
                                </View>
                            }else {
                                return <FontAwesome5 name={iconName} size={size} color={color} />
                            }


                        }

                       
                    },

                })}
                tabBarOptions={{
                    activeTintColor: this.styles().activeTintColor,
                    inactiveTintColor: this.styles().inactiveTintColor,
                    activeBackgroundColor: this.styles().activeColorBg,
                    inactiveBackgroundColor: this.styles().inactiveBackgroundColor,
                    showLabel: false,
                    tabStyle: {
                        top: -1,
                        height: 51
                    }
                }}
                swipeEnabled={true}
                animationEnabled={true}
                initialRouteName="Home"

            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="About" component={AboutScreen} />
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme,
    }
}



export default connect(mapStateToProps, null)(TabNavigator)
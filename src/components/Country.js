import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions } from 'react-native'

//redux
import { connect } from 'react-redux';
import * as countryActions from '../store/actions/country';

// Styles & Components
import Constants from 'expo-constants';
import Colors from './Colors';
import RenderFlag from './renderFlag';
const { width, height } = Dimensions.get('window');


class Country extends Component {

    styles = () => {
        if (this.props.theme === "light") {
            return styles.light;
        } else {
            return styles.dark;
        }
    }

    openMenu = () => {
        this.setState({
            openMenu: true
        })
        this.props.toggle_menu()
    }

    state = {
        openMenu: false
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.openMenu}>
                    <View style={{ width: 34, height: 34, borderRadius: 36 / 2, backgroundColor: "white", alignItems: "center", borderWidth: 1, borderColor: "#fff" }}>
                        <RenderFlag 
                            flag={this.props.country}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme,
        country: state.country.country
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_country: (code) => dispatch(countryActions.set_country(code)),
        toggle_menu: () => dispatch(countryActions.toggle_menu()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Country);


const styles = {
    light: {
        container: {

        },
        flag: {

        },
    },
    dark: {
        container: {

        },
        flag: {

        }
    }
}

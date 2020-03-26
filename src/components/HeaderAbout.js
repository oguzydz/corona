import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

//redux
import { connect } from 'react-redux';
import * as themeActions from '../store/actions/theme';
import * as countryActions from '../store/actions/country';

// Styles & Components
import styles from './HeaderStyles';
import { FontAwesome5 } from '@expo/vector-icons';
import Country from './Country';
import lang from '../lang/all'

class HeaderAbout extends Component {

    toggleTheme = () => {
        if (this.props.theme === "light") {
            this.props.set_dark();
        } else if (this.props.theme === "dark") {
            this.props.set_light();
        }
    }

    styles = () => {
        if (this.props.theme === "light") {
            return styles.light;
        } else {
            return styles.dark;
        }
    }

    flagButton = () => {
        this.setState({
            countryPopUp: !this.state.countryPopUp
        })
    }

    state = {
        countryPopUp: false,
    }

    render() {
        const { theme } = this.props;
        return (
            <View style={this.styles().container}>
                <View style={this.styles().left}>

                </View>
                <View style={this.styles().center}>
                    <Text style={this.styles().centerText}>
                        {lang.filter(lang => lang.code === this.props.lang)[0].headerTitleAbout}
                    </Text>
                </View>
                <View style={this.styles().right}>
                    <TouchableOpacity onPress={this.toggleTheme}>
                        {theme === "light" ?
                            <FontAwesome5 name="moon" size={30} color="#fff" />
                            :
                            <FontAwesome5 name="sun" size={30} color="#fff" />
                        }
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme,
        country: state.country.country,
        lang: state.country.lang
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_dark: () => dispatch(themeActions.theme_dark()),
        set_light: () => dispatch(themeActions.theme_light()),
        toggle_menu: () => dispatch(countryActions.toggle_menu()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAbout);
import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, ScrollView, FlatList, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'

//redux
import { connect } from 'react-redux';
import * as countryActions from '../store/actions/country';


import { FontAwesome5 } from '@expo/vector-icons';
import RenderFlag from './renderFlag';
import List from './CountryList';
import styles from './CountryMenuStyles';

import lang from '../lang/all';
import Colors from './Colors';

const { width, height } = Dimensions.get('window')

class CountryMenu extends Component {

    toggleMenu = () => {
        this.props.toggle_menu()
    }



    state = {
        data: [],
        dataBackup: [],
    }

    searchData = (text) => {
        const searchText = text.trim().toLowerCase();


        const non = List.filter(item => item.name !== this.props.country)
        const have = List.filter(item => item.name === this.props.country)
        non.unshift(have[0])


        if (this.props.lang !== "tr") {
            const data = non.filter(l => {
                return l.name.toLowerCase().match(searchText);
            });
            if (data.length === 0) {
                this.setState({
                    length: 0
                })
            } else {
                this.setState({
                    data: data,
                    length: 1
                })
            }
        } else {
            const data = non.filter(l => {
                return l.tr.toLowerCase().match(searchText);
            });

            if (data.length === 0) {
                this.setState({
                    message: "There is no a country!",
                    length: 0
                })
            } else {
                this.setState({
                    data: data,
                    length: 1
                })
            }
        }

    }

    setCountry = (code) => {
        this.props.toggle_menu();
        this.props.set_country(code)
        this.props.fetchData()
    }


    styles = () => {
        if (this.props.theme === "light") {
            return styles.light;
        } else {
            return styles.dark;
        }
    }

    menu = (item, index) => {

        if (this.state.length !== 0) {
            return (
                <TouchableOpacity onPress={() => this.setCountry(item.code)}>
                    <View style={[this.styles().countryBox, { backgroundColor: this.props.country === item.name ? "lightgray" : this.styles().countryBox.backgroundColor }]}
                        key={index}
                    >
                        <View style={{
                            flex: 2,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <RenderFlag
                                flag={item.name}
                            />
                        </View>
                        <View style={{
                            flex: 6,
                            alignItems: "flex-start",
                            justifyContent: "center"
                        }}>
                            <Text
                                style={[{
                                    fontSize: 16,

                                }, this.props.theme === "dark" ? { color: Colors.white } : null]}
                            >{this.props.lang === "tr" ? item.tr : item.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )

        }
    }

    render() {
        const non = List.filter(item => item.name !== this.props.country)
        const have = List.filter(item => item.name === this.props.country)
        non.unshift(have[0])


        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); this.props.toggle_menu() }}>
                <View style={this.styles().container}>
                    <View style={this.styles().box}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                padding: 10
                            }}
                        >
                            <View style={{
                                flex: 5,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: "bold"
                                    }}
                                >{lang.filter(lang => lang.code === this.props.lang)[0].countries}</Text>
                            </View>

                            <View style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <TouchableOpacity onPress={this.toggleMenu}>
                                    <FontAwesome5 name="times" size={30} color="#000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            flex: 7,
                            paddingBottom: 20
                        }}>
                            <TextInput
                                placeholder={lang.filter(lang => lang.code === this.props.lang)[0].search}
                                style={[{ padding: 13, paddingLeft: 20, fontSize: 17, marginBottom: 10, }, this.props.theme === "dark" ? { backgroundColor: Colors.darkGray, color: Colors.white } : { backgroundColor: "lightgray" }]}
                                onChangeText={(text) => this.searchData(text)}
                                placeholderTextColor="gray"
                            />

                            {this.state.length === 0 ?
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    backgroundColor: "white",
                                    paddingBottom: 10,
                                    paddingTop: 10,
                                    borderBottomColor: "gray",
                                    borderBottomWidth: 0.5
                                }}

                                >
                                    <View style={{
                                        flex: 1,
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}>

                                    </View>
                                    <View style={{
                                        flex: 6,
                                        alignItems: "flex-start",
                                        justifyContent: "center"
                                    }}>
                                        <Text
                                            style={{
                                                fontSize: 16
                                            }}
                                        >{lang.filter(lang => lang.code === this.props.lang)[0].message}</Text>
                                    </View>
                                </View>
                                : null}

                            <FlatList
                                data={this.state.data.length === 0 ? non : this.state.data}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return this.menu(item, index)
                                }}
                            />

                        </View>
                    </View>
                </View >
            </TouchableWithoutFeedback>
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
        set_country: (code) => dispatch(countryActions.set_country(code)),
        toggle_menu: () => dispatch(countryActions.toggle_menu()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CountryMenu);




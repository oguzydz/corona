import React, { Component } from 'react'
import { Text, View, ActivityIndicator, RefreshControl, ScrollView, TouchableOpacity, Share } from 'react-native'


// Redux
import { connect } from 'react-redux'
import { store } from '../../store/index'
import * as Cactions from '../../store/actions/country';
import * as Aactions from '../../store/actions/analytics';

// Styles & Components
import HeaderHome from '../../components/HeaderHome'
import styles from './HomeStyles';
import Colors from '../../components/Colors';
import lang from '../../lang/all';

// Libs
import moment from 'moment'
import localization from 'moment/locale/tr';
import cheerio from 'cheerio'
import { AdMobBanner } from 'expo-ads-admob';
import { FontAwesome5 } from '@expo/vector-icons';

// Api
import {
    getMainNumbers,
    getActiveCases,
    getClosedCases,
    getCountriesTableData,
} from '../../components/Api';

import CountryMenu from '../../components/CountryMenu';
import List from '../../components/CountryList';

// Firebase import ediliyor.
import { auth, db, app } from '../../firebase/index';
import { config } from '../../firebase/config';


// Kullanıcı Cihaz Bilgileri
import Constants from 'expo-constants';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';



class HomeScreen extends Component {

   

    styles = () => {
        if (this.props.theme === "light") {
            return styles.light;
        } else {
            return styles.dark;
        }
    }

    state = {
        country: {
            "activeCases": "",
            "country": "",
            "criticalCases": "",
            "newCases": "",
            "newDeaths": "",
            "totalCases": "",
            "totalCasesIn1m": "",
            "totalDeaths": "",
            "totalRecovered": "",
        },
        loading: false,

    }




    componentDidMount = () => {
        this.refreshData();

        this.props.set_close_menu();

        auth.signInAnonymously().then((user) => {
            if (user) {
                const uid = user.user.uid
                const userRef = db.ref("users/" + uid)
                userRef.set({
                    deviceName: Constants.deviceName,
                    deviceYearClass: Constants.deviceYearClass,
                    homeScreenTime: store.getState().analytics.HomeScreenTime,
                    aboutScreenTime: store.getState().analytics.AboutScreenTime
                })

            }
        }).catch(function (error) {
            console.log('firebase auth error: ' + error)
        })



        this.focus = this.props.navigation.addListener('focus', () => {
            const timer = setInterval(() => {
                this.props.screen_time("Home")
            }, 1000)


            this.props.navigation.addListener('blur', () => {
                clearInterval(timer)

            })
        })



    }



    fetchData = async () => {
        const urlCors = 'https://cors-anywhere.herokuapp.com/';
        const urlWorldOMeter = 'https://www.worldometers.info/coronavirus/';

        fetch(Platform.OS === 'web' ? urlCors + urlWorldOMeter : urlWorldOMeter)
            .then((response) => response.text())
            .then((data) => {
                const html = cheerio.load(data);


                if (this.props.country === "World") {
                    const mainNumbers = getMainNumbers(html)
                    const activeCases = getActiveCases(html)
                    const closedCases = getClosedCases(html)

                    console.log(activeCases)



                    this.props.set_values({
                        "activeCases": activeCases.currentlyInfectedPatients,
                        "country": this.props.country,
                        "criticalCases": "-",
                        "newCases": "-",
                        "newDeaths": "-",
                        "totalCases": mainNumbers.coronavirusCases,
                        "totalCasesIn1m": "-",
                        "totalDeaths": mainNumbers.deaths,
                        "totalRecovered": mainNumbers.recovered,
                        lastUpdate: new Date().getTime(),
                    })

                    this.setState({
                        country: {
                            "activeCases": activeCases.currentlyInfectedPatients,
                            "country": this.props.country,
                            "criticalCases": "-",
                            "newCases": "-",
                            "newDeaths": "-",
                            "totalCases": mainNumbers.coronavirusCases,
                            "totalCasesIn1m": "-",
                            "totalDeaths": mainNumbers.deaths,
                            "totalRecovered": mainNumbers.recovered,
                            lastUpdate: new Date().getTime(),
                        },
                    })
                } else {
                    const response = getCountriesTableData(html).filter(item => item.country === this.props.country)[0];

                    this.props.set_values({
                        "activeCases": response.activeCases,
                        "country": response.country,
                        "criticalCases": response.criticalCases,
                        "newCases": response.newCases,
                        "newDeaths": response.newDeaths,
                        "totalCases": response.totalCases,
                        "totalCasesIn1m": response.totalCasesIn1m,
                        "totalDeaths": response.totalDeaths,
                        "totalRecovered": response.totalRecovered,
                        lastUpdate: new Date().getTime(),
                    })

                    this.setState({

                        country: {
                            "activeCases": response.activeCases,
                            "country": response.country,
                            "criticalCases": response.criticalCases,
                            "newCases": response.newCases,
                            "newDeaths": response.newDeaths,
                            "totalCases": response.totalCases,
                            "totalCasesIn1m": response.totalCasesIn1m,
                            "totalDeaths": response.totalDeaths,
                            "totalRecovered": response.totalRecovered,
                            "lastUpdate": new Date().getTime(),
                        },
                    })
                }


            })
            .then(() => {
                this.setState({
                    loading: false
                })

            })
            .catch((err) => console.warn('Something went wrong.', err));
    }


    box = (title, value) => {

        return (
            <View style={this.styles().box}>
                <View>
                    <Text style={this.styles().boxTitle}>{title}</Text>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={this.styles().boxValue}>{value}</Text>
                </View>
            </View>
        )
    }


    refreshData = () => {
        this.setState({
            loading: true
        })
        this.fetchData();
    }

    onShare = async () => {
        try {
            const { lang } = this.props;
            const countryTR = List.filter(item => item.name === this.props.values.country)[0].tr
            const countryEN = List.filter(item => item.name === this.props.values.country)[0].name


            const messageTR = 'Bölge: ' + countryTR + '\nTüm Vakalar: ' + this.props.values.totalCases + '\nYeni Vakalar: ' + this.props.values.newCases + '\nToplam Ölümler: ' + this.props.values.totalDeaths + '\nYeni Ölümler: ' + this.props.values.newDeaths + '\nİyileşmeler: ' + this.props.values.totalRecovered + '\nAktif Vakalar: ' + this.props.values.activeCases + '\nSende güncel verileri uygulamadan takip et!\nhttps://play.google.com/store/apps/details?id=com.oguzydz.corona'
            const messageEN = 'Place: ' + countryEN + '\nTotal Cases: ' + this.props.values.totalCases + '\nNew Cases: ' + this.props.values.newCases + '\nTotal Deaths: ' + this.props.values.totalDeaths + '\nNew Deaths: ' + this.props.values.newDeaths + '\nRecovered: ' + this.props.values.totalRecovered + '\nActive Cases: ' + this.props.values.activeCases + '\nFollow the actual data from the app!\nhttps://play.google.com/store/apps/details?id=com.oguzydz.corona'


            const result = await Share.share({
                message: lang == "tr" ? messageTR : messageEN,
            });


        } catch (error) {
            alert(error.message);
        }
    };



    render() {
        return (
            <View style={this.styles().bg}>
                <HeaderHome
                    nav={this.props.navigation}
                />

                <TouchableOpacity onPress={() => this.onShare()} style={[this.styles().lastUpdate, { marginBottom: 10, backgroundColor: Colors.blue }]}>
                    <Text style={{ padding: 1, color: Colors.white }}>{lang.filter(lang => lang.code === this.props.lang)[0].share}  <FontAwesome5 name="slideshare" size={16} />  <FontAwesome5 name="ambulance" size={16} /></Text>
                </TouchableOpacity>

                <View style={this.styles().lastUpdate}>
                    <View>
                        <Text style={{ color: Colors.white }}>
                            {lang.filter(lang => lang.code === this.props.lang)[0].lastUpdate}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ color: Colors.white }}>
                            {this.props.values.lastUpdate !== "" ? moment(this.props.values.lastUpdate).locale(this.props.lang).fromNow() : lang.filter(lang => lang.code === this.props.lang)[0].didnotUpdate}
                        </Text>
                    </View>
                    <View style={{ justifyContent: "center", flex: 1, alignItems: "flex-end", paddingRight: 20 }}>
                        <TouchableOpacity onPress={() => this.refreshData()}>
                            <FontAwesome5 name="sync-alt" size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={this.styles().container}>

                    {this.state.loading === true ?
                        <View style={{ flex: 1 }}>
                            <View style={{ margin: 20 }}>
                                <ActivityIndicator size="large" color="#fff" />
                            </View>
                            <View style={[this.styles().row, { paddingTop: 15 }]}>
                                {this.box(
                                    lang.filter(item => item.code === this.props.lang)[0].totalCases,
                                    this.props.values !== '' ? this.props.values.totalCases === "" ? 0 : this.props.values.totalCases : this.state.country.totalCases === "" ? 0 : this.state.country.totalCases
                                )}
                                {this.box(
                                    lang.filter(item => item.code === this.props.lang)[0].newCases,
                                    this.props.values !== '' ? this.props.values.newCases === "" ? 0 : this.props.values.newCases : this.state.country.newCases === "" ? 0 : this.state.country.newCases
                                )}
                            </View>


                            <View style={this.styles().row}>
                                {this.box(
                                    lang.filter(item => item.code === this.props.lang)[0].totalDeaths,
                                    this.props.values !== '' ? this.props.values.totalDeaths === "" ? 0 : this.props.values.totalDeaths : this.state.country.totalDeaths === "" ? 0 : this.state.country.totalDeaths
                                )}
                                {this.box(
                                    lang.filter(item => item.code === this.props.lang)[0].newDeaths,
                                    this.props.values !== '' ? this.props.values.newDeaths === "" ? 0 : this.props.values.newDeaths : this.state.country.newDeaths === "" ? 0 : this.state.country.newDeaths
                                )}
                            </View>

                            <View style={this.styles().row}>
                                {this.box(
                                    lang.filter(item => item.code === this.props.lang)[0].totalRecovered,
                                    this.props.values !== '' ? this.props.values.totalRecovered === "" ? 0 : this.props.values.totalRecovered : this.state.country.totalRecovered === "" ? 0 : this.state.country.totalRecovered
                                )}
                                {this.box(
                                    lang.filter(item => item.code === this.props.lang)[0].activeCases,
                                    this.props.values !== '' ? this.props.values.activeCases === "" ? 0 : this.props.values.activeCases : this.state.country.activeCases === "" ? 0 : this.state.country.activeCases
                                )}
                            </View>
                        </View>
                        :
                        <ScrollView
                            refreshControl={
                                <RefreshControl refreshing={this.state.loading} onRefresh={() => this.refreshData()} />
                            }
                            contentContainerStyle={{
                                paddingTop: 15
                            }}
                        >


                            <View style={this.styles().row}>
                                {this.box(
                                    lang.filter(item => item.code === this.props.lang)[0].totalCases,
                                    this.props.values !== '' ? this.props.values.totalCases === "" ? 0 : this.props.values.totalCases : this.state.country.totalCases === "" ? 0 : this.state.country.totalCases
                                )}
                                {this.box(
                                    lang.filter(item => item.code === this.props.lang)[0].newCases,
                                    this.props.values !== '' ? this.props.values.newCases === "" ? 0 : this.props.values.newCases : this.state.country.newCases === "" ? 0 : this.state.country.newCases
                                )}
                            </View>


                            <View style={this.styles().row}>
                                {this.box(
                                    lang.filter(item => item.code === this.props.lang)[0].totalDeaths,
                                    this.props.values !== '' ? this.props.values.totalDeaths === "" ? 0 : this.props.values.totalDeaths : this.state.country.totalDeaths === "" ? 0 : this.state.country.totalDeaths
                                )}
                                {this.box(
                                    lang.filter(item => item.code === this.props.lang)[0].newDeaths,
                                    this.props.values !== '' ? this.props.values.newDeaths === "" ? 0 : this.props.values.newDeaths : this.state.country.newDeaths === "" ? 0 : this.state.country.newDeaths
                                )}
                            </View>

                            <View style={this.styles().row}>
                                {this.box(
                                    lang.filter(item => item.code === this.props.lang)[0].totalRecovered,
                                    this.props.values !== '' ? this.props.values.totalRecovered === "" ? 0 : this.props.values.totalRecovered : this.state.country.totalRecovered === "" ? 0 : this.state.country.totalRecovered
                                )}
                                {this.box(
                                    lang.filter(item => item.code === this.props.lang)[0].activeCases,
                                    this.props.values !== '' ? this.props.values.activeCases === "" ? 0 : this.props.values.activeCases : this.state.country.activeCases === "" ? 0 : this.state.country.activeCases
                                )}
                            </View>
                            <View style={this.styles().bannerBg}>

                                <AdMobBanner
                                    bannerSize="banner"
                                    servePersonalizedAds
                                    // adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID
                                    adUnitID="ca-app-pub-9786663498474045/3115114048"
                                    onDidFailToReceiveAdWithError={err => {
                                        console.log(err)
                                    }}
                                    onAdViewDidReceiveAd={() => {
                                        // console.log("Ad Recieved");
                                    }}
                                />
                            </View>

                        </ScrollView>
                    }

                </View>

                {this.props.menu === true ?
                    <CountryMenu
                        fetchData={() => this.refreshData()}
                    />
                    : null}

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme,
        country: state.country.country,
        values: state.country.values,
        lang: state.country.lang === "tr" && state.country.lang === "en" ? state.country.lang : state.country.lang === "tr" ? "tr" : "en",
        menu: state.country.menu,
        state: state.analytics
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        set_values: (values) => { dispatch(Cactions.set_values(values)) },
        screen_time: (screen) => { dispatch(Aactions.screen_time(screen)) },
        set_close_menu: () => {dispatch(Cactions.set_close_menu())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

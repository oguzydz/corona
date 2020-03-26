import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, Image, ScrollView, Linking } from 'react-native'

// Redux
import { connect } from 'react-redux'
import * as Cactions from '../../store/actions/country';
import * as Aactions from '../../store/actions/analytics';


// Styles & Components
import HeaderAbout from '../../components/HeaderAbout'
import styles from './AboutStyles'
import Colors from '../../components/Colors';
import lang from '../../lang/all';
import { FontAwesome5 } from '@expo/vector-icons';
import { AdMobBanner, AdMobInterstitial, PublisherBanner, AdMobRewarded } from 'expo-ads-admob';

const { width, height } = Dimensions.get('window')



class AboutScreen extends Component {


    styles = () => {
        if (this.props.theme === "light") {
            return styles.light;
        } else {
            return styles.dark;
        }
    }

    switchLang = (dil) => {
        this.props.set_lang(dil)
        // console.log(this.props.set_lang(dil))
    }
    componentDidMount = () => {
        this.focus = this.props.navigation.addListener('focus', () => {
            const timer = setInterval(() => {
                this.props.screen_time("About")
            }, 1000)


            this.props.navigation.addListener('blur', () => {
                clearInterval(timer)

            })
        })

    }


    render() {
        return (
            <View style={this.styles().container}>
                <HeaderAbout
                    nav={this.props.navigation}
                />
                <ScrollView>

                    <View style={this.styles().changeLang}>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <Text style={{ color: Colors.white }}>
                                {lang.filter(lang => lang.code === this.props.lang)[0].changeLang}
                            </Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}>
                            <View>
                                <TouchableOpacity onPress={() => this.switchLang("tr")}>
                                    {/* <FontAwesome5 name="sync-alt" size={16} color="#fff" /> */}
                                    <Image
                                        source={require('../../images/turkey.png')}
                                        style={{ width: 32, height: 32, borderWidth: 1, borderColor: "white", borderRadius: 20, marginRight: 20 }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View>

                                <TouchableOpacity onPress={() => this.switchLang("en")}>
                                    {/* <FontAwesome5 name="sync-alt" size={16} color="#fff" /> */}
                                    <Image
                                        source={require('../../images/unitedstates.png')}
                                        style={{ width: 32, height: 32, borderWidth: 1, borderColor: "white", borderRadius: 20 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <View style={this.styles().boxView}>
                        <View style={this.styles().boxTitle}>
                            <Text style={this.styles().title}> {lang.filter(lang => lang.code === this.props.lang)[0].questions.q1}   <FontAwesome5 name="briefcase-medical" size={18} color={this.props.theme === "light" ? Colors.base : Colors.white} /></Text>
                        </View>
                        <View style={this.styles().boxText}>
                            <Text style={this.styles().text}>{lang.filter(lang => lang.code === this.props.lang)[0].questions.a1} </Text>
                        </View>
                    </View>

                    <View style={this.styles().boxView}>
                        <View style={this.styles().boxTitle}>
                            <Text style={this.styles().title}> {lang.filter(lang => lang.code === this.props.lang)[0].questions.q2}   <FontAwesome5 name="sign-language" size={18} color={this.props.theme === "light" ? Colors.base : Colors.white} /> <FontAwesome5 name="flask" size={18} color={this.props.theme === "light" ? Colors.base : Colors.white} /> <FontAwesome5 name="syringe" size={18} color={this.props.theme === "light" ? Colors.base : Colors.white} /></Text>
                        </View>
                        <View style={this.styles().boxText}>
                            <Text style={this.styles().text}>{lang.filter(lang => lang.code === this.props.lang)[0].questions.a2}</Text>
                        </View>
                    </View>

                    <View style={this.styles().changeLang}>
                        <View style={{ flex: 10, justifyContent: "center" }}>
                            <Text style={{ color: Colors.white, fontWeight: "bold" }}>
                                {lang.filter(lang => lang.code === this.props.lang)[0].emergency}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => Linking.openURL('https://www.worldometers.info/coronavirus/')}>

                        <View style={this.styles().changeLang}>
                            <View style={{ flex: 10, justifyContent: "center" }}>
                                <Text style={{ color: Colors.white, fontWeight: "bold" }}>
                                    {lang.filter(lang => lang.code === this.props.lang)[0].copyright}
                                </Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", marginRight: 10 }}>
                                <View>

                                    <FontAwesome5 name="arrow-right" size={27} color="#fff" />
                                </View>
                            </View>

                        </View>
                    </TouchableOpacity>

                    <View style={this.styles().bannerBg}>

                        <AdMobBanner
                            bannerSize="banner"
                            servePersonalizedAds
                            // adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID
                            adUnitID="ca-app-pub-9786663498474045/9065993462"
                            onDidFailToReceiveAdWithError={err => {
                                console.log(err)
                            }}
                            onAdViewDidReceiveAd={() => {
                                // console.log("Ad Recieved");
                            }}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.theme.theme,
        lang: state.country.lang
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_lang: (dil) => { dispatch(Cactions.set_lang(dil)) },
        screen_time: (screen) => {dispatch(Aactions.screen_time(screen))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutScreen)

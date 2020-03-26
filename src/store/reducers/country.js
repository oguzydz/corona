import * as actions from '../actions/types';
import * as Cellular from 'expo-cellular';
import List from '../../components/CountryList';

import { NativeModules, Platform } from 'react-native';



const country = Platform.OS === 'ios' ?
NativeModules.SettingsManager.settings.AppleLocale.slice(3, 5) :
NativeModules.I18nManager.localeIdentifier.slice(3, 5)


const initalState = {
    // country: Cellular.isoCountryCode
    country: List.filter(item => item.code === country.toLowerCase())[0].name,
    values: '',
    code: Cellular.isoCountryCode,
    menu: false,
    lang: Platform.OS === 'ios' ?
        NativeModules.SettingsManager.settings.AppleLocale.slice(0, 2) :
        NativeModules.I18nManager.localeIdentifier.slice(0, 2)
}

const countryReducers = (state = initalState, action) => {

    switch (action.type) {
        case actions.SET_COUNTRY:
            return {
                ...state,
                country: List.filter(item => item.code === action.payload)[0].name,
                code: action.payload,
            };
        case actions.SET_VALUES:
            return {
                ...state,
                values: action.payload
            };
        case actions.TOGGLE_MENU:
            return {
                ...state,
                menu: !state.menu
            };
        case actions.SET_LANG:
            return {
                ...state,
                lang: action.payload
            };
    }
    return state;
}

export default countryReducers;
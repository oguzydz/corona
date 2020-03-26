import * as actions from './types';

export const set_country = (country) => async dispatch => {
    dispatch({
        type: actions.SET_COUNTRY,
        payload: country
    })
}


export const set_values = (values) => async dispatch => {
    dispatch({
        type: actions.SET_VALUES,
        payload: values
    })
}

export const toggle_menu = () => {
    return {
        type: actions.TOGGLE_MENU,
    }
}


export const fetch_data = async () => dispatch => {
    dispatch({
        type: actions.FETCH_DATA,
    })
}

export const set_lang =  (lang) => {
    return {
        type: actions.SET_LANG,
        payload: lang
    }
}
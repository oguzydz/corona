import * as actions from './types';

export const screen_time = (screen) => async dispatch => {
    dispatch({
        type: actions.SCREEN_TIME,
        payload: screen
    })
}


export const auth_user = (userAuth) => async dispatch => {
    dispatch({
        type: actions.AUTH_USER,
        payload: userAuth
    })
}

export const set_device = (device) => async dispatch => {

    dispatch({
        type: actions.SET_DEVICE,
        payload: device
    })
}

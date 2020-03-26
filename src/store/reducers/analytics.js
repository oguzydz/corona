import * as actions from '../actions/types';

const initalState = {
    HomeScreenTime: 0,
    AboutScreenTime: 0,
    lastChecked: '',
    userFirebaseId: '',
    createdAtFBAccount: '',
    lastLoginFB: '',
    deviceName: '',
    deviceYearClass: '',
    appUserId: '',
}


const analyticsReducers = (state = initalState, action) => {
    switch (action.type) {
        case actions.AUTH_USER:
            return {
                ...state,
                appUserId: action.payload.appUserId,
                lastLoginFB: action.payload.lastLoginFB,
                lastChecked: action.payload.lastChecked,
                isAnonymous: action.payload.isAnonymous,
                userFirebaseId: action.payload.userFirebaseId,
                createdAtFBAccount: action.payload.createdAtFBAccount,
            }
        case actions.SCREEN_TIME:
            if (action.payload === "Home") {
                return {
                    ...state,
                    HomeScreenTime: state.HomeScreenTime + 1,
                }
            } else if (action.payload === "About") {
                return {
                    ...state,
                    AboutScreenTime: state.AboutScreenTime + 1,
                }
            }
        case actions.SET_DEVICE:
            return {
                ...state,
                deviceName: action.payload.deviceName,
                deviceYearClass: action.payload.deviceYearClass
            }
    }
    return state
}

export default analyticsReducers;
import * as actions from '../actions/types'

const initalState = {
    theme: 'light'
}


const themeReducers = (state = initalState, action) => {
    switch (action.type) {
        case actions.THEME_LIGHT:
            return {
                theme: 'light'
            };
        case actions.THEME_DARK:
            return {
                theme: 'dark'
            };
    }
    return state;
}

export default themeReducers;
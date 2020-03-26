//redux bileşenleri import ediliyor.
import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

// Persist data için gerekli kütüphane ve storage import ediliyor. 
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from 'redux-persist';

//Reducer'lar import ediliyor.
import themeReducers from './reducers/theme';
import analyticsReducers from './reducers/analytics';
import countryReducers from './reducers/country';

// Reducer'lar combine ediliyor.
const rootReducer = combineReducers({
    theme: themeReducers,
    analytics: analyticsReducers,
    country: countryReducers,
});



// redux-persist ayarları
const persistConfig = {
    // key: "root",
    key: "v1.2.5",
    debug: true,
    storage,
}


// kalıcı data ile reducer'ları combine ediyor.
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store ve kalıcıtör export ediliyor.
export let store = createStore(persistedReducer, applyMiddleware(thunk))
export let persistor = persistStore(store)
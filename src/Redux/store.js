import {
    configureStore,
    getDefaultMiddleware,
    combineReducers,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import phonebookReducer from '../Redux/Phonebook/phonebook-reducer';

const middleware = [
    ...getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
    logger,
];

const itemsPersistConfig = {
    key: 'items',
    storage,
    blacklist: ['filter'],
};

const store = configureStore({
    reducer: {
        phonebook: persistReducer(itemsPersistConfig, phonebookReducer),
    },
    devTools: process.env.NODE_ENV === 'development',
    middleware,
});

const persistor = persistStore(store);

export default { store, persistor };

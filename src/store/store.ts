import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {pokemonsSlice} from './slices/pokimenSlice';
import {pokemonApi} from "../api/pokemonApi";

const rootReducer = combineReducers({
	pokemon: pokemonsSlice.reducer,
	[pokemonApi.reducerPath]: pokemonApi.reducer,
});

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}).concat(pokemonApi.middleware),
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

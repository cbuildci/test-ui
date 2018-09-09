/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'connected-react-router';

import languageProviderReducer from 'containers/LanguageProvider/reducer';

/*
 * routeReducer
 *
 */

// Initial routing state
const routeInitialState = fromJS({
    location: null,
});

/**
 * Merge route into the application state.
 *
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
export function routeReducer(state = routeInitialState, action) {
    switch (action.type) {
        /* istanbul ignore next */
        case LOCATION_CHANGE:
            return state.merge({
                location: action.payload,
            });
        default:
            return state;
    }
}

/**
 * Creates the main reducer with the dynamically injected ones.
 *
 * @param {object} injectedReducers
 * @returns {function}
 */
export default function createReducer(injectedReducers) {
    return combineReducers({
        route: routeReducer,
        language: languageProviderReducer,
        ...injectedReducers,
    });
}

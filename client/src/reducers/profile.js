import { Types } from '../actions/types';


const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case Types.GET_PROFILE:
        case Types.USER_LOADED:
        case Types.UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,

            }

        case Types.GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }

        case Types.PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false, 
                profile: null
            }

        case Types.CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }

        case Types.GET_REPOS:
            console.log("payload", payload);
            return {
                ...state,
                repos: payload,
                loading: false
            }

        default:
            return state;

    }

}
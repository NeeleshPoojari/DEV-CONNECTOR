import { Types } from '../actions/types';



const initialState = []

export default function( state = initialState, action) {

    const { type, payload } = action;

    switch(type) {
        case Types.SET_ALERT:
            return [
                ...state,
                payload
    ]

        case Types.REMOVE_ALERT:
            return state.filter((alert) => alert.id !== payload.id)

            default: 
            return state;

    }

}
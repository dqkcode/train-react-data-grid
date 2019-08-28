import * as types from './../constants/ActionTypes'
const initialState = {
   
}

export default (state = initialState, action) => {
    switch (action.type) {

        case types.SORT:
            console.log('action', action)
            return {
                status: state.status,
                sort: {
                    type: action.type,
                    value: action.value
                }
            }
        default:
            return state
    }
}

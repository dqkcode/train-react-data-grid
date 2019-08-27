
import * as constants from './../constants';
const initialState = [

    { id: 0, title: 'row1', count: 20 },
    { id: 1, title: 'row2', count: 40 },
    { id: 2, title: 'row3', count: 60 }
]

export default (state = initialState, action) => {
    
    console.log('action', action)
    let convert_action  = {...action}
    let cell = convert_action.cellInfo
    if(cell && cell.updated.count) {
       
        // if updated is count => parse it to number
        cell.updated.count = parseInt(cell.updated.count)
    } 

    switch (action.type) {

        case constants.GRID_ROW_UPDATED:
            // const rows = state.rows.slice();
            const rows = [...state]
            for (let i = cell.fromRow; i <= cell.toRow; i++) {
                rows[i] = { ...rows[i], ...cell.updated }
            }
            console.log('rows', rows)
            return  [...rows ]

            // return [...state]

        default:
            return state
    }
}

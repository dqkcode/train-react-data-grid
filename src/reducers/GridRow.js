
import * as constants from './../constants';

let initialState = {
    cols: [],
    rows: []
}

export default (state = initialState, action) => {

    // console.log('action', action)
    // let convert_action  = {...action}

    // console.log('cell :', cell);
    // if updated is count => parse it to number
    // if(cell && cell.updated.count) { 
    //     cell.updated.count = parseInt(cell.updated.count)
    // } 

    switch (action.type) {

        case constants.GRID_ROW_UPDATED:
            let cell = action.cellInfo
            const rows = [...state.rows]
            // for (let i = cell.fromRow; i <= cell.toRow; i++) {
            //     console.log('{...rows[i]} :', {...rows[i]});
            //     console.log('cell :', {...cell.updated});

            //     rows[i] = { ...rows[i], ...cell.updated }
                
            // }           
            rows[cell.fromRow] = { ...rows[cell.fromRow], ...cell.updated }

            return { ...state.rows, rows }
        
        case constants.IMPORT_FILE_SUCCESS:
            console.log('action.data :', action.data);
            return action.data
        default:
            return state
    }
}

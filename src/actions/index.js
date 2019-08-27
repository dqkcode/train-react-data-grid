import * as constants from './../constants';        
export const GridRowsUpdated = (cellInfo) => ({
    type: constants.GRID_ROW_UPDATED,
    cellInfo
})

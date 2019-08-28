import * as constants from './../constants';        
export const GridRowsUpdated = (cellInfo) => ({
    type: constants.GRID_ROW_UPDATED,
    cellInfo
})
export const ImportFile = (fileName) => ({
    type: constants.IMPORT_FILE
    
})

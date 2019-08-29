import * as constants from './../constants';

export const GridRowsUpdated = (cellInfo) => ({
    type: constants.GRID_ROW_UPDATED,
    cellInfo
})

export const getTableDataAction = (file) => ({
    type: constants.LOAD_FILE,
    file
})
export const loadFileSuccessAction = (data) => ({
    type: constants.IMPORT_FILE_SUCCESS,
    data
})
export const actionCreator=(status)=>({
    type: 'MY_ACTION',
    status
  })



// export const getTableData = (files) => {
//     return dispatch => {
//         handleUpLoadFile(files)
//             .then(result => {

//                 console.log('result :', result);
//             });
//     }
// }



// async function getDataFromFile(file) {
//     let reader = new FileReader();
//     return new Promise((resolve, reject) => {
//         reader.onload = event => {
//             let dataTable = {
//                 cols: [],
//                 rows: []
//             }
//             let dataResult = new Uint8Array(event.target.result);
//             let workbook = XLSX.read(dataResult, { type: 'array' });
//             let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
//             let data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
//             // console.log('data :', data[0]);

//             for (let i = 0; i < data[0].length; i++) {
//                 let element = data[0][i];
//                 let cellHeading = {
//                     key: element.toLowerCase(),
//                     name: element,
//                     resizable: true,

//                 }
//                 dataTable.cols.push(cellHeading)
//             }
//             let objRow = {
//                 id: '1',
//                 title: 't',
//                 count: 0
//             }
//             let objRowKey = []
//             for (const key in objRow) {
//                 if (objRow.hasOwnProperty(key)) {
//                     // objRow[key] = val
//                     objRowKey.push(key)

//                 }
//             }
//             for (let i = 1; i < data.length; i++) {
//                 for (let j = 0; j < data[i].length; j++) {
//                     const valCell = data[i][j];
//                     // console.log('val :', val);
//                     objRow[objRowKey[j]] = valCell
//                 }

//                 dataTable.rows.push({ ...objRow })


//             }
//             // console.log('dataTable :', dataTable);
//             // console.log('dataTable.rows :', dataTable.rows[0]);
//             resolve(dataTable)
//         }
//         reader.readAsArrayBuffer(file);
//     })
// }

// let handleUpLoadFile = async (reader, file) => {
//     try {
//         // return await getDataFromFile(reader, file)
//         const data = await getDataFromFile(reader, file)
//         console.log('data await: ', data)
//     } catch (e) {
//         console.log(e.message)
//     }
// }
// export const loadFile = (files) => {
//     return (dispatch, getState) => {
//         handleUpLoadFile(files)
//             .then(result => {
//                 if (result) {
//                     dispatch(getTableData(result));
//                 }
//             });
//     };
// }
import { put, takeEvery } from 'redux-saga/effects'
import * as constants from '../constants';
import XLSX from 'xlsx';


export function* sagaGetDataFromFile(action) {
    // yield take(constants.LOAD_FILE)
    console.log('sagaGetDataFromFile action :', action)
   
        try {
            const data = yield getDataFromFile(action)
            console.log('data', data)
            yield put({ type: constants.IMPORT_FILE_SUCCESS, data })
        } catch (error) {
            throw error
        }
}

export function* watchSagaGetDataFromFile() {
    yield takeEvery(constants.LOAD_FILE, sagaGetDataFromFile)
}


// function* updatePorts(status) {
//     console.log(status)
// }

// export function* watchUpdatePorts() {
//     yield takeEvery('MY_ACTION', updatePorts)
// }


 function getDataFromFile(action) {
    let file = action.file
    let reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = event => {
            let dataTable = {
                cols: [],
                rows: []
            }
            let dataResult = new Uint8Array(event.target.result);
            let workbook = XLSX.read(dataResult, { type: 'array' });
            let first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
            let data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
            // console.log('data :', data[0]);

            for (let i = 0; i < data[0].length; i++) {
                let element = data[0][i];
                let cellHeading = {
                    key: element.toLowerCase(),
                    name: element,
                    resizable: true,
                    editable :i===0?false:true,
                    filterable: true,
                }
                dataTable.cols.push(cellHeading)
            }

            let objRow = {
                id: '',
                title: '',
                count: 0
            }

            let objRowKey = []
            for (const key in objRow) {
                if (objRow.hasOwnProperty(key)) {
                    // objRow[key] = val
                    objRowKey.push(key)

                }
            }
            for (let i = 1; i < data.length; i++) {
                for (let j = 0; j < data[i].length; j++) {
                    const valCell = data[i][j];
                    // console.log('val :', val);
                    objRow[objRowKey[j]] = valCell
                }

                dataTable.rows.push({ ...objRow })


            }
            resolve(dataTable)
        }
        reader.readAsArrayBuffer(file);
    })


}
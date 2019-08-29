import { put, take, takeEvery } from 'redux-saga/effects'
import * as actions from './../actions';
import * as constants from './../constants';
import XLSX from 'xlsx';

export function* sagaGetDataFromFile(event) {
    // yield take(constants.LOAD_FILE)
    console.log('sagaGetDataFromFile event :', event )
    if (event)
        try {
            console.log('getDataFromFile');
            const data = yield getDataFromFile(event)
            console.log('data', data)
            yield put({ type: constants.IMPORT_FILE_SUCCESS, data })
        } catch (error) {
            throw error
        }

}

  export function* watchSagaGetDataFromFile() {
    yield takeEvery('LOAD_FILE', sagaGetDataFromFile)
  }


  function* updatePorts(status) {
    console.log(status)
  }
  
  export function* watchUpdatePorts() {
    yield takeEvery('MY_ACTION', updatePorts)
  }


async function getDataFromFile(event) {

    let file = event.file
    console.log('file :', file);

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

                }
                dataTable.cols.push(cellHeading)
            }
            let objRow = {
                id: '1',
                title: 't',
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
            console.log('dataTable :', dataTable);
            // console.log('dataTable.rows :', dataTable.rows[0]);
            resolve(dataTable)
        }
        reader.readAsArrayBuffer(file);
    })


}

// let handleUpLoadFile = async (file) => {
//     try {
//         // return await getDataFromFile(reader, file)
//         const data = await getDataFromFile(file)
//         console.log('data await: ', data)
//         return data
//     } catch (e) {
//         console.log(e.message)
//     }
// }

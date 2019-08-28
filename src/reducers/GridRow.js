
import * as constants from './../constants';
import XLSX from 'xlsx';
import { async, promised } from 'q';

let initialState = {
    cols: [],
    rows: []
}


async function getDataFromFile(reader, file) {
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
            // console.log('dataTable :', dataTable);
            // console.log('dataTable.rows :', dataTable.rows[0]);
            resolve(dataTable)
        }
        reader.readAsArrayBuffer(file);
    })
}

let handleUpLoadFile = async (reader, file) => {
    try {
        // return await getDataFromFile(reader, file)
        const data = await getDataFromFile(reader,file)
        console.log('data await: ', data)
        initialState =  data
    } catch (e) {
        console.log(e.message)
    }
}

export default (state = initialState, action) => {

    console.log('action', action)
    // let convert_action  = {...action}

    // console.log('cell :', cell);
    // if updated is count => parse it to number
    // if(cell && cell.updated.count) { 
    //     cell.updated.count = parseInt(cell.updated.count)
    // } 

    switch (action.type) {

        case constants.GRID_ROW_UPDATED:
            // const rows = state.rows.slice();
            // console.log('state', state)
            let cell = action.cellInfo
            const rows = [...state.rows]
            for (let i = cell.fromRow; i <= cell.toRow; i++) {
                rows[i] = { ...rows[i], ...cell.updated }
                console.log('rows[i] :', rows[i]);
            }
            return { ...state }


        case constants.IMPORT_FILE:

            // console.log('action.event :', action.event);
            // const target = action.event.target
            // const file = target.files[0]
            // // console.log('file', file)

            // XLSX.readFile(e.target.files[0].name, { type: 'array' })
            // const event = action.event

           
            // let a={};
            //   handleUpLoadFile(reader,file)
            // .then((data)=> {
            //  a=data



            // })
            // .catch((err)=>{
            //     console.log('err :', err);
            // })

            return {...state}
            // handleUpLoadFile(reader, file)
            // console.log('dataTable', typeof dataTable)
            
           
            // console.log('state :', state);
            // return {...state}
            case constants.LOAD_FILE:
                return action.data
        default:
            return state
    }
}

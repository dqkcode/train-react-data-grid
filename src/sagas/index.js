import { fork, call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'
import { watchSagaGetDataFromFile } from './sagaFile';

function* rootSaga() {

    yield call(watchSagaGetDataFromFile)


}

// function* hello() {
//     console.log('hello saga');
// }
export default rootSaga; 
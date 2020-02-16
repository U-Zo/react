import {createAction, handleActions} from 'redux-actions';
import {call, put, takeLatest} from 'redux-saga/effects';
import * as api from '../lib/api';
import createRequestSaga from "../lib/createRequestSaga";

// 액션 타입 선언
// 한 요청당 세 개

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

// thunk 함수 생성
// thunk 함수 내부에선 시작, 성공, 실패했을 때 다른 액션 디스패치

/*
export const getPost = id => async dispatch => {
    dispatch({type: GET_POST}); // 요청 시작
    try {
        const response = await api.getPost(id);
        dispatch({
            type: GET_POST_SUCCESS,
            payload: response.data
        }); // 요청 성공
    } catch (e) {
        dispatch({
            type: GET_POST_FAILURE,
            payload: e,
            error: true
        }); // 에러 발생
        throw e; // 나중에 컴포넌트 단에서 에러 조회 가능
    }
};

export const getUsers = () => async dispatch => {
    dispatch({type: GET_USERS}); // 요청 시작
    try {
        const response = await api.getUsers();
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: response.data
        });
    } catch (e) {
        dispatch({
            type: GET_USERS_FAILURE,
            payload: e,
            error: true
        }); // 에러 발생
        throw e; // 나중에 컴포넌트 단에서 에러 조회 가능
    }
};
*/

// Thunk 사용
// export const getPost = createRequestThunk(GET_POST, api.getPost);
// export const getUsers = createRequestThunk(GET_USERS, api.getUsers);

// Saga 사용
export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);

const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

/*
function* getPostSaga(action) {
    yield put(startloading(GET_POST)); // 로딩 시작
    // 파라미터로 action을 받아 오면 액션의 정보를 조회할 수 있습니다.
    try {
W        // call을 사용하면 Promise를 반환하는 함수를 호출하고 기다릴 수 있음
        // 첫 번째 파라미터는 함수, 나머지 파라미터는 해당 함수를 넣을 인수
        const post = yield call(api.getPost, action.payload); // api.getPost(action.payload) 의미
        yield put({
            type: GET_POST_SUCCESS,
            payload: post.data
        });
    } catch (e) {
        yield put({
            type: GET_POST_FAILURE,
            payload: e,
            error: true
        });
    }

    yield put(finishloading(GET_POST)); // 로딩 완료
}

function* getUsersSaga() {
    yield put(startloading(GET_USERS));
    try {
        const users = yield call(api.getUsers);
        yield put({
            type: GET_USERS_SUCCESS,
            payload: users.data
        });
    } catch (e) {
        yield put({
            type: GET_USERS_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishloading(GET_USERS));
}
*/

export function* sampleSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(GET_USERS, getUsersSaga);
}

// 초기 상태 선언
// 요청의 로딩 중 상태는 loading 객체에서 관리

const initialState = {
    post: null,
    users: null
};

const sample = handleActions(
    {
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: false // 요청 완료
            },
            post: action.payload
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USERS: false // 요청 완료
            },
            users: action.payload
        })
    }, initialState
);

export default sample;
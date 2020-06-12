import {startloading, finishloading} from "../modules/loading";

export default function createRequestThunk(type, request) {
    // 성공 및 실패 액션 타입을 정의
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;

    return params => async dispatch => {
        dispatch({type}); // 시작
        dispatch(startloading(type));
        try {
            const response = await request(params);
            dispatch({
                type: SUCCESS,
                payload: response.data
            }); // 성공
            dispatch(finishloading(type));
        } catch (e) {
            dispatch({
                type: FAILURE,
                payload: e,
                error: true
            }); // 실패
            dispatch(finishloading(type));
            throw e;
        }
    };
}

// 사용법: creatRequestThunk('GET_USERS', api.getUsers);
import { getAuditList, viewReviewContent, submitReview } from '@/public/js/api';
import wrappers from '@/wrappers';
const auditModel = {
    namespace: 'auditList',
    state: {
        auditList: {},
        auditDetails:{},
        size:10,
    },
    effects: {
        *getAuditList({ payload }, { call, put }) {
            const response = yield call(getAuditList, payload);
            yield put({
                type: 'saveAuditList',
                payload: response.data || {},
            });
        },
        *auditDetails({ payload }, { call, put }) {
            const response = yield call(viewReviewContent, payload);
            yield put({
                type: 'saveAuditDetails',
                payload: response.data || {},
            });
        },
        *submitReview({ payload }, { call, put }) {
            const response = yield call(submitReview, payload);
            // yield put({
            //     type: 'saveAuditDetails',
            //     payload: response.data || {},
            // });
            return response;
        },
    },
    reducers: {
        setPageSize(state, action){
            return {
                ...state,
                size: action.payload,
            };
        },
        saveAuditList(state, action) {
            return {
                ...state,
                auditList:action.payload,
            };
        }, 
        saveAuditDetails(state, action) {
            return {
                ...state,
                auditDetails: action.payload,
            };
        }, 
    },
    //路由监听
    subscriptions: {
        setup({ dispatch, history }) {
            wrappers();
            return history.listen(({ pathname }) => {
                if (pathname === '/auditList') {
                    //获取审核列表
                    dispatch({
                        type: 'getAuditList',
                        payload: {
                            params: {
                                size: auditModel.state.size,
                            },
                            method: 'get',
                            ContentType: 'application/json;charset=UTF-8'
                        }
                    })
                }
            });
        }
    }
};
export default auditModel;
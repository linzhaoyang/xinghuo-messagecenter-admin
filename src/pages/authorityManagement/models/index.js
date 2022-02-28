import { getAuthorityManagementList, operationAuthority } from '@/public/js/api';
import wrappers from '@/wrappers';
const authorityManagementModel = {
    namespace: 'authorityManagement',
    state: {
        authorityManagementList: {},
        size:10,
    },
    effects: {
        *getAuthorityManagementList({ payload }, { call, put }) {
            const response = yield call(getAuthorityManagementList, payload);
            yield put({
                type: 'saveAuthorityManagementList',
                payload: response.data ? response.data : {},
            });
        },
        *setAuthority({ payload }, { call, put }) {
            const response = yield call(operationAuthority, payload);
            // yield put({
            //     type: 'saveAuthorityManagementList',
            //     payload: response.data ? response.data.entities : [],
            // });
            return response
        },
    },
    reducers: {
        setPageSize(state, action) {
            return {
                ...state,
                size: action.payload,
            };
        },
        saveAuthorityManagementList(state, action) {
            return {
                ...state,
                authorityManagementList:action.payload,
            };
        },
    },
    //路由监听
    subscriptions: {
        setup({ dispatch, history }) {
            wrappers()
            return history.listen(({ pathname }) => {
                if (pathname === '/authorityManagement') {
                    //获取消息列表
                    dispatch({
                        type: 'getAuthorityManagementList',
                        payload: {
                            parmas: {
                                size: authorityManagementModel.state.size,
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
export default authorityManagementModel;
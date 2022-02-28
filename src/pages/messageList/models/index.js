import { getMessageList, messageDetail } from '@/public/js/api';
import wrappers from '@/wrappers';
const messageModel = {
    namespace: 'message',
    state: {
        messageList: {},
        size:10,
        messageDetail:{},
    },
    effects: {
        *getMessageList({ payload }, { call, put }) {
            const response = yield call(getMessageList, payload);
            yield put({
                type: 'saveMessageList',
                payload: response.data ||{},
            });
        },
        *messageDetail({ payload }, { call, put }) {
            const response = yield call(messageDetail, payload);
            yield put({
                type: 'saveMessageDetail',
                payload: response.data || {},
            });
        },
        
    },
    reducers: {
        saveMessageList(state, action) {
            return {
                ...state,
                messageList: action.payload 
            };
        },
        saveMessageDetail(state, action) {
            return {
                ...state,
                messageDetail: action.payload,
            };
        }, 
        setPageSize(state, action) {
            return {
                ...state,
                size: action.payload,
            };
        },
    },
    //路由监听
    subscriptions: {
        setup({ dispatch, history }) {
            wrappers();
            return history.listen(({ pathname }) => {
                if (pathname === '/messageList') {
                    //获取消息列表
                    dispatch({
                        type: 'getMessageList',
                        payload: {
                            params: {
                                size: messageModel.state.size,
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
export default messageModel;
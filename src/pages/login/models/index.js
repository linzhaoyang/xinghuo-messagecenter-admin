import { Login, Logout, allApplicationlist, allThemelist, allServerlist, reloadToken } from '@/public/js/api';
import tryCatch from '@/public/js/trycatch';
import { JSCookie } from '@/public/js/function';
const loginModel = {
    namespace: 'login',
    state: {
        allThemeList: null,//所有主题列表
        allApplicationList: null,//所有应用列表
        allServerList:null,//所有服务列表
        userInfo: tryCatch(JSON.parse(JSCookie.getCookie("userInfo"))) || {},
        consumerID:"9fd54159d07b41afbe69aab8a1b5b9b2",
        consumerName:"SERVICE_ACCOUNTS",
        //rsa秘钥公钥
        publicKey : "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCkh2hS0KYiw+JMsAzy2UJ4QGSsx1gkPwrI7bhVRWYgd1gSTm37n9tg0In7EVkoqSoPw6zFV+9C0y52pYKSMdJrbThXwaENUYBxTX0UzQRX21AgPBkmx1r2BYQ9SeT/jMwRrW2N+iReDbMfCCxJaLRutz3/XilkavbSX8yixkQjNQIDAQAB"
    },
    effects: {
        *login({ payload }, { call, put }) {
            const response = yield call(Login, payload);
            yield put({
                type: 'save',
                payload: response.data,
            });
        },
        *logout({ payload }, { call, put }) {
            const response = yield call(Logout, payload);
            yield put({
                type: 'save',
                payload: {},
            });
        },
        *reloadToken({ payload }, { call, put }) {
            const response = yield call(reloadToken, payload);
            yield put({
                type: 'save',
                payload: response.data || {},
            });
        },
        *getAllThemelist({ payload }, { call, put }) {
            const response = yield call(allThemelist, payload);
            yield put({
                type: 'saveAllThemelist',
                payload: response.data||[],
            });
        },
        *getAllApplicationlist({ payload }, { call, put }) {
            const response = yield call(allApplicationlist, payload);
            yield put({
                type: 'saveAllApplicationlist',
                payload: response.data||[],
            });
        },
        *getAllServerlist({ payload }, { call, put }) {
            const response = yield call(allServerlist, payload);
            yield put({
                type: 'saveAllServerlist',
                payload: response.data || [],
            });
        },
    },
    reducers: {
        //登录后保存个人数据
        save(state, action) {
            JSCookie.setCookie("userInfo", tryCatch(JSON.stringify(action.payload)))
            return {
                ...state,
                userInfo: action.payload //保存个人数据 
            };
        },
        saveAllThemelist(state, action){
            return {
                ...state,
                allThemeList: action.payload 
            };
        },
        saveAllApplicationlist(state, action){
            return {
                ...state,
                allApplicationList: action.payload 
            };
        },
        saveAllServerlist(state, action) {
            return {
                ...state,
                allServerList: action.payload
            };
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
        }
    }
};
export default loginModel;
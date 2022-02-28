import { getThemeList, createTheme, editTheme, checkThemeName, checkThemeCode, upload, viewTopicContent, deleteTheme, checkThemeAuthorization,statistics } from '@/public/js/api';
import { JSCookie, GetQueryString} from '@/public/js/function';
import wrappers from '@/wrappers';
const themeModel = {
    namespace: 'theme',
    state: {
        themeList: [],//主题列表
        themeDetails:{},
        statistics:[],
    },
    effects: {
        *getThemeList({ payload }, { call, put }) {
            const response = yield call(getThemeList, payload);
            yield put({
                type: 'saveList',
                payload: response.data || [],
            });
        },
        *getThemeDetails({ payload }, { call, put }) {
            const response = yield call(viewTopicContent, payload);
            yield put({
                type: 'saveThemeDetails',
                payload: response.data || {},
            });
        },
        *checkThemeAuthorization({ payload }, { call }) {
            return yield call(checkThemeAuthorization, payload);
        },
        *deleteTheme({ payload }, { call }) {
            return yield call(deleteTheme, payload);
        },
        *editTheme({ payload }, { call }) {
            return yield call(editTheme, payload);
        },
        *createTheme({ payload }, { call }) {
            return yield call(createTheme, payload);
        },
        *checkThemeCode({ payload }, { call }) {
            return yield call(checkThemeCode, payload);
        },
        *checkThemeName({ payload }, { call }) {
            return yield call(checkThemeName, payload);
        },
        *upload({ payload }, { call }) {
            return yield call(upload, payload);
        },
        *getStatistics({ payload }, { call, put }) {
            const response = yield call(statistics, payload);
            yield put({
                type: 'saveStatistics',
                payload: response.data || [],
            });
        },
    },
    reducers: {
        saveList(state, action) {
            return {
                ...state,
                themeList: action.payload
            };
        },
        saveThemeDetails(state, action) {
            return {
                ...state,
                themeDetails: action.payload
            };
        },
        saveStatistics(state, action) {
            return {
                ...state,
                statistics: action.payload
            };
        },
    },
    //路由监听
    subscriptions: {
        setup({ dispatch, history }) {
            wrappers();
            return history.listen(({ pathname, query }) => {
                if (pathname === '/') {
                    const userInfo = JSCookie.getCookie("userInfo");
                    const key = query.key || GetQueryString('key')
                    //检查是否有token传入
                    if (!key) {
                        if (!userInfo || userInfo === '{}') {
                            history.push({
                                pathname: '/login',
                            });
                        }
                        //获取主题列表
                        dispatch({
                            type: 'getThemeList',
                            payload: {
                                params: {
                                    date: 1,
                                    keyword: '',
                                },
                                method: 'get',
                                ContentType: 'application/json;charset=UTF-8'
                            }
                        })//获取热点词统计
                        dispatch({
                            type: 'getStatistics',
                            payload: {
                                params: {
                                    date: 1,
                                    // keyword: '',
                                },
                                method: 'get',
                                ContentType: 'application/json;charset=UTF-8'
                            }
                        })
                    }else{
                        const accessToken =  key.split('/')[0];
                        dispatch({
                            type: 'login/reloadToken',
                            payload: {
                                params: {
                                    accessToken,
                                },
                                method: 'get',
                                ContentType: 'application/json;charset=UTF-8'
                            }
                        }).then(() => {
                            window.location.href = `http://${window.location.host}`;
                        })
                        
                    }
                }
            });
        }
    }
};
export default themeModel;
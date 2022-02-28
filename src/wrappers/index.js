import { history } from 'umi'
import {useAuth} from './auth';
/**
 * 路由鉴权文件
 * 就通过 useAuth 做权限校验，如果通过，渲染页面，否则跳转到登录页面。
*/
export default (props) => {
    const isLogin = useAuth(props);
    if (!isLogin) {
        history.push({
            pathname: '/login',
        });
    } 
    return props;
}
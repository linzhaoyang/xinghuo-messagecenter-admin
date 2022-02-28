import styles from './index.less';
import Logo from './logo';
import DropdownMenu from './dropdownMenu';
import wrappers from '@/wrappers'
import { history, connect } from 'umi';
import {
    PoweroffOutlined
} from '@ant-design/icons';
const logo = require("@/pages/images/logo.png");
const avatar = require("@/pages/images/avatar.png");

/*
* 主页头部组合
*/
const header = (props) => {
    const menu = [
        { 
            name: '注销登录', icon: <PoweroffOutlined />, key: 0
        },
    ]
    //验证用户是否登录
    const userInfo = wrappers(props.userInfo);;
    
    const onClick = ({ item, key, keyPath, domEvent }) => {
        if (key === '0'){
            //注销登录
            const { dispatch } = props;
            dispatch({
                type: 'login/logout'
            }).then(() => {
                history.push({
                    pathname: '/login',
                });
            }).catch((err) => {
                console.error('error',err);
                history.push({
                    pathname: '/login',
                });
            })
        }
    }
    return (
        <header className={styles.header}>
            <Logo name="管理员平台" logo={logo} styles={{ float: 'left' }} />
            <DropdownMenu
                name={userInfo.loginUserName || '未登录'} 
                avatar={avatar} 
                styles={{ float: 'right' }} 
                menu={menu} 
                onClick={onClick}
            />
        </header>
    )
}

export default connect(({ login }) => {
    return {
        userInfo: login.userInfo,
    }
})(header)
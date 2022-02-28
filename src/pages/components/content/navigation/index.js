import styles from "./index.less";
import { Menu } from 'antd';
import { NavLink } from 'umi';


const { SubMenu } = Menu;
/**
 * 导航logo封装
*/
export default function nav(props) {
    const menu = (parmas) => {
        return parmas && parmas.length > 0 ? parmas.map((item, i) => {
            if (item.type !== 'submenu' && item.type !== 'menu') {
                return
            }
            return item.children && item.children.length > 0 ? <SubMenu key={item.openKey} icon={item.icon} title={item.name}>
                {menu(item.children)}
            </SubMenu> : <Menu.Item key={item.selectKey} icon={item.icon}><NavLink to={item.path}>{item.name}</NavLink></Menu.Item>
        }).filter(item => item) : ''
    }
    return (
        <div className={styles.navigation}>
            <Menu
                defaultSelectedKeys={props.route.selectKey}
                defaultOpenKeys={[props.route.openKey]}
                mode="inline"
                theme="dark"
            >
                {
                    menu(props.menu)
                }
            </Menu>
        </div>
    );
}
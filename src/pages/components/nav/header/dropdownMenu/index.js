import styles from "./index.less";
import { Dropdown, Menu } from 'antd';
/**
 * 下拉列表的封装
 * 当menu（array）属性为空或者长度为0时，将隐藏下拉菜单
*/
export default function DropdownMenu(props) {
    const menu = () => {
        return props.menu && props.menu.length > 0 ? <Menu onClick={props.onClick}>
            {
                props.menu.map((item, i) => {
                    return <Menu.Item key={item.key} icon={item.icon}>
                        {item.name}
                    </Menu.Item>
                })
            }
        </Menu>:<span></span>
    }
    let avatar = ''
    if (props.avatar) {
        avatar = <img className={styles.avatar} src={props.avatar} />
    }
    return (
        <Dropdown overlay={menu}>
            <div className="ant-dropdown-link" onClick={e => e.preventDefault()} style={props.styles}>
                <span className={styles.personal}>{avatar}{props.name || ''}</span>
            </div>
        </Dropdown>
    )
}
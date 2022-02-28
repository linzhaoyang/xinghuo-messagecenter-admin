import SelectComponents from './selectComponents';
import styles from './index.less';
/**
 * 遍历数据，提取组件类型type 通过 SelectComponents 去选择对应组件
 * 
 * 接受两个参数，data是需要遍历的数据
*/
export default function name({data}) {
    const dom = data.map((item, i) => {
        const Components = SelectComponents(item.type);
        return item.tag === 0 ? <div key={i} className={`${styles.item} ${styles.flexGrow}`} style={item.style}><span style={item.nameStyle}>{item.name ? item.name + '：' : ''}</span><Components  {...item.props}>
            {item.children && item.children.length > 0 ? item.children.map((itemj, j) => {
                const Option = SelectComponents(itemj.type);
                return <Option {...itemj.props} key={j} value={itemj.value} title={itemj.name}>{itemj.name}</Option>
            }) : ''}
        </Components></div> : <div key={i} className={`${styles.item}  ${item.separate ? styles.separate : ''}`} style={item.style}><span style={item.nameStyle}>{item.name ? item.name + '：' : ''}</span><Components key={i} {...item.props} /></div>
    })
    return dom
}
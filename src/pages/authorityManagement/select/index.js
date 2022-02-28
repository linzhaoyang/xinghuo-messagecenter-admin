import styles from './index.less'
import Components from '@/pages/components/selectComponents'
/**
 * 筛选组件框
 * 
 * selectDate 组件数据
 * --name 组件显示的名称
 * --type 组件的类型，用于识别选择组件类型的标示，例如 要选择蚂蚁金服的Select时 ，type='Select'
 * --tag 是组件渲染类型的标示 一个两种 0为 <C> </C> 与 1为<C /> 类型为Search时， separate=true可分离按钮和输入框
 * --nameStyle 是组件显示名称的样式
 * --style 是整体的外框的样式
 * --props 是需要传入的antd组件的样式
 * --children 为子集，例如Select 中需要Option列表，这部分就是Option的
 *   --props 需要传给子集的属性
 *   --tag 是组件渲染类型的标示 一个两种 0为 <C> </C> 与 1为<C />
 *   --type 组件的类型，用于识别选择组件类型的标示，例如 要选择蚂蚁金服的Select时 ，type='Select'
 *   --value 是显示的值
*/
export default function select(props) {
    return(
        <div className={styles.container}>
            <div className={props.right ? styles.rightSelect : styles.leftSelect}>
                <Components data={props.selectDate} />
            </div>
            {/* <div className={`${styles.search} ${styles.Right}`}>
                <Components data={props.searchData} />
            </div> */}
        </div>
    )
} 
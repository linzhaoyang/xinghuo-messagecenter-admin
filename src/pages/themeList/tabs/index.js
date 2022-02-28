import { Tabs } from 'antd';
import styles from "./index.less";
const { TabPane } = Tabs;



/**
 * 主题列表中顶部筛选tabs栏
 * 
*/
export default function tabs(props) {
    const tabs = (params) =>{
        return params && params.length > 0 ? params.map((item,i) => {
            return <TabPane tab={item.name} key={item.key}>
                {item.component}
            </TabPane>
        }):''
    }
    const {tabBarExtraContent , ...otherProps} = props;
    return (
        <Tabs {...otherProps} className={styles.tabs} tabBarGutter={0} className={styles.ttabs} tabBarExtraContent={tabBarExtraContent()}>
            {tabs(props.tabs)}
        </Tabs>
    );
}

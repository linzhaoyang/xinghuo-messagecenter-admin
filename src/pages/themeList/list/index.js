import React from 'react';
import { Row, Col} from 'antd';
import styles from './index.less';
import ThemeCard from '@/pages/components/themeCard';
import Empty from '@/pages/components/empty';


/**
 * 主题列表卡片渲染
*/
export default function list(props) {
    const {data,onClick} = props;
    return (
        <div className={styles.container}>
            <div className={styles.title}>主题列表</div>
            <Row className={styles.list}>
                {data && data.length > 0? data.map((item,i) => {
                    return <Col key={i} span={6}><ThemeCard type={item.data.secret || 0}  {...item} onClick={(e) => {
                        onClick(e,item)
                    }}/></Col>
                }) : <Empty />}
            </Row>
        </div>
    )
}
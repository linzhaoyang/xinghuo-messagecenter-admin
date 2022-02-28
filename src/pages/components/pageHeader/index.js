import { PageHeader } from 'antd';
import styles from './index.less';

/**
 * 头部面包屑
 * 
*/
export default function pageHeader(props) {
    return(
        <PageHeader
            className={styles.pageHeader}
            {...props}
        />
    )
} 
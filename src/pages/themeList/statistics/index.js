import React from 'react';
import { Column } from '@ant-design/charts';
import styles from './index.less'
/**
 * 图表
 * 
*/
export default function statistics (props){
    return(
        <div className={styles.container}>
            <div className={styles.title}>{props.title}</div>
            <Column {...props.config} />
        </div>
    )
}
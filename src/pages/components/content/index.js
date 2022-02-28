import styles from './index.less';
import Navigation from "./navigation";
import { Row, Col } from "antd";
import config from '@/config';
/**
 * 主页内容组合
 * Navigation 菜单组件
*/
export default (props) => {
    const Content = props.children;
    return (
        <Row className={styles.content}>
            <Col span={21} push={3}>
                {Content}
            </Col>
            <Col span={3} pull={21}>
                <Navigation menu={config.route} {...props}/>
            </Col>
        </Row>
    )
}
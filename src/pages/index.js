import styles from './index.less';
import Header from './components/header'
import Content from './components/content';

/**
 * 高阶组件 调用的时候 index()(组件)
 * 主要页面框，由头部和左侧导航组成
*/
export default () => WComponent => function index(props) {
    return (
        <div className={styles.container}>
          <Header {...props}/>
          <Content {...props}>
            <WComponent {...props}/>
          </Content>
        </div>
    );
}

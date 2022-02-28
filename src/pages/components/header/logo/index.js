import styles from "./index.less";
/**
 * 导航logo封装
*/
export default function logo(props) {
    return (
        <div className={styles.title} style={props.styles}>
            <img className={styles.logo} src={props.logo} />
            {props.name}
        </div>
    )
}
import styles from './index.less';

/**
 * 主题列表的卡片
 * 
*/
export default function themeCard(props){
    const { number, title, onClick, images, topButton, bottomButton,type } = props;
    return (
        <div className={styles[`card${type}`]} >
            <div className={styles.left}>
                <div className={styles.title} onClick={(e) => {
                    if (onClick) {
                        onClick(e)
                    }
                }}>{title}</div>
                <div className={styles.content}>
                    <div><span className={styles.quantity}>{number}</span>条</div>
                </div>
            </div>
            <div className={styles.right}>
                <img className={styles[`img${type}`]} src={images} />
                <div className={styles.topIcon} >{topButton}</div>
                <div className={styles.bottomIcon} >{bottomButton}</div>
            </div>
        </div>
    )
}
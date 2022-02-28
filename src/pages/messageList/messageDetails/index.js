import PageHeader from '@/pages/components/pageHeader';
import { connect, history } from 'umi';
import container from '@/pages/index';
import styles from './index.less';
import content from  '@/public/js/messageContent'
const messageDetails = (props) => {
    const { messageDetail } = props;
    const { message, pushCount, receiptedCount } = messageDetail;
    console.log('messageDetail', messageDetail)
    return(
        <div className={styles.container}>
            <PageHeader subTitle={props.route.name}/>
            <div className={styles.html}>
                {content(message, pushCount, receiptedCount)}
            </div>
        </div>
    )
}
export default connect(({ message }) => {
    return {
        messageDetail: message.messageDetail,
    }
})(container()(messageDetails));



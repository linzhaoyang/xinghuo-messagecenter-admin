import { history } from 'umi';
import { Modal } from 'antd'
/** 
 * 
 * 异常响应码对应事件的封装
 * modalFlag 控制只执行一次
*/
let modalFlag = false;
export default function errorEvent(key, msg) {
    if (!!modalFlag) {
        return
    }
    switch (key) {
        case 801:
            const modal801 = Modal.info();
            modalFlag = true;
            modal801.update({
                title: `用户身份已过期:${msg}`,
                okText:'重新登录',
                onOk:() =>{ 
                    history.push({
                        pathname: '/login',
                    });
                    modalFlag = false
                },
            });
            break;
        case 802:
            const modal802 = Modal.info();
            modalFlag = true;
            modal802.update({
                title: `token已过期:${msg}`,
                okText: '重新登录',
                onOk: () => {
                    history.push({
                        pathname: '/login',
                    });
                    modalFlag = false
                },
            });
            break;
        default:
            break ;
    }
}

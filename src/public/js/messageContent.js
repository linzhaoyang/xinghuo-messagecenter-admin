import style from './messageContent.less';
import moment from 'moment';
export default function content(params, pushCount, receiptedCount) {
    if (!params) {
        return
    }
    const content = {
        entityId: "关联实体ID",
        entityType: "关联实体类型",
        msgText: "消息文本",
        remarks: "备注",
    }
    const header = {
        msgFrom: '消息发送方标识',
        msgFromName: "消息发送方",
        msgGroup: "消息分类",
        msgLevel: "消息级别",
        sendTime: "推送时间",
        sendType: "推送类型",
        targets: "目标对象",
    }
    const contents = {
        sorting: "排序",
        moduleName:	"模块名称", 
        biType: "模块名称",
        params: "业务参数"
    }
    function setValue(key,value) {
        switch (key) {
            case 'sendTime':
                return moment(value).format("YYYY-MM-DD HH:mm:ss");
            case 'sendType':
                return function () {
                    switch (value) {
                        case 0:
                            return '应用';
                        case 1:
                            return '服务';
                        default:
                            return '其他';
                    }
                } ()
            case 'targets':
                return value.map((item, i) => {
                    return <span key={i}>{item.targetName}{i !== value.length - 1 ? '、': ''}</span>
                })
            default:
                return value;
        }
    }

    return (
        <div>
            <div className={style.container}>
                <h2 className={style.title}>{params.topicName}</h2>
                <div className={style.message}>
                    <div className={style.item}><b>推送时间：</b>{moment(params.msgHeader.sendTime).format("YYYY-MM-DD HH:mm:ss")}</div>
                </div>
                <div className={style.message}>
                    {
                        Object.keys(params.msgHeader).map((item, i) => {
                            if (item !== 'sendTime'){
                                return <div key={`msgHeader${i}`} className={style.item}><b>{header[item]}：</b>{setValue(item, params.msgHeader[item])}</div>
                            }
                        }).filter(item => item)
                    }
                </div>
                {
                    Object.keys(params.msgContent).map((item, i) => {
                        return <p key={`msgContent${i}`} className={style.content}><b>{content[item]}：</b>{params.msgContent[item]}</p>
                    })
                }
                <div className={style.bottom}>
                {
                    params.contents.map((item, i) => {
                        return <div key={`contents${i}`}> {Object.keys(item).map((itemj, j) => {
                            return <div key={`contents${i + j}`} className={style.item}><b>{contents[itemj]}：</b>{setValue(itemj, item[itemj])}</div>
                        })} </div>
                    })
                }
                </div>
                <div className={style.bottom}>
                    <div className={style.item}><b>消息推送方：</b>{params.supplierAccount}</div>
                    <div className={style.item}><b>消息已推送数量：</b>{pushCount}</div>
                    <div className={style.item}><b>消息已接收数量：</b>{receiptedCount}</div>
                </div>
            </div>
        </div>
    )
}
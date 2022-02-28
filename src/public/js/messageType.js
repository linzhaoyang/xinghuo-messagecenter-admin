import style from './messageType.less';
import moment from 'moment';
/**
 * 消息类型
    * 101 - 简单纯文本(text: 内容)
    * 102 - 标题纯文本(title: 标题, text: 内容)
    * 103 - 标题富文本(title: 标题, content: 富文本内容)
    * 104 - 标题概要纯文本(title: 标题, sketch: 概要, text: 内容)
    * 105 - 标题概要富文本(title: 标题, sketch: 概要, content: 富文本内容)
    *
 * 201 - 简单图片(src: 图片链接)
    * 202 - 标题图片(title: 标题, src: 图片链接)
    * 203 - 标题概要图片(title: 标题, sketch: 概要, src: 图片链接)
    *
 * 301 - 简单视频(src: 视频链接, thumbnail: 缩略图, duration: 视频长度)
    * 302 - 标题视频(title: 标题, src: 视频链接, thumbnail: 缩略图, duration: 视频长度)
    * 303 - 标题概要视频(title: 标题, sketch: 概要, src: 视频链接, thumbnail: 缩略图, duration: 视频长度)
    *
 * 401 - 简单语音(src: 语音链接, duration: 语音长度)
    * 402 - 标题语音(title: 标题, src: 语音链接, duration: 语音长度)
    * 403 - 标题概要语音(title: 标题, sketch: 概要, src: 语音链接, duration: 语音长度)
    *
 * 501 - 简单文件(src: 文件链接, fileName: 文件名, fileSize: 文件大小)
    * 502 - 标题文件(title: 标题, src: 文件链接, fileName: 文件名, fileSize: 文件大小)
    * 503 - 标题概要文件(title: 标题, sketch: 概要, src: 文件链接, fileName: 文件名, fileSize: 文件大小)
    *
 * 601 - 简单图文(title: 标题, cover: 封面图, content: 富文本内容)
    * 602 - 标题概要图文(title: 标题, sketch: 概要, cover: 封面图, content: 富文本内容)
    **/
//有title显示title, 没title显示sketch, 没sketch显示text, 没text, 显示fileName,
export function messageSketch(params) {
    if (params){
        if (params.title) {
            return params.title;
        } else if (params.sketch) {
            return params.sketch;
        } else if (params.text) {
            return params.text
        } else if (params.fileName) {
            return params.fileName
        } else {
            return ''
        }
    }else{
        return ''
    } 
}

export function messageType(type) {
    switch (type) {
        case 101:
            return '简单纯文本';
        case 102:
            return '标题纯文本';
        case 103:
            return '标题富文本';
        case 104:
            return '标题概要纯文本';
        case 105:
            return '标题概要富文本';
        case 201:
            return '简单图片';
        case 202:
            return '标题图片';
        case 203:
            return '标题概要图片';
        case 301:
            return '简单视频';
        case 302:
            return '标题视频';
        case 303:
            return '标题概要视频';
        case 401:
            return '简单语音';
        case 402:
            return '标题语音';
        case 403:
            return '标题概要语音';
        case 501:
            return '简单文件';
        case 502:
            return '标题文件';
        case 503:
            return '标题概要文件';
        case 601:
            return '简单图文'
        case 602:
            return '标题概要图文'
        default:
            break;
    }
}

export function messageContent(params, pushCount) {
    if (!params){
        return ''
    }
    switch (params.msgType) {
        case 101:
            return content101(params,pushCount);
        case 102:
            return content102(params,pushCount);
        case 103:
            return content103(params,pushCount);
        case 104:
            return content104(params,pushCount);
        case 105:
            return content105(params,pushCount);
        default:
            break;
    }
}
function content101(params, pushCount) {
    return (
        <div>
            {
                params.contents.map((item, i) => {
                    return <div className={style.container} key={i}>
                        {/* <h2 className={style.title}>{item.title}</h2> */}
                        <div className={style.message}>
                            <div className={style.item}><b>主题名称：</b>{params.topicName}</div>
                            <div className={style.item}><b>推送时间：</b>{moment(params.timestamp).format("YYYY-MM-DD HH:mm:ss")}</div>
                        </div>
                        {/* <p className={style.sketch}><b>消息概要：</b>{item.sketch}</p> */}
                        <p className={style.content} dangerouslySetInnerHTML={{ __html: item.text }}></p>
                        <div className={style.bottom}>
                            <div className={style.item}><b>消息推送方：</b>{params.supplierAccount}</div>
                            <div className={style.item}><b>推送app名称：</b>{params.msgSourceName}</div>
                            <div className={style.item}><b>消息已推送数量：</b>{pushCount}</div>
                            <div className={style.item}><b>消息已接收数量：</b>{pushCount}</div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

function content102(params, pushCount) {
    return (
        <div>
            {
                params.contents.map((item, i) => {
                    return <div className={style.container} key={i}>
                        <h2 className={style.title}>{item.title}</h2>
                        <div className={style.message}>
                            <div className={style.item}><b>主题名称：</b>{params.topicName}</div>
                            <div className={style.item}><b>推送时间：</b>{moment(params.timestamp).format("YYYY-MM-DD HH:mm:ss")}</div>
                        </div>
                        {/* <p className={style.sketch}><b>消息概要：</b>{item.sketch}</p> */}
                        <p className={style.content} dangerouslySetInnerHTML={{ __html: item.text }}></p>
                        <div className={style.bottom}>
                            <div className={style.item}><b>消息推送方：</b>{params.supplierAccount}</div>
                            <div className={style.item}><b>推送app名称：</b>{params.msgSourceName}</div>
                            <div className={style.item}><b>消息已推送数量：</b>{pushCount}</div>
                            <div className={style.item}><b>消息已接收数量：</b>{pushCount}</div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

function content103(params, pushCount) {
    return (
        <div>
            {
                params.contents.map((item, i) => {
                    return <div className={style.container} key={i}>
                        <h2 className={style.title}>{item.title}</h2>
                        <div className={style.message}>
                            <div className={style.item}><b>主题名称：</b>{params.topicName}</div>
                            <div className={style.item}><b>推送时间：</b>{moment(params.timestamp).format("YYYY-MM-DD HH:mm:ss")}</div>
                        </div>
                        <p className={style.sketch}><b>消息概要：</b>{item.sketch}</p>
                        <p className={style.content} dangerouslySetInnerHTML={{ __html: item.content }}></p>
                        <div className={style.bottom}>
                            <div className={style.item}><b>消息推送方：</b>{params.supplierAccount}</div>
                            <div className={style.item}><b>推送app名称：</b>{params.msgSourceName}</div>
                            <div className={style.item}><b>消息已推送数量：</b>{pushCount}</div>
                            <div className={style.item}><b>消息已接收数量：</b>{pushCount}</div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

function content104(params, pushCount) {
    return (
        <div>
            {
                params.contents.map((item,i) => {
                    return <div className={style.container} key={i}>
                            <h2 className={style.title}>{item.title}</h2>
                            <div className={style.message}>
                                <div className={style.item}><b>主题名称：</b>{params.topicName}</div>
                                <div className={style.item}><b>推送时间：</b>{moment(params.timestamp).format("YYYY-MM-DD HH:mm:ss")}</div>
                            </div>
                            <p className={style.sketch}><b>消息概要：</b>{item.sketch}</p>
                            <p className={style.content} dangerouslySetInnerHTML={{ __html: item.text }}></p>
                            <div className={style.bottom}>
                                <div className={style.item}><b>消息推送方：</b>{params.supplierAccount}</div>
                                <div className={style.item}><b>推送app名称：</b>{params.msgSourceName}</div>
                                <div className={style.item}><b>消息已推送数量：</b>{pushCount}</div>
                                <div className={style.item}><b>消息已接受数量：</b>{pushCount}</div>
                            </div>
                        </div>
                })
            }
        </div>
    )
}

function content105(params, pushCount) {
    return (
        <div>
            {
                params.contents.map((item, i) => {
                    return <div className={style.container} key={i}>
                        <h2 className={style.title}>{item.title}</h2>
                        <div className={style.message}>
                            <div className={style.item}><b>主题名称：</b>{params.topicName}</div>
                            <div className={style.item}><b>推送时间：</b>{moment(params.timestamp).format("YYYY-MM-DD HH:mm:ss")}</div>
                        </div>
                        <p className={style.sketch}><b>消息概要：</b>{item.sketch}</p>
                        <p className={style.content} dangerouslySetInnerHTML={{ __html: item.content }}></p>
                        <div className={style.bottom}>
                            <div className={style.item}><b>消息推送方：</b>{params.supplierAccount}</div>
                            <div className={style.item}><b>推送app名称：</b>{params.msgSourceName}</div>
                            <div className={style.item}><b>消息已推送数量：</b>{pushCount}</div>
                            <div className={style.item}><b>消息已接受数量：</b>{pushCount}</div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}
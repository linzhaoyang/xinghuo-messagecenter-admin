import styles from './index.less';
import container from "@/pages/index";
import PageHeader from '@/pages/components/pageHeader';
import SelectGroup from './select';
import Table from './table';
import { connect } from 'umi';
import moment from 'moment';
import { useState,useEffect } from 'react';
import { deepCopy } from '@/public/js/function';
import { Button } from 'antd';
/**
 * 主题列表的整合
*/
const MessageList = (props) => {
    const { dispatch, size, allThemeList, allApplicationList, allServerList, messageList, history } = props;
    const { location: { query:{id}} } = history;
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [topicId, setTopicId] = useState('');
    const [appId, setAppId] = useState('');
    const [serverId, setServerId] = useState('');
    const [typeValue, setTypeValue] = useState(null)
    const [sendTimeBegin, setSendTimeBegin] = useState(null);
    const [sendTimeEnd, setSendTimeEnd] = useState(null);
    if (!!id && topicId !== id){
        getMessageList({ themeId:id })
        setTopicId(id) 
    }
    useEffect(() => {
        
    }, [newQuestionBankName])
    //设置一个一次性的监听，执行完后不再执行
    useEffect(() => {
        if (!allThemeList) {
            dispatch({
                type: 'login/getAllThemelist',
                payload: {
                    method: 'get',
                    ContentType: 'application/json;charset=UTF-8'
                }
            })
        }
        if (!allApplicationList) {
            dispatch({
                type: 'login/getAllApplicationlist',
                payload: {
                    method: 'get',
                    ContentType: 'application/json;charset=UTF-8'
                }
            })
        }
        if (!allServerList) {
            dispatch({
                type: 'login/getAllServerlist',
                payload: {
                    method: 'get',
                    ContentType: 'application/json;charset=UTF-8'
                }
            })
        }
    }, []);
    console.log('allServerList', allServerList)
    //添加全选按钮
    const allThemeLists = deepCopy(allThemeList);
    if (allThemeLists) {
        const all = allThemeLists.filter(item => item.id === '');
        if (all.length === 0) {
            allThemeLists.unshift({
                id: '',
                name: '全部'
            })
        }
    }
    const allApplicationLists = deepCopy(allApplicationList);
    //添加全选按钮
    if (allApplicationLists) {
        const all = allApplicationLists.filter(item => item.appId === '');
        if (all.length === 0) {
            allApplicationLists.unshift({
                appId: '',
                appName: '全部'
            })
        }
    }
    const allServerLists = deepCopy(allServerList);
    //添加全选按钮
    if (allServerLists) {
        const all = allServerLists.filter(item => item.serverId === '');
        if (all.length === 0) {
            allServerLists.unshift({
                serverId: '',
                serverName: '全部'
            })
        }
    }
    //类型
    const typeList = [
        { key: null, value: '全部' },
        { key: 0, value: '应用' },
        { key: 1, value: '服务' }
    ]
    //筛选的列表配置
    const selectDate = [
        {
            name: '主题名称',
            type: 'Select',
            tag: 0,
            nameStyle: {
                width: 80,
                textAlign: 'right',
                lineHeight: '2rem',
            },
            style: { width: 200 },
            props: {
                defaultValue: topicId,
                notFoundContent: '暂无数据',
                style: { width: 120 },
                onChange: (value) => {
                    setTopicId(value)
                }
            },
            children: allThemeLists ? allThemeLists.map((item) => {
                return {
                    props: {},
                    tag: 0,
                    type: 'Option',
                    value: item.id,
                    key: item.id,
                    name: item.name,
                }
            }) : []
        }, {
            name: '类型',
            type: 'Select',
            tag: 0,
            style: { width: 180 },
            nameStyle: {
                width: 80,
                textAlign: 'right',
                lineHeight: '2rem',
            },
            props: {
                defaultValue: typeValue,
                notFoundContent: '暂无数据',
                style: { width: 100 },
                onChange: (value) => {
                    setTypeValue(value)
                    value === 0 ? setServerId("") : setAppId("")
                }
            },
            children: typeList ? typeList.map((item) => {
                return {
                    props: {},
                    tag: 0,
                    type: 'Option',
                    value: item.key,
                    key: item.key,
                    name: item.value,
                }
            }) : []
        }, {
            name: typeValue === 0 ? '应用名称' : '服务名称',
            type: 'Select',
            tag: 0,
            style: { width: 220, display: typeValue === null ? 'none' : 'flex' },
            nameStyle: {
                width: 100,
                textAlign: 'right',
                lineHeight: '2rem',
            },
            props: {
                defaultValue: typeValue === 0 ? appId : serverId,
                notFoundContent: '暂无数据',
                style: { width: 120 },
                onChange: (value) => {
                    typeValue === 0 ? setAppId(value) : setServerId(value)
                }
            },
            children: typeValue === 0 ? (allApplicationLists ? allApplicationLists.map((item) => {
                return {
                    props: {},
                    tag: 0,
                    type: 'Option',
                    value: item.appId,
                    key: item.appId,
                    name: item.appName,
                }
            }) : []) : (allServerLists ? allServerLists.map((item) => {
                return {
                    props: {},
                    tag: 0,
                    type: 'Option',
                    value: item.serverinfoID,
                    key: item.serverinfoID,
                    name: item.serverName,
                }
            }) : [])
        },
        {
            name: '申请日期',
            type: 'RangePicker',
            tag: 1,
            style: { width: 460 },
            nameStyle: {
                width: 100,
                textAlign: 'right',
                lineHeight: '2rem',
            },
            props: {
                placeholder: '',
                style: { width: 360 },
                showTime: {
                    hideDisabledOptions: true,
                },
                onChange: (date, dateString) => {
                    if (dateString){
                        if (dateString[0]) {
                            const timeBegin = moment(dateString[0]).format("x");
                            setSendTimeBegin(timeBegin)
                        } else {
                            setSendTimeBegin(null)
                        }
                        if (dateString[1]) {
                            const timeEnd = moment(dateString[1]).format("x");
                            setSendTimeEnd(timeEnd)
                        } else {
                            setSendTimeEnd(null)
                        }
                    }
                }
            }
        },
        // {
        //     name: '',
        //     type: 'Search',
        //     tag: 1,
        //     separate: true,
        //     style: {
        //         width: 200,
        //         position: 'absolute',
        //         right: '2rem',
        //     },
        //     props: {
        //         style: { width: 200 },
        //         placeholder: "请输入关键字",
        //         // enterButton:"Search",
        //         onSearch: (value) => {
        //             setKeyword(value);
        //             getMessageList({ value });
        //         }
        //     }
        // }
    ]
    const searchData = [
        {
            name: '',
            type: 'Search',
            tag: 1,
            separate: true,
            style: {
                width: 200,
            },
            props: {
                style: { width: 200 },
                placeholder: "请输入关键字",
                // enterButton:"Search",
                onSearch: (value) => {
                    setKeyword(value);
                    getMessageList({ value });
                }
            }
        }
    ]
    const dataObj = messageList;
    const list = dataObj && dataObj.entities && dataObj.entities.length > 0 ? dataObj.entities : [];
    //表格数据
    const dataSource = list.map((item, index) => {
        const { id, msgSourceName, topicName, timestamp, msgType,appName, supplierAccount, contents } = item;
        return {
            id,
            index,
            msgType,
            msgSourceName,
            topicName,
            timestamp,
            appName,
            supplierAccount,
            contents,
        }
    })
    //表格标题
    const columns = [{
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (text, item) => {
            const num = Number(text) + page * size;
            return `${num}`
        }
    }, {
        title: '主题名',
        dataIndex: 'topicName',
        key: 'topicName',
    }, {
        title: '供应商账号',
        dataIndex: 'supplierAccount',
        key: 'supplierAccount',
    // }, {
    //     title: '应用名',
    //     dataIndex: 'appName',
    //     key: 'appName',
    // }, {
    //     title: '消息概述',
    //     dataIndex: 'contents',
    //     key: 'contents',
    //     render: (text,item) => {
    //         return item.contents ? messageSketch(item.contents[0]):'';
    //     }
    // }, {
        title: '推送时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text,item) => {
            return moment(item.timestamp).format("YYYY-MM-DD HH:mm:ss");
        }
    // }, {
    //     title: '消息类型',
    //     dataIndex: 'msgType',
    //     key: 'msgType',
    //     render: (text, item) => {
    //         return messageType(item.msgType);
    //     }
    }, {
        title: '操作',
        dataIndex: 'operating',
        key: 'operating',
        render: (text, item) => {
            return <Button type="link" style={{padding:'0'}} onClick={() => {
                getMessageDetail(item.id);
                history.push({
                    pathname: '/messageDetail',
                })
            }}>查看</Button>
        }
    }]
    //表格属性
    const tableProps = {
        columns,
        dataSource,
        rowKey: record => record.index,
        pagination: {
            showQuickJumper: true,
            showTotal: total => `共 ${Math.ceil(total / size)}页/${total} 条数据`,
            pageSize: size,
            total: dataObj.totalElements || 0,
            pageSizeOptions: [10, 20, 50],
            showSizeChanger: true,
            onShowSizeChange: (current, size) => {
                dispatch({
                    type: 'message/setPageSize',
                    payload: size
                })
            }
        },
        onChange: (pagination) => {
            const pageNum = pagination.current - 1;
            const pageSize = pagination.pageSize;
            setPage(pageNum);
            getMessageList({ pageNum, pageSize });
        },
    }
    //获取列表
    function getMessageList({ pageNum, value, pageSize, themeId }) {
        dispatch({
            type: 'message/getMessageList',
            payload: {
                params: {
                    page: pageNum || pageNum === 0 ? pageNum : page,
                    topicId: themeId || topicId,
                    appId,
                    serverId,
                    keyword: value || value === '' ? value : keyword,
                    sendTimeBegin,
                    sendTimeEnd,
                    sendType: typeValue,
                    size: pageSize ? pageSize : size,
                },
                method: 'get',
                ContentType: 'application/json;charset=UTF-8'
            }
        })
    }
    //获取列表
    function getMessageDetail(id) {
        dispatch({
            type: 'message/messageDetail',
            payload: {
                params: {},
                id,
                method: 'get',
                ContentType: 'application/json;charset=UTF-8'
            }
        })
    }
    return (
        <div className={styles.container} >
            <PageHeader 
                title='消息推送记录' 
                onBack={null}
            />
            <SelectGroup selectDate={selectDate}/>
            <SelectGroup right selectDate={searchData} />
            <Table {...tableProps}/>
        </div>
    );
}

export default connect(({ message, login }) => {
    return {
        messageList: message.messageList,
        allThemeList: login.allThemeList,
        allApplicationList: login.allApplicationList,
        allServerList: login.allServerList,
        messageDetail: message.messageDetail,
        size: message.size,
    }
})(container()(MessageList));
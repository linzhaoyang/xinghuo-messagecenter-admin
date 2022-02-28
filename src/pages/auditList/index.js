import { useState, useEffect } from 'react';
import styles from './index.less';
import container from "@/pages/index";
import PageHeader from '@/pages/components/pageHeader';
import SelectGroup from './select';
import Table from './table'
import { connect } from 'umi'; 
import moment from 'moment';
import { deepCopy } from '@/public/js/function';
import {
    AuditButton,
    CheckButton
} from './audit';
/**
 * 审核列表的整合
*/
const auditList = (props) =>{
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [topicId, setTopicId] = useState('');
    const [appId, setAppId] = useState('');
    const [typeValue, setTypeValue] = useState(null)
    const [serverId, setServerId] = useState('');
    const [status, setStatus] = useState(null);
    // const [supplierAccount, setSupplierAccount] = useState('');
    const [createTimeBegin, setCreateTimeBegin] = useState(null);
    const [createTimeEnd, setCreateTimeEnd] = useState(null);
    const { dispatch, allThemeList, allApplicationList, allServerList, auditList, size } = props;
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
        // {
        //     name: '供应商',
        //     type: 'Input',
        //     tag: 1,
        //     style: { width: 300 },
        //     nameStyle: {
        //         width: 100,
        //         textAlign: 'right',
        //         lineHeight: '2rem',
        //     },
        //     props: {
        //         placeholder: '请输入供应商账号',
        //         style: { width: 200 },
        //         onChange: (e) => {
        //             const value = e.target.value;
        //             setSupplierAccount(value)
        //         }
        //     }
        // }, 
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
                    // defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                },
                onChange: (date, dateString) => {
                    if (dateString){
                        if (dateString[0]){
                            const timeBegin = moment(dateString[0]).format("x");
                            setCreateTimeBegin(timeBegin)
                        }else{
                            setCreateTimeBegin(null)
                        }
                        if (dateString[1]) {
                            const timeEnd = moment(dateString[1]).format("x");
                            setCreateTimeEnd(timeEnd)
                        } else {
                            setCreateTimeEnd(null)
                        }
                    }
                }
            }
        }, {
            name: '状态',
            type: 'Select',
            tag: 0,
            style: { width: 180 },
            nameStyle: {
                width: 80,
                textAlign: 'right',
                lineHeight: '2rem',
            },
            props: {
                defaultValue: status,
                notFoundContent: '暂无数据',
                style: { width: 80 },
                onChange: (value) => {
                    setStatus(value)
                }
            },
            children: [
                {
                    props: {},
                    tag: 0,
                    type: 'Option',
                    name: '全部',
                    key: null,
                    value: null
                },
                {
                    props: {},
                    tag: 0,
                    type: 'Option',
                    name: '待审核',
                    key: 0,
                    value: 0
                },
                {
                    props: {},
                    tag: 0,
                    type: 'Option',
                    name:'已审核',
                    key:1,
                    value: 1
                },
                {
                    props: {},
                    tag: 0,
                    type: 'Option',
                    name:'被驳回',
                    key:2,
                    value: 2
                },
            ]
        },
    ]
    //搜索框配置
    // const searchData = [
    //     {
    //         name: '',
    //         type: 'Search',
    //         tag: 1,
    //         separate: true,
    //         style: { width: 340 },
    //         props: {
    //             style: { width: 340 },
    //             placeholder: "请输入关键字",
    //             enterButton: "查询",
    //             onSearch: (value) => {
    //                 setKeyword(value);
    //                 getAuditList();
    //             }  
    //         }

    //     }
    // ]
    const searchData =[{
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
                getAuditList({value});
            }
        }
    }]
    //获取列表
    function getAuditList({pageNum,value,pageSize}) {
        dispatch({
            type: 'auditList/getAuditList',
            payload: {
                params: {
                    page: pageNum || pageNum === 0 ? pageNum : page,
                    topicId,
                    appId,
                    status,
                    keyword: value || value === '' ? value : keyword,
                    createTimeBegin,
                    createTimeEnd,
                    size: pageSize ? pageSize : size,
                    applyType: typeValue,
                },
                method: 'get',
                ContentType: 'application/json;charset=UTF-8'
            }
        })
    }
    //回显状态
    const statusDom = (key) => {
        switch (key) {
            case 1:
                return <span className={styles.audited}>已审核</span>;
            case 2:
                return <span className={styles.overrule}>被驳回</span>;
            default:
                return <span>待审核</span>;
        }
    }
    //操作按钮
    const operating = (item, key) => {
        switch (key) {
            case 0:
                return <AuditButton {...props} param={{
                    page,
                    topicId,
                    appId,
                    status,
                    // supplierAccount,
                    keyword,
                    createTimeBegin,
                    createTimeEnd,
                }} footer={true} onClick={() => {
                    if (item.id) {
                        dispatch({
                            type: 'auditList/auditDetails',
                            payload: {
                                params: {},
                                id: item.id,
                                method: 'get',
                                ContentType: 'application/json;charset=UTF-8'
                            }
                        })
                    }
                }}/>;
            case 1:
                return <CheckButton {...props}  onClick={() => {
                    if (item.id) {
                        dispatch({
                            type: 'auditList/auditDetails',
                            payload: {
                                params: {},
                                id: item.id,
                                method: 'get',
                                ContentType: 'application/json;charset=UTF-8'
                            }
                        })
                    }
                }} />;
            case 2:
                return <CheckButton {...props} onClick={() => {
                    if (item.id) {
                        dispatch({
                            type: 'auditList/auditDetails',
                            payload: {
                                params: {},
                                id: item.id,
                                method: 'get',
                                ContentType: 'application/json;charset=UTF-8'
                            }
                        })
                    }
                }} />;
            default:
                return '';
        }
    }
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
        title: '类型',
        dataIndex: 'typeText',
        key: 'typeText',
    },{
        title: '主题名',
        dataIndex: 'topicName',
        key: 'topicName',
    }, {
        title: '主题编码',
        dataIndex: 'topicCode',
        key: 'topicCode',
    }, {
        title: '应用名/服务名',
        dataIndex: 'appName',
        key: 'appName',
        render: (text, item) => {
            return item.type === 0 ? item.appName : item.serverName
        }
    }, {
        title: '应用ID/服务ID',
        dataIndex: 'appId',
        key: 'appId',
        render: (text, item) => {
            return item.type === 0 ? item.appId : item.serverId
        }
    }, {
        title: '供应商账号',
        dataIndex: 'supplierAccount',
        key: 'supplierAccount',
    }, {
        title: '申请时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text, item) => {
            return moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
        }
    }, {
        title: '操作',
        dataIndex: 'operating',
        key: 'operating',
        render: (text, item) => {
            return operating(item, text)
        }
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
            return statusDom(text)
        }
    }]
    const dataObj = auditList;
    const list = dataObj && dataObj.entities && dataObj.entities.length > 0 ? dataObj.entities : [];
    const typeText = (type) => {
        return type === 0 ? '应用' : '服务'
    }
    //表格数据
    const dataSource = list.map((item, index) => {
        const { id, topicCode, topicName, createTime, appName, serverName, supplierAccount, appId, serverId, status, applyType } = item;
        return {
            id,
            index,
            typeText: typeText(applyType),
            type: applyType,
            topicCode, 
            topicName, 
            createTime, 
            appName, 
            appId, 
            serverName,
            serverId,
            supplierAccount,
            operating: status,
            status,
        }
    })
    //表格属性
    const tableProps = {
        columns,
        dataSource,
        rowKey: record => record.index,
        pagination: {
            showQuickJumper: true,
            showTotal: total => `共 ${Math.ceil(total / size)}页/${total} 条数据`,
            pageSize:size,
            total: dataObj.totalElements || 0,
            pageSizeOptions: [10, 20, 50],
            showSizeChanger:true,
            onShowSizeChange: (current, size) => {
                dispatch({
                    type:'auditList/setPageSize',
                    payload:size
                })
            }
        },
        onChange: (pagination) => {
            const pageNum = pagination.current - 1 ;
            const pageSize = pagination.pageSize;
            setPage(pageNum);
            getAuditList({ pageNum, pageSize});
        },
        
        
    }
    return (
        <div className={styles.container} >
            <PageHeader 
                title='主题审核' 
                onBack={null}
            />
            <SelectGroup selectDate={selectDate}/>
            <SelectGroup right selectDate={searchData} />
            <Table {...tableProps}/>
        </div>
    );
}

export default connect(({ auditList,login }) => {
    return {
        auditList: auditList.auditList,
        auditDetails: auditList.auditDetails,
        allThemeList: login.allThemeList,
        allApplicationList: login.allApplicationList,
        allServerList: login.allServerList,
        size: auditList.size,
    }
})(container()(auditList));
import { useState, useEffect } from 'react'
import styles from './index.less';
import container from "@/pages/index";
import PageHeader from '@/pages/components/pageHeader';
import SelectGroup from './select';
import Table from './table';
import { connect } from 'umi';
import moment from 'moment';
import { Switch, message } from 'antd';
import { deepCopy } from '@/public/js/function';
/**
 * 权限管理的整合
*/
const authorityManagement = (props) =>  {
    const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(0);
    const [topicId, setTopicId] = useState('');
    const [appId, setAppId] = useState('');
    const [serverId, setServerId] = useState('');
    const [status, setStatus] = useState(null);
    const [createTimeBegin, setCreateTimeBegin] = useState(null);
    const [createTimeEnd, setCreateTimeEnd] = useState(null);
    const [typeValue, setTypeValue] = useState(null)
    const { dispatch, allThemeList, allApplicationList, allServerList, size } = props;
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
        {key: 0, value: '应用'},
        {key: 1, value: '服务'}
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
            }):[]
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
            name: typeValue === 0 ? '应用名称': '服务名称',
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
                    if (dateString) {
                        if (dateString[0]) {
                            const timeBegin = moment(dateString[0]).format("x");
                            setCreateTimeBegin(timeBegin)
                        } else {
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
                style: { width: 100 },
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
                    value: 1,
                    key:1,
                    name:'开启',
                },
                {
                    props: {},
                    tag: 0,
                    type: 'Option',
                    value: 0,
                    key:0,
                    name: '禁用'
                },
                
            ]
        },
    ]
    //查询按钮的配置
    // const searchData = [
    //     {
    //         name: '',
    //         type: 'Search',
    //         tag: 1,
    //         separate: true,
    //         style: {
    //             width: 340, 

    //         },
    //         props: {
    //             style: { width: 340 },
    //             placeholder: "请输入关键字",
    //             enterButton: "查询",
    //             onSearch: (value) => {
    //                 setKeyword(value);
    //                 getAuthorityManagementList();
    //             }  
    //         }
    //     }
    // ]
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
                    getAuthorityManagementList({ value });
                }
            }
        }
    ]
    function getAuthorityManagementList({ pageNum, value, pageSize}) {
        dispatch({
            type: 'authorityManagement/getAuthorityManagementList',
            payload: {
                params: {
                    page: pageNum || pageNum === 0 ? pageNum : page,
                    topicId,
                    appId,
                    serverId,
                    status,
                    keyword: value || value === '' ? value : keyword,
                    createTimeBegin,
                    createTimeEnd,
                    size: pageSize ? pageSize : size,
                    type: typeValue,
                },
                method: 'get',
                ContentType: 'application/json;charset=UTF-8'
            }
        })
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
        title: '应用名/服务名',
        dataIndex: 'appName',
        key: 'appName',
        render: (text, item) => {
            return item.type === 0 ? item.appName : item.serverName
        }
    }, {
        title: '供应商账号',
        dataIndex: 'supplierAccount',
        key: 'supplierAccount',
    }, {
        title: '主题名',
            dataIndex: 'topicName',
            key: 'topicName',
    }, {
        title: '供应商申请时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text,item) => {
            return moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
        }
    }, {
        title: '开启/禁用',
        dataIndex: 'status',
        key: 'status',
        render: (text, item) => {
            let state = item.status ? true : false;
            return <Switch defaultChecked={state} onChange={(value) => {
                    dispatch({
                        type: 'authorityManagement/setAuthority',
                        payload: {
                            params: {},
                            id: item.id,
                            value: state ? 0:1,
                            method: 'put',
                            ContentType: 'application/json;charset=UTF-8'
                        }
                    }).then((res) => {
                        if (res.data){
                            message.success(state ? '关闭权限成功' : '开启权限成功');
                            state = state ? false : true;
                        }else{
                            message.error(state ? '关闭权限失败' : '开启权限失败');
                        }
                    }).catch((err) => {
                        console.log('err',err);
                        // message.error(state ? '关闭权限失败' : '开启权限失败');
                    })
            }} />
        }
    }]
    const dataObj = props.authorityManagementList;
    const list = dataObj && dataObj.entities && dataObj.entities.length > 0 ? dataObj.entities : [];
    const typeText = (type) => {
        return type === 0 ? '应用' : '服务'
    }
    //表格数据
    const dataSource = list.map((item, index) => {
        const { id, type, appName, appId, serverId, supplierAccount, serverName, topicName, createTime, status} = item;
        return {
            id,
            index,
            typeText: typeText(type),
            type,
            appName, 
            appId,
            serverName, 
            serverId,
            supplierAccount, 
            topicName, 
            createTime, 
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
            showSizeChanger: true,
            onShowSizeChange: (current, size) => {
                dispatch({
                    type: 'authorityManagement/setPageSize',
                    payload: size
                })
            }
        },
        onChange:(pagination) => {
            const pageNum = pagination.current - 1;
            const pageSize = pagination.pageSize;
            setPage(pageNum);
            getAuthorityManagementList({pageNum,pageSize});
        },
    }
    return (
        <div className={styles.container} >
            <PageHeader 
                title='权限管理' 
                onBack={null}
            />
            <SelectGroup selectDate={selectDate} />
            <SelectGroup right selectDate={searchData} />
            <Table {...tableProps}  />
        </div>
    );
}

export default connect(({ authorityManagement,login }) => {
    return {
        authorityManagementList: authorityManagement.authorityManagementList,
        allThemeList: login.allThemeList,
        allApplicationList: login.allApplicationList,
        allServerList: login.allServerList,
        size: authorityManagement.size
    }
})(container()(authorityManagement))
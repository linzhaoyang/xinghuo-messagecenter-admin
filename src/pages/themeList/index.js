import { useState, useEffect } from 'react'
import styles from './index.less';
import Tabs from './tabs'
import container from "@/pages/index";
import { CreateTheme } from '@/pages/themeList/createTheme';
import Statistics from '@/pages/themeList/statistics';
import List from '@/pages/themeList/list';
import { Input, Row, Col, Button, Modal, message } from 'antd';
import { connect, history } from 'umi';
const { Search } = Input;
import { EditTheme } from './createTheme';
import { DeleteOutlined } from '@ant-design/icons';

/**
 * 主题列表的整合
 * Tabs 表头Tabs筛选和添加主题
 * Statistics 图表
 * List 主题列表
 * tabBarExtraContent 创建主题和搜索框
*/
const theme = (props) => {
    const [ keyword, setKeyword ] = useState('');
    const [ date, setDate ] = useState('1');
    const { 
        themeList,
        dispatch,
        allThemeList,
        allApplicationList,
        allServerList,
        userInfo,
        statistics,
    } = props;
    //设置一个一次性的监听，执行完后不再执行
    useEffect(function ()  {
        if (!allThemeList && userInfo.id) {
            dispatch({
                type: 'login/getAllThemelist',
                payload: {
                    method: 'get',
                    ContentType: 'application/json;charset=UTF-8'
                }
            })
        }
        if (!allApplicationList && userInfo.id) {
            dispatch({
                type: 'login/getAllApplicationlist',
                payload: {
                    method: 'get',
                    ContentType: 'application/json;charset=UTF-8'
                }
            })
        }
        if (!allServerList && userInfo.id) {
            dispatch({
                type: 'login/getAllServerlist',
                payload: {
                    method: 'get',
                    ContentType: 'application/json;charset=UTF-8'
                }
            })
        }
    }, []);
        const tabs = [
            { name: '今日',key:1},
            { name: '最近一周' ,key:7},
            { name: '最近一个月',key: 30},
        ]
        
        const tabBarExtraContent = () => {
            return <Row >
                <Col flex="1rem" >
                    <CreateTheme {...props} />
                </Col>
                <Col flex="auto" >
                    <Search placeholder="请输入关键词" 
                    enterButton 
                    onChange={(e) => {
                        const value = e.target.value
                        setKeyword(value)
                    }} 
                    style={{ paddingRight: '1rem' }} 
                    onSearch={(value) => {
                        setKeyword(value)
                        getThemeList({value})
                    }}/>    
                </Col>
            </Row>
        }
        /**
         * 热点词图表配置
        */
        const statisticsConfig = {
            title: {
                visible: false,
                text: '主题统计',
                style: {
                    fontSize: 18,
                    stroke: '#333',
                }
            },
            height:180,
            forceFit: true,
            data: statistics,
            padding: [20, 80, 60, 80],
            xField: 'word',
            yField: 'count',
            xAxis: {
                title: {
                    visible: false,
                },
            },
            yAxis: {
                title: {
                    visible: false,
                },
            },
        };
        /**
         * 主题图表配置
        */
        const themeConfig = {
            title: {
                visible: false,
                text: '主题统计',
                style: {
                    fontSize: 18,
                    stroke: '#333',
                }
            },
            height: 180,
            forceFit: true,
            data: themeList.map(item => { return { word: item.name, count: item.msgCount } }),
            padding: [20, 80, 60, 80],
            xField: 'word',
            yField: 'count',
            xAxis: {
                title: {
                    visible: false,
                },
            },
            yAxis: {
                title: {
                    visible: false,
                },
            },
        };
        function getThemeList({time,value}) {
            dispatch({
                type: 'theme/getThemeList',
                payload: {
                    params: {
                        date: time || time === 0 ? time: date,
                        keyword: value || value === 0 ? value : keyword,
                    },
                    method: 'get',
                    ContentType: 'application/json;charset=UTF-8'
                }
            })
        }
    //主题列表数据
    const list = themeList && themeList.length > 0 ? themeList.map((item, i) => {
        //删除按钮的配置
        const deleteProps = {
            style: { color: '#fff' },
            type: 'link',
            icon: < DeleteOutlined />,
            onClick: (e) => {
                checkThemeAuthorization({
                    item, callback: () => {
                        deleteTheme({item,callback:() => {
                            getThemeList({});
                        }})
                    } 
                });
                e.stopPropagation();
                e.preventDefault();
            }
        }
        return {
            title: item.name,
            number: item.msgCount,
            images: item.icon,
            topButton: <EditTheme {...props} tag='edit' onClick={(e) => {
                dispatch({
                    type: 'theme/getThemeDetails',
                    payload: {
                        params: {},
                        id: item.id,
                        method: 'get',
                        ContentType: 'application/json;charset=UTF-8'
                    }
                })
                e.stopPropagation();
                e.preventDefault();
            }} />,
            data:item,
            bottomButton: <Button {...deleteProps}></Button>,
        }
    }):[];
    //检查相关应用是否由关联授权
    function checkThemeAuthorization({item,callback}) {
        dispatch({
            type: 'theme/checkThemeAuthorization',
            payload: {
                params: {},
                id: item.id,
                method: 'get',
                ContentType: 'application/json;charset=UTF-8'
            }
        }).then((res) => {
            if (res && res.code === 200) {
                if (res.data && res.data.length > 0) {
                    const message = res.data.map((item, i) => {
                        return item.appName
                    }).join(',')
                    checkThemeAuthorizationModal({
                        title: '删除此主题将删除消息推送通道，造成相关应用消息业务不可用',
                        content: `相关应用：${message}`,
                        callback,
                    })
                } else {
                    checkThemeAuthorizationModal({
                        title: '确认要删除主题吗？',
                        callback,
                    })
                }
            } else {
                message.error('验证主题授权信息失败')
            }

        }).catch((err) => {
            console.log('err', err);
        })
    }
    //检查相关应用是否由关联授权反馈弹窗
    function checkThemeAuthorizationModal({ title, content, callback }) {
        Modal.confirm({
            title,
            content,
            okText: '确定删除',
            cancelText: '取消',
            okButtonProps: {
                type: 'primary',
                danger: true,
            },
            onOk: () => {
                if (callback) {
                    callback()
                }
            }
        });
    }
    //删除主题
    function deleteTheme({item,callback}) {
        dispatch({
            type: 'theme/deleteTheme',
            payload: {
                params: {},
                id: item.id,
                method: 'delete',
                ContentType: 'application/json;charset=UTF-8'
            }
        }).then((res) => {
            if (res && res.code === 200 && res.data === true) {
                message.success('删除主题成功');
                callback();
            } else {
                message.error('删除主题失败');
            }
        }).catch((err) => {
            console.error(err);
        })
    }
    function getStatistics({time}) {
        dispatch({
            type: 'theme/getStatistics',
            payload: {
                params: {
                    date: time,
                    // keyword: '',
                },
                method: 'get',
                ContentType: 'application/json;charset=UTF-8'
            }
        })
    }
        return (
            <div className={styles.container} >
                <Tabs tabs={tabs} defaultActiveKey={date} tabBarExtraContent={tabBarExtraContent} onChange={(time) => {
                    setDate(time)
                    getThemeList({ time});
                    getStatistics({ time});
                }} activeKey={date}/>
                <Statistics title='热点词统计' config={statisticsConfig}/>
                <Statistics title='主题统计' config={themeConfig}/>
                <List data={list} onClick={(e,item) => {
                    history.push({
                        pathname: '/messageList',
                        query: {
                            id: item.data.id
                        }
                    })
                    e.stopPropagation();
                    e.preventDefault();
                }}/>
            </div>
        );
}

export default connect(({ theme,login }) => {
    return {
        themeList: theme.themeList,
        themeDetails: theme.themeDetails,
        allThemeList: login.allThemeList,
        allApplicationList: login.allApplicationList,
        allServerList: login.allServerList,
        consumerID: login.consumerID,
        consumerName: login.consumerName,
        userInfo: login.userInfo,
        statistics: theme.statistics,
    }
})(container()(theme)) || !userInfo.id
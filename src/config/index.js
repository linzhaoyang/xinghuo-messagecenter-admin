import {
    MessageOutlined
} from '@ant-design/icons';
import React from 'react'
/**
 * 配置
 * route路由配置
 * ----这个对象用于跳转地址配置
 * {
 *      name:需要渲染的标题名
 *      icon:需要渲染的图标
 *      openKey: 拥有这个字段的是导航折叠标题，用于定位展开项
 *      type: 类型，暂时只有submenu和menu，operating 三个类型，submenu是子菜单，menu是菜单折叠栏 operating 是操作/非菜单跳转(例如：注销登录、个人主页)
 *      children:只有type = menu会有这个字段
 *      selectKey: 只有拥有path属性 会有这个字段，用于定位选择
 *      
 * }
 * 
*/

export default {
    route: [{
        name: '消息管理',
        icon: <MessageOutlined />,
        openKey:'message-0',
        type:'menu',
        children: [
            { name: '消息中心', icon: '', path: '/', exact: true,  component: '@/pages/themeList', selectKey:'message-0-0',type:'submenu',openKey:'message-0' },
            { name: '消息列表', icon: '', path: '/messageList', exact: true,  component: '@/pages/messageList', selectKey:'message-0-1',type:'submenu',openKey:'message-0' },
            { name: '审核列表', icon: '', path: '/auditList', exact: true, component: '@/pages/auditList', selectKey:'message-0-2',type:'submenu',openKey:'message-0' },
            { name: '权限管理', icon: '', path: '/authorityManagement', exact: true, component: '@/pages/authorityManagement', selectKey:'message-0-3',type:'submenu',openKey:'message-0' },
            { name: '消息详情 ', icon: '', path: '/messageDetail', exact: true, component: '@/pages/messageList/messageDetails', selectKey: 'message-0-1', type: 'operating', openKey: 'message-0' },
            // { name: '消息详情 > 已推送', icon: '', path: '/messageDetails-1', exact: true, component: '@/pages/messageList/messageDetails', selectKey: 'message-0-1', type: 'operating', openKey: 'message-0' },
        ]
    },{
            name: '注销登录', icon: '', path: '/login', exact: true, component: '@/pages/login', selectKey: 'login-0', type: 'operating',
    }]
}
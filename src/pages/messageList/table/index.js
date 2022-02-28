import { useEffect } from 'react'
import { Table } from 'antd';
import styles from './index.less';
import moment from 'moment';
import { Link, connect } from 'umi';
export default function table(props) {
    const status = (key) => {
        switch (key) {
            case 0:
                return <span>推送中</span>;
            case 1:
                return <span className={styles.Pushed}>已推送</span>;
            default:
                return '';
        }
    }  
    const columns = [{
        title:'序号',
            dataIndex:'serialNumber',
            key: 'serialNumber',
        }, {
            title: '主题名',
            dataIndex: 'themeName',
            key: 'themeName',
        }, {
            title: '应用名',
            dataIndex: 'applicationName',
            key: 'applicationName',
        }, {
            title: '供应商账号',
            dataIndex: 'supplierAccount',
            key: 'supplierAccount',
        }, {
            title: '消息标题',
            dataIndex: 'messageTitle',
            key: 'messageTitle',
        }, {
            title: '推送时间',
            dataIndex: 'pushTime',
            key: 'pushTime',
            render: (text) => {
                return moment(text).format("YYYY-MM-DD hh:mm:ss");
            }
        }, {
            title: '操作',
            dataIndex: 'operating',
            key: 'operating',
            render: (text) => {
                return <Link to={text ? '/messageDetails-1' :'/messageDetails-0'}>查看</Link>;
            }
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                return status(text);
            }
        }]

    
    // const dataSource = [
    //     {
    //         serialNumber: '1',
    //         themeName: '辖区管理',
    //         applicationName: '110警情',
    //         supplierAccount: 'xinghuo',
    //         messageTitle:'标题1',
    //         pushTime: 1535419062126,
    //         operating:0,
    //         status:0,
    //     }, {
    //         serialNumber: '2',
    //         themeName: '辖区管理2',
    //         applicationName: '110警情2',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题2',
    //         pushTime: 1535419062126,
    //         operating:1,
    //         status: 1,
    //     }, {
    //         serialNumber: '3',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 1,
    //         status: 1,
    //     }, {
    //         serialNumber: '4',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 1,
    //         status: 1,
    //     }, {
    //         serialNumber: '5',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 1,
    //         status: 1,
    //     }, {
    //         serialNumber: '6',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     }, {
    //         serialNumber: '7',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 1,
    //         status: 1,
    //     }, {
    //         serialNumber: '8',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     }, {
    //         serialNumber: '9',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 1,
    //         status: 1,
    //     }, {
    //         serialNumber: '10',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 1,
    //         status: 1,
    //     }, {
    //         serialNumber: '11',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 1,
    //         status: 1,
    //     }, {
    //         serialNumber: '12',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 1,
    //         status: 1,
    //     }, {
    //         serialNumber: '13',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 1,
    //         status: 1,
    //     }, {
    //         serialNumber: '14',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 1,
    //         status: 1,
    //     }, {
    //         serialNumber: '15',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 1,
    //         status: 1,
    //     }, {
    //         serialNumber: '16',
    //         themeName: '辖区管理3',
    //         applicationName: '110警情3',
    //         supplierAccount: 'xinghuo',
    //         messageTitle: '标题3',
    //         pushTime: 1535419062126,
    //         operating: 1,
    //         status: 1,
    //     }
    // ];
    return <div className={styles.container}><Table  {...props} /></div>
}   

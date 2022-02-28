import { Table } from 'antd';
import styles from './index.less';

/**
 * 审核表格组件
*/
export default function table(props) {
    // const { dispatch } = props
    // const status = (key) => {
    //     switch (key) {
    //         case 1:
    //             return <span className={styles.audited}>已审核</span>;
    //         case 2:
    //             return <span className={styles.overrule}>被驳回</span>;
    //         default:
    //             return <span>待审核</span>;
    //     }
    // }
    // const operating = (item,key) => {
    //     switch (key) {
    //         case 0:
    //             return <AuditButton {...props} footer={true}/>;
    //         case 1:
    //             return <CheckButton {...props}  onClick={() => {
    //                 if (item.themeId) {
    //                     dispatch({
    //                         type:'auditList/auditDetails',
    //                         payload: {
    //                             params: {}, 
    //                             id: item.themeId,
    //                             method: 'get',
    //                             ContentType: 'application/json;charset=UTF-8'
    //                         }
    //                     })
    //                 }
    //             }}/>;
    //         case 2:
    //             return <CheckButton {...props}  onClick={() => {
    //                 if (item.themeId){
    //                     dispatch({
    //                         type: 'auditList/auditDetails',
    //                         payload: {
    //                             params: {},
    //                             id: item.themeId,
    //                             method: 'get',
    //                             ContentType: 'application/json;charset=UTF-8'
    //                         }
    //                     })
    //                 }
    //             }}/>;
    //         default:
    //             return '';
    //     }
    // }
    // const columns = [{
    //         title:'序号',
    //         dataIndex:'serialNumber',
    //         key: 'serialNumber',
    //     }, {
    //         title: '主题名',
    //         dataIndex: 'themeName',
    //         key: 'themeName',
    //     }, {
    //         title: '主题ID',
    //         dataIndex: 'themeId',
    //         key: 'themeId',
    //     },{
    //         title: '应用名',
    //         dataIndex: 'applicationName',
    //         key: 'applicationName',
    //     }, {
    //         title: '应用ID',
    //         dataIndex: 'applicationId',
    //         key: 'applicationId',
    //     },{
    //         title: '供应商账号',
    //         dataIndex: 'supplierAccount',
    //         key: 'supplierAccount',
    //     }, {
    //         title: '申请时间',
    //         dataIndex: 'applicationTime',
    //         key: 'applicationTime',
    //         render:(text) => {
    //             return moment(text).format("YYYY-MM-DD hh:mm:ss");
    //         }
    //     }, {
    //         title: '操作',
    //         dataIndex: 'operating',
    //         key: 'operating',
    //         render: (text,item) => {
    //             return operating(item,text)
    //         }
    //     }, {
    //         title: '状态',
    //         dataIndex: 'status',
    //         key: 'status',
    //         render: (text) => {
    //             return status(text)
    //         }
    //     }]

    // const dataSource = [
    //     {
    //         serialNumber: '1',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId:'12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 1,
    //         status: 1,
    //     }, {
    //         serialNumber: '2',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId: '12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 2,
    //         status: 2,
    //     },
    //     {
    //         serialNumber: '3',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId: '12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     },
    //     {
    //         serialNumber: '4',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId: '12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     },
    //     {
    //         serialNumber: '5',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId: '12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     },
    //     {
    //         serialNumber: '6',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId: '12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     },
    //     {
    //         serialNumber: '7',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId: '12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     },
    //     {
    //         serialNumber: '8',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId: '12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     }, {
    //         serialNumber: '9',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId: '12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     }, {
    //         serialNumber: '10',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId: '12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     }, {
    //         serialNumber: '11',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId: '12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     }, {
    //         serialNumber: '12',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId: '12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     }, {
    //         serialNumber: '13',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId: '12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     }, {
    //         serialNumber: '14',
    //         themeName: '辖区管理',
    //         themeId: '1asdasdasdasd',
    //         applicationName: '110警情',
    //         applicationId: '12asdhahhah',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         operating: 0,
    //         status: 0,
    //     }
    // ];
    // // const dataSource = props.list.map((item) => {
    // //     return {
    // //         serialNumber: '3',
    // //         themeName: '辖区管理',
    // //         themeId: '1asdasdasdasd',
    // //         applicationName: '110警情',
    // //         applicationId: '12asdhahhah',
    // //         supplierAccount: 'xinghuo',
    // //         applicationTime: 1535419062126,
    // //         operating: 0,
    // //         status: 0,
    // //     }
    // // })
    // const tableProps = {
    //     columns,
    //     dataSource,
    //     rowKey: record => record.serialNumber,
    //     pagination: { 
    //         showQuickJumper:true,
    //         pageSize:'',
    //         showTotal: total => `共 ${Math.ceil(total/10)}页/${total} 条数据`,
    //         total:'',
    //     },
    //     onChange:props.onChange
    // }
    return <div className={styles.container}><Table  {...props} /></div>
}   
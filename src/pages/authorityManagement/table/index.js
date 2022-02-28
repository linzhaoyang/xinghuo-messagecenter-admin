import { Table } from 'antd';
import styles from './index.less'
/**
 * 权限管理的表格
*/
export default function table(props) {
    // const { dispatch } = props;
    // const onChange = (value) => {
    //     dispatch({
    //         type:'authorityManagement/setAuthority',
    //         payload: {
    //             params: {},
    //             id: item.themeId,
    //             value,
    //             method: 'put',
    //             ContentType: 'application/json;charset=UTF-8'
    //         }
    //     })
    // }
    // const columns = [{
    //         title:'序号',
    //         dataIndex:'serialNumber',
    //         key: 'serialNumber',
    //     }, {
    //         title: '应用名',
    //         dataIndex: 'applicationName',
    //         key: 'applicationName',
    //     }, {
    //         title: '供应商账号',
    //         dataIndex: 'supplierAccount',
    //         key: 'supplierAccount',
    //     }, {
    //         title: '主题名',
    //         dataIndex: 'themeName',
    //         key: 'themeName',
    //     }, {
    //         title: '供应商申请时间',
    //         dataIndex: 'applicationTime',
    //         key: 'applicationTime',
    //         render: (text) => {
    //             return moment(text).format("YYYY-MM-DD hh:mm:ss");
    //         }
    //     }, {
    //         title: '开启/禁用',
    //         dataIndex: 'status',
    //         key: 'status',
    //         render:(text,item) => {
    //             return <Switch defaultChecked={text} onChange={() => onChange(item)} />
    //         }
    //     }]

    // // const dataSource = [
    // //     {
    // //         serialNumber: '1',
    // //         applicationName:"辖区管理",
    // //         themeName: '辖区管理',
    // //         supplierAccount: 'xinghuo',
    // //         applicationTime: 1535419062126,
    // //         status:0,
    // //     },
    // //     {
    // //         serialNumber: '2',
    // //         applicationName: "辖区管理",
    // //         themeName: '辖区管理',
    // //         supplierAccount: 'xinghuo',
    // //         applicationTime: 1535419062126,
    // //         status: 1,
    // //     }
    // // ];
    // const dataSource = props.list.map((item) => {
    //     return {
    //         serialNumber: '2',
    //         applicationName: "辖区管理",
    //         themeName: '辖区管理',
    //         supplierAccount: 'xinghuo',
    //         applicationTime: 1535419062126,
    //         status: 1,
    //     }
    // })
    // const tableProps = {
    //     columns,
    //     dataSource,
    //     rowKey: record => record.serialNumber,
    //     pagination: { 
    //         showQuickJumper:true,
    //         showTotal: total => `共 ${Math.ceil(total/10)}页/${total} 条数据`,
    //     }
    // }
    return <div className={styles.container}><Table  {...props} /></div>
}   
import modelButton from "@/pages/components/modelButton";
import { Form, Input, Button, Select, Upload, message, Modal, Radio } from 'antd';
import styles from './index.less';
import {
    FormOutlined,
    UploadOutlined
} from '@ant-design/icons';
import { useState,useEffect } from "react";
const { Option } = Select;
/**
 * 创建和修改主题的组件
 * 
*/
const createTheme = (props) => {
    const {
        dispatch,
        allApplicationList,
        allServerList,
        consumerID,
        consumerName,
        themeDetails,
        tag,
        BackClick,
    } = props;
    const {
        id,
        name,
        code,
        remark,
        appIds,
        serverIds,
        icon,
        secret,
    } = themeDetails;
    console.log('themeDetails', themeDetails)
    const [form] = Form.useForm();
    // const [icon, setIcon] = useState(icon||'')
    const [fileList,setFileList] = useState([]);
    const [themeDetail, setThemeDetail] = useState({});
    const [visible,setVisible] = useState(false)
    // const [applyType, setApplyType] = useState(0)
    /**
     * 校验主题id重复
    */
    const [validateCodeStatus, setValidateCodeStatus] = useState(tag === 'edit' ? 'success' : 'warning');
    const [validateCodeMsg, setValidateCodeMsg] = useState('');
    /**
     * 校验主题名重复
    */
    const [validateNameStatus, setValidateNameStatus] = useState(tag === 'edit' ? 'success' : 'warning');
    const [validateNameMsg, setValidateNameMsg] = useState('');
    useEffect(() => {
        return () => {
            //清除详情
            dispatch({
                type: 'theme/saveThemeDetails',
                payload: {},
            });
        };
    }, []);
    const { setFieldsValue } = form;
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };
    
    const onFinish = values => {
        if (values){
            if (values.fileList && values.fileList[0] && values.fileList[0].uid !== "-1"){
                const formData = new FormData();
                formData.append('consumerID', consumerID);
                formData.append('consumerName', consumerName);
                formData.append('fileList',values.fileList[0].originFileObj);
                //上传主题图标
                dispatch({
                    type: 'theme/upload',
                    payload: {
                        data: formData,
                        headers: {
                            'requestType': 'zuul'
                        },
                        method: 'post',
                    }
                }).then((res) => {
                    //判断是否有详情，没有时判断为创建页面
                    if (tag === 'edit'){
                        editTheme({res, values});
                    }else{
                        createTheme({res, values});
                    }
                    
                }).catch((err) => {
                    console.log('err',err);
                })
            }else{
                if (tag === 'edit') {
                    editTheme({values});
                } else {
                    createTheme({values});
                }
            }
        }
    };
    //创建主题
    function createTheme({res, values}) {
        const fullPath = res && res.data && res.data.fullPath ? res.data.fullPath : icon;
        const {
            name,
            code,
            remark,
            appIds,
            serverIds,
            secret,
        } = values;
        dispatch({
            type: 'theme/createTheme',
            payload: {
                data: {
                    name,
                    code,
                    icon:fullPath,
                    remark,
                    appIds: appIds ? appIds.join(',') : '',
                    serverIds: serverIds ? serverIds.join(',') : '',
                    secret,
                },
                method: 'post',
            }
        }).then(() => {
            message.success('创建成功');
            getThemeList();
            BackClick();
        }).catch((err) => {
            console.log('err',err);
            // message.success('创建失败')
        })
    }
    //修改主题
    function editTheme({res, values}) {
        const fullPath = res && res.data && res.data.fullPath ? res.data.fullPath : icon;
        const {
            name,
            code,
            remark,
            appIds,
            serverIds,
            secret,
        } = values;
        dispatch({
            type: 'theme/editTheme',
            payload: {
                data: {
                    name,
                    code,
                    icon: fullPath,
                    remark,
                    appIds: appIds ? appIds.join(',') : '',
                    serverIds: serverIds ? serverIds.join(',') : '',
                    secret,
                },
                id,
                method: 'put',
            }
        }).then(() => {
            message.success('修改成功');
            getThemeList();
            BackClick();
        }).catch((err) => {
            console.log('err',err);
            // message.success('修改失败');
        })
    }
    /**
     * 获取主题列表
    */
    function  getThemeList() {
        dispatch({
            type: 'theme/getThemeList',
            payload: {
                params: {
                    date: 1,
                    keyword: '',
                },
                method: 'get',
                ContentType: 'application/json;charset=UTF-8'
            }
        })
    }
    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    
    /**
    * 文件属性
    * 
    * */ 
    const uploadProps = {
        listType:"picture-card",
        multiple:false,
        accept:'.png,.jpg,.jpeg',
        customRequest:() => {
            //覆盖框架默认上传行为
            return
        },
        onPreview: ()=>{
            setVisible(true)
            return false
        },
        onRemove: () => {
            setFileList([])
            setFieldsValue({
                fileList: [],
            });
            return false;
        },
        onChange: ({ file }) => {
            if (file && file.status === "uploading"){
                //添加url属性渲染图片
                file.url = file.thumbUrl;
                //改变状态为结束，图标才能显示
                file.status = 'done';
                setFileList([file]);
                setFieldsValue({
                    fileList: [file],
                });
            }
        },
        fileList: fileList,
    };
    /**
     * 自定义校验文件
    */
    const checkFile = (rule, value) => {
        if (value && value.length > 0) {
            return Promise.resolve();
        }
        return Promise.reject('请选择图标');
    };
    const checkNameValidator = (rule, value) => {
        if (!value || value === ''){
            setValidateNameStatus('error')
            return Promise.reject('');
        }else if (validateNameStatus && validateNameStatus === 'error') {
            return Promise.reject(validateNameMsg);
        } else {
            setValidateNameStatus('sucess')
            return Promise.resolve('');
        }
    }
    const checkCodeValidator = (rule, value) => {
        var patt = /^[A-Za-z][A-Za-z0-9]{5,35}$/;
        if (!value || value === '') {
            setValidateCodeStatus('error');
            return Promise.reject('');
        }else if (!patt.test(value)){
            setValidateCodeStatus('error');
            return Promise.reject('主题编码必须字母开头,由6-36位字母或数字组成');
        }else if (validateCodeStatus && validateCodeStatus === 'error') {
            setValidateCodeStatus('error');
            return Promise.reject(validateCodeMsg);
        } else {
            setValidateCodeStatus('sucess');
            return Promise.resolve('');
        }
    }
    /**
     * 校验id
    */
    const checkCode = (e) => {
        const value = e.target.value;
        if (!!value){
            setValidateCodeStatus('loading');
            dispatch({
                type: 'theme/checkThemeCode',
                payload: {
                    params: { code: value },
                    method: 'get',
                }
            }).then((res) => {
                if (res.code === 200){
                    setValidateCodeStatus('success');
                    setValidateCodeMsg('');
                }else{
                    setValidateCodeStatus('error');
                    setValidateCodeMsg(res.msg);
                }
            }).catch((err) => {
                setValidateCodeStatus('error');
                console.log(err);
            })
        }
        
    }
    /**
     * 校验name
    */
    const checkName = (e) => {
        const value = e.target.value;
        if (!!value){
            setValidateNameStatus('loading')
            dispatch({
                type: 'theme/checkThemeName',
                payload: {
                    params: { name: value },
                    method: 'get',
                }
            }).then((res) => {
                if(res.code === 200){
                    setValidateNameStatus('success');
                    setValidateNameMsg('');
                }else{
                    setValidateNameStatus('error');
                    setValidateNameMsg(res.msg);
                }
            }).catch((err) => {
                setValidateNameStatus('error');
                console.log('err',err);
            })
        }
    }
    if (!themeDetail.id && !!themeDetails.id) {
        if (icon && fileList.length === 0) {
            const file = {
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: icon,
                thumbUrl: icon,
            }
            setFileList([file])
            setFieldsValue({
                name,
                code,
                remark,
                fileList: [file],
                secret,
                appIds: appIds ? appIds.split(',') : [],
                serverIds: serverIds ? serverIds.split(',') : [],
            });
            setThemeDetail(themeDetails)
        } else {
            setFieldsValue({
                name,
                code,
                remark,
                secret,
                appIds: appIds ? appIds.split(',') : [],
                serverIds: serverIds ? serverIds.split(',') : [],
            });
            setThemeDetail(themeDetails)
        }
    }

    return (
        <Form
            className={styles.createTheme}
            form={form} 
            {...layout}
            name="createTheme"
            initialValues={{ name: '', code: '', remark: '', appIds, secret:1,fileList: fileList }}
            onFinish={(values) => { onFinish(values)}}
            onFinishFailed={(errorInfo) => { onFinishFailed(errorInfo)}}
        >
            <Form.Item
                label="主题名称"
                name="name"
                rules={[
                    { required: true}, 
                    { validator: checkNameValidator },
                ]}
                hasFeedback
                validateStatus={validateNameStatus}
            >
                <Input onBlur={(e) => {checkName(e)}} disabled={tag === 'edit'}/>
            </Form.Item>

            <Form.Item
                label="主题编码"
                name="code"
                rules={[
                    { required: true}, 
                    { validator: checkCodeValidator },
                    // { pattern: /^[A-Za-z][A-Za-z0-9]{5,35}$/, message:'主题编码必须字母开头,由6-36位字母和数字组成'},
                ]}
                hasFeedback
                validateStatus={validateCodeStatus}
            >
                <Input onBlur={(e) => {checkCode(e)}} disabled={tag === 'edit'} placeholder='主题编码必须字母开头,由6-36位字母或数字组成'/>
            </Form.Item>
            <Form.Item
                label="主题概述"
                name="remark"
                rules={[{ required: true, message: '请填写主题概述' }]}
            >
                <Input.TextArea autoSize={{minRows: 3, maxRows: 6 }} />
            </Form.Item>
            {/* <Form.Item
                label="请选择接收类型"
                name="applyType"
                rules={[{ required: true, message: '请选择接收类型' }]}
            >
                <Radio.Group onChange={setApplyType}>
                    <Radio value={0}>应用</Radio>
                    <Radio value={1}>服务</Radio>
                </Radio.Group>
            </Form.Item> */}
            <Form.Item
                label="选择接收应用"
                name="appIds"
                rules={[{ required: false, message: '请选择接收应用' }]}
            >
                <Select mode="multiple" 
                style={{ width: '100%' }} 
                placeholder="请选择接收应用" 
                optionFilterProp="children"
                showSearch
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                    {
                        allApplicationList && allApplicationList.length > 0 ? allApplicationList.map((item,i) => {
                            return <Option value={item.appId} key={i}>{item.appName}</Option>
                        }):''
                    }
                </Select>
            </Form.Item>
            <Form.Item
                label="选择接收服务"
                    name="serverIds"
                rules={[{ required: false, message: '请选择接收服务' }]}
            >
                <Select mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="请选择接收服务"
                    optionFilterProp="children"
                    showSearch
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }>
                    {
                        allServerList && allServerList.length > 0 ? allServerList.map((item, i) => {
                            return <Option value={item.serverinfoID} key={i}>{item.serverName}</Option>
                        }) : ''
                    }
                </Select>
            </Form.Item>
            <Form.Item
                label="分级"
                name="secret"
            >
                <Radio.Group>
                    <Radio value={0}>非涉密</Radio>
                    <Radio value={1}>涉密</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="主题图标"
                name="fileList"
                rules={[{ required: true, message: '请选择主题图标' },{ validator: checkFile }]}
            >
                <div>
                    <Upload {...uploadProps}>
                        {fileList.length === 0 ? <Button type="link">
                            <UploadOutlined /> 
                        </Button> : ''}
                        
                    </Upload>
                    <Modal
                        visible={visible}
                        onCancel={() => { setVisible(false) }}
                        footer={null}
                    >
                        <img style={{width:'100%',height:'auto'}} src={fileList[0] ? fileList[0].thumbUrl : ''} />
                    </Modal>
                </div>
            </Form.Item>
            <Form.Item {...tailLayout} style={{paddingTop:'5rem'}}>
                <Button style={{ marginRight: '5rem', width: '7rem' }} onClick={() => {BackClick()}}>
                    取消
                </Button>
                <Button style={{ width: '7rem' }} type="primary" htmlType="submit" >
                    提交
                </Button>
            </Form.Item>
            
        </Form>
    )
    
}
const CreateTheme = modelButton({
    ButtonProps: {
        name: '+ 创建主题',
        type: 'primary',
        style: { margin: '0 2rem' }
    },
    ModalProps: {
        footer: null,
        title: '创建主题',
        width: '50rem',
        destroyOnClose:true,
    },
})(createTheme);

const EditTheme = modelButton({
    ButtonProps: {
        type: 'link',
        icon: <FormOutlined />,
        style: { color: '#fff' }
    },
    ModalProps: {
        footer: null,
        title: '修改主题',
        width: '50rem',
        destroyOnClose:true,
    },
})(createTheme);
export {
    EditTheme,
    CreateTheme
}
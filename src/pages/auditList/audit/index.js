
import modelButton from "@/pages/components/modelButton";
import { useEffect, useState } from 'react';
import { Form, Button, message, Input, Modal } from 'antd';
import styles from './index.less';
import { download } from '@/public/js/function'
/**
 * 审核主题的组件
 * 
*/
const audit = (props) => {
    
    const { 
        dispatch, 
        footer, 
        auditDetails, 
        param, 
        BackClick,
    } = props;
    const { 
        appId,
        appName,
        serverName,
        serverId,
        applyReason,
        id,
        applyType,
        supplierAccount,
        tel,
        topicCode,
        topicName,
        fileUrl,
        fileName,
    } = auditDetails;

    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 18 },
    };
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    function handleClick(tag, rejectReason){
        dispatch({
            type:'auditList/submitReview',
            payload: {
                data: {
                    rejectReason
                },
                id,
                tag,
                method: 'put',
                ContentType: 'application/json;charset=UTF-8'
            }
        }).then((res) => {
            if(res.data){
                message.success('审核成功');
                BackClick();
                getAuditList(param);
            }else{
                message.error('审核失败');
            }
        }).catch((err) => {
            console.log(err);
            // message.error('审核失败');
        })
    }
    function reject(tag)  {
        //驳回的理由
        let rejectReason = '';
        Modal.info({
            title: '请写驳回理由',
            content: (
                <Input.TextArea 
                    autoSize={{ minRows: 4, maxRows: 6 }} 
                    style={{ resize: 'none' }} 
                    onChange={(e) => { rejectReason = e.target.value }}
                />
            ),
            onOk:function(){
                handleClick(tag,rejectReason)
            },
            okText:'驳回',
        })
    }
    function getAuditList() {
        //获取审核列表
        dispatch({
            type: 'auditList/getAuditList',
            payload: {
                parmas: param,
                method: 'get',
                ContentType: 'application/json;charset=UTF-8'
            }
        })
    }
    useEffect(() => {
        return () => {
            //清除详情
            dispatch({
                type: 'auditList/saveAuditDetails',
                payload: {},
            });
        };
    }, []);
    return (
        <Form
            className={styles.audit}
            {...layout}
            name="audit"
            // initialValues={{ 
            //     appId,
            //     appName,
            //     applyReason,
            //     id,
            //     status,
            //     supplierAccount,
            //     tel,
            //     topicCode,
            //     topicName,
            //     fileUrl,
            // }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="主题名称"
                // name="topicName"
            >
                {topicName}
            </Form.Item>

            <Form.Item
                label="主题编码"
                // name="topicCode"
            >
                {topicCode}
            </Form.Item>
            <Form.Item
                label={applyType === 0 ? "应用名称": "服务名称"}
                // name="appName"
            >
                {applyType === 0 ? appName: serverName}
            </Form.Item>
            <Form.Item
                label={applyType === 0 ? "应用ID":"服务ID"}
                // name="appId"
            >
                {applyType === 0 ? appId : serverId}
            </Form.Item>
            <Form.Item
                label="供应商账号"
                // name="supplierAccount"
            >
                {supplierAccount}
            </Form.Item>
            <Form.Item
                label="联系方式"
                // name="tel"
            >
                {tel}
            </Form.Item>
            <Form.Item
                label="申请理由"
                // name="applyReason"
            >
                {applyReason}
            </Form.Item>
            {fileUrl ? <Form.Item
                label="上传附件"
                // name="fileUrl"
            >
                <Button type="link" onClick={() => {
                    if (!!fileUrl){
                        download(fileUrl, fileName);
                    }
                    // console.log('fileUrl,fileName', fileUrl, fileName);
                }} > {fileName}</Button>
            </Form.Item> : ''}
            {footer ?<Form.Item {...tailLayout}>
                <Button style={{ marginRight: '4rem', width: '7rem' }} onClick={() => { reject(2)}}>
                    驳回
                </Button>
                <Button style={{ width: '7rem' }} type="primary" onClick={() => {handleClick(1)}} >
                    通过
                </Button>
            </Form.Item> :''}

        </Form>
    )

}
/**
 * 审核页面
*/
const AuditButton = modelButton({
    ButtonProps: {
        name: '审核',
        type: 'link',
        style: { padding: '0' }
    },
    ModalProps: {
        footer: null,
        title: '审核',
        width: '50rem',
    },
})(audit);
/**
 * 查看审核页面
*/
const CheckButton = modelButton({
    ButtonProps: {
        name: '查看',
        type: 'link',
        style: { padding: '0' }
    },
    ModalProps: {
        footer: null,
        title: '审核详情',
        width: '50rem',
    },
})(audit);
export {
    AuditButton,
    CheckButton,
}
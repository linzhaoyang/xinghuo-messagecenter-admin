import React from 'react';
import { history, connect } from 'umi';
import styles from './index.less';
import { Form, Button, Input} from 'antd';
import logo from '@/pages/images/logo.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import JSEncrypt from 'jsencrypt';
import tryCatch from '@/public/js/trycatch';

/**
 * 登录页面
*/
const login = (props) => {
    const layout = {
        labelCol: { span: 0 },
        wrapperCol: { span: 24 },
    };
    const tailLayout = {
        wrapperCol: { offset: 0, span: 24 },
    };

    const onFinish = values => {
        const { dispatch } = props;
        const userInfos = {
            ...values,
            loginType: 'PC',
        };
        //rsa加密
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(props.publicKey);
        let userInfo = tryCatch(JSON.stringify(userInfos))
        userInfo = encrypt.encrypt(userInfo);
        //登录
        dispatch({
            type: 'login/login',
            payload: {
                data: {
                    userInfo,
                },
                method: 'post',
                ContentType: 'application/json;charset=UTF-8'
            }
        }).then(() => {
            history.push({
                pathname: '/',
            });
        }).catch((err) => {
            console.log('err',err)
        })

    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <header className={styles.header}>
                    <img className={styles.logo}  src={logo} /><span className={styles.name}>管理员平台登录</span>
                </header>
                <Form
                    
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="userName"
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input prefix={<UserOutlined />} size="large"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} size="large"/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" block style={{ marginTop: '3rem' }} size="large">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default connect(({ login }) => {
    return {
        publicKey: login.publicKey,
    }
})(login)
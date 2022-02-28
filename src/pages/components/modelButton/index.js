import React, { useState }from "react";
import { Modal, Button } from "antd";

/**
 * 按钮弹窗组件，点击后将弹出窗口
 *  参数接收 ButtonProps, ModalProps 两个属性，一个是按钮的属性，一个是弹窗的属性，与antd的api相同。
 *  props 是传给弹出页面的。
*/
export default ({ ButtonProps, ModalProps }) => WComponent => function modelButton(props){
    const [visible, setVisible] = useState(false);
    // //分离属性，将按钮名和其他属性分开
    const { name,...buttonProps } = ButtonProps;
    const { onClick, ...ontherProps } = props;
    return(
        <React.Fragment>
            <Button
                {...buttonProps}
                onClick={(e) => { 
                    if (!!onClick) { 
                        onClick(e);
                    }   
                    setVisible(true);  
                }}
            >{name}</Button>
            <Modal
                visible={visible}
                onCancel={() => {setVisible(false)}}
                {...ModalProps}
            >
                <WComponent {...ontherProps} 
                    BackClick={() => {setVisible(false)}}
                />
            </Modal>
        </React.Fragment>
    )   
}

/**
 * 注册dva 
 * redux-logger 打印redux输出的数据
 * 
 * 
 * 
 */
// import { createLogger } from 'redux-logger';
export const dva = {
    config: {
        // onAction: createLogger(),
        onError(e) {
            console.error(e.message);
        }
    },
};

import request from 'umi-request';
import trycatch from './trycatch';
import exceptionInformation from './exceptionInformation';
import unusualEvent from './unusualEvent';
import { message } from 'antd';

/***
 * 消息响应配置
 * duration: 2, //延迟两秒消失
 * maxCount: 2, //最大显示数
 * rtl: true,   //是否开启 RTL 模式
*/
message.config({
    duration: 2, 
    maxCount: 2,
    rtl: true,
});
/**
 * 拦截器
 *   
 * 
*/
//提前对响应做异常处理
request.interceptors.response.use((response )=> {
    response.clone().json().then(
        res => {
            if (res.code !== 200){
                message.destroy();
                message.error(exceptionInformation(res.code,res.msg));
                unusualEvent(res.code, res.msg);
            }
        }
    )
    return response
});
/***
 * request 网络请求工具
 * 传入的参数 { url,options }
 * params:{
 *      url:'地址',
 *      options:{
 *          method: 'post',
 *          data: data, //get以外 传参 请求中使用
 *          params: params, //get 传参 请求中使用
 *          ....
 *      },
 * }
*/
function requests(params) {
    const promise = new Promise((resolve, reject) => {
        request(params.url, params.options).then((res) => {
            if(res.code === 200){
                trycatch(resolve(res));
            }else{
                trycatch(reject(res));
            }
            
        }).catch((err) => {
            console.log('err',err);
            trycatch(reject(err));
        })
    }) 
    return promise;
}

export default requests;

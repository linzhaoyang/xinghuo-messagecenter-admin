/** 
 * 
 * 异常响应码封装
 * 
*/

export default function errorMessage(key, msg) {
    switch (key) {
        case 403:
            return `参数错误:${msg}`;
        case 404:
            return `操作失败:${msg}`;
        case 500:
            return `服务端异常:${msg}`;
        case 601:
            return `权限校验未通过:${msg}`;
        case 602:
            return `参数错误:${msg}`;   
        case 603:
            return `非法操作:${msg}`;  
        case 604:
            return `目标资源未找到:${msg}`;  
        case 605:
            return `url不合法:${msg}`; 
        case 701:
            return `用户名或密码错误:${msg}`;
        case 702:
            return `密码连续错误，账号已被禁用，请联系管理员解禁:${msg}`;
        case 801:
            return `身份信息已过期:${msg}`;
        case 802:
            return `token过期，请重新登录:${msg}`;
        default:
            return `未知错误:${msg}`;
    }
}

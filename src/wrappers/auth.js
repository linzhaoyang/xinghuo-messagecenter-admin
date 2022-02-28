import { JSCookie } from '@/public/js/function';
/**
 * 用户身份鉴权
 * 
 * 暂时只支持用户身份信息失效
*/
export function useAuth() {
    const userInfo = JSCookie.getCookie("userInfo");
    if (!userInfo || userInfo ===  '{}') {
        return false
    } else{
        return true
    }
}
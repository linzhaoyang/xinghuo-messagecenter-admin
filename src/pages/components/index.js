/**
 * 封装按需加载异步组件
 * 将组件在这里引入，配置按需加载
 * 
 * 使用时像使用普通组件一样即可
 * dynamic 为你做:
 * 1. 异步加载该模块的 bundle
 * 2. 加载期间 显示 loading（可定制）
 * 3. 异步组件加载完毕后，显示异步组件
 * 
 * 路由相关的组件已做了按需加载，这部分只在子组件上做处理
 * 
 * 主要用于弹出式页面组件
*/

import { dynamic } from 'umi';
export default dynamic({
    loader: async function () {
        const { default: Loading } = await import('./Loading');
        return {Loading};
    },
});
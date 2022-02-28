import { defineConfig, utils } from 'umi';

const { winPath } = utils;
const config = require('./src/config');
const { treeGoArray } = require('./src/public/js/function');

/**
 * 解析默认配置中的路由配置对象
 * 先把tree对象转换成数组
 * 然后过滤没有path属性的（例如：菜单折叠项）。没有path表示没有跳转功能
 * 最终组合成 routes 用于路由配置 
*/
const routes = treeGoArray(config.default.route).filter((item: any) => 'path' in item);

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: { //开放dva支持
    immer: true,
    hmr: false,
  },
  //国际化配置
  locale: {
    default: 'zh-CN',
    antd: true,
    title: true,
    baseNavigator: true,
    baseSeparator: '-',
  },
  cssLoader: {
    // 这里的 modules 可以接受 getLocalIdent
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }
        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
      },
    }
  },
  //配置路由辨识的入口
  routes: routes,
  hash: true,
  history: {
    type: 'hash',
  }, 
  proxy: { //代理 
    '/messageManage': {
      'target': 'http://20.97.8.121:3009/',
      // 'target': 'http://218.17.105.178:20023/',
      // 'target':'http://172.168.1.149:8080',
      'changeOrigin': true,
      'pathRewrite': { '^/messageManage': '/messageManage' },
    },
    '/ga': {
      'target': 'http://20.97.8.167:80/',
      'changeOrigin': true,
      'pathRewrite': { '^/ga': '/ga' },
    },
  },
});

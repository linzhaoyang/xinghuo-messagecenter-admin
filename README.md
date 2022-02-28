此项目由 react+umi+dva+antd 搭建

初始化项目：
1.npm install 安装依赖
2.npm run start/umi dev 运行
3.npm run build/umi build 打包
目录结构：
-src：
    -.umi： umi内置文件 相关文件是自动生成的，改动无效，会被覆盖
    -config： 配置文件
    -public ： 存放公共文件 （例如修改antd样式的公用文件）
        -less ： 公用css文件
        -js：公用js方法（例如：xhr请求的封装文件、异常处理文件）
    -images：图片存放文件夹
    -pages：组件文件夹
        -components： 公用组件 
            -index.js： 公用组件的入口文件，通过这个文件导出的文件将添加按需加载
        -<ui> ui组件： 所有ui组件都差不多的目录结构。在文件夹中创建models然后通过app.js自动注册
            -models： redux的相关处理文件
            -index.js： 入口文件
            -index.less： 样式文件
            -<uicomponents> 相关子ui组件
                -index.js： 子ui组件的入口文件
                -index.less： 样式文件
    -wrappers：用户鉴权文件，用于验证登录超时或者用户被挤出
        -index.js： 鉴权处理文件
        - *.js ：鉴权相关方法文件
    -app.js： 入口文件
-.umirc.ts: umi默认配置文件 启用相关插件的配置 路由相关的配置也在这里

路由配置
umi 会通过 umirc.ts中的配置路径，通过路径的方式定位路由结构

约定式的 model 组织方式 
符合以下规则的文件会被认为是 model 文件，
    src/models 下的文件
    src/pages 下，子目录中 models 目录下的文件
    src/pages 下，所有 model.js 文件
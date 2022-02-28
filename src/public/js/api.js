

import requests from './request';

/***
 * 接口调用 api
 * 
*/

/***
 * 获取主题列表
*/
export async function getThemeList(param) {
    const params = {
        url: `/messageManage/web/topic/all/count/admin`,
        options: { ...param },
    };
    return requests(params);
}
/***
 * 获取消息列表
*/
export async function getMessageList(param) {
    const params = {
        url: `/messageManage/web/message/page/admin`,
        options: { ...param },
    };
    return requests(params);
}
/***
 * 获取审核列表
*/
export async function getAuditList(param) {
    
    const params = {
        url: `/messageManage/web/apply/page/admin`,
        options: { ...param },
    };
    return requests(params);
}
/***
 * 获取权限管理列表
*/
export async function getAuthorityManagementList(param) {
    const params = {
        url: `/messageManage/web/auth/page/admin`,
        options:{...param},
    };
    return requests(params);
}

/**
 * 登录
*/
export async function Login(param) {
    const params = {
        url: `/messageManage/index/login/admin`,
        options: { ...param },
    };
    return requests(params);
}
/**
 * 登出
*/
export async function Logout(param) {
    const params = {
        url: `/messageManage/index/logout/admin`,
        options: { ...param },
    };
    return requests(params);
}
/**
 * 创建主题
*/
export async function createTheme(param) {
    const params = {
        url: `/messageManage/web/topic/admin`,
        options: { ...param },
    };
    return requests(params);
}
/**
 * 修改主题
*/
export async function editTheme(param) {
    const { id, ...otherParams } = param;
    const params = {
        url: `/messageManage/web/topic/${id}/admin`,
        options: { ...otherParams },
    };
    return requests(params);
}


/**
 * 提交审核
*/

export async function submitReview(param) {
    const { id, tag, ...otherParams } = param;
    const params = {
        url: `/messageManage/web/apply/${id}/examine/${tag}/admin`,
        options: { ...otherParams },
    };
    return requests(params);
}
/**
 * 查看审核内容
*/

export async function viewReviewContent(param) {
    const { id, ...otherParams } = param;
    const params = {
        url: `/messageManage/web/apply/${id}/admin`,
        options: {...otherParams}
    };
    return requests(params);
}
/**
 * 查看主题内容
*/

export async function viewTopicContent(param) {
    const { id, ...otherParams } = param;
    const params = {
        url: `/messageManage/web/topic/${id}/admin`,
        options: { ...otherParams }
    };
    return requests(params);
}
/**
 * 开启/关闭权限
*/

export async function operationAuthority(param) {
    const { id, value, ...otherParams } = param;
    const params = {
        url: `/messageManage/web/auth/${id}/${value}/admin`,
        options: { ...otherParams }
    };
    return requests(params);
}
/**
 * 消息详情
*/
export async function messageDetail(param) {
    const { id,  ...otherParams } = param;
    const params = {
        url: `/messageManage/web/message/${id}/admin`,
        options: { ...otherParams }
    };
    return requests(params);
}

/**
 * 热点词、主题统计
*/

export async function statistics(param) {
    const params = {
        url: `/messageManage/web/hotwords/admin`,
        options: { ...param }
    };
    return requests(params);
}

/**
 * 获取所有主题列表
*/
export async function allThemelist(param) {
    const params = {
        url: `/messageManage/web/topic/all/admin`,
        options: { ...param },
    };
    return requests(params);
}
/**
 * 获取所有应用列表
*/

export async function allApplicationlist(param) {
    const params = {
        url: `/messageManage/web/app/all/admin`,
        options: { ...param },
    };
    return requests(params);
}
/**
 * 获取所有服务列表
*/

export async function allServerlist(param) {
    const params = {
        url: `/messageManage/web/server/all/admin`,
        options: { ...param },
    };
    return requests(params);
}
/**
 * 上传
*/
export async function upload(param) {
    const params = {
        url: `/ga/xinghuo-apaas-fastdfsservice/fastdfsservice/fastdfs/singleUploadFile`,
        options: { ...param },
    };
    return requests(params);
}
/**
 * 检查主题名是否重复
*/
export async function checkThemeName(param) {
    const params = {
        url: `/messageManage/web/topic/name/admin`,
        options: { ...param },
    };
    return requests(params);
}
/**
 * 检查主题code是否重复
*/
export async function checkThemeCode(param) {
    const params = {
        url: `/messageManage/web/topic/code/admin`,
        options: { ...param },
    };
    return requests(params);
}
/**
 * 查询主题对哪些应用授权(删除主题前需要提示)
*/
export async function checkThemeAuthorization(param) {
    const { id, value, ...otherParams } = param;
    const params = {
        url: `/messageManage/web/topic/${id}/auth/admin`,
        options: { ...otherParams },
    };
    return requests(params);
}
/**
 * 删除主题
*/
export async function deleteTheme(param) {
    const { id,  ...otherParams } = param;
    const params = {
        url: `/messageManage/web/topic/${id}/admin`,
        options: { ...otherParams },
    };
    return requests(params);
}

/**
 * 检查与刷新token
*/
export async function reloadToken(param) {
    const params = {
        url: `/messageManage/index/sso/admin`,
        options: { ...param },
    };
    return requests(params);
}



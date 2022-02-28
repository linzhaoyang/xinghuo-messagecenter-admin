import { message } from 'antd';
/**
 * 将tree结构转成数组的方法
 * 
 * 
*/
    function treeGoArray(obj) {
        let array = []
        obj.forEach((item) => {
            if (item.children && item.children.length > 0) {
                const newarray = treeGoArray(item.children);
                delete item.children;
                newarray.push(item);
                array = array.concat(newarray)
            } else {
                array.push(item)
            }
        })
        return array;
    }
/**
 * 深拷贝对象
*/
function deepCopy(obj) {
    if (!!obj){
        var result = Array.isArray(obj) ? [] : {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    result[key] = deepCopy(obj[key]);   //递归复制
                } else {
                    result[key] = obj[key];
                }
            }
        }
        return result;
    }else{
        return obj
    }
}



/**
 * 文件下载
 * @param  {String} url 目标文件地址
 * @param  {String} filename 想要保存的文件名称
 */
function download(url, filename, xlsx) {
    if (filename) {
        message.loading('文件下载中', 0);
        getBlob(url).then(blob => {
            saveAs(blob, filename);
        }).catch(error => {
            console.log('error',error);
            message.error("文件下载失败");
        });
    } else {
        officeDownload(url, xlsx)
    }
}
const officeDownload = (url, xlsx) => {
    try {
        var xhh = new XMLHttpRequest();
        xhh.open("get", url);
        // xhh.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhh.responseType = 'blob';
        xhh.onreadystatechange = function () {
            if (xhh.readyState === 4 && xhh.status === 200) {
                var content = xhh.response;
                var elink = document.createElement('a');
                elink.download = xlsx;
                elink.style.display = 'none';

                var blob = new Blob([content]);
                elink.href = URL.createObjectURL(blob);
                document.body.appendChild(elink);
                elink.click();
                document.body.removeChild(elink);
            };
        }
        xhh.send();
    } catch (error) {
        console.log('officeDownload异常', error);
    }
}
/**
 * 日志类型的下载
 * 
 * 将文字填入下载成文件
*/
const logDownload = (content, filename) => {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = filename;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
}
/**
 * 获取 blob
 * @param  {String} url 目标文件地址
 * @return {Promise} 
 */
function getBlob(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(xhr.response)
            }
        };

        xhr.send();
    });
}
/**
 * 保存文件
 * @param  {Blob} blob     
 * @param  {String} filename 想要保存的文件名称
 */
function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        message.destroy();
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        // fix Firefox
        link.click();
        link.remove();
        window.URL.revokeObjectURL(link.href);
    }
}

/***
 * 获取url地址参数
*/

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
/**
 * cookie 的处理
*/
const  JSCookie = {
    setCookie :function (name, value) {
        var Days = 1;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    //读取cookies
    getCookie :function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))

            return unescape(arr[2]);
        else
            return null;
    },
    //删除cookies
    delCookie :function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
}
export {
    treeGoArray,
    deepCopy,
    logDownload,
    download,
    JSCookie,
    GetQueryString,
}
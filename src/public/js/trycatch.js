/**
 * 对一些方法做异常抛出的封装，以防项目奔溃，优化对bug的追踪
 * 
*/
export default function tryCatch(func) {
    let data = null;
    try {
        if (func) {
            if (typeof func === 'function') {
                data = func()
            } else {
                data = func
            } 
        }
    } catch (error) {
        console.group('tryCatch 抛出异常：');
        console.error('error', error)
        console.group('异常追踪：');
        console.trace('异常调用过程')
        console.count('异常调用次数');
        console.groupEnd();
        console.groupEnd();
    }
    return data
}
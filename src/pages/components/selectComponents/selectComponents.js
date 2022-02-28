import { DatePicker, Select, Input } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;
/***
 * 通过判断相应类型返回对应的筛选类型的组件
 * 类型为蚂蚁金服中组件的名称
 * 暂时只支持 DatePicker, RangePicker, Select,Option, Input,Search
*/


export default function name(type) {
    switch (type) {
        case 'Select':
            return Select;
        case 'Input':
            return Input;
        case 'DatePicker':
            return DatePicker;
        case 'RangePicker':
            return RangePicker;
        case 'Option':
            return Option;
        case 'Search':
            return Search;
        default:
            console.error('无此组件类型')
            break;
    }
}
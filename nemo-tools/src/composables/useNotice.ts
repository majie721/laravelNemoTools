import {notification} from 'ant-design-vue';
import {h, VNodeTypes} from 'vue'

export default function useNotice() {
    const openNotificationWithIcon = (type:string,title:VNodeTypes,content:VNodeTypes,style:object|string="",duration:number=8) => {
        // @ts-ignore
        notification[type]({
            message: title,
            description:content,
            style:style,
            duration:duration
        });
    };

    return {
        openNotificationWithIcon,
    };
}
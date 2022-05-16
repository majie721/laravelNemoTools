import {inject, ref} from "vue";
import {UnwrapNestedRefs} from "@vue/reactivity";
import {MyModel, PropertyNode} from "@/type/common";
import {parse} from "@/composables/parseJson";

export default function useParseJson(myModel:UnwrapNestedRefs<MyModel>,onModelClose:()=>void,onModelShow:()=>void,emit:any) {
    const jsonStr =  ref<string>('')
    const jsonError =  ref<string>('')
    myModel.title = 'JSON数据'



    const jsonAdd = () => {
        let str = jsonStr.value.trim().replace(/\s/g, '')
        let obj: any = {};
        try {
            obj = JSON.parse(str)
            jsonError.value = ''
            myModel.visible = false;
        } catch (e) {
            jsonError.value = "json数据格式错误"
            return
        }

        let tree = parse(obj, 1);
        emit('updateTree',tree)
    }




    return {
        jsonStr,
        jsonError,
        jsonAdd,
    }




}
import {reactive} from "vue";
import {ApiBasic} from "@/type/common";
import { Form } from 'ant-design-vue';


export default function useBaseFrom() {
    const useForm = Form.useForm;
    const baseData = reactive<ApiBasic>({
        namespace:"App\\Http\\Beans\\Tiktok\\Api",
        className:""
    })

    //校验规则
    const rules = {
        namespace:[{required: true}],
        className:[{required: true}]
    }

    const { validate, validateInfos } = useForm(baseData, rules);
    


    return {
        baseData,
        rules,
        validateInfos,
        validate
    }
}


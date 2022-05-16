
import {reactive} from "vue";
import {MyModel} from "../type/common";
export default function useModel() {
    const cModel = reactive<MyModel>({
        visible:false,
        title:''
    })

    const onModelShow = () => {
      cModel.visible = true
    }

    const onModelClose = () => {
        cModel.visible = false
    }

    return {
        cModel,
        onModelShow,
        onModelClose
    }
}
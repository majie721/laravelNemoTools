import api from "@/http/api";
import http from "@/http/http"
import {Connection, TableBase, TableInfo} from "@/type/common";
import { onMounted, reactive, ref,h} from "vue";
import {Ref} from "@vue/reactivity";
import {useForm} from "ant-design-vue/es/form";
import { message } from 'ant-design-vue';
import useNotice from "@/composables/useNotice";

export default function useTable() {
    const {openNotificationWithIcon} = useNotice();

    let tableList = ref<Array<TableInfo>>([])
    let connections = ref<Array<Connection>>([])
    let tableBase = ref<TableBase>({connection:'',modelNamespace:'namespace App\\Models',entityNamespace:"namespace App\\Entities"})
    let selectTableList = ref<Array<TableInfo>>([])


    const getTables =  async ()=>{
        let response = await http.get(api.table_info, {table_schema:tableBase.value.connection})
        tableList.value = response.data.data.list
        connections.value = response.data.data.connections
        if(tableBase.value.connection===''){
            tableBase.value.connection = response.data.data.default
        }
    }

    const onCreate = async ()=>{
        validate().then(async () => {
            if (selectTableList.value.length < 1) {
                return message.warning('请先选择表');
            }
            let response = await http.post(api.create_entity, {
                'modelNamespace':tableBase.value.modelNamespace,
                'entityNamespace':tableBase.value.entityNamespace,
                'list':selectTableList.value
            })
            if(response.data.code ===0){
                const Entities =  response.data.data.files.Entities.join(",")
                const Models =  response.data.data.files.Models.join(",")
                const style = {"word-break":"break-word",width:"100%"};
                 openNotificationWithIcon('success','Entity创建成功',h('p',Entities),style);
                 setTimeout(()=>{
                     openNotificationWithIcon('success','Model 创建成功',h('p',Models),style);
                 },800)

            }else {
                return message.error('文件生成失败');
            }
        })
    }

    const rules = {
        modelNamespace:[{required: true}],
        entityNamespace:[{required: true}]
    }

    const { validate, validateInfos } = useForm(tableBase, rules);



    onMounted( () => {
          getTables();
    })

    return {
        tableList,
        selectTableList,
        connections,
        tableBase,
        rules,
        validateInfos,
        onCreate,
        getTables
    }
}
import api from "@/http/api";
import http from "@/http/http"
import {Connection, TableBase, TableInfo} from "@/type/common";
import { onMounted, reactive, ref} from "vue";
import {Ref} from "@vue/reactivity";
import {useForm} from "ant-design-vue/es/form";
import { message } from 'ant-design-vue';

export default function useTable() {

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
            console.log(response);
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
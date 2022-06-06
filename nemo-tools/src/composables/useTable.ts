import api from "@/http/api";
import http from "@/http/http"
import {Connection, MethodInfo, TableBase, TableInfo, TableModelInfo} from "@/type/common";
import {onMounted, reactive, ref, h} from "vue";
import {Ref} from "@vue/reactivity";
import {useForm} from "ant-design-vue/es/form";
import {message} from 'ant-design-vue';
import useNotice from "@/composables/useNotice";
import _ from "lodash"

export default function useTable() {
    const {openNotificationWithIcon} = useNotice();

    let tableList = ref<Array<TableModelInfo>>([])
    let connections = ref<Array<Connection>>([])
    let tableBase = ref<TableBase>({
        connection: '',
        modelNamespace: 'App\\Models',
        entityNamespace: "App\\Entities",
        codePath:"App\\Http\\Admin"
    })


    const getTables = async () => {
        let response = await http.get(api.table_info, {table_schema: tableBase.value.connection})
        let list: Array<TableInfo> = response.data.data.list;
        let tableModelList: Array<TableModelInfo> = []
        if (list.length > 0) {
            for (const tableInfo of list) {
                let name = tableInfo.table.split("_").pop();
                name = _.upperFirst(name)
                let temp: TableModelInfo = {
                    table: tableInfo.table,
                    columns: tableInfo.columns,
                    name:name,
                    methods:initMethod(name,tableBase.value.codePath)
                };

                tableModelList.push(temp)
            }
        }
        tableList.value = tableModelList
        connections.value = response.data.data.connections
        if (tableBase.value.connection === '') {
            tableBase.value.connection = response.data.data.default
        }
    }

    const initMethod = (name: string, path: string) => {
        let arr = [];
        let acctions = [{name:'add',actionName:'新增'},
            {name:'edit',actionName:'编辑'},
            {name:'delete',actionName:'删除'},
            {name:'queryPaginate',actionName:'分页查询'},
            {name:'queryAll',actionName:'查询所有'}];
        for (const action of acctions) {
           // let selected = action.name ==='queryAll'?false:true
            let tmp: MethodInfo = {
                //方法名称
                name: name,
                action: action.name,
                actionName:action.actionName,
                path: `${path}`,
                controllerName: `${path}\\Controllers\\${name}Controller`,
                serviceName: `${path}\\Service\\${name}Service`,
                apiMoudel: '',
                apiName: '',
                selected: false
            }
            arr.push(tmp)
        }
        return arr
    }


    const onCreate = async () => {
        console.log(tableList.value);
        validate().then(async () => {

            if(tableList.value.length>0){
                for (const table of tableList.value) {
                    for (let method of table.methods) {
                        method.path = tableBase.value.codePath
                    }
                }
            }

            let response = await http.post(api.create_entity, {
                'modelNamespace': tableBase.value.modelNamespace,
                'entityNamespace': tableBase.value.entityNamespace,
                'list': tableList.value.filter((val)=>{
                    //val.methods = val.methods.filter((val)=>{return val.selected});
                    return  val.methods.some((value => {return value.selected}))
                })
            })
            if (response.data.code === 0) {
                const Entities = response.data.data.files.Entities.join(",")
                const Models = response.data.data.files.Models.join(",")
                const style = {"word-break": "break-word", width: "100%"};
                openNotificationWithIcon('success', 'Entity创建成功', h('p', Entities), style);
                setTimeout(() => {
                    openNotificationWithIcon('success', 'Model 创建成功', h('p', Models), style);
                }, 800)

            } else {
                return message.error('文件生成失败');
            }
        })
    }

    const rules = {
        modelNamespace: [{required: true}],
        entityNamespace: [{required: true}],
        codePath:[{required:true}]
    }

    const {validate, validateInfos} = useForm(tableBase, rules);


    onMounted(() => {
        getTables();
    })

    return {
        tableList,
        connections,
        tableBase,
        rules,
        validateInfos,
        onCreate,
        getTables
    }
}
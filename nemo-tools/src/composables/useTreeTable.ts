import {reactive, ref,inject} from "vue";
import {PropertyNode,rootKey} from "@/type/common";
import {createNode} from "@/composables/parseJson";
import {rejects} from "assert";


export default function useTreeTable() {

    let defaultExpandedRowKeys = ref<string[]>([rootKey])

    let jsonNodeList = reactive<PropertyNode[]>([{
        name: 'root',
        type: 'object',
        desc: '根节点',
        children: [],
        mock: '',
        depth: 0,
        is_array_item: false,
        key: rootKey,
        required: 1,
    }])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            slots: {
                customRender: 'bodyCell',
            },
            width: '600px'

        },
        {
            title: 'Type',
            dataIndex: 'type',
            slots: {
                customRender: 'bodyCell',
            }
        },
        {
            title: 'Required',
            dataIndex: 'required',
            slots: {
                customRender: 'bodyCell',
            }
        },
        {
            title: 'Desc',
            dataIndex: 'desc',
            slots: {
                customRender: 'bodyCell',
            }
        },
        {
            title: 'Mock',
            dataIndex: 'mock',
            slots: {
                customRender: 'bodyCell',
            }
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            slots: {
                customRender: 'bodyCell',
            }
        },
    ];

    //树节点展开和收缩
    const onExpand = (expanded: boolean, record: PropertyNode) => {
        if (expanded) {
            defaultExpandedRowKeys.value.push(record.key)
        } else {
            let index = defaultExpandedRowKeys.value.indexOf(record.key)
            defaultExpandedRowKeys.value.splice(index, 1)
        }
    }

    //节点数据更新
    const onTypeChange = (type: string, node: PropertyNode) => {
        //1.先找到该节点
        //2.切换后节点为null
        //3.type=array 节点添加子节点
        let changeNode = function (targetNode: PropertyNode) {

            if (targetNode.type === 'array') {
                let depth = targetNode.depth + 1;
                targetNode.children = [createNode('item', 'string', '', depth, null, '', true)];
            } else {
                targetNode.children = null
            }
        }
        searchNodesAndAction(node.key, jsonNodeList!, changeNode)
    }

    //添加节点
    const addChildNode =  (node: PropertyNode) => {
        //找到当前节点
        //在找到的节点的孩子节点添加一个新的节点
        //parentNode =  findParent(node.key,jsonNodeList)
        let addNode = function (targetNode: PropertyNode) {

            if (!!targetNode.children) {
                targetNode.children!.push(createNode('', 'string', '', targetNode.depth + 1, null, '', targetNode.type === 'array'));
            } else {
                targetNode.children = [createNode('', 'string', '', targetNode.depth + 1, null, '', targetNode.type === 'array')];
            }

        }
        searchNodesAndAction(node.key, jsonNodeList!, addNode)

    }

    //根据key找到指定的树节点
    const searchNodesAndAction = (key: string, nodes: PropertyNode[], callback: (targetVal: PropertyNode, targetKey: string | number, targetNodes: PropertyNode[]) => any)=> {
        let res = findNodeAndAction(key, nodes, callback)
        if (res > -1) {
            return true
        }
        for (const nodeKey in nodes) {
            if (nodes[nodeKey].children && nodes[nodeKey].children!.length > 0) {
                let res = searchNodesAndAction(key, nodes[nodeKey].children!, callback)
                if (res) {
                    return true;
                }
            }
        }
    }

    //删除节点
    const onDeleteNode =  (key: string) => {
        //1.找到当前节点
        //2.执行删除
        let changeNode = function (targetNode: PropertyNode, targetKey: number | string, targetNodes: PropertyNode[]) {
            targetNodes.splice(targetKey as number, 1)
        }
        searchNodesAndAction(key, jsonNodeList!, changeNode)
    }

    //添加兄弟节点
    function addSiblingNode(node: PropertyNode) {
        //找到当前节点
        //在找到的节点后面添加一个节点
        let addAfterNode = function (targetNode: PropertyNode, targetKey: number | string, targetNodes: PropertyNode[]) {
            let index = Number(targetKey) + 1
            let addNode = createNode('', 'string', '', targetNode.depth, null, '', false)
            targetNodes.splice(index, 0, addNode)
        }
        searchNodesAndAction(node.key, jsonNodeList!, addAfterNode)

    }

    //找到节点并执行指令,并返回节点的index
    const findNodeAndAction = (key: string, nodes: PropertyNode[], callback: (targetVal: PropertyNode, targetKey: string | number, targetNodes: PropertyNode[]) => any) => {
        for (const nodesKey in nodes) {
            if (key === nodes[nodesKey].key) {
                callback(nodes[nodesKey], nodesKey, nodes)
                updateKeys(jsonNodeList!)
                return nodesKey;
            }
        }
        return -1;
    }

    //树的节点变换后,重新刷新树节点数据
    const formJson = (jsonObj:PropertyNode[]) => {
        console.log(jsonObj);
        jsonNodeList[0].children = jsonObj
        updateKeys(jsonNodeList)
    }

    //更新树节点的key,并更新defaultExpandedRowKeys
    const updateKeys = (list:PropertyNode[])=>{
        let arrKeys:string[]= [];
        updateTreeKeys(list,arrKeys,rootKey)
        defaultExpandedRowKeys.value = arrKeys
    }

    //更新key
    const updateTreeKeys = (list:PropertyNode[],keys:string[],parentKey:string=rootKey) => {
        logExpanded(list,keys,parentKey)
        for (const propertyNode of list) {
            if(!!propertyNode.children && propertyNode.children.length>0){
                updateTreeKeys(propertyNode.children,keys,propertyNode.key)
            }
        }
    }

    //记录展开的key
    const logExpanded = (list:PropertyNode[],keys:string[],parentKey:string)=>{
        let i = 0;
        for (const propertyNode of list) {
            propertyNode.key!== rootKey && (propertyNode.key=`${parentKey}-${i}`)
            if(!keys.includes(propertyNode.key)) {
                keys.push(propertyNode.key)
            }
            i++;
        }
    }
    
    const validate = () => {
        return new Promise((resolve,reject)=>{
            //name为空的节点
            const res =  nodeNameHasEmpty(jsonNodeList)
            if(res){
                reject("name 不能为空")
            }else{
                resolve('ok');
            }
        })
    }

    const nodeNameHasEmpty = (list:PropertyNode[]):boolean => {
        let hasEmpty  = false;
        if(!!list && list.length>0){
           let hasEmpty =   list.some((val:PropertyNode)=>{return val.name==='' || val.name===undefined})
            if(hasEmpty){
                return true;
            }
        }

        for (const propertyNode of list) {
            if(!!propertyNode.children && propertyNode.children.length>0){
                return nodeNameHasEmpty(propertyNode.children)
            }
        }

        return  hasEmpty;
    }

    return {
        defaultExpandedRowKeys,
        jsonNodeList,
        columns,
        onExpand,
        onTypeChange,
        addChildNode,
        onDeleteNode,
        addSiblingNode,
        formJson,
        validate
    }
}
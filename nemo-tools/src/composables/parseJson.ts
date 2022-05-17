import {PropertyNode} from "@/type/common";

export const scalarType = ['bool', 'string', 'float', 'int','null']

export function parse(obj: any, depth: number): PropertyNode[] {
    let objInfo: PropertyNode[] = [];
    try {
        let data = Reflect.ownKeys(obj);
    }catch (e) {
        console.log(obj);
    }
    let data = Reflect.ownKeys(obj);
    let index = 0;
    for (const key of data) {
        objInfo.push(getNode(obj, key as string, depth))
        index++;
    }

    return objInfo;
}

export function getNode(obj: any, key: string, depth: number): PropertyNode {
    let content = Reflect.getOwnPropertyDescriptor(obj, key);
    let type = typeOf(content!.value)
    if (scalarType.includes(type)) {
        return createNode(key, type, content!.value, depth, null, content!.value, false)
    }
    if ('object' === type) {
        let currentNode = createNode(key, type, '', depth, [], '', false)
        currentNode.children = parse(content!.value, depth + 1)
        return currentNode;
    }
    //array
    let currentNode = createNode(key, type, '', depth, [], '', false)
    currentNode.children!.push(arrayNode(content!, depth + 1))
    return currentNode;
}

//数据类型检测工具函数(int,float,string,bool,array,object)
export function typeOf(obj: any): string {
    let jsType = typeof obj
    let type: string = jsType;
    switch (jsType) {
        case "boolean":
            type = 'bool';
            break;
        case  "string":
        case "object":
        case "number":
            break;
        default:
            type = "string"
            break
    }

    if ('number' === type) {
        type = isFloat(obj.toString()) ? 'float' : 'int';
    }

    if ('object' === type) {
        type = Array.isArray(obj) ? 'array' : 'object';

        if(obj===null){
            type = 'null'
        }
    }
    return type;
}

// 是否浮点型
export function isFloat(n: string) {
    return /^-?\d*\.\d+$/.test(n)
}

export function createNode(name: string, type: string, desc: string, depth: number, children: PropertyNode[] | null, mock: string, is_array_item: boolean = false): PropertyNode {
    return {
        name: name,
        type: type==='null'?'string':type,
        desc: desc == null?'null': desc.toString(),
        children: children,
        mock: mock == null?'null': mock.toString(),
        depth: depth,
        is_array_item: is_array_item,
        key: '',
        required: 1,
    }
}


export function arrayNode(parentInfo: PropertyDescriptor, depth: number) {
    let item_type = typeOf(parentInfo.value[0])
    let arrayChild = createNode('item', item_type, '', depth, null, '', true) //先数组下面有一个item


    //标量
    if (scalarType.includes(item_type)) {
        arrayChild.desc = parentInfo!.value[0]
        return arrayChild;
    }

    //对象
    if (item_type === 'object') {
        let objs = parse(parentInfo!.value[0], depth + 1)
        arrayChild.children = [];
        arrayChild.children! = [...objs]
        return arrayChild;
    }

    //数组
    let content = Reflect.getOwnPropertyDescriptor(parentInfo.value, 0);
    arrayChild.children = [];
    arrayChild.children!.push(arrayNode(content!, depth + 1))
    return arrayChild;

}
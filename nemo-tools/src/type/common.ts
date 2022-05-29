export interface PropertyNode{
    /** name  */
    name:string;
    /** int,float,string,bool,array,object */
    type:string;
    /**  */
    desc:string;
    /** 元素层级 */
    depth:number;
    /** */
    children:PropertyNode[]|null;
    /** mock */
    mock:string;
    /** 数组类型 */
    is_array_item:boolean;
    key:string
    required:number;
}

export interface MyModel{
    visible:boolean;
    title:string;
}

export interface ApiBasic{
    namespace:string;
    className:string;
}


export interface TableInfo {
    table:string;
    columns:Column[];
}



export interface MethodInfo{
    //方法名称 ['add','edit','delete','queryPaginate','queryAll']
    name:string,
    action:string;
    actionName:string,
    path:string,
    controllerName:string,
    serviceName:string,
    apiMoudel:string,
    apiName:string,
    selected:boolean
}


export interface TableModelInfo extends TableInfo{
    name:string,
    methods:MethodInfo[]
}


export interface  Connection{
    name:string;
    connection:string;
}

export interface TableBase {
    connection:string;
    entityNamespace:string;
    modelNamespace:string;
    codePath:string;
}

export interface Column {
    column: string;
    comment: string;
    default: null|string
    is_primary: number;
    nullable: number
    table: string
    type: string
}


export const rootKey = '0'; //根节点的key
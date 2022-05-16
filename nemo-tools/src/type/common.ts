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

export const rootKey = '0'; //根节点的key
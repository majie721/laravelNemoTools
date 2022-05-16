<template>
    <a-table :columns="columns" @expand="onExpand" :data-source="jsonNodeList"  :expandedRowKeys="defaultExpandedRowKeys" :indentSize="24" size="small" :pagination="false"
           defaultExpandAllRows bordered>
    <template #bodyCell="{ column, record }">
      <template v-if="record.key==rootKey">
        <template v-if="column.dataIndex=='required'">Yes</template>
        <template v-else>
          {{ record[column.dataIndex] }}
        </template>
      </template>
      <template v-else>
        <template v-if="column.dataIndex==='name'">
          <a-input  :class="record.name===''?'name-input':''"  :disabled="record.is_array_item===true"  :style="{width: '220px'}" size="small"
                   v-model:value="record[column.dataIndex]"/><span v-show="record.name===''" style="color: red;margin-left: 10px">name is required</span>
        </template>
        <template v-if="column.dataIndex==='desc'">
          <a-input :style="{width: '220px'}" size="small" :disabled="record.is_array_item===true" v-model:value="record[column.dataIndex]"/>
        </template>
        <template v-if="'mock'===column.dataIndex">
          <a-input :style="{width: '220px'}" size="small" v-model:value="record[column.dataIndex]"/>
        </template>
        <template v-if="column.dataIndex=='type'">
          <a-select style="width: 100px" @change="(val:string)=>{onTypeChange(val,record)}" size="small"
                    v-model:value="record[column.dataIndex]" placeholder="数据类型">
            <a-select-option value="string">string</a-select-option>
            <a-select-option value="int">int</a-select-option>
            <a-select-option value="float">float</a-select-option>
            <a-select-option value="bool">bool</a-select-option>
            <a-select-option value="array">array</a-select-option>
            <a-select-option value="object">object</a-select-option>
          </a-select>
        </template>
        <template v-if="column.dataIndex=='required'">
          <a-select style="width: 100px" size="small" v-model:value="record.required">
            <a-select-option :value="1">Yes</a-select-option>
            <a-select-option :value="0">No</a-select-option>
          </a-select>
        </template>
      </template>
      <template v-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <a-popconfirm
              v-if="record.key!==rootKey && record.is_array_item!==true "
              title="是否删除此节点?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="onDeleteNode(record.key)"
              @cancel="()=>{}"
          >
            <delete-outlined title="删除" class="op-icon"/>
          </a-popconfirm>


          <a-tooltip v-if="record.type ==='object'">
            <template #title>添加子节点</template>
            <plus-square-outlined @click="addChildNode(record)" style="cursor: pointer" class="outlined op-icon"/>
          </a-tooltip>

          <a-tooltip v-if="record.key!==rootKey &&  record.is_array_item!==true">
            <template #title>添加相邻节点</template>
            <plus-outlined @click="addSiblingNode(record)" style="cursor: pointer" class="outlined op-icon"/>
          </a-tooltip>

        </div>
      </template>
    </template>

  </a-table>
</template>

<script setup lang="ts">
    import {PlusOutlined, DeleteOutlined, PlusSquareOutlined} from "@ant-design/icons-vue"
    import useTreeTable from "@/composables/useTreeTable";
    import {rootKey} from "@/type/common";

    const {columns,defaultExpandedRowKeys,onExpand,onTypeChange, addChildNode,onDeleteNode,addSiblingNode,formJson,jsonNodeList,validate} = useTreeTable()

    defineExpose({
      formJson,
      validate,
      jsonNodeList
    })


</script>
<style scoped lang="scss">
.op-icon {
  color: #1890ff;
  margin-left: 10px;
}

.name-input{
  border-color: red;
}

.name-input:hover{
  border-color: red;
}
</style>
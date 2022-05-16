<template>
    <div class="content-header">
      <a-breadcrumb>
        <a-breadcrumb-item @click="router.push('home')" class="pointer">Home</a-breadcrumb-item>
        <a-breadcrumb-item>JSON Model</a-breadcrumb-item>
      </a-breadcrumb>
      <a-divider/>
    </div>

  <a-card title="基本设置" >
    <BaseForm ref="baseFormRef"></BaseForm>
  </a-card>


    <a-card class="content-tree"  >
      <template #title>数据模型
        <a-button   type="primary" ghost size="small" @click="showModal">
          导入json
        </a-button>
      </template>
      <div class="json-tree">
        <TreeTable ref="reqTreeRef"></TreeTable>
      </div>
    </a-card>





  <a-button @click="submitJson" type="primary">创建</a-button>
  <JsonForm @updateTree="intJson" ref="jsonFormRef"></JsonForm>



</template>
<script setup lang="ts">
import {ref, h,reactive, watch,provide,Component} from 'vue'
import {useRouter} from "vue-router";

import {PropertyNode} from "@/type/common";
import {FormOutlined} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import http from "@/http/http";
import api from "@/http/api";

import JsonForm from "@/components/JsonForm.vue"
import BaseForm from "@/components/BaseForm.vue"
import TreeTable from "@/components/TreeTable.vue"
import {rootKey} from "@/type/common";


const jsonFormRef = ref<InstanceType<typeof JsonForm>>()
const reqTreeRef = ref<InstanceType<typeof TreeTable>>()
const baseFormRef = ref<InstanceType<typeof BaseForm>>()


const showModal = () => {
  jsonFormRef.value!.onModelShow()
};

const intJson = (tree:PropertyNode[]) => {
  reqTreeRef.value!.formJson(tree)
}

const router = useRouter()

async function submitJson() {
  const baseFormRefValidate =   baseFormRef.value!.validate()
  const reqTreeRefValidate =   reqTreeRef.value!.validate()
  Promise.all([baseFormRefValidate,reqTreeRefValidate]).then(async () => {
    const jsonNodeList = reqTreeRef.value!.jsonNodeList
    const baseData = baseFormRef.value!.baseData
    let result = await http.post(api.json_model, {
      list: jsonNodeList,
      namespace: baseData.namespace,
      className: baseData.className,
    })

    if(result.data.data.files && result.data.data.files.length>0){
       return message.success("文档已生成");
    }
    return message.warning('文档生成失败,请检查数据');

  }).catch(err=>{
    console.log(err);
  })



}



</script>
<style scoped lang="scss">
.pointer {
  cursor: pointer;
}

.content-tree {
  margin-top: 20px;
}



.json-tree {
  width: 100%;
}


</style>

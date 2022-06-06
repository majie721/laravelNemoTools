<template>
  <div class="content-header">
    <a-breadcrumb>
      <a-breadcrumb-item @click="router.push('home')" class="pointer">Home</a-breadcrumb-item>
      <a-breadcrumb-item>DB Model</a-breadcrumb-item>
    </a-breadcrumb>
    <a-divider/>
  </div>

  <a-card title="基本设置" >
    <a-form   ref="formRef" :model="tableBase" name="baseDataForm">
      <a-form-item class="form-item"  name="model namespace" label="model namespace" :rules="rules.modelNamespace" v-bind="validateInfos.modelNamespace">
        <a-input  v-model:value="tableBase.modelNamespace"/>
      </a-form-item>
      <a-form-item class="form-item"  name="entity namespace" label="entity namespace" :rules="rules.entityNamespace" v-bind="validateInfos.entityNamespace">
        <a-input  v-model:value="tableBase.entityNamespace"/>
      </a-form-item>
      <a-form-item class="form-item"  name="code namespace" label="code namespace" :rules="rules.codePath" v-bind="validateInfos.codePath">
        <a-input  v-model:value="tableBase.codePath"/>
      </a-form-item>
      <a-form-item class="form-item"  name="connections" label="connections">
        <a-select v-model:value="tableBase.connection" @change="()=>{getTables()}">
          <a-select-option v-for="(item,key) in connections" :key="key" :value="item.connection">{{item.connection}}</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-card>

  <a-card   style="margin-top: 20px">
    <template #title>数据模型
      <a-button   type="primary" ghost size="small" @click="onCreate">
        Create
      </a-button>
    </template>
    <div style="background-color: #ececec; padding: 20px">
      <a-row type="flex" :gutter="[24,24]">
        <a-col :span="6" v-for="(table,index) in tableList" :key="index">
          <a-card size="small" :title="`数据库表: ${table.table}`" :bordered="false">
            <template #extra><a-input :value="table.name" size="small"  addon-before="Modle Name" style="width: 80%;display: inline-block;float: right" /></template>
<!--            <p><a-checkbox  v-model:checked="table.methodInfos[0].selected">{{table.methodInfos[0].actionName}}</a-checkbox></p>-->
            <p><a-checkbox v-for="(info,key) in table.methods" :key="key"  v-model:checked="info.selected">{{info.actionName}}</a-checkbox></p>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </a-card>

</template>
<script setup lang="ts">
import {ref, reactive} from 'vue'
import {useRouter} from "vue-router";
import useTable from "@/composables/useTable";

const router = useRouter()
const {tableList,connections,tableBase,rules,validateInfos,onCreate,getTables} = useTable();

</script>
<style scoped lang="scss">
.form-item{
  width: 33%;
}
</style>

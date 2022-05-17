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
      <a-checkbox-group v-model:value="selectTableList" style="width: 100%">
        <a-row type="flex" :gutter="[24,24]">
          <a-col :span="3" v-for="(table,index) in tableList" :key="index">
            <a-card size="small" :title="table.table" :bordered="false">
              <p><a-checkbox :value="table">选择</a-checkbox></p>
            </a-card>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </div>
  </a-card>

</template>
<script setup lang="ts">
import {ref, reactive} from 'vue'
import {useRouter} from "vue-router";
import useTable from "@/composables/useTable";

const router = useRouter()
const {tableList,selectTableList,connections,tableBase,rules,validateInfos,onCreate,getTables} = useTable();
console.log(tableList);

</script>
<style scoped lang="scss">
.form-item{
  width: 33%;
}
</style>

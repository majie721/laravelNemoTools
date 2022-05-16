<template>
  <div style="background-color: #ececec;">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="JSON Mode" :bordered="false">
          <template #extra><form-outlined @click="router.push('json_model')"  class="outlined"/></template>
          <p>根据json数据生成Nemo的数据模型</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Table Mode" :bordered="false">
          <template #extra><form-outlined class="outlined" @click="router.push('db_model')" /></template>
          <p>根据数据库表生成Nemo数据模型</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="More" :bordered="false">
          <p>.....</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { defineComponent } from 'vue';
import {FormOutlined} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
import {ref, reactive} from 'vue'

const router = useRouter()


</script>
<style scoped lang="scss">
.outlined{
  color: #1890ff;
  cursor: pointer;
}

</style>

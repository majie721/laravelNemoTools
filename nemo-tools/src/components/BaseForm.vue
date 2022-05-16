<template>
  <a-form  ref="formRef" :model="baseData" name="baseDataForm">
    <a-form-item class="form-item" name="namespace" label="namespace" :rules="rules.namespace" v-bind="validateInfos.namespace">
      <a-input  v-model:value="baseData.namespace"/>
    </a-form-item>
    <a-form-item class="form-item" name="className" label="className" :rules="rules.className" v-bind="validateInfos.className">
      <a-input v-model:value="baseData.className"/>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">

  import useBaseFrom from "@/composables/useBaseFrom";
  const {baseData,rules,validateInfos, validate} = useBaseFrom()

  defineExpose({
    baseData,
    validate
  })

</script>

<style scoped lang="scss">
  .form-item{
    width: 33%;
  }
</style>
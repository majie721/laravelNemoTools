<template>
  <a-modal v-model:visible="cModel.visible" :title="cModel.title" @ok="jsonAdd">
    <a-textarea :rows="10" v-model:value="jsonStr" placeholder="输入合法的json数据" allow-clear/>
    <p class="error" v-if="jsonError">{{ jsonError }}</p>
  </a-modal>
</template>

<script setup lang="ts">
import  useModel from "@/composables/useModel";
import useParseJson from "@/composables/useParseJson";

//声明事件
const emit = defineEmits(['updateTree'])

const {cModel,onModelClose,onModelShow} = useModel()
const {jsonStr,jsonError,jsonAdd} = useParseJson(cModel,onModelClose,onModelShow,emit);
defineExpose({
  onModelShow
})
</script>

<style scoped lang="scss">
.error {
  color: red;
}
</style>
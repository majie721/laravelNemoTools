<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="header">Nemo Tools</div>
    </a-layout-header>
    <a-layout-content class="content">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer class="footer">
      <div class="footer"></div>
    </a-layout-footer>
  </a-layout>
</template>



<style lang="scss">
.layout {
  height: 100%;
}

.header {
  color: #fff;

}

.content {
  padding: 20px;
  overflow: auto;
}

.footer{

}

</style>

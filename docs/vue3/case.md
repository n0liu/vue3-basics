# 案例练习

![image-20220909112401863](/public/assets/image-20220909112401863.png)

## 基础准备

> 创建项目

* 安装element-plus组件库（vue3版本）

- 引入element-plus组件库

```diff
import { createApp } from 'vue'
import App from './App.vue'

+// element-plus 支持vue3的ui组件库，使用和element-ui一致
+import ElementUI from 'element-plus'
+import 'element-plus/dist/index.css'

+// use(ElementUI) 使用组件库
+createApp(App).use(ElementUI).mount('#app')
```

> 需求说明，使用组合式API实现

- 列表渲染
- 删除数据



## 实现功能(作业)

```vue
<template>
  <div class="app">
    <el-table :data="list" border>
      <el-table-column label="ID" prop="goods_id"></el-table-column>
      <el-table-column label="商品" prop="goods_name" width="150"></el-table-column>
      <el-table-column label="价格" prop="goods_price"></el-table-column>
      <el-table-column label="操作" width="100">
        <template v-slot="{ row }">
          <el-button type="danger" link @click="delRow(row.goods_id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from 'axios'
// 获取列表数据
const list = ref([])
const geList = async () => {
  const res = await axios.get('https://applet-base-api-t.itheima.net/api/cart')
  list.value = res.data.list
}

onMounted(() => {
  geList()
})

// 删除数据
const delRow = async (id) => {
  list.value = list.value.filter(item=>item.goods_id!== id)
}
</script>

<style scoped>
.app {
  width: 980px;
  margin: 100px auto 0;
}
</style>
```
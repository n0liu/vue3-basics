# Pinia 从入门到入坑

## Pinia 介绍

![image-20220307164034108.png](/public/assets/p1.png)

> 一个全新的用于 Vue 的状态管理库。下一个版本的 Vuex，也就是 Vuex 5.0。


[Pinia ](https://pinia.vuejs.org/) 最初是一个 [实验](https://github.com/vuejs/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e)，目的是在2019年11月左右重新设计 Vue 状态管理在 [Composite API](https://github.com/vuejs/composition-api) 上的样子，也就是下一代 Vuex。

-  之前的 Vuex 主要服务于 Vue 2，选项式 API 
-  如果想要在 Vue 3 中使用 Vuex，需要使用 4.x 版本 
   - 只是一个过渡的选择，还有很大的缺陷
-  所以在 Vue 3 伴随着组合式 API 诞生之后，也设计了全新的 Vuex：Pinia，也就是 Vuex 5 

### 关于名字
![image-20220307164217787.svg](/public/assets/p2.svg)

Pinia（发音`/peenya/`为英语）是最接近_piña_（西班牙语中的_pineapple_）的词，它是一个有效的包名。菠萝实际上是一组独立的花朵，它们结合在一起形成多种水果。与 stores 类似，每家 store 都是独立诞生的，但最终都联系在一起。它也是一种原产于南美洲的美味热带水果。

### 关于作者

[认识 Vue.js 开发团队](https://v3.cn.vuejs.org/community/team.html)。

![image-20220307164508413.png](/public/assets/p3.png)
### 核心特性

- Vue 2 和 Vue 3 都支持
- 除了初始化安装和 SSR 配置之外，两者的 API 都是相同的 
   - 官方文档中主要针对 Vue 3 进行说明，必要的时候会提供 Vue 2 的注释
- 支持 Vue DevTools
- 跟踪 actions、mutations 的时间线 
   - 在使用容器的组件中就可以观察到容器本身
- 支持 time travel (时间旅行) 更容易的调试功能 
   - 在 Vue 2 中 Pinia 使用 Vuex 的现有接口，所有不能与 Vuex 一起使用
- 但是针对 Vue 3 中的调试工具支持还不够完美，比如还没有 time-travel 调试功能
- 模块热更新
- 无需重新加载页面即可修改您的容器 
   - 热更新的时候保持任何现有状态
- 支持使用插件扩展 Pinia 功能
- 相比 Vuex 有更好完美的 TypeScript 支持
- 支持服务端渲染

### 核心概念

Pinia 从使用角度和之前的 Vuex 几乎是一样的，比 Vuex 更简单了。

在 Vuex 中有四个核心概念：**State、Getters、Mutations、Actions**

在 Pinia 中：**State、Getters、Actions (同步异步都支持)**

Store（如 Pinia）是一个保存状态和业务逻辑的实体，它不绑定到您的组件树。换句话说，**它承载全局 state**。它有点像一个始终存在的组件，每个人都可以读取和写入。它有**三个核心概念**。


### Pinia vs Vuex
Pinia 试图尽可能接近 Vuex 的理念。它旨在测试 Vuex 下一次迭代的提案，并且取得了成功，因为我们目前有一个针对 Vuex 5 的开放式 RFC，[其 API 与](https://github.com/vuejs/rfcs/discussions/270)Pinia 使用[的 API 非常相似](https://github.com/vuejs/rfcs/discussions/270)。请注意，Pini 的作者 I (Eduardo) 是 Vue.js 核心团队的一员，并积极参与 Router 和 Vuex 等 API 的设计。我个人对这个项目的意图是重新设计使用全局 Store 的体验，同时保持 Vue 平易近人的哲学。我让 Pania 的 API 与 Vuex 一样接近，因为它不断向前发展，使人们可以轻松地迁移到 Vuex，甚至在未来融合这两个项目（在 Vuex 下）。
关于版本问题：

-  Vuex 当前最新版本是 4.x 
   - Vuex 4 用于 Vue 3 
      - Vuex 3 用于 Vue 2
-  Pinia 当前最新版本是 2.x 
   - 既支持 Vue 2 也支持 Vue 3

Pinia 可以认为就是 Vuex 5，因为它的作者是官方的开发人员，并且已经被官方接管了。

Pinia API 与 Vuex ≤4 有很大不同，即：

- 没有 `mutations`。mutations 被认为是非常冗长的。最初带来了 devtools 集成，但这不再是问题。
- 不再有模块的嵌套结构。您仍然可以通过在另一个 store 中导入和使用 store 来隐式嵌套 store，但 Pinia 通过设计提供扁平结构，同时仍然支持 store 之间的交叉组合方式。您甚至可以拥有 store 的循环依赖关系。
- 更好 `typescript` 支持。无需创建自定义的复杂包装器来支持 TypeScript，所有内容都是类型化的，并且 API 的设计方式尽可能地利用 TS 类型推断。
- 不再需要注入、导入函数、调用它们，享受自动补全！
- 无需动态添加 stores，默认情况下它们都是动态的，您甚至不会注意到。请注意，您仍然可以随时手动使用 store 来注册它，但因为它是自动的，所以您无需担心。
- 没有命名空间模块。鉴于 store 的扁平架构，“命名空间” store 是其定义方式所固有的，您可以说所有 stores 都是命名空间的。

Pinia 就是更好的 Vuex，建议在你的项目中可以直接使用它了，尤其是使用了TypeScript 的项目。

## Pinia 基础应用
### 安装

```javascript
yarn add pinia
# or with npm
npm install pinia
```
提示：如果您的应用程序使用 Vue 2，您还需要安装组合式 api 包: `@vue/composition-api`。

如果你使用的是 Vue CLI，你可以试试这个[**非官方插件**](https://github.com/wobsoriano/vue-cli-plugin-pinia)。

**初始化配置**

Vue 3：

```javascript
// 导入 pinia 
import { createPinia } from 'pinia'
// 创建实例对象
const pinia = createPinia()

createApp(App)
.use(router) 
.use(pinia) // 插件方式使用 pinia
.mount('#app')
```

**定义和使用 Store**

```javascript
// 1.定义容器
// 2.使用容器中的state
// 3.修改state
// 4.容器中的action的使用

import { defineStore } from "pinia";
// 参数1：容器的 ID,必须唯一，将来Pinia会把所有的容器挂载到根容器
// 参数2：选项对象
const useMainStore = defineStore('main',{
  /*
  * 类似于组件的data,用来存储全局状态的
  * 1.必须是函数：这样是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
  * 2.必须是箭头函数，为了更好的 ts 类型推导
  */
  state:()=>{
    return {
      count:100,
      foo:88
    }
  },
  // 类似于组件的computed,用来封装计算属性，有缓存的功能
  getters:{},
  // 类似与组件的 methods ,封装业务逻辑，修改 state 
  actions:{}
})

// 使用时直接在组件中导入
export {useMainStore}
```

- 可以根据需要定义任意数量的 Store
- 并且最好将不同的 Store 放到不同 ID 名字的模块中方便管理

### 使用 Store

```javascript
<template>
    <h2>
        <!-- 直接使用导入的对象获取 -->
        {{ mainStore.count }}
        <button @click="changeStore">按钮</button>
    </h2>
</template>
<script lang="ts" setup>
// 导入状态文件
import { useMainStore } from '../../store'
// 获取状态实例
const mainStore = useMainStore()
// 使用状态
console.log(mainStore.count)

// 可以直接对 state 中的数据进行修改（不用调用actions）
const changeStore = ()=>{
    mainStore.count++
}
</script>

<style></style>
```

Store 是一个 `reactive` 包裹的对象，所有访问其中的成员不需要 `.value`。

### 解构 state 数据

不能直接解构使用 Store 中的数据，这样拿到的数据不是响应式的。

```javascript
<template>
    <h2>
        <!-- 直接使用导入的对象获取 -->
        {{ count }}
        {{ foo }}
        <button @click="changeStore">按钮</button>
    </h2>
</template>
<script lang="ts" setup>
// 导入状态文件
import { useMainStore } from '../../store'
// 获取状态实例
const mainStore = useMainStore()
// 对状态进行解构赋值
const { count, foo } = mainStore
// ! 直接解构的值虽然可用，但是并不是响应式的

// 可以直接对 state 中的数据进行修改（不用调用actions）
const changeStore = () => {
    mainStore.count++
}
</script>

<style></style>
```
如果想要解构拿到 Store 中的响应式数据可以使用 `storeToRefs`。

```javascript
<template>
    <h2>
        <!-- 直接使用导入的对象获取 -->
        {{ count }}
        {{ foo }}
        <button @click="changeStore">按钮</button>
    </h2>
</template>
<script lang="ts" setup>
// 导入状态文件
import { storeToRefs } from 'pinia';
import { useMainStore } from '../../store'
// 获取状态实例
const mainStore = useMainStore()
// 使用 storeToRefs (需要从pinia引入)对状态进行解构赋值
// 作为响应式数据使用
const { count, foo } = storeToRefs(mainStore)

// 可以直接对 state 中的数据进行修改（不用调用actions）
const changeStore = () => {
    mainStore.count++
}
</script>

<style></style>
```
## 状态操作 actions

actions 可以通过完全输入（和自动完成 ✨）支持访问整个容器实例。actions 是异步的，可以在其中等待任何 API 调用甚至其他 actions 。

### 状态更新
```javascript
const changeStore = () => {
    // 方式一：最简单的方式就是这样
    // mainStore.count++
}
```
除了直接使用 `store.counter++` 改变 store 之外，您还可以调用该 `$patch` 方法进行批量更新。它允许您对部分 `state` 对象同时应用多个更改：
```javascript
const changeStore = () => {
    
    // 方式二：如果需要修改多个数据，建议使用$patch批量更新
    // mainStore.$patch({
    //     count: mainStore.count + 1,
    //     foo: mainStore.foo + 1
    // })
}
```
但是，使用此语法应用某些更改确实很困难或成本很高：任何集合修改（例如，从数组中推送、删除、拼接元素）都需要您创建一个新集合。正因为如此，该 $patch 方法还接受一个函数来对这种难以用补丁对象应用的改变进行分组：
```javascript
const changeStore = () => {
    // 方式三：更好的批量更新的方式：$patch一个函数
    // mainStore.$patch(state=>{
    //     state.count ++
    //     state.foo ++
    // })
}
```
您也可以完全自由地设置您想要的任何参数并返回任何内容。调用 actions 时，一切都会自动推断！

**actions 的操作**

```javascript
const changeStore = () => {
    // 方式四：逻辑比较多的时候可以封装到 actions 做处理
    // 封装好 actions 之后，直接调用
    mainStore.adds(10)

}
```
封装 actions
```javascript
  // 类似与组件的 methods ,封装业务逻辑，修改 state 
  actions: {
    // 注意：不能使用箭头函数定义action,因为箭头函数绑定外部this
    adds(num: number) {      
      this.count = this.count + num
      this.foo++
      // 同样建议使用 $patch() 
      // this.$patch({})
      // this.Spatch(state = {……})
    }
  }
```
### 重置状态 $reset
```javascript
<template>
    <h2>
        <!-- 直接使用导入的对象获取 -->
        {{ count }}
        {{ foo }}
        <button @click="changeStore">按钮</button>
        <button @click="resetState">重置</button>
    </h2>
</template>
<script lang="ts" setup>
// 导入状态文件
import { storeToRefs } from 'pinia';
import { useMainStore } from '../../store'
// 获取状态实例
const mainStore = useMainStore()
// 使用 storeToRefs (需要从pinia引入)对状态进行解构赋值
// 作为响应式数据使用
const { count, foo } = storeToRefs(mainStore)

// 可以直接对 state 中的数据进行修改（不用调用actions）
const changeStore = () => {
    mainStore.adds(10)
}

const resetState = ()=>{
    // 重置 state 到原始值
    mainStore.$reset()
}
</script>

<style></style>
```
### 跨容器调用
跨容器调用非常简单，只需要引入之后进行实例化获取即可使用；
```javascript
import { defineStore } from "pinia";
// 声明 mian 容器
const useMainStore = defineStore('main', {
  state: () => {
    return {
      count: 100,
      foo: 88
    }
  },
  // 类似与组件的 methods ,封装业务逻辑，修改 state 
  actions: {
    adds(num: number) {
      this.count = this.count + num
      this.foo++
    }
  }

})

// 声明 project 容器
const useProjectStore = defineStore('project', {
  state() {
    return {
      username: '刘能',
      age: 18
    }
  },

  actions: {
    getMain() {
      // 实例化其他容器对象
      const mainStore = useMainStore()
      
      mainStore.adds(2)
      console.log(mainStore.count)
    }
  }

})

// 使用时直接在组件中导入
export { useMainStore, useProjectStore }
```
在单文件组件中，也是同样的用法
```javascript
<template></template>
<script lang="ts" setup>
// 引入容器
import { useMainStore, useProjectStore } from '../../store/index'

// 实例化容器对象
const projectStore = useProjectStore()
const mainStore = useMainStore()

console.log(projectStore.username)
console.log(mainStore.count)

console.log('projectGetMain');

projectStore.getMain()
</script>
<style></style>
```
## Getters
### getter  声明与使用

- Getter 完全等同于 Store 状态的[计算属性](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#computed-values)。
- Getters 函数的第一个参数是 `state` 对象
```javascript
export const useStore = defineStore('main', {
  state: () => ({
    counter: 0,
  }),
    // 类似于组件的computed,用来封装计算属性，有缓存的功能
  getters: {
    // 传入 state 
    computeds(state){
      console.log(state.count)
      return state.count+1
    }
  },
})
```
可以直接在模板中访问 getter：
```javascript
<template>
    <h2>
        <!-- 直接使用导入的对象获取 -->
        {{ count }}
        {{ foo }}
        <p>getter-----------</p>
        <!-- 直接在模板中使用 getter -->
        {{ mainStore.computeds }}
        {{ mainStore.computeds }}
        {{ mainStore.computeds }}
        {{ mainStore.computeds }}
        <button @click="changeStore" >按钮</button>
        <button @click="resetState">重置</button>
    </h2>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
// 获取 store 实例对象
import { useMainStore } from '../../store'
const mainStore = useMainStore()
// 解构state 
const { count, foo } = storeToRefs(mainStore)

const changeStore = () => {
    mainStore.adds(10)
    // 在 setup 中使用 
    mainStore.computeds
}

const resetState = () => {
    // 重置 state 到原始值
    mainStore.$reset()
}
</script>

<style></style>
```
### getter 中的 this

getter 中同样可以使用 this ,但是 TS 无法推导类型，需要手动指定返回值类型
```javascript
// 类似于组件的computed,用来封装计算属性，有缓存的功能
getters: {
    // 传入 state [可选参数]
    // computeds(state){
    //   console.log('getter运行了')
    //   return state.count+1
    // }

    // !getter 中同样可以使用 this ,但是 TS 无法推导类型，需要手动指定返回值类型
    computeds():number{
        console.log('getter运行了')
        return this.count+1
    }
},
```
### 访问其它 getters

与计算属性一样，您可以组合多个 getter。通过此访问任何其他 getter。
```javascript
  getters: {
    computeds():number{
      console.log('getter运行了')
      return this.count+2
    },

    double():number{
      this.foo = this.computeds * 2 
      return this.foo
    }
  },
```
### 将参数传递给 getters (回调函数)

Getter 只是幕后的计算属性，因此无法向它们传递任何参数。但是，您可以从 getter 返回一个函数来接受任何参数，请注意，执行此操作时，getter 不再缓存，它们只是您调用的函数。但是，您可以在 getter 本身内部缓存一些结果，这并不常见，但性能更高：
```javascript
  getters: {
    getFun(state):Function{
      // getter 调用的返回值就是一个 函数
      return (attr:any)=>{
        // 回调函数中的返回值，会被缓存
        return state.count+attr
      }
    }
  },
```
然后在组件中使用它们：
```javascript
<template>
    <h2>
        <!-- 直接使用导入的对象获取 -->
        {{ count }}
        {{ foo }}
        <p>getter-----------</p>
        <!-- 直接在模板中使用 getter -->
        getter--
        {{ mainStore.getFun(6) }} 
        {{ mainStore.getFun(10) }} 
        {{ mainStore.getFun(6) }} 
        <button @click="changeStore" >按钮</button>
        <button @click="resetState">重置</button>
    </h2>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia';
// 获取 store 实例对象
import { useMainStore } from '../../store'
const mainStore = useMainStore()
// 解构state 
const { count, foo } = storeToRefs(mainStore)

const changeStore = () => {
    mainStore.adds(1)
}

const resetState = () => {
    // 重置 state 到原始值
    mainStore.$reset()
}


</script>

<style></style>
```
### 访问其它容器的 actions  或 getter

直接导入并实例化容器后，使用即可，与前面的跨容器调用一致，不再展示示例代码

## Pinia 实战案例
### 需求说明

- 商品列表
- 展示商品列表 
   - 添加到购物车
- 购物车
- 展示购物车商品列表 
   - 展示总价格
- 订单结算 
   - 展示结算状态

### 准备工作
#### 创建并启动项目
```javascript
➜ npm init vite@latest
Need to install the following packages:
  create-vite@latest
Ok to proceed? (y)
√ Project name: ... shopping-cart
√ Select a framework: » vue
√ Select a variant: » vue-ts

Scaffolding project in C:\Users\lpz\Projects\pinia-examples\shopping-cart...

Done. Now run:

  cd shopping-cart
  npm install
  npm run dev
```
#### 页面模板
```javascript
<!-- src/App.vue -->
<template>
  <h1>Pinia - 购物车示例</h1>
  <hr />
  <h2>商品列表</h2>
  <ProductList />
  <hr />
  <ShoppingCart />
</template>

<script setup lang="ts">
import ProductList from './components/ProductList.vue'
import ShoppingCart from './components/ShoppingCart.vue'
</script>

<style>
</style>

<!-- src/components/ProductList.vue -->
<template>
  <ul>
    <li>
      商品名称 - 商品价格
      

      <button>添加到购物车</button>
    </li>
    <li>
      商品名称 - 商品价格
      

      <button>添加到购物车</button>
    </li>
    <li>
      商品名称 - 商品价格
      

      <button>添加到购物车</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
</script>

<!-- src/components/ShoppingCart.vue -->
<template>
  <div class="cart">
    <h2>你的购物车</h2>
    <p>
      <i>请添加一些商品到购物车.</i>
    </p>
    <ul>
      <li>商品名称 - 商品价格 x 商品数量</li>
      <li>商品名称 - 商品价格 x 商品数量</li>
      <li>商品名称 - 商品价格 x 商品数量</li>
    </ul>
    <p>商品总价: xxx</p>
    <p>
      <button>结算</button>
    </p>
    <p>结算成功 / 失败.</p>
  </div>
</template>

<script setup lang="ts">
</script>
```
#### 数据接口  Mock
```javascript
/**
 * src/api/shop.js
 * Mocking client-server processing
 */
/**
 * Mocking client-server processing
 */
 export interface IProduct {
  id: number
  title: string
  price: number
  inventory: number
}

const _products: IProduct[] = [
  { id: 1, title: 'iPhone 13 Pro ', price: 500.01, inventory: 2 },
  { id: 2, title: '红米Note 11 Pro', price: 10.99, inventory: 10 },
  { id: 3, title: '华为 P50 Pro', price: 999.99, inventory: 5 }
]

export const getProducts = async () => {
  await wait(100)
  return _products
}

export const buyProducts = async () => {
  await wait(100)
  return Math.random() > 0.5
}

async function wait(delay: number) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
```
### 渲染数据
获取数据列表
```javascript
// \src\store\product.ts

import { defineStore } from 'pinia'
// 引入mock 数据接口
import { getProducts,IProduct } from '../api/shop'

const productStore =  defineStore('product',{
  state:()=>{
    return {
      // TS 需要引入(api中已经定义过了)并显性的定义类型
      productList:[] as IProduct[]
    }
  },
  getters:{},

  actions:{
    // 获取数据
    async getProductList(){
      // 写入 state
      this.productList = await getProducts()
    }
  }
})

export {productStore}
```
模板渲染
```javascript
// \src\views\shopcart\ProductList.vue

<template>
  <ul>
    <!-- 渲染数据列表 -->
    <li v-for="(val,key) in productObj.productList">
      {{val.title}} - 价格：{{val.price}}
      

      <button>添加到购物车</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
// 引入 store 
import { productStore } from '../../store/product'
// 获取实例对象
const productObj = productStore()
// 调用actions获取数据列表
productObj.getProductList()

</script>
```


**添加购物车**
购物车添加逻辑

```javascript
// \src\store\carts.ts

import { defineStore } from "pinia";
import { IProduct } from "../api/shop";

export const cartStore = defineStore('cart', {
  state: () => {
    return {
      cartList: []
    }
  },
  getters: {},
  actions: {
    addCart(product:IProduct) {
      // 查看商品有没有库存
      // 检查购物车中是否已有该商品
      // 如果有则让商品的数量+1
      // 如果没有则添加到购物车列表中
    }
  }
})
```

```javascript
<template>
  <ul>
    <!-- 渲染数据列表 -->
    <li v-for="(val,key) in productObj.productList">
      {{val.title}} - 价格：{{val.price}}
      

      <!-- 绑定添加购物车事件,传入商品数据 -->
      <button @click="cartStore.addCart(val)">添加到购物车</button>
    </li>
  </ul>
</template>

<script setup lang="ts">
// 引入 store 
import { useCartStore } from '../../store/carts';
import { productStore } from '../../store/product'
// 获取实例对象
const productObj = productStore()
// 调用actions获取数据列表
productObj.getProductList()
// 引入并实例化购物车
const cartStore = useCartStore()

</script>
```
实现添加购物车
```javascript
// \src\store\carts.ts

import { defineStore } from "pinia";
import { IProduct } from "../api/shop";

// 使用 IProduct 合并一个新类型，同时删除一个类型
// type shopCart = { // 合并操作
//   shopCartNum: number
// } &  IProduct

// 合并且删除一个元素
type shopCart = {
  shopCartNum: number
} & Omit<IProduct, 'inventory'>

export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      // cartList: [] as IProduct[]
      cartList: [] as shopCart[]
    }
  },
  getters: {},
  actions: {
    addCart(product: IProduct) {
      // 查看商品有没有库存
      // 检查购物车中是否已有该商品
      // 如果有则让商品的数量+1
      // 如果没有则添加到购物车列表中

      // console.log(product);

      if (product.inventory < 1) {
        return;
      }
      // 查找购物车数组中是否存在
      const cartItem = this.cartList.find(item => item.id === product.id)
      // console.log(cartItem);
      if (cartItem) {
        // product.购物车数量+1
        // cartItem.shopCartNum++ 
        // ts 报错，没有 shopCartNum,需要添加数据类型

        // 为 ts 添加类型后进行运算
        cartItem.shopCartNum++
        // console.log(cartItem);

      } else {
        this.cartList.push({
          id: product.id,
          title:product.title,
          price: product.price,
          shopCartNum: 1
        })
      }

    }
  }
})
```
**去库存**操作
对外暴露去库存 actions
```vue
// \src\store\product.ts

  actions:{
    // 获取数据
    async getProductList(){
      // 写入 state
      this.productList = await getProducts()
    },

    // 去库存
    decrementProduct(product:IProduct){
      const res = this.productList.find(item=>item.id == product.id)
      if(res){
        res.inventory--
      }
    }

  }
```
调用去库存的 actions ：
```vue
// \src\store\carts.ts

  import { productStore } from './product'
  // code……

  const cartItem = this.cartList.find(item => item.id === product.id)
  if (cartItem) {
    cartItem.shopCartNum++
  } else {
    this.cartList.push({
      id: product.id,
      title:product.title,
      price: product.price,
      shopCartNum: 1
    })
  }

  // 去库存 (跨容器使用，引入并实例化)
  const productShop = productStore()
  productShop.decrementProduct(product)
```
库存清空后，禁用点击按钮
```vue
<li v-for="(val,key) in productObj.productList">
  {{val.title}} - 价格：{{val.price}}

    <!-- 库存清空后，禁用点击按钮 -->
    <button
  :disabled="!val.inventory"
  @click="cartStore.addCart(val)"
    >添加到购物车</button>
    </li>
```
购物车数据渲染
```vue
<script setup lang="ts">
import { useCartStore } from '../../store/carts'

const cartStore = useCartStore()
</script>

<template>
  <div class="cart">
    <h2>你的购物车</h2>
    <p>
      <i>请添加一些商品到购物车.</i>
    </p>
    <ul>
      <!-- 渲染购物车 -->
      <li v-for="val in cartStore.cartList">
        {{ val.title }} - {{ val.price }} x {{ val.shopCartNum }}
      </li>
    </ul>
    <p>商品总价: xxx</p>
    <p>
      <button>结算</button>
    </p>
    <p>结算成功 / 失败.</p>
  </div>
</template>
```
**购物车商品总价**

获取购物车商品总价

```vue
    <!-- 使用getter获取购物车商品总价 -->
    <p>
商品总价: {{cartStore.reduceCart}}
</p>

    <p>
      <button>结算</button>
    </p>
```
封装 getter
```vue
// \src\store\carts.ts

state: () => {
    return {
      // cartList: [] as IProduct[]
      cartList: [] as shopCart[]
    }
  },
  // 使用 getter 完成购物车总价计算
  getters: {
    reduceCart(state) {
      return state.cartList.reduce((i, val) => {
       return i + (val.price * val.shopCartNum)
      }, 0)
    }
  },
```
### 结算效果
```vue
// \src\store\carts.ts

actions: {
    // 发送结算请求，获取结果保存，成功后，清空购物车
    async checkOut() {
      const res = await buyProducts()
      this.checkoutStatus = res ? '成功' : '失败'
      // 成功后，清空购物车
      res?(this.cartList = []):''
    }
```

```vue
// \src\views\shopcart\ShoppingCart.vue

<!-- 使用getter获取购物车商品总价 -->
<p>
商品总价: {{cartStore.reduceCart}}
</p>

<p>
    <button @click="cartStore.checkOut">结算</button>
</p>

<p v-show="cartStore.checkoutStatus">
结算{{cartStore.checkoutStatus}}
</p>
```

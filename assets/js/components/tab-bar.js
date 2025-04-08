import { defineComponent } from "vue"

// 标签栏组件
export default defineComponent({
  name: "TabBar",
  props: {
    currentPage: {
      type: String,
      required: true,
    },
  },
  emits: ["change-page"],
  setup(props, { emit }) {
    // 页面切换处理函数
    const changePage = (pageName) => {
      emit("change-page", pageName)
    }

    return {
      changePage,
    }
  },
  template: /*template*/ `
    <nav class="tab-bar">
      <a href="#" 
         class="tab-item" 
         :class="{ active: currentPage === 'home' }"
         @click.prevent="changePage('home')">
        <i class="ri-home-4-line text-xl"></i>
        <span class="text-xs mt-1">首页</span>
      </a>
      <a href="#" 
         class="tab-item" 
         :class="{ active: currentPage === 'properties' }"
         @click.prevent="changePage('properties')">
        <i class="ri-building-2-line text-xl"></i>
        <span class="text-xs mt-1">房产</span>
      </a>
      <a href="#" 
         class="tab-item" 
         :class="{ active: currentPage === 'bills' }"
         @click.prevent="changePage('bills')">
        <i class="ri-file-list-3-line text-xl"></i>
        <span class="text-xs mt-1">数据概览</span>
      </a>
      <a href="#" 
         class="tab-item" 
         :class="{ active: currentPage === 'profile' }"
         @click.prevent="changePage('profile')">
        <i class="ri-user-3-line text-xl"></i>
        <span class="text-xs mt-1">我的</span>
      </a>
    </nav>
  `,
})

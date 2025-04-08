import { createApp, ref } from "vue";
import TabBar from "./components/tab-bar.js";
import HomePage from "./pages/home.js";
import PropertiesPage from "./pages/properties.js";

// 创建Vue应用
const app = createApp({
  components: {
    TabBar,
    HomePage,
    PropertiesPage,
  },
  setup() {
    // 当前页面
    const currentPage = ref("home");

    // 切换页面
    const changePage = (pageName) => {
      currentPage.value = pageName;
    };

    return {
      currentPage,
      changePage,
    };
  },
  template: /*html*/`
    <div class="app-container">
      <div class="content-area h-full overflow-y-auto pb-16">
        <!-- 根据当前页面动态渲染组件 -->
        <home-page v-if="currentPage === 'home'" />
        <properties-page v-else-if="currentPage === 'properties'" />
        <div v-else-if="currentPage === 'contracts'" class="page-container">
          <h1 class="page-title">合同管理</h1>
          <p class="text-center py-8 text-gray-500">合同管理功能即将上线</p>
        </div>
        <div v-else-if="currentPage === 'profile'" class="page-container">
          <h1 class="page-title">我的</h1>
          <p class="text-center py-8 text-gray-500">个人中心功能即将上线</p>
        </div>
      </div>
      
      <!-- 标签栏 -->
      <tab-bar 
        :current-page="currentPage" 
        @change-page="changePage"
      />
    </div>
  `,
});

// 挂载应用
app.mount("#app");

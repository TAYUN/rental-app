import { ref } from "vue";

// 首页组件
export default {
  setup() {
    // 数据概览
    const overviewData = ref({
      totalProperties: 24,
      occupancyRate: "87%",
      monthlyIncome: "¥45,600",
      pendingTasks: 3,
    });

    // 待办事项
    const todoItems = ref([
      {
        type: "待续签合同",
        status: "urgent",
        statusText: "紧急",
        description: "A栋3层301室 - 张三",
      },
      {
        type: "待处理报修",
        status: "unprocessed",
        statusText: "未处理",
        description: "B栋5层502室 - 水龙头漏水",
      },
    ]);

    // 快捷操作处理函数
    const handleAction = (action) => {
      alert(`${action}功能即将上线`);
    };

    return {
      overviewData,
      todoItems,
      handleAction,
    };
  },
  template: /*html*/`
    <div class="page-container">
      <h1 class="page-title">欢迎回来，房东</h1>
      
      <!-- 数据概览 -->
      <div class="card data-overview">
        <h2 class="text-lg font-semibold mb-2">数据概览</h2>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="text-sm opacity-75">总房源</p>
            <p class="text-2xl font-bold">{{ overviewData.totalProperties }}</p>
          </div>
          <div>
            <p class="text-sm opacity-75">出租率</p>
            <p class="text-2xl font-bold">{{ overviewData.occupancyRate }}</p>
          </div>
          <div>
            <p class="text-sm opacity-75">本月收入</p>
            <p class="text-2xl font-bold">{{ overviewData.monthlyIncome }}</p>
          </div>
          <div>
            <p class="text-sm opacity-75">待处理事项</p>
            <p class="text-2xl font-bold">{{ overviewData.pendingTasks }}</p>
          </div>
        </div>
      </div>
      
      <!-- 快捷操作 -->
      <h2 class="text-xl font-semibold mt-6 mb-4">快捷操作</h2>
      <div class="grid grid-cols-2 gap-4">
        <button class="action-button" @click="handleAction('添加房源')">
          <i class="ri-add-circle-line mr-2 text-xl"></i>
          <span>添加房源</span>
        </button>
        <button class="action-button" @click="handleAction('新建合同')">
          <i class="ri-file-add-line mr-2 text-xl"></i>
          <span>新建合同</span>
        </button>
        <button class="action-button" @click="handleAction('收租提醒')">
          <i class="ri-money-cny-circle-line mr-2 text-xl"></i>
          <span>收租提醒</span>
        </button>
        <button class="action-button" @click="handleAction('预约看房')">
          <i class="ri-calendar-check-line mr-2 text-xl"></i>
          <span>预约看房</span>
        </button>
      </div>
      
      <!-- 待办事项 -->
      <h2 class="text-xl font-semibold mt-6 mb-4">待办事项</h2>
      <div class="card" v-for="(item, index) in todoItems" :key="index">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-gray-500">{{ item.type }}</span>
          <span class="todo-badge" :class="item.status">{{ item.statusText }}</span>
        </div>
        <p class="text-text-primary">{{ item.description }}</p>
      </div>
    </div>
  `,
};

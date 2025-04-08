import { defineComponent, ref, onMounted } from "vue";
import AppHeader from "../components/app-header.js";
import LoadingSpinner from "../components/loading-spinner.js";
import { showToast } from "../utils/toast.js";
import { fetchHomeOverview } from "../services/api.js";

export default defineComponent({
  name: "HomePage",
  components: {
    AppHeader,
    LoadingSpinner,
  },
  emits: ["change-page"],
  setup(props, { emit }) {
    // 状态
    const isLoading = ref(true);

    // 数据概览
    const overviewData = ref({
      upcomingRent: 0,
      contractsExpiringSoon: 0,
      contractsExpiredNoRenewal: 0,
      missingRent: 0,
      dueUnpaid: 0,
    });

    // 加载数据
    const loadData = async () => {
      isLoading.value = true;
      try {
        const data = await fetchHomeOverview();
        overviewData.value = data;
      } catch (error) {
        console.error("加载首页数据失败:", error);
        showToast({
          message: "加载数据失败，请重试",
          type: "error",
        });
      } finally {
        isLoading.value = false;
      }
    };

    // 快捷操作处理函数
    const handleAction = (action) => {
      if (action === "账单收款") {
        emit("change-page", "bills");
      } else {
        showToast({
          message: `${action}功能即将上线`,
          type: "info",
        });
      }
    };

    // 应用功能处理函数
    const handleAppFeature = (feature) => {
      showToast({
        message: `${feature}功能即将上线`,
        type: "info",
      });
    };

    // 刷新数据
    const refreshData = () => {
      loadData();
      showToast({
        message: "数据已刷新",
        type: "success",
      });
    };

    // 组件挂载时加载数据
    onMounted(() => {
      loadData();
    });

    return {
      isLoading,
      overviewData,
      handleAction,
      handleAppFeature,
      refreshData,
    };
  },
  template: /*template*/ `
    <div class="flex flex-col h-full">
      <app-header title="房产管理" />
      
      <div class="flex-1 overflow-hidden">
        <!-- 加载中 -->
        <div v-if="isLoading" class="p-8">
          <loading-spinner />
        </div>
        
        <!-- 内容 -->
        <div v-else class="p-4 overflow-y-auto h-full">
          <!-- 下拉刷新提示 -->
          <div class="text-center text-sm text-gray-500 mb-2">
            <button @click="refreshData" class="flex items-center justify-center w-full py-2">
              <i class="ri-refresh-line mr-1"></i>
              点击刷新
            </button>
          </div>
          
          <h1 class="text-2xl font-bold mb-6">欢迎回来，房东</h1>
          
          <!-- 数据概览区域 -->
          <h2 class="text-xl font-semibold mb-4">数据概览</h2>
          <div class="card bg-gradient-to-r from-primary to-blue-400 text-white mb-6">
            <div class="grid grid-cols-2 gap-4">
              <div class="p-3">
                <p class="text-sm opacity-75">即将收租</p>
                <p class="text-2xl font-bold">{{ overviewData.upcomingRent }}</p>
              </div>
              <div class="p-3">
                <p class="text-sm opacity-75">合同即将到期</p>
                <p class="text-2xl font-bold">{{ overviewData.contractsExpiringSoon }}</p>
              </div>
              <div class="p-3">
                <p class="text-sm opacity-75">合同到期未续租</p>
                <p class="text-2xl font-bold">{{ overviewData.contractsExpiredNoRenewal }}</p>
              </div>
              <div class="p-3">
                <p class="text-sm opacity-75">房租缺失</p>
                <p class="text-2xl font-bold">{{ overviewData.missingRent }}</p>
              </div>
              <div class="p-3 col-span-2">
                <p class="text-sm opacity-75">适期未交租</p>
                <p class="text-2xl font-bold">{{ overviewData.dueUnpaid }}</p>
              </div>
            </div>
          </div>

          <!-- 快捷操作区域 -->
          <h2 class="text-xl font-semibold mb-4">快捷操作</h2>
          <div class="grid grid-cols-2 gap-4 mb-6">
            <button class="action-button" @click="handleAction('添加合同')">
              <i class="ri-user-add-line mr-2 text-xl"></i>
              <span>添加合同</span>
            </button>
            <button class="action-button" @click="handleAction('房间抄表')">
              <i class="ri-file-list-line mr-2 text-xl"></i>
              <span>房间抄表</span>
            </button>
            <button class="action-button" @click="handleAction('账单收款')">
              <i class="ri-bill-line mr-2 text-xl"></i>
              <span>账单收款</span>
            </button>
            <button class="action-button" @click="handleAction('添加房产')">
              <i class="ri-database-2-line mr-2 text-xl"></i>
              <span>添加房产</span>
            </button>
          </div>
                         
          <!-- 我的应用区域 -->
          <h2 class="text-xl font-semibold mb-4">我的应用</h2>
          <div class="grid grid-cols-3 gap-4">
            <div 
              class="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm cursor-pointer"
              @click="handleAppFeature('费用管理')"
            >
              <i class="ri-money-cny-circle-line text-3xl text-primary mb-2"></i>
              <span class="text-sm">费用管理</span>
            </div>
            <div 
              class="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm cursor-pointer"
              @click="handleAppFeature('家庭管理')"
            >
              <i class="ri-home-heart-line text-3xl text-primary mb-2"></i>
              <span class="text-sm">家庭管理</span>
            </div>
            <div 
              class="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm cursor-pointer"
              @click="handleAppFeature('收租方式')"
            >
              <i class="ri-bank-card-line text-3xl text-primary mb-2"></i>
              <span class="text-sm">收租方式</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
});

import { defineComponent, ref, onMounted } from "vue"
import AppHeader from "../components/app-header.js"
import LoadingSpinner from "../components/loading-spinner.js"
import { showToast } from "../utils/toast.js"
import { fetchBills } from "../services/api.js"

export default defineComponent({
  name: "BillsPage",
  components: {
    AppHeader,
    LoadingSpinner,
  },
  setup() {
    // 状态
    const isLoading = ref(true)
    const bills = ref([])

    // 加载账单数据
    const loadBills = async () => {
      isLoading.value = true
      try {
        const data = await fetchBills()
        bills.value = data
      } catch (error) {
        console.error("加载账单数据失败:", error)
        showToast({
          message: "加载数据失败，请重试",
          type: "error",
        })
      } finally {
        isLoading.value = false
      }
    }

    // 处理账单点击
    const handleBillClick = (bill) => {
      showToast({
        message: `查看账单详情功能即将上线`,
        type: "info",
      })
    }

    // 刷新数据
    const refreshData = () => {
      loadBills()
      showToast({
        message: "数据已刷新",
        type: "success",
      })
    }

    // 组件挂载时加载数据
    onMounted(() => {
      loadBills()
    })

    return {
      isLoading,
      bills,
      handleBillClick,
      refreshData,
    }
  },
  template: /*template*/ `
    <div class="flex flex-col h-full">
      <app-header title="账单列表" />
      
      <div class="flex-1 overflow-hidden">
        <!-- 加载中 -->
        <div v-if="isLoading" class="p-8">
          <loading-spinner />
        </div>
        
        <!-- 账单列表 -->
        <div v-else class="p-4 overflow-y-auto h-full">
          <!-- 下拉刷新提示 -->
          <div class="text-center text-sm text-gray-500 mb-2">
            <button @click="refreshData" class="flex items-center justify-center w-full py-2">
              <i class="ri-refresh-line mr-1"></i>
              点击刷新
            </button>
          </div>
          
          <!-- 无数据提示 -->
          <div v-if="bills.length === 0" class="text-center py-8 text-gray-500">
            <i class="ri-inbox-line text-4xl mb-2 block"></i>
            <p>暂无账单数据</p>
          </div>
          
          <!-- 账单列表 -->
          <div 
            v-for="bill in bills" 
            :key="bill.id" 
            class="bg-white rounded-lg shadow-sm p-4 mb-4 cursor-pointer hover:shadow-md transition-shadow"
            @click="handleBillClick(bill)"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-medium">{{ bill.title }}</h3>
              <span 
                class="text-xs px-2 py-0.5 rounded-full text-white"
                :class="{
                  'bg-success': bill.status === 'paid',
                  'bg-warning': bill.status === 'due',
                  'bg-error': bill.status === 'overdue',
                  'bg-gray-500': bill.status === 'pending'
                }"
              >
                {{ 
                  bill.status === 'paid' ? '已缴费' : 
                  bill.status === 'due' ? '欠款' : 
                  bill.status === 'overdue' ? '逾期' : '待付款' 
                }}
              </span>
            </div>
            
            <div class="text-sm text-gray-600 mb-1">
              <div class="flex items-center">
                <i class="ri-calendar-line mr-1 text-gray-400"></i>
                <span>账期：{{ bill.period }}</span>
              </div>
            </div>
            
            <div class="text-sm text-gray-600 mb-1">
              <div class="flex items-center">
                <i class="ri-time-line mr-1 text-gray-400"></i>
                <span>应付日期：{{ bill.dueDate }}</span>
              </div>
            </div>
            
            <div class="text-sm text-gray-600 mb-2">
              <div class="flex items-center">
                <i class="ri-user-line mr-1 text-gray-400"></i>
                <span>{{ bill.accountInfo }}</span>
              </div>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-lg font-bold">¥{{ bill.amount.toLocaleString() }}</span>
              <span v-if="bill.overdueDays > 0" class="text-xs text-error">
                逾期{{ bill.overdueDays }}天
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})

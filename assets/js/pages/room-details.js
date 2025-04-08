import { defineComponent, ref, computed } from "vue"
import AppHeader from "../components/app-header.js"
import { showToast } from "../utils/toast.js"

export default defineComponent({
  name: "RoomDetailsPage",
  components: {
    AppHeader,
  },
  props: {
    roomId: {
      type: String,
      required: true,
    },
  },
  emits: ["back"],
  setup(props, { emit }) {
    // Simulated room data - in a real app, this would come from an API or store
    const room = ref({
      id: props.roomId,
      buildingName: props.roomId.startsWith("A") ? "A栋" : "B栋",
      floor: props.roomId.startsWith("A") ? "3层" : "5层",
      number: props.roomId.startsWith("A")
        ? props.roomId === "A301"
          ? "301室"
          : "302室"
        : props.roomId === "B501"
          ? "501室"
          : "502室",
      area:
        props.roomId === "A301"
          ? "80m²"
          : props.roomId === "A302"
            ? "60m²"
            : props.roomId === "B501"
              ? "100m²"
              : "90m²",
      layout:
        props.roomId === "A301"
          ? "2室1厅"
          : props.roomId === "A302"
            ? "1室1厅"
            : props.roomId === "B501"
              ? "3室2厅"
              : "2室2厅",
      status: props.roomId === "A302" ? "vacant" : "rented",
      statusText: props.roomId === "A302" ? "待出租" : "已出租",
      monthlyRent:
        props.roomId === "A301" ? 3500 : props.roomId === "A302" ? 2800 : props.roomId === "B501" ? 5200 : 4800,
      deposit: props.roomId === "A301" ? 7000 : props.roomId === "A302" ? 5600 : props.roomId === "B501" ? 10400 : 9600,
      tenant:
        props.roomId === "A302"
          ? null
          : {
              name: props.roomId === "A301" ? "张三" : props.roomId === "B501" ? "李四" : "王五",
              phone: props.roomId === "A301" ? "13812345678" : props.roomId === "B501" ? "13987654321" : "13567891234",
              leaseStart:
                props.roomId === "A301" ? "2023-05-01" : props.roomId === "B501" ? "2023-03-15" : "2023-06-10",
              leaseEnd: props.roomId === "A301" ? "2024-05-01" : props.roomId === "B501" ? "2024-03-15" : "2024-06-10",
            },
      facilities: ["空调", "热水器", "冰箱", "洗衣机", "电视", "宽带", "床", "衣柜", "沙发", "餐桌"].slice(
        0,
        props.roomId === "A301" ? 8 : props.roomId === "A302" ? 6 : props.roomId === "B501" ? 10 : 9,
      ),
    })

    // Computed properties
    const isRented = computed(() => room.value.status === "rented")
    const leaseRemainingDays = computed(() => {
      if (!isRented.value || !room.value.tenant) return 0

      const today = new Date()
      const endDate = new Date(room.value.tenant.leaseEnd)
      const diffTime = endDate - today
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    })

    // Actions
    const handleEditRoom = () => {
      showToast({
        message: "编辑房间功能即将上线",
        type: "info",
      })
    }

    const handleRentRoom = () => {
      showToast({
        message: "出租房间功能即将上线",
        type: "info",
      })
    }

    const handleContactTenant = () => {
      showToast({
        message: "联系租户功能即将上线",
        type: "info",
      })
    }

    const handleBack = () => {
      emit("back")
    }

    return {
      room,
      isRented,
      leaseRemainingDays,
      handleEditRoom,
      handleRentRoom,
      handleContactTenant,
      handleBack,
    }
  },
  template: /*template*/ `
    <div class="flex flex-col h-full">
      <app-header 
        :title="room.buildingName + room.floor + room.number" 
        :show-back-button="true"
        @back="handleBack"
      />
      
      <div class="flex-1 overflow-y-auto p-4">
        <!-- 房间状态卡片 -->
        <div class="card mb-4" :class="{ 'bg-success/10': isRented, 'bg-warning/10': !isRented }">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">房间状态</h2>
            <span class="room-status" :class="room.status">{{ room.statusText }}</span>
          </div>
          
          <div class="mt-2 grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500">月租金</p>
              <p class="text-xl font-bold">¥{{ room.monthlyRent }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500">押金</p>
              <p class="text-xl font-bold">¥{{ room.deposit }}</p>
            </div>
          </div>
          
          <div class="mt-4 flex justify-end">
            <button 
              class="px-4 py-2 bg-primary text-white rounded-lg flex items-center"
              @click="handleEditRoom"
            >
              <i class="ri-edit-line mr-1"></i>
              编辑
            </button>
          </div>
        </div>
        
        <!-- 租户信息 -->
        <div v-if="isRented && room.tenant" class="card mb-4">
          <h2 class="text-lg font-semibold mb-2">租户信息</h2>
          
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-500">姓名</span>
              <span>{{ room.tenant.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">电话</span>
              <span>{{ room.tenant.phone }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">租期</span>
              <span>{{ room.tenant.leaseStart }} 至 {{ room.tenant.leaseEnd }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">剩余天数</span>
              <span :class="leaseRemainingDays < 30 ? 'text-error font-bold' : ''">
                {{ leaseRemainingDays }} 天
              </span>
            </div>
          </div>
          
          <div class="mt-4 flex justify-end">
            <button 
              class="px-4 py-2 bg-primary text-white rounded-lg flex items-center"
              @click="handleContactTenant"
            >
              <i class="ri-phone-line mr-1"></i>
              联系租户
            </button>
          </div>
        </div>
        
        <!-- 待出租操作 -->
        <div v-if="!isRented" class="card mb-4">
          <h2 class="text-lg font-semibold mb-2">出租操作</h2>
          <p class="text-gray-500 mb-4">该房间目前空置，您可以将其出租给新租户。</p>
          
          <div class="flex justify-end">
            <button 
              class="px-4 py-2 bg-primary text-white rounded-lg flex items-center"
              @click="handleRentRoom"
            >
              <i class="ri-user-add-line mr-1"></i>
              出租房间
            </button>
          </div>
        </div>
        
        <!-- 房间详情 -->
        <div class="card mb-4">
          <h2 class="text-lg font-semibold mb-2">房间详情</h2>
          
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-500">面积</span>
              <span>{{ room.area }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">户型</span>
              <span>{{ room.layout }}</span>
            </div>
          </div>
        </div>
        
        <!-- 设施列表 -->
        <div class="card">
          <h2 class="text-lg font-semibold mb-2">配套设施</h2>
          
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="facility in room.facilities" 
              :key="facility"
              class="px-3 py-1 bg-neutral-light rounded-full text-sm"
            >
              {{ facility }}
            </span>
          </div>
        </div>
      </div>
    </div>
  `,
})

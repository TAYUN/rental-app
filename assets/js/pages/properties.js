import { defineComponent, ref, computed, onMounted } from "vue";
import AppHeader from "../components/app-header.js";
import LoadingSpinner from "../components/loading-spinner.js";
import { showToast } from "../utils/toast.js";
import { fetchBuildings } from "../services/api.js";

export default defineComponent({
  name: "PropertiesPage",
  components: {
    AppHeader,
    LoadingSpinner,
  },
  emits: ["view-room-details"],
  setup(props, { emit }) {
    // 状态
    const isLoading = ref(true);
    const searchText = ref("");
    const buildings = ref([]);
    const selectedFilter = ref("all"); // 'all', 'due', 'paid', 'overdue'

    // 加载楼栋数据
    const loadBuildingsData = async () => {
      isLoading.value = true;
      try {
        const data = await fetchBuildings();
        buildings.value = data;
      } catch (error) {
        console.error("加载楼栋数据失败:", error);
        showToast({
          message: "加载数据失败，请重试",
          type: "error",
        });
      } finally {
        isLoading.value = false;
      }
    };

    // 过滤后的房源
    const filteredBuildings = computed(() => {
      if (!searchText.value && selectedFilter.value === "all") {
        return buildings.value || [];
      }

      return (buildings.value || [])
        .map((building) => {
          const filteredFloors = building.floors
            .map((floor) => {
              const filteredRooms = floor.rooms.filter((room) => {
                // 搜索文本过滤
                const searchLower = searchText.value.toLowerCase();
                const roomInfo =
                  `${building.buildingName}${floor.floorNumber}${room.roomNumber}${room.tenantName}`.toLowerCase();
                const matchesSearch =
                  !searchText.value || roomInfo.includes(searchLower);

                // 状态过滤
                const matchesFilter =
                  selectedFilter.value === "all" ||
                  (selectedFilter.value === "due" && room.status === "due") ||
                  (selectedFilter.value === "paid" && room.status === "paid") ||
                  (selectedFilter.value === "overdue" &&
                    room.status === "overdue") ||
                  (selectedFilter.value === "pending" &&
                    room.status === "pending");

                return matchesSearch && matchesFilter;
              });

              if (filteredRooms.length > 0) {
                return {
                  ...floor,
                  rooms: filteredRooms,
                };
              }
              return null;
            })
            .filter((floor) => floor !== null);

          if (filteredFloors.length > 0) {
            return {
              ...building,
              floors: filteredFloors,
            };
          }
          return null;
        })
        .filter((building) => building !== null);
    });

    // 统计信息
    const stats = computed(() => {
      let total = 0;
      let due = 0;
      let overdue = 0;

      buildings.value.forEach((building) => {
        building.floors.forEach((floor) => {
          floor.rooms.forEach((room) => {
            total++;
            if (room.status === "due") {
              due++;
            } else if (room.status === "overdue") {
              overdue++;
            }
          });
        });
      });

      return {
        total,
        due,
        overdue,
      };
    });

    // 过滤后的统计信息
    const filteredStats = computed(() => {
      let total = 0;
      let due = 0;
      let overdue = 0;
      console.log("filteredBuildings.value", filteredBuildings.value);

      (filteredBuildings.value || []).forEach((building) => {
        building.floors.forEach((floor) => {
          floor.rooms.forEach((room) => {
            total++;
            if (room.status === "due") {
              due++;
            } else if (room.status === "overdue") {
              overdue++;
            }
          });
        });
      });

      return {
        total,
        due,
        overdue,
      };
    });

    // 设置过滤器
    const setFilter = (filter) => {
      selectedFilter.value = filter;
    };

    // 查看房间详情
    const handleViewRoomDetails = (buildingId, floorNumber, roomNumber) => {
      const roomId = `${buildingId}-${floorNumber}-${roomNumber}`.replace(
        /[层室]/g,
        ""
      );
      emit("view-room-details", roomId);
    };

    // 刷新数据
    const refreshData = () => {
      loadBuildingsData();
      showToast({
        message: "数据已刷新",
        type: "success",
      });
    };

    // 组件挂载时加载数据
    onMounted(() => {
      loadBuildingsData();
    });

    return {
      isLoading,
      searchText,
      selectedFilter,
      filteredBuildings,
      stats,
      filteredStats,
      setFilter,
      handleViewRoomDetails,
      refreshData,
    };
  },
  template: /*template*/ `
    <div class="flex flex-col h-full">
      <app-header title="房产管理" />
      
      <div class="flex-1 overflow-hidden">
        <!-- 搜索和筛选 -->
        <div class="p-4 sticky top-0 bg-white z-10 shadow-sm">
          <div class="flex justify-between items-center mb-4">
            <div class="flex-1 mr-2">
              <div class="relative">
                <input 
                  type="text" 
                  v-model="searchText"
                  placeholder="搜索房源..." 
                  class="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                <i class="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>
          </div>
          
          <!-- 筛选按钮 -->
          <div class="flex space-x-2 mb-4 overflow-x-auto pb-2">
            <button 
              class="px-3 py-1 rounded-full text-sm whitespace-nowrap"
              :class="selectedFilter === 'all' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'"
              @click="setFilter('all')"
            >
              全部
            </button>
            <button 
              class="px-3 py-1 rounded-full text-sm whitespace-nowrap"
              :class="selectedFilter === 'due' ? 'bg-warning text-white' : 'bg-gray-200 text-gray-700'"
              @click="setFilter('due')"
            >
              欠款
            </button>
            <button 
              class="px-3 py-1 rounded-full text-sm whitespace-nowrap"
              :class="selectedFilter === 'paid' ? 'bg-success text-white' : 'bg-gray-200 text-gray-700'"
              @click="setFilter('paid')"
            >
              已缴费
            </button>
            <button 
              class="px-3 py-1 rounded-full text-sm whitespace-nowrap"
              :class="selectedFilter === 'overdue' ? 'bg-error text-white' : 'bg-gray-200 text-gray-700'"
              @click="setFilter('overdue')"
            >
              逾期
            </button>
            <button 
              class="px-3 py-1 rounded-full text-sm whitespace-nowrap"
              :class="selectedFilter === 'pending' ? 'bg-gray-500 text-white' : 'bg-gray-200 text-gray-700'"
              @click="setFilter('pending')"
            >
              待付款
            </button>
          </div>
          
          <!-- 统计信息 -->
          <div class="flex justify-between bg-neutral-light rounded-lg p-3 text-sm">
            <div>
              <span class="text-gray-500">总房间:</span>
              <span class="font-semibold ml-1">{{ filteredStats.total }}/{{ stats.total }}</span>
            </div>
            <div>
              <span class="text-gray-500">欠款:</span>
              <span class="font-semibold ml-1 text-warning">{{ filteredStats.due }}</span>
            </div>
            <div>
              <span class="text-gray-500">逾期:</span>
              <span class="font-semibold ml-1 text-error">{{ filteredStats.overdue }}</span>
            </div>
          </div>
        </div>
        
        <!-- 加载中 -->
        <div v-if="isLoading" class="p-8">
          <loading-spinner />
        </div>
        
        <!-- 房源列表 -->
        <div v-else class="p-4 pt-0 overflow-y-auto h-[calc(100%-140px)]">
          <!-- 下拉刷新提示 -->
          <div class="text-center text-sm text-gray-500 mb-2">
            <button @click="refreshData" class="flex items-center justify-center w-full py-2">
              <i class="ri-refresh-line mr-1"></i>
              点击刷新
            </button>
          </div>
          
          <!-- 无数据提示 -->
          <div v-if="filteredBuildings.length === 0" class="text-center py-8 text-gray-500">
            <i class="ri-inbox-line text-4xl mb-2 block"></i>
            <p>没有找到匹配的房源</p>
          </div>
          
          <!-- 楼栋列表 -->
          <div 
            v-for="(building, buildingIndex) in filteredBuildings" 
            :key="buildingIndex" 
            class="mb-6"
          >
            <h2 class="text-lg font-semibold mb-3 flex items-center bg-gray-100 p-2 rounded-lg">
              <i class="ri-building-2-line mr-1"></i>
              {{ building.buildingId }} ({{ building.buildingName }})
            </h2>
            
            <!-- 楼层列表 -->
            <div 
              v-for="(floor, floorIndex) in building.floors" 
              :key="floorIndex"
              class="mb-4"
            >
              <h3 class="text-md font-medium mb-2 flex items-center bg-gray-50 p-2 rounded-lg">
                <i class="ri-stack-line mr-1"></i>
                {{ floor.floorNumber }}
              </h3>
              
              <!-- 房间列表 - 两列布局 -->
              <div class="grid grid-cols-2 gap-3">
                <div 
                  v-for="(room, roomIndex) in floor.rooms" 
                  :key="roomIndex"
                  class="bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  @click="handleViewRoomDetails(building.buildingId, floor.floorNumber, room.roomNumber)"
                >
                  <div class="flex justify-between items-start mb-1">
                    <span class="font-medium">{{ room.roomNumber }}</span>
                    <span 
                      class="text-xs px-2 py-0.5 rounded-full text-white"
                      :class="{
                        'bg-success': room.status === 'paid',
                        'bg-warning': room.status === 'due',
                        'bg-error': room.status === 'overdue',
                        'bg-gray-500': room.status === 'pending'
                      }"
                    >
                      {{ 
                        room.status === 'paid' ? '已缴费' : 
                        room.status === 'due' ? '欠款' : 
                        room.status === 'overdue' ? '逾期' : '待付款' 
                      }}
                    </span>
                  </div>
                  <div class="text-sm text-gray-600">{{ room.tenantName }}</div>
                  <div class="flex justify-between items-center mt-1">
                    <span class="text-sm font-semibold">¥{{ room.rentAmount.toLocaleString() }}</span>
                    <span v-if="room.overdueDays" class="text-xs text-error">
                      逾期{{ room.overdueDays }}天
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
});

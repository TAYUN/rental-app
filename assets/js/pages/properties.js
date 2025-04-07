import { ref, computed } from "vue";

// 房源页面组件
export default {
  setup() {
    // 搜索关键词
    const searchText = ref("");

    // 房源数据
    const buildings = ref([
      {
        name: "A栋",
        rooms: [
          {
            id: "A301",
            floor: "3层",
            number: "301室",
            area: "80m²",
            layout: "2室1厅",
            status: "rented",
            statusText: "已出租",
          },
          {
            id: "A302",
            floor: "3层",
            number: "302室",
            area: "60m²",
            layout: "1室1厅",
            status: "vacant",
            statusText: "待出租",
          },
        ],
      },
      {
        name: "B栋",
        rooms: [
          {
            id: "B501",
            floor: "5层",
            number: "501室",
            area: "100m²",
            layout: "3室2厅",
            status: "rented",
            statusText: "已出租",
          },
          {
            id: "B502",
            floor: "5层",
            number: "502室",
            area: "90m²",
            layout: "2室2厅",
            status: "rented",
            statusText: "已出租",
          },
        ],
      },
    ]);

    // 过滤后的房源
    const filteredBuildings = computed(() => {
      if (!searchText.value) {
        return buildings.value;
      }

      return buildings.value
        .map((building) => {
          const filteredRooms = building.rooms.filter((room) => {
            const searchLower = searchText.value.toLowerCase();
            const roomInfo =
              `${building.name}${room.floor}${room.number}${room.layout}${room.statusText}`.toLowerCase();
            return roomInfo.includes(searchLower);
          });

          if (filteredRooms.length > 0) {
            return {
              ...building,
              rooms: filteredRooms,
            };
          }
          return null;
        })
        .filter((building) => building !== null);
    });

    // 添加房源处理函数
    const handleAddProperty = () => {
      alert("添加房源功能即将上线");
    };

    return {
      searchText,
      filteredBuildings,
      handleAddProperty,
    };
  },
  template: `
    <div class="page-container">
      <div class="flex justify-between items-center mb-6">
        <h1 class="page-title">我的房源</h1>
        <button class="bg-primary text-white px-4 py-2 rounded-lg flex items-center" @click="handleAddProperty">
          <i class="ri-add-line mr-1"></i>
          添加
        </button>
      </div>
      
      <div class="mb-4">
        <input 
          type="text" 
          v-model="searchText"
          placeholder="搜索房源..." 
          class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        >
      </div>
      
      <div v-if="filteredBuildings.length === 0" class="text-center py-8 text-gray-500">
        没有找到匹配的房源
      </div>
      
      <div v-for="(building, index) in filteredBuildings" :key="index" class="card" :class="{ 'mt-4': index > 0 }">
        <h2 class="text-lg font-semibold mb-2">{{ building.name }}</h2>
        <div class="space-y-2">
          <div 
            v-for="room in building.rooms" 
            :key="room.id"
            class="flex justify-between items-center p-2 bg-neutral-light rounded-lg"
          >
            <div>
              <p class="font-medium">{{ room.floor }}{{ room.number }}</p>
              <p class="text-sm text-text-secondary">{{ room.area }} | {{ room.layout }}</p>
            </div>
            <span class="room-status" :class="room.status">{{ room.statusText }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
};

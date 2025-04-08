import { createApp, ref, markRaw } from "vue"
import TabBar from "./components/tab-bar.js"
import HomePage from "./pages/home.js"
import PropertiesPage from "./pages/properties.js"
import BillsPage from "./pages/bills.js"
import ProfilePage from "./pages/profile.js"
import RoomDetailsPage from "./pages/room-details.js"

// 创建Vue应用
const app = createApp({
  components: {
    TabBar,
    HomePage,
    PropertiesPage,
    BillsPage,
    ProfilePage,
    RoomDetailsPage,
  },
  setup() {
    // 当前页面
    const currentPage = ref("home")

    // 子页面状态
    const subPageState = ref({
      roomDetailsId: null,
    })

    // 页面历史记录
    const pageHistory = ref([])

    // 切换页面
    const changePage = (pageName) => {
      // 保存当前页面到历史记录
      if (currentPage.value !== pageName) {
        pageHistory.value.push({
          page: currentPage.value,
          state: markRaw({ ...subPageState.value }),
        })
      }

      currentPage.value = pageName
    }

    // 查看房间详情
    const viewRoomDetails = (roomId) => {
      subPageState.value.roomDetailsId = roomId
      changePage("roomDetails")
    }

    // 返回上一页
    const goBack = () => {
      if (pageHistory.value.length > 0) {
        const prevPage = pageHistory.value.pop()
        currentPage.value = prevPage.page
        subPageState.value = prevPage.state
      } else {
        // 如果没有历史记录，默认返回首页
        currentPage.value = "home"
        subPageState.value = { roomDetailsId: null }
      }
    }

    return {
      currentPage,
      subPageState,
      changePage,
      viewRoomDetails,
      goBack,
    }
  },
  template: /*template*/ `
  <div class="app-container">
    <div class="content-area">
      <!-- 根据当前页面动态渲染组件 -->
      <home-page 
        v-if="currentPage === 'home'" 
        @change-page="changePage"
      />
      
      <properties-page 
        v-else-if="currentPage === 'properties'" 
        @view-room-details="viewRoomDetails"
      />
      
      <bills-page
        v-else-if="currentPage === 'bills'"
      />
      
      <profile-page
        v-else-if="currentPage === 'profile'"
      />
      
      <room-details-page 
        v-else-if="currentPage === 'roomDetails'" 
        :room-id="subPageState.roomDetailsId"
        @back="goBack"
      />
    </div>
    
    <!-- 标签栏 (只在主页面显示) -->
    <tab-bar 
      v-if="['home', 'properties', 'bills', 'profile'].includes(currentPage)"
      :current-page="currentPage" 
      @change-page="changePage"
    />
  </div>
`,
})

// 挂载应用
app.mount("#app")

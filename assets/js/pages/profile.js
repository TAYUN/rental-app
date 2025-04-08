import { defineComponent } from "vue"
import AppHeader from "../components/app-header.js"

export default defineComponent({
  name: "ProfilePage",
  components: {
    AppHeader,
  },
  setup() {
    return {}
  },
  template: /*template*/ `
    <div class="flex flex-col h-full">
      <app-header title="我的" />
      
      <div class="flex-1 overflow-y-auto p-4">
        <div class="text-center py-8">
          <i class="ri-user-line text-6xl text-gray-300 mb-4"></i>
          <p class="text-gray-500">个人中心功能即将上线</p>
        </div>
      </div>
    </div>
  `,
})

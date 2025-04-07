// 标签栏组件
export default {
  props: {
    currentPage: {
      type: String,
      required: true,
    },
  },
  template: `
    <nav class="tab-bar">
      <a href="#" 
         class="tab-item" 
         :class="{ active: currentPage === 'home' }"
         @click.prevent="$emit('change-page', 'home')">
        <i class="ri-home-4-line text-xl"></i>
        <span class="text-xs mt-1">首页</span>
      </a>
      <a href="#" 
         class="tab-item" 
         :class="{ active: currentPage === 'properties' }"
         @click.prevent="$emit('change-page', 'properties')">
        <i class="ri-building-2-line text-xl"></i>
        <span class="text-xs mt-1">房源</span>
      </a>
      <a href="#" 
         class="tab-item" 
         :class="{ active: currentPage === 'contracts' }"
         @click.prevent="$emit('change-page', 'contracts')">
        <i class="ri-file-list-3-line text-xl"></i>
        <span class="text-xs mt-1">合同</span>
      </a>
      <a href="#" 
         class="tab-item" 
         :class="{ active: currentPage === 'profile' }"
         @click.prevent="$emit('change-page', 'profile')">
        <i class="ri-user-3-line text-xl"></i>
        <span class="text-xs mt-1">我的</span>
      </a>
    </nav>
  `,
};

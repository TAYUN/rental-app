import { defineComponent } from "vue"

export default defineComponent({
  name: "AppHeader",
  props: {
    title: {
      type: String,
      required: true,
    },
    showBackButton: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["back"],
  setup(props, { emit }) {
    const handleBack = () => {
      emit("back")
    }

    return {
      handleBack,
    }
  },
  template: /*template*/ `
    <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center sticky top-0 z-10">
      <button 
        v-if="showBackButton" 
        @click="handleBack"
        class="mr-2 text-gray-500 hover:text-primary"
      >
        <i class="ri-arrow-left-line text-xl"></i>
      </button>
      <h1 class="text-lg font-semibold flex-1 text-center">{{ title }}</h1>
    </header>
`,
})

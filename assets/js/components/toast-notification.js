import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue"

export default defineComponent({
  name: "ToastNotification",
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "info", // info, success, error, warning
    },
    duration: {
      type: Number,
      default: 3000,
    },
    position: {
      type: String,
      default: "bottom", // top, bottom
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const visible = ref(false)
    let timer = null

    const typeClasses = {
      info: "bg-primary text-white",
      success: "bg-success text-white",
      error: "bg-error text-white",
      warning: "bg-warning text-white",
    }

    const positionClasses = {
      top: "top-10",
      bottom: "bottom-20", // Above tab bar
    }

    const close = () => {
      visible.value = false
      setTimeout(() => {
        emit("close")
      }, 300) // Wait for fade out animation
    }

    onMounted(() => {
      // Show with animation
      setTimeout(() => {
        visible.value = true
      }, 10)

      // Auto close after duration
      timer = setTimeout(close, props.duration)
    })

    onBeforeUnmount(() => {
      if (timer) {
        clearTimeout(timer)
      }
    })

    return {
      visible,
      typeClass: typeClasses[props.type] || typeClasses.info,
      positionClass: positionClasses[props.position] || positionClasses.bottom,
      close,
    }
  },
  template: /*template*/ `
    <div 
      class="fixed left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-lg shadow-lg max-w-[90%] transition-all duration-300"
      :class="[typeClass, positionClass, visible ? 'opacity-100' : 'opacity-0 translate-y-4']"
    >
      <div class="flex items-center">
        <span>{{ message }}</span>
        <button @click="close" class="ml-2 text-white/80 hover:text-white">
          <i class="ri-close-line"></i>
        </button>
      </div>
    </div>
  `,
})

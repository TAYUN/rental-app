import { defineComponent } from "vue"

export default defineComponent({
  name: "LoadingSpinner",
  props: {
    size: {
      type: String,
      default: "md", // sm, md, lg
    },
    color: {
      type: String,
      default: "primary", // primary, white
    },
  },
  setup(props) {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-8 h-8",
      lg: "w-12 h-12",
    }

    const colorClasses = {
      primary: "text-primary",
      white: "text-white",
    }

    return {
      sizeClass: sizeClasses[props.size] || sizeClasses.md,
      colorClass: colorClasses[props.color] || colorClasses.primary,
    }
  },
  template: /*template*/ `
    <div class="flex justify-center items-center">
      <svg 
        :class="[sizeClass, colorClass]" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
        class="animate-spin"
      >
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-opacity="0.75"></path>
      </svg>
    </div>
  `,
})

import { defineComponent } from "vue"

export default defineComponent({
  name: "RoomCard",
  props: {
    room: {
      type: Object,
      required: true,
    },
    buildingName: {
      type: String,
      required: true,
    },
  },
  emits: ["view-details"],
  setup(props, { emit }) {
    const viewDetails = () => {
      emit("view-details", props.room)
    }

    return {
      viewDetails,
    }
  },
  template: /*template*/ `
    <div 
      class="flex justify-between items-center p-3 bg-neutral-light rounded-lg hover:bg-neutral-light/80 transition-colors cursor-pointer"
      @click="viewDetails"
    >
      <div>
        <p class="font-medium">{{ room.floor }}{{ room.number }}</p>
        <p class="text-sm text-text-secondary">{{ room.area }} | {{ room.layout }}</p>
      </div>
      <div class="flex items-center">
        <span class="room-status mr-2" :class="room.status">{{ room.statusText }}</span>
        <i class="ri-arrow-right-s-line text-gray-400"></i>
      </div>
    </div>
  `,
})

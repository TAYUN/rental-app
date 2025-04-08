import { createApp, h } from "vue"
import ToastNotification from "../components/toast-notification.js"

let toastContainer = null
let currentToast = null

// Create toast container if it doesn't exist
function ensureContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.className = "toast-container"
    document.body.appendChild(toastContainer)
  }
}

// Show toast notification
export function showToast(options) {
  // Default options
  const config = {
    message: "",
    type: "info",
    duration: 3000,
    position: "top",
    ...options,
  }

  // Remove existing toast
  if (currentToast) {
    currentToast.unmount()
    currentToast = null
  }

  // Ensure container exists
  ensureContainer()

  // Create toast element
  const toastElement = document.createElement("div")
  toastContainer.appendChild(toastElement)

  // Create and mount toast component
  currentToast = createApp({
    render() {
      return h(ToastNotification, {
        ...config,
        onClose: () => {
          currentToast.unmount()
          toastContainer.removeChild(toastElement)
          currentToast = null
        },
      })
    },
  })

  currentToast.mount(toastElement)

  return {
    close: () => {
      if (currentToast) {
        currentToast.unmount()
        toastContainer.removeChild(toastElement)
        currentToast = null
      }
    },
  }
}

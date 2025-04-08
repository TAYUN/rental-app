// Local storage utility functions

// Save data to local storage
export function saveData(key, data) {
  try {
    const serializedData = JSON.stringify(data)
    localStorage.setItem(key, serializedData)
    return true
  } catch (error) {
    console.error("Error saving data to local storage:", error)
    return false
  }
}

// Load data from local storage
export function loadData(key, defaultValue = null) {
  try {
    const serializedData = localStorage.getItem(key)
    if (serializedData === null) {
      return defaultValue
    }
    return JSON.parse(serializedData)
  } catch (error) {
    console.error("Error loading data from local storage:", error)
    return defaultValue
  }
}

// Remove data from local storage
export function removeData(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error("Error removing data from local storage:", error)
    return false
  }
}

// Clear all data from local storage
export function clearAllData() {
  try {
    localStorage.clear()
    return true
  } catch (error) {
    console.error("Error clearing local storage:", error)
    return false
  }
}

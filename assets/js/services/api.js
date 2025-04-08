import { homeOverviewData, buildingsData, billsData } from "../mock/data.js"
import { loadData, saveData } from "../utils/storage.js"

// 模拟API延迟
const MOCK_DELAY = 0

// 获取首页数据概览
export const fetchHomeOverview = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(homeOverviewData)
    }, MOCK_DELAY)
  })
}

// 获取楼栋数据
export const fetchBuildings = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedData = loadData("buildings", null)
      if (savedData) {
        resolve(savedData)
      } else {
        // 保存到本地存储
        saveData("buildings", buildingsData)
        resolve(buildingsData)
      }
    }, MOCK_DELAY)
  })
}

// 获取账单数据
export const fetchBills = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(billsData)
    }, MOCK_DELAY)
  })
}

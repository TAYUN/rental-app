// 模拟数据

// 首页数据概览
export const homeOverviewData = {
  upcomingRent: 5,
  contractsExpiringSoon: 3,
  contractsExpiredNoRenewal: 1,
  missingRent: 2,
  dueUnpaid: 4,
}

// 楼栋数据
export const buildingsData = [
  {
    buildingId: "08栋",
    buildingName: "A栋",
    floors: [
      {
        floorNumber: "6层",
        rooms: [
          {
            roomNumber: "603",
            tenantName: "邹伟",
            rentAmount: 1000,
            status: "due",
            overdueDays: 29,
          },
          {
            roomNumber: "605",
            tenantName: "陈志刚",
            rentAmount: 1000,
            status: "due",
            overdueDays: 29,
          },
        ],
      },
      {
        floorNumber: "2层",
        rooms: [
          {
            roomNumber: "204",
            tenantName: "警官赵",
            rentAmount: 5000,
            status: "paid",
          },
          {
            roomNumber: "205",
            tenantName: "冯新宇",
            rentAmount: 3000,
            status: "pending",
          },
        ],
      },
    ],
  },
  {
    buildingId: "33栋",
    buildingName: "B栋",
    floors: [
      {
        floorNumber: "6层",
        rooms: [
          {
            roomNumber: "607",
            tenantName: "测试",
            rentAmount: 1000,
            status: "overdue",
            overdueDays: 13,
          },
        ],
      },
    ],
  },
]

// 账单数据
export const billsData = [
  {
    id: "bill1",
    title: "租金7期：陈奕颖",
    period: "2025-02-22 至 2025-03-21",
    dueDate: "2025-03-10",
    accountInfo: "试账号2F01",
    amount: 3000,
    overdueDays: 0,
    status: "pending",
  },
  {
    id: "bill2",
    title: "租金6期：邹伟",
    period: "2025-01-22 至 2025-02-21",
    dueDate: "2025-02-10",
    accountInfo: "08栋603",
    amount: 1000,
    overdueDays: 29,
    status: "due",
  },
  {
    id: "bill3",
    title: "租金6期：陈志刚",
    period: "2025-01-22 至 2025-02-21",
    dueDate: "2025-02-10",
    accountInfo: "08栋605",
    amount: 1000,
    overdueDays: 29,
    status: "due",
  },
  {
    id: "bill4",
    title: "租金6期：测试",
    period: "2025-01-22 至 2025-02-21",
    dueDate: "2025-02-10",
    accountInfo: "33栋607",
    amount: 1000,
    overdueDays: 13,
    status: "overdue",
  },
  {
    id: "bill5",
    title: "租金6期：警官赵",
    period: "2025-01-22 至 2025-02-21",
    dueDate: "2025-02-10",
    accountInfo: "08栋204",
    amount: 5000,
    overdueDays: 0,
    status: "paid",
  },
  {
    id: "bill6",
    title: "租金5期：广州海新冷冻仓储有限公司",
    period: "2024-12-22 至 2025-01-21",
    dueDate: "2025-01-10",
    accountInfo: "A栋604",
    amount: 8000,
    overdueDays: 0,
    status: "paid",
  },
]

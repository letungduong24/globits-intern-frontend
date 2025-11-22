import ConstantList from "./appConfig";

export const navigations = [
  {
    name: "navigation.dashboard",
    icon: "home",
    path: ConstantList.ROOT_PATH + "dashboard",
    isVisible: true,
  },
  {
    name: "navigation.directory",
    icon: "dashboard",
    isVisible: true,
    children: [
      {
        name: "Quốc gia",
        path: ConstantList.ROOT_PATH + "category/country",
        icon: "remove",
        isVisible: true,
      },
      {
        name: "Dân tộc",
        path: ConstantList.ROOT_PATH + "category/ethnics",
        icon: "remove",
        isVisible: true,
      },
      {
        name: "Tôn giáo",
        path: ConstantList.ROOT_PATH + "category/religion",
        icon: "remove",
        isVisible: true,
      },
      {
        name: "Phòng ban",
        path: ConstantList.ROOT_PATH + "category/department",
        icon: "remove",
        isVisible: true,
      },
    ],
  },
  
];

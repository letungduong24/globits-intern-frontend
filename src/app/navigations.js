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
      
    ],
  },
  
];

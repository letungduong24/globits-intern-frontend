import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const DashboardIndex = EgretLoadable({
  loader: () => import("./DashboardIndex"),
});

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "dashboard",
    exact: true,
    component: DashboardIndex,
  },
];

export default Routes;

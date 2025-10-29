import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const EthnicsIndex = EgretLoadable({
  loader: () => import("./EthnicsIndex"),
});
const ViewComponent = EthnicsIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/ethnics",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;

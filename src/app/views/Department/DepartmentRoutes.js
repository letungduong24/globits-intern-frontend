import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";

const DepartmentIndex = EgretLoadable({
  loader: () => import("./DepartmentIndex"),
});
const ViewComponent = DepartmentIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/department",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;

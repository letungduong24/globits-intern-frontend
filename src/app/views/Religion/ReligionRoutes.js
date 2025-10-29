import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const ReligionIndex = EgretLoadable({
  loader: () => import("./ReligionIndex"),
});
const ViewComponent = ReligionIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/religion",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;

import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
const CountryIndex = EgretLoadable({
  loader: () => import("./CountryIndex"),
});
const ViewComponent = CountryIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/country",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;

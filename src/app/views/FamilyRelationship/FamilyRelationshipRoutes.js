import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";

const FamilyRelationshipIndex = EgretLoadable({
  loader: () => import("./FamilyRelationshipIndex"),
});
const ViewComponent = FamilyRelationshipIndex;

const Routes = [
  {
    path: ConstantList.ROOT_PATH + "category/familyRelationship",
    exact: true,
    component: ViewComponent,
  },
];

export default Routes;
import { Model } from "sequelize-typescript";
import Article from "./Article";
declare class Famille extends Model {
    id: number;
    famille: string;
    articles: Article[];
}
export default Famille;
//# sourceMappingURL=Famille.d.ts.map
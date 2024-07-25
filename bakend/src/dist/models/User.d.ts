import { Model } from "sequelize-typescript";
declare class User extends Model {
    id: number;
    login: string;
    pwd: string;
    static hashPassword(user: User): Promise<void>;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export default User;
//# sourceMappingURL=User.d.ts.map
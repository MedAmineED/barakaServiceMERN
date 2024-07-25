import { Model } from "sequelize-typescript";
declare class Employee extends Model {
    id: number;
    cin: string;
    nom: string;
    recrutement: Date;
    mobile: string;
    salaire: number;
    specialite: number;
    etat: number;
}
export default Employee;
//# sourceMappingURL=Employee.d.ts.map
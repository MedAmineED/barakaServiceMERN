import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    HasMany
} from "sequelize-typescript";
import Paiement from "./Paiement";
import LigneServices from "./LigneService";

@Table({
    timestamps: false, 
    tableName: "tdemandeservice",
    modelName: "DemandeService"
})
class DemandeService extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    declare id_dem: number;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare date_demande: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare matricule: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare conducteur: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare employer: string;

    @Column({
        type: DataType.TIME,
        allowNull: false
    })
    declare heure_deb: string;  // Use string for TIME data type

    @Column({
        type: DataType.TIME,
        allowNull: false
    })
    declare heure_fin: string;  // Use string for TIME data type

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare client: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare bon_commande: string;

    @Column({
        type: DataType.DOUBLE,
        allowNull: false
    })
    declare prixTTC: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare payer: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare marque: string;

    @HasMany(() => LigneServices)
    declare articles: LigneServices[];

    @HasMany(()=> Paiement)
    declare paiement : Paiement;
}

export default DemandeService;

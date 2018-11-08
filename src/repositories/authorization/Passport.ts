import { Column, DataType, HasAssociation, HasMany, HasOne, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'Passport',
    tableName: 'passports',
    timestamps: true
})
export default class Passport extends Model<Passport> {

    @Column
    name: string;

    @Column
    birthday: Date;

    /*@HasMany(() => Hobby)
    hobbies: Hobby[];*/
}
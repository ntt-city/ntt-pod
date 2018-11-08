import { Column, DataType, HasAssociation, HasMany, HasOne, Model, Table } from 'sequelize-typescript';

@Table({
    modelName: 'UserIdentity',
    tableName: 'user_identities',
    timestamps: true
})
export default class UserIdentity extends Model<UserIdentity> {

    @Column
    name: string;

    @Column
    birthday: Date;

    /*@HasMany(() => Hobby)
    hobbies: Hobby[];*/
}
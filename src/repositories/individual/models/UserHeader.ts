import { Column, DataType, HasAssociation, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { UserCollectionName, UserDocumentName } from '../index';
import UserProfile from './UserProfile';

@Table({
    modelName: UserDocumentName,
    tableName: UserCollectionName,
    timestamps: true
})
export default class UserHeader extends Model<UserHeader> {
    @Column
    name: string;

    @Column
    birthday: Date;

    @HasOne(() => UserProfile)
    profile: UserProfile;

    /*@HasMany(() => Hobby)
        hobbies: Hobby[];*/
}
import { Column, DataType, HasAssociation, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { UserCollectionName, UserDocumentName } from '../index';

@Table({
    modelName: 'UserProfile',
    tableName: 'user_profile',
    timestamps: false
})
export default class UserProfile extends Model<UserProfile> {
    @Column
    name: string;

    @Column
    birthday: Date;

    @Column
    gender: string;

    @Column
    location: string;

    @Column
    website: string;

    @Column
    picture: string;
}
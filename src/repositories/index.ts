import { Model as EntityType, Sequelize } from 'sequelize-typescript';
import { dbSet, Repository } from '../../pod';
import { Document, model, Model, Schema } from 'mongoose';
import Passport from '../models/Passport';
import User from './User';
import UserHeader from '../models/UserHeader';
import UserProfileModel from '../models/UserProfile';
import UserProfile from './individual/UserProfile';

export const UserDocumentName = 'User';

export const UserCollectionName = 'users';

export class Users extends Repository<User> {
    constructor(sequelize: Sequelize) {
        super(
            model(
                UserDocumentName,
                new Schema(
                    {
                        email: { type: String, unique: true },
                        password: String,
                        passwordResetToken: String,
                        passwordResetExpires: Date,

                        facebook: String,
                        twitter: String,
                        google: String,
                        tokens: Array,

                        profile: {
                            name: String,
                            gender: String,
                            location: String,
                            website: String,
                            picture: String
                        }
                    },
                    { timestamps: true }
                ),
                UserCollectionName
            ),
            dbSet<User>(sequelize)
                .addModel<'email' | 'username'>(
                    UserHeader,
                    {
                        email: 'email',
                        username: 'user_name'
                    }
                )
                .addModel<'email' | 'username'>(
                    UserProfileModel,
                    {
                        email: 'email',
                        username: 'user_name'
                    }
                )
        );
    }

    pickProfile(user: User): UserProfile {
        return { ...user.profile, email: user.email };
    }
}
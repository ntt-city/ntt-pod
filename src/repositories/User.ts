import { SimpleObject } from '@um/typings';
import UserProfile from './individual/UserProfile';

export default interface User extends SimpleObject {
    email: string;
    username: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;

    facebook: string;
    twitter: string;
    google: string;
    tokens: string[];

    profile: UserProfile;
}

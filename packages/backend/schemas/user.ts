import mongoose, {Model, Document} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

interface UserSchema {
    _id?: string,
    username: string,
    salt?: string,
    hash?: string
}

interface UserModelType extends Model<Document<any, {}>, {}>, UserSchema {
    createStrategy: () => any,
    serializeUser: () => any,
    deserializeUser: () => any,
    register: (user: UserSchema, password: string) => Promise<UserModelType>
}

const UserSchema = new mongoose.Schema({});

UserSchema.plugin(passportLocalMongoose);

export const User = mongoose.model('user', UserSchema) as UserModelType;
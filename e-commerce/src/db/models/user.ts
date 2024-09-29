import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { hashText } from "@/utils/hash";

export type UserModel = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
};


export type UserModelCreateInput = Omit<UserModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_NAME || "GC-02";
const COLLECTION_USER = "Users";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getUsers = async () => {
  const db = await getDb();

  const users = (await db
    .collection(COLLECTION_USER)
    .find()
    .project({ password: 0 })
    .toArray()) as UserModel[];

  return users;
};

export const createUser = async (user: UserModelCreateInput) => {
  const newUser: UserModelCreateInput = {
    ...user,
    password: hashText(user.password),
  };

  const db = await getDb();
  const result = await db.collection(COLLECTION_USER).insertOne(newUser);

  return result;
};

export const getUserById = async (id: string) => {
  const db = await getDb();
  const objectId = new ObjectId(id);

  const user = (await db.collection(COLLECTION_USER).findOne(
    { _id: objectId },
    {
      projection: {
        password: 0,
      },
    }
  )) as UserModel;

  return user;
};

export const getUserByEmail = async (email: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ email: email })) as UserModel;

  return user;
};
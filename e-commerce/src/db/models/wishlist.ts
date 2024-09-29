import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { ProductModel } from "./product";

export type WishlistProduct = {
  _id?: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type WishlistGET = {
  _id?: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  product: ProductModel
}

export type CreateWishlistInput = Omit<WishlistProduct, "_id">;
const DATABASE_NAME = process.env.MONGODB_DB_NAME;
const COLLECTION_WL = "Wishlists";

const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getWL = async (userId: string): Promise<WishlistGET[]> => {
  const db = await getDb();
  const wishlist = await db.collection(COLLECTION_WL).find({ userId: new ObjectId(userId) }).toArray();

  const productIds = wishlist.map(item => item.productId);
  const products = await db.collection("Products").find({ _id: { $in: productIds } }).toArray();

  const wishlistWithProducts = wishlist.map(item => ({
    ...item,
    product: products.find(product => product._id.equals(item.productId))
  }));

  return wishlistWithProducts as WishlistGET[];
};

export const wishlistUniqueVal = async(userId: string, productId: string): Promise<WishlistProduct> => {
  const db = await getDb()
  const wishlistFound = await db.collection(COLLECTION_WL).findOne({
    userId: new ObjectId(userId),
    productId: new ObjectId(productId)
  })

  return wishlistFound as WishlistProduct
}

export const createWL = async (wishlistInput: CreateWishlistInput):Promise<void> => {
  const db = await getDb();
  await db.collection(COLLECTION_WL).insertOne(wishlistInput);
  return;
};

export const deleteWL = async (productId: string, userId: string):Promise<void> => {
  const db = await getDb();
  const productId_object = new ObjectId(productId);
  const userId_object = new ObjectId(userId)
  await db.collection(COLLECTION_WL).deleteOne({
    productId: productId_object,
    userId: userId_object
  });
  return;
};

import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";

export type ProductModel = {
  _id: ObjectId;
  name: string;
  slug: string;
  desciption: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

const DATABASE_NAME = process.env.MONGODB_NAME || "GC-02";
const COLLECTION_PRODUCT = "Products";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const searchProduct = async (
  search: string
): Promise<{ products: ProductModel[]; totalPage: number }> => {
  const db = await getDb();
  const regex = new RegExp(search, "i");

  const totalDocuments = await db
    .collection(COLLECTION_PRODUCT)
    .countDocuments({
      $or: [{ name: { $regex: regex } }, { slug: { $regex: regex } }],
    });

  const totalPage = Math.ceil(totalDocuments / 10);
  const products = await db
    .collection(COLLECTION_PRODUCT)
    .find({
      $or: [{ name: { $regex: regex } }, { slug: { $regex: regex } }],
    })
    .limit(10)
    .toArray();

  return { products: products as ProductModel[], totalPage };
};

export const getProducts = async (
  limit: number | null = null
): Promise<ProductModel[]> => {
  const db = await getDb();
  let query = db.collection(COLLECTION_PRODUCT).find();

  if (limit !== null && limit !== undefined) {
    query = query.limit(limit);
  }

  const products = await query.toArray();
  return products as ProductModel[];
};


export const getProductBySlug = async (slug: string): Promise<ProductModel> => {
  const db = await getDb();
  const productFound = await db.collection(COLLECTION_PRODUCT).findOne({
    slug,
  });
  return productFound as ProductModel;
};

export const getProductsByTags = async (
  tags: string[],
  limit: number | null = null
): Promise<ProductModel[]> => {
  const db = await getDb();
  
  console.log("Tags received for filtering:", tags); 

  const query = { tags: { $in: tags } };
  let cursor = db.collection(COLLECTION_PRODUCT).find(query);

  if (limit !== null && limit !== undefined) {
    cursor = cursor.limit(limit);
  }

  const products = await cursor.toArray();
  return products as ProductModel[];
};
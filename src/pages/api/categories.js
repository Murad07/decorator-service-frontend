// pages/api/pcbuild/categories.js
import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://pc-builder-admin:pcbuilder123@cluster0.cxnkxrh.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: "1", // You can use the string version directly
    strict: true,
    deprecationErrors: true,
  },
});

export default async function handler(req, res) {
  try {
    await client.connect();
    const categoryCollection = client.db("pc-builder").collection("categories");

    if (req.method === "GET") {
      if (req.query.catId) {
        const categories = await categoryCollection.findOne({
          id: req.query.catId,
        });
        res.send({
          message: "success",
          status: 200,
          data: categories,
        });
      } else {
        const categories = await categoryCollection.find({}).toArray();
        res.send({
          message: "success",
          status: 200,
          data: categories,
        });
      }
    }
  } finally {
    await client.close();
  }
}

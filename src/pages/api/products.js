// pages/api/pcbuild/products.js
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
    const productCollection = client.db("pc-builder").collection("products");

    if (req.method === "GET") {
      const id = req.query.pId;

      if (req.query.pId) {
        const products = await productCollection.findOne({ id: id });
        res.send({
          message: "success",
          status: 200,
          data: products,
        });
      } else {
        const products = await productCollection.find({}).toArray();
        res.send({
          message: "success",
          status: 200,
          data: products,
        });
      }
    }
  } finally {
    await client.close();
  }
}

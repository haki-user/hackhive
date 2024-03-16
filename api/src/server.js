const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

//config env
dotenv.configDotenv();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI not defined");
}

function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  //Routes
  //app.use("/api/v1/auth", authRoutes);

  const { MongoClient, ServerApiVersion } = require("mongodb");
  const uri = MONGO_URI;

  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      app.get("/all-jobs", async (req, res) => {
        const jobs = await jobsCollections.find({}).toArray();
        res.send(jobs);
      });

      app.get("/all-jobs/:id", async (req, res) => {
        const id = req.params.id;
        const job = await jobsCollections.find({
          _id: new ObjectId(id),
        });
        res.send(job);
      });

      app.get("/myJobs/:email", async (req, resp) => {
        console.log(req.param.email);
        const jobs = await jobsCollections
          .find({ postedBy: req.params.email })
          .toArray();
        rea.send(jobs);
      });

      app.delete("/job/:id", async (req, res) => {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await jobsCollections.deleteOne(filter);
        res.send(result);
      });

      app.patch("/update-job/:id", async (req, res) => {
        const id = req.params.id;
        const jobData = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            ...jobData,
          },
        };
        const result = await jobsCollections.uodateOne(
          filter,
          updateDoc,
          options
        );
        res.send(result);
      });

      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

  return app;
}

module.exports = { createServer };

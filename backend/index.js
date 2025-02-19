const { MongoClient } = require("mongodb");

const uri = "MONGO_URI=mongodb+srv://kashvi_writer:KashVicreaTions2@cluster0.jld9i.mongodb.net/kashvi?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
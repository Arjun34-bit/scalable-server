const express = require("express");
const dotenv = require("dotenv");
const { createTopics } = require("./kafka/admin");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Ingest service is running");
});

app.get("/ingest", async (req, res) => {
  const data = await fetchCars();
  const kafkaProducer = await kafkaProducer(
    "ingest-data",
    JSON.stringify(data)
  );

  if (kafkaProducer) console.log("Data ingested successfully");
  res.send("Data ingested successfully");
});

// createTopics();

app.listen(port, () => {
  console.log(`Ingest service listening on port ${port}`);
});

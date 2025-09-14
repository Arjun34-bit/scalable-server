const { client } = require("./kafka");

exports.createTopics = async () => {
  const admin = client.admin();
  await admin.connect();

  console.log("Kafka Admin Connected".blue);

  try {
    const existingTopics = await admin.listTopics();

    const topicsToCreate = [
      { topic: "ingest-data", numPartiontions: 1 },
    ].filter((topic) => !existingTopics.includes(topic.topic));

    if (topicsToCreate.length > 0) {
      await admin.createTopics({ topics: topicsToCreate });
      console.log("Kafka topics created successfully!".blue.bold);
    } else {
      console.log("Topics already exist, skipping creation.".yellow);
    }
  } catch (error) {
    console.error("Error creating topics:", error);
  } finally {
    await admin.disconnect();
  }
};

const { Kafka } = require('kafkajs');

const kafkaController = {};

kafkaController.produceMessage = async (req, res, next) => {
  console.log('hi');
  try {
    const kafka = new Kafka({
      clientId: 'myapp',
      brokers: ['Shreshths-MacBook-Pro-2.local:9092'],
    });
    const producer = kafka.producer();
    console.log('connecting...');
    await producer.connect();
    console.log('connected!');

    const { msg } = req.body;
    console.log(msg);

    const partition = msg[0].toLowerCase() < 'n' ? 0 : 1;
    const result = await producer.send({
      topic: 'Users',
      messages: [
        {
          value: msg,
          partition: partition,
        },
      ],
    });
    console.log(`send successfully! ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (err) {
    console.error(`ERROR: ${err}`);
  } finally {
    next();
  }
};

module.exports = kafkaController;
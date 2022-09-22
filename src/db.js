const { MongoClient } = require('mongodb');

// Connection URL
const url = "mongodb+srv://urrriy:ura_2702@cluster0.imc7uoy.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);

// Database Name
const dbName = 'Users';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  db.collection('users');
  db.collection('exercises');

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

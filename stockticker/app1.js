const fs = require('fs');
const readline = require('readline');
const MongoClient = require('mongodb').MongoClient;


const url = 'mongodb+srv://emilyye526:May262004@product.5iv2qax.mongodb.net/?retryWrites=true&w=majority&appName=product';


async function insertInfo() {
  const client = new MongoClient(url);

  try {
    // Connects to the MongoDB client
    await client.connect();

    // Selects the database
    const db = client.db('Stock');

    // Selects the collection
    const collection = db.collection('PublicCompanies');

    // Creates interface to read file, uses readline module
    const rl = readline.createInterface({
      input: fs.createReadStream('companies-1-2.csv')
    });

    // Reads file line by line
    for await (const line of rl) {
      // Splitting line by commas
      const [companyName, ticker, price] = line.split(',');

      // Inserts document into MongoDB
      await collection.insertOne({
        companyName: companyName,
        ticker: ticker,
        price: price
      });

      // Displays inserted data
      console.log(`Inserted: ${companyName}, ${ticker}, ${price}`);
    }
  } catch (err) {
    // Throws error if there is issue with database
    console.log('Database error:', err);
  } finally {
    // Closes the MongoDB client
    await client.close();
  }
}

// Call the function to insert info into MongoDB
insertInfo();

const { MongoClient } = require('mongodb');

async function testMongoDBConnection(connectionString : string) {
    const client = new MongoClient(connectionString, { useUnifiedTopology: true });
  
    try {
      await client.connect();
  
      // Attempt a simple query to check the connection
      const database = client.db('DbDashboard');
      const collection = database.collection('User'); 
  
      // Try to find a document 
      const result = await collection.findOne({});
      
      if (result) {
        console.log('MongoDB connection successful', result);
      } else {
        console.error('MongoDB connection failed: No documents found');
      }
    } catch (error : any) {
      console.error('MongoDB connection failed:', error.message);
    } finally {
      await client.close();
    }
  }
  
 

const connectionStr = "";

testMongoDBConnection(connectionStr);

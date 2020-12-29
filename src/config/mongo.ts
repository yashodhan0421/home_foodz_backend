const mongoCreds = {
  database: process.env.MONGO_DATABASE || 'HomeFoodz',
  username: process.env.MONGO_USERNAME || 'home_foodz',
  password: process.env.MONGO_PASSWORD || 'home_foodz_pass',
  host: process.env.MONGO_HOST || 'homefoodz.9rzkc.mongodb.net'
};
export default `mongodb+srv://${mongoCreds.username}:${mongoCreds.password}@${mongoCreds.host}/${mongoCreds.database}?retryWrites=true&w=majority`;

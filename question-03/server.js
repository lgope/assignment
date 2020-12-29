import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });
import app from './app.js';

// Connect to Mongo // &ssl=true
mongoose
  .connect(process.env.DATABASE_URI, {
    // .connect('mongodb://localhost/library', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successful!'))
  .catch(err => console.log(err));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App running on port ${port}...`));

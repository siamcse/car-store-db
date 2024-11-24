import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function bootstrap() {
  try {
    await mongoose.connect(config.mongodb_uri as string);

    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

bootstrap();

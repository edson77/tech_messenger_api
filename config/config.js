const config = {
    env: process.env.NODE_ENV || 'production',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || "lkofazyhbclddoikksuer4547841refdèreeççàzL11e034046e8553c57LE_JOUR_DIT J'EN PREND_L'ENGAGEMENT_12555685798*ldslkjkwxgbjdhcbhjbsnds_njkjkjwxri54d5fhf556df6588653sdsdsxc-_ççà&kgjénnxcifkjf",
    mongoUri: process.env.MONGODB_URI ||
      process.env.MONGO_HOST ||
      'mongodb://' + (process.env.IP || 'localhost') + ':' +
      (process.env.MONGO_PORT || '27017') +
      '/Messenger_cmr'
  }

  module.exports= config;
  
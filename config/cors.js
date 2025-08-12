import cors from 'cors';

const allowedOrigins = process.env.ALLOW_ORIGINS
  ? process.env.ALLOW_ORIGINS.split(',').map(o => o.trim())
  : [];

export default cors({
  origin: function (origin, callback) {
    // Autorise si : pas d'origine (ex: Postman) ou incluse dans la liste
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  credentials: true, // permet cookies/headers d'auth
});


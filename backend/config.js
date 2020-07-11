export default {
  MONGODB_URL:
    process.env.MONGODB_URL ||
    "mongodb+srv://abbas123:abbas123@cluster0-eu54z.mongodb.net/test?retryWrites=true&w=majority",
  JWT_SECRET: process.env.JWT_SECRET || "somethingsecret",
};

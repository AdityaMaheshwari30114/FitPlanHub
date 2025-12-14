require("dotenv").config();

const app = require("./app");
const connectDatabase = require("./utils/connect");

connectDatabase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

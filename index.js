const app = require("./app");
require("dotenv").config();
//starting the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

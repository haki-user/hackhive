const { createServer } = require("./server");
const server = createServer();




server.listen(process.env.PORT, () => {
  console.log("server running");
});

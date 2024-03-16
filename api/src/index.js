const { createServer } = require("./server");


const Server = createServer();

Server.listen(process.env.PORT, () => {
  console.log("server running");
});

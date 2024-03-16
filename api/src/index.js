const {CreateServer} = require("./server");


const Server = CreateServer();

Server.listen(process.env.PORT, () => {
  console.log("server running");
});

const mongoose = require("mongoose");

const CAPath = process.env.CA;

const remoteUrl = process.env.MongoUrl || "mongodb://127.0.0.1:27017/kbot-test";

let options = {
  socketTimeoutMS: 4 * 1000,
};

if (CAPath) {
  options = Object.assign({}, options, {
    tls: true,
    tlsCAFile: CAPath,
  });
}

module.exports = {
  DBConnect() {
    return new Promise(async (resolve, reject) => {
      try {
        await mongoose.connect(`${remoteUrl}`, options);
        const { connection } = mongoose;
        connection.on("error", () => {
          console.error("lose database connect", remoteUrl);
        });

        console.log("connect database success");
        resolve(mongoose);
      } catch (e) {
        console.log("connect failed", e);
        reject(e);
      }
    });
  },
};

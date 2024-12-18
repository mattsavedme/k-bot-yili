const express = require("express");
const bodyParser = require("body-parser");  

const app = express();

app.use(bodyParser.json());

const { queryEnName } = require("./utils");

const { DBConnect } = require("./db");

const { EnNameModel } = require("./schema");

app.get("/api/enname", async (req, res) => {
  try {
    const { symbol } = req.query;
    let enNameDoc = await EnNameModel.findOne({ symbol: symbol.toLowerCase() });
    if (!enNameDoc) {
        const enName = await queryEnName(symbol);
      enNameDoc = await EnNameModel.create({ symbol, description: enName });
    }
    res.json({ enName: enNameDoc.description });
  } catch (error) {
    res.json({ enName: "经营做事，顺利昌隆，如能慎重，百事亨通" });
  }
});

DBConnect().then(() => {
  app.listen(8002, () => {
    console.log("Server is running on port 8002");
  });
});

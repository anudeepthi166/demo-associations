//import express
const express = require("express");
const app = express();

//require dotenv
require("dotenv").config();

const expressAsyncHandler = require("express-async-handler");
//import sequelize connection
const { sequelize } = require("./db/db.config");

//starting server
app.listen(process.env.PORT, () =>
  console.log("Server STarted On ", process.env.PORT)
);

//checking DB Connection
sequelize
  .authenticate()
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Error in DB Connection", err.message));

//importing model
const { Owner } = require("./db/models/owner.model");
const { Channel } = require("./db/models/channel.model");
const { Videos } = require("./db/models/video.model");

//Associations
//one-to-one
ownerChannel = Owner.hasOne(Channel, { foreignKey: { name: "owner_id" } });
ChannelOfOwner = Channel.belongsTo(Owner, { foreignKey: { name: "owner_id" } });

//hasMany
ChanelVideo = Channel.hasMany(Videos, { foreignKey: { name: "channel_id" } });
VideoOfChannel = Videos.belongsTo(Channel, {
  foreignKey: { name: "channel_id" },
});

console.log(ownerChannel);
console.log(ChannelOfOwner);
console.log(ChanelVideo);
console.log(VideoOfChannel);

//creating table with force
sequelize.sync({ force: true });

//Body Parser
app.use(express.json());
//Route to create
app.post(
  "/owner_channel_video",
  expressAsyncHandler(async (req, res) => {
    let result = await Owner.create(req.body, {
      include: {
        association: ownerChannel,
        include: {
          association: ChanelVideo,
        },
      },
    });
    //let video = await Video.create(req.body.videos);
    if (result) res.send({ message: "Added", payload: result.dataValues });
  })
);

//Route get details
app.get(
  "/owner_channel_video",
  expressAsyncHandler(async (req, res) => {
    let result = await Owner.findAll({
      include: {
        model: Channel,
        include: {
          model: Videos,
        },
      },
    });
    res.send({ message: "Details", payload: result });
  })
);

app.use((err, req, res, next) => {
  res.send(err.message);
});

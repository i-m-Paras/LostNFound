const UserItem = require("../models/homePageSchema");

exports.addUserItem = (req, res, next) => {
  var item = req.body.item;
  var email = req.body.email;

  UserItem.findOne({ email: email }).then((data) => {
    if (!data) {
      const userItem = new UserItem({
        email,
        item,
      });
      userItem.save().then((result) => {
        console.log("User Item Created!");
        res.send("done1");
      });
    } else {
      try {
        UserItem.updateOne({ email: email }, { $push: { item } }).then(() => {
          console.log("User Item Updated!");
          res.send("updated");
        });
      } catch (err) {
        console.log(err);
      }
    }
  });
};

exports.getLostItem = async (req, res, next) => {
  try {
    const data = await UserItem.find({});
    res.json(data);
  } catch (err) {
    console.log("err in retriving lostitem data:", err);
  }
};

exports.getFoundItem = (req, res, next) => {
  var email = req.body.email;
  try {
    UserItem.findOne({ email: email }).then((data) => {
      res.json(data);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deteteItem = (req, res, next) => {
  var email = req.body.email;
  var itemName = req.body.itemName;

  try {
    UserItem.findOneAndUpdate(
      { email: email },
      { $pull: { item: { itemName: itemName } } },
      { new: true } // To get the updated document
    ).then(() => {
      res.send("deleted");
    });
  } catch (err) {
    console.log(err);
  }
};

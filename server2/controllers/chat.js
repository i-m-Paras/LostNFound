const Chat = require("../models/chatSchema");
const Product = require("../models/userLoginSchema");
const Friend = require("../models/friendSchema");

exports.addFriend = (req, res, next) => {
  var myEmail = req.body.myEmail;
  var friendEmail = req.body.friendEmail;
  var tempp = 1;
  Friend.findOne({ myEmail: myEmail })
    .then((data) => {
      if (data) {
        var check = data.friends.indexOf(friendEmail);
        if (check === -1) {
          Friend.updateOne(
            { myEmail: myEmail },
            { $push: { friends: friendEmail } }
          ).then(() => {
            console.log("friend updated!");
            // res.send("updated");
          });
        } else {
          tempp = 2;
          res.send("exist");
        }
      } else {
        var temp = [];
        temp.push(friendEmail);
        const friend = new Friend({
          myEmail,
          friends: temp,
        });
        friend.save().then(() => {
          console.log("friend saved");
          // res.send("one");
        });
      }
    })
    .then(() => {
      if (tempp != 2) {
        Friend.findOne({ myEmail: friendEmail }).then((data) => {
          if (data) {
            var check = data.friends.indexOf(myEmail);
            if (check === -1) {
              Friend.updateOne(
                { myEmail: friendEmail },
                { $push: { friends: myEmail } }
              ).then(() => {
                console.log("friend updated!");
                res.send("updated");
              });
            } else {
              res.send("exist");
            }
          } else {
            var temp = [];
            temp.push(myEmail);
            const friend = new Friend({
              myEmail: friendEmail,
              friends: temp,
            });
            friend.save().then(() => {
              console.log("friend saved");
              res.send("one");
            });
          }
        });
      }
    });
};

exports.friendList = (req, res, next) => {
  var myEmail = req.body.myEmail;
  Friend.findOne({ myEmail: myEmail }).then((data) => {
    if (data) {
      res.json(data.friends);
    } else {
      res.send("noFriend");
    }
  });
};

exports.findFriendName = (req, res, next) => {
  email = req.body.email;
  Product.findOne({ email }).then((data) => {
    res.json(data);
  });
};

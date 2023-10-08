const Product = require("../models/userLoginSchema");
const ContactUs = require("../models/contactUsSchema");

exports.userLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;

    Product.findOne({ email: email }).then((data) => {
      if (!data) {
        res.send("Not Found");
      } else {
        if (data.password === password) {
          console.log("user found");
          res.status(200).send("Found");
        } else {
          res.status(200).json({ message: "Wrong Password" });
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.addUser = (req, res, next) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  // checking if user already exist

  try {
    Product.findOne({ email: email }).then((data) => {
      if (!data) {
        const product = new Product({
          fname: fname,
          lname: lname,
          email: email,
          password: password,
        });
        product
          .save()
          .then((result) => {
            console.log("Created User");
            res.send("Done");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        res.send("Exist");
      }
    });
  } catch (err) {
    console.log(err);
  }

  // further process
};

exports.addContactUs = (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;

  const product = new ContactUs({ name, email, message });
  product
    .save()
    .then((result) => {
      console.log("Created Contact us data");
      res.status(200).send("created!");
    })
    .catch((err) => {
      console.log(err);
    });
};

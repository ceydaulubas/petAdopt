const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();

const Users = require("../models/user.model");

// /* POST - creates a new user*/
// router.post("/user", (req, res) => {
//   const { animal, breed, gender, color, age, imageUrl } = req.body;
//   console.log("body", req.body);

//   Users.create({
//     username,
//     email,
//     phone,
//     imageUrl,
//   })
//     .then((response) => {
//       res.status(200).json(response);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

/* GET - retrieves all the users from the database */
router.get("/userprofile", (req, res) => {
  Users.find()
    .populate("owner")
    .then((allTheUsers) => {
      res.status(200).json(allTheUsers);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* GET route => to get a specific user/detailed view */
router.get("/userprofile/:id", (req, res) => {
  const { id } = req.params;

  // Check if the incoming id is a valid ObjectId type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Our users have array of tasks' ids and
  // we can use .populate() method to get the whole task objects
  Users.findById(id)
    .populate("owner")
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

/* PUT route => to update a specific user */
router.put("/userprofile/:id", (req, res) => {
  const { id } = req.params;

  // Check if the incoming id is a valid ObjectId type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Users.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.status(200).json({
        message: `User with ${id} is updated successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// DELETE route => to delete a specific user
router.delete("/userprofile/:id", (req, res) => {
  const { id } = req.params;

  // Check if the incoming id is a valid ObjectId type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Users.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json({
        message: `User with ${id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;

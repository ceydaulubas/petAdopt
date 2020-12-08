const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();

const Pets = require("../models/pet.model");

/* POST - creates a new pets*/
router.post("/pets", (req, res) => {
  const { animal, breed, gender, color, age, imageUrl } = req.body;
  console.log("body", req.body);

  Pets.create({
    animal,
    breed,
    gender,
    color,
    age,
    imageUrl,
    // owner: req.user._id, // Add this after finishing authentication
    owner:"5fc8f70e42d4ff4f70c89b57", 
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* GET - retrieves all the pets from the database */
router.get("/pets", (req, res) => {
  Pets.find()
    .populate("owner")
    .then((allThePets) => {
      res.status(200).json(allThePets);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

/* GET route => to get a specific pet/detailed view */
router.get("/pets/:id", (req, res) => {
  const { id } = req.params;

  // Check if the incoming id is a valid ObjectId type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Our pets have array of tasks' ids and
  // we can use .populate() method to get the whole task objects
  Pets.findById(id)
    .populate("owner")
    .then((pet) => {
      res.status(200).json(pet);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

/* PUT route => to update a specific pet */
router.put("/pets/:id", (req, res) => {
  const { id } = req.params;

  // Check if the incoming id is a valid ObjectId type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Pets.findByIdAndUpdate(id, req.body)
    .then(() => {
      res.status(200).json({
        message: `Pet with ${id} is updated successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// DELETE route => to delete a specific pet
router.delete("/pets/:id", (req, res) => {
  const { id } = req.params;

  // Check if the incoming id is a valid ObjectId type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Pets.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json({
        message: `Pet with ${id} is removed successfully.`,
      });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;

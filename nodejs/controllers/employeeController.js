const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;
var { Employee } = require("../models/employee");
//Get All The Employees
router.get("/", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in Employees :" + JSON.stringify(err, undefined, 2));
    }
  });
});
//Get Employee by Id
router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("No record with given id:  $(req.params.id)");

  Employee.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in reteriving employee: " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});
//Add a new Employee
router.post("/", (req, res) => {
  var emp = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  });

  emp.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in employee save: " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});
//Update Employee
router.put("/:id", (req, res) => {
  // Check weather given id is correct
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("No record with given id:  $(req.params.id)");

  var emp = {
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  };

  Employee.findByIdAndUpdate(
    req.params.id,
    { $set: emp },
    { new: true },
    (req, res) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log(
          "Error in employee update: " + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});
//Delete Employee
router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("No record with given id:  $(req.params.id)");

  Employee.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
    }
    console.log(
      "Error in employee delete: " + JSON.stringify(err, undefined, 2)
    );
  });
});
module.exports = router;

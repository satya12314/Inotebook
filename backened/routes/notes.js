const express = require("express");
const router = express.Router();
const Note = require("../Models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
// ROUTE-1 get all the notes using GET "/api/notes"

router.get("/fetchnotes", fetchuser, async (req, res) => {
  // console.log(req.body);
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error ");
  }
});

// ROUTE-2
// add a new Note using POST "/api/notes/addnote". login required

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("discription", "Enter a valid Discription").isLength({ min: 7 }),
  ],
  async (req, res) => {
    try {
      const { title, discription, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        discription,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error ");
    }
  }
);

// ROUTE-3 update the Note using PUT "/api/notes/updatenote". login required
router.put(
  "/updatenote/:id",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("discription", "Enter a valid Discription").isLength({ min: 7 }),
  ],
  async (req, res) => {
    try {
      const { title, discription, tag } = req.body;
      //create a new note object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (discription) {
        newNote.discription = discription;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //find the note to be updated and update it

      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
      }
      note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

      res.json({ note });
    } catch {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

// ROUTE-4 delete the Note using DELETE "/api/notes/deletenote". login required

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    //find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not found");
    }

    //Allow user to deletion only if user owns this Note

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note is Deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error ");
  }
});

module.exports = router;

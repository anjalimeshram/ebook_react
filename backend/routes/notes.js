const express = require("express");
const Notes = require("../modules/Notes");
var fetchuser = require("../fetch/Fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
router.post(              
  "/createnotes",
  [
    body("title", "please enter title").isLength({ min: 3 }),
    body("description", "enter description").isLength({ min: 5 }),
    body("tag", "enter tag").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    var notes = await Notes.findOne({ description: req.body.description });
    if (notes) {
      return res.status(404).json({ error: "sorry error is there" });
    }
    notes = await Notes.create({
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
    });
    // .then(user=>res.json(user))
    // .catch(err=>{console.log(err)})
    // res.json({error:"please enter valid date"})

    // console.log(req.body)
    // const user=User(req.body)
    // user.save()
    // res.send(req.body)
  }
);

//api/notes/addnote

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter valid title").isLength({ min: 3 }),
    body("description", "enter valid description").isLength({ min: 8 }),
    body("tag", "enter tag").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({ title, description, tag, user: req.user.id });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Internal server error");
    }
  }
);
//api/notes/Fetchuser

 router.get('/fetchuser',fetchuser,async(req,res)=>{
    try{
        const notes=await Notes.find({user:
        req.user.id})
        res.json(notes)
    } catch (error){
        console.log(error.message);
        return res.status(500).send('internal server error');
    }
 })

//api/notes/updatenote

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }
  var note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("not found");
  }
  if (note.user.toString() !== req.user.id) {
    return res.status(400).send("not allow");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});

//api/notes/deletenote

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  
  try {
    var note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(400).send("not allow");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "note has been deleted", note: note });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("internal server error");
  }
});

module.exports = router;

// const express=require('express');
// const router=express.Router()
// router.post('/',(req,res)=>{

//         console.log(req.body)
//         const user=User(req.body)
//         user.save()
//         res.send(req.body)
// })
// module.exports=router

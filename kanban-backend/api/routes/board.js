const express = require('express');
const router = express.Router();

const jwtMiddleware = require('./jwtMiddleware');
const Board = require('../models/board');
const User = require('../models/user');

router.get('/boards', jwtMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate('boards');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const boards = user.boards;

    res.json({ boards });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/create-board', jwtMiddleware, async (req, res) => {
  const userId = req.user.userId;
  const boardData = { ...req.body, user: userId };

  try {
    const createdBoard = await Board.create(boardData);
    const boardId = createdBoard._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.boards.push(boardId);
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete(`/:id`, jwtMiddleware, async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);

    const user = await User.findById(req.user.userId);
    const boardIndex = user.boards.indexOf(req.params.id);

    if (boardIndex !== -1) {
      user.boards.splice(boardIndex, 1);
      await user.save();
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/edit-task/:id', jwtMiddleware, async (req, res) => {
  const id = req.params.id;
  const { taskId, editItem } = req.body;

  Board.findOneAndUpdate(
    { _id: id, 'tasks._id': taskId },
    { $set: { 'tasks.$': editItem } },
    { new: true }
  )
    .then(() => res.status(200).json({ success: true }))
    .catch(() => res.status(500).send('Server error'));
});

router.patch('/delete-task/:id', jwtMiddleware, async (req, res) => {
  const id = req.params.id;
  const deleteItem = req.body;

  Board.findByIdAndUpdate(id, { $pull: { tasks: deleteItem } }, { new: true })
    .then(() => res.status(200).json({ success: true }))
    .catch(() => res.status(500).send('Server error'));
});

router.put('/:id', jwtMiddleware, (req, res) => {
  Board.findByIdAndUpdate(req.params.id, req.body)
    .then(board => res.json({ success: true }))
    .catch(err => res.status(400).json({ error: err }));
});

module.exports = router;

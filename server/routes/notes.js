import express from 'express';

import { getNotes, createNote, updateNote, likeNote, deleteNote } from '../controllers/notes.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/',getNotes);
router.post('/', auth,createNote);
router.patch('/:id',auth,updateNote);
router.delete('/:id',auth, deleteNote);
router.patch('/:id/likePost',auth, likeNote);

export default router;
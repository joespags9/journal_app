import express from 'express';
import * as journalController from '../controllers/journalController.js';

const router = express.Router();

router
    .route('/')
    .get(journalController.getallJournals)
    .post(journalController.newJournal);

router
    .route('/:id')
    .get(journalController.getJournalById)
    .put(journalController.updateJournal)
    .delete(journalController.deleteJournal)

export default router;
import type { Request, Response } from 'express';
import journal from '../models/journalModel.js';

export const getallJournals = async (req: Request, res: Response) => {
    try {
        const journals = await journal.find();
        res.status(200).json({
            status: "success",
            data: {
                journals
            }
        });
    } catch(err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

export const newJournal = async (req: Request, res: Response) => {
    try {
        // Add "!" to the text field
        /*
        const modifiedBody = {
            ...req.body,
            text: req.body.text + "!"
        };

        const newJournals = await journal.create(modifiedBody);
        */

        const newJournals = await journal.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                newJournals
            }
        });
    } catch(err) {
        res.status(404).json({
            status: "fail",
            message: err
        });
    }
};

// Get a single journal by ID
export const getJournalById = async (req: Request, res: Response) => {
  try {
    const Journal = await journal.findById(req.params.id);
    if (!Journal) return res.status(404).json({ message: 'Journal not found' });
    res.status(200).json(Journal);
  } catch (error) {
    console.error('Error fetching journal:', error);
    res.status(500).json({ message: 'Failed to fetch journal' });
  }
};

// Update a journal
export const updateJournal = async (req: Request, res: Response) => {
  try {
    const updatedJournal = await journal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedJournal) return res.status(404).json({ message: 'Journal not found' });
    res.status(200).json({
      status: 'success',
      data: {
        journal: updatedJournal
      }
    });
  } catch (error) {
    console.error('Error updating journal:', error);
    res.status(500).json({ message: 'Failed to update journal' });
  }
};

// Delete a journal
export const deleteJournal = async (req: Request, res: Response) => {
  try {
    const Journal = await journal.findByIdAndDelete(req.params.id);
    if (!Journal) return res.status(404).json({ message: 'Journal not found' });
    res.status(200).json({ message: 'Journal deleted successfully' });
  } catch (error) {
    console.error('Error deleting journal:', error);
    res.status(500).json({ message: 'Failed to delete journal' });
  }
};
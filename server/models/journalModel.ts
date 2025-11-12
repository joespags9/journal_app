import mongoose from 'mongoose';

const journalSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    caption: {
        type: String
    },
    image: {
        type: String
    },
    text: {
        type: String
    }
})

const journalModel = mongoose.model('article', journalSchema);

export default journalModel;
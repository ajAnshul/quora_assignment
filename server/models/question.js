const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: { type: String },
    ans_count: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    category: { type: String },
    archived: { type: Boolean, default: false }
}, { timestamps: true });

questionSchema.statics.createQuestion = async function (questionDetails, callback) {
    let { question } = questionDetails;
    if (!question) return callback({ msg: 'less params' });
    try {
        let question = new QuestionModel(questionDetails);
        await question.save();
        return callback(null, question);
    } catch (e) {
        return callback(e);
    }
}

questionSchema.statics.fetchAll = async function (questionDetails, callback) {
    try {
        let questions = await QuestionModel.find({ archived: false });
        return callback(null, questions);
    } catch (e) {
        return callback(e);
    }
}

const QuestionModel = mongoose.model('question', questionSchema);
module.exports = QuestionModel;
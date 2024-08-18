import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    questions: [
        {
            question:{
                type: String,
                required: true,
            },
            options:[{
                type: String,
                required: true,
            }],
            views: {
                type: Number,
                default: 0,
            },
            answer:{
                type: String
            }
        }
    ],
    views: {
        type: Number,
        default: 0,
    },
    type:{
        type: String,
        required: true,
    }
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
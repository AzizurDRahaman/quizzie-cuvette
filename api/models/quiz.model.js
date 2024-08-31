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
                text: {
                    type: String
                },
                imageUrl: {
                    type: String
                },
                count:{
                    type: Number,
                    default: 0
                }
            }],
            type:{
                type: String,
                required: true,
            },
            views: {
                type: Number,
                default: 0,
            },
            correctAttempts: {
                type: Number,
                default: 0
            },
            answer:{
                type: Number,
            },
            time:{
                type: Number,
                default: 0
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
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Quiz = mongoose.model("Quiz", quizSchema);
export default Quiz;
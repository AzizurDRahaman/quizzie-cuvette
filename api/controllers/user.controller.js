import User from "../models/user.model.js";
import Quiz from "../models/quiz.model.js";

export const getUserInfo = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { password, ...others } = user._doc;

        const quizzes = others.quizzes;

        const total_quiz = quizzes.length;
        let total_questions = 0;
        let total_views = 0;
        for(const quiz of quizzes) {
            const quizes = await Quiz.findById(quiz);
            // console.log(quizes);
            total_questions += quizes.questions.length;
            total_views += quizes.views;
        }

        res.status(200).json({ total_quiz, total_questions, total_views });
    }catch (err) {}
}

export const getUserQuizzes = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const { password, ...others } = user._doc;

        const quizzes = others.quizzes;

        const quizes = [];
        for(const q of quizzes) {
            const quiz = await Quiz.findById(q);
            quizes.push(quiz);
        }

        res.status(200).json({ quizes });
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
}
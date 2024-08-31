import Quiz from "../models/quiz.model.js";
import User from "../models/user.model.js";

export const createQuiz = async (req, res) => {
  try {
    const { userId, name, questions, type } = req.body;

    if (!["mcq", "poll"].includes(type.toLowerCase())) {
      return res
        .status(400)
        .json({
          message: 'Invalid quiz type. Allowed types are "mcq" and "poll".',
        });
    }

    const formattedQuestions = questions.map((questionObj) => {
      if (!questionObj.question) {
        throw new Error("Each question must have a question text.");
      }

      // Validate options
      if (!questionObj.options || questionObj.options.length === 0) {
        throw new Error("Each question must have at least one option.");
      }

      // Validate options based on type
      questionObj.options.forEach((option) => {
        if (questionObj.type === "t" && !option.text) {
          throw new Error("Text options must have a text value.");
        }
        if (questionObj.type === "i" && !option.imageUrl) {
          throw new Error("Image URL options must have an image URL.");
        }
        if (questionObj.type === "it" && (!option.text || !option.imageUrl)) {
          throw new Error(
            "Text and Image URL options must have both a text value and an image URL."
          );
        }
      });

      // For MCQ, ensure that there is a correct answer
      if (type.toLowerCase() === "mcq" && questionObj.answer == null) {
        throw new Error("MCQ type questions must have a correct answer.");
      }

      // For poll, remove the answer key
      if (type.toLowerCase() === "poll") {
        delete questionObj.answer;
      }

      return {
        question: questionObj.question,
        options: questionObj.options,
        type: questionObj.type,
        answer: questionObj.answer,
        time: questionObj.time,
      };
    });

    // Create the new quiz
    const newQuiz = new Quiz({
      name,
      questions: formattedQuestions,
      type,
    });

    // Save the quiz to the database
    const savedQuiz = await newQuiz.save();

    const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.quizzes.push(savedQuiz._id);
        await user.save();

    res
      .status(201)
      .json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

export const trendingQuiz = async(req, res)=>{
  try{
    const trendingQuizzes = (await Quiz.find().sort({views: -1})).filter((quiz)=>{
      return quiz.views > 10;
    });

    res.status(200).json({quizzes: trendingQuizzes});
  }catch(err){
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
}

export const quizDetails = async(req, res)=>{
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    const quizDetails = [];
    for(const q of quiz.questions){
      let data={
        question: q.question,
        views: q.views,
        correctAttempts: q.correctAttempts,
        incorrectAttempts: q.views - q.correctAttempts,
      }
      quizDetails.push(data);
    }
    res.status(200).json({createdOn: quiz.createdAt, views: quiz.views, quizDetails});
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
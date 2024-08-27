import Quiz from "../models/quiz.model.js";

export const createQuiz = async (req, res) => {
  try {
    const { name, questions, type } = req.body;

    if (!["mcq", "poll"].includes(type.toLowerCase())) {
      return res
        .status(400)
        .json({
          message: 'Invalid quiz type. Allowed types are "mcq" and "poll".',
        });
    }

    const formattedQuestions = questions.map((questionObj) => {
      if (
        !questionObj.question ||
        !questionObj.options ||
        questionObj.options.length === 0
      ) {
        throw new Error(
          "Each question must have a question text and at least one option."
        );
      }

      // For MCQ, ensure that there is a correct answer
      if (type.toLowerCase() === "mcq" && !questionObj.answer) {
        throw new Error("MCQ type questions must have a correct answer.");
      }

      // For poll, remove the answer key
      if (type.toLowerCase() === "poll") {
        delete questionObj.answer;
      }

      return {
        question: questionObj.question,
        options: questionObj.options,
        answer: questionObj.answer,
      };
    });

    // Create the new quiz
    const newQuiz = new Quiz({
      name,
      questions: formattedQuestions,
      type,
    });

    // Save the quiz to the database
    await newQuiz.save();

    res
      .status(201)
      .json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

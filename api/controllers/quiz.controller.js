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
      const options = q.options;
      const count = [];
      for(const option of options){
        count.push(option.count)
      }
      let data={
        question: q.question,
        views: q.views,
        correctAttempts: q.correctAttempts,
        incorrectAttempts: q.views - q.correctAttempts,
        count: count
      }
      quizDetails.push(data);
    }
    res.status(200).json({createdAt: quiz.createdAt, views: quiz.views, name: quiz.name, type: quiz.type, quizDetails});
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const getQuizQuestions = async(req, res)=>{
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    quiz.views+=1;
    await quiz.save();
    res.status(200).json({questions: quiz.questions, type: quiz.type});
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const addViews = async(req, res)=>{
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId);
    const { index } = req.body;
    quiz.questions[index].views+=1;
    await quiz.save();
    res.status(200).json({message: "Views added successfully"});
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

export const answerToQuestion = async(req, res)=>{
  try {
    const { quizId } = req.params;
    const { index, answer } = req.body;
    const quiz = await Quiz.findById(quizId);
    const question = quiz.questions[index];
    let isCorrect = false;
    if (quiz.type === "mcq") {
      if (question.answer === answer) {
        question.correctAttempts += 1;
        isCorrect = true;
      }
    } else if (quiz.type === "poll") {
      // Increase the count for the selected option in a poll type quiz
      question.options[answer].count += 1;
    }

    await quiz.save();

    res.status(200).json({isCorrect});

  }catch(error){
    res.status(500).json({ message: "Internal server error", error: err.message});
  }
}

export const deleteQuiz = async(req, res)=>{
  try {
    const { quizId } = req.params;
    const { userId } = req.body;
    const quiz = await Quiz.findByIdAndDelete(quizId);
    console.log(typeof(quizId));
    
    if (quiz) {
      res.status(200).json({ message: "Quiz deleted successfully" });

      const user = await User.findById(userId);
      if (user) {
        user.quizzes = user.quizzes.filter((q) => q.toString() !== quizId);
        await user.save();
      }
    } else {
      res.status(404).json({ message: "Quiz not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}
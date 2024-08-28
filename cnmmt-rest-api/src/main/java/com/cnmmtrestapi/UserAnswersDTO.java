package com.cnmmtrestapi;

public class UserAnswersDTO {
    int id;
    int questionNumber;

    boolean[] questionAnswers;

    public UserAnswersDTO(int id, int questionNumber, boolean[] questionAnswers){
        this.id = id;
        this.questionNumber = questionNumber;
        this.questionAnswers = questionAnswers;
    }

    public UserAnswersDTO() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuestionNumber() {
        return questionNumber;
    }

    public void setQuestionNumber(int questionNumber) {
        this.questionNumber = questionNumber;
    }

    public boolean[] getQuestionAnswers() {
        return questionAnswers;
    }

    public void setQuestionAnswers(boolean[] questionAnswers) {
        this.questionAnswers = questionAnswers;
    }
}
package com.cnmmtrestapi;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.ArrayList;
import java.util.List;

@Entity
public class DatabaseData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tableID = null;

    private int userID;
    private int  pageNumber;
    private int questionNumber;
    private boolean answer;

    public DatabaseData(int userID, int pageNumber, int questionNumber, boolean answer) {
        this.userID = userID;
        this.pageNumber = pageNumber;
        this.questionNumber = questionNumber;
        this.answer = answer;
    }

    public static List<DatabaseData> userAnswerDTOToDatabaseData(UserAnswersDTO dto) {
        List<DatabaseData> result = new ArrayList<>();

        boolean[] answers = dto.getQuestionAnswers();
        //Start at i = 1 so that in the database Q1 = 1 rather than Q1 = 0
        for(var i = 1; i <= answers.length; i++) {
            result.add(new DatabaseData(dto.getId(), dto.getQuestionNumber(), i, answers[i-1]));
        }

        return  result;
    }

    public static UserAnswersDTO databaseDataToUserAnswerDTO(List<DatabaseData> data) {
        if(data.isEmpty()) try {
            throw new IndexOutOfBoundsException("Cannot Convert empty list of Database Data to UserAnswerDTO");
        } catch (Exception e) {
            e.printStackTrace();
        }

        ArrayList<Boolean> answers = new ArrayList<>();
        for(DatabaseData databaseData : data) answers.add(databaseData.getAnswer());

        var answersArray = new boolean[answers.size()];
        for(var i = 0; i < answers.size(); i++) answersArray[i] = answers.get(i);

        return new UserAnswersDTO(data.get(0).getUserID(), data.get(0).getPageNumber(), answersArray);
    }

    public Long getTableID() { return tableID; }
    public boolean getAnswer() { return answer; }
    public int getUserID() { return userID; }
    public int getPageNumber() { return pageNumber; }
    public int getQuestionNumber() { return questionNumber; }
}

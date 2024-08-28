package com.cnmmtrestapi;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContextException;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class DatabaseDataTest {

    @Test
    void databaseDataGettersAndConstructor() {
        DatabaseData dbd = new DatabaseData(7,8,9,false);
        Assertions.assertEquals(7,dbd.getUserID());
        Assertions.assertEquals(8,dbd.getPageNumber());
        Assertions.assertEquals(9,dbd.getQuestionNumber());
    }

    @Test
    void UserAnswersDTOToDatabaseData() {
        boolean answers[] = {true, false, true };
        UserAnswersDTO dto = new UserAnswersDTO(1, 2, answers);
        List<DatabaseData> dbds = DatabaseData.userAnswerDTOToDatabaseData(dto);

        Assertions.assertEquals(1,dbds.get(0).getUserID());
        Assertions.assertEquals(1,dbds.get(1).getUserID());
        Assertions.assertEquals(1,dbds.get(2).getUserID());

        Assertions.assertEquals(2,dbds.get(0).getPageNumber());
        Assertions.assertEquals(2,dbds.get(1).getPageNumber());
        Assertions.assertEquals(2,dbds.get(2).getPageNumber());

        Assertions.assertEquals(true,dbds.get(0).getAnswer());
        Assertions.assertEquals(false,dbds.get(1).getAnswer());
        Assertions.assertEquals(true,dbds.get(2).getAnswer());
    }

    @Test
    void DatabaseDataToUserAnswersDTO() {
        DatabaseData dbd = new DatabaseData(7,8,9,false);
        List<DatabaseData> dbds = new ArrayList<>();
        dbds.add(dbd);
        UserAnswersDTO dto = DatabaseData.databaseDataToUserAnswerDTO(dbds);

        Assertions.assertEquals(7,dto.id);
        Assertions.assertEquals(8,dto.questionNumber);
        Assertions.assertEquals(false,dto.questionAnswers[0]);
    }

    @Test
    void DatabaseDataToUserAnswersDTOException() {
        List<DatabaseData> dbds = new ArrayList<>();
        Assertions.assertThrows(IndexOutOfBoundsException.class, () -> DatabaseData.databaseDataToUserAnswerDTO(dbds));
    }

}
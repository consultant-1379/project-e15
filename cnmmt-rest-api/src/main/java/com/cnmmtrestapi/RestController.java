package com.cnmmtrestapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/matrix-tool")
@CrossOrigin
public class RestController {

    @Autowired
    private MySQLDatabase repository;

    @PostMapping("/submit")
    public ResponseEntity<QuestionResponseDTO> postAnswers(@RequestBody UserAnswersDTO message){
         if(message == null || message.questionAnswers == null ){
              return ResponseEntity.badRequest().build();
         }

         List<DatabaseData> questions = DatabaseData.userAnswerDTOToDatabaseData(message);
         for(DatabaseData question : questions) repository.insertData(question);

         QuestionResponseDTO res = questionHandler(message.questionAnswers);
         return ResponseEntity.ok(res);
    }

    @GetMapping("new-user")
    public ResponseEntity<Integer> getNewId(){
        return ResponseEntity.ok(repository.getMaxUserID() + 1);
    }

    public QuestionResponseDTO questionHandler( boolean[] questionAnswers){
        if(questionAnswers[0]){
            return new QuestionResponseDTO(8);
        } else if((questionAnswers[1] || questionAnswers[3]) && !questionAnswers[2] && !questionAnswers[4]){
            return new QuestionResponseDTO(4);
        } else if((questionAnswers[2] || questionAnswers[4]) && !questionAnswers[1] && !questionAnswers[3]){
            return new QuestionResponseDTO(6);
        } else{
            return new QuestionResponseDTO(5);
        }
    }
}

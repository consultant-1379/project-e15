package com.cnmmtrestapi;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.Stream;

@SpringBootTest(webEnvironment=SpringBootTest.WebEnvironment.RANDOM_PORT)
class RestControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @ParameterizedTest
    @MethodSource("providedUserAnswers")
    void testSubmitQuestion(int id, int questionNumber, boolean[] questionAnswers,int answer){
        UserAnswersDTO message = new UserAnswersDTO(id,questionNumber, questionAnswers);
        ResponseEntity<QuestionResponseDTO> responseEntity = restTemplate.postForEntity("/matrix-tool/submit",message, QuestionResponseDTO.class);
        Assertions.assertEquals(answer, responseEntity.getBody().value);
    }

    @Test
    void testSubmitQuestionNullAnswers(){
        UserAnswersDTO message = new UserAnswersDTO(5,7,null);
        ResponseEntity<QuestionResponseDTO> responseEntity = restTemplate.postForEntity("/matrix-tool/submit",message, QuestionResponseDTO.class);
        Assertions.assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
    }

    private static Stream<Arguments> providedUserAnswers(){
        return Stream.of(
                Arguments.of(3,7, new boolean[]{true, false, true, false, true},8),
                Arguments.of(3,7, new boolean[]{true, false, false, false, false},8),
                Arguments.of(3,7, new boolean[]{true, true, true, true, true},8),
                Arguments.of(3,7, new boolean[]{true, true, false, true, false},8),
                Arguments.of(3,7, new boolean[]{false, true, true, true, true},5),
                Arguments.of(3,7, new boolean[]{false, false, false, false, false},5),
                Arguments.of(3,7, new boolean[]{false, true, false, true, false},4),
                Arguments.of(3,7, new boolean[]{false, false, true, false, true},6),
                Arguments.of(3,7, new boolean[]{false, true, false, true, false},4)
        );
    }
    @Test
    void testNewUserId(){
        ResponseEntity<Integer> responseEntity1 = restTemplate.getForEntity("/matrix-tool/new-user", Integer.class);
        ResponseEntity<Integer> responseEntity2 = restTemplate.getForEntity("/matrix-tool/new-user", Integer.class);
        Assertions.assertEquals(HttpStatus.OK, responseEntity1.getStatusCode());
        Assertions.assertEquals(responseEntity1.getBody(), responseEntity2.getBody());
    }

}
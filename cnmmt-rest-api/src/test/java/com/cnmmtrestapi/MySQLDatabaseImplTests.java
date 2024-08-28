package com.cnmmtrestapi;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class MySQLDatabaseImplTests {

    @Autowired
    private TestEntityManager testEntityManager; // Has some additional test-related APIs.

    @Autowired
    private MySQLDatabase repository;

    @Test
    @Order(0)
    void testInsert() {
        DatabaseData insertedData = new DatabaseData(1, 1,1, true);
        repository.insertData(insertedData);
        assertThat(repository.getData(insertedData.getTableID())).isEqualTo(insertedData);
    }

    @Test
    @Order(1)
    void testRetrieve() {
        DatabaseData insertedData = new DatabaseData(1, 1,1, true);
        repository.insertData(insertedData);
        assertThat(repository.getData(1, 1, 1).getUserID()).isEqualTo(1);
        assertThat(repository.getData(1, 1, 1).getPageNumber()).isEqualTo(1);
        assertThat(repository.getData(1, 1, 1).getQuestionNumber()).isEqualTo(1);
    }

}

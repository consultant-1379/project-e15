package com.cnmmtrestapi;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

@Component
public class MySQLDatabaseImpl {

    @PersistenceContext
    protected EntityManager entityManager;

    @Transactional
    public void insertData(DatabaseData data) {
        entityManager.persist(data);
        entityManager.flush();
    }

}

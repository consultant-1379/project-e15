package com.cnmmtrestapi;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MySQLDatabase extends CrudRepository<DatabaseData, Long> {

    @Transactional
    @Query("SELECT a from DatabaseData a " +
            "WHERE a.tableID = ?1")
    public DatabaseData getData(Long tableID);

    @Transactional
    @Query("SELECT a from DatabaseData a " +
            "WHERE a.userID = ?1 AND " +
            "a.pageNumber = ?2 AND " +
            "a.questionNumber = ?3")
    public DatabaseData getData(int userID, int pageNumber, int questionNumber);

    @Transactional
    @Query("SELECT COALESCE(MAX(userID),0) from DatabaseData")
    public Integer getMaxUserID();

    @Transactional
    public void insertData(DatabaseData data);

}

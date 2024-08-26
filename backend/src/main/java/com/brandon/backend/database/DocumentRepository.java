package com.brandon.backend.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface DocumentRepository extends JpaRepository <Document, Integer> {
    @Query(value = "SELECT * FROM documents WHERE userID = ?1", nativeQuery = true)
    List<Document> findByUserID(Integer userID);

    @Query(value = "INSERT INTO documents (title, data, userID) VALUES (?1, ?2, ?3)", nativeQuery = true)
    void insertDocument(String title, String data, Integer userID);

    // Will have to add in userID parameter as well
    @Query(value = "DELETE FROM documents WHERE documentID = ?1", nativeQuery = true)
    void deleteDocument(Integer documentID);

    @Query(value = "UPDATE documents SET data = ?1 WHERE documentID = ?2", nativeQuery = true)
    void updateDocument(String data, Integer documentID);
}

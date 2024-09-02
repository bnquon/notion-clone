package com.bquon.backend.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.bquon.backend.model.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Integer> {

    @Query(value = "SELECT * FROM documents WHERE userID = ?1", nativeQuery = true)
    List<Document> findDocumentsByUserID(Integer userID);
}

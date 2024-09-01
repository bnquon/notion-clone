package com.bquon.backend.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bquon.backend.model.Document;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
}

package com.library.library.repository;

import com.library.library.model.BorrowHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowHistoryRepository extends JpaRepository<BorrowHistory, Long> {

    // This must return List<BorrowHistory>, NOT the repository itself
    List<BorrowHistory> findByUserId(Long userId);
}
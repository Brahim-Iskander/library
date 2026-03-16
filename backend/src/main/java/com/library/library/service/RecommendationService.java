package com.library.library.service;

import com.library.library.model.Book;
import com.library.library.model.BorrowHistory;
import com.library.library.repository.BookRepository;
import com.library.library.repository.BorrowHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired
    private BorrowHistoryRepository historyRepository;

    @Autowired
    private BookRepository bookRepository;

    public List<Book> recommendBooks(Long userId) {

        // 1. Get user history
        List<BorrowHistory> history = historyRepository.findByUserId(userId);
        if (history.isEmpty()) {
            return List.of(); // no history, return empty list
        }

        // 2. Get books user has read
        List<Book> readBooks = history.stream()
                .map(BorrowHistory::getBook)
                .collect(Collectors.toList());

        // 3. Collect all distinct categories from history
        Set<String> categories = readBooks.stream()
                .map(Book::getCategory)
                .collect(Collectors.toSet());

        // 4. Find books for each category
        Set<Book> recommended = new HashSet<>();
        for (String category : categories) {
            recommended.addAll(bookRepository.findByCategory(category));
        }

        // 5. Remove books already read
        recommended.removeAll(readBooks);

        return recommended.stream().collect(Collectors.toList());
    }
}
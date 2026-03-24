package com.library.library.service;

import com.library.library.model.Book;
import com.library.library.model.BorrowHistory;
import com.library.library.model.Emprunt;
import com.library.library.repository.BookRepository;
import com.library.library.repository.BorrowHistoryRepository;
import com.library.library.repository.EmpruntRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    @Autowired
    private BorrowHistoryRepository historyRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private EmpruntRepository empruntRepository;

    public List<Book> recommendBooks(Long userId) {

        // ==============================
        // 🔹 1. USER HISTORY (PAST)
        // ==============================
        List<BorrowHistory> userHistory = historyRepository.findByUserId(userId);

        // ==============================
        // 🔹 2. CURRENT BORROWED BOOKS
        // ==============================
        Set<Book> currentBorrowedBooks = empruntRepository.findByUserId(userId)
                .stream()
                .map(Emprunt::getBook)
                .collect(Collectors.toSet());

        // ==============================
        // 🔹 3. MERGE BOTH
        // ==============================
        Set<Book> historyBooks = userHistory.stream()
                .map(BorrowHistory::getBook)
                .collect(Collectors.toSet());

        Set<Book> userBooks = new HashSet<>();
        userBooks.addAll(historyBooks);
        userBooks.addAll(currentBorrowedBooks);

        // If no data → return popular books
        if (userBooks.isEmpty()) {
            return getPopularBooks();
        }

        // ==============================
        // 🔥 4. COLLABORATIVE FILTERING
        // ==============================
        List<BorrowHistory> allHistories = historyRepository.findAll();

        Map<Long, Set<Book>> userMap = allHistories.stream()
                .collect(Collectors.groupingBy(
                        h -> h.getUser().getId(),
                        Collectors.mapping(BorrowHistory::getBook, Collectors.toSet())
                ));

        Set<Book> collaborativeRecs = new HashSet<>();

        for (Long otherUserId : userMap.keySet()) {
            if (otherUserId.equals(userId)) continue;

            Set<Book> otherBooks = userMap.get(otherUserId);

            Set<Book> intersection = new HashSet<>(userBooks);
            intersection.retainAll(otherBooks);

            if (!intersection.isEmpty()) {
                for (Book b : otherBooks) {
                    if (!userBooks.contains(b)) {
                        collaborativeRecs.add(b);
                    }
                }
            }
        }

        // ==============================
        // 🔹 5. CATEGORY-BASED
        // ==============================
        Set<String> categories = userBooks.stream()
                .map(Book::getCategory)
                .collect(Collectors.toSet());

        Set<Book> categoryRecs = new HashSet<>();
        for (String category : categories) {
            categoryRecs.addAll(bookRepository.findByCategory(category));
        }

        // ==============================
        // 🔹 6. POPULAR BOOKS
        // ==============================
        Set<Book> popularRecs = getPopularBooksSet();

        // ==============================
        // 🔗 7. MERGE ALL
        // ==============================
        Set<Book> finalRecs = new HashSet<>();

        finalRecs.addAll(collaborativeRecs);
        finalRecs.addAll(categoryRecs);
        finalRecs.addAll(popularRecs);

        // Remove already read/borrowed
        finalRecs.removeAll(userBooks);

        return finalRecs.stream().limit(20).collect(Collectors.toList());
    }

    // ==============================
    // 📈 POPULAR BOOKS METHODS
    // ==============================

    private List<Book> getPopularBooks() {
        return getPopularBooksSet().stream()
                .limit(10)
                .collect(Collectors.toList());
    }

    private Set<Book> getPopularBooksSet() {

        List<BorrowHistory> all = historyRepository.findAll();

        return all.stream()
                .collect(Collectors.groupingBy(
                        BorrowHistory::getBook,
                        Collectors.counting()
                ))
                .entrySet()
                .stream()
                .sorted((a, b) -> Long.compare(b.getValue(), a.getValue()))
                .limit(10)
                .map(Map.Entry::getKey)
                .collect(Collectors.toSet());
    }
}
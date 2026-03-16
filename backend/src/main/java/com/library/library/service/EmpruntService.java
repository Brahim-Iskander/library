package com.library.library.service;

import com.library.library.model.Book;
import com.library.library.model.Emprunt;
import com.library.library.model.User;
import com.library.library.model.BorrowHistory;  // ADD THIS IMPORT
import com.library.library.repository.BookRepository;
import com.library.library.repository.EmpruntRepository;
import com.library.library.repository.UserRepository;
import com.library.library.repository.BorrowHistoryRepository;  // ADD THIS IMPORT
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

@Service
public class EmpruntService {

    @Autowired
    private EmpruntRepository empruntRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;
    
    // ADD THIS
    @Autowired
    private BorrowHistoryRepository borrowHistoryRepository;

    // Get all emprunts
    public List<Emprunt> getAllEmprunts() {
        return empruntRepository.findAll();
    }

    // Get emprunt by id
    public Emprunt getEmpruntById(Long id) {
        return empruntRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Emprunt not found"));
    }

    @Transactional
    public List<Emprunt> getEmpruntsByUserEmail(String email) {
        return empruntRepository.findByUserEmail(email);
    }

    // Borrow a book - MODIFY THIS METHOD
    @Transactional
    public Emprunt borrowBook(String email, Long bookId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        if (book.getAvailable() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No copies available");
        }

        // Decrease available copies
        book.setAvailable(book.getAvailable() - 1);
        bookRepository.save(book);

        // Create and save Emprunt
        Emprunt emprunt = new Emprunt();
        emprunt.setUser(user);
        emprunt.setBook(book);
        emprunt.setBorrowDate(LocalDate.now());
        emprunt.setReturnDate(LocalDate.now().plusWeeks(2)); // default return date after 2 weeks
        empruntRepository.save(emprunt);

        // ✅ NEW CODE: Save to BorrowHistory for recommendations
        BorrowHistory history = new BorrowHistory();
        history.setBook(book);
        history.setUser(user);
        borrowHistoryRepository.save(history);
        
        System.out.println("✅ BorrowHistory saved for user: " + user.getEmail() + ", book: " + book.getTitle());

        return emprunt;
    }

    // Return a book
    public Emprunt returnBook(Long empruntId) {
        Emprunt emprunt = empruntRepository.findById(empruntId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Emprunt not found"));

        if (emprunt.getReturnDate() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Book already returned");
        }

        emprunt.setReturnDate(LocalDate.now());

        // Increase available copies
        Book book = emprunt.getBook();
        book.setAvailable(book.getAvailable() + 1);
        bookRepository.save(book);

        return empruntRepository.save(emprunt);
    }

    // Delete an emprunt
    public void deleteEmprunt(Long id) {
        Emprunt emprunt = empruntRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Emprunt not found"));
        empruntRepository.delete(emprunt);
    }
    
    public void updateBookStatus(Long id) {
        Emprunt emprunt = empruntRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Emprunt not found"));

        emprunt.setStatus("returned");
        emprunt.setReturnDate(LocalDate.now());
        Book book = emprunt.getBook();
        book.setAvailable(book.getAvailable() + 1);
        bookRepository.save(book);

        empruntRepository.save(emprunt);
    }
}
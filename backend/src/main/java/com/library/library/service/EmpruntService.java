package com.library.library.service;

import com.library.library.model.Book;
import com.library.library.model.Emprunt;
import com.library.library.model.User;
import com.library.library.repository.BookRepository;
import com.library.library.repository.EmpruntRepository;
import com.library.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

    // Get all emprunts
    public List<Emprunt> getAllEmprunts() {
        return empruntRepository.findAll();
    }

    // Get emprunt by id
    public Emprunt getEmpruntById(Long id) {
        return empruntRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Emprunt not found"));
    }

    // Borrow a book
    public Emprunt borrowBook(Long userId, Long bookId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        Emprunt emprunt = new Emprunt(user, book, LocalDate.now());
        return empruntRepository.save(emprunt);
    }

    // Return a book
    public Emprunt returnBook(Long empruntId) {
        Emprunt emprunt = empruntRepository.findById(empruntId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Emprunt not found"));

        emprunt.setReturnDate(LocalDate.now());
        return empruntRepository.save(emprunt);
    }

    // Delete an emprunt
    public void deleteEmprunt(Long id) {
        Emprunt emprunt = empruntRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Emprunt not found"));

        empruntRepository.delete(emprunt);
    }
}

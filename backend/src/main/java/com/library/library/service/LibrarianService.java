package com.library.library.service;

import org.springframework.stereotype.Service;
import com.library.library.model.Book;
import com.library.library.repository.BookRepository;

import java.util.List;
import java.util.Optional;

@Service
public class LibrarianService {

    private final BookRepository bookRepository;

    public LibrarianService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    // List all books
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Get a book by ID
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    // Add a new book
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    // Update an existing book
    public Book updateBook(Long id, Book bookDetails) {
        return bookRepository.findById(id).map(book -> {
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setCategory(bookDetails.getCategory());
            book.setIsbn(bookDetails.getIsbn());
            book.setImageUrl(bookDetails.getImageUrl());
            book.setQuantity(bookDetails.getQuantity());
            book.setAvailable(bookDetails.getAvailable());
            book.setDescription(bookDetails.getDescription());
            book.setPublicationDate(bookDetails.getPublicationDate());
            return bookRepository.save(book);
        }).orElseThrow(() -> new RuntimeException("Book not found with id " + id));
    }

    // Delete a book
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found with id " + id);
        }
        bookRepository.deleteById(id);
    }
}
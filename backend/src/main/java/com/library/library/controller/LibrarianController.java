package com.library.library.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.library.library.model.Book;
import com.library.library.service.LibrarianService;

import java.util.List;

@RestController
@RequestMapping("/api/librarian/books")
public class LibrarianController {

    private final LibrarianService librarianService;

    public LibrarianController(LibrarianService librarianService) {
        this.librarianService = librarianService;
    }

    // Get all books
    @GetMapping
    public List<Book> getAllBooks() {
        return librarianService.getAllBooks();
    }

    // Get a single book
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        return librarianService.getBookById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add a book
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return librarianService.addBook(book);
    }

    // Update a book
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        return librarianService.updateBook(id, bookDetails);
    }

    // Delete a book
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        librarianService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}
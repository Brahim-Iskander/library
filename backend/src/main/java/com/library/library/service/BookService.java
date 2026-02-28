package com.library.library.service;

import com.library.library.dto.BookDTO;
import com.library.library.dto.EmpruntDTO;
import com.library.library.model.Book;
import com.library.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    // Get all books
   public List<BookDTO> getAllBooks() {
        return bookRepository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }
    private BookDTO convertToDTO(Book book) {
        BookDTO dto = new BookDTO();
        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setCategory(book.getCategory());
        dto.setIsbn(book.getIsbn());
        dto.setImageUrl(book.getImageUrl());
        dto.setQuantity(book.getQuantity());
        dto.setAvailable(book.getAvailable());
        dto.setDescription(book.getDescription());
        dto.setPublicationDate(book.getPublicationDate());

        if (book.getEmprunts() != null) {
            List<EmpruntDTO> empruntDTOs = book.getEmprunts().stream().map(e -> {
                EmpruntDTO edto = new EmpruntDTO();
                edto.setId(e.getId());
                edto.setUserEmail(e.getUser().getEmail());
                edto.setBorrowDate(e.getBorrowDate());
                edto.setReturnDate(e.getReturnDate());
                return edto;
            }).toList();
            dto.setEmprunts(empruntDTOs);
        }

        return dto;
    }

    // Get book by id
    public BookDTO getBookById(Long id) {
    Book book = bookRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));
    return convertToDTO(book);
}

    // Add new book
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    // Update existing book
    public Book updateBook(Long id, Book updatedBook) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        book.setTitle(updatedBook.getTitle());
        book.setAuthor(updatedBook.getAuthor());
        book.setCategory(updatedBook.getCategory());

        return bookRepository.save(book);
    }

    // Delete a book
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));

        bookRepository.delete(book);
    }
}
package com.library.library.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;


@Entity
public class BorrowHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Book book;  // make sure this is mapped correctly

    @ManyToOne
    private User user;  // optional

    // getter for book
    public Book getBook() {
        return book;
    }

    // setter if needed
    public void setBook(Book book) {
        this.book = book;
    }

    // getter for user
    public User getUser() {
        return user;
    }
}
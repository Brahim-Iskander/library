package com.library.library.model;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String author;

    @Column(nullable = false)
    private String category; // e.g., Science, Literature, etc.

    @Column(unique = true, nullable = false)
    private String isbn; // unique ISBN number

    @Column
    private String imageUrl; // URL for the book cover image

    @Column(nullable = false)
    private int quantity; // total copies in library

    @Column(nullable = false)
    private int available; // copies currently available
    @Column
    private String description; // NEW: book description

    @Column
    private String publicationDate; // NEW: publication date or year

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Emprunt> emprunts;

    // Constructors
    public Book() {}

    public Book(String title, String author, String category, String isbn,
                String imageUrl, int quantity, int available, String description, String publicationDate) {
        this.title = title;
        this.author = author;
        this.category = category;
        this.isbn = isbn;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
        this.available = available;
        this.description = description;
        this.publicationDate = publicationDate;
    }

    // Getters & Setters for new fields
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPublicationDate() { return publicationDate; }
    public void setPublicationDate(String publicationDate) { this.publicationDate = publicationDate; }
    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getIsbn() { return isbn; }
    public void setIsbn(String isbn) { this.isbn = isbn; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public int getAvailable() { return available; }
    public void setAvailable(int available) { this.available = available; }

    public List<Emprunt> getEmprunts() { return emprunts; }
    public void setEmprunts(List<Emprunt> emprunts) { this.emprunts = emprunts; }
}
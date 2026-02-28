package com.library.library.dto;

import java.util.List;

public class BookDTO {

    private Long id;
    private String title;
    private String author;
    private String category;
    private String isbn;
    private String imageUrl;
    private int quantity;
    private int available;
    private String description;
    private String publicationDate;

    private List<EmpruntDTO> emprunts; // optional, can skip if you don’t need it

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

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPublicationDate() { return publicationDate; }
    public void setPublicationDate(String publicationDate) { this.publicationDate = publicationDate; }

    public List<EmpruntDTO> getEmprunts() { return emprunts; }
    public void setEmprunts(List<EmpruntDTO> emprunts) { this.emprunts = emprunts; }
}
package com.library.library.controller;

import com.library.library.model.Emprunt;
import com.library.library.service.EmpruntService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emprunts")
public class EmpruntController {

    @Autowired
    private EmpruntService empruntService;

    // Get all emprunts
    @GetMapping
    public List<Emprunt> getAllEmprunts() {
        return empruntService.getAllEmprunts();
    }

    // Get emprunt by id
    @GetMapping("/{id}")
    public Emprunt getEmpruntById(@PathVariable Long id) {
        return empruntService.getEmpruntById(id);
    }

    // Borrow a book
    @PostMapping("/borrow")
    public Emprunt borrowBook(@RequestParam Long userId, @RequestParam Long bookId) {
        return empruntService.borrowBook(userId, bookId);
    }

    // Return a book
    @PutMapping("/return/{id}")
    public Emprunt returnBook(@PathVariable Long id) {
        return empruntService.returnBook(id);
    }

    // Delete an emprunt
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmprunt(@PathVariable Long id) {
        empruntService.deleteEmprunt(id);
        return ResponseEntity.ok().build();
    }
}
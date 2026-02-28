package com.library.library.controller;

import com.library.library.model.Emprunt;
import com.library.library.service.EmpruntService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.library.library.util.JwtUtil;

import java.util.List;

@RestController
@RequestMapping("/api/emprunts")
@CrossOrigin(origins = "*") // allow frontend requests
public class EmpruntController {

    @Autowired
    private EmpruntService empruntService;
    @Autowired
    private JwtUtil jwtUtil;

    // Get all emprunts
    @GetMapping
    public List<Emprunt> getAllEmprunts() {
        return empruntService.getAllEmprunts();
    }

    // Get emprunt by ID
    @GetMapping("/{id}")
    public ResponseEntity<Emprunt> getEmpruntById(@PathVariable Long id) {
        return ResponseEntity.ok(empruntService.getEmpruntById(id));
    }
    @GetMapping("/my")
public ResponseEntity<List<Emprunt>> getMyEmprunts(
        @RequestHeader("Authorization") String authHeader
) {
    String token = authHeader.replace("Bearer ", "");
    String email = jwtUtil.extractSubject(token);

    return ResponseEntity.ok(
        empruntService.getEmpruntsByUserEmail(email)
    );
}

    // Borrow a book
    @PostMapping("/borrow")
    public ResponseEntity<Emprunt> borrowBook(
            @RequestParam String email,
            @RequestParam Long bookId
    ) {
        Emprunt emprunt = empruntService.borrowBook(email, bookId);
        return ResponseEntity.ok(emprunt);
    }

    // Return a book
    @PostMapping("/return")
    public ResponseEntity<Emprunt> returnBook(@RequestParam Long empruntId) {
        Emprunt emprunt = empruntService.returnBook(empruntId);
        return ResponseEntity.ok(emprunt);
    }

    // Delete an emprunt
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmprunt(@PathVariable Long id) {
        empruntService.deleteEmprunt(id);
        return ResponseEntity.noContent().build();
    }
     @PutMapping("/{id}/return")
    public ResponseEntity<?> updateBookStatus(@PathVariable Long id) {
        empruntService.updateBookStatus(id);
        return ResponseEntity.ok("Book returned successfully");
    }
}
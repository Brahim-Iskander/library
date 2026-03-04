package com.library.library.controller;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import com.library.library.repository.BookRepository;
import com.library.library.repository.UserRepository;
import com.library.library.repository.EmpruntRepository;
import java.util.List;
import com.library.library.dto.MonthlyEmpruntDTO;
import com.library.library.dto.TopBookDTO;
import com.library.library.dto.TopStudentDTO;
import com.library.library.dto.ChangeRoleRequest;
import com.library.library.model.User;
import com.library.library.model.Role;
import com.library.library.dto.ApiResponse;
import java.util.Optional;



@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private EmpruntRepository empruntRepository;

    @GetMapping("/stats")
public Map<String, Long> getStats() {
    Map<String, Long> stats = new HashMap<>();
    stats.put("students", userRepository.count());
    stats.put("books", bookRepository.count());
    stats.put("emprunts", empruntRepository.count());
    return stats;

}
@GetMapping("/monthly-emprunts")
public List<MonthlyEmpruntDTO> getMonthlyEmprunts() {
    return empruntRepository.countEmpruntsByMonth();
}
@GetMapping("/top-books")
public List<TopBookDTO> getTopBorrowedBooks() {
    return empruntRepository.findTopBorrowedBooks(PageRequest.of(0, 5));
}
@GetMapping("/top-students")
public List<TopStudentDTO> getTopActiveStudents() {
    return empruntRepository.findTopActiveStudents(PageRequest.of(0, 5)); // top 5
}
@PutMapping("/change-role")
public ResponseEntity<ApiResponse> changeRole(@RequestBody ChangeRoleRequest request) {

    User user = userRepository.findByEmail(request.getEmail()).orElse(null);

    String msg; // variable for storing the message

    if (user == null) {
        msg = "User with email " + request.getEmail() + " not found";
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(msg));
    }

    if (user.getRole() == Role.ADMIN) {
        msg = "Cannot modify another admin";
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ApiResponse(msg));
    }

    user.setRole(request.getNewRole());
    userRepository.save(user);

    msg = "Role updated successfully";
    return ResponseEntity.ok(new ApiResponse(msg));
}
@DeleteMapping("/delete-user")
public ResponseEntity<?> deleteUserByEmail(@RequestBody Map<String, String> body) {

    String email = body.get("email");

    if (email == null || email.isEmpty()) {
        return ResponseEntity.badRequest().body("Email is required");
    }

    Optional<User> userOptional = userRepository.findByEmail(email);

    if (userOptional.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("User not found");
    }

    userRepository.delete(userOptional.get());

    return ResponseEntity.ok("User deleted successfully");
}
    
}

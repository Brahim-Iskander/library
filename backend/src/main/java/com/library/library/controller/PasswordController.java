package com.library.library.controller;
import com.library.library.dto.ResetPasswordRequest;
import com.library.library.model.User;
import com.library.library.repository.UserRepository;
import com.library.library.service.UserService;
import com.library.library.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@RestController
@RequestMapping("/api/password")
public class PasswordController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        // Check if user exists
        if (!userService.existsByEmail(email)) {
            return ResponseEntity.badRequest().body("User not found");
        }

        // Generate JWT token for reset (expires in 10 minutes)
        String token = jwtUtil.generateToken(email);

        // Send reset link via email
        userService.sendResetEmail(email, token);

        return ResponseEntity.ok("If the email exists, a reset link has been sent.");
    }
   @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        try {
            String token = request.getToken();

            // 1️⃣ Validate token
            String email = jwtUtil.extractSubject(token);
            if (email == null || !jwtUtil.validateToken(token, email)) {
                return ResponseEntity.badRequest().body("Invalid or expired token");
            }

            // 2️⃣ Find user
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 3️⃣ Hash new password
            user.setPassword(passwordEncoder.encode(request.getNewPassword()));

            // 4️⃣ Save user
            userRepository.save(user);

            return ResponseEntity.ok("Password reset successful");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid or expired token");
        }
    }
}
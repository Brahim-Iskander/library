package com.library.library.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    // Must be at least 32 bytes for HS256
    private final String SECRET_KEY = "thisIsASecureKeyWithAtLeast32Characters123!";

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // --- Extract subject (username or email) ---
    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // --- Generic claim extractor ---
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parserBuilder()
                                  .setSigningKey(key)
                                  .build()
                                  .parseClaimsJws(token)
                                  .getBody();
        return claimsResolver.apply(claims);
    }

    // --- Generate token with default expiration (10 hours) ---
    public String generateToken(String subject) {
        return generateToken(subject, 1000 * 60 * 60 * 10); // 10h
    }

    // --- Generate token with custom expiration (ms) ---
    public String generateToken(String subject, long expirationMillis) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                   .setClaims(claims)
                   .setSubject(subject)
                   .setIssuedAt(new Date(System.currentTimeMillis()))
                   .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                   .signWith(key)
                   .compact();
    }

    // --- Validate token against subject ---
    public boolean validateToken(String token, String subject) {
        return extractSubject(token).equals(subject) && !isTokenExpired(token);
    }

    // --- Check if token expired ---
    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }
}
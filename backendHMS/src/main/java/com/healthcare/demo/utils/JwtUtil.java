package com.healthcare.demo.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.io.Decoders;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Base64 encoded 256-bit (32 bytes) secret key - good length
    private String secretKey = "uQ9vNp/ZFeT3i44qkZCqvdsC47Un4K7ChBZTLE6PRLc=";

    // Define token validity durations
    private final long ACCESS_TOKEN_VALIDITY = 1000 * 60 * 60;          // 1 hour
    private final long REFRESH_TOKEN_VALIDITY = 1000 * 60 * 60 * 24 * 7; // 7 days

    // Method to get the signing key by decoding the Base64 secret
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // ------------------------ Access Token ------------------------
    // Generates a short-lived access token for authentication
    public String generateAccessToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .claim("type", "access")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_VALIDITY))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // ------------------------ Refresh Token ------------------------
    // Generates a long-lived refresh token
    public String generateRefreshToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .claim("type", "refresh")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_VALIDITY))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractTokenType(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("type", String.class);
    }

    // ------------------------ Common Methods ------------------------
    // Extracts username/email from token
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    // Checks if a token is expired
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extract expiration date from token
    private Date extractExpiration(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }

    // Validates token against username/email
    public boolean validateToken(String token, String email) {
        return (email.equals(extractUsername(token)) && !isTokenExpired(token));
    }
}

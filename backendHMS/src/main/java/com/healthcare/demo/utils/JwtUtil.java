//package com.healthcare.demo.utils;
//
//import io.jsonwebtoken.Jwts;
//import io.jsonwebtoken.SignatureAlgorithm;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//
//@Component
//public class JwtUtil {
//
//    private String secretKey = "MzJjaGFyYWN0ZXJzQmFzZTY0U2VjcmV0S2V5ISE="; // Should be stored securely, not hard-coded in production
//
//    public String generateToken(String email) {
//        return Jwts.builder()
//                .setSubject(email)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour expiration
//                .signWith(SignatureAlgorithm.HS256, secretKey) // Updated to use new signature method
//                .compact();
//    }
//
//    public String extractUsername(String token) {
//        return Jwts.parserBuilder() // Use parserBuilder instead of the deprecated parser()
//                .setSigningKey(secretKey)
//                .build()
//                .parseClaimsJws(token)
//                .getBody()
//                .getSubject();
//    }
//
//    public boolean isTokenExpired(String token) {
//        return extractExpiration(token).before(new Date());
//    }
//
//    private Date extractExpiration(String token) {
//        return Jwts.parserBuilder() // Updated to use parserBuilder
//                .setSigningKey(secretKey)
//                .build()
//                .parseClaimsJws(token)
//                .getBody()
//                .getExpiration();
//    }
//
//    public boolean validateToken(String token, String email) {
//        return (email.equals(extractUsername(token)) && !isTokenExpired(token));
//    }
//}

package com.healthcare.demo.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;       // import Keys class
import io.jsonwebtoken.io.Decoders;        // import Decoders class
import org.springframework.stereotype.Component;

import java.security.Key;                   // import Key class
import java.util.Date;

@Component
public class JwtUtil {

    // Base64 encoded 256-bit (32 bytes) secret key - good length
    private String secretKey = "uQ9vNp/ZFeT3i44qkZCqvdsC47Un4K7ChBZTLE6PRLc=";

    // Method to get the signing key by decoding the Base64 secret
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey); // decode base64 to bytes
        return Keys.hmacShaKeyFor(keyBytes);                 // generate secure key for HS256
    }

    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour
                // Pass Key object instead of String to signWith
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                // Pass Key object instead of String to parser
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return Jwts.parserBuilder()
                // Pass Key object instead of String to parser
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }

    public boolean validateToken(String token, String email) {
        return (email.equals(extractUsername(token)) && !isTokenExpired(token));
    }
}


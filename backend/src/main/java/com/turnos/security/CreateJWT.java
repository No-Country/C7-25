package com.turnos.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.turnos.services.IUserService;
import com.turnos.models.entities.Role;
import com.turnos.models.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CreateJWT {
    private final String secret="secret";
    private final Long tokenMS=2592000000L;//30*24*60*60*1000

    private final IUserService userService;

    protected String crearToken(HttpServletRequest request, Authentication authentication){
        System.out.println("AutorizacionFiltro - crearAccessTokenPrincipal");
        org.springframework.security.core.userdetails.User user=(org.springframework.security.core.userdetails.User)authentication.getPrincipal();
        Algorithm algorithm=Algorithm.HMAC256(secret.getBytes());

        //access_token
        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+tokenMS))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);

    }
/*
    public String crearAccessTokenUser(String refresh_token,HttpServletRequest request, String authorizationHeader){
        System.out.println("AutorizacionFiltro - crearAccessTokenUser");
        Algorithm algorithm = Algorithm.HMAC256(secret.getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        DecodedJWT decodedJWT = verifier.verify(refresh_token);
        String username = decodedJWT.getSubject();
        User user = userService.getUser(username);

        //access_token
        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+accessTokenMS))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("roles", user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                .sign(algorithm);
    }*/

/*
    protected String crearRefreshToken(HttpServletRequest request, Authentication authentication){
        System.out.println("AutorizacionFiltro - crearRefreshToken");
        org.springframework.security.core.userdetails.User user=(org.springframework.security.core.userdetails.User)authentication.getPrincipal();
        Algorithm algorithm=Algorithm.HMAC256(secret.getBytes());

        //refresh_token
        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis()+refreshTokenMS))
                .withIssuer(request.getRequestURL().toString())
                .sign(algorithm);
    }*/

    public DecodedJWT decodJWT(String token){
        System.out.println("AutorizacionFiltro - decodJWT");
        Algorithm algorithm = Algorithm.HMAC256(secret.getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(token);
    }
/*
    public Algorithm algoritmo(){
        return Algorithm.HMAC256(secret.getBytes());
    }*/

}

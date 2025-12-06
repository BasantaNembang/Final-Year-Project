package com.auth.controller;


import com.auth.dto.JwtDto;
import com.auth.dto.LoginRequest;
import com.auth.dto.RefreshTokenRequestDTO;
import com.auth.entity.RefreshToken;
import com.auth.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/auth")
public class MyController {

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private HelperService helperService;

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> singUpUser(@RequestPart(value = "image", required = false) MultipartFile file,
                                        @RequestPart("userDto") String userDto){

        String email =  authService.signupUser(file, userDto);
          if(email==null){
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User is already Logged-IN");
          }
            RefreshToken refreshToken =  refreshTokenService.createRefreshToken(email);
            String jwtToken  = jwtService.getJwtToken(email);

        return ResponseEntity.status(HttpStatus.OK).body(
                JwtDto.builder()
                        .jwtToken(jwtToken)
                        .refreshToken(refreshToken.getToken())
                        .role(helperService.getRole(email))
                        .build()
        );
    }



    @PostMapping("/login")
    public ResponseEntity<?> loginInUser(@RequestBody LoginRequest request){

        Authentication authenticate =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.email(), request.password()
       ));
       if(authenticate.isAuthenticated()){
            String refreshToken = refreshTokenService.createRefreshToken(request.email()).getToken();

           return ResponseEntity.status(HttpStatus.OK).body(
                  JwtDto.builder()
                          .jwtToken(jwtService.getJwtToken(request.email()))
                          .refreshToken(refreshToken)
                          .role(helperService.getRole(request.email()))
                          .build()
          );
       }else{
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                   "Some thing went wrong.........");
       }
    }


    @PostMapping("/refresh_token")
    public JwtDto refreshToken(@RequestBody RefreshTokenRequestDTO dto){
        return jwtService.getRefreshToken(dto.refreshToken());
    }




    ///get-info
//    @PostMapping("/info/{userId}")
//    public UserRequest userINFO(@PathVariable("userId") String userId){
//        return authService.getUserInfo(userId);
//    }




}

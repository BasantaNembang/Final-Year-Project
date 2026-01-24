package com.auth.controller;


import com.auth.dto.*;
import com.auth.entity.RefreshToken;
import com.auth.error.AuthException;
import com.auth.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public ResponseEntity<?> singUpUser(@RequestPart(value = "image", required = false) MultipartFile image,
                                        @RequestPart("userDto") String userDto){

        String email =  authService.signupUser(image, userDto);
          if(email==null){
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User is already Logged-IN");
          }
            RefreshToken refreshToken =  refreshTokenService.createRefreshToken(email);
            String jwtToken  = jwtService.getJwtToken(email);

        return ResponseEntity.status(HttpStatus.OK).body(
                JwtDto.builder()
                        .jwtToken(jwtToken)
                        .refreshToken(refreshToken.getToken())
                        .userId(helperService.getUserID(email))
                        .build()
        );
    }



    @PostMapping("/login")
    public ResponseEntity<?> loginInUser(@RequestBody LoginRequest request) {
        try {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    request.email(), request.password()
            ));
            if (authenticate.isAuthenticated()) {
                String refreshToken = refreshTokenService.createRefreshToken(request.email()).getToken();

                return ResponseEntity.status(HttpStatus.OK).body(
                        JwtDto.builder()
                                .jwtToken(jwtService.getJwtToken(request.email()))
                                .refreshToken(refreshToken)
                                .userId(helperService.getUserID(request.email()))
                                .build()
                );
            }
            throw new AuthException("Invalid password");
        } catch (Exception e) {
            ErrorDTO dto = new ErrorDTO();
            dto.setFlag(false);
            dto.setHttpStatus(401);
            dto.setMsg("Invalid username and password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(dto);
        }
    }


    @PostMapping("/refresh_token")
    public JwtDto refreshToken(@RequestBody RefreshTokenRequestDTO dto){
        return jwtService.getRefreshToken(dto.refreshToken());
    }


    @PreAuthorize("hasAnyRole('STUDENT') || hasAnyRole('TEACHER') ")
    @PostMapping("/info/{userId}")
    public String isPresent(@PathVariable("userId") String userId){
        return authService.isPresentUser(userId);
    }

    //get the information of teacher
    @GetMapping("/get-info/{userId}")
    public TeacherDto getTeacherDetails(@PathVariable("userId") String userId){
        return authService.getTeacherDetail(userId);
    }

    //get the image
    @GetMapping("/Images/{name}")
    public ResponseEntity<UrlResource> getTeacherImage(@PathVariable("name") String name){
        UrlResource resource = helperService.getImage(name);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("image/jpeg"))
                .body(resource);
    }

    //get the username by ID
    @GetMapping("/user/{userId}")
    public String getUSerName(@PathVariable("userId") String userId){
        return authService.getUserName(userId);
    }


    //get the email  by ID
    @GetMapping("/user/email/{userId}")
    public String getEmailID(@PathVariable("userId") String userId){
        return authService.getEmailName(userId);
    }



}

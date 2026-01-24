package com.auth.service;


import com.auth.dto.TeacherDto;
import com.auth.dto.UserRequest;
import com.auth.entity.Account;
import com.auth.entity.Teacher;
import com.auth.entity.User;
import com.auth.error.AuthException;
import com.auth.reposistory.AccountRepository;
import com.auth.reposistory.TeacherRepository;
import com.auth.reposistory.UserRepo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
public class AuthService {

    @Autowired
    private HelperService helperService;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private UserRepo userRepo;

    private final AccountRepository accountRepository;

    private final PasswordEncoder passwordEncoder;

    public AuthService(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public void checkIfUserAlreadyExist(String email){
        if(accountRepository.findByEmail(email).isPresent()){
            throw new AuthException("User already logged-IN", 409);}
    }


    @Transactional
    public String signupUser(MultipartFile file, String userDto){
        ObjectMapper mapper = new ObjectMapper();
        UserRequest userRequest = null;
        try{
            userRequest = mapper.readValue(userDto, UserRequest.class);
        }catch (Exception e){
            throw new RuntimeException("Unable to convert string to UserRequest  " + e.getMessage());  }

        checkIfUserAlreadyExist(userRequest.email());

        Account account;
        if(userRequest.role().equals("STUDENT")){
            User user = new User();
            user.setUsername(userRequest.username());
            account = user;
        }else if(userRequest.role().equals("TEACHER")){
            //save image
            Teacher teacher = new Teacher();
            String imageURL = helperService.saveImage(file);

            teacher.setUsername(userRequest.username());
            teacher.setJob(userRequest.job());
            teacher.setPhoneNumber(userRequest.phoneNumber());
            teacher.setAddress(userRequest.address());
            teacher.setBackground(userRequest.background());
            teacher.setImageUrl(imageURL);
            account = teacher;
        }else{
            throw new AuthException("Some unknown role founded!..... " + userRequest.role());
        }

        account.setAid(UUID.randomUUID().toString());
        account.setEmail(userRequest.email());
        account.setPassword(passwordEncoder.encode(userRequest.password()));
        account.setRole(userRequest.role());
        accountRepository.save(account);

        System.out.println("user created successfully  " + account);
        return account.getEmail();

    }

    public String isPresentUser(String userId) {
        return  accountRepository.findById(userId)
                .map(Account::getEmail)
                .orElseThrow(()->new AuthException("No such user Found"));
    }


    //for nested statement we generally use flatmap
    public TeacherDto getTeacherDetail(String userId) {
         return accountRepository.findById(userId)
                .flatMap(m->teacherRepository.findById(m.getAid()))
                .map(m->new TeacherDto(m.getUsername(),
                        m.getJob(), m.getPhoneNumber(), m.getAddress(),
                       m.getBackground(), m.getImageUrl()))
                .orElseThrow(()->new AuthException("No such user is present"));
    }


    //filter fot condition
    //flatmap for optional value
    //map for value
    public String getUserName(String userId) {
          return accountRepository.findById(userId)
                .filter(m -> m.getRole().equals("TEACHER"))
                .flatMap(m->teacherRepository.findById(userId))
                .map(Teacher::getUsername)
                .orElseGet(()->userRepo.findById(userId).map(User::getUsername)
                        .orElseThrow(()->new AuthException("No such user is present")));
    }


    public String getEmailName(String userId) {
        return accountRepository.findById(userId)
                .map(Account::getEmail)
                .orElseThrow(()->new AuthException("No such user is found"));
    }



}

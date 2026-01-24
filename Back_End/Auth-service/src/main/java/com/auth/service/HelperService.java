package com.auth.service;


import com.auth.entity.Account;
import com.auth.error.AuthException;
import com.auth.reposistory.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class HelperService {

    @Autowired
    private AccountRepository repository;

    final String basePath = "http://localhost:9090/auth/";

    public String saveImage(MultipartFile file) {

        String imageName = file.getOriginalFilename() + "_" + System.currentTimeMillis();

        Path userDir = Paths.get(System.getProperty("user.dir"), "Images");
        if(!Files.exists(userDir)){
            try {
                Files.createDirectories(userDir);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        Path path = userDir.resolve(imageName);
        try {
           Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return basePath+"Images/"+imageName;
    }



    //get Role
    public String getRole(String email){
        return repository.findByEmail(email)
                .map(Account::getRole)
                .orElseThrow(()->new AuthException("No role found"));
    }

    public String getUserID(String email){
        return repository.findByEmail(email)
                .map(Account::getAid)
                .orElseThrow(()->new AuthException("No user"));
    }


    public UrlResource getImage(String name) {
      Path dir =  Paths.get(System.getProperty("user.dir"), "Images");

      Path path = dir.resolve(name);
      UrlResource resource;
      try {
             resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }
       return resource;
    }



}

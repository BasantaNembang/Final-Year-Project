package com.auth.service;


import com.auth.entity.Account;
import com.auth.entity.RefreshToken;
import com.auth.error.AuthException;
import com.auth.reposistory.AccountRepository;
import com.auth.reposistory.RefreshTokenRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class RefreshTokenService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RefreshTokenRepo refreshTokenRepo ;


    @Transactional
    public RefreshToken createRefreshToken(String email){

       Account account  = accountRepository.findByEmail(email).get();

       if(account==null){
           throw new RuntimeException("Such user not present having the email " + email);
       }

        RefreshToken refreshToken = refreshTokenRepo.findByAccount(account)
                .orElseGet(RefreshToken::new);


        if(refreshToken.getRefresh_token_id()==null){
          refreshToken.setRefresh_token_id(UUID.randomUUID().toString());
        }


        refreshToken.setExpiry_time(Instant.now().plusSeconds(18000)); //5hrs
        refreshToken.setToken(UUID.randomUUID().toString());
        //refreshToken.setUser();
        refreshToken.setAccount(account);

        return refreshTokenRepo.save(refreshToken);

    }



    public RefreshToken verifyExpirationRefreshToken(RefreshToken token){
        if(token.getExpiry_time().compareTo(Instant.now())<0){
              refreshTokenRepo.delete(token);
              throw new AuthException("Token expired");
        }
        return token;
    }



    public Optional<RefreshToken> getRefreshToken(String token){
        return refreshTokenRepo.findByToken(token);
    }


    public List<RefreshToken> findAllToken() {
        return refreshTokenRepo.findAll();
    }
}

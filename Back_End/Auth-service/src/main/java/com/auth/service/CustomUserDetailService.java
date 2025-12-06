package com.auth.service;

import com.auth.entity.Account;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


public class CustomUserDetailService extends Account implements UserDetails {

    //email is the username
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;


    public CustomUserDetailService(Account account){
      this.username = account.getEmail();
      this.password = account.getPassword();
      List<GrantedAuthority> authorityList = new ArrayList<>();
        authorityList.add(new SimpleGrantedAuthority(account.getRole().toUpperCase()));
       this.authorities =authorityList;

    }

    @Override
    public String getUsername(){
        return username;
    }

    @Override
    public  String getPassword(){
        return password;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }



    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}

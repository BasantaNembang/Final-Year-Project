package com.auth.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RefreshToken {

    @Id
    private String refresh_token_id;

    private Instant expiry_time;

    @Column(name = "token")
    private String token;

    //many refresh token belongs to one account
    @ManyToOne()
    @JoinColumn(name = "account")
    private Account account;

}

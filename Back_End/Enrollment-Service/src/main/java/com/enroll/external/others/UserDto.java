package com.enroll.external.others;

import lombok.Builder;

import java.util.HashSet;

@Builder
public record UserDto(
        String uid,
        String username,
        String password,
        String address,
        String phone_num,
        HashSet<Roles> roles,
        String email
) {
}

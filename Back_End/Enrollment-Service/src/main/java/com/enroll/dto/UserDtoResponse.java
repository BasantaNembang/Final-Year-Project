package com.enroll.dto;


import lombok.Builder;

import java.util.List;

@Builder
public record UserDtoResponse(
        String uid,
        String username,
        String address,
        String phone_num,
        List<String> roles,
        String email
) {
}

package com.enroll.dto;

import lombok.Builder;

@Builder
public record EnrollResponseDTO(String enrollID,
                                String msg
                                ) {
}

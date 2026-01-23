export interface PaymentDTO {
     courseId: string,
     userId: string,
     price: number,
     paymentMethod: "VISA_CARD" | "DOLLAR_CARD" | "MASTER_CARD" | "PAY_PAY",
     countryName: string | undefined,
     cardNumber: string,
     monthYear: string,
     cvNumber: string,
     accountName: string,
}

export interface CountryNameDTO {
     countryName: string
}


//for enrollment response 
export interface EnrollmentResponse {
     enroll_id: string;
     userId: string;
     courseDto: ResponseCourseDTO;
}

export interface ResponseCourseDTO {
     course_id: string;
     author: string;
     description: string;
     level: string;
     time: number; 
     thumbnail_url: string;
     create_at: string; 
     stream_id: string;
     price: number; 
     objectives: string[];
     requirements: string[];
     authorId: string,
     categoryResponseDTO: CategoryResponseDTO;
}

export interface CategoryResponseDTO {
     sub_c_id: string;
     category: string;
     subcategory: string;
     course_id: string
}



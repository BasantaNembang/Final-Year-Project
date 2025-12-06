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



export interface TeacherDetails {
    email: string,
    role: string,
    password: string,
    conformPassword?: string,
    username: string,
    job: string,
    phoneNumber: string,
    address: string,
    background: string
}

export interface StudentDetails {
    email: string,
    role: string,
    password: string,
    username: string
}

export interface LoginDetails {
    email: string,
    password: string
}


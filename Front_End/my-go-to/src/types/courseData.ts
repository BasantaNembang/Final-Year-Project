
export interface dto {
    course_id: string,
    author: string,
    description: string,
    level: string,
    time: number,
    thumbnail_url: string,
    create_at: Date | null,
    stream_id: string,
    price: number,
    category: string,
    title: string,
    objectives: string[],
    requirements: string[]
}


export interface ResponseCourseDTO {
    course_id: string;
    author: string;
    description: string;
    level: "BEGINNER" | "MEDIUM" | "ADVANCED";
    time: number;
    thumbnail_url: string;
    create_at: Date | null,
    stream_id: string;
    price: number;
    objectives: string[];
    requirements: string[];
    categoryResponseDTO: {
        sub_c_id: string;
        category: string;
        subcategory: string;
        course_id: string;
    };
}



//addCourse
export interface dto {
    course_id: string,
    author: string,
    title: string,
    description: string,
    level: string,
    time: number,
    thumbnail_url: string,
    create_at: Date | null,
    stream_id: string,
    price: number,
    category: string,
    objectives: string[],
    requirements: string[]
}

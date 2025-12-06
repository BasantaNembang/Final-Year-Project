export interface Course {
  image_url: string
  course: string
  creater: string
  ratings: number
  course_price: number
  time: number
}

//feature demo data
const data: Course[] = [
  {
    "image_url": "/devopsImage.jpg",
    "course": "Dev ops With AWS",
    "creater": "Basanta Nembang",
    "ratings": 4.7,
    "course_price": 199,
    "time": 0
  },
  {
    "image_url": "/reactImage.jpg",
    "course": "React for Beginners",
    "creater": "Rahul Bhudathoki",
    "ratings": 4.5,
    "course_price": 149,
    "time": 0
  },
  {
    "image_url": "/springbootImage.jpg",
    "course": "Spring Boot & Microservices",
    "creater": "Anil Rai",
    "ratings": 4.8,
    "course_price": 249,
    "time": 0
  },
  {
    "image_url": "/dsaImage.jpg",
    "course": "DSA with java",
    "creater": "Suman Bhattarai",
    "ratings": 4.8,
    "course_price": 249,
    "time": 0
  }

]


export default data;


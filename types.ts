
export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  readingTime: string;
  image: string;
}

export interface ReflectionResponse {
  philosophical: string;
  poetic: string;
  historical: string;
}

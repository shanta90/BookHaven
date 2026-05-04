import books from "@/data/books.json";

export type Book = {
  id: string;
  title: string;
  author: string;
  category: "Story" | "Tech" | "Science";
  description: string;
  image_url: string;
  available_quantity: number;
};

export const getBooks = () => books as Book[];

export const getBookById = (id: string) => {
  return (books as Book[]).find((book) => book.id === id);
};

export const getFeaturedBooks = () => {
  return (books as Book[]).slice(0, 4);
};

export const searchBooks = (query: string, category?: string) => {
  let filtered = books as Book[];
  
  if (query) {
    filtered = filtered.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  if (category && category !== "All") {
    filtered = filtered.filter((book) => book.category === category);
  }
  
  return filtered;
};

import { Author } from "src/app/author/model/author";
import { Category } from "src/app/category/model/Category";


export class Game {
    id: number;
    title: string;
    age: number;
    category: Category;
    author: Author;
}

import { Pageable } from "src/app/core/model/Pageable";
import { Author } from "./author";


export class AuthorPage {
    content: Author[];
    pageable: Pageable;
    totalElements: number;
}
import { Pageable } from "src/app/core/model/Pageable";
import { Prestamo } from "./Prestamo";


export class PrestamosPage {
    content: Prestamo[];
    pageable: Pageable;
    totalElements: number;
}
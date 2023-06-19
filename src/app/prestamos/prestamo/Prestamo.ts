import { Client } from "src/app/clients/model/Client";
import { Game } from "src/app/game/model/Game";

export class Prestamo {
    id: number;
    game: Game;
    client: Client;
    startdate: string;
    enddate: string;
}
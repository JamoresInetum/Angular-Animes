import { Injectable } from "@angular/core";
import { Global } from "./global";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

// Este servicio no es mas que una clase que se puede usar en otros modulos (de ahi el @inyectable)
@Injectable()
export class AnimeService {

    // Atributos/propiedades
    public url: String;

    // Constructor
    constructor(private _http: HttpClient) {
        this.url = Global.url;
    }

    // Métodos

    /**
     * Este método accede a la url y devuelve un Observable con los X primeros animes desde la posicion Y
     * @returns Observable de animes
     */

    getAnimes(): Observable<any> {
        return this._http.get(this.url + '/anime?page[limit]=20&page[offset]=370')
    }
}
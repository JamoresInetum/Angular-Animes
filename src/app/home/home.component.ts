import { Component, Input, OnInit } from '@angular/core';
import { Anime } from '../models/Anime';
import { AnimeService } from '../services/animes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // @Input() public animes: Array<any>;
  @Input() public mensaje: String;
  @Input() public animes: Anime[];

  // Al llamar a este componente, se genera el constructor, así que puedo crear aquí las características que quiero que tenga, es como crear yo manualmente el .json
  constructor(private _animeService: AnimeService) {
    this.mensaje = "";
    this.animes = [
      new Anime("One Piece", "https://okdiario.com/guiltybit/wp-content/uploads/2022/07/manga-one-piece-1055-spoilers-1024x576.webp"),
      new Anime("Fairy Tail", "https://hbomax-images.warnermediacdn.com/images/GYoy0UgG9-YeAHgEAAACA/tileburnedin?size=1280x720&partner=hbomaxcom&v=5413634fb8d77d9c64ad11e8a2fadb3f&host=art-gallery.api.hbo.com&language=es-419&w=1280"),
      new Anime("Dragon Ball Z", "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/446a20cc-3d9c-4cdf-8845-cee8c49b5076/dcbyl0g-be967860-1994-4f3e-97f2-a7f552cf5b7a.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzQ0NmEyMGNjLTNkOWMtNGNkZi04ODQ1LWNlZThjNDliNTA3NlwvZGNieWwwZy1iZTk2Nzg2MC0xOTk0LTRmM2UtOTdmMi1hN2Y1NTJjZjViN2EuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.A5vX5tVZCEs0oRUIV53K_fNDNUXStTXm8ugTP7n9rho"),
      new Anime("Naruto", "https://wallpaperaccess.com/full/451448.jpg")
    ]
  }

  borrarAnime(title: String) {
    for (let i = 0; i < this.animes.length; i++) {
      if (this.animes[i] != undefined && this.animes[i].title == title) {
        delete this.animes[i]
      }
    }
  }

  // Cuando se conecta a una API externa pasa por aqui
  ngOnInit(): void {
    this._animeService.getAnimes().subscribe(
      response => {
        // console.log(response)
        for(let i = 0; i<response.data.length; i++){

          // añado a la array de animes
          // this.animes.push(new Anime(response.data[i].attributes.canonicalTitle,response.data[i].attributes.posterImage.large))

          // Sobreescribo animes
          this.animes[i] = new Anime(response.data[i].attributes.canonicalTitle,response.data[i].attributes.posterImage.large)
      
        }
    },
      error => {
        console.log(error)
      }
    )
  }


}

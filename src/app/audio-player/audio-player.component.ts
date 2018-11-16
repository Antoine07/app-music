import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { interval } from 'rxjs'; // Observable
import { take, map, mergeMap } from 'rxjs/operators'; // opérateurs

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit {

  current: number = 1;
  total: number;
  ratio: number = 0;
  step: number;
  albumId: string;

  constructor(private aS: AlbumService) { }

  ngOnInit() {

    // définir un streaming de chanson simulé
    const interval$ = interval(12 * 100);

    this.aS.subjectAlbum
      .pipe(
        // mergeMap permet de mergé les observables
        mergeMap(album => {
          this.total = Math.floor(album.duration / 120)
          this.albumId = album.id;

          return interval$.pipe(
            take(this.total),
            // partir de 1 et non de 0 
            map(x => x + 1)
          )
        }
        )
      )
      .subscribe(
        x => {
          this.current = x;
          this.ratio = Math.floor(x * (100 / this.total));

          // remettre à jour les données bar de progression et album
          if(this.current == this.total){
            this.aS.switchOff(this.albumId);
            this.total = null;
            this.ratio = 0;
          }
        }
      )

  }

}
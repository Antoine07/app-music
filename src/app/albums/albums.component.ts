import { Component, OnInit } from '@angular/core';

import { Album } from '../album';
import { ALBUMS } from '../mock-albums';
import { AlbumService } from '../album.service';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('void => *', [
        query('div.card', [
          // état par défaut 
          style({ transform: 'translateX(-200%)' }),
          // appliqué un délais pour l'animation
          stagger(1000, [
            animate('1s ease-out', style({ transform: 'translateX(0)' }))
          ])
        ])
      ])
    ]),
  ]
})
export class AlbumsComponent implements OnInit {

  titlePage: string = "Page princiaple Albums Music";
  albums: Album[] = ALBUMS;
  selectedAlbum: Album;
  status: string = null; // pour gérer l'affichage des caractères [play] 
  count: number = 0;

  constructor(private ablumService: AlbumService) {}

  ngOnInit() {
    this.albums = this.ablumService.paginate(0, 2);
    if (this.albums) this.count = this.albums.length;
  }

  onSelect(album: Album) {
    this.selectedAlbum = album;
  }

  playParent($event) {
    this.status = $event.id; // identifiant unique
    this.ablumService.switchOn($event);
  }

  search($event) {
    if ($event) this.albums = $event;
  }

  paginate($event) {
    this.albums = this.ablumService.paginate($event.start, $event.end);
  }
}
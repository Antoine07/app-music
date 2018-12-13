import { Component, OnInit } from '@angular/core';
import { MusicService, Music, Color } from '../music.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss'],
  providers : [MusicService]
})
export class MusicListComponent implements OnInit {

  musics: Observable<Music[]>;
  count: number;
  color: Color;

  constructor(private mS: MusicService) { }

  ngOnInit() {
    this.musics = this.mS.musics; // Observable
    this.count = this.mS.count;
  }

  tag(music: Music) {
    this.mS.setColor(music);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from '../models/album';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class AlbumComponent implements OnInit {
  idAlbum: any;
  albums?: Album[];
  album: any;
  images1: Array<any> = [];
  images2: Array<any> = [];
  images3: Array<any> = [];
  images4: Array<any> = [];
  constructor(
    private activatedR: ActivatedRoute,
    private albumService: AlbumService
  ) {}

  ngOnInit(): void {
    this.activatedR.paramMap.subscribe((params) => {
      let idA = params.get('idA');
      this.idAlbum = idA;
    });
    this.getAlbum();
  }

  getAlbum() {
    this.albumService.getAlbums().subscribe((data) => {
      this.albums = data.filter((x) => x._id == this.idAlbum);
      this.album = this.albums[0];
      this.images1.push(
        this.album.imgalbum,
        this.album.imgalbum1,
        this.album.imgalbum2,
        this.album.imgalbum3
      );
      this.images2.push(
        this.album.imgalbum4,
        this.album.imgalbum5,
        this.album.imgalbum6,
        this.album.imgalbum7
      );
      this.images3.push(
        this.album.imgalbum8,
        this.album.imgalbum9,
        this.album.imgalbum10,
        this.album.imgalbum11
      );
      this.images4.push(
        this.album.imgalbum12,
        this.album.imgalbum13,
        this.album.imgalbum14,
        this.album.imgalbum15
      );
    });
  }
}

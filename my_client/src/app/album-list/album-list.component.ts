import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../services/album.service';
import { Album } from '../models/album'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  albums: any;
  errMessage: any;
  constructor(private albumService: AlbumService, private router: Router) { }

  ngOnInit(): void {
    this.loadAlbums();
  }
  loadAlbums() {
    this.albumService.getAlbums().subscribe({
      next: (data) => (this.albums = data),
      error: (err) => (this.errMessage = err),
    });
  }
  chitiet(x: Album){
    this.router.navigate(['/album', x._id]);
  }
}

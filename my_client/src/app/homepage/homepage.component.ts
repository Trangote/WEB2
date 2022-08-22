import { Component, OnInit } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { StudioService } from '../services/studio.service';
import { Camera } from '../models/camera';
import { Studio } from '../models/studio';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  studios?: Studio[];
  errMessage: any;
  cameras?: Camera[];
  cameras2?: Camera[];
  studios2?: Studio[];
  selectedid: any;
  constructor(
    private studioService: StudioService,
    private cameraService: CameraService,
    private activatedR: ActivatedRoute, private router: Router
  ) {}

  ngOnInit(): void {
    this.loadStudios();
    this.loadCameras();
    this.selectedid = localStorage.getItem('_id')?.replace(/"/g, '');
  }
  loadStudios() {
    this.studioService.getStudios().subscribe((data) => {
      this.studios = data;
      this.studios2 = this.studios.sort((a: any, b: any) =>
        a.quantity < b.quantity ? 1 : a.quantity > b.quantity ? -1 : 0
     );
    });
  }
  loadCameras() {
    this.cameraService.getCameras().subscribe((data) => {
      this.cameras = data;
      this.cameras2 = this.cameras.sort((a: any, b: any) =>
        a.quantity < b.quantity ? 1 : a.quantity > b.quantity ? -1 : 0
     );
    });
  }
  chitiet(x: Camera){
    this.router.navigate(['/productdetails', this.selectedid, x._id]);
  }
  chitiet2(x: Studio){
    this.router.navigate(['/productdetails', this.selectedid, x._id]);
  }
}

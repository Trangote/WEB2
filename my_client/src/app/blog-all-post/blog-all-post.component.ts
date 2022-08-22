import { Component, OnInit } from '@angular/core';
import { BlogService } from '../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-blog-all-post',
  templateUrl: './blog-all-post.component.html',
  styleUrls: ['./blog-all-post.component.css'],
})
export class BlogAllPostComponent implements OnInit {
  blogs?: Blog[];
  errMessage: any;
  selectedId: any;
  
  filter_chude = {
    All_chude: true,
    Chu_de_chup: false,
    Mot_so_dia_diem_chup_hinh_dep: false,
    Tip_can_biet_khi_chup: false,
  };
  iff = false;
  constructor(
    private blogService: BlogService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }
  loadBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (data) => {this.blogs = data},
      error: (err) => (this.errMessage = err),
    });
  }
  chitiet(x: Blog){
    this._router.navigate(['/blogdetail', x._id]);
  }
  filterChange() {
    if (
      this.filter_chude.Chu_de_chup ||
      this.filter_chude.Mot_so_dia_diem_chup_hinh_dep ||
      this.filter_chude.Tip_can_biet_khi_chup
    ) {
      this.filter_chude.All_chude = false;
    }

    this.blogService.getBlogs().subscribe((data) => {
      this.blogs = data.filter(
        (x) =>
          ((x.blogType === 'Chủ đề chụp' ||
            x.blogType === 'Địa điểm chụp' ||
            x.blogType === 'Tips chụp ảnh đẹp') &&
            this.filter_chude.All_chude) ||
          (x.blogType === 'Chủ đề chụp' && this.filter_chude.Chu_de_chup) ||
          (x.blogType === 'Địa điểm chụp' && this.filter_chude.Mot_so_dia_diem_chup_hinh_dep) ||
          (x.blogType === 'Tips chụp ảnh đẹp' && this.filter_chude.Tip_can_biet_khi_chup) 
      );
    });
    if (this.blogs!.length > 0) {
      this.iff = false;
    } else {
      this.iff = true;
    }
  }
  selectAllChude() {
    this.filterChange();
    this.filter_chude = {
    All_chude: true,
    Chu_de_chup: false,
    Mot_so_dia_diem_chup_hinh_dep: false,
    Tip_can_biet_khi_chup: false,
    };
  }
  chuyentach(){
    this.router.navigate(['/blogintro']);
  }
}

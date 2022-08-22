import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
})
export class BlogDetailComponent implements OnInit {
  idBlog: any;
  blog: any;
  errMessage: any;
  blogs?: Blog[];
  blogs1?: Blog[];
  constructor(
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
    private _activeRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this._activatedRouter.paramMap.subscribe((params) => {
      let id = params.get('idB');
     this.idBlog =id;
    });
    this.loadBlogs();
  }
  loadBlogs() {
    this.blogService.getBlogs().subscribe((data) => {
      this.blogs1 = data;
     this.blogs = data.filter((x) => x._id == this.idBlog);
      this.blog = this.blogs[0];
    });
  }
  chitiet(x: Blog){
    this._router.navigate(['/blogdetail', x._id]);
    this.loadBlogs();
  }
  blogintro(){
    this._router.navigate(['/blogintro']);
  }
  chuyentach(){
    this._router.navigate(['/blogallpost']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../models/blog';

@Component({
  selector: 'app-blog-intro',
  templateUrl: './blog-intro.component.html',
  styleUrls: ['./blog-intro.component.css']
})
export class BlogIntroComponent implements OnInit {
  blogs?: Blog[];
  blog: any;
  constructor(private router: Router, private blogService: BlogService) { }

  ngOnInit(): void {
    this.loadBlogs();
  }
  chuyentach(){
    this.router.navigate(['/blogallpost']);
  }
  loadBlogs() {
    this.blogService.getBlogs().subscribe((data) => {
     this.blogs = data;
    });
  }
  chitiet(x: Blog){
    this.router.navigate(['/blogdetail', x._id]);
    // this.loadBlogs();
  }
}

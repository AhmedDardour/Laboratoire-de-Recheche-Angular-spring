import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Article } from 'src/modals/Article';
import { Member } from 'src/modals/Member';
import { ArticleService } from 'src/services/article.service';
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {
    
    tab:Member[];
    selected!:string;
    displayedColumns: string[] = ['idArticle', 'title', 'Annee', 'Auteur','icon'];
    dataSource : MatTableDataSource<Article>
  
  idArticle: any;
    constructor(
      private articleService : ArticleService,
      private memberService : MemberService,
      private activatedRoute: ActivatedRoute,
      private router : Router
    ) { 
      this.dataSource = new MatTableDataSource(this.articleService.tab);
      this.tab=this.memberService.tab;

    }
    
    
    ngOnInit(): void {
      
    }
    add(selected:string):void {
      this.idArticle= this.activatedRoute.snapshot.params.idArticle;
      this.articleService.Affect(this.idArticle,selected).then(()=>this.router.navigate(['article']));
  }
}
  
import { Injectable } from '@angular/core';
import { GLOBAL } from 'src/app/app-config';
import { Article } from 'src/modals/Article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public tab:Article[]=GLOBAL._DB.article;

  constructor() { }

  Affect(name:string,idArticle:string):Promise<void> {
    this.getArticleByID(idArticle).then(
      (article) => {article.Auteur=name});

      return new Promise(resolve => resolve())

  }

    getArticleByID(idArticle:string):Promise<Article> {
      return new Promise(resolve=>resolve(
        this.tab.filter(item=>item.idArticle===idArticle)[0]??null))

    }
}

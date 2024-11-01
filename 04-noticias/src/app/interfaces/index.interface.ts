export interface NewsResponse {
  status:       string;
  totalResults: number;
  articles:     Article[];
}

export interface Article {
  source:      Source;
  author?:     string | null;
  title:       string;
  description?:string;
  url:         string;
  urlToImage?: string | null;
  publishedAt: string;
  content:     string | null;
}

export interface Source {
  id:   null | string;
  name: string;
}

export interface ArticlesByCategoryAndPage {
  [key: string]: {
    page: number,
    articles: Article[]
  }
}

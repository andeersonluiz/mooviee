export interface CollectionInfo {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  parts: Part[];
}

export interface Part {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: Date;
}

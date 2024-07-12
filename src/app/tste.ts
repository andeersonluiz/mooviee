
import { MoviesAndTvShowProps } from "@/modules/presentation/provider/movies-tv-show-provider";

export interface Post{
  userId:string,title:string
}
const Fund =async (context:MoviesAndTvShowProps|null ) => {

 const datax= await fetch('https://jsonplaceholder.typicode.com/posts');
  
  return (await datax.json()) as Post[] ;

}

export default Fund;
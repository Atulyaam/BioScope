export interface IMovie{
   _id?:string;
   title:string;
   description:string;
   duration:string;
   genre:string[];
   releaseDate:Date;
   language:string[];
   certification:string,
   rating:number;
   votes:number;
   format?:string;
   posterUrl?:string;

}
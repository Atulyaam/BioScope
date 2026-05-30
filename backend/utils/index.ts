import { Types } from "mongoose";
import { IMovie } from "../modules/movie/movie.interface";
import { ITheater } from "../modules/theater/theater.interface";
import { number } from "zod";
import { IShow } from "../modules/show/show.interface";

type GroupedShow = {
  movie: Types.ObjectId | IMovie;
  theater:{
   theaterDetails:Types.ObjectId | ITheater;
   shows:Array<{
      _id:string;
      date:string;
      startTime:string;
      formate:string;
      audioType:string;
   }>;
  }
};

export const isValidEmail = (email:string):boolean=>{
   const emailRegix = /^[^\s@]+[^\s@]+\.[^\s@]+$/;
   return emailRegix.test(email);
}

export const generateSeatLayout=()=>{
   return [
     {
       row: "E",
       type: "PREMIUM",
       price: 510,
       seats: Array.from({ length: 10 }, (_, i) => ({
         number: i + 1,
         status: "AVAILABLE",
       })),
     },
     {
       row: "D",
       type: "EXEXUTIVE",
       price: 290,
       seats: Array.from({ length: 20 }, (_, i) => ({
         number: i + 1,
         status: "AVAILABLE",
       })),
     },
     {
       row: "C",
       type: "EXEXUTIVE",
       price: 290,
       seats: Array.from({ length: 20 }, (_, i) => ({
         number: i + 1,
         status: "AVAILABLE",
       })),
     },
     {
       row: "B",
       type: "EXEXUTIVE",
       price: 290,
       seats: Array.from({ length: 20 }, (_, i) => ({
         number: i + 1,
         status: "AVAILABLE",
       })),
     },
     {
       row: "D",
       type: "NORMAL",
       price: 1800,
       seats: Array.from({ length: 20 }, (_, i) => ({
         number: i + 1,
         status: "AVAILABLE",
       }))
     },
   ];
}

export const groupShowsByTheaterAndMovie = (shows:IShow[]):GroupedShow[]=>{
   const grouped: Record<string,GroupedShow>={};
   shows.forEach((show)=>{
      const movieId = show.movie._id;
      const theaterId = show.theater._id;
      const key = `${movieId}_${theaterId}`

      if(!grouped[key]){
         grouped[key]={
            movie:show.movie,
            theater:{
               theaterDetails:show.theater,
               shows:[]
            },
         };
      }
      grouped[key].theater.shows.push({
         _id:show._id ?? "",
         date: show.date ?? "",
         startTime:show.startTime ?? "",
         formate: show.formate ?? "",
         audioType:show.audioType ?? "",
      })
   })
   return Object.values(grouped);
}

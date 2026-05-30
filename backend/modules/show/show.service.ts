import { Types } from 'mongoose';
import { generateSeatLayout, groupShowsByTheaterAndMovie } from './../../utils/index';

import { IShow } from "./show.interface";
import { showModel } from './show.model';
// 1. createShow

export const createShow = async (showData:IShow)=>{
   const seatLayout = generateSeatLayout();
   const showToCreate = {...showData,seatLayout};

   return await showModel.create(showToCreate as IShow)
}

// 2. get show by movie date and location

export const getShowsByMovieDateAndLocation = async(movieId:string,date:string,location:string)=>{
   const query:any={
      movie: new Types.ObjectId(movieId),
      location:{$regex:new RegExp(location, "i")}
   }
   if(date){
      query.date = date
   }
   const shows = await showModel.find(query)
   .populate("movie theater")
   .sort({startTime:1})

   const groupedShow = groupShowsByTheaterAndMovie(shows);
   return groupedShow

}

// 3. get show by id
export const getShowById = async (showId:string)=>{
   return await showModel.findById(showId).populate("movie theater")
}

// 4. update seat status

export const updateSeatStatus = async (showId:string,row:string, seatNumber:string,status:"AVAILABLE"|"BOOKED"|"BLOCKED")=>{
   return await showModel.updateOne(
      { _id: new Types.ObjectId(showId), "seatLayout.row": row } as any,
      {
         $set: {
            "seatLayout.$.seats.$[elem].status": status,
         },
      },
      {
         arrayFilters: [{ "elem.number": seatNumber }],
      }
   )
}
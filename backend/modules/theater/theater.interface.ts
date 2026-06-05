export interface ISeatRowConfig {
   row: string;
   type: "PREMIUM" | "EXECUTIVE" | "NORMAL" | "RECLINER";
   price: number;
   seatCount: number;
}

export interface ITheater{
   _id?:string;
   name:string;
   location:string;
   logo:string;
   city:string;
   state:string;
   seatLayoutConfig: ISeatRowConfig[];
}
import Header from "../components/seatLayout/Header";

export default function CheckOut(){
    // mocke data
    const shows= {
        _id:"movie123",
        date:"20-06-20260",
        startTime:"10:30 PM",
        movie:{
            title:"Intersteller",
            certification:"U/A",
            language:["Hindi","English"],
            formate:["2D","IMAX"],
            poterUrl:"https://www.bing.com/ck/a?!&&p=26b5776a7f5cd0c1042ede245d532ec8c25cf322be3143fcb26be35bf9266492JmltdHM9MTc4MDQ0NDgwMA&ptn=3&ver=2&hsh=4&fclid=0af88bde-4166-60f4-2c6d-987e401161b9&u=a1L2ltYWdlcy9zZWFyY2g_cT1pbnRlcnN0ZWxsYXIrcG9zdGVyJmlkPTY5OTREQUFFOEE1NzU3MzE5MUExOUU0MkExOUYzQjY1ODc3MkZEOUYmRk9STT1JQUNGSVI"
        },
        theater:{
            name:"PVR",
            city:"mumbai",
            state:"maharashatra", 
        }
    }

    const selectedSeats = [
        {type:"Gold",seatNumber:"85",price:250},
        {type:"Gold",seatNumber:"86",price:250}
    ]
    return(
       <div className="min-h-screen w-full bg-white">
        <Header type="checkout"></Header>
        <div className="max-w-full mx-auto px-4 py-6">
            <div className=" flex flex-col lg:flex-row gap-6">
                {/* Left Section */}
                <div className="flex-1 space-y-4">
                    {/* Movie detail */}
                    <div className="flex gap-4">
                        <img src={shows.movie.poterUrl} alt={shows.movie.title} className="w-[60px] h-[90px] rounded object-cover" />
                        <div>
                            <h3 className="font-semibold text-lg">{shows.movie.title}</h3>
                            <p className="text-sm text-gray-600">
                                {shows.movie.certification}, {shows.movie.language.join(" ,")}, {" "},
                                {shows.movie.formate.join(" ,")}
                            </p>
                            <p className="text-sm text-gray-600">
                                {shows.theater.name},{shows.theater.city},(" "),{
                                    shows.theater.state.toUpperCase()
                                }

                            </p>
                        </div>
                    </div>
                    {/* Show details */}
                    <div className="border border-gray-200 rounded-[24px] px-6 py-5 ">
                        <p className="text-md font-medium border-b pb-5 border-gray-200">
                            {
                                dayjs(shows.date,"DD-MM-YYYY").format("D MMMM YYYY").split(" ").slice(0,2).join(" ")
                            }&nbsp;
                            <span className="font-semibold">{shows.startTime}</span>

                        </p>

                        <div className="flex items-center justify-between mt-4 mb-4">

                        </div>

                    </div>

                </div>

            </div>

        </div>

       </div>
    )
}
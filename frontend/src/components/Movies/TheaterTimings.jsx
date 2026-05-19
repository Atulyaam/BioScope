import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from "../../context/LocationContext"
import { useAuth } from '../../context/AuthContext'
import dayjs from "dayjs"
import { theatres } from '../../utils/constant'

const TheaterTimings = ({ movieId }) => {
  const navigate = useNavigate();
  const { location } = useLocation()
  const { auth, toggleModel } = useAuth()

  const today = dayjs()
  const [selectedDate, setSelectedDate] = useState(today)

  const next7days = Array.from({ length: 7 }, (_, i) => today.add(i, "day"));

  return (
    <>
      <hr className='my-2 border-gray-200' />

      {/* Date selector */}
      <div className='flex items-center gap-2 mb-4 overflow-x-auto my-4 px-2'>
        {next7days.map((date, i) => {
          const isSelected = selectedDate.isSame(date, "day")
          return (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`flex cursor-pointer flex-col border border-gray-200 items-center px-3 py-2 rounded-lg min-w-[50px] ${
                isSelected
                  ? "bg-[#f74362] text-white font-semibold"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              <span className='text-sm font-black'>{date.format("D")}</span>
              <span className='text-xs'>{date.format("ddd")}</span>
              <span className='text-[10px]'>{date.format("MMM").toUpperCase()}</span>
            </button>
          )
        })}
      </div>

      {/* Theatre listings */}
      <div className='space-y-8 px-4 mb-10'>
        {theatres.length === 0 && (
          <div className='text-center text-gray-500'>
            No shows available for the selected date.
          </div>
        )}

        {theatres.map((theatre, i) => (
          <div key={i}>
            {/* Theatre header */}
            <div className='flex items-start gap-3 mb-3'>
              <img
                src={theatre.img}
                alt={theatre.name}
                className='w-8 h-8 object-contain'
              />
              <div>
                <p className='font-semibold'>{theatre.name}</p>
                <p className='text-sm text-[#f74362]'>{theatre.cancellation}</p>
              </div>
            </div>

            {/* Timings */}
            <div className='flex flex-wrap gap-3 ml-11'>
              {theatre.timings.map((slot, j) => (
                <button
                  key={j}
                  onClick={() => {
                    if (!auth) {
                      toggleModel()
                      return;
                    }
                    navigate(`/movies/${movieId}/theater/${i}/shows/${j}/seat-layout`)
                  }}
                  className={`border cursor-pointer border-gray-300 rounded-[16px] px-6 py-2 text-sm flex flex-col items-center justify-center
                    ${slot.highlight ? "border-green-500 text-green-600" : "hover:bg-gray-100"}`}
                >
                  <span className='leading-tight font-semibold'>{slot.time}</span>
                  <span className='text-[10px] text-gray-500 font-black'>{slot.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
};

export default TheaterTimings;



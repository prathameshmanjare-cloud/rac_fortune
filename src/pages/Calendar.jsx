import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react'

const events = [
  { date: '2025-04-05', title: 'Project Meeting', type: 'Club Service', color: '#0B0A0A' },
  { date: '2025-04-12', title: 'Community Health Camp', type: 'Community Service', color: '#FF6B00' },
  { date: '2025-04-15', title: 'District Conference', type: 'International', color: '#C9A84C' },
  { date: '2025-04-20', title: 'Professional Development Workshop', type: 'Professional Dev', color: '#2D2D2D' },
  { date: '2025-04-25', title: 'DEI Awareness Session', type: 'DEI', color: '#5A5A5A' },
  { date: '2025-05-03', title: 'Installation Ceremony', type: 'Club Service', color: '#0B0A0A' },
  { date: '2025-05-10', title: 'Blood Donation Drive', type: 'Community Service', color: '#FF6B00' },
  { date: '2025-05-15', title: 'District Training', type: 'Professional Dev', color: '#2D2D2D' },
  { date: '2025-05-22', title: 'World Rotaract Week', type: 'International', color: '#C9A84C' },
  { date: '2025-06-01', title: 'New President Induction', type: 'Club Service', color: '#0B0A0A' },
]

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedEvent, setSelectedEvent] = useState(null)

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getEventsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(e => e.date === dateStr)
  }

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const selectedDateStr = selectedEvent ? selectedEvent.date : null

  return (
    <>
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-primary overflow-hidden">
        <div className="absolute inset-0 pattern-maratha opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-4">
              Calendar
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-marathi">
              कार्यक्रम — Our Events
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-neutral">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-card overflow-hidden"
              >
                <div className="flex items-center justify-between p-4 bg-secondary">
                  <button
                    onClick={prevMonth}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <h2 className="text-xl font-semibold text-white">
                    {monthNames[month]} {year}
                  </h2>
                  <button
                    onClick={nextMonth}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="grid grid-cols-7">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="p-2 md:p-3 text-center text-xs md:text-sm font-semibold text-secondary bg-gold/10"
                    >
                      {day}
                    </div>
                  ))}

                  {days.map((day, index) => {
                    const dayEvents = day ? getEventsForDay(day) : []
                    const hasEvents = dayEvents.length > 0
                    const isToday = day === new Date().getDate() && 
                      month === new Date().getMonth() && 
                      year === new Date().getFullYear()
                    const isSelected = day && selectedDateStr === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

                    return (
                      <div
                        key={index}
                        className={`min-h-[60px] md:min-h-[80px] p-1 md:p-2 border border-gray-100 ${isSelected ? 'bg-primary/5' : ''} ${!day ? 'bg-gray-50' : ''}`}
                      >
                        {day && (
                          <div className="flex flex-col items-start">
                            <span className={`text-xs md:text-sm font-medium ${isToday ? 'w-6 h-6 md:w-7 md:h-7 bg-primary text-white rounded-full flex items-center justify-center' : 'text-secondary'}`}>
                              {day}
                            </span>
                            <div className="mt-0.5 md:mt-1 space-y-0.5 md:space-y-1">
                              {dayEvents.slice(0, 2).map((event, i) => (
                                <button
                                  key={i}
                                  onClick={() => setSelectedEvent(event)}
                                  className="w-full text-left text-[10px] md:text-xs px-1 py-0.5 rounded truncate text-white"
                                  style={{ backgroundColor: event.color }}
                                  title={event.title}
                                >
                                  {event.title}
                                </button>
                              ))}
                              {dayEvents.length > 2 && (
                                <span className="text-[10px] md:text-xs text-gray-500">+{dayEvents.length - 2} more</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </div>
        </div>
      </section>
    </>
  )
}

export default Calendar
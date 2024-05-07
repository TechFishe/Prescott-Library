import { useState } from "react";

interface Day {
  day: string;
  light: boolean;
  date: number;
  event: boolean;
  name?: string | undefined;
  time?: string | undefined;
  place?: string | undefined;
}

interface Month {
  name: string;
  year: number;
  days: Day[];
}

interface Props {
  calendar: {
    id: string;
    collection: string;
    data: Month[];
  };
}

export default function ClubCalendar(props: Props) {
  const [month_index, set_month_index] = useState(0);

  return (
    <>
      <section className="flex space-x-4">
        <h1 className="text-5xl font-semibold tracking-wide">
          {props.calendar.data[month_index].name} {props.calendar.data[month_index].year}
        </h1>
        <nav className="flex items-center space-x-2">
          <button
            onClick={() => set_month_index(month_index - 1)}
            disabled={month_index === 0}
            className="group aspect-square h-fit rounded-lg border border-transparent p-1 transition-all ease-in enabled:hover:scale-[1.025] enabled:hover:border-[#E9EDDE]/25 disabled:cursor-not-allowed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              fill="currentColor"
              className="h-6 w-6 transition-colors ease-in group-enabled:group-hover:text-burgundy-900 group-disabled:opacity-45">
              {/* !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </button>
          <button
            onClick={() => set_month_index(month_index + 1)}
            disabled={month_index === props.calendar.data.length - 1}
            className="group aspect-square h-fit rounded-lg border border-transparent p-1 transition-all ease-in enabled:hover:scale-[1.025] enabled:hover:border-[#E9EDDE]/25 disabled:cursor-not-allowed">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              fill="currentColor"
              className="h-6 w-6 transition-colors ease-in group-enabled:group-hover:text-burgundy-900 group-disabled:opacity-45">
              {/* !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
              <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
            </svg>
          </button>
        </nav>
      </section>
      <ol className="grid min-h-calendar grid-flow-row grid-cols-7">
        {props.calendar.data[month_index].days.map((day, index) => (
          <li
            key={index}
            className={`flex flex-col border border-[#E9EDDE]/10 px-2 py-1 ${day.light ? "opacity-45" : "opacity-100"}`}>
            <span className="h-fit pb-2 text-2xl text-[#E9EDDE]/65">
              {day.date}: {day.day}
            </span>
            {day.event && (
              <div className="flex w-full items-end">
                <ul>
                  <li className="text-sm">
                    Event: <span className="font-semibold text-burgundy-400">{day.name}</span>
                  </li>
                  <li className="text-sm">
                    Time: <span className="font-semibold text-burgundy-400">{day.time}</span>
                  </li>
                  <li className="text-sm">
                    Place: <span className="font-semibold text-burgundy-400">{day.place}</span>
                  </li>
                </ul>
              </div>
            )}
          </li>
        ))}
      </ol>
    </>
  );
}

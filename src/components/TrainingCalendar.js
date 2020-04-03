import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Moment from "moment";

const localizer = momentLocalizer(Moment);

const TrainingCalendar = props => {
    const [events, setEvents] = useState([]);

    useEffect(() => fetchData(), []);


    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => {
                return setEvents(
                    data.map(training => ({
                        start: new Date(training.date),
                        end: new Date(Moment(training.date).add(training.duration, "minutes")),
                        title: training.activity,
                    }))
                );
            });
    };


    return (
        <div>
            <Calendar
                localizer={localizer}
                views={["week", "month", "day"]}
                events={events}
                style={{ height: "80vh", padding: "20px"}}
            />
        </div>
    );
};

export default TrainingCalendar;
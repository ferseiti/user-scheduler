// Client-side (React.js)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('SomeKey');

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get('http://localhost:5000/events');
      setEvents(res.data);
    };

    fetchEvents();
  }, []);
  
  const onActionComplete = async (args) => {
    console.log(args.requestType);
    if (args.requestType === 'eventCreated') {
      for (let event of args.data) {
        await axios.post('http://localhost:5000/events', event);
      }
    }
  };

  return (
    <ScheduleComponent eventSettings={{ dataSource: events }} actionComplete={onActionComplete}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}

export default App;
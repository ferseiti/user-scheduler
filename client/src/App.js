// Client-side (React.js)
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('somelicense');

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get('http://localhost:5000/events');
      setEvents(res.data);
    };

    fetchEvents();
  }, []);

  return (
    <ScheduleComponent eventSettings={{ dataSource: events }}>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}

export default App;
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import * as Templates from './Templates';

import { ScheduleComponent, Month, Inject, ViewsDirective, ViewDirective, Resize } from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

registerLicense(process.env.REACT_APP_SYNCFUSION_API_KEY);

function App() {
  const [events, setEvents] = useState([]);
  const scheduleRef = useRef(null);

  const onAddClick = (args) => {
    let cellData = scheduleRef.current.activeCellsData;
    scheduleRef.current.openEditor(cellData, 'Add');
  }

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
        console.log(event)
        event.IsAllDay = true;
        await axios.post('http://localhost:5000/events', event);
      }
      const response = await axios.get('http://localhost:5000/events');
      setEvents(response.data);
    }
    if (args.requestType === 'eventChanged') {
      for (let event of args.data) {
        await axios.put(`http://localhost:5000/events/${event._id}`, event);
      }
      const response = await axios.get('http://localhost:5000/events');
      setEvents(response.data);
    }
    if (args.requestType === 'eventRemoved') {
      for (let event of args.data) {
        await axios.delete(`http://localhost:5000/events/${event._id}`);
        console.log(`${event._id}`);
      }
      const response = await axios.get('http://localhost:5000/events');
      setEvents(response.data);
    }
  };
  
  function onEventRendered(args) {
    let servidor = args.data.Servidor;
    for (let server of Templates.servers) {
      if (server.text === servidor) {
        args.element.style.backgroundColor = server.categoryColor;
      }
    }
  }
  
  // a função abaixo valida os campos do formulário de edição
  // Solução retirada de https://stackblitz.com/edit/react-abhv4n-2dhb5n?file=index.js
  function onPopupOpen(args) {

    if (args.type === 'Editor') {
      var formElement = args.element.querySelector('.e-schedule-form');
      console.log(formElement);
      console.log((formElement).ej2_instances)
      var validator = (formElement).ej2_instances[0];
      validator.addRules('Username', { required: [true, 'Campo "username" obrigatório'], 
                                       regex : ['^[A-z]+[A-z0-9_-]+$', 'Iniciar com letra, seguida de alfanuméricos, - ou _']});
      validator.addRules('Servidor', { required: [true, 'Campo "servidor" obrigatório']});
    }
  }

  return (
    <div>
      <ButtonComponent id='btn1' title='New' onClick={onAddClick}>Adicionar agendamento</ButtonComponent>
      <ButtonComponent id='btn2' title='Edit'>Editar Agendamento</ButtonComponent>
      <ScheduleComponent ref={scheduleRef} width='100%' height='80em' rowAutoHeight={true} 
                        eventSettings={{ dataSource: events, fields: Templates.fieldsData}}
                        editorTemplate={Templates.editorTemplate}
                        eventRendered={onEventRendered}
                        popupOpen={onPopupOpen} 
                        showQuickInfo={false}
                        // cellClick={onCellClick}
                        //quickInfoTemplates={Templates.quickInfoTemplates}
                        actionComplete={onActionComplete} allowResizing={true} quickInfoOnSelectionEnd={false} >
          <ViewsDirective>
            <ViewDirective option='Month' readonly={false} />
          </ViewsDirective>
          
          <Inject services={[Month, Resize]} />
      </ScheduleComponent>
    </div>
  );
}

export default App;
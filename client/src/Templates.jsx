import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

const editorTemplate = (props) => {
  return (
    <table className="custom-event-editor" style={{ width: '100%', padding: '5' }}>
      <tbody>
        <tr><td className="e-textlabel">Servidor</td><td colSpan={4}>
          <DropDownListComponent id="Servidor" placeholder='Escolha o servidor' data-name="Servidor" className="e-field" style={{ width: '100%' }} dataSource={ servers } value={props.EventType || null}></DropDownListComponent>
        </td></tr>

        <tr><td className="e-textlabel">Username</td><td colSpan={4}>
          <input id="Username" className="e-field e-input" type="text" name="Username" style={{ width: '100%' }} />
        </td></tr>
        
        <tr><td className="e-textlabel">De</td><td colSpan={4}>
          <DateTimePickerComponent format='dd/MM/yyyy HH:mm' id="StartTime" data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field"></DateTimePickerComponent>
        </td></tr>
        <tr><td className="e-textlabel">Até</td><td colSpan={4}>
          <DateTimePickerComponent format='dd/MM/yyyy HH:mm' id="EndTime" data-name="EndTime" value={new Date(props.endTime-1 || props.EndTime-1)} className="e-field"></DateTimePickerComponent>
        </td></tr>
        <tr><td className="e-textlabel">Reason</td><td colSpan={4}>
          <textarea id="Description" className="e-field e-input" name="Description" rows={3} cols={50} style={{ width: '100%', height: '60px !important', resize: 'vertical' }}></textarea>
        </td></tr>
      </tbody>
    </table> );
}

const servers = [
    { text: 'Robot', value: 'robot', categoryColor: '#ff0000' },
    { text: 'Cyborg', value: 'cyborg', categoryColor: '#fffb00' },
    { text: 'Android', value: 'android', categoryColor: '#f000ff' },
    { text: 'Legion', value: 'legion', categoryColor: '#0004ff' },
];

const fieldsData = {
    subject: { name: 'Username' }
};

export { editorTemplate };
export { servers };
export { fieldsData };
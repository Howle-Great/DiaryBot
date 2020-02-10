import React from 'react';
import './Sheet.css';

const params = [
  {
    date: "1",
    content: "2",
    healthState: "3",
    wish: "4",
    time: "5"
  },
  {
    date: "11",
    content: "21",
    healthState: "31",
    wish: "41",
    time: "51"
  }
]

const SheetBodyRow = ({props}) => {
  console.log(props);
  
  return (
    <div className="sheet_row">
      <div className="sheet_body__data table_element">{props.date}</div>
      <div className="sheet_body__content table_element">{props.content}</div>
      <div className="sheet_body__healthState table_element">{props.healthState}</div>
      <div className="sheet_body__wish table_element">{props.wish}</div>
      <div className="sheet_body__time table_element">{props.time}</div>
    </div>
  )
}

const Sheet = () => {
  const tableBody = params.map(elem => {
    return (<SheetBodyRow props = {elem}/>)
  });

  return (
    <div className="sheet">
      <div className="sheet_top">
        <div className="sheet_top__data table_element">Дата</div>
        <div className="sheet_top__content table_element">Содержание</div>
        <div className="sheet_top__healthState table_element">Самочувствие</div>
        <div className="sheet_top__wish table_element">Желание</div>
        <div className="sheet_top__time table_element">Время</div>
      </div>
      <div className="sheet_body">
        {tableBody}
      </div>
    </div>
  )
}

export default Sheet;
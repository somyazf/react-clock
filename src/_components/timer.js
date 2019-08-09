import React from 'react';

function Timer ({counter,handleChange}) {
  const sec = counter % 60;
  const min = ((counter - sec) / 60) % 60;
  const hour = (counter - min * 60 - sec) / 3600;
  return <div style={style}>
    <div>
      <h3>Input your desired time</h3>
      <input type="number" onChange={handleChange} required name="hour"/><input type="number" onChange={handleChange} required name="hour"/><input type="number" onChange={handleChange} required name="hour"/>
    </div>
    <span>{hour.toLocaleString('en',{minimumIntegerDigits: 2})}</span>
    :
    <span>{min.toLocaleString('en',{minimumIntegerDigits: 2})}</span>
    :
    <span>{sec.toLocaleString('en',{minimumIntegerDigits: 2})}</span>
  </div>;
}

const style = {
  color: '#FFF',
  fontSize: 40,
  fontWeight: 'bold'
};

export {Timer};
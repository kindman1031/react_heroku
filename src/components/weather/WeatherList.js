import React from 'react';
import { WeatherListRow } from './WeatherListRow';

export const WeatherList = ({ weather, pageNumber, onDelete }) => {

  var arr = [];
  for (var i = pageNumber * 10; i < pageNumber * 10 + 10; i++) {
    if (weather[i] == null) {
      break;
    }
    else {
      arr.push(weather[i]);
    }

  }
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Country</th>
            <th>State</th>
            <th>Snow</th>
            <th>Wind</th>
            <th>Seismic1</th>
            <th>Seismic2</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {arr.map(item => WeatherListRow({ item, onDelete }))}
        </tbody>
      </table>
    </div>
  )
};



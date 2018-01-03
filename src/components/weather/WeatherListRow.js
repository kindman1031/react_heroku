import React from 'react';
import { Link } from 'react-router';

export const WeatherListRow = ({ item, onDelete }) => {
  return (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.country}</td>
      <td>{item.state}</td>
      <td>{item.snow}</td>
      <td>{item.wind}</td>
      <td>{item.seismic1}</td>
      <td>{item.seismic2}</td>
      <td>
        <div className="btn-toolbar pull-right">
          <Link to={`/weather/${item.id}`} className="btn btn-primary">Edit</Link>
          <a onClick={onDelete.bind(this, item)} className="btn btn-danger">Delete</a>
        </div>
      </td>
    </tr>
  )
};

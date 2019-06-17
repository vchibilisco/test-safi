import React, { useState } from 'react';
import Select from 'react-select';
import { Line } from 'react-chartjs-2';
import { getDataSet } from './helper';
import metricsOptions from './metricData';
import './visualizeData.css';

const VisualizeData = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [dataToVisualize, setDataToVisualize] = useState({
    data: [],
    downtime: 0,
    uptime: 0
  });

  const handleChange = selectedOption => {
    setSelectedOption(selectedOption);
    setDataToVisualize({
      data: [],
      downtime: 0,
      uptime: 0
    });
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    if (selectedOption && selectedOption.value) {
      fetch(
        `http://localhost:8080/api/v1/compressorinfo?metric=${selectedOption.value}`,
        {
          method: 'GET'
        }
      ).then(response => (
        response.json()
      )).then(jsonReponse => setDataToVisualize(jsonReponse));
    } else {
      alert('Please select a filter');
    }
  };

  return (
    <>
      <form onSubmit={ handleOnSubmit }>
        <label>Select Filter</label>
        <div className="Visualize-form">
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={metricsOptions}
          />
          <button type="submit">Apply</button>
        </div>
      </form>
      <div>
        {
          Boolean(dataToVisualize.uptime || dataToVisualize.downtime) &&
          <>
            <label>Uptime: {dataToVisualize.uptime}</label>
            <label>Downtime: {dataToVisualize.downtime}</label>
          </>
        }
        {
          Boolean(dataToVisualize.data.length) &&
          <Line data={ getDataSet(dataToVisualize.data, selectedOption.value) } />
        }
      </div>
    </>
  );
};

export default VisualizeData;

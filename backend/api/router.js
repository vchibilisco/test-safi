const express = require('express'),
  router = express.Router()
  csv = require('csv')
  moment = require('moment');

const objectCsv = csv();
let MyData = [];
objectCsv.from.path('./api/demoCompressorWeekData.csv').to.array((data) => {
  for (var index = 1; index < data.length; index++) {
    MyData.push({
      date: moment(Number(data[index][0])).utc(),
      metricid: data[index][1],
      recvalue: data[index][3],
      uptime: data[index][3] > 0
    });
  }
});

router.get('/compressorinfo', (req, res) => {
  const metricid = req.query.metric;

  const newDataFilterDate = MyData
    .filter(record => record.metricid === metricid);
  
  const newDataFilterByUptime = newDataFilterDate.filter(record => record.uptime > 0);
  const uptime = newDataFilterByUptime.length;
  const downtime = newDataFilterDate.filter(record => record.uptime <= 0).length;

  res.json({
    data: newDataFilterByUptime,
    uptime,
    downtime
  });
});

module.exports = router;

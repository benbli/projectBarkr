var mongoose = require('mongoose');
var Playdate = require('./models/playdate');

mongoose.connect('mongodb://localhost/barkrdatabase', function(err){
  if(err){
    console.log('connection error');
  } else {
    console.log('successfully connected');
  }
});

var playdates = [
  {
    time: '2/19 2:00pm',
    location: 'Central Park, New York, NY',
    coordinates: [-73.973490, 40.765249],
  },
  {
    time: '2/15 3:00pm',
    location: '65th St Transverse, New York, NY 10019',
    coordinates: [-73.9793904, 40.7684844],
  },
  {
    time: '2/04 5:00pm',
    location: 'Bryant Park, New York, NY',
    coordinates: [-73.9867503, 40.7486927],
  },
  {
    time: '1/19 4:00pm',
    location: 'Madison Ave, New York, NY 10010',
    coordinates: [-74.0007533, 40.7390356],
  },
  {
    time: '1/18 9:00pm',
    location: 'Union Square Greenmarket, New York, NY',
    coordinates: [-73.9924972, 40.7362512],
  },
];

playdates.forEach((playdate) => {
  var newPlaydate = new Playdate(playdate);
  newPlaydate.save((error) => {
    if(error) {
      console.log(error);
    } else {
      console.log('added the playdate');
    }
  });
});

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
// const helmet = require('helmet');
const bodyParser = require('body-parser');
require('dotenv').config();

const router = require('./routes');

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     useDefaults: true,
//     directives: {
//       "img-src": ["'self'", "https: data:"]
//     }
//   })
// )
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

mongoose.connect("mongodb+srv://urrriy:ura_2702@cluster0.imc7uoy.mongodb.net/?retryWrites=true&w=majority");

app.use(router);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

process.on("unhandledRejection", () => process.exit(0));
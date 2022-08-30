//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const loadCountries = async () => {

  const api = await axios.get('https://restcountries.com/v3/all');

  const map = await api.data.map((e) => {
      return ({
          'id': e.cca3,
          'name': e.name.common,
          'image': e.flags[1],
          'continent': e.region,
          'capital': e.capital ? e.capital[0] : 'Capital not found',
          'subregion': e.subregion,
          'area': e.area,
          'population': e.population
      });

  });
  await Country.bulkCreate(map);
}; 

const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');
const { Country } = require('./src/db');

// Syncing all the models at once.
conn.sync({ force: true }).then(() => loadCountries()).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

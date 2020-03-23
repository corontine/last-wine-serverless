const shops = require('./shops.json');
const fs = require('fs');
(()=>{
  const shopsSubset = shops.splice(0,200);
  fs.writeFileSync('./subset.json',JSON.stringify(shopsSubset));
})();

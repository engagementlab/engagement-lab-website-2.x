const fs = require('fs');

module.exports = () => {
  const modules = [];
  const files = fs.readdirSync(__dirname);
  files.forEach((file) => {
    if (file !== 'index.js') { modules.push(require(`${__dirname}/${file}`)); }
  });
  return modules;
};

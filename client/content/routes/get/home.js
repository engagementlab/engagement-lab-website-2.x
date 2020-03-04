
/**
 * Developed by Engagement Lab, 2018
 * ==============
 * Route to retrieve project data
 * @class api
 * @author Johnny Richardson
 *
 * ==========
 */

/*
 * Get data
 */
module.exports = (req, res) => {
    
  res.locals.db.all("SELECT * FROM homepage", (err, content) => {
      if(err) {
        console.error(err);
        return;
      }
      
        res.json(JSON.parse(content[0].body));
    });
  
};

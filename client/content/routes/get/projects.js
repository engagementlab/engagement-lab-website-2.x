
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
   
    global.db.all("SELECT body FROM projects", (err, content) => {
      if(err) {
        console.error(err);
        return;
      }
      let formatted = content.map(c => { return JSON.parse(c.body);} );
      formatted.sort((a, b) => { return a.sortOrder - b.sortOrder; });

      res.status(200).json(formatted);
      
    });

  };

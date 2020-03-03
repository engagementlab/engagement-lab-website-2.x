
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
      res.status(200).json(content);
      
    });

  };

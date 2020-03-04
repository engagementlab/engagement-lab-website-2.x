
/**
 * Engagement Lab Website v2.x content service
 * Developed by Engagement Lab, 2020
 * ==============
 * Route to retrieve project data
 * @author Johnny Richardson
 *
 * ==========
 */

/*
 * Get projects index data
 */
const all = (req, res) => {
   
  res.locals.db.all("SELECT body FROM projects", (err, content) => {
    if(err) {
      console.error(err);
      return;
    }
    let formatted = content.map(c => { return JSON.parse(c.body);} );
    formatted.sort((a, b) => { return a.sortOrder - b.sortOrder; });

    res.status(200).json(formatted);
    
  });

};

/*
 * Get project data
 */
const one = (req, res) => {
  
  res.locals.db.get(`SELECT body FROM projects WHERE key = "${req.params.key}"`, (err, content) => {
  if(err) {
      console.error(err);
      return;
    }
    res.status(200).json(JSON.parse(content.body));
    
  });

};

module.exports = (req, res) => {
  
  req.params.key ? one(req, res) : all(req, res);

}
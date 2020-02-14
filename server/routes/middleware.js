/* Engagement Lab Website */
/**
 * Route middleware
 * This file contains the common middleware used by all routes.
 * Extend or replace these functions as the application requires.
 *
 * @class middleware
 * @namespace routes
 * @author Johnny Richardson
 * @constructor
 * @static
 * */

/**
  Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = (req, res, next) => {
  if (!req.user) {
    req.flash('error', 'Please sign in to access this page.');
    res.redirect('/keystone/signin');
  } else {
    next();
  }
};


/**
    Inits the error handler functions into `req`
*/

exports.initErrorHandlers = (req, res, next) => {
  res.err = (err, title, message) => {
    res.status(500).render('errors/500', {
      err,
      errorTitle: title,
      errorMsg: message,
    });
  };

  res.notfound = (title, message) => {
    res.status(404).render('errors/404', {
      errorTitle: title,
      errorMsg: message,
    });
  };

  next();
};

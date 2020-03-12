
/**
 * @fileoverview Engagement Lab Website v2.x content service
 * @copyright Engagement Lab at Emerson College, 2020
 *
 * @author Johnny Richardson
 * @description Project data route
 *
 * ==========
 */

const GetAdjacent = async (list, results, res) => {
  const fields = 'name key -_id';
  // Get one next/prev project from selected project's sortorder
  const nextProject = list
    .findOne(
      {
        enabled: true,
        sortOrder: {
          $gt: results.sortOrder,
        },
      },
      fields,
    )
    .limit(1);
  const prevProject = list
    .findOne(
      {
        enabled: true,
        sortOrder: {
          $lt: results.sortOrder,
        },
      },
      fields,
    )
    .sort({ sortOrder: -1 })
    .limit(1);

  const nextPrevResults = {
    next: await nextProject,
    prev: await prevProject,
  };

  // Poplulate next/prev and output response
  try {
    const output = Object.assign(nextPrevResults, { project: results });
    return output;
  } catch (err) {
    res.status(500).send(err);
  }
};

const BuildData = async (req, res) => {
  const list = res.locals.db.list('Project').model;
  const options = { id: req.params.key };

  const fields = 'key image.public_id byline name featured archived projectType customUrl sortOrder';
  let data;

  try {
    // Get one project
    if (options.id) {
      const addtlFields = '_id description challengeTxt strategyTxt resultsTxt externalLinkUrl githubUrl projectImages.public_id files showFiles';
      data = list.findOne({
        key: options.id,
      }, `${fields} ${addtlFields}`)
        .populate({
          path: 'principalInvestigator',
          select: 'name -_id',
        })
        .populate({
          path: 'format',
          select: 'name -_id',
        })
        .populate({
          path: 'files',
          select: 'name file.filetype file.url fileSummary.html',
        });
    } else if (options.archived) {
      data = list.find({
        enabled: true,
        archived: true,
      },
      fields)
        .sort([['sortOrder', 'descending']]);
    } else {
      data = list.find({ enabled: true }, `${fields} -_id`)
        .sort([['sortOrder', 'ascending']]);
    }

    const results = await data.exec();

    if (results === null || results.length < 1) {
      res.status(204).send();
    }

    let resultObj = null;
    if (options.id) {
      resultObj = await GetAdjacent(list, results, res);
    } else {
      resultObj = results;
    }

    res.status(200).json(resultObj);
  } catch (err) {
    res.status(500).send(`${err}`);
  }
};

exports.data = (req, res) => BuildData(req, res);
exports.keys = async (req, res) => {
  const list = res.locals.db.list('Project').model;
  const keys = await list.find({}, 'key -_id').exec();

  res.status(200).json(keys);
};

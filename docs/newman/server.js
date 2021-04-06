/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * runNewman wraps newman.run() in javascript.
 * @param test {json}: test collection to run
 * @param env {json}: environment collection
 * @returns exitCode {int}: 0 if no error, nonzero if error
 */

const newman = require('newman')
const test = require('./collection/Alumni API.postman_collection.json')
const env = require('./collection/Alumni APi.postman_environment.json')

newman
  .run({
    collection: test,
    environment: env,
    reporters: ['htmlextra', 'cli'],
    reporter: {
      htmlextra: {
        export: './resultNewman.html',
        darkTheme: true,
      },
    },
  })
  .on('start', function (err, args) {
    console.log('Start running a collection...')
  })
  .on('done', function (err, summary) {
    // note: wierdly newman doesnt return any errors if test run fails,
    // so need to check the summary objects.
    // err is for newman runtime errors instead
    if (
      summary.run.failures.length > 0 ||
      !Array.isArray(summary.run.failures)
    ) {
      console.error('Done but collection run encountered error(s).')
      process.exitCode = 33 // send any non-zero exit code so pipeline can detect error
    } else if (err || summary.error) {
      console.error('Done but newman encountered error(s).')
      console.error('Error found: ', err, ' ', summary.error)
      process.exitCode = 22 // send any non-zero exit code so pipeline can detect error
    } else {
      console.log('\nCollection run completed.')
    }
  })

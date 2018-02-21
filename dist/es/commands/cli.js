#!/usr/bin/env sh
'use strict';

':'; //; exec "$(command -v nodejs || command -v node)" -- "$0" "$@"
// Execute as shell script initally to find local babel-node executable.
// See: https://unix.stackexchange.com/a/65295

/**
 * Command-line interface to PDFr functions.
 *
 * The intention of this script is to be callable from some deamon services
 * such as a dedicated Docker microservice
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = main;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _ = require('..');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Main driver function. Prints help() if no paramters or help specified.
 *
 * @param {string[]} argv - command line arguments, usually from 'process.argv'
 */
function main(argv) {
  var userParameters = (0, _minimist2.default)(argv.slice(2));

  if (!userParameters || userParameters.h || userParameters.help) {
    var appName = _path2.default.basename(argv[1]);
    var message = ['Generates a PDF from an input HTML template with optional parameters.', '', 'Usage: ' + appName + ' [-c <pdf-settings>] [-p <template-variables>] <source> <destination>', '', 'Examples:', appName + ' /path/to/source.tpl.html /path/to/destination.pdf', appName + ' -p context.json /path/to/source.tpl.html /path/to/destination.pdf', appName + ' -c settings.json  -p context.json /path/to/source.tpl.html /path/to/destination.pdf'].join('\n');

    _.log.info(message);
    process.exitCode = 1;
    return;
  }

  var _userParameters$_ = _slicedToArray(userParameters._, 2),
      sourcePath = _userParameters$_[0],
      destinationPath = _userParameters$_[1],
      _userParameters$c = userParameters.c,
      pdfSettingsPath = _userParameters$c === undefined ? null : _userParameters$c,
      _userParameters$p = userParameters.p,
      contextPath = _userParameters$p === undefined ? null : _userParameters$p,
      verbose = userParameters.v;

  if (verbose) {
    _.log.level = 'verbose';
  }

  (0, _.templateToPDF)(sourcePath, destinationPath, contextPath, pdfSettingsPath);
}

// Ignore CLI entry-point as this will only work when invoked directly as script
/* istanbul ignore next */
if (require.main === module) {
  main(process.argv);
}
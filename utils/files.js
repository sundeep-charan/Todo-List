// Utility functions for writing and reading the file.
var fs = require("fs");

module.exports = {
  readFilePromise: function(filePath) {
    return new Promise(function(resolve, reject) {
      // Read file normally.
      fs.readFile(filePath, { encoding: "utf-8" }, function(err, data) {
        if (err)
          // Reject the error.
          reject(err);
        // Else resolve the data
        else resolve(data);
      });
    });
  },
  writeFilePromise: function(filePath, data) {
    return new Promise(function(resolve, reject) {
      // Read file normally.
      fs.writeFile(filePath, data, function(err) {
        if (err)
          // Reject the error.
          reject(err);
        else resolve("File written successfully");
      });
    });
  }
};

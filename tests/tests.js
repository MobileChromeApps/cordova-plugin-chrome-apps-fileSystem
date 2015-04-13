// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

exports.defineManualTests = function(rootEl, addButton) {
  var FileReader = window.FileReader || cordova.require('cordova/plugin/FileReader');

  var onError = function(e) {
    console.error('Error: ' + e.code);
  };

  addButton('chooseEntry, readAsText', function() {
    // This method is called when a file entry is retrieved.
    var chooseEntryCallback = function(fileEntry) {
      fileEntry.file(onFileReceived, onError);
    };

    // This method is called when a file is received from a file entry.
    var onFileReceived = function(file) {
      var reader = new FileReader();
      reader.onload = function(evt) {
        console.log('Text: ' + evt.target.result);
      };
      reader.onerror = function(evt) {
        console.log('Error: ' + evt.target.error.code);
      };
      reader.readAsText(file);
    };

    chrome.fileSystem.chooseEntry({ }, chooseEntryCallback);
  });

  addButton('chooseEntry, readAsDataURL', function() {
    // This method is called when a file entry is retrieved.
    var chooseEntryCallback = function(fileEntry) {
      fileEntry.file(onFileReceived, onError);
    };

    // This method is called when a file is received from a file entry.
    // It reads the file as a data URL and logs it.
    var onFileReceived = function(file) {
      var reader = new FileReader();
      reader.onload = function(evt) {
        console.log('Data URL: ' + evt.target.result.substring(0, 32) + '...');
      };
      reader.onerror = function(evt) {
        console.log('Error: ' + evt.target.error.code);
      };
      reader.readAsDataURL(file);
    };

    chrome.fileSystem.chooseEntry({ }, chooseEntryCallback);
  });

  addButton('chooseEntry, upload (cordova only)', function() {
    // This method is called when a file entry is retrieved.
    var chooseEntryCallback = function(fileEntry) {
      fileEntry.file(onFileReceived, onError);
    };

    // This method is called when a file is uploaded.
    var onFileUploaded = function(response) {
      console.log('Response code: ' + response.responseCode);
    };

    // This method is called when a file is received from a file entry.
    // It uploads the file to a server.
    var onFileReceived = function(file) {
      var FileTransfer = cordova.require('cordova/plugin/FileTransfer');
      var transfer = new FileTransfer();
      transfer.upload(file.fullPath, 'http://cordova-filetransfer.jitsu.com/upload', onFileUploaded, onError, { });
    };

    chrome.fileSystem.chooseEntry({ }, chooseEntryCallback);
  });

  addButton('chooseEntry, writable file', function() {
    // This method is called when a file entry is retrieved.
    var chooseEntryCallback = function(fileEntry) {
      if (fileEntry) {
        console.log('Writable file entry non-null: ' + fileEntry.fullPath);
      } else {
        console.log('Writable file entry null, as expected.');
      }
    };

    var chooseEntryOptions = { type: 'openWritableFile' };

    chrome.fileSystem.chooseEntry(chooseEntryOptions, chooseEntryCallback);
  });

  addButton('chooseEntry, save file', function() {
    // This method is called when a file entry is retrieved.
    var chooseEntryCallback = function(fileEntry) {
      if (fileEntry) {
        console.log('Save file entry non-null: ' + fileEntry.fullPath);
      } else {
        console.log('Save file entry null, as expected.');
      }
    };

    var chooseEntryOptions = { type: 'saveFile' };

    chrome.fileSystem.chooseEntry(chooseEntryOptions, chooseEntryCallback);
  });

  addButton('chooseEntry, images only', function() {
    // This method is called when a file entry is retrieved.
    var chooseEntryCallback = function(fileEntry) {
      console.log('File entry path: ' + fileEntry.fullPath);
    };

    var chooseEntryOptions = { acceptsAllTypes: false,
                               accepts: [{ mimeTypes: ['image/*'] }] };

    chrome.fileSystem.chooseEntry(chooseEntryOptions, chooseEntryCallback);
  });

  addButton('chooseEntry, videos only', function() {
    // This method is called when a file entry is retrieved.
    var chooseEntryCallback = function(fileEntry) {
      console.log('File entry path: ' + fileEntry.fullPath);
    };

    var chooseEntryOptions = { acceptsAllTypes: false,
                               accepts: [{ mimeTypes: ['video/*'] }] };

    chrome.fileSystem.chooseEntry(chooseEntryOptions, chooseEntryCallback);
  });
};

exports.defineAutoTests = function() {
  'use strict';

  require('cordova-plugin-chrome-apps-test-framework.jasmine_helpers').addJasmineHelpers();

  describeExcludeChrome('chrome.fileSystem', function() {
    // Create a file entry for testing.
    var fileEntry = new FileEntry('filename', 'fullpath');

    describe('getDisplayPath()', function() {
      it('returns the full path of the given file entry', function() {
        // Create the callback.
        var getDisplayPathCallback = function(displayPath) {
          expect(displayPath).toEqual(fileEntry.fullPath);
        };

        // Get the display path.
        chrome.fileSystem.getDisplayPath(fileEntry, getDisplayPathCallback);
      });
    });
    describe('getWritableEntry()', function() {
      it('returns a writable file entry', function() {
        // Create the callback.
        var getWritableEntryCallback = function(writableFileEntry) {
          expect(writableFileEntry).not.toBeNull();
        };

        // Get the writable file entry.
        chrome.fileSystem.getWritableEntry(fileEntry, getWritableEntryCallback);
      });
    });
    describe('isWritableEntry()', function() {
      it('returns true', function() {
        // Create the callback.
        var isWritableEntryCallback = function(isWritable) {
          expect(isWritable).toBeTruthy();
        };

        // Get whether the file entry is writable.
        chrome.fileSystem.isWritableEntry(fileEntry, isWritableEntryCallback);
      });
    });
  });
};

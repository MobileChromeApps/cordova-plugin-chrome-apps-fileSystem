# chrome.fileSystem Plugin

This plugin allows apps to access a device's file system.

## Status

Stable on Android and iOS.

## Reference

The API reference is [here](http://developer.chrome.com/apps/fileSystem.html).

## Notes

* restoreEntry, isRestorable, and retainEntry are not supported.
* All files are can be made "writable"; there is not yet any differentiation here.

# Release Notes

## 1.0.5 (April 30, 2015)
- Renamed plugin to pubilsh to NPM
- Folded in code from filechooser plugin

## 1.0.4 (October 21, 2014)
- Documentation updates.

## 1.0.3 (September 24, 2014)
- Switch to org.chromium.filechooser (lowercase)

## 1.0.1 (April 1, 2014)
- Correctly report error when resolveLocalFileSystemURL fails.


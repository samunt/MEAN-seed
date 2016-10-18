
# chain-async

Helps in executing async operations one after another.

## Installation

This module is installed via npm:

```bash
$ npm install chain-async --save
```

## Usage

### Import 
  ```js
  var chainAsync = require('chain-async');
  ```

### Use 'Series'

  ```js
  // execute series of async functions with callbacks
  chainAsync.series([
      function operation1(callback) {
          // ... your tasks
          callback();
      },
      function operation2(callback) {
          // ... your tasks
          callback();
      },
      function operation3(callback) {
          // ... your tasks
          callback();
      },
  ], function callback(error, response, index) {
      // finally your results are here
  });
  ```
#### Signature of callback function

```
    /**
     * @param error     - be undefined if no error occured otherwise last occured error
     * @param response  - an array of responses from each operation at the same index as of operation's index
     * @param index     - previous executed operation's index
     */
    function callback(error, response, index) {
       
    }
```

### Use 'Parallel'

  ```js
  // execute set of functions with callbacks in parallel and know when all done
  chainAsync.parallel([
      function operation1(callback) {
          // ... your tasks
          callback();
      },
      function operation2(callback) {
          // ... your tasks
          callback();
      },
      function operation3(callback) {
          // ... your tasks
          callback();
      },
  ], function callback(error, response) {
      // finally your results are here
  });
 
  ```

#### Signature of callback function

```
    /**
     * Series operation will be terminated if there is an error.
     * 
     * @param error     - be undefined if no error occured otherwise last occured error
     * @param response  - an array of responses from each operation at the same index as of operation's index
     */
    function callback(error, response) {
        
    }
```

ABOUT
===

## Running the Tests
Do `npm install` to install all of the dependencies, ensure that [MongoDB](http://mongodb.org) is installed, then to run the unit tests run:

```
$ npm test
```

## Contributing
Contributions are very welcome! Just send a pull request. Feel free to contact me or checkout my [Github](https://github.com/rintoj) page.

## Author

**Rinto Jose** (rintoj) 

Follow me:
  [Github](https://github.com/rintoj)
| [Facebook](https://www.facebook.com/rinto.jose)
| [Twitter](https://twitter.com/rintoj)
| [Google+](https://plus.google.com/+RintoJoseMankudy)
| [Youtube](https://youtube.com/+RintoJoseMankudy)

## License
```
The MIT License (MIT)

Copyright (c) 2016 Rinto Jose (rintoj)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
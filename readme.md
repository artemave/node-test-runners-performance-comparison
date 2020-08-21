# Node test runners performance comparison

Not an exhaustive comparison by any means. I was just curious if requiring test files "statically" via `node -r` ([donc](https://github.com/artemave/donc) way) results in better performance than requiring test files inside node process ([mocha](https://github.com/mochajs/mocha) way). Donc seems to be marginally faster, but that could also be due to the fact that it's smaller and/or has less dsl to parse.

Then I threw [jest](https://jestjs.io/) into the mix - just for laughs. And boy is it laughably slow.

Results on my machine:

```
% ./run_tests
Generating tests...done
************* Jest *************
real    0m7.347s
user    0m44.525s
sys     0m3.033s

Jest single test...PASS build/jest/Sails.test.js
real    0m2.464s
user    0m2.674s
sys     0m0.252s

************* Mocha *************
Mocha all tests...
real    0m0.542s
user    0m0.594s
sys     0m0.063s

Mocha single test...
real    0m0.455s
user    0m0.521s
sys     0m0.026s

************* Donc *************
Donc all tests...
real    0m0.473s
user    0m0.471s
sys     0m0.060s

Donc single test...
real    0m0.403s
user    0m0.414s
sys     0m0.041s

************* Node start up time *************
real    0m0.046s
user    0m0.040s
sys     0m0.008s
```

### Method

To generate sizable load, I took the largest Node project I could think of - [Sails](https://sailsjs.com/) - and for each `.js` file in `lib` I generated a dumb test file (in each contending tech) that requires that Sails file.

## Usage

```bash
yarn install
./run_tests
```

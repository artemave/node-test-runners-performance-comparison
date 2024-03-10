# Node test runners performance comparison

Why does this exist? I was experimenting with a test runner that requires test files "statically" (via `node --require`) and wanted to see if this approach improves test start up time. I wanted to compare the aformentioned test runned - [assert-raisins](https://github.com/artemave/assert-raisins) - with [mocha](https://github.com/mochajs/mocha), because mocha (just like any other test runner I looked into) requires test files "dynamically", iterating over glob results.

Once test framework was in place, I added a bunch more popular test runners into the mix.

To generate sizable "import" load, I took a large Node project - [Sails](https://sailsjs.com/) - and for each `.js` file in `lib` I generated a dumb test file (in each contending tech) that requires that Sails file.

Results on my machine (seconds):

| runner | real | user | system |
| ------ | ----:| ----:| ------:|
|Node all tests|1.03|10.57|2.69|
|Node single test|0.20|0.19|0.04|
|Jest all tests|2.83|31.60|4.69|
|Jest single test|0.58|0.61|0.13|
|Mocha all tests|0.33|0.32|0.08|
|Mocha single test|0.28|0.30|0.05|
|Tape all tests|0.32|0.32|0.08|
|Tape single test|0.20|0.21|0.05|
|Vitest all tests|1.26|7.81|2.06|
|Vitest single test|0.90|3.43|1.43|
|Ava all tests|3.32|35.41|5.47|
|Ava single test|0.47|0.50|0.10|
|Uvu all tests|0.26|0.26|0.06|
|Uvu single test|0.15|0.15|0.03|
|Assert-raisins all tests|0.35|0.34|0.09|
|Assert-raisins single test|0.24|0.23|0.05|
|Node start up time|0.01|0.01|0.00|

## Usage

```bash
yarn install
./run_tests
```

This generates `results.md` file with a table of results (see above).

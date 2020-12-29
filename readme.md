# Node test runners performance comparison

Not an exhaustive comparison by any means (although more test runners can be added easily).

Why does this exist? I was experimenting with a test runner that requires test files "statically" (via `node -r`) and wanted to see if this approach improves test start up time. I wanted to compare the aformentioned test runned - [donc](https://github.com/artemave/donc) - with [mocha](https://github.com/mochajs/mocha), because mocha (just like any other test runner I looked into) requires test files "dynamically", iterating over glob results.

To generate sizable load, I took the largest Node project I could think of - [Sails](https://sailsjs.com/) - and for each `.js` file in `lib` I generated a dumb test file (in each contending tech) that requires that Sails file.

Once the "framework" was in place, it was easy to add more test runners. And so in went an [intriguing novelty](https://github.com/featurist/banana-shark), a  [trusty workhorse](https://github.com/substack/tape) and an [unusably slow thing that's nonetheless used by so many](https://jestjs.io/).

Results on my machine (seconds):

| runner | real | user | system |
| ------ | ----:| ----:| ------:|
|Jest all tests|7.29|44.02|2.97|
|Jest single test|2.22|2.53|0.21|
|Mocha all tests|0.58|0.65|0.04|
|Mocha single test|0.43|0.46|0.06|
|Donc all tests|0.45|0.48|0.03|
|Donc single test|0.42|0.42|0.05|
|Tape all tests|0.42|0.47|0.03|
|Tape single test|0.31|0.36|0.01|
|Banana-shark all tests|0.41|0.44|0.03|
|Banana-shark single test|0.27|0.27|0.02|
|Node start up time|0.04|0.04|0.00|

## Usage

```bash
yarn install
./run_tests
```

This generates `results.md` file with a table of results (see above).

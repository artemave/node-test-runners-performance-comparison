# Node test runners performance comparison

Not an exhaustive comparison by any means (although more test runners can be added easily).

Why does this exist? I was experimenting with a test runner that requires test files "statically" (via `node -r`) and wanted to see if this approach improves test start up time. I wanted to compare the aformentioned test runned - [donc](https://github.com/artemave/donc) - with [mocha](https://github.com/mochajs/mocha), because mocha (just like any other test runner I looked into) requires test files "dynamically", iterating over glob results.

To generate sizable load, I took the largest Node project I could think of - [Sails](https://sailsjs.com/) - and for each `.js` file in `lib` I generated a dumb test file (in each contending tech) that requires that Sails file.

Once the "framework" was in place, it was easy to add more test runners. And so in went an [intriguing novelty](https://github.com/featurist/banana-shark), a  [trusty workhorse](https://github.com/substack/tape) and an [unusably slow thing that's nonetheless used by so many](https://jestjs.io/).

Results on my machine (seconds):

| runner | real | user | system |
| ------ | ----:| ----:| ------:|
|Jest all tests|5.31|31.65|2.63|
|Jest single test|1.98|2.21|0.21|
|Mocha all tests|0.47|0.51|0.03|
|Mocha single test|0.36|0.40|0.02|
|Donc all tests|0.41|0.40|0.06|
|Donc single test|0.32|0.33|0.04|
|Tape all tests|0.40|0.43|0.05|
|Tape single test|0.28|0.30|0.02|
|Banana-shark all tests|0.34|0.35|0.04|
|Banana-shark single test|0.22|0.24|0.01|
|Node start up time|0.03|0.02|0.00|

## Usage

```bash
yarn install
./run_tests
```

This generates `results.md` file with a table of results (see above).

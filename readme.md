# Node test runners performance comparison

Not an exhaustive comparison by any means (although more test runners can be added easily).

Why does this exist? I was experimenting with a test runner that requires test files "statically" (via `node -r`) and wanted to see if this approach improves test start up time. I wanted to compare the aformentioned test runned - [donc](https://github.com/artemave/donc) - with [mocha](https://github.com/mochajs/mocha), because mocha (just like any other test runner I looked into) requires test files "dynamically", iterating over glob results.

To generate sizable load, I took the largest Node project I could think of - [Sails](https://sailsjs.com/) - and for each `.js` file in `lib` I generated a dumb test file (in each contending tech) that requires that Sails file.

Once the "framework" was in place, it was easy to add more test runners. And so in went an [intriguing novelty](https://github.com/featurist/banana-shark), a  [trusty workhorse](https://github.com/substack/tape) and an [unusably slow thing that's nonetheless used by so many](https://jestjs.io/).

Results on my Linux machine (seconds):

| runner | real | user | system |
| ------ | ----:| ----:| ------:|
|Jest all tests|5.36|31.77|2.57|
|Jest single test|2.07|2.29|0.24|
|Mocha all tests|0.47|0.52|0.03|
|Mocha single test|0.37|0.41|0.03|
|Uvu all tests|0.44|0.51|0.04|
|Uvu single test|0.25|0.27|0.02|
|Tape all tests|0.42|0.48|0.02|
|Tape single test|0.29|0.31|0.02|
|Donc all tests|0.41|0.41|0.06|
|Donc single test|0.33|0.32|0.05|
|Banana-shark all tests|0.30|0.32|0.02|
|Banana-shark single test|0.24|0.23|0.04|
|Node start up time|0.03|0.03|0.00|

## Usage

```bash
yarn install
./run_tests
```

This generates `results.md` file with a table of results (see above).

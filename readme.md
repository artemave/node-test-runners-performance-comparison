# Node test runners performance comparison

Why does this exist? I was experimenting with a test runner that requires test files "statically" (via `node --require`) and wanted to see if this approach improves test start up time. I wanted to compare the aformentioned test runned - [assert-raisins](https://github.com/artemave/assert-raisins) - with [mocha](https://github.com/mochajs/mocha), because mocha (just like any other test runner I looked into) requires test files "dynamically", iterating over glob results.

Once test framework was in place, I added a bunch more popular test runners into the mix.

To generate sizable "import" load, I took a large Node project - [Sails](https://sailsjs.com/) - and for each `.js` file in `lib` I generated a dumb test file (in each contending tech) that requires that Sails file.

### Results on my machine (seconds)

<p align="center">
  <img width="800" src="./single-test.png"/>
</p>
<p align="center">
  <img width="800" src="./all-tests.png"/>
</p>

### Raw results

| runner | real | user | system | notes |
| ------ | ----:| ----:| ------:| ----- |
|Node all tests|1.05|10.56|2.82||
|Node single test|0.20|0.19|0.05||
|Jest all tests|3.01|33.52|4.99||
|Jest single test|0.59|0.61|0.13||
|Mocha all tests|0.34|0.33|0.08||
|Mocha single test|0.24|0.26|0.04||
|Tape all tests|0.31|0.31|0.08|No concurrency|
|Tape single test|0.20|0.21|0.05||
|Vitest all tests|4.01|33.78|10.45|Default concurrency mode|
|Vitest single test|0.80|3.03|1.27||
|Uvu all tests|0.26|0.25|0.07|No concurrency|
|Uvu single test|0.16|0.16|0.03||
|Ava all tests|3.19|34.37|5.48||
|Ava single test|0.48|0.52|0.09||
|Assert-raisins all tests|0.47|3.32|0.59||
|Assert-raisins single test|0.18|0.19|0.04||

## Usage

```bash
npm install
./run_tests
```

This generates charts and `results.md` file with a table of results (see above).

I use [grip](https://github.com/joeyespo/grip) to preview markdown locally.

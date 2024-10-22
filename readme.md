# Node test runners performance comparison

I have been experimenting with my [own test runner](https://github.com/artemave/assert-raisins), and one of the main ideas was to make it as fast as possible. What better way to assert that than to compare it with other test runners? In the end, I find these benchmarks useful in its own right.

## Methodology

The goal is to establish how much overhead a test runner incurs. There are three facets to that (scenarios):
1. how long it takes to load a single test file
2. how long it takes to load all test files
3. how long it takes to run all test files

To support these, there are two types of tests:
- a blank test that does nothing (used for 1 and 2)
- a test file with some async and CPU load (used for 3)

A set of test files is generated for each test runner and each test type. To generate a set, I take every `.js` file in `./node_modules/sails/lib` ([Sails](https://sailsjs.com/) is just a project with many files in this context). To be more realistic, every test file imports its `lib` counterpart.

Scenarios 1 and 2 contain a "baseline" column, which is just a bare node running the same payload.

> Scenario 3 involves concurrency, so picking the right "baseline" technology is not straightforward and hence remains a TODO.

#### Contenders

- [node built-in test runner](https://nodejs.org/api/test.html)
- [mocha](https://mochajs.org/)
- [jest](https://jestjs.io/)
- [vitest](https://vitest.dev/)
- [tape](https://github.com/tape-testing/tape)
- [ava](https://github.com/avajs/ava)
- [uvu](https://github.com/lukeed/uvu)
- [assert-raisins](https://github.com/artemave/assert-raisins)

### Results on my machine (seconds)

<p align="center">
  <img width="800" src="./singleTestFileImportOnly.png"/>
</p>
<p align="center">
  <img width="800" src="./allTestsFilesImportOnly.png"/>
</p>
<p align="center">
  <img width="800" src="./allTestsFilesWithLoad.png"/>
</p>

#### Notes

- Neither Tape nor Uvu support concurrent testing. You can see how they perform better than others in the first two scenarios but fall behind hopelessly in the third one.

## Usage

```bash
npm install
node ./run_benchmarks.js
```

This generates test sets, runs benchmarks, and generates chart images (sourced in this readme), and also [results.json](./results.json) file with raw results.

I then use [grip](https://github.com/joeyespo/grip) to preview the readme locally.

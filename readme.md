# Node test runners performance comparison

Not an exhaustive comparison by any means (although more test runners can be added easily). I was just curious if requiring test files "statically" via `node -r` ([donc](https://github.com/artemave/donc) way) results in better performance than requiring test files inside node process ([mocha](https://github.com/mochajs/mocha) way). In the end, donc appears to be marginally faster, but not enough to support the claim.

To generate sizable load, I took the largest Node project I could think of - [Sails](https://sailsjs.com/) - and for each `.js` file in `lib` I generated a dumb test file (in each contending tech) that requires that Sails file.

Then I friend of mine reminded me about [banana-shark](https://github.com/featurist/banana-shark) - a really interesting take on testing - so I added it too. Then I added [tape](https://github.com/substack/tape) for good measure. And finally, just for laughs, [jest](https://jestjs.io/). Because boy is it laughably slow.

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

This generates `results.md` file with a table of results.

const node = {
  testTemplates: {
    importOnly: path => `import '${path}'
      import { it } from 'node:test'
      import assert from 'assert'

      it('${path} works', () => {
        assert.ok(true)
      })`,
    withLoad: path => `import '${path}'
      import { randomBytes } from 'crypto'
      import { it } from 'node:test'
      import assert from 'assert'

      it('${path} io wait', async () => {
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 30)
        })
      })

      it('${path} cpu load', () => {
        randomBytes(99999999)
        assert.ok(true)
      })`,
  },
  scenarios: {
    allTestsFilesImportOnly: {
      cmd: 'node --test ./build/node/importOnly/*Test.js'
    },
    singleTestFileImportOnly: {
      cmd: 'node --test ./build/node/importOnly/requestTest.js'
    },
    allTestsFilesWithLoad: {
      cmd: 'node --test ./build/node/withLoad/*Test.js'
    }
  }
}

const deno = {
  testTemplates: {
    importOnly: path => `import '${path}'
      import { assertEquals } from "jsr:@std/assert"

      Deno.test('${path} works', () => {
        assertEquals(2, 2)
      })
    `,
    withLoad: path => `import '${path}'
      import { assertEquals } from "jsr:@std/assert"
      import { randomBytes } from 'node:crypto'

      Deno.test('${path} io wait', async () => {
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 30)
        })
      })

      Deno.test('${path} cpu load', () => {
        randomBytes(99999999)
        assertEquals(2, 2)
      })`,
  },
  scenarios: {
    allTestsFilesImportOnly: {
      cmd: './node_modules/.bin/deno test --parallel --allow-env ./build/deno/importOnly/*Test.js'
    },
    singleTestFileImportOnly: {
      cmd: './node_modules/.bin/deno test ./build/deno/importOnly/requestTest.js'
    },
    allTestsFilesWithLoad: {
      cmd: './node_modules/.bin/deno test --parallel --allow-env ./build/deno/withLoad/*Test.js'
    }
  }
}

const bun = {
  testTemplates: {
    importOnly: path => `import '${path}'
      import { expect, test } from "bun:test"

      test('${path} works', () => {
        expect(2).toBe(2)
      })
    `,
    withLoad: path => `import '${path}'
      import { expect, test } from "bun:test"
      import { randomBytes } from 'crypto'

      test('${path} io wait', async () => {
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 30)
        })
      })

      test('${path} cpu load', () => {
        randomBytes(99999999)
        expect(2).toBe(2)
      })`,
  },
  scenarios: {
    allTestsFilesImportOnly: {
      cmd: './node_modules/.bin/bun test ./build/bun/importOnly/*Test.js'
    },
    singleTestFileImportOnly: {
      cmd: './node_modules/.bin/bun test ./build/bun/importOnly/requestTest.js'
    },
    allTestsFilesWithLoad: {
      cmd: './node_modules/.bin/bun test ./build/bun/withLoad/*Test.js'
    }
  }
}

const ars = {
  testTemplates: {
    importOnly: path => `import '${path}'
      import { test } from 'assert-raisins'
      import assert from 'assert'

      test('${path} works', () => {
        assert.ok(true)
      })`,
    withLoad: path => `import '${path}'
      import { test } from 'assert-raisins'
      import { randomBytes } from 'crypto'
      import assert from 'assert'

      test('${path} io wait', async () => {
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 30)
        })
      })

      test('${path} cpu load', () => {
        randomBytes(99999999)
        assert.ok(true)
      })`,
  },
  scenarios: {
    allTestsFilesImportOnly: {
      cmd: './node_modules/.bin/ars build/assert-raisins/importOnly/*Test.js'
    },
    singleTestFileImportOnly: {
      cmd: './node_modules/.bin/ars build/assert-raisins/importOnly/requestTest.js'
    },
    allTestsFilesWithLoad: {
      cmd: './node_modules/.bin/ars build/assert-raisins/withLoad/*Test.js'
    }
  }
}

const jestCjs = {
  cjs: true,
  testTemplates: {
    importOnly: path => `require('${path}')

      test('${path} works', () => {
        expect(1).toBe(1)
      })`,
    withLoad: path => `require('${path}')
      const { randomBytes } = require('crypto')

      test('${path} io wait', async () => {
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 30)
        })
        expect(1).toBe(1)
      })

      test('${path} cpu load', () => {
        randomBytes(99999999)
        expect(1).toBe(1)
      })`,
  },
  scenarios: {
    allTestsFilesImportOnly: {
      cmd: 'node node_modules/jest/bin/jest.js --testRegex "build/jest/importOnly"',
    },
    singleTestFileImportOnly: {
      cmd: 'node node_modules/jest/bin/jest.js --testRegex "build/jest/importOnly/requestTest.cjs"',
    },
    allTestsFilesWithLoad: {
      cmd: 'node node_modules/jest/bin/jest.js --testRegex "build/jest/withLoad"',
    }
  }
}

const jestEsm = {
  testTemplates: {
    importOnly: path => `import '${path}'
      test('${path} works', () => {
        expect(1).toBe(1)
      })`,
    withLoad: path => `import '${path}'
      import { randomBytes } from 'crypto'
      test('${path} io wait', async () => {
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 30)
        })
        expect(1).toBe(1)
      })

      test('${path} cpu load', () => {
        randomBytes(99999999)
        expect(1).toBe(1)
      })`,
  },
  scenarios: {
    allTestsFilesImportOnly: {
      cmd: 'node --experimental-vm-modules node_modules/jest/bin/jest.js --config=jestEsm.config.cjs --testRegex "build/jest__esm_/importOnly"'
    },
    singleTestFileImportOnly: {
      cmd: 'node --experimental-vm-modules node_modules/jest/bin/jest.js --config=jestEsm.config.cjs --testRegex "build/jest__esm_/importOnly/requestTest.js"'
    },
    allTestsFilesWithLoad: {
      cmd: 'node --experimental-vm-modules node_modules/jest/bin/jest.js --config=jestEsm.config.cjs --testRegex "build/jest__esm_/withLoad"'
    }
  }
}

const mocha = {
  testTemplates: {
    importOnly: path => `import '${path}'
      import assert from 'assert'

      describe('${path} works', function() {
        it('works', function() {
          assert.ok(true)
        })
      })`,
    withLoad: path => `import '${path}'
      import assert from 'assert'
      import { randomBytes } from 'crypto'

      describe('${path} works', function() {
        it('${path} io wait', async () => {
          await new Promise((resolve, reject) => {
            setTimeout(resolve, 30)
          })
          assert.ok(true)
        })

        it('${path} cpu load', () => {
          randomBytes(99999999)
          assert.ok(true)
        })
      })`,
  },
  scenarios: {
    allTestsFilesImportOnly: {
      cmd: './node_modules/.bin/mocha --parallel ./build/mocha/importOnly/*Test.js'
    },
    singleTestFileImportOnly: {
      cmd: './node_modules/.bin/mocha ./build/mocha/importOnly/requestTest.js'
    },
    allTestsFilesWithLoad: {
      cmd: './node_modules/.bin/mocha --parallel ./build/mocha/withLoad/*Test.js'
    }
  }
}

const tape = {
  testTemplates: {
    importOnly: path => `import '${path}'
      import test from 'tape'

      test('${path} works', function (t) {
        t.plan(1);
        t.equal(1, 1);
      })`,
    withLoad: path => `import '${path}'
      import test from 'tape'
      import { randomBytes } from 'crypto'

      test('${path} io wait', async function(t) {
        t.plan(1)
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 30)
        })
        t.equal(1, 1);
      })

      test('${path} cpu load', (t) => {
        t.plan(1)
        randomBytes(99999999)
        t.equal(1, 1);
      })`,
  },
  scenarios: {
    allTestsFilesImportOnly: {
      cmd: './node_modules/.bin/tape ./build/tape/importOnly/*Test.js',
      notes: 'No concurrency',
    },
    singleTestFileImportOnly: {
      cmd: './node_modules/.bin/tape ./build/tape/importOnly/requestTest.js'
    },
    allTestsFilesWithLoad: {
      cmd: './node_modules/.bin/tape ./build/tape/withLoad/*Test.js',
      notes: 'No concurrency',
    }
  }
}

const ava = {
  testTemplates: {
    importOnly: path => `import '${path}'
      import test from 'ava'

      test('${path} works', t => {
        t.pass()
      })`,
    withLoad: path => `import '${path}'
      import test from 'ava'
      import { randomBytes } from 'crypto'

      test('${path} io wait', async t => {
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 30)
        })
        t.pass()
      })

      test('${path} cpu load', (t) => {
        randomBytes(99999999)
        t.pass()
      })`,
  },
  scenarios: {
    allTestsFilesImportOnly: {
      cmd: './node_modules/.bin/ava ./build/ava/importOnly/*Test.js',
    },
    singleTestFileImportOnly: {
      cmd: './node_modules/.bin/ava ./build/ava/importOnly/requestTest.js'
    },
    allTestsFilesWithLoad: {
      cmd: './node_modules/.bin/ava ./build/ava/withLoad/*Test.js',
    }
  }
}

const vitest = {
  testTemplates: {
    importOnly: path => `import '${path}'
      import { test, expect } from 'vitest'

      test('${path} works', () => {
        expect(1).toBe(1)
      })`,
    withLoad: path => `import '${path}'
      import { test, expect } from 'vitest'
      import { randomBytes } from 'crypto'

      test('${path} io wait', async () => {
        await new Promise((resolve, reject) => {
          setTimeout(resolve, 30)
        })
        expect(1).toBe(1)
      })

      test('${path} cpu load', () => {
        randomBytes(99999999)
        expect(1).toBe(1)
      })`,
  },
  scenarios: {
    allTestsFilesImportOnly: {
      cmd: './node_modules/.bin/vitest build/vitest/importOnly',
    },
    singleTestFileImportOnly: {
      cmd: './node_modules/.bin/vitest build/vitest/importOnly/requestTest.js'
    },
    allTestsFilesWithLoad: {
      cmd: './node_modules/.bin/vitest build/vitest/withLoad',
    }
  }
}

const vitestNoIsolation = {
  testTemplates: vitest.testTemplates,
  scenarios: {
    allTestsFilesImportOnly: {
      cmd: './node_modules/.bin/vitest --no-isolate build/vitest/importOnly',
      notes: 'Faster concurrency option (non-default)'
    },
    singleTestFileImportOnly: {
      cmd: './node_modules/.bin/vitest --no-isolate build/vitest/importOnly/requestTest.js'
    },
    allTestsFilesWithLoad: {
      cmd: './node_modules/.bin/vitest --no-isolate build/vitest/withLoad',
      notes: 'Faster concurrency option (non-default)'
    }
  }
}

const baseline = {
  testTemplates: {
    importOnly: path => `import '${path}'`,
  },
  scenarios: {
    allTestsFilesImportOnly: {
      cmd: `node -e "import('fast-glob').then(({ default: fg }) => Promise.all(fg.sync('./build/baseline/importOnly/*Test.js').map(p => import(p))))"`
    },
    singleTestFileImportOnly: {
      cmd: 'node ./build/baseline/importOnly/requestTest.js'
    },
    allTestsFilesWithLoad: false
  }
}

export const definitions = {
  baseline,
  'node-builtin': node,
  mocha,
  vitest,
  'vitest (no isolate)': vitestNoIsolation,
  'jest (esm)': jestEsm,
  jest: jestCjs,
  tape,
  // ava,
  bun,
  deno,
  'assert-raisins': ars
}

export const scenarioLabels = {
  allTestsFilesImportOnly: 'Load all test files',
  singleTestFileImportOnly: 'Load single test file',
  allTestsFilesWithLoad: 'Run all test files'
}

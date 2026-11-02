import {runTests} from './runner.js';
import './runner.test.js';
import './projects.test.js';
import './timeline.test.js';
import './filter.test.js';

runTests(document.getElementById('test-output'));
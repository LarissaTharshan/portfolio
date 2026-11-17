import {runTests} from './runner.js';
import './runner.test.js';
import './projects.test.js';
import './timeline.test.js';
import './filter.test.js';
import './i18n.test.js';
import './i18n-dom.test.js';
import './storage.test.js';

runTests(document.getElementById('test-output'));
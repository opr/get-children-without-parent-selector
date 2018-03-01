'use strict';

import chai from 'chai';
import {JSDOM} from 'jsdom';
import getChildrenWithoutParentSelector from '../src/index';

const document = new JSDOM(
    '<!doctype html>' +
    '<html>' +
    '<body>' +
    '<div class="foo" id="alpha">' +
    '' +
    '  <div class="foo_bar" id="beta">' +
    '    <div class="foo" id="gamma">' +
    '      <div class="foo_bar" id="delta"></div>' +
    '    </div>' +
    '    <div class="qux">' +
    '      <div class="foo_bar" id="epsilon"></div>' +
    '    </div>' +
    '  </div>' +
    '' +
    '  <div>' +
    '    <div class="foo_bar" id="zeta"></div>' +
    '  </div>' +
    '</div>' +
    '</body>' +
    '</html>'
);
/*
 global.document = doc;
 global.window = doc.defaultView;

 Object.keys(window).forEach(key => {
 if (!(key in global)) {
 global[key] = window[key];
 }
 });*/

chai.should();

describe('getChildrenWithoutParentSelector', () => {
    it('Gets descendant elements of parent that have the supplied class, with no excluder selector supplied', () => {
        const parent = document.window.document.getElementById('alpha');
        getChildrenWithoutParentSelector(parent, '.foo').length.should.equal(1);
        getChildrenWithoutParentSelector(parent, '.foo_bar').length.should.equal(4);
    });

    it('Gets descendant elements of parent but not those whose parent has the supplied class', () => {
        const parent = document.window.document.getElementById('alpha');
        const result = getChildrenWithoutParentSelector(parent, '.foo_bar', '.foo');
        result.length.should.equal(3);
        for(const c of result) {
            ['zeta', 'epsilon', 'beta'].should.contain(c.id);
        }

        const secondParent = document.window.document.getElementById('gamma');
        const secondResult = getChildrenWithoutParentSelector(secondParent, '.foo_bar', '.foo');
        secondResult.length.should.equal(1);
        secondResult[0].id.should.equal('delta');
    });
});
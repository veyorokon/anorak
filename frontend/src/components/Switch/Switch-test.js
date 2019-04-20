/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Switch from '../Switch';
import { shallow } from 'enzyme';
import { componentsX } from '../../internal/FeatureFlags';

describe('Switch', () => {
  describe('component rendering', () => {
    const buttonWrapper = shallow(
      <Switch kind="button" icon={<svg />} text="test" />
    );
    const linkWrapper = shallow(
      <Switch kind="anchor" icon={<svg className="testClass" />} text="test" />
    );

    it('should render a button when kind is button', () => {
      expect(buttonWrapper.is('button')).toEqual(true);
    });

    it('should render a link when kind is link', () => {
      if (!componentsX) {
        expect(linkWrapper.is('a')).toEqual(true);
      }
    });

    it('should have the expected text', () => {
      expect(buttonWrapper.text()).toEqual('test');
      if (!componentsX) {
        expect(linkWrapper.text()).toEqual('test');
      }
    });
    it('should have the expected icon', () => {
      if (!componentsX) {
        expect(buttonWrapper.find('svg').length).toEqual(1);
        expect(linkWrapper.find('svg').length).toEqual(1);
      }
    });

    it('icon should have the expected class', () => {
      if (!componentsX) {
        const cls = 'bx--content-switcher__icon';
        expect(buttonWrapper.find('svg').hasClass(cls)).toEqual(true);
        expect(linkWrapper.find('svg').hasClass(cls)).toEqual(true);
        expect(linkWrapper.find('svg').hasClass('testClass')).toEqual(true);
      }
    });
    it('should have the expected class', () => {
      const cls = 'bx--content-switcher-btn';

      expect(buttonWrapper.hasClass(cls)).toEqual(true);
      if (!componentsX) {
        expect(linkWrapper.hasClass(cls)).toEqual(true);
      }
    });

    it('should not have selected class', () => {
      const selectedClass = 'bx--content-switcher--selected';

      expect(buttonWrapper.hasClass(selectedClass)).toEqual(false);
      if (!componentsX) {
        expect(linkWrapper.hasClass(selectedClass)).toEqual(false);
      }
    });

    it('should have a selected class when selected is set to true', () => {
      const selected = true;

      buttonWrapper.setProps({ selected });
      if (!componentsX) {
        linkWrapper.setProps({ selected });
      }

      expect(buttonWrapper.hasClass('bx--content-switcher--selected')).toEqual(
        true
      );
      if (!componentsX) {
        expect(linkWrapper.hasClass('bx--content-switcher--selected')).toEqual(
          true
        );
      }
    });
  });

  describe('events', () => {
    const buttonOnClick = jest.fn();
    const linkOnClick = jest.fn();
    const buttonOnKey = jest.fn();
    const linkOnKey = jest.fn();
    const index = 1;
    const name = 'first';
    const text = 'test';
    const spaceKey = 32;
    const enterKey = 13;

    const buttonWrapper = shallow(
      <Switch
        index={index}
        name={name}
        kind="button"
        onClick={buttonOnClick}
        onKeyDown={buttonOnKey}
        text={text}
      />
    );

    const linkWrapper = shallow(
      <Switch
        index={index}
        name={name}
        kind="anchor"
        onClick={linkOnClick}
        onKeyDown={linkOnKey}
        text={text}
      />
    );

    it('should invoke button onClick handler', () => {
      buttonWrapper.simulate('click', { preventDefault() {} });
      expect(buttonOnClick).toBeCalledWith({ index, name, text });
    });

    it('should invoke link onClick handler', () => {
      linkWrapper.simulate('click', { preventDefault() {} });
      expect(buttonOnClick).toBeCalledWith({ index, name, text });
    });
    it('should invoke button onKeyDown handler', () => {
      buttonWrapper.simulate('keydown', { which: spaceKey });
      expect(buttonOnKey).toBeCalledWith({ index, name, text });
      buttonWrapper.simulate('keydown', { which: enterKey });
      expect(buttonOnKey).toBeCalledWith({ index, name, text });
    });

    it('should invoke link onKeyDown handler', () => {
      linkWrapper.simulate('keydown', { which: spaceKey });
      expect(linkOnKey).toBeCalledWith({ index, name, text });
      linkWrapper.simulate('keydown', { which: enterKey });
      expect(linkOnKey).toBeCalledWith({ index, name, text });
    });
  });
});

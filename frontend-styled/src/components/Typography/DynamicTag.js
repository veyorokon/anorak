import { createElement } from "react";
import styled from "styled-components";

export const withDynamicTag = Component => {
  const bucket = Object.create(null);

  const DynamicTag = props => {
    const { variant } = props;

    if (typeof variant !== "string" || !styled.hasOwnProperty(variant)) {
      return createElement(Component, props);
    }

    if (bucket[variant] === undefined) {
      bucket[variant] = Component.withComponent(variant);
    }

    return createElement(bucket[variant], props);
  };

  const name = Component.displayName || Component.constructor.name;

  if (name) {
    DynamicTag.displayName = `DynamicTag(${name})`;
  }

  return DynamicTag;
};

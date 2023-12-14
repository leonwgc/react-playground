/* eslint-disable react/prop-types */
import React from 'react';
import SkeletonLoading from 'alcedo-ui/SkeletonLoading';
import { styled } from 'react-uni-comps';

const StyledSkeletonLoading = styled(SkeletonLoading)`
  height: 12px;
  width: ${(props) => props.width || '100%'};

  &:not(:first-of-type) {
    margin-top: 8px;
  }
`;

const defaultBlocks = ['80%', '60%', '30%', '10%'];

/**
 * ContentLoadingSkeleton
 * @param {*} param0
 * @returns
 */
export default function ContentLoadingSkeleton({ blocks = defaultBlocks }) {
  return (
    <>
      {blocks.map((width, i) => (
        <StyledSkeletonLoading width={width} key={i} />
      ))}
    </>
  );
}

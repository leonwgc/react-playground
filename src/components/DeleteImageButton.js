/* eslint-disable react/prop-types */
import * as React from 'react';
import { styled } from 'react-uni-comps';
import delIcon from './icons/delete.png';

const StyledWrapper = styled.div`
  display: inline-flex;
  cursor: pointer;
  padding: 4px 12px 6px 12px;
  &:hover {
    background-color: #ebfaff;
  }
  &:active {
    background-color: #f2f7fa;
  }
  .pic {
    width: 16px;
    height: 16px;
    margin-right: 4px;
    display: inline-block;
    background: url(${delIcon}) center/100% no-repeat;
  }
  .text {
    font-size: 12px;
    font-weight: 600;
    color: #06789d;
    line-height: 18px;
  }
`;

const DeleteImageButton = (props) => {
  return (
    <StyledWrapper {...props}>
      <div className="pic"></div>
      <div className="text">Delete</div>
    </StyledWrapper>
  );
};

DeleteImageButton.displayName = 'DS-DeleteImageButton';

export default DeleteImageButton;

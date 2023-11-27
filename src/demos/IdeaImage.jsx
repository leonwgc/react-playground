import React, { useRef, useState } from 'react';
import { FileInputTrigger, Button, Space, styled, IconArrow, clsx } from 'react-uni-comps';
import { IconClose } from '../components/IconTextAreaInput';

const StyledImageWrap = styled.div`
  position: relative;
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 8px;
  background-color: #fff;
  width: 284px;

  &:hover {
    background: #ebfaff;
  }
  &:active {
    background: #e6edf1;
  }

  &.disabled,
  &.maxSelected {
    pointer-events: none;
    background-color: #f4f4f4;
    cursor: not-allowed;
    color: #ccc;

    .title,
    .type {
      color: #ccc !important;
    }
  }
  &.selected {
    background-color: #06789d;

    border-color: #06789d;

    &:hover {
      background-color: #004771;
      border-color: #004771;
    }

    .title,
    .type {
      color: #fff !important;
    }
  }

  .b1 {
    width: 4px;
    height: 54px;
    background-color: #ddd;
  }

  .b2 {
    width: 3px;
    height: 48px;
    background-color: #eee;
  }
  .text {
    display: block;
    font-size: 12px;
    color: #333;
    margin-left: 8px;

    div:first-of-type {
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 600;
    }
  }

  .remove {
    position: absolute;
    right: 6px;
    top: 6px;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }
`;

const MyImage = ({
  title,
  selected,
  maxSelected,
  onClick,
  disabled,
  titleColor = '#333',
  type,
  onRemove
}) => {
  let width = 62,
    height = 62;
  let textWidth = 120;
  switch (type) {
    case 'Landscape': {
      width = 101;
      height = 62;
      break;
    }
    case 'Square': {
      width = 62;
      height = 62;
      textWidth = 170;
      break;
    }
    case 'Portrait': {
      width = 46;
      height = 62;
      textWidth = 190;
      break;
    }
    default:
      break;
  }

  const styles = disabled ? { filter: 'grayscale(100%)' } : {};

  return (
    <StyledImageWrap
      onClick={disabled ? null : onClick}
      className={clsx('image-item', {
        selected,
        disabled,
        maxSelected: maxSelected && !selected
      })}
    >
      <img
        style={styles}
        width={width}
        height={height}
        src="https://cdn.i-scmp.com/sites/default/files/styles/1200x800/public/d8/images/canvas/2023/05/29/5d5a593d-d9b2-4cb6-86ba-349342a8364f_44459f1b.jpg"
      />
      <div className="b1" />
      <div className="b2" />
      <div className="text">
        <div className="title" style={{ maxWidth: textWidth, color: titleColor }}>
          {title}
        </div>
        <div className="type">{type}</div>
      </div>
      {typeof onRemove === 'function' && <IconClose className="remove" />}
    </StyledImageWrap>
  );
};

export default function App() {
  return (
    <Space>
      <MyImage type="Landscape" title="Swimming pool" selected titleColor="#06789D" />
      <MyImage type="Square" title="Room" disabled />
      <MyImage type="Portrait" title="hello,world" onRemove={() => console.log('removed')} />
    </Space>
  );
}

import { styled } from 'react-uni-comps';

/**
 * StyledImageBlock
 */
export const StyledImageBlock = styled.div`
  border: 1px solid #e1e1e1;
  border-radius: 4px;
  padding: 8px;
  display: flex;

  &:not(:first-of-type) {
    margin-top: 12px;
  }

  .img-box {
    position: relative;
    width: 101px;
    height: 62px;
    background-color: #eeeeee;
    text-align: center;
    display: inline-block;
    margin-right: 12px;
  }
  .ratio-info {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #333;
    .title {
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 4px;
    }
  }
`;

/**
 * StyledDropArea
 */
export const StyledDropArea = styled.div`
  height: 302px;
  border: 2px dashed #ddd;
  text-align: center;
  user-select: none;
  background-color: #f4f4f4;

  &.highlight {
    background-color: #ebfaff;
    border-color: #b4d7e2;
  }

  &.hasPic {
    border: none;
    cursor: no-drop;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  .change-image-trigger {
    color: #06789d;
    font-weight: 600;
    line-height: 18px;
    font-size: 12px;
  }

  .image-info {
    margin-top: 16px;
    margin-bottom: 32px;
    text-align: left;
    font-size: 14px;
    line-height: 21px;
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

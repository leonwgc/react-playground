/* eslint-disable react/prop-types */
import classNames from 'classnames';
import React from 'react';
import { styled } from 'react-uni-comps';

const StyledIcon = styled.span`
  display: inline-flex;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

const SVGProps = {
  width: '1em',
  height: '1em',
  fill: 'currentColor'
};

/**
 * IconStar
 * @param {*} param0
 * @returns
 */
export default function IconClose({ className, ...rest }) {
  return (
    <StyledIcon {...rest} className={classNames('ds-icon', className)}>
      <svg {...SVGProps} viewBox="0 0 14 14">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14ZM4.35128 4.35087C4.57095 4.1312 4.9271 4.1312 5.14677 4.35087L7.00293 6.20703L8.85908 4.35087C9.07875 4.1312 9.43491 4.1312 9.65458 4.35087C9.87425 4.57054 9.87425 4.9267 9.65458 5.14637L7.79842 7.00252L9.65458 8.85868C9.87425 9.07835 9.87425 9.4345 9.65458 9.65417C9.43491 9.87384 9.07875 9.87384 8.85908 9.65417L7.00293 7.79802L5.14677 9.65417C4.9271 9.87384 4.57095 9.87384 4.35128 9.65417C4.13161 9.4345 4.13161 9.07835 4.35128 8.85868L6.20743 7.00252L4.35128 5.14637C4.13161 4.9267 4.13161 4.57054 4.35128 4.35087Z"
          fill="#999999"
        />
      </svg>
    </StyledIcon>
  );
}

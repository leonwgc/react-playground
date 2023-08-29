import React, { Component } from 'react';

// Components
import TipProvider from 'alcedo-ui/TipProvider';

import { clsx, Icon } from 'react-uni-comps';

class HelpTip extends Component {
  static Theme = TipProvider.Theme;
  static Position = TipProvider.Position;

  constructor(props) {
    super(props);
  }

  render() {
    const { theme, className, style, iconClassName, iconStyle, position, iconCls, text } =
      this.props;

    return (
      <TipProvider
        className={clsx('help-tip', {
          [className]: className
        })}
        style={style}
        theme={theme}
        position={position}
        tipContent={text}
      >
        {/* <i
          className={clsx('help-tip-icon', {
            [iconCls]: iconCls,
            [iconClassName]: iconClassName
          })}
          style={iconStyle}
        /> */}
        <Icon type="uc-icon-xinxi" />
      </TipProvider>
    );
  }
}

export default HelpTip;

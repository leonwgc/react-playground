import React, { Component } from 'react';

// Components
import MaterialDropdown from 'alcedo-ui/MaterialDropdown';

import { clsx, Icon } from 'react-uni-comps';

export default function App() {
  return (
    <MaterialDropdown
      theme={MaterialDropdown.Theme.HIGHLIGHT}
      label=""
      triggerValue="Material Dropdown"
      tip="MaterialDropdown Example"
    >
      <div className="dropdown-content">MaterialDropdown content</div>
    </MaterialDropdown>
  );
}

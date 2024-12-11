import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, configureStore } from './redux';
import App from './App';
import { Icon } from 'react-uni-comps';
import { ConfigProvider, App as AntdApp } from 'antd';
import enUS from 'antd/locale/en_US';

const store = configureStore({ app: 'alcedo-demos' }, true);

// https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=3867090
Icon.loadFromIconfontCN('//at.alicdn.com/t/c/font_3867090_j3h1a9i9bpe.js');

ReactDOM.render(
  <ConfigProvider locale={enUS}>
    <Provider store={store}>
      <AntdApp rootClassName="antd-app-root">
        <App />
      </AntdApp>
    </Provider>
  </ConfigProvider>,
  document.querySelector('#root')
);

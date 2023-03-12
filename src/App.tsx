import React, {Suspense} from 'react';
import {ThemeProvider, styled} from 'react-uni-comps';
import {HashRouter, Route, Switch} from 'react-router-dom';
import routes from './Route';
import Widget from 'alcedo-ui/Widget';
import WidgetHeader from 'alcedo-ui/WidgetHeader';
import IconButton from 'alcedo-ui/IconButton';

import './assets/fa/fa.css';

import './App.scss';

const StyledWrapper = styled.div`
    .widget-content {
        padding: 20px;
    }
`;

export default function App() {
    return (
        <ThemeProvider color={'#005cff'}>
            <HashRouter>
                <Suspense fallback={null}>
                    <StyledWrapper>
                        <Widget>
                            <WidgetHeader title="Alcedo UI DEMOS">
                                <IconButton iconCls="far fa-thumbs-up" />
                                <IconButton iconCls="fas fa-trash-alt" />
                            </WidgetHeader>

                            <div className="widget-content">
                                <Switch>
                                    {routes.map((route, idx) => (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            component={route.component}
                                        />
                                    ))}
                                    <Route
                                        render={() => <div>demo not found</div>}
                                    />
                                </Switch>
                            </div>
                        </Widget>
                    </StyledWrapper>
                </Suspense>
            </HashRouter>
        </ThemeProvider>
    );
}

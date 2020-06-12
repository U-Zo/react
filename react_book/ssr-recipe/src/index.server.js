import React from "react";
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import {StaticRouter} from 'react-router-dom';
import App from './App';
import path from 'path';
import fs from 'fs';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer, {rootSaga} from './modules';
import PreloadContext from './lib/PreloadContext';
import {END} from 'redux-saga';
import {ChunkExtractor, ChunkExtractorManager} from '@loadable/server';

const statsFile = path.resolve('./build/loadable-stats.json');

function createPage(root, tags) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8"/>
            <link rel="shortcut icon" href="/favicon.ico"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="theme-color" content="#000000"/>
            <title>React App</title>
            ${tags.styles}
            ${tags.links}
        </head>
        <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root">
                ${root}
            </div>
            ${tags.scripts}
        </body>
        </html>
    `;
}

const app = express();

// 서버 사이드 렌더링을 처리할 핸들러 함수
const serverRender = async (req, res, next) => {
    // 이 함수는 404가 떠야 하는 상황에 404를 띄우지 않고 서버 사이드 렌더링을 해 줌
    const context = {};
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(rootReducer, applyMiddleware(thunk, sagaMiddleware));
    const sagaPromise = sagaMiddleware.run(rootSaga).toPromise();
    const preloadContext = {
        done: false,
        promises: []
    };

    // 필요한 파일을 추출하기 위한 ChunkExtractor
    const extractor = new ChunkExtractor({statsFile});

    const jsx = (
        <ChunkExtractorManager extractor={extractor}>
            <PreloadContext.Provider value={preloadContext}>
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <App/>
                    </StaticRouter>
                </Provider>
            </PreloadContext.Provider>
        </ChunkExtractorManager>
    );

    ReactDOMServer.renderToStaticMarkup(jsx); // renderToStaticMarkup 으로 한 번 렌더링
    store.dispatch(END);

    try {
        await sagaPromise; // 기존에 진행 중이던 saga 들이 모두 끝날 때까지 기다림
        await Promise.all(preloadContext.promises); // 모든 프로미스를 기다림
    } catch (e) {
        return res.status(500);
    }

    preloadContext.done = true;
    const root = ReactDOMServer.renderToString(jsx); // 렌더링을 하고

    // JSON 을 문자열로 반환하고 악성스크립트가 실행되는 것을 방지하기위 < 를 치환 처리
    // https://redux.js.org/recipes/server-rendering#security-considerations
    const stateString = JSON.stringify(store.getState()).replace(/</g, '\\u003c');
    const stateScript = `<script>__PRELOADED_STATE__ = ${stateString}</script>`; // 리덕스 초기 상태를 스크립트로 주입

    // 미리 불러와야 하는 스타일/스크립트 추출
    const tags = {
        scripts: stateScript + extractor.getScriptTags(), // 스크립트 앞부분에 리덕스 상태 넣기
        links: extractor.getLinkTags(),
        styles: extractor.getStyleTags()
    };

    res.send(createPage(root, tags)); // 클라이언트에게 결과물 응답
};

const serve = express.static(path.resolve('./build'), {
    index: false // "/" 경로에서 index.html을 보여 주지 않도록 설정
});

app.use(serve); // 순서 중요! serverRender 전에 위치해야 함
app.use(serverRender);

// 5000 포트로 서버 가동
app.listen(5000, () => {
    console.log('Running on http://localhost:5000');
});
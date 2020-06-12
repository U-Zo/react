import React from 'react';
import Responsive from '../components/common/Responsive';
import EditorContainer from '../containers/write/EditorContainer';
import TagBoxContainer from '../containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '../containers/write/WriteActionButtonsContainer';
import HeaderContainer from '../containers/common/HeaderContainer';

const WritePage = () => {
    return (
        <>
            <HeaderContainer/>
            <Responsive>
                <EditorContainer/>
                <TagBoxContainer/>
                <WriteActionButtonsContainer/>
            </Responsive>
        </>
    );
};

export default WritePage;
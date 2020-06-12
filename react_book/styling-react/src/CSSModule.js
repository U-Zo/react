import React from "react";
import classNames from 'classnames/bind';
import styles from './styles/CSSModule.module.scss';

const cx = classNames.bind(styles);

const CSSModules = () => {
    return (
        <div className={cx('wrapper', 'inverted')}>
            안녕하세요, 저는 <span className="something">CSS Module입니다.</span>
        </div>
    );
};

export default CSSModules;
import React from "react";
import styles from "./Viewer.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Viewer = ({ mediaType, url, loading }) => {
    return (
        <div className={cx('viewer')}>
            {
                mediaType === 'image' ? (
                    <img onClick={() => window.open(url)} src={url} alt="space"/>
                ) : (
                    <iframe title="space-video" src={url} frameBorder="0" gesture="media" allow="encrypted-media" allowFullScreen/>
                )
            }
        </div>
    );
};

export default Viewer;
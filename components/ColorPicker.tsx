import React, { useState } from 'react';
import cx from 'classnames';
import { COLORS, primaries } from '../constants/colors';


export const ColorPicker = (props: { editorState: { getCurrentInlineStyle: () => any; }; toggleColor: (color: string) => void; }) => {

    var currentStyle = props.editorState.getCurrentInlineStyle();

    return (
        <div className="color-picker">
            <div className="color-wrapper primary-wrapper">
                {COLORS.map((c, i) => {
                    const classNames = cx('swatch', 'primary', {
                        // selected: i === selectedIndex
                        selected: currentStyle.has(c.style)
                    });
                    return (
                        <div
                            key={i}
                            className={classNames}
                            style={{ backgroundColor: c.shade }}
                            onClick={() => props.toggleColor(c.style)}
                        />
                    );
                })}
            </div>

        </div>
    );

}

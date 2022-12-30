import classNames from 'classnames/bind';
import { ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '~/assets/css/common.css';
import styles from './EditorField.module.scss';

import htmlToDraft from 'html-to-draftjs';

const cx = classNames.bind(styles);

EditorField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

function EditorField(props) {
    const { field, form, label, placeholder, disabled, required, stateChange } = props;
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    const contentBlock = htmlToDraft(value);

    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    let editorState = EditorState.createWithContent(contentState);
    const [description, setDescription] = useState(editorState);

    useEffect(() => {
        setDescription(editorState);
    },[value===''])

    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    };

    const handleOnChange = (e) => {
        const htmls = draftToHtml(e);
        const changeEvent = {
            target: {
                name: name,
                value: htmls,
            },
        };
        stateChange && stateChange(htmls);
        field.onChange(changeEvent);
    };

    return (
        <div className={cx('wrap')}>
            {label && (
                <label>
                    {required && <span>✻</span>}
                    {label}
                </label>
            )}
            <Editor
                disabled={disabled}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                editorState={description}
                onChange={handleOnChange}
                onEditorStateChange={onEditorStateChange}
                placeholder={placeholder}
                localization={{
                    locale: 'en',
                }}
            />
            {showError && <p className={cx('validate__error')}>{errors[name]}</p>}
        </div>
    );
}

export default EditorField;

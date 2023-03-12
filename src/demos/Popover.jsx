import React, {useRef, useState} from 'react';
import {Button, styled} from 'react-uni-comps';
import {useUpdateStore, useAppData} from 'simple-redux-store';
import Accordion from 'alcedo-ui/Accordion';
import Popover from 'alcedo-ui/Popover';
import TextArea from 'alcedo-ui/TextArea';

const StyledTrigger = styled.div`
    width: 300px;
    height: 200px;

    .text-input-el {
        height: 200px;
        width: 300px;
    }
`;

export default function App() {
    const updateStore = useUpdateStore();
    const {list = [1, 2, 3]} = useAppData();

    const [v, setV] = useState(false);

    const ref = useRef();
    const textAreaRefWrap = useRef();
    const textAreaRef = useRef();

    const [value, setValue] = useState('');

    const onTextChange = value => {
        setValue(value);
        if (value) {
            const len = value.length;
            if (value[len - 1] === '{') {
                setV(true);
                return;
            }
        }
        setV(false);
    };

    return (
        <div>
            <StyledTrigger ref={textAreaRefWrap}>
                <TextArea
                    autoHeight
                    value={value}
                    triggerClassName="text-input-el"
                    onChange={onTextChange}
                    ref={textAreaRef}
                />
            </StyledTrigger>

            <Popover
                hasTriangle={false}
                theme={Popover.Theme.PRIMARY}
                visible={v}
                triggerEl={textAreaRefWrap.current}
                onRequestClose={() => setV(false)}
                position={Popover.Position.RIGHT}
                resetPositionWait={0}
                style={{marginLeft: '-100px'}}
            >
                <Accordion
                    title="Title"
                    className="accordion-examples"
                    ref={ref}
                >
                    <div className="accordion-examples-content">
                        {list.map(item => (
                            <div
                                style={{padding: '6px 0'}}
                                onClick={() => {
                                    const v = value + 'list' + item + '}';
                                    setValue(v);
                                    setV(false);

                                    textAreaRef.current.focus();
                                }}
                            >
                                list{item}
                            </div>
                        ))}
                    </div>
                </Accordion>
            </Popover>
        </div>
    );
}

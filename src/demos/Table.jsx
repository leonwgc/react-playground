import React, {useState, useCallback, useRef} from 'react';
import {useMount, useUpdateEffect} from 'react-uni-comps';
import Table from 'alcedo-ui/Table';
import {get} from '~/utils/req';
import {useAppData, useUpdateStore} from 'simple-redux-store';

export default function App() {
    const udpateStore = useUpdateStore();
    const {
        updatedClickNegativeKeywordsList = [],
        clickNegativeKeywordsValue = [] // selected id array
    } = useAppData();

    const [
        currentClickNegativeKeywordsList,
        setCurrentClickNegativeKeywordsList
    ] = useState([]);

    const ref = useRef(); // hold data list

    useMount(() => {
        get(
            '/dplatform-cloud-gateway/click-ppc/preset-negative-keywords?languageCode=en'
        ).then(res => {
            // presetClickNegativeKeywords
            const formatedClickNegativeKeywordData = res.data?.map(item => ({
                ifSelected: false,
                id: item.tagCategory,
                content: item.tagCategory,
                'match type': 'Broad Match',
                children: item.tags.map(tag => ({
                    ...tag,
                    ifSelected: clickNegativeKeywordsValue.includes(tag.id)
                }))
            }));

            ref.current = formatedClickNegativeKeywordData;

            setCurrentClickNegativeKeywordsList(
                formatedClickNegativeKeywordData
            );
        });
    });

    useUpdateEffect(() => {
        const formatedClickNegativeKeywordData = ref.current?.map(item => ({
            ...item,
            children: item.children.map(tag => ({
                ...tag,
                ifSelected: clickNegativeKeywordsValue.includes(tag.id)
            }))
        }));

        setCurrentClickNegativeKeywordsList(formatedClickNegativeKeywordData);

        const selectedKeywords = formatedClickNegativeKeywordData?.map(item => {
            const selectedChildren = item.children
                ?.filter(child => !!child.ifSelected)
                .flat()
                .map(({ifSelected, ...item}) => item);
            const parentSelected =
                item.children.length === selectedChildren.length;
            if (parentSelected) {
                return [
                    {
                        content: item.content,
                        id: item.content,
                        ['match type']: 'Broad Match'
                    },
                    ...selectedChildren
                ].flat();
            } else {
                return selectedChildren;
            }
        });

        udpateStore({
            updatedClickNegativeKeywordsList: selectedKeywords?.flat()
        });
    }, [clickNegativeKeywordsValue]);

    const handleCheckboxChange = useCallback(selectedKeywords => {
        const selectedKeywordsIds = selectedKeywords
            .filter(keyword => !keyword.children) // only children id
            .map(keyword => keyword.id);
        udpateStore({clickNegativeKeywordsValue: selectedKeywordsIds});
    }, []);

    const clickNegativeKeywordColumns = [
        {
            key: 'negative-keywords',
            align: Table.Align.LEFT,
            headRenderer: 'Negative Keywords',
            bodyClassName: 'negative-keywords',
            bodyRenderer: rowData => rowData.content,
            sortable: true,
            sortingProp: 'content'
        },
        {
            key: 'match-type',
            align: Table.Align.LEFT,
            headRenderer: 'Match Type',
            bodyClassName: 'match-type',
            bodyRenderer: rowData => rowData['match type'],
            sortingProp: 'match-type'
        }
    ];

    const checkedKeywordList = updatedClickNegativeKeywordsList?.map(item => ({
        ...item,
        ifSelected: true
    }));

    return (
        <div>
            <Table
                idField="content"
                isHeadFixed={true}
                isPaginated={false}
                canBeExpanded={true}
                isSelectRecursive={true}
                value={checkedKeywordList}
                checked={value => value.ifSelected}
                columns={clickNegativeKeywordColumns}
                data={currentClickNegativeKeywordsList}
                selectMode={Table.SelectMode.MULTI_SELECT}
                className="click-negative-keywords__table"
                onChange={value => handleCheckboxChange(value)}
            />
        </div>
    );
}

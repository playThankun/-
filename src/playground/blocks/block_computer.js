const { type } = Lang || {};
const filename = type === 'ko' ? 'computer_icon_ko.svg' : 'computer_icon.svg';

module.exports = {
    getBlocks() {
        return {
            copy_to_clipboard: {
                color: EntryStatic.colorSet.block.default.COMPUTER,
                outerLine: EntryStatic.colorSet.block.darken.COMPUTER,
                template: '%1 내용을 클립보드에 복사하기 %2',
                skeleton: 'basic',
                statements: [],
                params: [
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Indicator',
                        img: `block_icon/프사.svg`,
                        size: 11,
                    },
                ],
                events: {},
                def: {
                    params: [
                        {
                            type: 'text',
                            params: ['복사할 내용'],
                        },
                        null,
                    ],
                    type: 'copy_to_clipboard',
                },
                pyHelpDef: {
                    params: [
                        {
                            type: 'text',
                            params: ['A&value'],
                        },
                        null,
                    ],
                    type: 'copy_to_clipboard',
                },
                paramsKeyMap: {
                    CONTENT: 0,
                },
                class: 'computer',
                isNotFor: [],
                func(sprite, script) {
                    const content = script.getStringValue('CONTENT', script);

                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(content).catch((err) => {
                            console.error('클립보드 복사 실패:', err);
                        });
                    } else {
                        const textarea = document.createElement('textarea');
                        textarea.value = content;
                        document.body.appendChild(textarea);
                        textarea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textarea);
                    }

                    return script.callReturn();
                },
                syntax: { js: [], py: ['Entry.copy_to_clipboard(%1)'] },
            },
        };
    },
};
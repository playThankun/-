import _take from 'lodash/take';
import _takeRight from 'lodash/takeRight';

const getFirstBoxWidth = (blockView: any): number => {
    const contents = _take(blockView._contents || [], 3);
    return contents.reduce<number>((acc, content: any) => acc + (content.box?.width || 0), 20);
};

const getSecondBoxWidth = (blockView: any): number => {
    const contents = _takeRight(blockView._contents || [], 3);
    return contents.reduce<number>((acc, content: any) => acc + (content.box?.width || 0), 20);
};

Entry.skeleton.basic_create_value = {
    executable: false,

    path(blockView: any) {
        const topWidth = Math.max(getFirstBoxWidth(blockView) + 12, 110);
        const bottomWidth = Math.max(getSecondBoxWidth(blockView) + 24, 150);

        const contentHeight = Math.max(
            (blockView.contentHeight % 1000000) + 2,
            36
        );

        let statementHeight = blockView._statements?.[0]
            ? blockView._statements[0].height
            : 20;

        const isAttached = statementHeight > 20;
        statementHeight = Math.max(statementHeight, 20);

        const radius = 9;
        const statementRadius = 8;
        const indentX = isAttached ? 18 : 16;

        const statementTop = contentHeight;
        const statementBottom = statementTop + statementHeight; 
        const totalHeight = statementBottom + 32;

        return `
            M ${radius} 0
            H ${topWidth - radius}
            Q ${topWidth} 0 ${topWidth} ${radius}
            V ${contentHeight - radius}
            Q ${topWidth} ${contentHeight} ${topWidth - radius} ${contentHeight}
            H ${indentX + statementRadius}
            Q ${indentX} ${contentHeight} ${indentX} ${contentHeight + statementRadius}
            V ${statementBottom - statementRadius}
            Q ${indentX} ${statementBottom} ${indentX + statementRadius} ${statementBottom}
            H ${bottomWidth - radius}
            Q ${bottomWidth} ${statementBottom} ${bottomWidth} ${statementBottom + radius}
            V ${totalHeight - radius}
            Q ${bottomWidth} ${totalHeight} ${bottomWidth - radius} ${totalHeight}
            H ${radius}
            Q 0 ${totalHeight} 0 ${totalHeight - radius}
            V ${radius}
            Q 0 0 ${radius} 0
            Z
        `;
    },

    magnets(blockView: any) {
        return {};
    },

    box(blockView: any) {
        const topWidth = Math.max(getFirstBoxWidth(blockView) + 4, 110);
        const bottomWidth = Math.max(getSecondBoxWidth(blockView) + 24, 150);
        const maxWidth = Math.max(topWidth, bottomWidth);

        const contentHeight = Math.max(
            (blockView.contentHeight % 1000000) + 2,
            36
        );

        let statementHeight = blockView._statements?.[0]
            ? blockView._statements[0].height
            : 20;

        statementHeight = Math.max(statementHeight, 20);

        return {
            topFieldHeight: contentHeight,
            offsetX: -7,
            offsetY: 0,
            width: maxWidth,
            height: contentHeight + statementHeight + 32,
            marginBottom: 0,
        };
    },

    // ★ 자식 블록 결합 여부에 따라 자석 안착 X/Y 좌표 반영
    statementPos(blockView: any) {
        const height = Math.max(
            (blockView.contentHeight % 1000000) + 2,
            36
        );

        let statementHeight = blockView._statements?.[0]
            ? blockView._statements[0].height
            : 20;

        const isAttached = statementHeight > 20;

        return [
            {
                x: isAttached ? 14 : 18,
                y: height,
            },
        ];
    },

    // ★ 자식 블록 높이(statementHeight)가 반영된 statementBottom 기준으로 하단 글자 Y축 동적 이동
    contentPos(blockView: any, index?: number) {
        const contentHeight = Math.max(
            (blockView.contentHeight % 1000000) + 2,
            36
        );

        let statementHeight = blockView._statements?.[0]
            ? blockView._statements[0].height
            : 20;

        statementHeight = Math.max(statementHeight, 20);

        // 조립된 자식 블록 아래쪽 라인의 Y 좌표 계산
        const statementBottom = contentHeight + statementHeight;
        const contentIdx = typeof index === 'number' ? index : (arguments[1] as number);

        if (typeof contentIdx === 'number' && contentIdx >= 3) {
            return {
                x: 12,
                y: statementBottom + 16,
            };
        }

        return {
            x: 12,
            y: contentHeight / 1.87,
        };
    },
};
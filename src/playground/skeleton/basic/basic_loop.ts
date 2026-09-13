Entry.skeleton.basic_loop = {
    executable: true,
    path(blockView: any) {
        const width = Math.max(
            blockView.contentWidth + 18,
            30
        );

        const contentHeight = Math.max(
            blockView.contentHeight + 2,
            36
        );

        let statementHeight = blockView._statements[0]
            ? blockView._statements[0].height
            : 20;

        const isAttached = statementHeight > 20;
        statementHeight = Math.max(statementHeight, 20);

        const radius = 9;
        const statementRadius = 8;
        const indentX = isAttached ? 18 : 16;

        const totalHeight = contentHeight + statementHeight + 16;
        const statementTop = contentHeight;
        const statementBottom = statementTop + statementHeight;

        return `
            M ${radius} 0
            H ${width - radius}
            Q ${width} 0 ${width} ${radius}
            V ${contentHeight - radius}
            Q ${width} ${contentHeight} ${width - radius} ${contentHeight}
            H ${indentX + statementRadius}
            Q ${indentX} ${contentHeight} ${indentX} ${contentHeight + statementRadius}
            V ${statementBottom - statementRadius}
            Q ${indentX} ${statementBottom} ${indentX + statementRadius} ${statementBottom}
            H ${width - radius}
            Q ${width} ${statementBottom} ${width} ${statementBottom + radius}
            V ${totalHeight - radius}
            Q ${width} ${totalHeight} ${width - radius} ${totalHeight}
            H ${radius}
            Q 0 ${totalHeight} 0 ${totalHeight - radius}
            V ${radius}
            Q 0 0 ${radius} 0
            Z
        `;
    },

    magnets(blockView: any) {
        const contentHeight = Math.max(
            blockView.contentHeight + 2,
            36
        );

        let statementHeight = blockView._statements[0]
            ? blockView._statements[0].height
            : 20;

        statementHeight = Math.max(statementHeight, 20);

        return {
            previous: { x: 0, y: 0 },
            next: {
                x: 0,
                y: contentHeight + statementHeight + 16,
            },
        };
    },

    box(blockView: any) {
        const contentWidth = blockView.contentWidth;

        const contentHeight = Math.max(
            blockView.contentHeight + 2,
            36
        );

        let statementHeight = blockView._statements[0]
            ? blockView._statements[0].height
            : 20;

        statementHeight = Math.max(statementHeight, 20);

        return {
            topFieldHeight: contentHeight,
            offsetX: -7,
            offsetY: 0,
            width: contentWidth + 19,
            height: contentHeight + statementHeight + 16,
            marginBottom: 0,
        };
    },

    statementPos(blockView: any) {
        const height = Math.max(
            blockView.contentHeight + 2,
            36
        );

        let statementHeight = blockView._statements[0]
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

    contentPos(blockView: any) {
        const height = Math.max(
            blockView.contentHeight + 2,
            36
        );

        return {
            x: 12,
            y: height / 2,
        };
    },
};
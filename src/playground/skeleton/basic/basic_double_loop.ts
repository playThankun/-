Entry.skeleton.basic_double_loop = {
    executable: true,
    path(blockView: any) {
        const width = Math.max(
            blockView.contentWidth + 18,
            30
        );

        const contentHeight1 = Math.max(
            (blockView.contentHeight % 1000000) + 2,
            36
        );
        const contentHeight2 = Math.max(
            Math.floor(blockView.contentHeight / 1000000) + 2,
            36
        );

        const statements = blockView._statements;
        let statementHeight1 = statements[0] ? statements[0].height % 1000000 : 20;
        let statementHeight2 = statements[1] ? statements[1].height : 20;

        // ★ 첫 번째, 두 번째 홈에 각각 자식 블록이 조립되었는지 동적 감지
        const isAttached1 = statementHeight1 > 20;
        const isAttached2 = statementHeight2 > 20;

        statementHeight1 = Math.max(statementHeight1, 20);
        statementHeight2 = Math.max(statementHeight2, 20);

        const radius = 9;
        const statementRadius = 8;
        
        // ★ 홈별 독립적 기둥 두께 처리
        const indentX1 = isAttached1 ? 18 : 16;
        const indentX2 = isAttached2 ? 18 : 16;

        // Y축 구간별 위치 계산
        const top1 = contentHeight1;
        const bottom1 = top1 + statementHeight1;
        const top2 = bottom1 + contentHeight2;
        const bottom2 = top2 + statementHeight2;
        const totalHeight = bottom2 + 16;

        return `
            M ${radius} 0
            H ${width - radius}
            Q ${width} 0 ${width} ${radius}
            V ${top1 - radius}
            Q ${width} ${top1} ${width - radius} ${top1}
            H ${indentX1 + statementRadius}
            Q ${indentX1} ${top1} ${indentX1} ${top1 + statementRadius}
            V ${bottom1 - statementRadius}
            Q ${indentX1} ${bottom1} ${indentX1 + statementRadius} ${bottom1}
            H ${width - radius}
            Q ${width} ${bottom1} ${width} ${bottom1 + radius}
            V ${top2 - radius}
            Q ${width} ${top2} ${width - radius} ${top2}
            H ${indentX2 + statementRadius}
            Q ${indentX2} ${top2} ${indentX2} ${top2 + statementRadius}
            V ${bottom2 - statementRadius}
            Q ${indentX2} ${bottom2} ${indentX2 + statementRadius} ${bottom2}
            H ${width - radius}
            Q ${width} ${bottom2} ${width} ${bottom2 + radius}
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
        const contentHeight1 = Math.max(
            (blockView.contentHeight % 1000000) + 2,
            36
        );
        const contentHeight2 = Math.max(
            Math.floor(blockView.contentHeight / 1000000) + 2,
            36
        );

        let statementHeight1 = blockView._statements[0]
            ? blockView._statements[0].height % 1000000
            : 20;
        let statementHeight2 = blockView._statements[1]
            ? blockView._statements[1].height
            : 20;

        statementHeight1 = Math.max(statementHeight1, 20);
        statementHeight2 = Math.max(statementHeight2, 20);

        return {
            previous: { x: 0, y: 0 },
            next: {
                x: 0,
                y: contentHeight1 + contentHeight2 + statementHeight1 + statementHeight2 + 16,
            },
        };
    },

    box(blockView: any) {
        const contentWidth = blockView.contentWidth;
        const contentHeight1 = Math.max(
            (blockView.contentHeight % 1000000) + 2,
            36
        );
        const contentHeight2 = Math.max(
            Math.floor(blockView.contentHeight / 1000000) + 2,
            36
        );

        let statementHeight1 = blockView._statements[0]
            ? blockView._statements[0].height % 1000000
            : 20;
        let statementHeight2 = blockView._statements[1]
            ? blockView._statements[1].height
            : 20;

        statementHeight1 = Math.max(statementHeight1, 20);
        statementHeight2 = Math.max(statementHeight2, 20);

        return {
            topFieldHeight: contentHeight1,
            offsetX: -7,
            offsetY: 0,
            width: contentWidth + 19,
            height: contentHeight1 + contentHeight2 + statementHeight1 + statementHeight2 + 16,
            marginBottom: 0,
        };
    },

    statementPos(blockView: any) {
        const contentHeight1 = Math.max(
            (blockView.contentHeight % 1000000) + 2,
            36
        );
        const contentHeight2 = Math.max(
            Math.floor(blockView.contentHeight / 1000000) + 2,
            36
        );

        let statementHeight1 = blockView._statements[0]
            ? blockView._statements[0].height % 1000000
            : 20;
        let statementHeight2 = blockView._statements[1]
            ? blockView._statements[1].height
            : 20;

        const isAttached1 = statementHeight1 > 20;
        const isAttached2 = statementHeight2 > 20;

        statementHeight1 = Math.max(statementHeight1, 20);

        return [
            {
                // ★ 1번 홈 자식 안착 위치
                x: isAttached1 ? 14 : 18,
                y: contentHeight1,
            },
            {
                // ★ 2번 홈 자식 안착 위치
                x: isAttached2 ? 14 : 18,
                y: contentHeight1 + statementHeight1 + contentHeight2,
            },
        ];
    },

    contentPos(blockView: any) {
        const height = Math.max(
            (blockView.contentHeight % 1000000) + 2,
            36
        );
        return {
            x: 12,
            y: height / 2,
        };
    },
};
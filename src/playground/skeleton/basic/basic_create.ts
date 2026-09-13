Entry.skeleton.basic_create = {
    executable: true,
    path(blockView: any) {
        let width = Math.max(0, blockView.contentWidth - 10);
        let height = Math.max(28, blockView.contentHeight);
        const halfHeight = height / 2;

        return `m 4 0
        h ${width}
        a ${halfHeight} ${halfHeight} 0 0 1 0 ${height}
        H 4
        a ${halfHeight} ${halfHeight} 0 0 1 0 -${height}
        z`;
    },
    magnets(blockView: any) {
        return {
            // ★ next까지 삭제하여 블록 아래(외부)에 다른 블록이 꽂히는 것 방지
        };
    },
    box(blockView: any) {
        const width = blockView ? blockView.contentWidth : 150;
        const height = blockView ? blockView.contentHeight : 28;
        return {
            offsetX: 0,
            offsetY: 0,
            width: width + 4,
            height: Math.max(28, height),
            marginBottom: 0,
        };
    },
    
    statementPos(blockView: any) {
        const height = Math.max(
            (blockView.contentHeight % 1000000) + 2,
            36
        );

        return [
            {
                x: 10,
                y: height,
            },
        ];
    },

    contentPos(blockView: any) {
        const height = Math.max(blockView.contentHeight % 1000000, 28);
        return { 
            x: 2, 
            y: height / 2 
        };
    },
};
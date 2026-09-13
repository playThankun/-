Entry.skeleton.basic = {
    executable: true,

    path(blockView) {
        const width = Math.max(blockView.contentWidth + 18, 30);
        const height = Math.max(blockView.contentHeight + 2, 36);

        return `
            M 9 0
            H ${width - 9}
            Q ${width} 0 ${width} 9
            V ${height - 9}
            Q ${width} ${height} ${width - 9} ${height}
            H 9
            Q 0 ${height} 0 ${height - 9}
            V 9
            Q 0 0 9 0
            Z
        `;
    },

    box(blockView) {
        const width = blockView
            ? blockView.contentWidth + 18
            : 180;

        const height = blockView
            ? Math.max(blockView.contentHeight + 2, 36)
            : 36;

     return {
    offsetX: -7,
    offsetY: 0,
    width: width,
    height: height,
    marginBottom: 0,
};
    },

    magnets(blockView) {
        const height = blockView
            ? Math.max(blockView.contentHeight + 2, 36)
            : 36;

        return {
            previous: {
                x: 0,
                y: 0,
            },

            next: {
                x: 0,
                y: height,
            },
        };
    },

    contentPos(blockView) {
    const height = Math.max(blockView.contentHeight + 2, 36);

    return {
        x: 12, // 기존 12
        y: height / 2,
    };
}
};


Entry.skeleton.basic_without_next = {
    executable: true,
    outerLine: '#13bf68',

    box: Entry.skeleton.basic.box,
    contentPos: Entry.skeleton.basic.contentPos,

    path(blockView) {
        const width = Math.max(blockView.contentWidth + 18, 30);
        const height = Math.max(blockView.contentHeight + 2, 36);

        return `
            M 9 0
            H ${width - 9}
            Q ${width} 0 ${width} 9
            V ${height - 9}

            L ${width - 5} ${height}
            H 5
            L 0 ${height - 9}

            V 9
            Q 0 0 9 0
            Z
        `;
    },

     magnets() {
        return {
            previous: { x: 0, y: 0 },
        };
    },
 };
Entry.skeleton.basic_event = {
    executable: true,

    path(blockView) {
        const width = Math.max(blockView.contentWidth + 30, 30);
        const height = 36;

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
        return {
            topFieldHeight: 40,
            offsetX: 0,
            offsetY: -2,
            width: blockView.contentWidth + 30,
            height: 36,
            marginBottom: 0,
        };
    },

    magnets(blockView) {
        const height = blockView
            ? Math.max(blockView.height + blockView.offsetY + 7, 36)
            : 36;

        return {
            next: {
                x: 12,
                y: height - 1,
            },
        };
    },

    contentPos() {
        return {
            x: 19.3,
            y: 20,
        };
    },
};
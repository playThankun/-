'use strict';

import get from 'lodash/get';
import isMatch from 'lodash/isMatch';
import pick from 'lodash/pick';

function scriptCheck(script) {
    if (script.length !== 1 || script[0].length !== 2) {
        return false;
    }

    const whenRun = get(script, '0.0.type');
    const repeat = get(script, '0.1.type');
    const statements = get(script, '0.1.statements');
    const move = get(script, '0.1.statements.0.0.type');

    if (
        whenRun !== 'when_run_button_click' ||
        repeat !== 'repeat_basic' ||
        statements.length !== 1 ||
        statements[0].length !== 1 ||
        move !== 'move_direction'
    ) {
        return false;
    }

    return true;
}

Entry.isDefaultProject = function (project) {
    try {
        if (Entry.stateManager.undoStack_.length) {
            return false;
        }

        const script = JSON.parse(get(project, 'objects.0.script'));
        const { scenes, variables, objects, tables } = project;
        if (
            scenes.length !== 1 ||
            variables.length !== 2 ||
            objects.length !== 1 ||
            tables.length !== 0 ||
            !scriptCheck(script)
        ) {
            return false;
        }
        const pickData = pick(project, [
            'scenes.0.id',
            'variables.0.id',
            'variables.0.value',
            'variables.0.variableType',
            'variables.0.x',
            'variables.0.y',
            'variables.1.id',
            'variables.1.value',
            'variables.1.variableType',
            'variables.1.x',
            'variables.1.y',
            'objects.0.id',
            'objects.0.scene',
            'objects.0.sprite.sounds.length',
            'objects.0.sprite.pictures.0.id',
            'objects.0.sprite.pictures.length',
            'expansionBlocks',
            'aiUtilizeBlocks',
            'speed',
        ]);
        return isMatch(Entry.getStartProject(), pickData);
    } catch (e) {
        return false;
    }
};

Entry.getStartProject = function (mediaFilePath) {
    return {
        category: Lang.Menus.other,
        scenes: [
            {
                name: `${Lang.Blocks.SCENE} 1`,
                id: '7dwq',
            },
        ],
        variables: [
            {
                name: Lang.Workspace.Variable_Timer,
                id: 'brih',
                visible: false,
                value: '0',
                variableType: 'timer',
                x: 134,
                y: -70,
                array: [],
                object: null,
                isCloud: false,
            },
            {
                name: Lang.Blocks.VARIABLE_get_canvas_input_value,
                id: '1vu8',
                visible: false,
                value: '0',
                variableType: 'answer',
                x: 150,
                y: -100,
                array: [],
                object: null,
                isCloud: false,
            },
        ],
        objects: [
            {
                id: '7y0y',
                // 기본 오브젝트 이름을 땡쿤으로 교체
                name: '땡쿤',
                label: {
                    ko: '땡쿤',
                    en: 'Thankun',
                },
                script: [
                    [
                        {
                            type: 'when_run_button_click',
                            x: 40,
                            y: 50,
                        },
                        {
                            type: 'repeat_basic',
                            statements: [[{ type: 'move_direction' }]],
                        },
                    ],
                ],
                selectedPictureId: 'vx80',
                objectType: 'sprite',
                rotateMethod: 'free',
                scene: '7dwq',
                sprite: {
                    // 아직 사운드 에셋이 없으므로 비워둠
                    // (나중에 준비되면 entrybot의 sounds 배열처럼 { id, fileurl, name, label } 형태로 추가)
                    sounds: [],
                    pictures: [
                        {
                            id: 'vx80',
                            // media 폴더에 땡쿤 이미지를 넣고 파일명을 여기에 맞춰주세요
                            // (예: media/thankun.svg)
                            fileurl: `${mediaFilePath}images/thankun.svg`,
                            thumbUrl: `${mediaFilePath}images/thankun.svg`,
                            name: '땡쿤_1',
                            imageType: 'svg',
                            dimension: {
                                width: 289,
                                height: 302,
                            },
                        },
                    ],
                },
                entity: {
                    x: 0,
                    y: 0,
                    regX: 144.5,
                    regY: 151,
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0,
                    direction: 90,
                    width: 289,
                    height: 302,
                    visible: true,
                },
                lock: false,
                active: true,
            },
        ],
        expansionBlocks: [],
        aiUtilizeBlocks: [],
        speed: 60,
    };
};
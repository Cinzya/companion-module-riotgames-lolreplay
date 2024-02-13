"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = void 0;
const data_1 = require("./data");
const utils_1 = require("./utils");
class Actions {
    constructor(instance, api) {
        this.actions = {};
        this.instance = instance;
        this.replayapi = api;
        this.createRenderActions();
    }
    createOptions(type, value) {
        switch (type) {
            case 'number':
                return [
                    {
                        type: 'number',
                        id: 'value',
                        label: 'Value',
                        default: value,
                        min: -100000,
                        max: 100000,
                    },
                ];
            case 'string':
                return [
                    {
                        type: 'textinput',
                        id: 'value',
                        label: 'Value',
                        default: value,
                    },
                ];
            case 'boolean':
                return [
                    {
                        type: 'dropdown',
                        id: 'value',
                        label: 'Value',
                        default: `${value}`,
                        choices: [
                            { id: 'true', label: 'On' },
                            { id: 'false', label: 'Off' },
                            { id: 'toggle', label: 'Toggle' },
                        ],
                    },
                ];
            default:
                return [];
        }
    }
    createAction(key, value, endpoint) {
        const actionId = (0, utils_1.camelCaseToSnakeCase)(key);
        const options = this.createOptions(typeof value, value);
        this.actions[actionId] = {
            name: `Set ${(0, utils_1.prettyfyStr)(key)}`,
            options,
            callback: ({ options }) => {
                if (options.value === 'toggle') {
                    const currentValue = this.instance.getVariableValue(key);
                    this.replayapi.post(endpoint, {
                        [key]: currentValue === 'true' ? 'false' : 'true',
                    });
                    return;
                }
                this.replayapi.post(endpoint, {
                    [key]: options.value,
                });
            },
        };
    }
    createRenderActions() {
        for (const [key, value] of Object.entries(data_1.renderInstance)) {
            this.createAction(key, value, 'replay/render');
        }
    }
    createPlaybackActions() {
        for (const [key, value] of Object.entries(data_1.playbackInstance)) {
            this.createAction(key, value, 'replay/playback');
        }
    }
    UpdateActionDefinitions() {
        this.instance.setActionDefinitions(this.actions);
    }
}
exports.Actions = Actions;

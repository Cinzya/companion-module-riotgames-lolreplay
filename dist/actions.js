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
        this.createPostActions();
    }
    createPostActions() {
        for (const [key, value] of Object.entries(data_1.replayAPIInstance)) {
            const actionId = (0, utils_1.camelCaseToSnakeCase)(key);
            let options = [];
            if (typeof value === 'number') {
                options = [
                    {
                        type: 'number',
                        id: 'value',
                        label: 'Value',
                        default: value,
                        min: -100000,
                        max: 100000,
                    },
                ];
            }
            else if (typeof value === 'string') {
                options = [
                    {
                        type: 'textinput',
                        id: 'value',
                        label: 'Value',
                        default: value,
                    },
                ];
            }
            else if (typeof value === 'boolean') {
                options = [
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
            }
            this.actions[actionId] = {
                name: `Set ${(0, utils_1.prettyfyStr)(key)}`,
                options: options,
                callback: ({ options }) => {
                    if (options.value === 'toggle') {
                        const currentValue = this.instance.getVariableValue(key);
                        this.replayapi.post({
                            [key]: currentValue === 'true' ? 'false' : 'true',
                        });
                        return;
                    }
                    this.replayapi.post({ [key]: options.value });
                },
            };
        }
    }
    UpdateActionDefinitions() {
        this.instance.setActionDefinitions(this.actions);
    }
}
exports.Actions = Actions;

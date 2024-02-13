"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Variables = void 0;
const data_1 = require("./data");
const utils_1 = require("./utils");
class Variables {
    constructor(instance) {
        this.variables = [];
        this.instance = instance;
        const replayAPIKeys = [];
        function iterateKeys(obj, parentKey = '') {
            Object.keys(obj).forEach(key => {
                const newKey = parentKey ? `${parentKey}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    iterateKeys(obj[key], newKey);
                }
                else {
                    replayAPIKeys.push(newKey);
                }
            });
        }
        iterateKeys(data_1.renderInstance);
        iterateKeys(data_1.playbackInstance);
        this.variables = replayAPIKeys.map(key => ({
            variableId: key,
            name: (0, utils_1.prettyfyStr)(key),
        }));
    }
    UpdateVariableDefinitions() {
        this.instance.setVariableDefinitions(this.variables);
    }
    UpdateVariable(data) {
        for (const [key, value] of Object.entries(data)) {
            if (typeof value === 'object' && value !== null) {
                Object.keys(value).forEach(subKey => {
                    this.instance.setVariableValues({
                        [`${key}.${subKey}`]: value[subKey],
                    });
                });
            }
            else {
                this.instance.setVariableValues({ [key]: value });
            }
        }
    }
}
exports.Variables = Variables;

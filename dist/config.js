"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigFields = void 0;
const base_1 = require("@companion-module/base");
const getConfigFields = () => {
    return [
        {
            type: 'textinput',
            id: 'host',
            label: 'Taget host',
            width: 6,
            regex: base_1.Regex.IP,
        },
        {
            type: 'number',
            id: 'apiPollingInterval',
            label: 'API Polling interval (ms) (default: 250, min: 100)',
            width: 6,
            default: 250,
            min: 100,
            max: 10000,
        },
    ];
};
exports.getConfigFields = getConfigFields;

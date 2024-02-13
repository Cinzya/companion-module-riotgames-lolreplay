"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const base_1 = require("@companion-module/base");
const config_1 = require("./config");
const upgrade_1 = require("./upgrade");
const variables_1 = require("./variables");
const actions_1 = require("./actions");
const http_1 = require("./http");
const set_interval_async_1 = require("set-interval-async");
class LoLInstance extends base_1.InstanceBase {
    constructor(internal) {
        super(internal);
        this.config = {
            host: '',
            apiPollingInterval: 250,
        };
        this.apiInterval = null;
        this.variables = null;
        this.actions = null;
        this.lolreplay = null;
    }
    init(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.config = config;
            this.log('debug', `Process ID: ${process.pid}`);
            this.lolreplay = new http_1.ReplayService(this, config);
            this.variables = new variables_1.Variables(this);
            this.actions = new actions_1.Actions(this, this.lolreplay);
            this.updateInstance();
        });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () {
            this.log('debug', 'destroy');
            if (this.apiInterval)
                (0, set_interval_async_1.clearIntervalAsync)(this.apiInterval);
        });
    }
    initializeInterval() {
        return __awaiter(this, void 0, void 0, function* () {
            const ipRegex = new RegExp('^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$');
            if (this.apiInterval)
                (0, set_interval_async_1.clearIntervalAsync)(this.apiInterval);
            if (!ipRegex.test(this.config.host)) {
                this.updateStatus(base_1.InstanceStatus.BadConfig, 'Invalid IP');
                this.log('error', `Invalid IP: ${this.config.host}, Test result: ${!ipRegex.test(this.config.host)}`);
                return;
            }
            this.log('debug', 'Connecting to LoL Replay API');
            this.apiInterval = (0, set_interval_async_1.setIntervalAsync)(() => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (!this.lolreplay) {
                    this.updateStatus(base_1.InstanceStatus.UnknownWarning, 'Replay service not initialized');
                    this.apiInterval && (0, set_interval_async_1.clearIntervalAsync)(this.apiInterval);
                }
                else {
                    const renderData = yield this.lolreplay.get('replay/render');
                    if (renderData)
                        (_a = this.variables) === null || _a === void 0 ? void 0 : _a.UpdateVariable(renderData);
                    const playbackData = yield this.lolreplay.get('replay/playback');
                    if (playbackData)
                        (_b = this.variables) === null || _b === void 0 ? void 0 : _b.UpdateVariable(playbackData);
                }
            }), this.config.apiPollingInterval);
        });
    }
    /**
     * @param config new configuration data
     * @description triggered every time the config for this instance is saved
     */
    configUpdated(config) {
        return __awaiter(this, void 0, void 0, function* () {
            this.config = config;
            this.updateInstance();
        });
    }
    getConfigFields() {
        return (0, config_1.getConfigFields)();
    }
    updateInstance() {
        var _a, _b;
        (_a = this.variables) === null || _a === void 0 ? void 0 : _a.UpdateVariableDefinitions();
        (_b = this.actions) === null || _b === void 0 ? void 0 : _b.UpdateActionDefinitions();
        this.initializeInterval();
        return;
    }
}
(0, base_1.runEntrypoint)(LoLInstance, upgrade_1.UpgradeScripts);
module.exports = LoLInstance;

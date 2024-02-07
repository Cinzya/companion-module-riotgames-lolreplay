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
class LoLInstance extends base_1.InstanceBase {
    constructor(internal) {
        super(internal);
        this.config = {
            host: '',
        };
        this.instanceOptions.disableVariableValidation = true;
    }
    init(config) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    destroy() {
        return __awaiter(this, void 0, void 0, function* () { });
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
        // const actions = []
        // const feedbacks = []
        // this.setActionDefinitions(actions)
        // this.setFeedbackDefinitions(feedbacks)
    }
}
(0, base_1.runEntrypoint)(LoLInstance, (0, upgrade_1.getUpgrades)());
module.exports = LoLInstance;

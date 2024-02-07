"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpgrades = void 0;
const exampleUpgradeScript = (_context, props) => {
    return {
        updatedConfig: props.config,
        updatedActions: props.actions,
        updatedFeedbacks: props.feedbacks,
    };
};
const getUpgrades = () => {
    return [exampleUpgradeScript];
};
exports.getUpgrades = getUpgrades;

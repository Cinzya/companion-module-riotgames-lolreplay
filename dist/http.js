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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplayService = void 0;
const node_https_1 = __importDefault(require("node:https"));
const base_1 = require("@companion-module/base");
const utils_1 = require("./utils");
class ReplayService {
    constructor(instance, config) {
        this.ip = config.host;
        this.instance = instance;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                hostname: this.ip,
                port: 2999,
                path: '/replay/render',
                rejectUnauthorized: false,
                headers: { 'Content-Type': 'application/json' },
                timeout: 5000,
            };
            return new Promise((resolve, reject) => {
                let all_data = '';
                const req = node_https_1.default.get(options, res => {
                    res.setEncoding('utf8');
                    res.on('data', d => {
                        all_data += d;
                    });
                    res.on('error', e => {
                        this.instance.log('error', e.message);
                        this.instance.updateStatus(base_1.InstanceStatus.UnknownError, e.message);
                        reject();
                    });
                    res.on('end', () => {
                        this.instance.updateStatus(base_1.InstanceStatus.Ok, 'Connected');
                        resolve(JSON.parse(all_data));
                    });
                });
                req.on('error', e => {
                    this.instance.log('error', e.message);
                    this.instance.updateStatus(base_1.InstanceStatus.UnknownError, e.message);
                    reject();
                });
                req.on('timeout', () => {
                    this.instance.log('error', 'Request timeout');
                    this.instance.updateStatus(base_1.InstanceStatus.ConnectionFailure, 'Request timeout');
                    reject();
                });
                req.end();
            });
        });
    }
    post(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = JSON.stringify((0, utils_1.convertObjectValues)(data));
            this.instance.log('debug', `sending data to post: ${body}`);
            const options = {
                hostname: this.ip,
                port: 2999,
                path: '/replay/render',
                rejectUnauthorized: false,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': body.length,
                },
            };
            return new Promise((resolve, reject) => {
                let all_data = '';
                const req = node_https_1.default.request(options, res => {
                    res.setEncoding('utf8');
                    res.on('data', d => {
                        all_data += d;
                    });
                    res.on('end', () => {
                        this.instance.log('debug', `received data from post: ${all_data}`);
                        resolve(JSON.parse(all_data));
                    });
                });
                req.on('error', e => {
                    this.instance.log('error', e.message);
                    this.instance.updateStatus(base_1.InstanceStatus.UnknownError, e.message);
                    reject();
                });
                req.write(body);
                req.end();
            });
        });
    }
}
exports.ReplayService = ReplayService;

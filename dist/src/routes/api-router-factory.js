"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class ApiRouterFactory {
    constructor() { }
    static getApiRouter() {
        const router = express.Router();
        return router;
    }
}
exports.ApiRouterFactory = ApiRouterFactory;

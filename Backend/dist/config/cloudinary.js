"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: "df4ew0uxu",
    api_key: "157968445889179",
    api_secret: "ihPgvO8KBFbS4R-dsuXApzsrjW4",
    secure: true,
});
exports.default = cloudinary_1.v2;

const axios = require("axios");
const { config } = require("internal");
const { addonBuilder, getRouter } = require("stremio-addon-sdk")
let builder = new addonBuilder({
	"id": "com.mirror.stremify",
	"version": "2.5.0",
	"catalogs": [],
	"resources": [
		"stream"
	],
	"types": [
		"movie",
		"series"
	],
	"name": "Stremify",
	"description": "A multi-server streaming addon.",
	"idPrefixes": [
		"tt"
	],
	"logo": "https://i.ibb.co/GWB1pwy/160156210.png"
});

builder.defineStreamHandler(async ({ type, id }) => {
    if (!["movie", "series"].includes(type)) return { streams: [] };
    try {
        const apiUrl = `${config.baseURL}/stream/${type}/${id}`;
        const response = await axios.get(apiUrl);
        return(response.data)
    } catch (error) {
        console.error(`Error fetching streams for ${type} ${id}:`, error);
        return { streams: [] };
    }
});

module.exports = getRouter(builder.getInterface())
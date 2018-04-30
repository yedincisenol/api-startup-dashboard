export default class Helper {
    getApiEndpoint(path) {
        return Config.API_BASEPOINT + path;
    };

    getApiHeaders() {
        let headers = {
            "client-id": Config.API_CLIENT_ID,
            "client-secret": Config.API_CLIENT_SECRET
        };

        if (app.$session.get('access_token')) {
            headers.Authorization = "Bearer " + app.$session.get('access_token');
        }

        return headers;
    };

    jsonToUrlEncoded(json) {
        let urlEncoded = "&";
        for(let key in json) {
            urlEncoded+=key + "=" + json[key] + "&";
        }

        return urlEncoded;
    };
};
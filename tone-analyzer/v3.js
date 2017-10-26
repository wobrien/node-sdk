"use strict";
/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var extend = require("extend");
var requestFactory = require("../lib/requestwrapper");
var helper = require("../lib/helper");
var util = require("util");
var BaseService = require("../lib/base_service");
var ToneAnalyzerV3 = /** @class */ (function () {
    /**
     * Construct a ToneAnalyzerV3 object.
     *
     * @param {Object} options
     * @param {String} options.version_date - Release date of the API version in YYYY-MM-DD format.
     * @constructor
     */
    function ToneAnalyzerV3(options) {
        BaseService.call(this, options);
        // check if 'version_date' was provided
        if (typeof this._options.version_date === 'undefined') {
            throw new Error('Argument error: version_date was not specified, use ');
        }
        this._options.qs.version = options.version_date;
    }
    /*************************
     * tone
     ************************/
    /**
     * Analyze general purpose tone.
     *
     * Uses the general purpose endpoint to analyze the tone of your input content. The service analyzes the content for emotional and language tones. The method always analyzes the tone of the full document; by default, it also analyzes the tone of each individual sentence of the content.   You can submit no more than 128 KB of total input content and no more than 1000 individual sentences in JSON, plain text, or HTML format. The service analyzes the first 1000 sentences for document-level analysis and only the first 100 sentences for sentence-level analysis.   Use the `POST` request method to analyze larger amounts of content in any of the available formats. Use the `GET` request method to analyze smaller quantities of plain text content.   Per the JSON specification, the default character encoding for JSON content is effectively always UTF-8; per the HTTP specification, the default encoding for plain text and HTML is ISO-8859-1 (effectively, the ASCII character set). When specifying a content type of plain text or HTML, include the `charset` parameter to indicate the character encoding of the input text; for example: `Content-Type: text/plain;charset=utf-8`. For `text/html`, the service removes HTML tags and analyzes only the textual content.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {ToneInput} params.tone_input - JSON, plain text, or HTML input that contains the content to be analyzed. For JSON input, provide an object of type `ToneInput`.
     * @param {string} params.content_type - The type of the input: application/json, text/plain, or text/html. A character encoding can be specified by including a `charset` parameter. For example, 'text/plain;charset=utf-8'.
     * @param {boolean} [params.sentences] - Indicates whether the service is to return an analysis of each individual sentence in addition to its analysis of the full document. If `true` (the default), the service returns results for each sentence.
     * @param {string[]} [params.tones] - **`2017-09-21`:** Deprecated. The service continues to accept the parameter for backward-compatibility, but the parameter no longer affects the response.   **`2016-05-19`:** A comma-separated list of tones for which the service is to return its analysis of the input; the indicated tones apply both to the full document and to individual sentences of the document. You can specify one or more of the valid values. Omit the parameter to request results for all three tones.
     * @param {string} [params.content_language] - The language of the input text for the request: English or French. Regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. The input content must match the specified language. Do not submit content that contains both languages. You can specify any combination of languages for `content_language` and `Accept-Language`. * **`2017-09-21`:** Accepts `en` or `fr`. * **`2016-05-19`:** Accepts only `en`.
     * @param {string} [params.accept_language] - The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`. You can specify any combination of languages for `Content-Language` and `accept_language`.
     * @param {Function} [callback] - The callback that handles the response.
     */
    ToneAnalyzerV3.prototype.tone = function (params, callback) {
        var requiredParams = ['tone_input', 'content_type'];
        var missingParams = helper.getMissingParams(params || {}, requiredParams);
        if (missingParams && callback)
            return callback(missingParams);
        var body = params.tone_input;
        var query = { sentences: params.sentences, tones: params.tones };
        var parameters = {
            options: {
                url: '/v3/tone',
                method: 'POST',
                json: (params.content_type === 'application/json'),
                body: body,
                qs: query
            },
            defaultOptions: extend(true, this._options, {
                headers: {
                    'accept': 'application/json',
                    'content-type': params.content_type,
                    'content-language': params.content_language,
                    'accept-language': params.accept_language
                }
            })
        };
        return requestFactory(parameters, callback);
    };
    ;
    /**
     * Analyze customer engagement tone.
     *
     * Use the customer engagement endpoint to analyze the tone of customer service and customer support conversations. For each utterance of a conversation, the method reports the most prevalent subset of the following seven tones: sad, frustrated, satisfied, excited, polite, impolite, and sympathetic.   If you submit more than 50 utterances, the service returns a warning for the overall content and analyzes only the first 50 utterances. If you submit a single utterance that contains more than 500 characters, the service returns an error for that utterance and does not analyze the utterance. The request fails if all utterances have more than 500 characters.   Per the JSON specification, the default character encoding for JSON content is effectively always UTF-8.
     *
     * @param {Object} params - The parameters to send to the service.
     * @param {Utterance[]} params.utterances - An array of `Utterance` objects that provides the input content that the service is to analyze.
     * @param {string} [params.accept_language] - The desired language of the response. For two-character arguments, regional variants are treated as their parent language; for example, `en-US` is interpreted as `en`.
     * @param {Function} [callback] - The callback that handles the response.
     */
    ToneAnalyzerV3.prototype.toneChat = function (params, callback) {
        var requiredParams = ['utterances'];
        var missingParams = helper.getMissingParams(params || {}, requiredParams);
        if (missingParams && callback)
            return callback(missingParams);
        var body = { utterances: params.utterances };
        var parameters = {
            options: {
                url: '/v3/tone_chat',
                method: 'POST',
                json: true,
                body: body
            },
            defaultOptions: extend(true, this._options, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'accept-language': params.accept_language
                }
            })
        };
        return requestFactory(parameters, callback);
    };
    ;
    ToneAnalyzerV3.URL = 'https://gateway.watsonplatform.net/tone-analyzer/api';
    return ToneAnalyzerV3;
}());
util.inherits(ToneAnalyzerV3, BaseService);
ToneAnalyzerV3.prototype.name = 'tone_analyzer';
ToneAnalyzerV3.prototype.version = 'v3';
/*************************
 * interfaces
 ************************/
(function (ToneAnalyzerV3) {
    var ToneConstants;
    (function (ToneConstants) {
        var ContentType;
        (function (ContentType) {
            ContentType["APPLICATION_JSON"] = "application/json";
            ContentType["TEXT_PLAIN"] = "text/plain";
            ContentType["TEXT_HTML"] = "text/html";
        })(ContentType = ToneConstants.ContentType || (ToneConstants.ContentType = {}));
        var Tones;
        (function (Tones) {
            Tones["EMOTION"] = "emotion";
            Tones["LANGUAGE"] = "language";
            Tones["SOCIAL"] = "social";
        })(Tones = ToneConstants.Tones || (ToneConstants.Tones = {}));
        var ContentLanguage;
        (function (ContentLanguage) {
            ContentLanguage["EN"] = "en";
            ContentLanguage["FR"] = "fr";
        })(ContentLanguage = ToneConstants.ContentLanguage || (ToneConstants.ContentLanguage = {}));
        var AcceptLanguage;
        (function (AcceptLanguage) {
            AcceptLanguage["AR"] = "ar";
            AcceptLanguage["DE"] = "de";
            AcceptLanguage["EN"] = "en";
            AcceptLanguage["ES"] = "es";
            AcceptLanguage["FR"] = "fr";
            AcceptLanguage["IT"] = "it";
            AcceptLanguage["JA"] = "ja";
            AcceptLanguage["KO"] = "ko";
            AcceptLanguage["PT_BR"] = "pt-br";
            AcceptLanguage["ZH_CN"] = "zh-cn";
            AcceptLanguage["ZH_TW"] = "zh-tw";
        })(AcceptLanguage = ToneConstants.AcceptLanguage || (ToneConstants.AcceptLanguage = {}));
    })(ToneConstants = ToneAnalyzerV3.ToneConstants || (ToneAnalyzerV3.ToneConstants = {}));
    var ToneChatConstants;
    (function (ToneChatConstants) {
        var AcceptLanguage;
        (function (AcceptLanguage) {
            AcceptLanguage["AR"] = "ar";
            AcceptLanguage["DE"] = "de";
            AcceptLanguage["EN"] = "en";
            AcceptLanguage["ES"] = "es";
            AcceptLanguage["FR"] = "fr";
            AcceptLanguage["IT"] = "it";
            AcceptLanguage["JA"] = "ja";
            AcceptLanguage["KO"] = "ko";
            AcceptLanguage["PT_BR"] = "pt-br";
            AcceptLanguage["ZH_CN"] = "zh-cn";
            AcceptLanguage["ZH_TW"] = "zh-tw";
        })(AcceptLanguage = ToneChatConstants.AcceptLanguage || (ToneChatConstants.AcceptLanguage = {}));
    })(ToneChatConstants = ToneAnalyzerV3.ToneChatConstants || (ToneAnalyzerV3.ToneChatConstants = {}));
})(ToneAnalyzerV3 || (ToneAnalyzerV3 = {}));
module.exports = ToneAnalyzerV3;

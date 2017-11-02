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

import Request = require('request'); 
import extend = require('extend');
import requestFactory = require('../lib/requestwrapper');
import helper = require('../lib/helper');
import util = require('util');
import BaseService = require('../lib/base_service');

class VisualRecognitionV3 {

  name: string; // set by prototype to 'watson_vision_combined'
  version: string; // set by prototype to 'v3'
  _options: any // set by BaseService

  static URL: string = 'https://gateway.watsonplatform.net/visual-recognition/api';

  /**
   * Construct a VisualRecognitionV3 object.
   *
   * @param {Object} options
   * @param {String} options.version_date - Release date of the API version in YYYY-MM-DD format.
   * @constructor
   */
  constructor(options: VisualRecognitionV3.Options) {
    BaseService.call(this, options);
    // check if 'version_date' was provided
    if (typeof this._options.version_date === 'undefined') {
      throw new Error('Argument error: version_date was not specified');
    }
    this._options.qs.version = options.version_date;
  }

  /*************************
   * classify
   ************************/

  /**
   * Classify images.
   *
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {ReadableStream|Object|Uint8Array} [params.images_file] - An image file (.jpg, .png) or .zip file with images. Include no more than 20 images and limit the .zip file to 5 MB. You can also include images with the `url` property in the **parameters** object.
   * @param {string} [params.parameters] - Specifies input parameters. The parameter can include these inputs in a JSON object:  - url: A string with the image URL to analyze. You can also include images in the **images_file** parameter. - classifier_ids: An array of classifier IDs to classify the images against. - owners: An array with the values IBM, me, or both to specify which classifiers to run. - threshold: A floating point value that specifies the minimum score a class must have to be displayed in the response.  For example: {"url": "...", "classifier_ids": ["...","..."], "owners": ["IBM", "me"], "threshold": 0.4}.
   * @param {string} [params.accept_language] - Specifies the language of the output class names.  Can be `en` (English), `ar` (Arabic), `de` (German), `es` (Spanish), `it` (Italian), `ja` (Japanese), or `ko` (Korean).  Classes for which no translation is available are omitted.  The response might not be in the specified language under these conditions: - English is returned when the requested language is not supported. - Classes are not returned when there is no translation for them. - Custom classifiers returned with this method return tags in the language of the custom classifier.
   * @param {string} [params.images_file_content_type] - The content type of images_file.
   * @param {Function} [callback] - The callback that handles the response.
   */
  classify(params?: VisualRecognitionV3.ClassifyParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.ClassifiedImages>): ReadableStream | void {
    params = params || {};
    if (typeof params === 'function' && !callback) {
      callback = params;
      params = {};
    }
    const formData = {
      images_file: helper.buildRequestFileObject({data: params.images_file, contentType: '"application/octet-stream"'}),
      parameters: params.parameters,
    };
    const parameters = {
      options: {
        url: '/v3/classify',
        method: 'POST',
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'multipart/form-data',
          'accept_language': params.accept_language
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Detect faces in an image.
   *
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {ReadableStream|Object|Uint8Array} [params.images_file] - An image file (.jpg, .png) or .zip file with images. Include no more than 15 images. You can also include images with the `url` property in the **parameters** object.  All faces are detected, but if there are more than 10 faces in an image, age and gender confidence scores might return scores of 0.
   * @param {string} [params.parameters] - A JSON string containing the image URL to analyze.   For example: {"url": "..."}.
   * @param {string} [params.images_file_content_type] - The content type of images_file.
   * @param {Function} [callback] - The callback that handles the response.
   */
  detectFaces(params?: VisualRecognitionV3.DetectFacesParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.DetectedFaces>): ReadableStream | void {
    params = params || {};
    if (typeof params === 'function' && !callback) {
      callback = params;
      params = {};
    }
    const formData = {
      images_file: helper.buildRequestFileObject({data: params.images_file, contentType: '"application/octet-stream"'}),
      parameters: params.parameters,
    };
    const parameters = {
      options: {
        url: '/v3/detect_faces',
        method: 'POST',
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'multipart/form-data'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /*************************
   * customClassifiers
   ************************/

  /**
   * Create a classifier.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.name - The name of the new classifier. Cannot contain special characters.
   * @param {ReadableStream|Object|Uint8Array} params.classname_positive_examples - A compressed (.zip) file of images that depict the visual subject for a class within the new classifier. Must contain a minimum of 10 images. The swagger limits you to training only one class. To train more classes, use the API functionality.
   * @param {ReadableStream|Object|Uint8Array} [params.negative_examples] - A compressed (.zip) file of images that do not depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images.
   * @param {Function} [callback] - The callback that handles the response.
   */
  createClassifier(params: VisualRecognitionV3.CreateClassifierParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifier>): ReadableStream | void {
    const requiredParams = ['name', 'classname_positive_examples'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const formData = {
      name: params.name,
      classname_positive_examples: helper.buildRequestFileObject({data: params.classname_positive_examples, contentType: 'application/octet-stream'}),
      negative_examples: helper.buildRequestFileObject({data: params.negative_examples, contentType: 'application/octet-stream'}),
    };
    const parameters = {
      options: {
        url: '/v3/classifiers',
        method: 'POST',
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'multipart/form-data'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Delete a custom classifier.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - The ID of the classifier.
   * @param {Function} [callback] - The callback that handles the response.
   */
  deleteClassifier(params: VisualRecognitionV3.DeleteClassifierParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Empty>): ReadableStream | void {
    const requiredParams = ['classifier_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { classifier_id: params.classifier_id };
    const parameters = {
      options: {
        url: '/v3/classifiers/{classifier_id}',
        method: 'DELETE',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Retrieve information about a custom classifier.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - The ID of the classifier.
   * @param {Function} [callback] - The callback that handles the response.
   */
  getClassifier(params: VisualRecognitionV3.GetClassifierParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifier>): ReadableStream | void {
    const requiredParams = ['classifier_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const path = { classifier_id: params.classifier_id };
    const parameters = {
      options: {
        url: '/v3/classifiers/{classifier_id}',
        method: 'GET',
        path: path,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Retrieve a list of custom classifiers.
   *
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {boolean} [params.verbose] - Specify true to return classifier details. Omit this parameter to return a brief list of classifiers.
   * @param {Function} [callback] - The callback that handles the response.
   */
  listClassifiers(params?: VisualRecognitionV3.ListClassifiersParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifiers>): ReadableStream | void {
    params = params || {};
    if (typeof params === 'function' && !callback) {
      callback = params;
      params = {};
    }
    const query = { verbose: params.verbose };
    const parameters = {
      options: {
        url: '/v3/classifiers',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

  /**
   * Update a classifier.
   *
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.classifier_id - The ID of the classifier.
   * @param {ReadableStream|Object|Uint8Array} [params.classname_positive_examples] - A compressed (.zip) file of images that depict the visual subject for a class within the classifier. Must contain a minimum of 10 images.
   * @param {ReadableStream|Object|Uint8Array} [params.negative_examples] - A compressed (.zip) file of images that do not depict the visual subject of any of the classes of the new classifier. Must contain a minimum of 10 images.
   * @param {Function} [callback] - The callback that handles the response.
   */
  updateClassifier(params: VisualRecognitionV3.UpdateClassifierParams, callback?: VisualRecognitionV3.Callback<VisualRecognitionV3.Classifier>): ReadableStream | void {
    const requiredParams = ['classifier_id'];
    const missingParams = helper.getMissingParams(params || {}, requiredParams);
    if (missingParams && callback) return callback(missingParams);
    const formData = {
      classname_positive_examples: helper.buildRequestFileObject({data: params.classname_positive_examples, contentType: 'application/octet-stream'}),
      negative_examples: helper.buildRequestFileObject({data: params.negative_examples, contentType: 'application/octet-stream'}),
    };
    const path = { classifier_id: params.classifier_id };
    const parameters = {
      options: {
        url: '/v3/classifiers/{classifier_id}',
        method: 'POST',
        path: path,
        formData: formData
      },
      defaultOptions: extend(true, this._options, {
        headers: {
          'accept': 'application/json',
          'content-type': 'multipart/form-data'
        }
      })
    };
    return requestFactory(parameters, callback);
  };

}

util.inherits(VisualRecognitionV3, BaseService);
VisualRecognitionV3.prototype.name = 'watson_vision_combined';
VisualRecognitionV3.prototype.version = 'v3';

/*************************
 * interfaces
 ************************/

namespace VisualRecognitionV3 {

  export interface Empty { }

  export type Callback<T> = (error: any, body?: T, response?: Request.RequestResponse) => void;

  export interface OptionsHeaders {
    headers?: {
      "X-Watson-Learning-Opt-Out"?: boolean
    }
  }

  export type Options =
    {
      version_date: string;
      headers?: OptionsHeaders;
      url?: string;
      username: string;
      password: string;
    } | {
      version_date: string;
      headers?: OptionsHeaders;
      url?: string;
      username?: string;
      password?: string;
      use_unauthenticated: true;
    }

  /*************************
   * request interfaces
   ************************/

  export interface ClassifyParams {
    images_file?: ReadableStream|Object|Uint8Array;
    parameters?: string;
    accept_language?: ClassifyConstants.AcceptLanguage | string;
    images_file_content_type?: string;
  }

  export namespace ClassifyConstants {
    export enum AcceptLanguage {
      EN = 'en',
      AR = 'ar',
      DE = 'de',
      ES = 'es',
      IT = 'it',
      JA = 'ja',
      KO = 'ko',
    }
  }

  export interface DetectFacesParams {
    images_file?: ReadableStream|Object|Uint8Array;
    parameters?: string;
    images_file_content_type?: string;
  }

  export interface CreateClassifierParams {
    name: string;
    classname_positive_examples: ReadableStream|Object|Uint8Array;
    negative_examples?: ReadableStream|Object|Uint8Array;
  }

  export interface DeleteClassifierParams {
    classifier_id: string;
  }

  export interface GetClassifierParams {
    classifier_id: string;
  }

  export interface ListClassifiersParams {
    verbose?: boolean;
  }

  export interface UpdateClassifierParams {
    classifier_id: string;
    classname_positive_examples?: ReadableStream|Object|Uint8Array;
    negative_examples?: ReadableStream|Object|Uint8Array;
  }

  /*************************
   * model interfaces
   ************************/

  export interface Class {
    class_name: string;
  }

  export interface ClassResult {
    class_name: string;
    score?: number;
    type_hierarchy?: string;
  }

  export interface ClassifiedImage {
    source_url?: string;
    resolved_url?: string;
    image?: string;
    error?: ErrorInfo;
    classifiers: ClassifierResult[];
  }

  export interface ClassifiedImages {
    images_processed?: number;
    images: ClassifiedImage[];
    warnings?: WarningInfo[];
  }

  export interface Classifier {
    classifier_id: string;
    name: string;
    owner?: string;
    status?: string;
    explanation?: string;
    created?: string;
    classes?: Class[];
  }

  export interface ClassifierResult {
    name: string;
    classifier_id: string;
    classes: ClassResult[];
  }

  export interface Classifiers {
    classifiers: Classifier[];
  }

  export interface DetectedFaces {
    images_processed?: number;
    images: ImageWithFaces[];
    warnings?: WarningInfo[];
  }

  export interface ErrorInfo {
    error_id: string;
    description: string;
  }

  export interface Face {
    age?: FaceAge;
    gender?: FaceGender;
    face_location?: FaceLocation;
    identity?: FaceIdentity;
  }

  export interface FaceAge {
    min?: number;
    max?: number;
    score?: number;
  }

  export interface FaceGender {
    gender: string;
    score?: number;
  }

  export interface FaceIdentity {
    name: string;
    score?: number;
    type_hierarchy?: string;
  }

  export interface FaceLocation {
    width: number;
    height: number;
    left: number;
    top: number;
  }

  export interface ImageWithFaces {
    faces: Face[];
    image?: string;
    source_url?: string;
    resolved_url?: string;
    error?: ErrorInfo;
  }

  export interface WarningInfo {
    warning_id: string;
    description: string;
  }

}

export = VisualRecognitionV3;

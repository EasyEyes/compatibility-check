import platform from "platform";

export class ExperimentPeer {
  /**
   * @param {Object} params
   * @param {Function} params.onData      - optional callback whenever we get a data message
   * @param {Function} params.onHandshake - optional callback after the phone handshake
   * @param {Function} params.onResults   - optional callback after the phone sends results
   * @param {String}   params.text        - text to show on phone
   * @param {Number}   params.timeout     - how long to allow phone to do the checks
   * @param {Boolean}  params.onErrorInputForPhone - if you want to pass an "UpdateErrorMessage" object
   */
  constructor({
    onData,
    onHandshake,
    onResults,
    text,
    timeout,
    onErrorInputForPhone,
  }) {
    // Store for later usage
    this.name = "CompatibilityPeer";
    this.onData = onData;
    this.onHandshake = onHandshake;
    this.onResults = onResults;
    this.text = text || "Connecting...";
    this.timeout = timeout || 20; // seconds
    this.onErrorInputForPhone = onErrorInputForPhone;

    // We'll use a Promise to resolve the final results from the phone
    this._resultsPromise = null;
    this._resolveResults = null;
  }

  /**
   * This method is required for the CCM to dispatch
   * incoming phone messages to this submodule.
   *
   * @param {any} data – The data object from phone
   * @param {CentralConnectionManager} manager – The CCM instance
   */
  onMessage(data, manager) {
    if (!data || !data.message) return;

    // optional: let parent know we received some data
    this.onData?.(data);

    switch (data.message) {
      case "Handshake":
        console.log("CompatibilityCheckReceiver: Handshake received");
        // Send the text + begin commands right here
        manager.send({ message: "Text", text: this.text, name: this.name });
        manager.send({
          message: "Begin",
          timeout: this.timeout,
          name: this.name,
        });
        if (this.onErrorInputForPhone) {
          manager.send({
            message: "UpdateErrorMessage",
            onErrorInput: this.onErrorInputForPhone,
            name: this.name,
          });
        }
        this.onHandshake?.();
        break;

      case "Results":
        console.log("CompatibilityCheckReceiver: Results received");
        // The phone finished its checks
        const results = data.results;
        this.onResults?.(results);

        // Also resolve our promise-based approach
        if (this._resolveResults) {
          this._resolveResults(results);
          this._resolveResults = null;
        }
        break;

      default:
        console.log("CompatibilityCheckReceiver: Unknown message:", data);
    }
  }

  /**
   * Sends the Begin command to start compatibility checks and returns a promise
   * that resolves with the results when complete
   *
   * @param {CentralConnectionManager} manager - The connection manager instance
   * @returns {Promise<any>} Promise that resolves with the test results
   */
  beginChecksAndGetResults(manager) {
    if (!manager) {
      throw new Error("Connection manager is required to begin checks");
    }

    // Reset results promise if needed
    this._resultsPromise = null;

    // Send the begin command to start the tests
    manager.send({
      message: "Begin",
      timeout: this.timeout,
      name: this.name,
    });
    manager.send({ message: "Text", text: this.text, name: this.name });

    // Return the promise that will resolve with results
    return this.getResults();
  }

  /**
   * a promise that resolves when the phone
   * eventually sends the "Results" message, call this:
   *
   * @returns {Promise<any>} resolves with the phone's results object
   */
  getResults() {
    if (!this._resultsPromise) {
      this._resultsPromise = new Promise((resolve) => {
        this._resolveResults = resolve;
      });
    }
    return this._resultsPromise;
  }
}

export class PhonePeer {
  constructor() {
    this.startTime = Date.now();
    this.name = "CompatibilityPeer";
    this.connectionManager = null;
  }

  identifyBrowser = async () => {
    // //temp: wait for 10 seconds
    // await new Promise((resolve) => setTimeout(resolve, 10000));

    const browserInfo = {
      browser: platform.name,
      browserVersion: platform.version,
      os: platform.os?.family,
      osVersion: platform.os?.version,
    };
    return browserInfo;
  };

  identifyDevice = async () => {
    // //temp: wait for 10 seconds
    // await new Promise((resolve) => setTimeout(resolve, 10000));

    const deviceInfo = {};
    fod.complete(function (data) {
      deviceInfo["IsMobile"] = data.device["ismobile"];
      deviceInfo["HardwareName"] = data.device["hardwarename"];
      deviceInfo["HardwareFamily"] = data.device["hardwarefamily"];
      deviceInfo["HardwareModel"] = data.device["hardwaremodel"];
      deviceInfo["OEM"] = data.device["oem"];
      deviceInfo["HardwareModelVariants"] =
        data.device["hardwaremodelvariants"];
      deviceInfo["DeviceId"] = data.device["deviceid"];
      deviceInfo["PlatformName"] = data.device["platformname"];
      deviceInfo["PlatformVersion"] = data.device["platformversion"];
      deviceInfo["DeviceType"] = data.device["devicetype"];
    });
    return deviceInfo;
  };

  testNeededAPIs = async () => {
    //needed APIs: getUserMedia (audio),
    const result = {
      getUserMedia: false,
      getUserMediaError: null,
    };

    try {
      const constraints = {
        autoGainControl: false,
        noiseSuppression: false,
        echoCancellation: false,
        channelCount: 1,
      };
      //check if getUserMedia is supported
      await navigator.mediaDevices.getUserMedia({
        audio: constraints,
      });
      result.getUserMedia = true;
    } catch (err) {
      result.getUserMedia = false;
      result.getUserMediaError = err.message;
    }

    return result;
  };

  startTests = async (t, phonePeer) => {
    // Create a timeout promise
    const timeout = (seconds) =>
      new Promise((_, reject) => {
        setTimeout(() => reject({ timeoutError: true }), seconds * 1000);
      });

    // Helper to wrap promise with error details
    const wrapPromise = async (promise, name) => {
      try {
        return { result: await promise, error: null };
      } catch (err) {
        return { result: null, error: { message: err.message, name: name } };
      }
    };

    // Create individual promises that include timeout
    const devicePromise = Promise.race([
      wrapPromise(this.identifyDevice(), "deviceDetails"),
      timeout(t),
    ]).catch((err) => ({
      result: null,
      error: {
        message: err.timeoutError
          ? "Timeout reached"
          : err.message || String(err),
        name: err.timeoutError ? "timeout" : "error",
      },
    }));

    const browserPromise = Promise.race([
      wrapPromise(this.identifyBrowser(), "browserDetails"),
      timeout(t),
    ]).catch((err) => ({
      result: null,
      error: {
        message: err.timeoutError
          ? "Timeout reached"
          : err.message || String(err),
        name: err.timeoutError ? "timeout" : "error",
      },
    }));

    const neededAPIs = await this.testNeededAPIs();

    // Run promises independently
    const [deviceResult, browserResult] = await Promise.all([
      devicePromise,
      browserPromise,
    ]);

    const webAudioDeviceNames = { microphone: "" };
    const screenSizes = {
      width: screen.width,
      height: screen.height,
    };

    let resultsFromRunningThoseCompatibilityChecks = {
      deviceDetails: {
        data: deviceResult.result,
        error: deviceResult.error,
      },
      webAudioDeviceNames: webAudioDeviceNames,
      screenSizes: screenSizes,
      browserDetails: {
        data: browserResult.result,
        error: browserResult.error,
      },
      neededAPIs: neededAPIs,
    };

    phonePeer.send({
      message: "Results",
      results: resultsFromRunningThoseCompatibilityChecks,
      name: this.name,
    });
  };

  onMessage = (data, manager) => {
    if (!data || !data.message) return;
    console.log("Compatibility module received data:", data);

    switch (data.message) {
      case "Begin":
        this.startTests(data.timeout, manager);
        break;
      case "UpdateErrorMessage":
        this.onErrorInput = data.onErrorInput;
        break;
      case "Text":
        this.text = data.text;
        this.showConnectingMessage();
        break;
      default:
        console.log("Unknown message type:", data.message);
    }
  };

  register = (connectionManager) => {
    this.connectionManager = connectionManager;
  };

  showConnectingMessage = () => {
    if (this.text) {
      // document.body.innerHTML = `<h1>${this.text}</h1>`;
      const target = document.getElementById("target");
      if (target) {
        target.innerText = this.text;
      }
    }
  };
}

/*
 * The MIT License (MIT)
 * Copyright (c) 2012 Ryan Day
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import Peer from "peerjs";
import platform from "platform";
class P {
  constructor() {
    // this.compatabilityCheckEndpointURL = "https://cdn.jsdelivr.net/gh/EasyEyes/compatibility-check/";
    this.compatabilityCheckEndpointURL = "https://peer.easyeyes.app?";
    this.conn = null;
    this.lastPeerId = null;

    // In case we need a pop of sound
    this.keypressFeedbackSound =
      "data:audio/mpeg;base64,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";
    this.pressFeedback = new Audio(this.keypressFeedbackSound);
  }

  initializePeer = async () => {
    /* Create the Peer object for our end of the connection. */
    const id = await this.generateTimeBasedPeerID();
    this.peer = new Peer(id, {
      debug: 2,
      host: "easyeyes-peer-server.herokuapp.com",
      port: 443,
      secure: true,
      config: {
        iceServers: [
          {
            urls: "stun:stun.relay.metered.ca:80",
          },
          {
            urls: "turn:global.relay.metered.ca:80",
            username: "de884cfc34189cdf1a5dd616",
            credential: "IcOpouU9/TYBmpHU",
          },
          {
            urls: "turn:global.relay.metered.ca:80?transport=tcp",
            username: "de884cfc34189cdf1a5dd616",
            credential: "IcOpouU9/TYBmpHU",
          },
          {
            urls: "turn:global.relay.metered.ca:443",
            username: "de884cfc34189cdf1a5dd616",
            credential: "IcOpouU9/TYBmpHU",
          },
          {
            urls: "turns:global.relay.metered.ca:443?transport=tcp",
            username: "de884cfc34189cdf1a5dd616",
            credential: "IcOpouU9/TYBmpHU",
          },
        ],
      },
    });
    console.log("this.peer in super", this.peer);
  };

  generateTimeBasedPeerID = async () => {
    const now = new Date().getTime();
    const randomBuffer = new Uint8Array(10);
    crypto.getRandomValues(randomBuffer);
    const randomPart = Array.from(randomBuffer)
      .map((b) => b.toString(36))
      .join("");
    const toHash = `${now}-${randomPart}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(toHash);
    const hash = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hash)); // Convert buffer to byte array
    const hashString = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const shortHash = hashString.substring(0, 12); // Use more of the hash for a longer ID
    //   return shortHash; // Consider converting this to Base62
    return this.encodeBase62(parseInt(shortHash, 16));
  };

  encodeBase62 = (num) => {
    const base = 26;
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    while (num > 0) {
      result = characters[num % base] + result;
      num = Math.floor(num / base);
    }

    return result || "a";
  };

  onPeerDisconnected = () => {
    console.log("Connection lost. Please refresh to try reconnecting.");
    // Workaround for peer.reconnect deleting previous id
    // this.peer.id = this.lastPeerId;
    // this.peer._lastServerId = this.lastPeerId;
    // this.peer.reconnect();
  };
  onPeerClose = () => {
    console.log("Connection closed");
    this.conn = null;
  };
  onPeerError = (err) => {
    // alert("" + err);
  };
  queryStringFromObject = (params) => {
    return Object.keys(params)
      .map((key) => key + "=" + encodeURIComponent(params[key]))
      .join("&");
  };
}

export class ExperimentPeer extends P {
  // EasyEyes-side customizable additional behavior for various events
  constructor({
    onOpen,
    onData,
    onHandshake,
    onConnection,
    onClose,
    onError,
    text,
    timeout,
    onErrorInputForPhone = false,
  }) {
    super();
    this.text = text;
    this.timeout = timeout;
    this.onOpen = (id) => {
      this.onPeerOpen(id);
      onOpen?.(id);
    };
    this.onData = (data) => {
      console.log("DATA", data);
      onData?.(data);
    };
    // Once we've received our first message from the phone
    this.onHandshake = () => {
      console.log("HANDSHAKE complete.");
      // Tell the phone to initiate running the payload code
      this.conn.send({ message: "Text", text: this.text });
      this.conn.send({ message: "Begin", timeout: this.timeout });
      if (onErrorInputForPhone) {
        this.conn.send({
          message: "UpdateErrorMessage",
          onErrorInput: onErrorInputForPhone,
        });
      }
      onHandshake?.();
    };
    // Set this.conn, our connection with the phone peer
    this.onConnection = (connection) => {
      this.onPeerConnection(connection);
      onConnection?.(connection);
    };
    this.onClose = () => {
      this.onPeerClose();
      onClose?.();
    };
    this.onError = (err) => {
      this.onPeerError(err);
      onError?.(err);
    };
  }
  init = async () => {
    await this.initializePeer();
    console.log("This peer in ExperimentPeer constructor", this.peer);

    /* Set up callbacks that handle any events related to our peer object. */
    this.peer.on("open", this.onPeerOpen); // On creation of Experiment (local) Peer object
    this.peer.on("connection", this.onConnection); // On connection with Phone (remote) Peer object
    this.peer.on("disconnected", this.onPeerDisconnected);
    this.peer.on("close", this.onClose);
    this.peer.on("error", this.onError);
  };
  onPeerOpen = (id) => {
    // Workaround for peer.reconnect deleting previous id
    if (this.peer.id === null) {
      console.log("Received null id from peer open"); // DEBUG
      this.peer.id = this.lastPeerId;
    } else {
      this.lastPeerId = this.peer.id;
    }

    const params = { peer: this.peer.id };

    let queryString = this.queryStringFromObject(params);
    const uri = this.compatabilityCheckEndpointURL + queryString;
    this.qrURL = uri;

    // Display QR code for the participant to scan
    const qrCanvas = document.createElement("canvas");

    QRCode.toCanvas(qrCanvas, uri, function (error) {
      if (error) console.error("Error in QRCode.toCanvas", error);
    });

    // Store encoding of QR code, eg to use as an image source
    this.qrURI = qrCanvas.toDataURL();

    console.log("Peer reachable at: ", this.qrURL);
  };

  getQRLink = async () => {
    return this.qrURL;
  };

  getQRCodeElem = async () => {
    const waitALittle = async (time = 250) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    };
    const qrImage = new Image();
    qrImage.setAttribute("id", "compatibilityCheckQRImage");
    qrImage.style.zIndex = Infinity;
    qrImage.style.minWidth = 400;
    qrImage.style.minHeight = 400;
    qrImage.style.aspectRatio = 1;
    while (!this.qrURI) {
      await waitALittle(10);
    }
    qrImage.src = this.qrURI;
    // console.log("qrImage", qrImage);
    return qrImage;
  };
  onPeerConnection = (connection) => {
    // Allow only a single connection
    if (this.conn && this.conn.open) {
      connection.on("open", function () {
        connection.send({
          message: "Rejected",
          info: "Already connected to another client",
        });
        setTimeout(function () {
          connection.close();
        }, 500);
      });
      return;
    }
    this.conn = connection;
    console.log("Connection: ", connection);
    this.#ready();
  };
  getResults = async () => {
    return new Promise((resolve, reject) => {
      // handle the case if this.conn is null (we need to wait for the connection to be established)
      if (!this.conn) {
        this.peer.on("connection", (connection) => {
          this.onPeerConnection(connection);
          this.conn.on("data", (data) => {
            switch (data.message) {
              case "Handshake":
                this.onHandshake();
                break;
              case "Results":
                // The phone has finished running the payload, and has responded with the results
                const results = data.results;
                // TODO save/interpret/return the results
                resolve(results);
                break;
              default:
                console.log(`Message type: ${data.message}. Data: ${data}`);
            }
          });
        });
      } else {
        this.conn.on("data", (data) => {
          console.log("Received data: ", data);
          switch (data.message) {
            case "Handshake":
              this.onHandshake();
              break;
            case "Results":
              // The phone has finished running the payload, and has responded with the results
              const results = data.results;
              // TODO save/interpret/return the results
              resolve(results);
              break;
            default:
              console.log(`Message type: ${data.message}. Data: ${data}`);
          }
        });
      }
    });
  };
  #ready = () => {
    /*
     * Triggered once a connection has been achieved.
     * Defines callbacks to handle incoming data and connection events.
     */
    // Handle the various message types we might receive from the phone
    // ===== Handled inside getResults() =====
    // this.conn.on("data", (data) => {
    //   // data = JSON.parse(data);
    //   console.log("Received data: ", data);
    //   switch (data.message) {
    //     case "Handshake":
    //       this.onHandshake();
    //       break;
    //     case "Results":
    //       // The phone has finished running the payload, and has responded with the results
    //       const results = data.results;
    //     // TODO save/interpret/return the results
    //     default:
    //       console.log(`Message type: ${data.message}. Data: ${data}`);
    //   }
    // });
    this.conn.on("close", () => {
      this.onClose();
      // this.displayUpdate("Connection reset. Awaiting connection...");
      this.conn = null;
    });
  };
}

export class PhonePeer extends P {
  constructor({ onError }) {
    super();

    this.startTime = Date.now();
    this.text = "Connecting...";
    // Get the ID for the computer peer, to which we will connect
    this.receiverPeerId = new URLSearchParams(window.location.search).get(
      "peer"
    );
    console.log("receiverPeerId", this.receiverPeerId);

    this.onErrorInput = onError;

    this.#showConnectingMessage();
  }

  init = async () => {
    await this.initializePeer();
    this.peer.on("open", this.#onPeerOpen);
    this.peer.on("connection", this.#disallowIncomingConnections);
    this.peer.on("disconnected", this.onPeerDisconnected);
    this.peer.on("close", this.onPeerClose);
    this.peer.on("error", this.onError);
  };

  onError = (err) => {
    this.onPeerError(err);
    // onError?.(err);
    this.onErrorInput?.(err);
  };

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
      const contraints = {
        autoGainControl: false,
        noiseSuppression: false,
        echoCancellation: false,
        channelCount: 1,
      };
      //check if getUserMedia is supported
      await navigator.mediaDevices.getUserMedia({
        audio: contraints,
      });
      result.getUserMedia = true;
    } catch (err) {
      result.getUserMedia = false;
      result.getUserMediaError = err.message;
    }

    return result;
  };

  doStuff = async (t) => {
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

    this.conn.send({
      message: "Results",
      results: resultsFromRunningThoseCompatibilityChecks,
    });

    this.#showConnectingMessage();
  };

  /**
   * Create the connection between the two Peers.
   * Sets up callbacks that handle any events related to the
   * connection and data received on it.
   */
  #join = () => {
    // Close old connection
    if (this.conn) this.conn.close();
    // Create connection to destination peer specified by the query param
    this.conn = this.peer.connect(this.receiverPeerId, { reliable: true });
    // Send `Handshake` message to computer, to confirm that a messaging channel has been opened
    this.conn.on("open", this.#initiateHandshake);
    // Handle incoming data
    this.conn.on("data", this.#onConnData);
    // TODO figure out how to re-establish connection, or have more robust connection
    this.conn.on("close", () => console.log("Connection closed"));
  };
  #onConnData = (data) => {
    console.log("Data received: ", data);
    // data = JSON.parse(data);
    switch (data.message) {
      case "Begin":
        this.doStuff(data.timeout);
        break;
      case "UpdateErrorMessage":
        try {
          this.onErrorInput = data.onErrorInput;
        } catch (err) {
          console.log("Error updating error message: ", err);
        }
        break;
      case "Text":
        this.text = data.text;

        break;
      default:
        console.log("Message type: ", data.message);
    }
  };
  #initiateHandshake = () => {
    this.conn.send({ message: "Handshake" });
  };
  #showConnectingMessage = () => {
    document.body.innerHTML = `<h1>${this.text}</h1>`;
  };
  #onPeerOpen = (id) => {
    // Workaround for peer.reconnect deleting previous id
    if (this.peer.id === null) {
      console.log("Received null id from peer open");
      this.peer.id = this.lastPeerId;
    } else {
      this.lastPeerId = this.peer.id;
    }
    this.#join();
  };
  #disallowIncomingConnections(connection) {
    connection.on("open", function () {
      connection.send({
        message: "Rejected",
        info: "Sender does not accept incoming connections",
      });
      setTimeout(function () {
        connection.close();
      }, 500);
    });
  }
}

var QRCode = (function (t) {
  "use strict";
  var r,
    e = function () {
      return (
        "function" == typeof Promise &&
        Promise.prototype &&
        Promise.prototype.then
      );
    },
    n = [
      0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581, 655,
      733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828, 1921,
      2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532, 3706,
    ],
    o = function (t) {
      if (!t) throw new Error('"version" cannot be null or undefined');
      if (t < 1 || t > 40)
        throw new Error('"version" should be in range from 1 to 40');
      return 4 * t + 17;
    },
    a = function (t) {
      return n[t];
    },
    i = function (t) {
      for (var r = 0; 0 !== t; ) r++, (t >>>= 1);
      return r;
    },
    u = function (t) {
      if ("function" != typeof t)
        throw new Error('"toSJISFunc" is not a valid function.');
      r = t;
    },
    s = function () {
      return void 0 !== r;
    },
    f = function (t) {
      return r(t);
    };
  function h(t, r) {
    return t((r = { exports: {} }), r.exports), r.exports;
  }
  var c = h(function (t, r) {
    (r.L = { bit: 1 }),
      (r.M = { bit: 0 }),
      (r.Q = { bit: 3 }),
      (r.H = { bit: 2 }),
      (r.isValid = function (t) {
        return t && void 0 !== t.bit && t.bit >= 0 && t.bit < 4;
      }),
      (r.from = function (t, e) {
        if (r.isValid(t)) return t;
        try {
          return (function (t) {
            if ("string" != typeof t) throw new Error("Param is not a string");
            switch (t.toLowerCase()) {
              case "l":
              case "low":
                return r.L;
              case "m":
              case "medium":
                return r.M;
              case "q":
              case "quartile":
                return r.Q;
              case "h":
              case "high":
                return r.H;
              default:
                throw new Error("Unknown EC Level: " + t);
            }
          })(t);
        } catch (t) {
          return e;
        }
      });
  });
  function g() {
    (this.buffer = []), (this.length = 0);
  }
  c.L,
    c.M,
    c.Q,
    c.H,
    c.isValid,
    (g.prototype = {
      get: function (t) {
        var r = Math.floor(t / 8);
        return 1 == ((this.buffer[r] >>> (7 - (t % 8))) & 1);
      },
      put: function (t, r) {
        for (var e = 0; e < r; e++) this.putBit(1 == ((t >>> (r - e - 1)) & 1));
      },
      getLengthInBits: function () {
        return this.length;
      },
      putBit: function (t) {
        var r = Math.floor(this.length / 8);
        this.buffer.length <= r && this.buffer.push(0),
          t && (this.buffer[r] |= 128 >>> this.length % 8),
          this.length++;
      },
    });
  var d = g;
  function l(t) {
    if (!t || t < 1)
      throw new Error("BitMatrix size must be defined and greater than 0");
    (this.size = t),
      (this.data = new Uint8Array(t * t)),
      (this.reservedBit = new Uint8Array(t * t));
  }
  (l.prototype.set = function (t, r, e, n) {
    var o = t * this.size + r;
    (this.data[o] = e), n && (this.reservedBit[o] = !0);
  }),
    (l.prototype.get = function (t, r) {
      return this.data[t * this.size + r];
    }),
    (l.prototype.xor = function (t, r, e) {
      this.data[t * this.size + r] ^= e;
    }),
    (l.prototype.isReserved = function (t, r) {
      return this.reservedBit[t * this.size + r];
    });
  var v = l,
    p = h(function (t, r) {
      var e = o;
      (r.getRowColCoords = function (t) {
        if (1 === t) return [];
        for (
          var r = Math.floor(t / 7) + 2,
            n = e(t),
            o = 145 === n ? 26 : 2 * Math.ceil((n - 13) / (2 * r - 2)),
            a = [n - 7],
            i = 1;
          i < r - 1;
          i++
        )
          a[i] = a[i - 1] - o;
        return a.push(6), a.reverse();
      }),
        (r.getPositions = function (t) {
          for (
            var e = [], n = r.getRowColCoords(t), o = n.length, a = 0;
            a < o;
            a++
          )
            for (var i = 0; i < o; i++)
              (0 === a && 0 === i) ||
                (0 === a && i === o - 1) ||
                (a === o - 1 && 0 === i) ||
                e.push([n[a], n[i]]);
          return e;
        });
    });
  p.getRowColCoords, p.getPositions;
  var w = o,
    m = function (t) {
      var r = w(t);
      return [
        [0, 0],
        [r - 7, 0],
        [0, r - 7],
      ];
    },
    E = h(function (t, r) {
      r.Patterns = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7,
      };
      var e = 3,
        n = 3,
        o = 40,
        a = 10;
      function i(t, e, n) {
        switch (t) {
          case r.Patterns.PATTERN000:
            return (e + n) % 2 == 0;
          case r.Patterns.PATTERN001:
            return e % 2 == 0;
          case r.Patterns.PATTERN010:
            return n % 3 == 0;
          case r.Patterns.PATTERN011:
            return (e + n) % 3 == 0;
          case r.Patterns.PATTERN100:
            return (Math.floor(e / 2) + Math.floor(n / 3)) % 2 == 0;
          case r.Patterns.PATTERN101:
            return ((e * n) % 2) + ((e * n) % 3) == 0;
          case r.Patterns.PATTERN110:
            return (((e * n) % 2) + ((e * n) % 3)) % 2 == 0;
          case r.Patterns.PATTERN111:
            return (((e * n) % 3) + ((e + n) % 2)) % 2 == 0;
          default:
            throw new Error("bad maskPattern:" + t);
        }
      }
      (r.isValid = function (t) {
        return null != t && "" !== t && !isNaN(t) && t >= 0 && t <= 7;
      }),
        (r.from = function (t) {
          return r.isValid(t) ? parseInt(t, 10) : void 0;
        }),
        (r.getPenaltyN1 = function (t) {
          for (
            var r = t.size, n = 0, o = 0, a = 0, i = null, u = null, s = 0;
            s < r;
            s++
          ) {
            (o = a = 0), (i = u = null);
            for (var f = 0; f < r; f++) {
              var h = t.get(s, f);
              h === i ? o++ : (o >= 5 && (n += e + (o - 5)), (i = h), (o = 1)),
                (h = t.get(f, s)) === u
                  ? a++
                  : (a >= 5 && (n += e + (a - 5)), (u = h), (a = 1));
            }
            o >= 5 && (n += e + (o - 5)), a >= 5 && (n += e + (a - 5));
          }
          return n;
        }),
        (r.getPenaltyN2 = function (t) {
          for (var r = t.size, e = 0, o = 0; o < r - 1; o++)
            for (var a = 0; a < r - 1; a++) {
              var i =
                t.get(o, a) +
                t.get(o, a + 1) +
                t.get(o + 1, a) +
                t.get(o + 1, a + 1);
              (4 !== i && 0 !== i) || e++;
            }
          return e * n;
        }),
        (r.getPenaltyN3 = function (t) {
          for (var r = t.size, e = 0, n = 0, a = 0, i = 0; i < r; i++) {
            n = a = 0;
            for (var u = 0; u < r; u++)
              (n = ((n << 1) & 2047) | t.get(i, u)),
                u >= 10 && (1488 === n || 93 === n) && e++,
                (a = ((a << 1) & 2047) | t.get(u, i)),
                u >= 10 && (1488 === a || 93 === a) && e++;
          }
          return e * o;
        }),
        (r.getPenaltyN4 = function (t) {
          for (var r = 0, e = t.data.length, n = 0; n < e; n++) r += t.data[n];
          return Math.abs(Math.ceil((100 * r) / e / 5) - 10) * a;
        }),
        (r.applyMask = function (t, r) {
          for (var e = r.size, n = 0; n < e; n++)
            for (var o = 0; o < e; o++)
              r.isReserved(o, n) || r.xor(o, n, i(t, o, n));
        }),
        (r.getBestMask = function (t, e) {
          for (
            var n = Object.keys(r.Patterns).length, o = 0, a = 1 / 0, i = 0;
            i < n;
            i++
          ) {
            e(i), r.applyMask(i, t);
            var u =
              r.getPenaltyN1(t) +
              r.getPenaltyN2(t) +
              r.getPenaltyN3(t) +
              r.getPenaltyN4(t);
            r.applyMask(i, t), u < a && ((a = u), (o = i));
          }
          return o;
        });
    });
  E.Patterns,
    E.isValid,
    E.getPenaltyN1,
    E.getPenaltyN2,
    E.getPenaltyN3,
    E.getPenaltyN4,
    E.applyMask,
    E.getBestMask;
  var y = [
      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4, 2,
      4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10, 11, 4,
      9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16, 19, 6,
      13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17, 23, 34, 9,
      18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37, 12, 25, 34,
      40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31, 43, 51, 17,
      33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63, 20, 40, 56,
      66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49, 68, 81,
    ],
    A = [
      7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48, 72,
      88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110, 160,
      192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104, 198,
      288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408, 480, 168,
      308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224, 416, 600, 700,
      224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750, 900, 300, 560, 810,
      960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360, 700, 1020, 1200, 390,
      728, 1050, 1260, 420, 784, 1140, 1350, 450, 812, 1200, 1440, 480, 868,
      1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440, 1710, 570, 1036, 1530,
      1800, 570, 1064, 1590, 1890, 600, 1120, 1680, 1980, 630, 1204, 1770, 2100,
      660, 1260, 1860, 2220, 720, 1316, 1950, 2310, 750, 1372, 2040, 2430,
    ],
    I = function (t, r) {
      switch (r) {
        case c.L:
          return y[4 * (t - 1) + 0];
        case c.M:
          return y[4 * (t - 1) + 1];
        case c.Q:
          return y[4 * (t - 1) + 2];
        case c.H:
          return y[4 * (t - 1) + 3];
        default:
          return;
      }
    },
    M = function (t, r) {
      switch (r) {
        case c.L:
          return A[4 * (t - 1) + 0];
        case c.M:
          return A[4 * (t - 1) + 1];
        case c.Q:
          return A[4 * (t - 1) + 2];
        case c.H:
          return A[4 * (t - 1) + 3];
        default:
          return;
      }
    },
    N = new Uint8Array(512),
    B = new Uint8Array(256);
  !(function () {
    for (var t = 1, r = 0; r < 255; r++)
      (N[r] = t), (B[t] = r), 256 & (t <<= 1) && (t ^= 285);
    for (var e = 255; e < 512; e++) N[e] = N[e - 255];
  })();
  var C = function (t) {
      return N[t];
    },
    P = function (t, r) {
      return 0 === t || 0 === r ? 0 : N[B[t] + B[r]];
    },
    R = h(function (t, r) {
      (r.mul = function (t, r) {
        for (
          var e = new Uint8Array(t.length + r.length - 1), n = 0;
          n < t.length;
          n++
        )
          for (var o = 0; o < r.length; o++) e[n + o] ^= P(t[n], r[o]);
        return e;
      }),
        (r.mod = function (t, r) {
          for (var e = new Uint8Array(t); e.length - r.length >= 0; ) {
            for (var n = e[0], o = 0; o < r.length; o++) e[o] ^= P(r[o], n);
            for (var a = 0; a < e.length && 0 === e[a]; ) a++;
            e = e.slice(a);
          }
          return e;
        }),
        (r.generateECPolynomial = function (t) {
          for (var e = new Uint8Array([1]), n = 0; n < t; n++)
            e = r.mul(e, new Uint8Array([1, C(n)]));
          return e;
        });
    });
  function T(t) {
    (this.genPoly = void 0),
      (this.degree = t),
      this.degree && this.initialize(this.degree);
  }
  R.mul,
    R.mod,
    R.generateECPolynomial,
    (T.prototype.initialize = function (t) {
      (this.degree = t), (this.genPoly = R.generateECPolynomial(this.degree));
    }),
    (T.prototype.encode = function (t) {
      if (!this.genPoly) throw new Error("Encoder not initialized");
      var r = new Uint8Array(t.length + this.degree);
      r.set(t);
      var e = R.mod(r, this.genPoly),
        n = this.degree - e.length;
      if (n > 0) {
        var o = new Uint8Array(this.degree);
        return o.set(e, n), o;
      }
      return e;
    });
  var L = T,
    b = function (t) {
      return !isNaN(t) && t >= 1 && t <= 40;
    },
    U =
      "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+",
    x =
      "(?:(?![A-Z0-9 $%*+\\-./:]|" +
      (U = U.replace(/u/g, "\\u")) +
      ")(?:.|[\r\n]))+",
    k = new RegExp(U, "g"),
    F = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"),
    S = new RegExp(x, "g"),
    D = new RegExp("[0-9]+", "g"),
    Y = new RegExp("[A-Z $%*+\\-./:]+", "g"),
    _ = new RegExp("^" + U + "$"),
    z = new RegExp("^[0-9]+$"),
    H = new RegExp("^[A-Z0-9 $%*+\\-./:]+$"),
    J = {
      KANJI: k,
      BYTE_KANJI: F,
      BYTE: S,
      NUMERIC: D,
      ALPHANUMERIC: Y,
      testKanji: function (t) {
        return _.test(t);
      },
      testNumeric: function (t) {
        return z.test(t);
      },
      testAlphanumeric: function (t) {
        return H.test(t);
      },
    },
    K = h(function (t, r) {
      (r.NUMERIC = { id: "Numeric", bit: 1, ccBits: [10, 12, 14] }),
        (r.ALPHANUMERIC = { id: "Alphanumeric", bit: 2, ccBits: [9, 11, 13] }),
        (r.BYTE = { id: "Byte", bit: 4, ccBits: [8, 16, 16] }),
        (r.KANJI = { id: "Kanji", bit: 8, ccBits: [8, 10, 12] }),
        (r.MIXED = { bit: -1 }),
        (r.getCharCountIndicator = function (t, r) {
          if (!t.ccBits) throw new Error("Invalid mode: " + t);
          if (!b(r)) throw new Error("Invalid version: " + r);
          return r >= 1 && r < 10
            ? t.ccBits[0]
            : r < 27
            ? t.ccBits[1]
            : t.ccBits[2];
        }),
        (r.getBestModeForData = function (t) {
          return J.testNumeric(t)
            ? r.NUMERIC
            : J.testAlphanumeric(t)
            ? r.ALPHANUMERIC
            : J.testKanji(t)
            ? r.KANJI
            : r.BYTE;
        }),
        (r.toString = function (t) {
          if (t && t.id) return t.id;
          throw new Error("Invalid mode");
        }),
        (r.isValid = function (t) {
          return t && t.bit && t.ccBits;
        }),
        (r.from = function (t, e) {
          if (r.isValid(t)) return t;
          try {
            return (function (t) {
              if ("string" != typeof t)
                throw new Error("Param is not a string");
              switch (t.toLowerCase()) {
                case "numeric":
                  return r.NUMERIC;
                case "alphanumeric":
                  return r.ALPHANUMERIC;
                case "kanji":
                  return r.KANJI;
                case "byte":
                  return r.BYTE;
                default:
                  throw new Error("Unknown mode: " + t);
              }
            })(t);
          } catch (t) {
            return e;
          }
        });
    });
  K.NUMERIC,
    K.ALPHANUMERIC,
    K.BYTE,
    K.KANJI,
    K.MIXED,
    K.getCharCountIndicator,
    K.getBestModeForData,
    K.isValid;
  var O = h(function (t, r) {
    var e = i(7973);
    function n(t, r) {
      return K.getCharCountIndicator(t, r) + 4;
    }
    function o(t, r) {
      var e = 0;
      return (
        t.forEach(function (t) {
          var o = n(t.mode, r);
          e += o + t.getBitsLength();
        }),
        e
      );
    }
    (r.from = function (t, r) {
      return b(t) ? parseInt(t, 10) : r;
    }),
      (r.getCapacity = function (t, r, e) {
        if (!b(t)) throw new Error("Invalid QR Code version");
        void 0 === e && (e = K.BYTE);
        var o = 8 * (a(t) - M(t, r));
        if (e === K.MIXED) return o;
        var i = o - n(e, t);
        switch (e) {
          case K.NUMERIC:
            return Math.floor((i / 10) * 3);
          case K.ALPHANUMERIC:
            return Math.floor((i / 11) * 2);
          case K.KANJI:
            return Math.floor(i / 13);
          case K.BYTE:
          default:
            return Math.floor(i / 8);
        }
      }),
      (r.getBestVersionForData = function (t, e) {
        var n,
          a = c.from(e, c.M);
        if (Array.isArray(t)) {
          if (t.length > 1)
            return (function (t, e) {
              for (var n = 1; n <= 40; n++) {
                if (o(t, n) <= r.getCapacity(n, e, K.MIXED)) return n;
              }
            })(t, a);
          if (0 === t.length) return 1;
          n = t[0];
        } else n = t;
        return (function (t, e, n) {
          for (var o = 1; o <= 40; o++)
            if (e <= r.getCapacity(o, n, t)) return o;
        })(n.mode, n.getLength(), a);
      }),
      (r.getEncodedBits = function (t) {
        if (!b(t) || t < 7) throw new Error("Invalid QR Code version");
        for (var r = t << 12; i(r) - e >= 0; ) r ^= 7973 << (i(r) - e);
        return (t << 12) | r;
      });
  });
  O.getCapacity, O.getBestVersionForData, O.getEncodedBits;
  var Q = i(1335),
    V = function (t, r) {
      for (var e = (t.bit << 3) | r, n = e << 10; i(n) - Q >= 0; )
        n ^= 1335 << (i(n) - Q);
      return 21522 ^ ((e << 10) | n);
    };
  function q(t) {
    (this.mode = K.NUMERIC), (this.data = t.toString());
  }
  (q.getBitsLength = function (t) {
    return 10 * Math.floor(t / 3) + (t % 3 ? (t % 3) * 3 + 1 : 0);
  }),
    (q.prototype.getLength = function () {
      return this.data.length;
    }),
    (q.prototype.getBitsLength = function () {
      return q.getBitsLength(this.data.length);
    }),
    (q.prototype.write = function (t) {
      var r, e, n;
      for (r = 0; r + 3 <= this.data.length; r += 3)
        (e = this.data.substr(r, 3)), (n = parseInt(e, 10)), t.put(n, 10);
      var o = this.data.length - r;
      o > 0 &&
        ((e = this.data.substr(r)), (n = parseInt(e, 10)), t.put(n, 3 * o + 1));
    });
  var j = q,
    $ = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":",
    ];
  function X(t) {
    (this.mode = K.ALPHANUMERIC), (this.data = t);
  }
  (X.getBitsLength = function (t) {
    return 11 * Math.floor(t / 2) + (t % 2) * 6;
  }),
    (X.prototype.getLength = function () {
      return this.data.length;
    }),
    (X.prototype.getBitsLength = function () {
      return X.getBitsLength(this.data.length);
    }),
    (X.prototype.write = function (t) {
      var r;
      for (r = 0; r + 2 <= this.data.length; r += 2) {
        var e = 45 * $.indexOf(this.data[r]);
        (e += $.indexOf(this.data[r + 1])), t.put(e, 11);
      }
      this.data.length % 2 && t.put($.indexOf(this.data[r]), 6);
    });
  var Z = X;
  function W(t) {
    (this.mode = K.BYTE),
      "string" == typeof t &&
        (t = (function (t) {
          for (var r = [], e = t.length, n = 0; n < e; n++) {
            var o = t.charCodeAt(n);
            if (o >= 55296 && o <= 56319 && e > n + 1) {
              var a = t.charCodeAt(n + 1);
              a >= 56320 &&
                a <= 57343 &&
                ((o = 1024 * (o - 55296) + a - 56320 + 65536), (n += 1));
            }
            o < 128
              ? r.push(o)
              : o < 2048
              ? (r.push((o >> 6) | 192), r.push((63 & o) | 128))
              : o < 55296 || (o >= 57344 && o < 65536)
              ? (r.push((o >> 12) | 224),
                r.push(((o >> 6) & 63) | 128),
                r.push((63 & o) | 128))
              : o >= 65536 && o <= 1114111
              ? (r.push((o >> 18) | 240),
                r.push(((o >> 12) & 63) | 128),
                r.push(((o >> 6) & 63) | 128),
                r.push((63 & o) | 128))
              : r.push(239, 191, 189);
          }
          return new Uint8Array(r).buffer;
        })(t)),
      (this.data = new Uint8Array(t));
  }
  (W.getBitsLength = function (t) {
    return 8 * t;
  }),
    (W.prototype.getLength = function () {
      return this.data.length;
    }),
    (W.prototype.getBitsLength = function () {
      return W.getBitsLength(this.data.length);
    }),
    (W.prototype.write = function (t) {
      for (var r = 0, e = this.data.length; r < e; r++) t.put(this.data[r], 8);
    });
  var G = W;
  function tt(t) {
    (this.mode = K.KANJI), (this.data = t);
  }
  (tt.getBitsLength = function (t) {
    return 13 * t;
  }),
    (tt.prototype.getLength = function () {
      return this.data.length;
    }),
    (tt.prototype.getBitsLength = function () {
      return tt.getBitsLength(this.data.length);
    }),
    (tt.prototype.write = function (t) {
      var r;
      for (r = 0; r < this.data.length; r++) {
        var e = f(this.data[r]);
        if (e >= 33088 && e <= 40956) e -= 33088;
        else {
          if (!(e >= 57408 && e <= 60351))
            throw new Error(
              "Invalid SJIS character: " +
                this.data[r] +
                "\nMake sure your charset is UTF-8"
            );
          e -= 49472;
        }
        (e = 192 * ((e >>> 8) & 255) + (255 & e)), t.put(e, 13);
      }
    });
  var rt = tt,
    et = h(function (t, r) {
      var r = {
        single_source_shortest_paths: function (t, e, n) {
          var o = {},
            a = {};
          a[e] = 0;
          var i,
            u,
            s,
            f,
            h,
            c,
            g,
            d = r.PriorityQueue.make();
          for (d.push(e, 0); !d.empty(); )
            for (s in ((u = (i = d.pop()).value),
            (f = i.cost),
            (h = t[u] || {})))
              h.hasOwnProperty(s) &&
                ((c = f + h[s]),
                (g = a[s]),
                (void 0 === a[s] || g > c) &&
                  ((a[s] = c), d.push(s, c), (o[s] = u)));
          if (void 0 !== n && void 0 === a[n]) {
            var l = ["Could not find a path from ", e, " to ", n, "."].join("");
            throw new Error(l);
          }
          return o;
        },
        extract_shortest_path_from_predecessor_list: function (t, r) {
          for (var e = [], n = r; n; ) e.push(n), (n = t[n]);
          return e.reverse(), e;
        },
        find_path: function (t, e, n) {
          var o = r.single_source_shortest_paths(t, e, n);
          return r.extract_shortest_path_from_predecessor_list(o, n);
        },
        PriorityQueue: {
          make: function (t) {
            var e,
              n = r.PriorityQueue,
              o = {};
            for (e in ((t = t || {}), n)) n.hasOwnProperty(e) && (o[e] = n[e]);
            return (o.queue = []), (o.sorter = t.sorter || n.default_sorter), o;
          },
          default_sorter: function (t, r) {
            return t.cost - r.cost;
          },
          push: function (t, r) {
            var e = { value: t, cost: r };
            this.queue.push(e), this.queue.sort(this.sorter);
          },
          pop: function () {
            return this.queue.shift();
          },
          empty: function () {
            return 0 === this.queue.length;
          },
        },
      };
      t.exports = r;
    }),
    nt = h(function (t, r) {
      function e(t) {
        return unescape(encodeURIComponent(t)).length;
      }
      function n(t, r, e) {
        for (var n, o = []; null !== (n = t.exec(e)); )
          o.push({ data: n[0], index: n.index, mode: r, length: n[0].length });
        return o;
      }
      function o(t) {
        var r,
          e,
          o = n(J.NUMERIC, K.NUMERIC, t),
          a = n(J.ALPHANUMERIC, K.ALPHANUMERIC, t);
        return (
          s()
            ? ((r = n(J.BYTE, K.BYTE, t)), (e = n(J.KANJI, K.KANJI, t)))
            : ((r = n(J.BYTE_KANJI, K.BYTE, t)), (e = [])),
          o
            .concat(a, r, e)
            .sort(function (t, r) {
              return t.index - r.index;
            })
            .map(function (t) {
              return { data: t.data, mode: t.mode, length: t.length };
            })
        );
      }
      function a(t, r) {
        switch (r) {
          case K.NUMERIC:
            return j.getBitsLength(t);
          case K.ALPHANUMERIC:
            return Z.getBitsLength(t);
          case K.KANJI:
            return rt.getBitsLength(t);
          case K.BYTE:
            return G.getBitsLength(t);
        }
      }
      function i(t, r) {
        var e,
          n = K.getBestModeForData(t);
        if ((e = K.from(r, n)) !== K.BYTE && e.bit < n.bit)
          throw new Error(
            '"' +
              t +
              '" cannot be encoded with mode ' +
              K.toString(e) +
              ".\n Suggested mode is: " +
              K.toString(n)
          );
        switch ((e !== K.KANJI || s() || (e = K.BYTE), e)) {
          case K.NUMERIC:
            return new j(t);
          case K.ALPHANUMERIC:
            return new Z(t);
          case K.KANJI:
            return new rt(t);
          case K.BYTE:
            return new G(t);
        }
      }
      (r.fromArray = function (t) {
        return t.reduce(function (t, r) {
          return (
            "string" == typeof r
              ? t.push(i(r, null))
              : r.data && t.push(i(r.data, r.mode)),
            t
          );
        }, []);
      }),
        (r.fromString = function (t, n) {
          for (
            var i = (function (t, r) {
                for (
                  var e = {}, n = { start: {} }, o = ["start"], i = 0;
                  i < t.length;
                  i++
                ) {
                  for (var u = t[i], s = [], f = 0; f < u.length; f++) {
                    var h = u[f],
                      c = "" + i + f;
                    s.push(c), (e[c] = { node: h, lastCount: 0 }), (n[c] = {});
                    for (var g = 0; g < o.length; g++) {
                      var d = o[g];
                      e[d] && e[d].node.mode === h.mode
                        ? ((n[d][c] =
                            a(e[d].lastCount + h.length, h.mode) -
                            a(e[d].lastCount, h.mode)),
                          (e[d].lastCount += h.length))
                        : (e[d] && (e[d].lastCount = h.length),
                          (n[d][c] =
                            a(h.length, h.mode) +
                            4 +
                            K.getCharCountIndicator(h.mode, r)));
                    }
                  }
                  o = s;
                }
                for (var l = 0; l < o.length; l++) n[o[l]].end = 0;
                return { map: n, table: e };
              })(
                (function (t) {
                  for (var r = [], n = 0; n < t.length; n++) {
                    var o = t[n];
                    switch (o.mode) {
                      case K.NUMERIC:
                        r.push([
                          o,
                          {
                            data: o.data,
                            mode: K.ALPHANUMERIC,
                            length: o.length,
                          },
                          { data: o.data, mode: K.BYTE, length: o.length },
                        ]);
                        break;
                      case K.ALPHANUMERIC:
                        r.push([
                          o,
                          { data: o.data, mode: K.BYTE, length: o.length },
                        ]);
                        break;
                      case K.KANJI:
                        r.push([
                          o,
                          { data: o.data, mode: K.BYTE, length: e(o.data) },
                        ]);
                        break;
                      case K.BYTE:
                        r.push([
                          { data: o.data, mode: K.BYTE, length: e(o.data) },
                        ]);
                    }
                  }
                  return r;
                })(o(t)),
                n
              ),
              u = et.find_path(i.map, "start", "end"),
              s = [],
              f = 1;
            f < u.length - 1;
            f++
          )
            s.push(i.table[u[f]].node);
          return r.fromArray(
            (function (t) {
              return t.reduce(function (t, r) {
                var e = t.length - 1 >= 0 ? t[t.length - 1] : null;
                return e && e.mode === r.mode
                  ? ((t[t.length - 1].data += r.data), t)
                  : (t.push(r), t);
              }, []);
            })(s)
          );
        }),
        (r.rawSplit = function (t) {
          return r.fromArray(o(t));
        });
    });
  function ot(t, r, e) {
    var n,
      o,
      a = t.size,
      i = V(r, e);
    for (n = 0; n < 15; n++)
      (o = 1 == ((i >> n) & 1)),
        n < 6
          ? t.set(n, 8, o, !0)
          : n < 8
          ? t.set(n + 1, 8, o, !0)
          : t.set(a - 15 + n, 8, o, !0),
        n < 8
          ? t.set(8, a - n - 1, o, !0)
          : n < 9
          ? t.set(8, 15 - n - 1 + 1, o, !0)
          : t.set(8, 15 - n - 1, o, !0);
    t.set(a - 8, 8, 1, !0);
  }
  function at(t, r, e) {
    var n = new d();
    e.forEach(function (r) {
      n.put(r.mode.bit, 4),
        n.put(r.getLength(), K.getCharCountIndicator(r.mode, t)),
        r.write(n);
    });
    var o = 8 * (a(t) - M(t, r));
    for (
      n.getLengthInBits() + 4 <= o && n.put(0, 4);
      n.getLengthInBits() % 8 != 0;

    )
      n.putBit(0);
    for (var i = (o - n.getLengthInBits()) / 8, u = 0; u < i; u++)
      n.put(u % 2 ? 17 : 236, 8);
    return (function (t, r, e) {
      for (
        var n = a(r),
          o = M(r, e),
          i = n - o,
          u = I(r, e),
          s = u - (n % u),
          f = Math.floor(n / u),
          h = Math.floor(i / u),
          c = h + 1,
          g = f - h,
          d = new L(g),
          l = 0,
          v = new Array(u),
          p = new Array(u),
          w = 0,
          m = new Uint8Array(t.buffer),
          E = 0;
        E < u;
        E++
      ) {
        var y = E < s ? h : c;
        (v[E] = m.slice(l, l + y)),
          (p[E] = d.encode(v[E])),
          (l += y),
          (w = Math.max(w, y));
      }
      var A,
        N,
        B = new Uint8Array(n),
        C = 0;
      for (A = 0; A < w; A++)
        for (N = 0; N < u; N++) A < v[N].length && (B[C++] = v[N][A]);
      for (A = 0; A < g; A++) for (N = 0; N < u; N++) B[C++] = p[N][A];
      return B;
    })(n, t, r);
  }
  function it(t, r, e, n) {
    var a;
    if (Array.isArray(t)) a = nt.fromArray(t);
    else {
      if ("string" != typeof t) throw new Error("Invalid data");
      var i = r;
      if (!i) {
        var u = nt.rawSplit(t);
        i = O.getBestVersionForData(u, e);
      }
      a = nt.fromString(t, i || 40);
    }
    var s = O.getBestVersionForData(a, e);
    if (!s)
      throw new Error(
        "The amount of data is too big to be stored in a QR Code"
      );
    if (r) {
      if (r < s)
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " +
            s +
            ".\n"
        );
    } else r = s;
    var f = at(r, e, a),
      h = o(r),
      c = new v(h);
    return (
      (function (t, r) {
        for (var e = t.size, n = m(r), o = 0; o < n.length; o++)
          for (var a = n[o][0], i = n[o][1], u = -1; u <= 7; u++)
            if (!(a + u <= -1 || e <= a + u))
              for (var s = -1; s <= 7; s++)
                i + s <= -1 ||
                  e <= i + s ||
                  ((u >= 0 && u <= 6 && (0 === s || 6 === s)) ||
                  (s >= 0 && s <= 6 && (0 === u || 6 === u)) ||
                  (u >= 2 && u <= 4 && s >= 2 && s <= 4)
                    ? t.set(a + u, i + s, !0, !0)
                    : t.set(a + u, i + s, !1, !0));
      })(c, r),
      (function (t) {
        for (var r = t.size, e = 8; e < r - 8; e++) {
          var n = e % 2 == 0;
          t.set(e, 6, n, !0), t.set(6, e, n, !0);
        }
      })(c),
      (function (t, r) {
        for (var e = p.getPositions(r), n = 0; n < e.length; n++)
          for (var o = e[n][0], a = e[n][1], i = -2; i <= 2; i++)
            for (var u = -2; u <= 2; u++)
              -2 === i || 2 === i || -2 === u || 2 === u || (0 === i && 0 === u)
                ? t.set(o + i, a + u, !0, !0)
                : t.set(o + i, a + u, !1, !0);
      })(c, r),
      ot(c, e, 0),
      r >= 7 &&
        (function (t, r) {
          for (
            var e, n, o, a = t.size, i = O.getEncodedBits(r), u = 0;
            u < 18;
            u++
          )
            (e = Math.floor(u / 3)),
              (n = (u % 3) + a - 8 - 3),
              (o = 1 == ((i >> u) & 1)),
              t.set(e, n, o, !0),
              t.set(n, e, o, !0);
        })(c, r),
      (function (t, r) {
        for (
          var e = t.size, n = -1, o = e - 1, a = 7, i = 0, u = e - 1;
          u > 0;
          u -= 2
        )
          for (6 === u && u--; ; ) {
            for (var s = 0; s < 2; s++)
              if (!t.isReserved(o, u - s)) {
                var f = !1;
                i < r.length && (f = 1 == ((r[i] >>> a) & 1)),
                  t.set(o, u - s, f),
                  -1 === --a && (i++, (a = 7));
              }
            if ((o += n) < 0 || e <= o) {
              (o -= n), (n = -n);
              break;
            }
          }
      })(c, f),
      isNaN(n) && (n = E.getBestMask(c, ot.bind(null, c, e))),
      E.applyMask(n, c),
      ot(c, e, n),
      {
        modules: c,
        version: r,
        errorCorrectionLevel: e,
        maskPattern: n,
        segments: a,
      }
    );
  }
  nt.fromArray, nt.fromString, nt.rawSplit;
  var ut = function (t, r) {
      if (void 0 === t || "" === t) throw new Error("No input text");
      var e,
        n,
        o = c.M;
      return (
        void 0 !== r &&
          ((o = c.from(r.errorCorrectionLevel, c.M)),
          (e = O.from(r.version)),
          (n = E.from(r.maskPattern)),
          r.toSJISFunc && u(r.toSJISFunc)),
        it(t, e, o, n)
      );
    },
    st = h(function (t, r) {
      function e(t) {
        if (("number" == typeof t && (t = t.toString()), "string" != typeof t))
          throw new Error("Color should be defined as hex string");
        var r = t.slice().replace("#", "").split("");
        if (r.length < 3 || 5 === r.length || r.length > 8)
          throw new Error("Invalid hex color: " + t);
        (3 !== r.length && 4 !== r.length) ||
          (r = Array.prototype.concat.apply(
            [],
            r.map(function (t) {
              return [t, t];
            })
          )),
          6 === r.length && r.push("F", "F");
        var e = parseInt(r.join(""), 16);
        return {
          r: (e >> 24) & 255,
          g: (e >> 16) & 255,
          b: (e >> 8) & 255,
          a: 255 & e,
          hex: "#" + r.slice(0, 6).join(""),
        };
      }
      (r.getOptions = function (t) {
        t || (t = {}), t.color || (t.color = {});
        var r =
            void 0 === t.margin || null === t.margin || t.margin < 0
              ? 4
              : t.margin,
          n = t.width && t.width >= 21 ? t.width : void 0,
          o = t.scale || 4;
        return {
          width: n,
          scale: n ? 4 : o,
          margin: r,
          color: {
            dark: e(t.color.dark || "#000000ff"),
            light: e(t.color.light || "#ffffffff"),
          },
          type: t.type,
          rendererOpts: t.rendererOpts || {},
        };
      }),
        (r.getScale = function (t, r) {
          return r.width && r.width >= t + 2 * r.margin
            ? r.width / (t + 2 * r.margin)
            : r.scale;
        }),
        (r.getImageWidth = function (t, e) {
          var n = r.getScale(t, e);
          return Math.floor((t + 2 * e.margin) * n);
        }),
        (r.qrToImageData = function (t, e, n) {
          for (
            var o = e.modules.size,
              a = e.modules.data,
              i = r.getScale(o, n),
              u = Math.floor((o + 2 * n.margin) * i),
              s = n.margin * i,
              f = [n.color.light, n.color.dark],
              h = 0;
            h < u;
            h++
          )
            for (var c = 0; c < u; c++) {
              var g = 4 * (h * u + c),
                d = n.color.light;
              if (h >= s && c >= s && h < u - s && c < u - s)
                d =
                  f[
                    a[Math.floor((h - s) / i) * o + Math.floor((c - s) / i)]
                      ? 1
                      : 0
                  ];
              (t[g++] = d.r), (t[g++] = d.g), (t[g++] = d.b), (t[g] = d.a);
            }
        });
    });
  st.getOptions, st.getScale, st.getImageWidth, st.qrToImageData;
  var ft = h(function (t, r) {
    (r.render = function (t, r, e) {
      var n = e,
        o = r;
      void 0 !== n || (r && r.getContext) || ((n = r), (r = void 0)),
        r ||
          (o = (function () {
            try {
              return document.createElement("canvas");
            } catch (t) {
              throw new Error("You need to specify a canvas element");
            }
          })()),
        (n = st.getOptions(n));
      var a = st.getImageWidth(t.modules.size, n),
        i = o.getContext("2d"),
        u = i.createImageData(a, a);
      return (
        st.qrToImageData(u.data, t, n),
        (function (t, r, e) {
          t.clearRect(0, 0, r.width, r.height),
            r.style || (r.style = {}),
            (r.height = e),
            (r.width = e),
            (r.style.height = e + "px"),
            (r.style.width = e + "px");
        })(i, o, a),
        i.putImageData(u, 0, 0),
        o
      );
    }),
      (r.renderToDataURL = function (t, e, n) {
        var o = n;
        void 0 !== o || (e && e.getContext) || ((o = e), (e = void 0)),
          o || (o = {});
        var a = r.render(t, e, o),
          i = o.type || "image/png",
          u = o.rendererOpts || {};
        return a.toDataURL(i, u.quality);
      });
  });
  function ht(t, r) {
    var e = t.a / 255,
      n = r + '="' + t.hex + '"';
    return e < 1 ? n + " " + r + '-opacity="' + e.toFixed(2).slice(1) + '"' : n;
  }
  function ct(t, r, e) {
    var n = t + r;
    return void 0 !== e && (n += " " + e), n;
  }
  ft.render, ft.renderToDataURL;
  var gt = function (t, r, e) {
    var n = st.getOptions(r),
      o = t.modules.size,
      a = t.modules.data,
      i = o + 2 * n.margin,
      u = n.color.light.a
        ? "<path " +
          ht(n.color.light, "fill") +
          ' d="M0 0h' +
          i +
          "v" +
          i +
          'H0z"/>'
        : "",
      s =
        "<path " +
        ht(n.color.dark, "stroke") +
        ' d="' +
        (function (t, r, e) {
          for (var n = "", o = 0, a = !1, i = 0, u = 0; u < t.length; u++) {
            var s = Math.floor(u % r),
              f = Math.floor(u / r);
            s || a || (a = !0),
              t[u]
                ? (i++,
                  (u > 0 && s > 0 && t[u - 1]) ||
                    ((n += a ? ct("M", s + e, 0.5 + f + e) : ct("m", o, 0)),
                    (o = 0),
                    (a = !1)),
                  (s + 1 < r && t[u + 1]) || ((n += ct("h", i)), (i = 0)))
                : o++;
          }
          return n;
        })(a, o, n.margin) +
        '"/>',
      f = 'viewBox="0 0 ' + i + " " + i + '"',
      h =
        '<svg xmlns="http://www.w3.org/2000/svg" ' +
        (n.width ? 'width="' + n.width + '" height="' + n.width + '" ' : "") +
        f +
        ' shape-rendering="crispEdges">' +
        u +
        s +
        "</svg>\n";
    return "function" == typeof e && e(null, h), h;
  };
  function dt(t, r, n, o, a) {
    var i = [].slice.call(arguments, 1),
      u = i.length,
      s = "function" == typeof i[u - 1];
    if (!s && !e()) throw new Error("Callback required as last argument");
    if (!s) {
      if (u < 1) throw new Error("Too few arguments provided");
      return (
        1 === u
          ? ((n = r), (r = o = void 0))
          : 2 !== u || r.getContext || ((o = n), (n = r), (r = void 0)),
        new Promise(function (e, a) {
          try {
            var i = ut(n, o);
            e(t(i, r, o));
          } catch (t) {
            a(t);
          }
        })
      );
    }
    if (u < 2) throw new Error("Too few arguments provided");
    2 === u
      ? ((a = n), (n = r), (r = o = void 0))
      : 3 === u &&
        (r.getContext && void 0 === a
          ? ((a = o), (o = void 0))
          : ((a = o), (o = n), (n = r), (r = void 0)));
    try {
      var f = ut(n, o);
      a(null, t(f, r, o));
    } catch (t) {
      a(t);
    }
  }
  var lt = ut,
    vt = dt.bind(null, ft.render),
    pt = dt.bind(null, ft.renderToDataURL),
    wt = dt.bind(null, function (t, r, e) {
      return gt(t, e);
    }),
    mt = { create: lt, toCanvas: vt, toDataURL: pt, toString: wt };
  return (
    (t.create = lt),
    (t.default = mt),
    (t.toCanvas = vt),
    (t.toDataURL = pt),
    (t.toString = wt),
    Object.defineProperty(t, "__esModule", { value: !0 }),
    t
  );
})({});

/*
 * The MIT License (MIT)
 * Copyright (c) 2012 Ryan Day
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

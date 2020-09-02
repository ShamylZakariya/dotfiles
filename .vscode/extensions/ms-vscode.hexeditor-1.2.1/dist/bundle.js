/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./media/hexEdit.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./media/byteData.ts":
/*!***************************!*\
  !*** ./media/byteData.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ByteData = void 0;
class ByteData {
    /**
     * @description Creates a ByteData object which acts as the datalayer for a single hex value
     * @param uint8num The 8bit number from the file to be represented
     */
    constructor(uint8num) {
        this.decimal = uint8num;
        this.adjacentBytes = [];
    }
    /**
     * @description Adds a given ByteData object as adjancent to the current one (utilized for higher than 8bit calculations)
     * @param {ByteData} byte_obj The ByteData obvject to add to the array
     */
    addAdjacentByte(byte_obj) {
        this.adjacentBytes.push(byte_obj);
    }
    /**
     * @description Returns the hex representation of the ByteData object
     * @returns {string} The ByteData represented as a hex string
     */
    toHex() {
        return this.decimal.toString(16).toUpperCase();
    }
    /**
     * @description Returns the binary representation of the ByteData object
     * @returns {string} The ByteData represented a binary string
     */
    toBinary() {
        return ("00000000" + this.decimal.toString(2)).slice(-8);
    }
    /**
     * @description Returns the 8bit unsigned int representation of the ByteData object
     * @returns {number} The 8 bit unsigned int
     */
    to8bitUInt() {
        return this.decimal;
    }
    /**
     * @description Converts the byte data to a utf-8 character
     * @param {boolean} littleEndian Whether or not it's represented in little endian
     * @returns {string} The utf-8 character
     */
    toUTF8(littleEndian) {
        let uint8Data = [this.to8bitUInt()];
        for (let i = 0; i < 3 && i < this.adjacentBytes.length; i++) {
            uint8Data.push(this.adjacentBytes[i].to8bitUInt());
        }
        if (!littleEndian) {
            uint8Data = uint8Data.reverse();
        }
        const utf8 = new TextDecoder("utf-8").decode(new Uint8Array(uint8Data));
        // We iterate through the string and immediately reutrn the first character
        for (const char of utf8)
            return char;
        return utf8;
    }
    /**
     * @description Converts the byte data to a utf-16 character
     * @param {boolean} littleEndian Whether or not it's represented in little endian
     * @returns {string} The utf-16 character
     */
    toUTF16(littleEndian) {
        let uint8Data = [this.to8bitUInt()];
        if (this.adjacentBytes.length === 0)
            return "End of File";
        for (let i = 0; i < 3 && i < this.adjacentBytes.length; i++) {
            uint8Data.push(this.adjacentBytes[i].to8bitUInt());
        }
        if (!littleEndian) {
            uint8Data = uint8Data.reverse();
        }
        const utf16 = new TextDecoder("utf-16").decode(new Uint8Array(uint8Data));
        // We iterate through the string and immediately reutrn the first character
        for (const char of utf16)
            return char;
        return utf16;
    }
    /**
     * @description Handles converting the ByteData object into many of the unsigned and signed integer formats
     * @param {number} numBits The numbers of bits you want represented, must be a multiple of 8 and <= 64
     * @param {boolean} signed Whether you want the returned representation to be signed or unsigned
     * @param {boolean} littleEndian True if you want it represented in little endian, false if big endian
     * @param {boolean} float If you pass in 32 or 64 as numBits do you want them to be float32 or float64, defaults to false
     * @returns {number | bigint} The new representation
     */
    byteConverter(numBits, signed, littleEndian, float = false) {
        if (numBits % 8 != 0) {
            throw new Error("Bits must be a multiple of 8!");
        }
        if (this.adjacentBytes.length < (numBits / 8) - 1)
            return NaN;
        const bytes = [];
        bytes.push(this.to8bitUInt());
        for (let i = 0; i < (numBits / 8) - 1; i++) {
            bytes.push(this.adjacentBytes[i].to8bitUInt());
        }
        const uint8bytes = Uint8Array.from(bytes);
        const dataview = new DataView(uint8bytes.buffer);
        if (numBits == 64 && float) {
            return dataview.getFloat64(0, littleEndian);
        }
        else if (numBits == 64 && signed) {
            return dataview.getBigInt64(0, littleEndian);
        }
        else if (numBits == 64 && !signed) {
            return dataview.getBigUint64(0, littleEndian);
        }
        else if (numBits == 32 && float) {
            return dataview.getFloat32(0, littleEndian);
        }
        else if (numBits == 32 && signed) {
            return dataview.getInt32(0, littleEndian);
        }
        else if (numBits == 32 && !signed) {
            return dataview.getUint32(0, littleEndian);
            // 24 bit isn't supported by default so we must add it
            // It's safe to cast here as the only numbits that produces a big int is 64.
        }
        else if (numBits == 24 && signed) {
            const first8 = this.adjacentBytes[1].byteConverter(8, signed, littleEndian) << 16;
            return first8 | this.byteConverter(16, signed, littleEndian);
        }
        else if (numBits == 24 && !signed) {
            const first8 = this.adjacentBytes[1].byteConverter(8, signed, littleEndian) << 16;
            return first8 | this.byteConverter(16, signed, littleEndian);
        }
        else if (numBits == 16 && signed) {
            return dataview.getInt16(0, littleEndian);
        }
        else if (numBits == 16 && !signed) {
            return dataview.getUint16(0, littleEndian);
        }
        else if (numBits == 8 && signed) {
            return dataview.getInt8(0);
        }
        else if (numBits == 8 && !signed) {
            return this.decimal;
        }
        return NaN;
    }
}
exports.ByteData = ByteData;


/***/ }),

/***/ "./media/chunkHandler.ts":
/*!*******************************!*\
  !*** ./media/chunkHandler.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChunkHandler = void 0;
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
const byteData_1 = __webpack_require__(/*! ./byteData */ "./media/byteData.ts");
/**
 * @description A chunkhandler which holds the chunks and handles requesting new ones
 */
class ChunkHandler {
    /**
     * @description Constructs a chunk handler which handles chunks of size chunkSize
     * @param {number} chunkSize The size of the chunks which the chunkhandler holds
     */
    constructor(chunkSize) {
        this.chunks = new Set();
        this._chunkSize = chunkSize;
    }
    /**
     * @description Returns the size of a chunk in the chunk handler
     * @returns {number} the size of a chunk
     */
    get chunkSize() {
        return this._chunkSize;
    }
    /**
     * @description Whether or not a chunk holding the offset is being tracked by the chunkhandler
     * @param {number} offset The offset to check against
     * @returns {boolean} whether or not a chunk containing that offset is being tracked
     */
    hasChunk(offset) {
        const chunkStart = this.retrieveChunkStart(offset);
        return this.chunks.has(chunkStart);
    }
    /**
     * @description Sends a request to the extension for the packets which would make up the requested chunks
     * @param {number} chunkStart The start of the chunk which you're requesting
     */
    async requestMoreChunks(chunkStart) {
        // If the chunk start is above the document size we know it will not give us anything back so we don't do anything
        if (chunkStart >= hexEdit_1.virtualHexDocument.documentSize && chunkStart !== 0)
            return;
        // Requests the chunks from the extension
        try {
            const request = await hexEdit_1.messageHandler.postMessageWithResponse("packet", {
                initialOffset: chunkStart,
                numElements: this.chunkSize
            });
            this.processChunks(request.offset, request.data, request.edits, request.fileSize);
        }
        catch (err) {
            return;
        }
    }
    /**
     * @description Given an offset tells you which offset begins it chunks
     * @param {number} offset The offset which you want to know the chunk start of
     * @returns {number} The chunk start of the provided offset
     */
    retrieveChunkStart(offset) {
        return Math.floor(offset / this.chunkSize) * this.chunkSize;
    }
    /**
     * @description Called by the virtualDocument to ensure there is bufferSize chunks above and below the offset provided
     * @param {number} offset The offset given to check the buffer around
     * @param {BufferOptions} bufferOpts The options describing how many chunks above and below the given offset you want
     * @returns {Promise<{removed: number[]; requested: Promise<void[]>}>} A promise with an array of removed chunk starts and a promise which is awaiting the requested chunks
     */
    async ensureBuffer(offset, bufferOpts) {
        const chunksToRequest = new Set();
        const chunkStart = this.retrieveChunkStart(offset);
        // If it doesn't have even the starting chunk it means we must have scrolled far outside the viewport and will need to requet starting chunk
        // We can add this everytime since we compute a set difference later it will be removed
        chunksToRequest.add(chunkStart);
        // Get the offsets of the chunks that would make up the buffers
        for (let i = 1; i <= bufferOpts.topBufferSize; i++) {
            chunksToRequest.add(Math.max(0, chunkStart - (i * this.chunkSize)));
        }
        for (let i = 1; i <= bufferOpts.bottomBufferSize; i++) {
            chunksToRequest.add(chunkStart + (i * this.chunkSize));
        }
        // We don't request chunks we already have so we filter them out here
        const chunksToRequestArr = [...chunksToRequest].filter(x => !this.chunks.has(x));
        //If it's inside the buffer (which the chunksToRequest set holds) then we keep it, else it's deleted
        const chunksOutsideBuffer = [...this.chunks].filter(x => !chunksToRequest.has(x));
        // We stop tracking the old chunks and we request the new ones
        chunksOutsideBuffer.forEach(chunk => this.removeChunk(chunk));
        const requested = [];
        chunksToRequestArr.forEach(chunkOffset => requested.push(this.requestMoreChunks(chunkOffset)));
        const result = {
            removed: chunksOutsideBuffer,
            requested: Promise.all(requested)
        };
        return result;
    }
    /**
     * @description Handles the incoming chunks from the extension (this gets called by the message handler)
     * @param {number} offset The offset which was requestd
     * @param {Uint8Array} data The data which was returned back
     * @param {number} fileSize The size of the file, this is passed back from the exthost and helps to ensure the webview and exthost sizes are synced
     */
    processChunks(offset, data, edits, fileSize) {
        const packets = [];
        for (let i = 0; i < data.length; i++) {
            // If it's a chunk boundary we want to make sure we're tracking that chunk
            if ((i + offset) % this.chunkSize === 0) {
                this.addChunk(i + offset);
            }
            packets.push({
                offset: i + offset,
                data: new byteData_1.ByteData(data[i])
            });
            // At the very end we want the plus cell, so we add a dummy packet that is greater than the filesize
            if (i + offset + 1 === hexEdit_1.virtualHexDocument.documentSize) {
                packets.push({
                    offset: i + offset + 1,
                    data: new byteData_1.ByteData(0)
                });
            }
        }
        // If it's an empty file we just send over the dummy packet for the plus cell
        if (data.length === 0 && fileSize === 0) {
            packets.push({
                offset: 0,
                data: new byteData_1.ByteData(0)
            });
        }
        hexEdit_1.virtualHexDocument.render(packets);
        hexEdit_1.virtualHexDocument.redo(edits, fileSize);
    }
    /**
     * @description Adds a chunk with the given chunk offset to the handler
     * @param {number} offset The offset which holds the chunk start
     */
    addChunk(offset) {
        this.chunks.add(offset);
    }
    /**
     * @description Deletes a chunk with the given chunk offset to the handler
     * @param {number} offset The offset which holds the chunk start
     */
    removeChunk(offset) {
        this.chunks.delete(offset);
    }
    /**
     * @description Getter for all the chunks in the chunk handler
     * @returns {Set<numer>} the starting offsets of all the chunks being tracked
     */
    get allChunks() {
        return this.chunks;
    }
}
exports.ChunkHandler = ChunkHandler;


/***/ }),

/***/ "./media/dataInspector.ts":
/*!********************************!*\
  !*** ./media/dataInspector.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateDataInspector = exports.clearDataInspector = void 0;
/**
 * @description Clears the data spector back to its default state
 */
function clearDataInspector() {
    // This function only gets called when these elements exist so these casts are safe
    document.getElementById("binary8").value = "";
    document.getElementById("binary8").disabled = true;
    for (let i = 0; i < 4; i++) {
        const numBits = (i + 1) * 8;
        document.getElementById(`int${numBits}`).disabled = true;
        document.getElementById(`int${numBits}`).value = "";
        document.getElementById(`uint${numBits}`).disabled = true;
        document.getElementById(`uint${numBits}`).value = "";
    }
    document.getElementById("int64").value = "";
    document.getElementById("int64").disabled = true;
    document.getElementById("uint64").value = "";
    document.getElementById("uint64").disabled = true;
    document.getElementById("utf8").value = "";
    document.getElementById("utf8").disabled = true;
    document.getElementById("utf16").value = "";
    document.getElementById("utf16").disabled = true;
    document.getElementById("float32").value = "";
    document.getElementById("float32").disabled = true;
    document.getElementById("float64").value = "";
    document.getElementById("float64").disabled = true;
}
exports.clearDataInspector = clearDataInspector;
/**
 * @description Giving a ByteData object and what endianness, populates the data inspector
 * @param {ByteData} byte_obj The ByteData object to represent on the data inspector
 * @param {boolean} littleEndian Wether the data inspector is in littleEndian or bigEndian mode
 */
function populateDataInspector(byte_obj, littleEndian) {
    document.getElementById("binary8").value = byte_obj.toBinary();
    document.getElementById("binary8").disabled = false;
    for (let i = 0; i < 4; i++) {
        const numBits = (i + 1) * 8;
        const signed = byte_obj.byteConverter(numBits, true, littleEndian);
        const unsigned = byte_obj.byteConverter(numBits, false, littleEndian);
        document.getElementById(`int${numBits}`).value = isNaN(Number(signed)) ? "End of File" : signed.toString();
        document.getElementById(`int${numBits}`).disabled = false;
        document.getElementById(`uint${numBits}`).value = isNaN(Number(unsigned)) ? "End of File" : unsigned.toString();
        document.getElementById(`uint${numBits}`).disabled = false;
        if (numBits === 32) {
            // The boolean for signed doesn't matter for floats so this could also be 32, false, littleEndian, true
            const float32 = byte_obj.byteConverter(32, true, littleEndian, true);
            document.getElementById("float32").value = isNaN(Number(float32)) ? "End of File" : float32.toString();
            document.getElementById("float32").disabled = false;
        }
    }
    const signed64 = byte_obj.byteConverter(64, true, littleEndian);
    const unsigned64 = byte_obj.byteConverter(64, false, littleEndian);
    document.getElementById("int64").value = isNaN(Number(signed64)) ? "End of File" : signed64.toString();
    document.getElementById("int64").disabled = false;
    document.getElementById("uint64").value = isNaN(Number(unsigned64)) ? "End of File" : unsigned64.toString();
    document.getElementById("uint64").disabled = false;
    document.getElementById("utf8").value = byte_obj.toUTF8(littleEndian);
    document.getElementById("utf8").disabled = false;
    document.getElementById("utf16").value = byte_obj.toUTF16(littleEndian);
    document.getElementById("utf16").disabled = false;
    const float64 = byte_obj.byteConverter(64, true, littleEndian, true);
    document.getElementById("float64").value = isNaN(Number(float64)) ? "End of File" : float64.toString();
    document.getElementById("float64").disabled = false;
}
exports.populateDataInspector = populateDataInspector;


/***/ }),

/***/ "./media/editHandler.ts":
/*!******************************!*\
  !*** ./media/editHandler.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditHandler = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./media/util.ts");
const byteData_1 = __webpack_require__(/*! ./byteData */ "./media/byteData.ts");
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
const selectHandler_1 = __webpack_require__(/*! ./selectHandler */ "./media/selectHandler.ts");
/**
 * @description Class responsible for handling edits within the virtual document
 */
class EditHandler {
    constructor() {
        this.pendingEdit = undefined;
    }
    /**
     * @description Handles when a user starts typing on a hex element
     * @param {HTMLSpanElement} element The element which the keypress was fired on
     * @param {string} keyPressed The key which was pressed
     */
    async editHex(element, keyPressed) {
        // If the user presses escape and there is a current edit then we just revert the cell as if no edit has happened
        if (keyPressed === "Escape" && this.pendingEdit && this.pendingEdit.previousValue) {
            element.innerText = this.pendingEdit.previousValue;
            element.classList.remove("editing");
            this.pendingEdit = undefined;
        }
        // If it's not a valid hex input or delete we ignore it
        const regex = new RegExp(/^[a-fA-F0-9]$/gm);
        if (keyPressed.match(regex) === null && keyPressed !== "Delete") {
            return;
        }
        const offset = util_1.getElementsOffset(element);
        if (!this.pendingEdit || this.pendingEdit.offset != offset) {
            this.pendingEdit = {
                offset: offset,
                previousValue: element.innerText === "+" ? undefined : element.innerText,
                newValue: "",
                element: element
            };
        }
        element.classList.add("editing");
        element.innerText = element.innerText.trimRight();
        // When the user hits delete
        if (keyPressed === "Delete") {
            element.innerText = "  ";
        }
        else {
            // This handles when the user presses the first character erasing the old value vs adding to the currently edited value
            element.innerText = element.innerText.length !== 1 || element.innerText === "+" ? `${keyPressed.toUpperCase()} ` : element.innerText + keyPressed.toUpperCase();
        }
        this.pendingEdit.newValue = element.innerText;
        if (element.innerText.trimRight().length == 2) {
            element.classList.remove("add-cell");
            // Not really an edit if nothing changed
            if (this.pendingEdit.newValue == this.pendingEdit.previousValue) {
                this.pendingEdit = undefined;
                return;
            }
            await this.sendEditToExtHost([this.pendingEdit]);
            this.updateAscii(element.innerText, offset);
            element.classList.add("edited");
            // Means the last cell of the document was filled in so we add another placeholder afterwards
            if (!this.pendingEdit.previousValue) {
                hexEdit_1.virtualHexDocument.createAddCell();
            }
            this.pendingEdit = undefined;
        }
    }
    /**
     * @description Handles when the user starts typing on an ascii element
     * @param {HTMLSpanElement} element The element which the keystroke was fired on
     * @param {string} keyPressed The key which was pressed
     */
    async editAscii(element, keyPressed) {
        // We don't want to do anything if the user presses a key such as home etc which will register as greater than 1 char
        if (keyPressed.length != 1)
            return;
        // No need to call it edited if it's the same value
        if (element.innerText === keyPressed)
            return;
        const offset = util_1.getElementsOffset(element);
        const hexElement = util_1.getElementsWithGivenOffset(offset)[0];
        // We store all pending edits as hex as ascii isn't always representative due to control characters
        this.pendingEdit = {
            offset: offset,
            previousValue: hexElement.innerText === "+" ? undefined : hexElement.innerText,
            newValue: keyPressed.charCodeAt(0).toString(16).toUpperCase(),
            element: element
        };
        element.classList.remove("add-cell");
        element.classList.add("editing");
        element.classList.add("edited");
        this.updateAscii(this.pendingEdit.newValue, offset);
        this.updateHex(keyPressed, offset);
        await this.sendEditToExtHost([this.pendingEdit]);
        // Means the last cell of the document was filled in so we add another placeholder afterwards
        if (!this.pendingEdit.previousValue) {
            hexEdit_1.virtualHexDocument.createAddCell();
        }
        this.pendingEdit = undefined;
    }
    /**
     * @description Given a hex value updates the respective ascii value
     * @param {string | undefined} hexValue The hex value to convert to ascii
     * @param {number} offset The offset of the ascii value to update
     */
    updateAscii(hexValue, offset) {
        // For now if it's undefined we will just ignore it, but this would be the delete case
        if (!hexValue)
            return;
        // The way the DOM is constructed the ascii element will always be the second one
        const ascii = util_1.getElementsWithGivenOffset(offset)[1];
        ascii.classList.remove("add-cell");
        util_1.updateAsciiValue(new byteData_1.ByteData(parseInt(hexValue, 16)), ascii);
        ascii.classList.add("edited");
    }
    /**
     * @description Given an ascii value updates the respective hex value
     * @param {string} asciiValue The ascii value to convert to hex
     * @param {number} offset The offset of the hex value to update
     */
    updateHex(asciiValue, offset) {
        // The way the DOM is constructed the hex element will always be the first one
        const hex = util_1.getElementsWithGivenOffset(offset)[0];
        hex.innerText = asciiValue.charCodeAt(0).toString(16).toUpperCase();
        hex.classList.remove("add-cell");
        hex.classList.add("edited");
    }
    /**
     * @description Completes the current edit, this is used if the user navigates off the cell and it wasn't done being edited
     */
    async completePendingEdits() {
        if (this.pendingEdit && this.pendingEdit.element && this.pendingEdit.newValue) {
            // We don't want to stop the edit if it is selected as that can mean the user will be making further edits
            if (this.pendingEdit.element.classList.contains("selected"))
                return;
            // Ensure the hex value has 2 characters, if not we add a 0 in front
            this.pendingEdit.newValue = "00" + this.pendingEdit.newValue.trimRight();
            this.pendingEdit.newValue = this.pendingEdit.newValue.slice(this.pendingEdit.newValue.length - 2);
            this.pendingEdit.element.classList.remove("editing");
            this.pendingEdit.element.innerText = this.pendingEdit.newValue;
            // No edit really happened so we don't want it to update the ext host
            if (this.pendingEdit.newValue === this.pendingEdit.previousValue) {
                return;
            }
            this.updateAscii(this.pendingEdit.newValue, this.pendingEdit.offset);
            this.pendingEdit.element.classList.add("edited");
            this.pendingEdit.element.classList.remove("add-cell");
            await this.sendEditToExtHost([this.pendingEdit]);
            if (!this.pendingEdit.previousValue) {
                hexEdit_1.virtualHexDocument.createAddCell();
            }
            this.pendingEdit = undefined;
        }
    }
    /**
     * @description Given a list of edits sends it to the exthost so that the ext host and webview are in sync
     * @param {DocumentEdit} edits The edits to send to the exthost
     */
    async sendEditToExtHost(edits) {
        const extHostMessage = [];
        for (const edit of edits) {
            // The ext host only accepts 8bit unsigned ints, so we must convert the edits back into that representation
            const oldValue = edit.previousValue ? parseInt(edit.previousValue, 16) : undefined;
            const newValue = edit.newValue ? parseInt(edit.newValue, 16) : undefined;
            const currentMessage = {
                offset: edit.offset,
                oldValue,
                newValue,
                sameOnDisk: false
            };
            extHostMessage.push(currentMessage);
        }
        try {
            const syncedFileSize = (await hexEdit_1.messageHandler.postMessageWithResponse("edit", extHostMessage)).fileSize;
            hexEdit_1.virtualHexDocument.updateDocumentSize(syncedFileSize);
        }
        catch (_a) {
            // Empty catch because we just don't do anything if for some reason the exthost doesn't respond with the new fileSize,
            // we just sync at the next available opportunity
            return;
        }
    }
    /**
     * @description Given a list of edits undoes them from the document
     * @param {EditMessage[]} edits The list of edits to undo
     */
    undo(edits) {
        // We want to process the highest offset first as we only support removing cells from the end of the document
        // So if we need to remove 3 cells we can't remove them in arbitrary order it needs to be outermost cell first
        if (edits.length > 1 && edits[0].offset < edits[edits.length - 1].offset) {
            edits = edits.reverse();
        }
        for (const edit of edits) {
            // This is the delete case
            if (edit.oldValue === undefined) {
                hexEdit_1.virtualHexDocument.focusElementWithGivenOffset(hexEdit_1.virtualHexDocument.documentSize);
                hexEdit_1.virtualHexDocument.removeLastCell();
                continue;
            }
            const elements = util_1.getElementsWithGivenOffset(edit.offset);
            // We're executing an undo and the elements aren't on the DOM so there's no point in doing anything
            if (elements.length != 2)
                return;
            if (edit.sameOnDisk) {
                elements[0].classList.remove("edited");
                elements[1].classList.remove("edited");
            }
            else {
                elements[0].classList.add("edited");
                elements[1].classList.add("edited");
            }
            elements[0].innerText = edit.oldValue.toString(16).toUpperCase();
            elements[0].innerText = elements[0].innerText.length == 2 ? elements[0].innerText : `0${elements[0].innerText}`;
            util_1.updateAsciiValue(new byteData_1.ByteData(edit.oldValue), elements[1]);
            hexEdit_1.virtualHexDocument.focusElementWithGivenOffset(edit.offset);
        }
    }
    /**
     * @description Given a list of edits reapplies them to the document
     * @param {EditMessage[]} edits The list of edits to redo
     */
    redo(edits) {
        for (const edit of edits) {
            if (edit.newValue === undefined)
                continue;
            const elements = util_1.getElementsWithGivenOffset(edit.offset);
            // We're executing an redo and the elements aren't on the DOM so there's no point in doing anything
            if (elements.length != 2)
                continue;
            elements[0].classList.remove("add-cell");
            elements[1].classList.remove("add-cell");
            if (edit.sameOnDisk) {
                elements[0].classList.remove("edited");
                elements[1].classList.remove("edited");
            }
            else {
                elements[0].classList.add("edited");
                elements[1].classList.add("edited");
            }
            elements[0].innerText = edit.newValue.toString(16).toUpperCase();
            elements[0].innerText = elements[0].innerText.length == 2 ? elements[0].innerText : `0${elements[0].innerText}`;
            util_1.updateAsciiValue(new byteData_1.ByteData(edit.newValue), elements[1]);
            // If no add cells are left we need to add more as this means we just replaced the end
            if (document.getElementsByClassName("add-cell").length === 0 && edit.oldValue === undefined) {
                // We are going to estimate the filesize and it will be resynced at the end if wrong
                // This is because we add 1 cell at a time therefore if we paste the filesize is larger than whats rendered breaking the plus cell logic
                // This causes issues so this is a quick fix, another fix would be to apply all cells at once
                hexEdit_1.virtualHexDocument.updateDocumentSize(hexEdit_1.virtualHexDocument.documentSize + 1);
                hexEdit_1.virtualHexDocument.createAddCell();
            }
            hexEdit_1.virtualHexDocument.focusElementWithGivenOffset(edit.offset);
        }
    }
    /**
     * @description Handles when a user copies
     * @param {ClipboardEvent} event The clibpoard event passed to a copy event handler
     */
    copy(event) {
        var _a, _b;
        (_a = event.clipboardData) === null || _a === void 0 ? void 0 : _a.setData("text/json", JSON.stringify(selectHandler_1.SelectHandler.getSelectedHex()));
        (_b = event.clipboardData) === null || _b === void 0 ? void 0 : _b.setData("text/plain", selectHandler_1.SelectHandler.getSelectedValue());
        event.preventDefault();
    }
    /**
     * @description Handles when a user pastes
     * @param {ClipboardEvent} event The clibpoard event passed to a paste event handler
     */
    async paste(event) {
        // If what's on the clipboard isn't json we won't try to past it in
        if (!event.clipboardData || event.clipboardData.types.indexOf("text/json") < 0)
            return;
        const hexData = JSON.parse(event.clipboardData.getData("text/json"));
        // We do Array.from() as this makes it so the array no longer is tied to the dom who's selection may change during this paste
        const selected = Array.from(document.getElementsByClassName("selected hex"));
        const edits = [];
        // We apply as much of the hex data as we can based on the selection
        for (let i = 0; i < selected.length && i < hexData.length; i++) {
            const element = selected[i];
            const offset = util_1.getElementsOffset(element);
            const currentEdit = {
                offset: offset,
                previousValue: element.innerText === "+" ? undefined : element.innerText,
                newValue: hexData[i],
                element: element
            };
            element.classList.remove("add-cell");
            // Not really an edit if nothing changed
            if (currentEdit.newValue == currentEdit.previousValue) {
                continue;
            }
            element.innerText = hexData[i];
            this.updateAscii(element.innerText, offset);
            element.classList.add("edited");
            // Means the last cell of the document was filled in so we add another placeholder afterwards
            if (currentEdit.previousValue === undefined) {
                // Since we don't send all the edits until the end we need to estimate what the current file size is during this operation or the last cells won't be added correctly
                hexEdit_1.virtualHexDocument.updateDocumentSize(hexEdit_1.virtualHexDocument.documentSize + 1);
                hexEdit_1.virtualHexDocument.createAddCell();
                selected.push(util_1.getElementsWithGivenOffset(hexEdit_1.virtualHexDocument.documentSize)[0]);
            }
            edits.push(currentEdit);
        }
        await this.sendEditToExtHost(edits);
        event.preventDefault();
    }
    /**
     * @description Called when the user executes the revert command or when the document changes on disk and there are no unsaved edits
     */
    revert() {
        hexEdit_1.virtualHexDocument.reRequestChunks();
    }
}
exports.EditHandler = EditHandler;


/***/ }),

/***/ "./media/eventHandlers.ts":
/*!********************************!*\
  !*** ./media/eventHandlers.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeEndianness = exports.toggleHover = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./media/util.ts");
const dataInspector_1 = __webpack_require__(/*! ./dataInspector */ "./media/dataInspector.ts");
/**
 * @description Toggles the hover on a cell
 * @param {MouseEvent} event The event which is handed to a mouse event listener
 */
function toggleHover(event) {
    const elements = util_1.getElementsGivenMouseEvent(event);
    if (elements.length === 0)
        return;
    elements[0].classList.toggle("hover");
    elements[1].classList.toggle("hover");
}
exports.toggleHover = toggleHover;
// This is bound to the on change event for the select which decides to render big or little endian
/**
 * @description Handles when the user changes the dropdown for whether they want little or big endianness
 */
function changeEndianness() {
    if (document.activeElement) {
        // Since the inspector has no sense of state, it doesn't know what byte it is currently rendering
        // We must retrieve it based on the dom
        const elements = util_1.getElementsWithGivenOffset(util_1.getElementsOffset(document.activeElement));
        const byte_obj = util_1.retrieveSelectedByteObject(elements);
        if (!byte_obj)
            return;
        const littleEndian = document.getElementById("endianness").value === "little";
        dataInspector_1.populateDataInspector(byte_obj, littleEndian);
    }
}
exports.changeEndianness = changeEndianness;


/***/ }),

/***/ "./media/hexEdit.ts":
/*!**************************!*\
  !*** ./media/hexEdit.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageHandler = exports.chunkHandler = exports.virtualHexDocument = exports.vscode = void 0;
const virtualDocument_1 = __webpack_require__(/*! ./virtualDocument */ "./media/virtualDocument.ts");
const chunkHandler_1 = __webpack_require__(/*! ./chunkHandler */ "./media/chunkHandler.ts");
const messageHandler_1 = __webpack_require__(/*! ./messageHandler */ "./media/messageHandler.ts");
exports.vscode = acquireVsCodeApi();
// Construct a chunk handler which holds chunks of 50 rows (50 * 16)
exports.chunkHandler = new chunkHandler_1.ChunkHandler(800);
// Message handler which will handle the messages between the exthost and the webview (We'll allow a max of 10 pending requests)
exports.messageHandler = new messageHandler_1.MessageHandler(10);
/**
 * @description Fires when the user clicks the openAnyway link on large files
 */
function openAnyway() {
    exports.messageHandler.postMessage("open-anyways");
}
// Self executing anonymous function
// This is the main entry point
(() => {
    // Handle messages from the extension
    window.addEventListener("message", async (e) => {
        const { type, body } = e.data;
        switch (type) {
            case "init":
                {
                    // Loads the html body sent over
                    if (body.html !== undefined) {
                        document.getElementsByTagName("body")[0].innerHTML = body.html;
                        exports.virtualHexDocument = new virtualDocument_1.VirtualDocument(body.fileSize);
                        // We initially load 4 chunks below the viewport (normally we buffer 2 above as well, but there is no above at the start)
                        exports.chunkHandler.ensureBuffer(exports.virtualHexDocument.topOffset(), {
                            topBufferSize: 0,
                            bottomBufferSize: 5
                        });
                    }
                    if (body.fileSize != 0 && body.html === undefined) {
                        document.getElementsByTagName("body")[0].innerHTML =
                            `
							<div>
							<p>Opening this large file may cause instability. <a id="open-anyway" href="#">Open anyways</a></p>
							</div>
                        `;
                        // We construct the element right above this so it is definitely never null
                        document.getElementById("open-anyway").addEventListener("click", openAnyway);
                        return;
                    }
                    return;
                }
            case "update":
                {
                    if (body.type === "undo") {
                        exports.virtualHexDocument.undo(body.edits, body.fileSize);
                    }
                    else if (body.type === "redo") {
                        exports.virtualHexDocument.redo(body.edits, body.fileSize);
                    }
                    else {
                        exports.virtualHexDocument.revert(body.fileSize);
                    }
                    return;
                }
            case "save":
                {
                    const dirtyCells = Array.from(document.getElementsByClassName("edited"));
                    dirtyCells.map(cell => cell.classList.remove("edited"));
                    return;
                }
            default:
                {
                    exports.messageHandler.incomingMessageHandler(e.data);
                    return;
                }
        }
    });
    // Signal to VS Code that the webview is initialized.
    exports.messageHandler.postMessage("ready");
})();


/***/ }),

/***/ "./media/messageHandler.ts":
/*!*********************************!*\
  !*** ./media/messageHandler.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHandler = void 0;
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
/**
 * Class which handles messages between the webview and the exthost
 */
class MessageHandler {
    /**
     * @description Creates a new MessageHandler
     * @param maximumRequests The maximum number of requests
     */
    constructor(maximumRequests) {
        this.maxRequests = maximumRequests;
        this.requestsMap = new Map();
        this.requestId = 0;
    }
    /**
     * @description Posts to the extension host a message and returns a promise which if successful will resolve to the response
     * @param {string} type A string defining the type of message so it can be correctly handled on both ends
     * @param {any} body The payload
     * @returns {Promise<any>} A promise which resolves to the response or rejects if the request times out
     */
    async postMessageWithResponse(type, body) {
        var _a;
        const promise = new Promise((resolve, reject) => this.requestsMap.set(this.requestId, { resolve, reject }));
        // We remove the oldest request if the current request queue is full
        // This doesn't stop the request on the Ext host side, but it will be dropped when it's received, which lessens the load on the webview
        if (this.requestsMap.size > this.maxRequests) {
            const removed = this.requestsMap.keys().next().value;
            (_a = this.requestsMap.get(removed)) === null || _a === void 0 ? void 0 : _a.reject("Request Timed out");
            this.requestsMap.delete(removed);
        }
        hexEdit_1.vscode.postMessage({ requestId: this.requestId++, type, body });
        return promise;
    }
    /**
     * @description Post to the extension host as a message in a fire and forget manner, not expecting a response
     * @param {string} type A string defining the type of message so it can be correctly handled on both ends
     * @param {any} body The payload
     */
    postMessage(type, body) {
        hexEdit_1.vscode.postMessage({ type, body });
    }
    /**
     * @description For every incoming message that isn't the init
     * @param message The message received
     */
    incomingMessageHandler(message) {
        const request = this.requestsMap.get(message.requestId);
        // We should never get a rogue response from the webview unless it's an init.
        // So if the message isn't being tracked by the message handler, we drop it
        if (!request)
            return;
        request.resolve(message.body);
        this.requestsMap.delete(message.requestId);
    }
}
exports.MessageHandler = MessageHandler;


/***/ }),

/***/ "./media/searchHandler.ts":
/*!********************************!*\
  !*** ./media/searchHandler.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchHandler = void 0;
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
const selectHandler_1 = __webpack_require__(/*! ./selectHandler */ "./media/selectHandler.ts");
const util_1 = __webpack_require__(/*! ./util */ "./media/util.ts");
class SearchHandler {
    constructor() {
        var _a;
        this.searchType = "hex";
        this.resultIndex = 0;
        this.preserveCase = false;
        this.searchResults = [];
        this.searchOptions = {
            regex: false,
            caseSensitive: false
        };
        this.findTextBox = document.getElementById("find");
        this.replaceTextBox = document.getElementById("replace");
        this.replaceButton = document.getElementById("replace-btn");
        this.replaceAllButton = document.getElementById("replace-all");
        this.findPreviousButton = document.getElementById("find-previous");
        this.findNextButton = document.getElementById("find-next");
        this.stopSearchButton = document.getElementById("search-stop");
        this.findNextButton.addEventListener("click", () => this.findNext(true));
        this.findPreviousButton.addEventListener("click", () => this.findPrevious(true));
        this.updateInputGlyphs();
        // Whenever the user changes the data type we update the type we're searching for and the glyphs on the input box
        (_a = document.getElementById("data-type")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", (event) => {
            const selectedValue = event.target.value;
            this.searchType = selectedValue;
            this.updateInputGlyphs();
            this.search();
        });
        this.searchOptionsHandler();
        this.replaceOptionsHandler();
        // When the user presses a key trigger a search
        this.findTextBox.addEventListener("keyup", (event) => {
            // Some VS Code keybinding defualts for find next, find previous, and focus restore
            if ((event.key === "Enter" || event.key === "F3") && event.shiftKey) {
                this.findPrevious(false);
            }
            else if (event.key === "Enter" || event.key === "F3") {
                this.findNext(false);
            }
            else if (event.key === "Escape") {
                // Pressing escape returns focus to the editor
                const selected = document.getElementsByClassName(`selected ${this.searchType}`)[0];
                if (selected !== undefined) {
                    selected.focus();
                }
                else {
                    hexEdit_1.virtualHexDocument.focusElementWithGivenOffset(hexEdit_1.virtualHexDocument.topOffset());
                }
            }
            else if (event.ctrlKey || new RegExp("(^Arrow|^End|^Home)", "i").test(event.key)) {
                // If it's any sort of navigation key we don't want to trigger another search as nothing has changed
                return;
            }
            else {
                this.search();
            }
        });
        window.addEventListener("keyup", (event) => {
            // Fin previous + find next when widget isn't focused
            if (event.key === "F3" && event.shiftKey && document.activeElement !== this.findTextBox) {
                this.findPrevious(true);
                event.preventDefault();
            }
            else if (event.key === "F3" && document.activeElement !== this.findTextBox) {
                this.findNext(true);
                event.preventDefault();
            }
        });
        this.replaceTextBox.addEventListener("keyup", this.updateReplaceButtons.bind(this));
        this.replaceButton.addEventListener("click", () => this.replace(false));
        this.replaceAllButton.addEventListener("click", () => this.replace(true));
        this.stopSearchButton.addEventListener("click", this.cancelSearch.bind(this));
        // Hide the message boxes for now as at first we have no messages to display
        document.getElementById("find-message-box").hidden = true;
        document.getElementById("replace-message-box").hidden = true;
    }
    /**
     * @description Sends a search request to the exthost
     */
    async search() {
        // If the box is empty no need to display any warnings
        if (this.findTextBox.value === "")
            this.removeInputMessage("find");
        // This gets called to cancel any searches that might be going on now
        this.cancelSearch();
        hexEdit_1.virtualHexDocument.setSelection([]);
        this.searchResults = [];
        this.updateReplaceButtons();
        this.findNextButton.classList.add("disabled");
        this.findPreviousButton.classList.add("disabled");
        let query = this.findTextBox.value;
        const hexSearchRegex = new RegExp("^[a-fA-F0-9? ]+$");
        // We check to see if the hex is a valid query else we don't allow a search
        if (this.searchType === "hex" && !hexSearchRegex.test(query)) {
            if (query.length > 0)
                this.addInputMessage("find", "Invalid query", "error");
            return;
        }
        // Test if it's a valid regex
        if (this.searchOptions.regex) {
            try {
                new RegExp(query);
            }
            catch (err) {
                // Split up the error message to fit in the box. In the future we might want the box to do word wrapping
                // So that it's not a manual endeavor
                const message = err.message.substr(0, 27) + "\n" + err.message.substr(27);
                this.addInputMessage("find", message, "error");
                return;
            }
        }
        query = this.searchType === "hex" ? util_1.hexQueryToArray(query) : query;
        if (query.length === 0) {
            // If the user didn't type anything and its just a blank query we don't want to error on them
            if (this.findTextBox.value.length > 0)
                this.addInputMessage("find", "Invalid query", "error");
            return;
        }
        this.stopSearchButton.classList.remove("disabled");
        let results;
        this.removeInputMessage("find");
        // This is wrapped in a try catch because if the message handler gets backed up this will reject
        try {
            results = (await hexEdit_1.messageHandler.postMessageWithResponse("search", {
                query: query,
                type: this.searchType,
                options: this.searchOptions
            })).results;
        }
        catch (err) {
            this.stopSearchButton.classList.add("disabled");
            this.addInputMessage("find", "Search returned an error!", "error");
            return;
        }
        if (results.partial) {
            this.addInputMessage("find", "Partial results returned, try\n narrowing your query.", "warning");
        }
        this.stopSearchButton.classList.add("disabled");
        this.resultIndex = 0;
        this.searchResults = results.result;
        // If we got results then we select the first result and unlock the buttons
        if (this.searchResults.length !== 0) {
            await hexEdit_1.virtualHexDocument.scrollDocumentToOffset(this.searchResults[this.resultIndex][0]);
            hexEdit_1.virtualHexDocument.setSelection(this.searchResults[this.resultIndex]);
            // If there's more than one search result we unlock the find next button
            if (this.resultIndex + 1 < this.searchResults.length) {
                this.findNextButton.classList.remove("disabled");
            }
            this.updateReplaceButtons();
        }
    }
    /**
     * @description Handles when the user clicks the find next icon
     * @param {boolean} focus Whether or not to focus the selection
     */
    async findNext(focus) {
        // If the button is disabled then this function shouldn't work
        if (this.findNextButton.classList.contains("disabled"))
            return;
        await hexEdit_1.virtualHexDocument.scrollDocumentToOffset(this.searchResults[++this.resultIndex][0]);
        hexEdit_1.virtualHexDocument.setSelection(this.searchResults[this.resultIndex]);
        if (focus)
            selectHandler_1.SelectHandler.focusSelection(this.searchType);
        // If there's more than one search result we unlock the find next button
        if (this.resultIndex < this.searchResults.length - 1) {
            this.findNextButton.classList.remove("disabled");
        }
        else {
            this.findNextButton.classList.add("disabled");
        }
        // We also unlock the find previous button if there is a previous
        if (this.resultIndex != 0) {
            this.findPreviousButton.classList.remove("disabled");
        }
    }
    /**
     * @description Handles when the user clicks the find previous icon
     * @param {boolean} focus Whether or not to focus the selection
     */
    async findPrevious(focus) {
        // If the button is disabled then this function shouldn't work
        if (this.findPreviousButton.classList.contains("disabled"))
            return;
        await hexEdit_1.virtualHexDocument.scrollDocumentToOffset(this.searchResults[--this.resultIndex][0]);
        hexEdit_1.virtualHexDocument.setSelection(this.searchResults[this.resultIndex]);
        if (focus)
            selectHandler_1.SelectHandler.focusSelection(this.searchType);
        // If they pressed previous, they can always go next therefore we always unlock the next button
        this.findNextButton.classList.remove("disabled");
        // We lock the find previous if there isn't a previous anymore
        if (this.resultIndex == 0) {
            this.findPreviousButton.classList.add("disabled");
        }
    }
    /**
     * @description Handles when the user toggels between text and hex showing the input glyphs and ensureing correct padding
     */
    updateInputGlyphs() {
        // The glyph icons that sit in the find and replace bar
        const inputGlyphs = document.getElementsByClassName("bar-glyphs");
        const inputFields = document.querySelectorAll(".bar > .input-glyph-group > input");
        if (this.searchType == "hex") {
            inputGlyphs[0].hidden = true;
            inputGlyphs[1].hidden = true;
            document.documentElement.style.setProperty("--input-glyph-padding", "0px");
        }
        else {
            for (let i = 0; i < inputGlyphs.length; i++) {
                inputGlyphs[i].hidden = false;
            }
            const glyphRect = inputGlyphs[0].getBoundingClientRect();
            const inputRect = inputFields[0].getBoundingClientRect();
            // Calculates how much padding we should have so that the text doesn't run into the glyphs
            const inputPadding = (inputRect.x + inputRect.width + 1) - glyphRect.x;
            document.documentElement.style.setProperty("--input-glyph-padding", `${inputPadding}px`);
        }
    }
    /**
     * @description Handles listening to the search options and updating them
     */
    searchOptionsHandler() {
        var _a, _b;
        // Toggle Regex
        (_a = document.getElementById("regex-icon")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
            const regexIcon = event.target;
            if (regexIcon.classList.contains("toggled")) {
                this.searchOptions.regex = false;
                regexIcon.classList.remove("toggled");
            }
            else {
                this.searchOptions.regex = true;
                regexIcon.classList.add("toggled");
            }
            // The user is changing an option so we should trigger another search
            this.search();
        });
        // Toggle case sensitive
        (_b = document.getElementById("case-sensitive")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", (event) => {
            const caseSensitive = event.target;
            if (caseSensitive.classList.contains("toggled")) {
                this.searchOptions.caseSensitive = false;
                caseSensitive.classList.remove("toggled");
            }
            else {
                this.searchOptions.caseSensitive = true;
                caseSensitive.classList.add("toggled");
            }
            // The user is changing an option so we should trigger another search
            this.search();
        });
    }
    replaceOptionsHandler() {
        var _a;
        // Toggle preserve case
        (_a = document.getElementById("preserve-case")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (event) => {
            const preserveCase = event.target;
            if (preserveCase.classList.contains("toggled")) {
                this.preserveCase = false;
                preserveCase.classList.remove("toggled");
            }
            else {
                this.preserveCase = true;
                preserveCase.classList.add("toggled");
            }
        });
    }
    /**
     * @description Handles when the user hits the stop search button
     */
    cancelSearch() {
        if (this.stopSearchButton.classList.contains("disabled"))
            return;
        // We don't want the user to keep executing this, so we disable the button after the first search
        this.stopSearchButton.classList.add("disabled");
        // We send a cancellation message to the exthost, there's no need to  wait for a response
        // As we're not expecting anything back just to stop processing the search
        hexEdit_1.messageHandler.postMessageWithResponse("search", { cancel: true });
    }
    /**
     * @description Helper function which handles locking / unlocking the replace buttons
     */
    updateReplaceButtons() {
        this.removeInputMessage("replace");
        const hexReplaceRegex = new RegExp("^[a-fA-F0-9]+$");
        // If it's not a valid hex query we lock the buttons, we remove whitespace from the string to simplify the regex
        const queryNoSpaces = this.replaceTextBox.value.replace(/\s/g, "");
        if (this.searchType === "hex" && !hexReplaceRegex.test(queryNoSpaces)) {
            this.replaceAllButton.classList.add("disabled");
            this.replaceButton.classList.add("disabled");
            if (this.replaceTextBox.value.length > 0)
                this.addInputMessage("replace", "Invalid replacement", "error");
            return;
        }
        const replaceQuery = this.replaceTextBox.value;
        const replaceArray = this.searchType === "hex" ? util_1.hexQueryToArray(replaceQuery) : Array.from(replaceQuery);
        if (this.searchResults.length !== 0 && replaceArray.length !== 0) {
            this.replaceAllButton.classList.remove("disabled");
            this.replaceButton.classList.remove("disabled");
        }
        else {
            if (this.replaceTextBox.value.length > 0 && replaceArray.length === 0)
                this.addInputMessage("replace", "Invalid replacement", "error");
            this.replaceAllButton.classList.add("disabled");
            this.replaceButton.classList.add("disabled");
        }
    }
    /**
     * @description Handles when the user clicks replace or replace all
     * @param {boolean} all whether this is a normal replace or a replace all
     */
    async replace(all) {
        const replaceQuery = this.replaceTextBox.value;
        const replaceArray = this.searchType === "hex" ? util_1.hexQueryToArray(replaceQuery) : Array.from(replaceQuery);
        let replaceBits = [];
        // Since the exthost only holds data in 8 bit unsigned ints we must convert it back
        if (this.searchType === "hex") {
            replaceBits = replaceArray.map(val => parseInt(val, 16));
        }
        else {
            replaceBits = replaceArray.map(val => val.charCodeAt(0));
        }
        let offsets = [];
        if (all) {
            offsets = this.searchResults;
        }
        else {
            offsets = [this.searchResults[this.resultIndex]];
        }
        const edits = (await hexEdit_1.messageHandler.postMessageWithResponse("replace", {
            query: replaceBits,
            offsets: offsets,
            preserveCase: this.preserveCase
        })).edits;
        // We can pass the size of the document back in because with the current implementation
        // The size of the document will never change as we only replace preexisting cells
        hexEdit_1.virtualHexDocument.redo(edits, hexEdit_1.virtualHexDocument.documentSize);
        this.findNext(true);
    }
    /**
     * @description Function responsible for handling when the user presses cmd / ctrl + f updating the widget and focusing it
     */
    searchKeybindingHandler() {
        var _a;
        this.searchType = ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains("ascii")) ? "ascii" : "hex";
        const dataTypeSelect = document.getElementById("data-type");
        dataTypeSelect.value = this.searchType;
        dataTypeSelect.dispatchEvent(new Event("change"));
        this.findTextBox.focus();
    }
    /**
     * @description Adds an warning / error message to the input box passed in
     * @param {"find" | "replace"} inputBoxName Whether it's the find input box or the replace input box
     * @param {string} message The message to display
     * @param {"error" | "warning"} type Whether it's an error message or a warning message
     */
    addInputMessage(inputBoxName, message, type) {
        const inputBox = inputBoxName === "find" ? this.findTextBox : this.replaceTextBox;
        const messageBox = document.getElementById(`${inputBoxName}-message-box`);
        // We try to do the least amount of DOM changing as to reduce the flashing the user sees
        if (messageBox.innerText === message && messageBox.classList.contains(`input-${type}`)) {
            return;
        }
        else if (messageBox.classList.contains(`input-${type}`)) {
            messageBox.innerText = message;
            return;
        }
        else {
            this.removeInputMessage("find", true);
            messageBox.innerText = message;
            // Add the classes for proper styling of the message
            inputBox.classList.add(`${type}-border`);
            messageBox.classList.add(`${type}-border`, `input-${type}`);
            messageBox.hidden = false;
        }
    }
    /**
     * @description Removes the warning / error message
     * @param {"find" | "replace"} inputBoxName Which input box to remove the message from
     * @param {boolean | undefined} skipHiding Whether we want to skip hiding the empty message box, this is useful for clearing the box to add new text
     */
    removeInputMessage(inputBoxName, skipHiding) {
        const inputBox = inputBoxName === "find" ? this.findTextBox : this.replaceTextBox;
        const errorMessageBox = document.getElementById(`${inputBoxName}-message-box`);
        // Add the classes for proper styling of the message
        inputBox.classList.remove("error-border", "warning-border");
        errorMessageBox.classList.remove("error-border", "warning-border", "input-warning", "input-error");
        if (skipHiding !== true)
            errorMessageBox.hidden = true;
    }
}
exports.SearchHandler = SearchHandler;


/***/ }),

/***/ "./media/selectHandler.ts":
/*!********************************!*\
  !*** ./media/selectHandler.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectHandler = void 0;
const util_1 = __webpack_require__(/*! ./util */ "./media/util.ts");
const webviewStateManager_1 = __webpack_require__(/*! ./webviewStateManager */ "./media/webviewStateManager.ts");
class SelectHandler {
    constructor() {
        this._selection = [];
    }
    /**
     * @description Given an offset selects the elements. This does not clear the previously selected elements.
     * @param {number} offset Offset to select
     * @param {boolean} force If force is not given, toggles selection. If force is true selects the element.
     * If force is false deselects the element.
     */
    static toggleSelectOffset(offset, force) {
        const elements = util_1.getElementsWithGivenOffset(offset);
        if (elements.length === 0) {
            // Element may not be part of the DOM
            return;
        }
        elements[0].classList.toggle("selected", force);
        elements[1].classList.toggle("selected", force);
    }
    /***
     * @description Returns the offset of the element currently focused.
     * @returns {number} The offset of the element currently focused
     */
    getFocused() {
        return this._focus;
    }
    /***
     * @description Set the offset of the element currently focused.
     * @param {number} offset The offset the element currently focused
     */
    setFocused(offset) {
        this._focus = offset;
    }
    /***
     * @description Returns the offset from which the selection starts.
     * @returns {number} The offset from which the selection starts
     */
    getSelectionStart() {
        var _a;
        return (_a = this._selectionStart) !== null && _a !== void 0 ? _a : this._focus;
    }
    /***
     * @description Returns the offsets of the elements currently selected.
     * @returns {number[]} The offsets of the elements currently selected
     */
    getSelected() {
        var _a;
        return (_a = webviewStateManager_1.WebViewStateManager.getProperty("selected_offsets")) !== null && _a !== void 0 ? _a : [];
    }
    /***
     * @description Given an array of offsets, selects the corresponding elements.
     * @param {number[]} offsets The offsets of the elements you want to select
     * @param {number} start The offset from which the selection starts
     * @param {boolean} forceRender Wheter to force rendering of all elements whose
     * selected stated will change
     */
    setSelected(offsets, start, forceRender = false) {
        const oldSelection = this._selection;
        this._selectionStart = start;
        this._selection = [...offsets].sort((a, b) => a - b);
        webviewStateManager_1.WebViewStateManager.setProperty("selected_offsets", this._selection);
        // Need to call renderSelection with the least number of offsets to avoid querying the DOM
        // as much as possible, if not rendering large selections becomes laggy as we dont hold references
        // to the DOM elements
        const toRender = forceRender ? util_1.disjunction(oldSelection, this._selection) : util_1.relativeComplement(oldSelection, this._selection);
        this.renderSelection(toRender);
    }
    /***
     * @description Renders the updated selection state of selected/unselected elements
     * @param {number[]} offsets The offsets of the elements to render
     */
    renderSelection(offsets) {
        const contains = (offset) => util_1.binarySearch(this._selection, offset, (a, b) => a - b) >= 0;
        for (const offset of offsets) {
            SelectHandler.toggleSelectOffset(offset, contains(offset));
        }
    }
    /***
     * @description Grabs the hex values of the selected bytes
     * @returns {string[]} The hex values
     */
    static getSelectedHex() {
        const hex = [];
        const selected = document.getElementsByClassName("selected hex");
        for (let i = 0; i < selected.length; i++) {
            if (selected[i].innerText === "+")
                continue;
            hex.push(selected[i].innerText);
        }
        return hex;
    }
    /**
     * @description Focuses the first element in the current selection based on the section passed in
     * @param section {"hex" | "ascii"} The section to place the focus
     */
    static focusSelection(section) {
        const selection = document.getElementsByClassName(`selected ${section}`);
        if (selection.length !== 0)
            selection[0].focus();
    }
    /**
     * @description Retrieves the selection as a string, defaults to hex if there is no focus on either side
     * @returns {string} The selection represented as a string
     */
    static getSelectedValue() {
        var _a;
        let selectedValue = "";
        let section = "hex";
        let selectedElements;
        if ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains("ascii")) {
            section = "ascii";
            selectedElements = document.getElementsByClassName("selected ascii");
        }
        else {
            selectedElements = document.getElementsByClassName("selected hex");
        }
        for (const element of selectedElements) {
            if (element.innerText === "+")
                continue;
            selectedValue += element.innerText;
            if (section === "hex")
                selectedValue += " ";
        }
        // If it's hex we want to remove the last space as it doesn't make sense
        // For ascii that space might have meaning
        if (section === "hex")
            selectedValue = selectedValue.trimRight();
        return selectedValue;
    }
}
exports.SelectHandler = SelectHandler;


/***/ }),

/***/ "./media/srollBarHandler.ts":
/*!**********************************!*\
  !*** ./media/srollBarHandler.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollBarHandler = void 0;
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
const webviewStateManager_1 = __webpack_require__(/*! ./webviewStateManager */ "./media/webviewStateManager.ts");
class ScrollBarHandler {
    /**
     * Given a scrollbar element instantiates a handler which handles the scrolling behavior in the editor
     * @param {string} scrollBarId the id of the scrollbar element on the DOM
     * @param {number} rowHeight the height of a row in px
     */
    constructor(scrollBarId, numRows, rowHeight) {
        this.scrollTop = 0;
        this.isDragging = false;
        // If the scrollbar isn't on the DOM for some reason there's nothing we can do besides create an empty handler and throw an error
        if (document.getElementById(scrollBarId)) {
            this.scrollBar = document.getElementById(scrollBarId);
            this.scrollThumb = this.scrollBar.children[0];
        }
        else {
            this.scrollBar = document.createElement("div");
            this.scrollThumb = document.createElement("div");
            throw "Invalid scrollbar id!";
        }
        window.addEventListener("wheel", this.onMouseWheel.bind(this));
        this.scrollBar.addEventListener("mousedown", () => {
            this.scrollThumb.classList.add("scrolling");
            this.isDragging = true;
        });
        this.scrollBar.addEventListener("mouseup", () => {
            this.scrollThumb.classList.remove("scrolling");
            this.isDragging = false;
        });
        window.addEventListener("mousemove", this.scrollThumbDrag.bind(this));
        this.rowHeight = rowHeight;
        this.updateScrollBar(numRows);
    }
    /**
     * @description Handles ensuring the scrollbar is valid after window resize
     * @param {number} numRows The number of rows in the file, needed to map scroll bar to row locations
     */
    updateScrollBar(numRows) {
        // Some calculations so that the thumb / scrubber is representative of how much content there is
        // Credit to https://stackoverflow.com/questions/16366795/how-to-calculate-the-size-of-scroll-bar-thumb for these calculations
        const contentHeight = (numRows + 1) * this.rowHeight;
        this.scrollBarHeight = this.scrollBar.clientHeight;
        // We don't want the scroll thumb larger than the scrollbar
        this.scrollThumbHeight = Math.min(this.scrollBarHeight, Math.max(this.scrollBarHeight * (this.scrollBarHeight / contentHeight), 30));
        this.scrollThumb.style.height = `${this.scrollThumbHeight}px`;
        // If you move the scrollbar 1px how much should the document move
        this.scrollJump = Math.max(0, (contentHeight - this.scrollBarHeight) / (this.scrollBarHeight - this.scrollThumbHeight));
        this.updateScrolledPosition();
    }
    /**
     * @description Handles when the user drags the thumb on the scrollbar around
     * @param {MouseEvent} event The mouse event passed to the event handler
     */
    scrollThumbDrag(event) {
        // if these are equal it means the document is too short to scroll anyways
        if (this.scrollBarHeight === this.scrollThumbHeight)
            return;
        // This helps the case where we lose track as the user releases the button outside the webview
        if (!this.isDragging || event.buttons == 0) {
            this.isDragging = false;
            this.scrollThumb.classList.remove("scrolling");
            return;
        }
        event.preventDefault();
        this.updateVirtualScrollTop(event.clientY * this.scrollJump);
        this.updateScrolledPosition();
    }
    /**
     * @description Updaes the position of the document and the scrollbar thumb based on the scrollTop
     */
    async updateScrolledPosition() {
        // The virtual document upon first load is undefined so we want to prevent any errors and just not do anything in that case
        if (!hexEdit_1.virtualHexDocument || !hexEdit_1.virtualHexDocument.documentHeight)
            return [];
        this.scrollThumb.style.transform = `translateY(${this.scrollTop / this.scrollJump}px)`;
        // This makes sure it doesn't scroll past the bottom of the viewport
        document.getElementsByClassName("rowwrapper")[0].style.transform = `translateY(-${this.scrollTop % hexEdit_1.virtualHexDocument.documentHeight}px)`;
        document.getElementsByClassName("rowwrapper")[1].style.transform = `translateY(-${this.scrollTop % hexEdit_1.virtualHexDocument.documentHeight}px)`;
        document.getElementsByClassName("rowwrapper")[2].style.transform = `translateY(-${this.scrollTop % hexEdit_1.virtualHexDocument.documentHeight}px)`;
        return hexEdit_1.virtualHexDocument.scrollHandler();
    }
    /**
     * @description Handles the user scrolling with their mouse wheel
     * @param {MouseWheelEvent} event The event containing information about the scroll passed to the event handler
     */
    onMouseWheel(event) {
        // if these are equal it means the document is too short to scroll anyways
        if (this.scrollBarHeight === this.scrollThumbHeight)
            return;
        if (Math.abs(event.deltaX) !== 0 || event.shiftKey)
            return;
        if (event.deltaY > 0) {
            this.updateVirtualScrollTop(this.scrollTop + this.rowHeight);
        }
        else {
            this.updateVirtualScrollTop(this.scrollTop - this.rowHeight);
        }
        this.updateScrolledPosition();
    }
    /**
     * @description Can be called to scroll the document similar to window.scrollBy
     * @param {number} numRows The number of rows you want to scroll
     * @param {"up" | "down"} direction The direction, up or down
     */
    async scrollDocument(numRows, direction) {
        if (direction === "up") {
            this.updateVirtualScrollTop(this.scrollTop - (this.rowHeight * numRows));
        }
        else {
            this.updateVirtualScrollTop(this.scrollTop + (this.rowHeight * numRows));
        }
        return this.updateScrolledPosition();
    }
    /**
     * @description Scrolls to the top of the document
     */
    scrollToTop() {
        this.updateVirtualScrollTop(0);
        this.updateScrolledPosition();
    }
    /**
     * @description Scrolls to the bottom of the document
     */
    scrollToBottom() {
        this.updateVirtualScrollTop(((this.scrollBarHeight - this.scrollThumbHeight) * this.scrollJump) + this.rowHeight);
        this.updateScrolledPosition();
    }
    /**
     * @description Controls scrolling up and down one viewport. Which occurs when the user presses page up or page down
     * @param {number} viewportHeight The height of the viewport in pixels
     * @param {string} direction Whether you want to page up or down
     */
    page(viewportHeight, direction) {
        if (direction == "up") {
            this.updateVirtualScrollTop(this.scrollTop - viewportHeight);
        }
        else {
            this.updateVirtualScrollTop(this.scrollTop + viewportHeight);
        }
        this.updateScrolledPosition();
    }
    /***
     * @description Sets the virtualScrollTop ensuring it never exceeds the document bounds
     * @param {number} newScrollTop The number you're trying to set the virtual scroll top to
     */
    updateVirtualScrollTop(newScrollTop) {
        this.scrollTop = Math.max(0, newScrollTop);
        newScrollTop = this.scrollTop;
        this.scrollTop = Math.min(newScrollTop, ((this.scrollBarHeight - this.scrollThumbHeight) * this.scrollJump) + this.rowHeight);
        webviewStateManager_1.WebViewStateManager.setProperty("scroll_top", this.scrollTop);
    }
    /**
     * @description Retrieves the pixel value at the top of the viewport
     * @returns {number} The pixel value of the virtual viewport top
     */
    get virtualScrollTop() {
        return this.scrollTop;
    }
    /**
     * @description Updates the scroll position to be whatever was saved in the webview state. Should only be called if the user has reloaded the webview
     */
    resyncScrollPosition() {
        // If we had a previously saved state when creating the scrollbar we should restore the scroll position
        if (webviewStateManager_1.WebViewStateManager.getState() && webviewStateManager_1.WebViewStateManager.getState().scroll_top) {
            this.updateVirtualScrollTop(webviewStateManager_1.WebViewStateManager.getState().scroll_top);
            this.updateScrolledPosition();
        }
    }
    /**
     * @description Scrolls to the given offset if it's outside the viewport
     * @param offset The offset to scroll to
     * @param force Whether or not you should scroll even if it's in the viewport
     */
    async scrollToOffset(offset, force) {
        // if these are equal it means the document is too short to scroll anyways
        if (this.scrollBarHeight === this.scrollThumbHeight)
            return [];
        const topOffset = hexEdit_1.virtualHexDocument.topOffset();
        // Don't scroll if in the viewport
        if (!force && offset >= topOffset && offset <= hexEdit_1.virtualHexDocument.bottomOffset())
            return [];
        const rowDifference = Math.floor(Math.abs(offset - topOffset) / 16);
        // The +3/-3 is because there is because we want the result to not be pressed against the top
        if (offset > topOffset) {
            return this.scrollDocument(rowDifference - 3, "down");
        }
        else {
            return this.scrollDocument(rowDifference + 3, "up");
        }
    }
}
exports.ScrollBarHandler = ScrollBarHandler;


/***/ }),

/***/ "./media/util.ts":
/*!***********************!*\
  !*** ./media/util.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.binarySearch = exports.relativeComplement = exports.disjunction = exports.hexQueryToArray = exports.createOffsetRange = exports.retrieveSelectedByteObject = exports.pad = exports.updateAsciiValue = exports.getElementsGivenMouseEvent = exports.getElementsOffset = exports.getElementsWithGivenOffset = exports.generateCharacterRanges = exports.withinAnyRange = exports.Range = void 0;
const byteData_1 = __webpack_require__(/*! ./byteData */ "./media/byteData.ts");
// Assorted helper functions
/**
 * @description Class which represents a range of numbers
 */
class Range {
    /**
     * @description Constructs a range object representing [start, end] inclusive of both
     * @param {number} start Represents the start of the range
     * @param {number} end Represents the end of the range
     */
    constructor(start, end = Number.MAX_SAFE_INTEGER) {
        if (start > end) {
            this.start = end;
            this.end = start;
        }
        else {
            this.start = start;
            this.end = end;
        }
    }
    /**
     * @desciption Tests if the given number if within the range
     * @param {number} num The number to test
     * @returns {boolean } True if the number is in the range, false otherwise
     */
    between(num) {
        if (this.end) {
            return num >= this.start && num <= this.end;
        }
        else {
            return num >= this.start;
        }
    }
}
exports.Range = Range;
/**
 * @description Checks if the given number is in any of the ranges
 * @param {number} num The number to use when checking the ranges
 * @param {Range[]} ranges The ranges to check the number against
 * @returns {boolean} True if the number is in any of the ranges, false otherwise
 */
function withinAnyRange(num, ranges) {
    for (const range of ranges) {
        if (range.between(num)) {
            return true;
        }
    }
    return false;
}
exports.withinAnyRange = withinAnyRange;
/**
 * @description Creates a list of ranges containing the non renderable 8 bit char codes
 * @returns {Range[]} The ranges which represent the non renderable 8 bit char codes
 */
function generateCharacterRanges() {
    const ranges = [];
    ranges.push(new Range(0, 31));
    ranges.push(new Range(127, 160));
    ranges.push(new Range(173, 173));
    ranges.push(new Range(256));
    return ranges;
}
exports.generateCharacterRanges = generateCharacterRanges;
/**
 * @description Given an offset gets all spans with that offset
 * @param {number} offset The offset to find elements of
 * @returns {HTMLCollectionOf<HTMLElement>} returns a list of HTMLElements which have the given offset
 */
function getElementsWithGivenOffset(offset) {
    return document.getElementsByClassName(`cell-offset-${offset}`);
}
exports.getElementsWithGivenOffset = getElementsWithGivenOffset;
/**
 * @description Given an element returns its offset or NaN if it doesn't have one
 * @param {HTMLElement} element The element to get the offset of
 * @returns {number} Returns the offset of the element or NaN
 */
function getElementsOffset(element) {
    for (const currentClass of element.classList) {
        if (currentClass.indexOf("cell-offset") !== -1) {
            const offset = parseInt(currentClass.replace("cell-offset-", ""));
            return offset;
        }
    }
    return NaN;
}
exports.getElementsOffset = getElementsOffset;
/**
 * @description Returns the elements with the same offset as the one clicked
 * @param {MouseEvent} event The event which is handed to a mouse event listener
 * @returns {HTMLCollectionOf<Element> | Array<Element>} The elements with the same offset as the clicked element, or undefined if none could be retrieved
 */
function getElementsGivenMouseEvent(event) {
    if (!event || !event.target)
        return [];
    const hovered = event.target;
    return getElementsWithGivenOffset(getElementsOffset(hovered));
}
exports.getElementsGivenMouseEvent = getElementsGivenMouseEvent;
/**
 * @description Given a bytedata object updates the ascii element with the correct decoded text
 * @param {ByteData} byteData The object containing information about a given byte
 * @param {HTMLSpanElement} asciiElement The decoded text element on the DOM
 */
function updateAsciiValue(byteData, asciiElement) {
    asciiElement.classList.remove("nongraphic");
    // If it's some sort of character we cannot render we just represent it as a period with the nographic class
    if (withinAnyRange(byteData.to8bitUInt(), generateCharacterRanges())) {
        asciiElement.classList.add("nongraphic");
        asciiElement.innerText = ".";
    }
    else {
        const ascii_char = String.fromCharCode(byteData.to8bitUInt());
        asciiElement.innerText = ascii_char;
    }
}
exports.updateAsciiValue = updateAsciiValue;
/**
 * @description Given a string 0 pads it up unitl the string is of length width
 * @param {string} number The number you want to 0 pad (it's a string as you're 0 padding it to display it, not to do arithmetic)
 * @param {number} width The length of the final string (if smaller than the string provided nothing happens)
 * @returns {string} The newly padded string
 */
function pad(number, width) {
    number = number + "";
    return number.length >= width ? number : new Array(width - number.length + 1).join("0") + number;
}
exports.pad = pad;
/**
 * @description Given two elements (the hex and ascii elements), returns a ByteData object representing both of them
 * @param {HTMLCollectionOf<Element>} elements The elements representing the hex and associated ascii on the DOM
 * @returns {ByteData | undefined} The ByteData object or undefined if elements was malformed or empty
 */
function retrieveSelectedByteObject(elements) {
    var _a, _b, _c;
    for (const element of Array.from(elements)) {
        if (element.parentElement && element.classList.contains("hex")) {
            const byte_object = new byteData_1.ByteData(parseInt(element.innerHTML, 16));
            let current_element = element.nextElementSibling || ((_a = element.parentElement.nextElementSibling) === null || _a === void 0 ? void 0 : _a.children[0]);
            for (let i = 0; i < 7; i++) {
                if (!current_element || current_element.innerHTML === "+")
                    break;
                byte_object.addAdjacentByte(new byteData_1.ByteData(parseInt(current_element.innerHTML, 16)));
                current_element = current_element.nextElementSibling || ((_c = (_b = current_element.parentElement) === null || _b === void 0 ? void 0 : _b.nextElementSibling) === null || _c === void 0 ? void 0 : _c.children[0]);
            }
            return byte_object;
        }
    }
    return;
}
exports.retrieveSelectedByteObject = retrieveSelectedByteObject;
/**
 * @description Given a start and end offset creates an array containing all the offsets in between, inclusive of start and end
 * @param {number} startOffset The offset which defines the start of the range
 * @param {number} endOffset The offset which defines the end of the range
 * @returns {number[]} The range [startOffset, endOffset]
 */
function createOffsetRange(startOffset, endOffset) {
    const offsetsToSelect = [];
    // We flip them so that the for loop creates the range correctly
    if (endOffset < startOffset) {
        const temp = endOffset;
        endOffset = startOffset;
        startOffset = temp;
    }
    // Create an array of offsets with everything between the last selected element and what the user hit shift
    for (let i = startOffset; i <= endOffset; i++) {
        offsetsToSelect.push(i);
    }
    return offsetsToSelect;
}
exports.createOffsetRange = createOffsetRange;
/**
 * @description Converts a hex query to a string array ignoring spaces, if not evenly divisible we append a leading 0
 * i.e A -> 0A
 * @param {string} query The query to convert to an array
 */
function hexQueryToArray(query) {
    let currentCharacterSequence = "";
    const queryArray = [];
    for (let i = 0; i < query.length; i++) {
        if (query[i] === " ")
            continue;
        currentCharacterSequence += query[i];
        if (currentCharacterSequence.length === 2) {
            queryArray.push(currentCharacterSequence);
            currentCharacterSequence = "";
        }
    }
    if (currentCharacterSequence.length > 0) {
        queryArray.push("0" + currentCharacterSequence);
    }
    return queryArray;
}
exports.hexQueryToArray = hexQueryToArray;
/**
 * @description Given two sorted collections of numbers, returns the union
 * between them (OR).
 * @param {number[]} one The first sorted array of numbers
 * @param {number[]} other The other sorted array of numbers
 * @returns {number[]} A sorted collections of numbers representing the union (OR)
 * between to sorted collections of numbers
 */
function disjunction(one, other) {
    const result = [];
    let i = 0, j = 0;
    while (i < one.length || j < other.length) {
        if (i >= one.length) {
            result.push(other[j++]);
        }
        else if (j >= other.length) {
            result.push(one[i++]);
        }
        else if (one[i] === other[j]) {
            result.push(one[i]);
            i++;
            j++;
            continue;
        }
        else if (one[i] < other[j]) {
            result.push(one[i++]);
        }
        else {
            result.push(other[j++]);
        }
    }
    return result;
}
exports.disjunction = disjunction;
/**
 * @description Given two sorted collections of numbers, returns the relative
 * complement between them (XOR).
 * @param {number[]} one The first sorted array of numbers
 * @param {number[]} other The other sorted array of numbers
 * @returns {number[]} A sorted collections of numbers representing the complement (XOR)
 * between to sorted collections of numbers
 */
function relativeComplement(one, other) {
    const result = [];
    let i = 0, j = 0;
    while (i < one.length || j < other.length) {
        if (i >= one.length) {
            result.push(other[j++]);
        }
        else if (j >= other.length) {
            result.push(one[i++]);
        }
        else if (one[i] === other[j]) {
            i++;
            j++;
            continue;
        }
        else if (one[i] < other[j]) {
            result.push(one[i++]);
        }
        else {
            result.push(other[j++]);
        }
    }
    return result;
}
exports.relativeComplement = relativeComplement;
/**
 * @description Searches a key element inside a sorted array.
 * @template T
 * @param {T[]} array The sorted array to search in
 * @param {T} key The key to search for in the sorted array
 * @param {comparatorCallback} comparator The comparator callback
 * @returns {number} The at which a given element can be found in the array, or a negative value if it is not present
 */
function binarySearch(array, key, comparator) {
    let low = 0, high = array.length - 1;
    while (low <= high) {
        const mid = ((low + high) / 2) | 0;
        const comp = comparator(array[mid], key);
        if (comp < 0) {
            low = mid + 1;
        }
        else if (comp > 0) {
            high = mid - 1;
        }
        else {
            return mid;
        }
    }
    return -(low + 1);
}
exports.binarySearch = binarySearch;


/***/ }),

/***/ "./media/virtualDocument.ts":
/*!**********************************!*\
  !*** ./media/virtualDocument.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualDocument = void 0;
const byteData_1 = __webpack_require__(/*! ./byteData */ "./media/byteData.ts");
const util_1 = __webpack_require__(/*! ./util */ "./media/util.ts");
const eventHandlers_1 = __webpack_require__(/*! ./eventHandlers */ "./media/eventHandlers.ts");
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
const srollBarHandler_1 = __webpack_require__(/*! ./srollBarHandler */ "./media/srollBarHandler.ts");
const editHandler_1 = __webpack_require__(/*! ./editHandler */ "./media/editHandler.ts");
const webviewStateManager_1 = __webpack_require__(/*! ./webviewStateManager */ "./media/webviewStateManager.ts");
const selectHandler_1 = __webpack_require__(/*! ./selectHandler */ "./media/selectHandler.ts");
const searchHandler_1 = __webpack_require__(/*! ./searchHandler */ "./media/searchHandler.ts");
const dataInspector_1 = __webpack_require__(/*! ./dataInspector */ "./media/dataInspector.ts");
/**
 * @description Handles the presentation layer virtualizing the hex document
 */
class VirtualDocument {
    /**
     * @description Constructs a VirtualDocument for a file of a given size. Also handles the initial DOM layout
     * @param {number} fileSize The size, in bytes, of the file which is being displayed
     */
    constructor(fileSize) {
        var _a;
        this.fileSize = fileSize;
        this.editHandler = new editHandler_1.EditHandler();
        this.selectHandler = new selectHandler_1.SelectHandler();
        this.searchHandler = new searchHandler_1.SearchHandler();
        // This holds the 3 main columns rows (hexaddr, hexbody, ascii)
        this.rows = [];
        for (let i = 0; i < 3; i++) {
            this.rows.push(new Map());
        }
        // We create elements and place them on the DOM before removing them to get heights and widths of rows to setup layout correctly
        const ascii = document.getElementById("ascii");
        const hex = document.getElementById("hexbody");
        const hexaddr = document.getElementById("hexaddr");
        const oldHexAddrHtml = hexaddr.innerHTML;
        const oldHexHtml = hex.innerHTML;
        const oldAsciiHtml = ascii.innerHTML;
        // We have to set the ascii columns width to be large before appending the ascii or else it wraps and messes up the width calculation
        // This is a change in the next gen layout engine
        ascii.style.width = "500px";
        const row = document.createElement("div");
        const asciiRow = document.createElement("div");
        const hexAddrRow = document.createElement("div");
        hexAddrRow.className = "row";
        asciiRow.className = "row";
        row.className = "row";
        // For ascii we want to test more than just one character as sometimes that doesn't set the width correctly
        const asciiTestString = "Testing String!!";
        for (let i = 0; i < 16; i++) {
            const hex_element = document.createElement("span");
            const ascii_element = document.createElement("span");
            hex_element.innerText = "FF";
            ascii_element.innerText = asciiTestString[i];
            asciiRow.appendChild(ascii_element);
            row.appendChild(hex_element);
        }
        hexAddrRow.innerText = "00000000";
        row.style.top = "0px";
        asciiRow.style.top = "0px";
        hex.appendChild(row);
        hexaddr.appendChild(hexAddrRow);
        ascii.appendChild(asciiRow);
        const spans = document.getElementsByTagName("span");
        this.rowHeight = spans[16].offsetHeight;
        // Utilize the fake rows to get the widths of them and alter the widths of the headers etc to fit
        // The plus one is because the new layout engine in chrome would wrap the text otherwise which I'm unsure why
        const asciiRowWidth = asciiRow.offsetWidth + 1;
        const hexRowWidth = spans[16].parentElement.offsetWidth;
        // Calculate document height, we max out at 500k due to browser limitations on large div
        this.documentHeight = 500000;
        // Calculate the padding needed to make the offset column right aligned
        this.hexAddrPadding = hexAddrRow.parentElement.clientWidth - hexAddrRow.clientWidth;
        // We set the document back to its original state
        hex.innerHTML = oldHexHtml;
        ascii.innerHTML = oldAsciiHtml;
        hexaddr.innerHTML = oldHexAddrHtml;
        // Sets the columns heights for sticky scrolling to work
        const columns = document.getElementsByClassName("column");
        for (const column of columns) {
            column.style.height = `${this.documentHeight}px`;
        }
        // Due to absolute positioning on the editor position we have to set a lot of sizes ourselves as the elements are not part of the document flow
        const rowWrappers = document.getElementsByClassName("rowwrapper");
        // Sets the hexaddr column to the same width as its header ( the + 1 is needed to )
        rowWrappers[0].style.width = `${document.getElementsByClassName("header")[0].offsetWidth}px`;
        // We remove the text from the header to make it look like it's not there
        const headerHeight = document.getElementsByClassName("header")[0].offsetHeight;
        document.getElementsByClassName("header")[0].innerText = "";
        document.getElementsByClassName("header")[0].style.width = `${rowWrappers[0].style.width}px`;
        // The plus one is to account for all other headers having borders
        document.getElementsByClassName("header")[0].style.height = `${headerHeight + 1}px`;
        rowWrappers[0].style.height = `${this.documentHeight}px`;
        // This is the hex section
        document.getElementsByClassName("header")[1].style.width = `${hexRowWidth}px`;
        rowWrappers[1].style.width = `${hexRowWidth}px`;
        rowWrappers[1].style.height = `${this.documentHeight}px`;
        // This is the ascii  section
        document.getElementsByClassName("header")[2].style.width = `${asciiRowWidth}px`;
        rowWrappers[2].style.width = `${asciiRowWidth}px`;
        rowWrappers[2].style.height = `${this.documentHeight}px`;
        // Creates the scrollBar Handler
        this.scrollBarHandler = new srollBarHandler_1.ScrollBarHandler("scrollbar", this.fileSize / 16, this.rowHeight);
        // Intializes a few things such as viewport size and the scrollbar positions
        this.documentResize();
        this.editorContainer = document.getElementById("editor-container");
        // Bind the event listeners
        // Will need to refactor this section soon as its getting pretty messy
        (_a = document.getElementById("endianness")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", eventHandlers_1.changeEndianness);
        this.editorContainer.addEventListener("keydown", this.editorKeyBoardHandler.bind(this));
        this.editorContainer.addEventListener("mouseover", eventHandlers_1.toggleHover);
        this.editorContainer.addEventListener("mouseleave", eventHandlers_1.toggleHover);
        // Event handles to handle when the user drags to create a selection
        this.editorContainer.addEventListener("click", this.clickHandler.bind(this));
        this.editorContainer.addEventListener("mousedown", this.mouseDownHandler.bind(this));
        window.addEventListener("copy", (event) => {
            var _a, _b;
            if (((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains("hex")) || ((_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.classList.contains("ascii"))) {
                this.editHandler.copy(event);
            }
        });
        window.addEventListener("paste", (event) => {
            var _a, _b;
            if (((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.classList.contains("hex")) || ((_b = document.activeElement) === null || _b === void 0 ? void 0 : _b.classList.contains("ascii"))) {
                this.editHandler.paste(event);
            }
        });
        window.addEventListener("resize", this.documentResize.bind(this));
        window.addEventListener("keydown", this.windowKeyboardHandler.bind(this));
    }
    /**
     * @description Renders the newly provided packets onto the DOM
     * @param {VirtualizedPacket[]} newPackets the packets which will be rendered
     */
    render(newPackets) {
        var _a, _b, _c;
        let rowData = [];
        const addrFragment = document.createDocumentFragment();
        const hexFragment = document.createDocumentFragment();
        const asciiFragment = document.createDocumentFragment();
        // Construct rows of 16 and add them to the associated fragments
        for (let i = 0; i < newPackets.length; i++) {
            rowData.push(newPackets[i]);
            if (i === newPackets.length - 1 || rowData.length == 16) {
                if (!this.rows[0].get(rowData[0].offset.toString())) {
                    this.populateHexAdresses(addrFragment, rowData);
                    this.populateHexBody(hexFragment, rowData);
                    this.populateAsciiTable(asciiFragment, rowData);
                }
                rowData = [];
            }
        }
        // Render the fragments to the DOM
        (_a = document.getElementById("hexaddr")) === null || _a === void 0 ? void 0 : _a.appendChild(addrFragment);
        (_b = document.getElementById("hexbody")) === null || _b === void 0 ? void 0 : _b.appendChild(hexFragment);
        (_c = document.getElementById("ascii")) === null || _c === void 0 ? void 0 : _c.appendChild(asciiFragment);
        if (webviewStateManager_1.WebViewStateManager.getState()) {
            const selectedOffsets = this.selectHandler.getSelected();
            if (selectedOffsets.length > 0) {
                this.selectHandler.setSelected(selectedOffsets, selectedOffsets[0], true);
            }
            // This isn't the best place for this, but it can't go in the constructor due to the document not being instantiated yet
            // This ensures that the srollTop is the same as in the state object, should only be out of sync on initial webview load
            const savedScrollTop = webviewStateManager_1.WebViewStateManager.getState().scroll_top;
            if (savedScrollTop && savedScrollTop !== this.scrollBarHandler.virtualScrollTop) {
                this.scrollBarHandler.resyncScrollPosition();
            }
        }
    }
    /**
     * @description Event handler which is called everytime the viewport is resized
     */
    documentResize() {
        this.viewPortHeight = document.documentElement.clientHeight;
        if (this.scrollBarHandler) {
            this.scrollBarHandler.updateScrollBar(this.fileSize / 16);
        }
    }
    /**
     * @description Gets the offset of the packet at the top of the viewport
     * @returns {number} the offset
     */
    topOffset() {
        return (Math.floor(this.scrollBarHandler.virtualScrollTop / this.rowHeight) * 16);
    }
    /**
     * @description Gets the offset of the packet at the bottom right of the viewport
     * @returns {number} the offset
     */
    bottomOffset() {
        const clientHeight = document.getElementsByTagName("html")[0].clientHeight;
        const numRowsInViewport = Math.floor(clientHeight / this.rowHeight);
        // If it's the end of the file it will fall to the this.fileSize - 1 case
        return Math.min((this.topOffset() + (numRowsInViewport * 16)) - 1, this.fileSize - 1);
    }
    /**
     * @description Retrieves the Y position a given offset is at
     * @param {number} offset The offset to calculate the y position of
     * @returns {number} The Y position the offset is at
     */
    offsetYPos(offset) {
        return (Math.floor(offset / 16) * this.rowHeight) % this.documentHeight;
    }
    /**
     * @description Gets executed everytime the document is scrolled, this talks to the data layer to request more packets
     */
    async scrollHandler() {
        var _a, _b, _c;
        // We want to ensure there are at least 2 chunks above us and 4 chunks below us
        // These numbers were chosen arbitrarily under the assumption that scrolling down is more common
        const chunkHandlerResponse = await hexEdit_1.chunkHandler.ensureBuffer(hexEdit_1.virtualHexDocument.topOffset(), {
            topBufferSize: 2,
            bottomBufferSize: 4
        });
        const removedChunks = chunkHandlerResponse.removed;
        // We remove the chunks from the DOM as the chunk handler is no longer tracking them
        for (const chunk of removedChunks) {
            for (let i = chunk; i < chunk + hexEdit_1.chunkHandler.chunkSize; i += 16) {
                (_a = this.rows[0].get(i.toString())) === null || _a === void 0 ? void 0 : _a.remove();
                this.rows[0].delete(i.toString());
                (_b = this.rows[1].get(i.toString())) === null || _b === void 0 ? void 0 : _b.remove();
                this.rows[1].delete(i.toString());
                (_c = this.rows[2].get(i.toString())) === null || _c === void 0 ? void 0 : _c.remove();
                this.rows[2].delete(i.toString());
            }
        }
        return chunkHandlerResponse.requested;
    }
    /**
     * @description Renders the gutter which holds the hex address memory offset
     * @param {DocumentFragment} fragment The fragment which elements get added to
     * @param {VirtualizedPacket[]} rowData An array of 16 bytes representing one row
     */
    populateHexAdresses(fragment, rowData) {
        const offset = rowData[0].offset;
        const addr = document.createElement("div");
        addr.className = "row";
        addr.setAttribute("data-offset", offset.toString());
        addr.innerText = util_1.pad(offset.toString(16), 8).toUpperCase();
        fragment.appendChild(addr);
        this.rows[0].set(offset.toString(), addr);
        // We add a left px offset to effectively right align the column
        addr.style.left = `${this.hexAddrPadding}px`;
        this.translateRow(addr, offset);
    }
    /**
     * @description Renders the decoded text section
     * @param {DocumentFragment} fragment The fragment which elements get added to
     * @param {VirtualizedPacket[]} rowData An array of 16 bytes representing one row
     */
    populateAsciiTable(fragment, rowData) {
        const row = document.createElement("div");
        row.className = "row";
        const rowOffset = rowData[0].offset.toString();
        for (let i = 0; i < rowData.length; i++) {
            const ascii_element = this.createAsciiElement(rowData[i]);
            row.appendChild(ascii_element);
        }
        fragment.appendChild(row);
        this.rows[2].set(rowOffset, row);
        this.translateRow(row, parseInt(rowOffset));
    }
    /**
     * @description Renders the decoded text section
     * @param {DocumentFragment} fragment The fragment which elements get added to
     * @param {VirtualizedPacket[]} rowData An array of 16 bytes representing one row
     */
    populateHexBody(fragment, rowData) {
        const row = document.createElement("div");
        row.className = "row";
        const rowOffset = rowData[0].offset.toString();
        for (let i = 0; i < rowData.length; i++) {
            const hex_element = this.createHexElement(rowData[i]);
            row.appendChild(hex_element);
        }
        fragment.appendChild(row);
        this.rows[1].set(rowOffset, row);
        this.translateRow(row, parseInt(rowOffset));
    }
    /**
     * @description Creates a single hex span element from a packet
     * @param {VirtualizedPacket} packet The VirtualizedPacket holding the data needed to generate the element
     * @returns {HTMLSpanElement} The html span element ready to be added to the DOM
     */
    createHexElement(packet) {
        const hex_element = document.createElement("span");
        hex_element.classList.add("hex");
        hex_element.classList.add(`cell-offset-${packet.offset.toString()}`);
        // If the offset is greater than or equal to fileSize that's our placeholder so it's just a + symbol to signal you can type and add bytes there
        if (packet.offset < this.fileSize) {
            hex_element.innerText = util_1.pad(packet.data.toHex(), 2);
        }
        else {
            hex_element.classList.add("add-cell");
            hex_element.innerText = "+";
        }
        hex_element.tabIndex = -1;
        hex_element.addEventListener("mouseleave", eventHandlers_1.toggleHover);
        return hex_element;
    }
    /**
     * @description Creates a single ascii span element from a packet
     * @param {VirtualizedPacket} packet The VirtualizedPacket holding the data needed to generate the element
     * @returns {HTMLSpanElement} The html span element ready to be added to the DOM
     */
    createAsciiElement(packet) {
        const ascii_element = document.createElement("span");
        ascii_element.classList.add(`cell-offset-${packet.offset.toString()}`);
        ascii_element.classList.add("ascii");
        // If the offset is greater than or equal to fileSize that's our placeholder so it's just a + symbol to signal you can type and add bytes there
        if (packet.offset < this.fileSize) {
            util_1.updateAsciiValue(packet.data, ascii_element);
        }
        else {
            ascii_element.classList.add("add-cell");
            ascii_element.innerText = "+";
        }
        ascii_element.addEventListener("mouseleave", eventHandlers_1.toggleHover);
        ascii_element.tabIndex = -1;
        return ascii_element;
    }
    /**
     * @description Moves the rows from where they were placed to where they are supposed to be (this is due to absolute positioning)
     * @param {HTMLDivElement} row  The DivElement which needs to be moved
     * @param {number} offset The offset of the element at the beginning of the row
     */
    translateRow(row, offset) {
        // Get the expected Y value
        const expectedY = this.offsetYPos(offset);
        row.style.top = `${expectedY}px`;
    }
    /**
     * @description Handles the click events within the editor
     * @param {MouseEvent} event The MouseEvent passed to the event handler.
     */
    clickHandler(event) {
        if (event.buttons > 1)
            return;
        const target = event.target;
        if (!target || isNaN(util_1.getElementsOffset(target))) {
            return;
        }
        event.preventDefault();
        this.editHandler.completePendingEdits();
        const offset = util_1.getElementsOffset(target);
        if (event.shiftKey) {
            const startSelection = this.selectHandler.getSelectionStart();
            if (startSelection !== undefined) {
                this.selectHandler.setFocused(offset);
                const min = Math.min(startSelection, offset);
                const max = Math.max(startSelection, offset);
                this.selectHandler.setSelected(util_1.createOffsetRange(min, max), startSelection);
                target.focus({ preventScroll: true });
            }
        }
        else {
            this.selectHandler.setFocused(offset);
            if (event.ctrlKey) {
                const selection = this.selectHandler.getSelected();
                const newSelection = selection.filter(i => i !== offset);
                if (selection.length === newSelection.length) {
                    this.selectHandler.setSelected([...newSelection, offset], offset);
                }
                else {
                    this.selectHandler.setSelected(newSelection, offset);
                }
            }
            else {
                this.selectHandler.setSelected([offset], offset);
            }
            this.updateInspector();
            target.focus({ preventScroll: true });
        }
    }
    /**
     * @description Handles the mousedown events within the editor
     * @param {MouseEvent} event The MouseEvent passed to the event handler.
     */
    mouseDownHandler(event) {
        if (event.buttons !== 1) {
            return;
        }
        const target = event.target;
        if (!target || isNaN(util_1.getElementsOffset(target))) {
            return;
        }
        event.preventDefault();
        this.editHandler.completePendingEdits();
        const offset = util_1.getElementsOffset(target);
        const startMouseMoveOffset = offset;
        const startSelection = event.shiftKey ? this.selectHandler.getSelectionStart() : offset;
        const onMouseMove = (event) => {
            if (event.buttons !== 1) {
                return;
            }
            const target = event.target;
            if (!target || isNaN(util_1.getElementsOffset(target))) {
                return;
            }
            const offset = util_1.getElementsOffset(target);
            if (startSelection !== undefined && offset !== startMouseMoveOffset) {
                this.selectHandler.setFocused(offset);
                const min = Math.min(startSelection, offset);
                const max = Math.max(startSelection, offset);
                this.selectHandler.setSelected(util_1.createOffsetRange(min, max), startSelection);
                target.focus({ preventScroll: true });
            }
        };
        const onMouseUp = () => {
            this.editorContainer.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
        this.editorContainer.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    }
    /**
     * @description Handles all keyboard interaction with the main editor window
     * @param {KeyboardEvent} event The KeyboardEvent passed to the event handler.
     */
    async editorKeyBoardHandler(event) {
        if (!event || !event.target)
            return;
        const targetElement = event.target;
        const modifierKeyPressed = event.metaKey || event.altKey || event.ctrlKey;
        if ((event.keyCode >= 37 && event.keyCode <= 40 /*Arrows*/)
            || ((event.keyCode === 35 /*End*/ || event.keyCode === 36 /*Home*/) && !event.ctrlKey)) {
            this.navigateByKey(event.keyCode, targetElement, event.shiftKey);
            event.preventDefault();
        }
        else if (!modifierKeyPressed && targetElement.classList.contains("hex")) {
            await this.editHandler.editHex(targetElement, event.key);
            // If this cell has been edited
            if (targetElement.innerText.trimRight().length == 2 && targetElement.classList.contains("editing")) {
                targetElement.classList.remove("editing");
                this.navigateByKey(39, targetElement, false);
            }
        }
        else if (!modifierKeyPressed && event.key.length === 1 && targetElement.classList.contains("ascii")) {
            await this.editHandler.editAscii(targetElement, event.key);
            targetElement.classList.remove("editing");
            this.navigateByKey(39, targetElement, false);
        }
        await this.editHandler.completePendingEdits();
    }
    /**
     * @description Handles keyboard iteration with the window
     * @param {KeyboardEvent} event The KeyboardEvent passed to the event handler.
     */
    windowKeyboardHandler(event) {
        if (!event || !event.target)
            return;
        if ((event.metaKey || event.ctrlKey) && event.key === "f") {
            // If the user presses ctrl / cmd + f we focus the search box and change the dropdown
            this.searchHandler.searchKeybindingHandler();
        }
        else if ((event.keyCode == 36 || event.keyCode == 35) && event.ctrlKey) {
            // If the user pressed CTRL + Home or CTRL + End we scroll the whole document
            event.keyCode == 36 ? this.scrollBarHandler.scrollToTop() : this.scrollBarHandler.scrollToBottom();
        }
        else if (event.keyCode == 33) {
            // PG Up
            this.scrollBarHandler.page(this.viewPortHeight, "up");
        }
        else if (event.keyCode == 34) {
            // PG Down
            this.scrollBarHandler.page(this.viewPortHeight, "down");
        }
    }
    /**
     * @description Handles when the user uses the arrow keys, Home or End to navigate the editor
     * @param {number} keyCode The keyCode of the key pressed
     * @param {HTMLElement} targetElement The element
     * @param {boolean} isRangeSelection If we are selecting a range (shift key pressed)
     */
    navigateByKey(keyCode, targetElement, isRangeSelection) {
        var _a, _b, _c, _d;
        let next;
        switch (keyCode) {
            case 35:
                // If the user presses End we go to the end of the line
                const parentChildren = targetElement.parentElement.children;
                next = parentChildren[parentChildren.length - 1];
                break;
            case 36:
                // If the user presses Home we go to the front of the line
                next = targetElement.parentElement.children[0];
                break;
            case 37:
                // left
                next = (targetElement.previousElementSibling || ((_b = (_a = targetElement.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling) === null || _b === void 0 ? void 0 : _b.children[15]));
                break;
            case 38:
                // up
                const elements_above = util_1.getElementsWithGivenOffset(util_1.getElementsOffset(targetElement) - 16);
                if (elements_above.length === 0)
                    break;
                next = targetElement.classList.contains("hex") ? elements_above[0] : elements_above[1];
                break;
            case 39:
                // right
                next = (targetElement.nextElementSibling || ((_d = (_c = targetElement.parentElement) === null || _c === void 0 ? void 0 : _c.nextElementSibling) === null || _d === void 0 ? void 0 : _d.children[0]));
                break;
            case 40:
                // down
                const elements_below = util_1.getElementsWithGivenOffset(Math.min(util_1.getElementsOffset(targetElement) + 16, this.fileSize - 1));
                if (elements_below.length === 0)
                    break;
                next = targetElement.classList.contains("hex") ? elements_below[0] : elements_below[1];
                break;
        }
        if (next && next.tagName === "SPAN") {
            const nextRect = next.getBoundingClientRect();
            if (this.viewPortHeight <= nextRect.bottom) {
                this.scrollBarHandler.scrollDocument(1, "down");
            }
            else if (nextRect.top <= 0) {
                this.scrollBarHandler.scrollDocument(1, "up");
            }
            const offset = util_1.getElementsOffset(next);
            this.selectHandler.setFocused(offset);
            const startSelection = this.selectHandler.getSelectionStart();
            if (isRangeSelection && startSelection !== undefined) {
                const min = Math.min(startSelection, offset);
                const max = Math.max(startSelection, offset);
                this.selectHandler.setSelected(util_1.createOffsetRange(min, max), startSelection);
            }
            else {
                this.selectHandler.setSelected([offset], offset);
                this.updateInspector();
            }
            next.focus({ preventScroll: true });
        }
    }
    /***
     * @description Populates the inspector data with the currently focused element.
     */
    updateInspector() {
        const offset = this.selectHandler.getFocused();
        if (offset !== undefined) {
            const elements = util_1.getElementsWithGivenOffset(offset);
            const byte_obj = util_1.retrieveSelectedByteObject(elements);
            const littleEndian = document.getElementById("endianness").value === "little";
            dataInspector_1.populateDataInspector(byte_obj, littleEndian);
        }
    }
    /***
     * @description Given an array of offsets, selects the corresponding elements.
     * @param {number[]} offsets The offsets of the elements you want to select
     */
    setSelection(offsets) {
        this.selectHandler.setSelected(offsets, offsets.length > 0 ? offsets[0] : undefined);
    }
    /***
     * @description Given an offset, selects the elements and focuses the element in the same column as previous focus. Defaults to hex.
     * @param {number} offset The offset of the elements you want to select and focus
     */
    focusElementWithGivenOffset(offset) {
        var _a, _b, _c, _d;
        const elements = util_1.getElementsWithGivenOffset(offset);
        if (elements.length != 2)
            return;
        this.selectHandler.setSelected([offset], offset);
        // If an ascii element is currently focused then we focus that, else we focus hex
        if ((_d = (_c = (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.classList.contains("right")) {
            elements[1].focus();
        }
        else {
            elements[0].focus();
        }
    }
    /**
     * @description Undoes the given edits from the document
     * @param {EditMessage[]} edits The edits that will be undone
     * @param {number} fileSize The size of the file, the ext host tracks this and passes it back
     */
    undo(edits, fileSize) {
        this.fileSize = fileSize;
        this.editHandler.undo(edits);
    }
    /**
     * @description Redoes the given edits from the document
     * @param {EditMessage[]} edits The edits that will be redone
     * @param {number} fileSize The size of the file, the ext host tracks this and passes it backedone
     */
    redo(edits, fileSize) {
        this.editHandler.redo(edits);
        this.fileSize = fileSize;
    }
    /**
     * @description Called when the user executes revert
     */
    revert(fileSize) {
        this.fileSize = fileSize;
        this.editHandler.revert();
    }
    /**
     * @description Creates an add cell (the little plus placeholder) and places it at the end of the document
     */
    createAddCell() {
        var _a, _b;
        // Don't make more more add cells until there are none left on the DOM
        if (document.getElementsByClassName("add-cell").length !== 0)
            return;
        // This will start a new row
        const packet = {
            offset: this.fileSize,
            data: new byteData_1.ByteData(0)
        };
        if (this.fileSize % 16 === 0) {
            this.render([packet]);
            // If it's a new chunk we want the chunkhandler to track it
            if (this.fileSize % hexEdit_1.chunkHandler.chunkSize === 0) {
                hexEdit_1.chunkHandler.addChunk(this.fileSize);
            }
            this.scrollBarHandler.updateScrollBar(this.fileSize / 16);
        }
        else {
            const hex_element = this.createHexElement(packet);
            const ascii_element = this.createAsciiElement(packet);
            const elements = util_1.getElementsWithGivenOffset(this.fileSize - 1);
            (_a = elements[0].parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(hex_element);
            (_b = elements[1].parentElement) === null || _b === void 0 ? void 0 : _b.appendChild(ascii_element);
        }
    }
    /**
     * @description Removes the last cell from the virtual document
     */
    removeLastCell() {
        var _a, _b, _c;
        // We can use the add cell as the last cell offset since a plus cell should always be the last cell
        const plusCellOffset = util_1.getElementsOffset(document.getElementsByClassName("add-cell")[0]);
        if (isNaN(plusCellOffset))
            return;
        const lastCells = util_1.getElementsWithGivenOffset(plusCellOffset);
        const secondToLastCells = util_1.getElementsWithGivenOffset(plusCellOffset - 1);
        // If the last cell was on its own row we remove the new row
        if (plusCellOffset % 16 === 0) {
            (_a = this.rows[0].get(plusCellOffset.toString())) === null || _a === void 0 ? void 0 : _a.remove();
            this.rows[0].delete(plusCellOffset.toString());
            (_b = this.rows[1].get(plusCellOffset.toString())) === null || _b === void 0 ? void 0 : _b.remove();
            this.rows[1].delete(plusCellOffset.toString());
            (_c = this.rows[2].get(plusCellOffset.toString())) === null || _c === void 0 ? void 0 : _c.remove();
            this.rows[2].delete(plusCellOffset.toString());
            this.scrollBarHandler.updateScrollBar((plusCellOffset - 1) / 16);
        }
        else {
            lastCells[0].remove();
            lastCells[1].remove();
        }
        secondToLastCells[0].innerText = "+";
        secondToLastCells[0].classList.add("add-cell");
        secondToLastCells[0].classList.remove("nongraphic");
        secondToLastCells[0].classList.remove("edited");
        secondToLastCells[1].innerText = "+";
        secondToLastCells[1].classList.remove("nongraphic");
        secondToLastCells[1].classList.add("add-cell");
        secondToLastCells[1].classList.remove("edited");
    }
    /**
     * @description Simple getter for the fileSize
     * @returns {number} The fileSize
     */
    get documentSize() { return this.fileSize; }
    /**
     * @description Updates the file size so its in sync with ext host
     * @param {number} newSize The new filesize
     */
    updateDocumentSize(newSize) {
        this.fileSize = newSize;
    }
    /**
     * @description Re-requests all the chunks on the DOM for rendering. This is needed for revert
     */
    async reRequestChunks() {
        var _a, _b, _c;
        // If we don't do Array.from it will still reference the original set causing it to infinitely request and delete the chunks
        const allChunks = Array.from(hexEdit_1.chunkHandler.allChunks);
        for (const chunk of allChunks) {
            // Remove all the chunks from the DOM
            for (let i = chunk; i < chunk + hexEdit_1.chunkHandler.chunkSize; i += 16) {
                (_a = this.rows[0].get(i.toString())) === null || _a === void 0 ? void 0 : _a.remove();
                this.rows[0].delete(i.toString());
                (_b = this.rows[1].get(i.toString())) === null || _b === void 0 ? void 0 : _b.remove();
                this.rows[1].delete(i.toString());
                (_c = this.rows[2].get(i.toString())) === null || _c === void 0 ? void 0 : _c.remove();
                this.rows[2].delete(i.toString());
            }
            hexEdit_1.chunkHandler.removeChunk(chunk);
            await hexEdit_1.chunkHandler.requestMoreChunks(chunk);
        }
    }
    /**
     * @description Scrolls to the given offset if it's outside the viewport
     * @param offset The offset to scroll to
     * @param force Whether or not you should scroll even if it's in the viewport
     */
    async scrollDocumentToOffset(offset, force) {
        return this.scrollBarHandler.scrollToOffset(offset, force);
    }
}
exports.VirtualDocument = VirtualDocument;


/***/ }),

/***/ "./media/webviewStateManager.ts":
/*!**************************************!*\
  !*** ./media/webviewStateManager.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebViewStateManager = void 0;
const hexEdit_1 = __webpack_require__(/*! ./hexEdit */ "./media/hexEdit.ts");
/**
 * Simple static class which handles setting and clearing the webviews state
 * We use this over the default .setState as it implements a setState which doesn't override the entire object just the given property
 */
class WebViewStateManager {
    /**
     * @description Given a property and a value either updates or adds it to the state
     * @param {string} propertyName The name of the property
     * @param {any} propertyValue The value to store for the property
     */
    static setProperty(propertyName, propertyValue) {
        let currentState = WebViewStateManager.getState();
        if (currentState === undefined) {
            currentState = {};
        }
        currentState[propertyName] = propertyValue;
        hexEdit_1.vscode.setState(currentState);
    }
    /***
     * @description Clears the state object
     */
    static clearState() {
        hexEdit_1.vscode.setState();
    }
    /**
     * @description Retrieves the state object
     */
    static getState() {
        return typeof hexEdit_1.vscode.getState() === "string" ? JSON.parse(hexEdit_1.vscode.getState()) : hexEdit_1.vscode.getState();
    }
    /**
     * @description Retrieves a property on the state object
     * @param {string} propertyName The name of the property to retrieve the value of
     */
    static getProperty(propertyName) {
        const state = WebViewStateManager.getState();
        return state[propertyName];
    }
}
exports.WebViewStateManager = WebViewStateManager;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvYnl0ZURhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvY2h1bmtIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL21lZGlhL2RhdGFJbnNwZWN0b3IudHMiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvZWRpdEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvZXZlbnRIYW5kbGVycy50cyIsIndlYnBhY2s6Ly8vLi9tZWRpYS9oZXhFZGl0LnRzIiwid2VicGFjazovLy8uL21lZGlhL21lc3NhZ2VIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL21lZGlhL3NlYXJjaEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvc2VsZWN0SGFuZGxlci50cyIsIndlYnBhY2s6Ly8vLi9tZWRpYS9zcm9sbEJhckhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvdXRpbC50cyIsIndlYnBhY2s6Ly8vLi9tZWRpYS92aXJ0dWFsRG9jdW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vbWVkaWEvd2Vidmlld1N0YXRlTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIs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LENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckcsQ0FBQztJQUVEOzs7T0FHRztJQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBb0I7UUFDbkMsTUFBTSxLQUFLLEdBQUksbUJBQW1CLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDOUMsT0FBTyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDL0IsQ0FBQztDQUNKO0FBdENELGtEQXNDQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL21lZGlhL2hleEVkaXQudHNcIik7XG4iLCIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuZXhwb3J0IGNsYXNzIEJ5dGVEYXRhIHtcbiAgICBwcml2YXRlIGRlY2ltYWw6IG51bWJlcjtcbiAgICBwcml2YXRlIGFkamFjZW50Qnl0ZXM6IEJ5dGVEYXRhW107XG5cblx0LyoqXG5cdCAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGEgQnl0ZURhdGEgb2JqZWN0IHdoaWNoIGFjdHMgYXMgdGhlIGRhdGFsYXllciBmb3IgYSBzaW5nbGUgaGV4IHZhbHVlXG5cdCAqIEBwYXJhbSB1aW50OG51bSBUaGUgOGJpdCBudW1iZXIgZnJvbSB0aGUgZmlsZSB0byBiZSByZXByZXNlbnRlZFxuXHQgKi9cblx0Y29uc3RydWN0b3IodWludDhudW06IG51bWJlcikge1xuXHRcdHRoaXMuZGVjaW1hbCA9IHVpbnQ4bnVtO1xuXHRcdHRoaXMuYWRqYWNlbnRCeXRlcyA9IFtdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXNjcmlwdGlvbiBBZGRzIGEgZ2l2ZW4gQnl0ZURhdGEgb2JqZWN0IGFzIGFkamFuY2VudCB0byB0aGUgY3VycmVudCBvbmUgKHV0aWxpemVkIGZvciBoaWdoZXIgdGhhbiA4Yml0IGNhbGN1bGF0aW9ucykgXG5cdCAqIEBwYXJhbSB7Qnl0ZURhdGF9IGJ5dGVfb2JqIFRoZSBCeXRlRGF0YSBvYnZqZWN0IHRvIGFkZCB0byB0aGUgYXJyYXlcblx0ICovXG5cdGFkZEFkamFjZW50Qnl0ZShieXRlX29iajogQnl0ZURhdGEpOiB2b2lkIHtcblx0XHR0aGlzLmFkamFjZW50Qnl0ZXMucHVzaChieXRlX29iaik7XG5cdH1cblxuXHQvKipcblx0ICogQGRlc2NyaXB0aW9uIFJldHVybnMgdGhlIGhleCByZXByZXNlbnRhdGlvbiBvZiB0aGUgQnl0ZURhdGEgb2JqZWN0XG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBCeXRlRGF0YSByZXByZXNlbnRlZCBhcyBhIGhleCBzdHJpbmdcblx0ICovXG5cdHRvSGV4KCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuZGVjaW1hbC50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBAZGVzY3JpcHRpb24gUmV0dXJucyB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBCeXRlRGF0YSBvYmplY3Rcblx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIEJ5dGVEYXRhIHJlcHJlc2VudGVkIGEgYmluYXJ5IHN0cmluZ1xuXHQgKi9cblx0dG9CaW5hcnkoKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gKFwiMDAwMDAwMDBcIisgdGhpcy5kZWNpbWFsLnRvU3RyaW5nKDIpKS5zbGljZSgtOCk7XG5cdH1cblxuXHQvKipcblx0ICogQGRlc2NyaXB0aW9uIFJldHVybnMgdGhlIDhiaXQgdW5zaWduZWQgaW50IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBCeXRlRGF0YSBvYmplY3Rcblx0ICogQHJldHVybnMge251bWJlcn0gVGhlIDggYml0IHVuc2lnbmVkIGludFxuXHQgKi9cblx0dG84Yml0VUludCgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLmRlY2ltYWw7XG5cdH1cblxuXHQvKipcblx0ICogQGRlc2NyaXB0aW9uIENvbnZlcnRzIHRoZSBieXRlIGRhdGEgdG8gYSB1dGYtOCBjaGFyYWN0ZXJcblx0ICogQHBhcmFtIHtib29sZWFufSBsaXR0bGVFbmRpYW4gV2hldGhlciBvciBub3QgaXQncyByZXByZXNlbnRlZCBpbiBsaXR0bGUgZW5kaWFuXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSB1dGYtOCBjaGFyYWN0ZXJcblx0ICovXG5cdHRvVVRGOChsaXR0bGVFbmRpYW46IGJvb2xlYW4pOiBzdHJpbmcge1xuXHRcdGxldCB1aW50OERhdGEgPSBbdGhpcy50bzhiaXRVSW50KCldO1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgMyAmJiBpIDwgdGhpcy5hZGphY2VudEJ5dGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR1aW50OERhdGEucHVzaCh0aGlzLmFkamFjZW50Qnl0ZXNbaV0udG84Yml0VUludCgpKTtcblx0XHR9XG5cdFx0aWYgKCFsaXR0bGVFbmRpYW4pIHtcblx0XHRcdHVpbnQ4RGF0YSA9IHVpbnQ4RGF0YS5yZXZlcnNlKCk7XG5cdFx0fVxuXHRcdGNvbnN0IHV0ZjggPSBuZXcgVGV4dERlY29kZXIoXCJ1dGYtOFwiKS5kZWNvZGUobmV3IFVpbnQ4QXJyYXkodWludDhEYXRhKSk7XG5cdFx0Ly8gV2UgaXRlcmF0ZSB0aHJvdWdoIHRoZSBzdHJpbmcgYW5kIGltbWVkaWF0ZWx5IHJldXRybiB0aGUgZmlyc3QgY2hhcmFjdGVyXG5cdFx0Zm9yIChjb25zdCBjaGFyIG9mIHV0ZjgpIHJldHVybiBjaGFyO1xuXHRcdHJldHVybiB1dGY4O1xuXHR9XG5cblx0LyoqXG5cdCAqIEBkZXNjcmlwdGlvbiBDb252ZXJ0cyB0aGUgYnl0ZSBkYXRhIHRvIGEgdXRmLTE2IGNoYXJhY3RlclxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGxpdHRsZUVuZGlhbiBXaGV0aGVyIG9yIG5vdCBpdCdzIHJlcHJlc2VudGVkIGluIGxpdHRsZSBlbmRpYW5cblx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIHV0Zi0xNiBjaGFyYWN0ZXJcblx0ICovXG5cdHRvVVRGMTYobGl0dGxlRW5kaWFuOiBib29sZWFuKTogc3RyaW5nIHtcblx0XHRsZXQgdWludDhEYXRhID0gW3RoaXMudG84Yml0VUludCgpXTtcblx0XHRpZiAodGhpcy5hZGphY2VudEJ5dGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFwiRW5kIG9mIEZpbGVcIjtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDMgJiYgaSA8IHRoaXMuYWRqYWNlbnRCeXRlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dWludDhEYXRhLnB1c2godGhpcy5hZGphY2VudEJ5dGVzW2ldLnRvOGJpdFVJbnQoKSk7XG5cdFx0fVxuXHRcdGlmICghbGl0dGxlRW5kaWFuKSB7XG5cdFx0XHR1aW50OERhdGEgPSB1aW50OERhdGEucmV2ZXJzZSgpO1xuXHRcdH1cblx0XHRjb25zdCB1dGYxNiA9IG5ldyBUZXh0RGVjb2RlcihcInV0Zi0xNlwiKS5kZWNvZGUobmV3IFVpbnQ4QXJyYXkodWludDhEYXRhKSk7XG5cdFx0Ly8gV2UgaXRlcmF0ZSB0aHJvdWdoIHRoZSBzdHJpbmcgYW5kIGltbWVkaWF0ZWx5IHJldXRybiB0aGUgZmlyc3QgY2hhcmFjdGVyXG5cdFx0Zm9yIChjb25zdCBjaGFyIG9mIHV0ZjE2KSByZXR1cm4gY2hhcjtcblx0XHRyZXR1cm4gdXRmMTY7XG5cdH1cblxuXHQvKipcblx0ICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgY29udmVydGluZyB0aGUgQnl0ZURhdGEgb2JqZWN0IGludG8gbWFueSBvZiB0aGUgdW5zaWduZWQgYW5kIHNpZ25lZCBpbnRlZ2VyIGZvcm1hdHNcblx0ICogQHBhcmFtIHtudW1iZXJ9IG51bUJpdHMgVGhlIG51bWJlcnMgb2YgYml0cyB5b3Ugd2FudCByZXByZXNlbnRlZCwgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDggYW5kIDw9IDY0XG5cdCAqIEBwYXJhbSB7Ym9vbGVhbn0gc2lnbmVkIFdoZXRoZXIgeW91IHdhbnQgdGhlIHJldHVybmVkIHJlcHJlc2VudGF0aW9uIHRvIGJlIHNpZ25lZCBvciB1bnNpZ25lZFxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGxpdHRsZUVuZGlhbiBUcnVlIGlmIHlvdSB3YW50IGl0IHJlcHJlc2VudGVkIGluIGxpdHRsZSBlbmRpYW4sIGZhbHNlIGlmIGJpZyBlbmRpYW5cblx0ICogQHBhcmFtIHtib29sZWFufSBmbG9hdCBJZiB5b3UgcGFzcyBpbiAzMiBvciA2NCBhcyBudW1CaXRzIGRvIHlvdSB3YW50IHRoZW0gdG8gYmUgZmxvYXQzMiBvciBmbG9hdDY0LCBkZWZhdWx0cyB0byBmYWxzZVxuXHQgKiBAcmV0dXJucyB7bnVtYmVyIHwgYmlnaW50fSBUaGUgbmV3IHJlcHJlc2VudGF0aW9uXG5cdCAqL1xuXHRieXRlQ29udmVydGVyKG51bUJpdHM6IG51bWJlciwgc2lnbmVkOiBib29sZWFuLCBsaXR0bGVFbmRpYW46IGJvb2xlYW4sIGZsb2F0ID0gZmFsc2UpOiBudW1iZXIgfCBiaWdpbnQge1xuXHRcdGlmIChudW1CaXRzICUgOCAhPSAwKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IgKFwiQml0cyBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgOCFcIik7XG5cdFx0fVxuXHRcdGlmICh0aGlzLmFkamFjZW50Qnl0ZXMubGVuZ3RoIDwgKG51bUJpdHMgLyA4KSAtIDEpIHJldHVybiBOYU47XG5cdFx0Y29uc3QgYnl0ZXMgPSBbXTtcblx0XHRieXRlcy5wdXNoKHRoaXMudG84Yml0VUludCgpKTtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IChudW1CaXRzIC8gOCkgLSAxOyBpKyspIHtcblx0XHRcdGJ5dGVzLnB1c2godGhpcy5hZGphY2VudEJ5dGVzW2ldLnRvOGJpdFVJbnQoKSk7XG5cdFx0fVxuXHRcdGNvbnN0IHVpbnQ4Ynl0ZXMgPSBVaW50OEFycmF5LmZyb20oYnl0ZXMpO1xuXHRcdGNvbnN0IGRhdGF2aWV3ID0gbmV3IERhdGFWaWV3KHVpbnQ4Ynl0ZXMuYnVmZmVyKTtcblx0XHRpZiAobnVtQml0cyA9PSA2NCAmJiBmbG9hdCkge1xuXHRcdFx0cmV0dXJuIGRhdGF2aWV3LmdldEZsb2F0NjQoMCwgbGl0dGxlRW5kaWFuKTtcblx0XHR9IGVsc2UgaWYgKG51bUJpdHMgPT0gNjQgJiYgc2lnbmVkKSB7XG5cdFx0XHRyZXR1cm4gZGF0YXZpZXcuZ2V0QmlnSW50NjQoMCwgbGl0dGxlRW5kaWFuKTtcblx0XHR9IGVsc2UgaWYgKG51bUJpdHMgPT0gNjQgJiYgIXNpZ25lZCkge1xuXHRcdFx0cmV0dXJuIGRhdGF2aWV3LmdldEJpZ1VpbnQ2NCgwLCBsaXR0bGVFbmRpYW4pO1xuXHRcdH0gZWxzZSBpZiAobnVtQml0cyA9PSAzMiAmJiBmbG9hdCkge1xuXHRcdFx0cmV0dXJuIGRhdGF2aWV3LmdldEZsb2F0MzIoMCwgbGl0dGxlRW5kaWFuKTtcblx0XHR9IGVsc2UgaWYgKG51bUJpdHMgPT0gMzIgJiYgc2lnbmVkKSB7XG5cdFx0XHRyZXR1cm4gZGF0YXZpZXcuZ2V0SW50MzIoMCwgbGl0dGxlRW5kaWFuKTtcblx0XHR9IGVsc2UgaWYgKG51bUJpdHMgPT0gMzIgJiYgIXNpZ25lZCkge1xuXHRcdFx0cmV0dXJuIGRhdGF2aWV3LmdldFVpbnQzMigwLCBsaXR0bGVFbmRpYW4pO1xuICAgICAgICAvLyAyNCBiaXQgaXNuJ3Qgc3VwcG9ydGVkIGJ5IGRlZmF1bHQgc28gd2UgbXVzdCBhZGQgaXRcbiAgICAgICAgLy8gSXQncyBzYWZlIHRvIGNhc3QgaGVyZSBhcyB0aGUgb25seSBudW1iaXRzIHRoYXQgcHJvZHVjZXMgYSBiaWcgaW50IGlzIDY0LlxuXHRcdH0gZWxzZSBpZiAobnVtQml0cyA9PSAyNCAmJiBzaWduZWQpIHtcblx0XHRcdGNvbnN0IGZpcnN0OCA9ICh0aGlzLmFkamFjZW50Qnl0ZXNbMV0uYnl0ZUNvbnZlcnRlcig4LCBzaWduZWQsIGxpdHRsZUVuZGlhbikgYXMgbnVtYmVyKSA8PCAxNjtcblx0XHRcdHJldHVybiBmaXJzdDggfCB0aGlzLmJ5dGVDb252ZXJ0ZXIoMTYsIHNpZ25lZCwgbGl0dGxlRW5kaWFuKSBhcyBudW1iZXI7XG5cdFx0fSBlbHNlIGlmIChudW1CaXRzID09IDI0ICYmICFzaWduZWQpIHtcblx0XHRcdGNvbnN0IGZpcnN0OCA9ICh0aGlzLmFkamFjZW50Qnl0ZXNbMV0uYnl0ZUNvbnZlcnRlcig4LCBzaWduZWQsIGxpdHRsZUVuZGlhbikgYXMgbnVtYmVyICYgMHhGRikgPDwgMTY7XG5cdFx0XHRyZXR1cm4gZmlyc3Q4IHwgdGhpcy5ieXRlQ29udmVydGVyKDE2LCBzaWduZWQsIGxpdHRsZUVuZGlhbikgYXMgbnVtYmVyO1xuXHRcdH0gZWxzZSBpZiAobnVtQml0cyA9PSAxNiAmJiBzaWduZWQpIHtcblx0XHRcdHJldHVybiBkYXRhdmlldy5nZXRJbnQxNigwLCBsaXR0bGVFbmRpYW4pO1xuXHRcdH0gZWxzZSBpZiAobnVtQml0cyA9PSAxNiAmJiAhc2lnbmVkKSB7XG5cdFx0XHRyZXR1cm4gZGF0YXZpZXcuZ2V0VWludDE2KDAsIGxpdHRsZUVuZGlhbik7XG5cdFx0fSBlbHNlIGlmIChudW1CaXRzID09IDggJiYgc2lnbmVkKSB7XG5cdFx0XHRyZXR1cm4gZGF0YXZpZXcuZ2V0SW50OCgwKTtcblx0XHR9IGVsc2UgaWYgKG51bUJpdHMgPT0gOCAmJiAhc2lnbmVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5kZWNpbWFsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOYU47XG5cdH1cbn0iLCIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuaW1wb3J0IHsgdmlydHVhbEhleERvY3VtZW50LCBtZXNzYWdlSGFuZGxlciB9IGZyb20gXCIuL2hleEVkaXRcIjtcbmltcG9ydCB7IFZpcnR1YWxpemVkUGFja2V0IH0gZnJvbSBcIi4vdmlydHVhbERvY3VtZW50XCI7XG5pbXBvcnQgeyBCeXRlRGF0YSB9IGZyb20gXCIuL2J5dGVEYXRhXCI7XG5pbXBvcnQgeyBFZGl0TWVzc2FnZSB9IGZyb20gXCIuL2VkaXRIYW5kbGVyXCI7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIEJ1ZmZlck9wdGlvbnMgdHlwZSB1c2VkIHRvIGRlc2NyaWJlIGhvdyBtYW55IGNodW5rcyBhcmUgd2FudGVkIGFib3ZlIGFuZCBiZWxvdyBhIGdpdmVuIGNodW5rIFxuICovXG5leHBvcnQgdHlwZSBCdWZmZXJPcHRpb25zID0gIHtcbiAgICB0b3BCdWZmZXJTaXplOiBudW1iZXI7XG4gICAgYm90dG9tQnVmZmVyU2l6ZTogbnVtYmVyO1xufVxuLyoqXG4gKiBAZGVzY3JpcHRpb24gQSBjaHVua2hhbmRsZXIgd2hpY2ggaG9sZHMgdGhlIGNodW5rcyBhbmQgaGFuZGxlcyByZXF1ZXN0aW5nIG5ldyBvbmVzXG4gKi9cbmV4cG9ydCBjbGFzcyBDaHVua0hhbmRsZXIge1xuICAgIHByaXZhdGUgY2h1bmtzOiBTZXQ8bnVtYmVyPjtcbiAgICBwcml2YXRlIF9jaHVua1NpemU6IG51bWJlclxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBDb25zdHJ1Y3RzIGEgY2h1bmsgaGFuZGxlciB3aGljaCBoYW5kbGVzIGNodW5rcyBvZiBzaXplIGNodW5rU2l6ZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjaHVua1NpemUgVGhlIHNpemUgb2YgdGhlIGNodW5rcyB3aGljaCB0aGUgY2h1bmtoYW5kbGVyIGhvbGRzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKGNodW5rU2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY2h1bmtzID0gbmV3IFNldDxudW1iZXI+KCk7XG4gICAgICAgIHRoaXMuX2NodW5rU2l6ZSA9IGNodW5rU2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyB0aGUgc2l6ZSBvZiBhIGNodW5rIGluIHRoZSBjaHVuayBoYW5kbGVyXG4gICAgICogQHJldHVybnMge251bWJlcn0gdGhlIHNpemUgb2YgYSBjaHVua1xuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgY2h1bmtTaXplKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jaHVua1NpemU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFdoZXRoZXIgb3Igbm90IGEgY2h1bmsgaG9sZGluZyB0aGUgb2Zmc2V0IGlzIGJlaW5nIHRyYWNrZWQgYnkgdGhlIGNodW5raGFuZGxlclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgVGhlIG9mZnNldCB0byBjaGVjayBhZ2FpbnN0XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59IHdoZXRoZXIgb3Igbm90IGEgY2h1bmsgY29udGFpbmluZyB0aGF0IG9mZnNldCBpcyBiZWluZyB0cmFja2VkXG4gICAgICovXG4gICAgcHVibGljIGhhc0NodW5rKG9mZnNldDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGNvbnN0IGNodW5rU3RhcnQgPSB0aGlzLnJldHJpZXZlQ2h1bmtTdGFydChvZmZzZXQpO1xuICAgICAgICByZXR1cm4gdGhpcy5jaHVua3MuaGFzKGNodW5rU3RhcnQpO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gU2VuZHMgYSByZXF1ZXN0IHRvIHRoZSBleHRlbnNpb24gZm9yIHRoZSBwYWNrZXRzIHdoaWNoIHdvdWxkIG1ha2UgdXAgdGhlIHJlcXVlc3RlZCBjaHVua3NcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2h1bmtTdGFydCBUaGUgc3RhcnQgb2YgdGhlIGNodW5rIHdoaWNoIHlvdSdyZSByZXF1ZXN0aW5nXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHJlcXVlc3RNb3JlQ2h1bmtzKGNodW5rU3RhcnQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAvLyBJZiB0aGUgY2h1bmsgc3RhcnQgaXMgYWJvdmUgdGhlIGRvY3VtZW50IHNpemUgd2Uga25vdyBpdCB3aWxsIG5vdCBnaXZlIHVzIGFueXRoaW5nIGJhY2sgc28gd2UgZG9uJ3QgZG8gYW55dGhpbmdcbiAgICAgICAgaWYgKGNodW5rU3RhcnQgPj0gdmlydHVhbEhleERvY3VtZW50LmRvY3VtZW50U2l6ZSAmJiBjaHVua1N0YXJ0ICE9PSAwKSByZXR1cm47XG4gICAgICAgIC8vIFJlcXVlc3RzIHRoZSBjaHVua3MgZnJvbSB0aGUgZXh0ZW5zaW9uXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0ID0gYXdhaXQgbWVzc2FnZUhhbmRsZXIucG9zdE1lc3NhZ2VXaXRoUmVzcG9uc2UoXCJwYWNrZXRcIiwge1xuICAgICAgICAgICAgICAgIGluaXRpYWxPZmZzZXQ6IGNodW5rU3RhcnQsXG4gICAgICAgICAgICAgICAgbnVtRWxlbWVudHM6IHRoaXMuY2h1bmtTaXplXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0NodW5rcyhyZXF1ZXN0Lm9mZnNldCwgcmVxdWVzdC5kYXRhLCByZXF1ZXN0LmVkaXRzLCByZXF1ZXN0LmZpbGVTaXplKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gR2l2ZW4gYW4gb2Zmc2V0IHRlbGxzIHlvdSB3aGljaCBvZmZzZXQgYmVnaW5zIGl0IGNodW5rc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgVGhlIG9mZnNldCB3aGljaCB5b3Ugd2FudCB0byBrbm93IHRoZSBjaHVuayBzdGFydCBvZlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjaHVuayBzdGFydCBvZiB0aGUgcHJvdmlkZWQgb2Zmc2V0XG4gICAgICovXG4gICAgcHVibGljIHJldHJpZXZlQ2h1bmtTdGFydChvZmZzZXQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKG9mZnNldCAvIHRoaXMuY2h1bmtTaXplKSAqIHRoaXMuY2h1bmtTaXplO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBDYWxsZWQgYnkgdGhlIHZpcnR1YWxEb2N1bWVudCB0byBlbnN1cmUgdGhlcmUgaXMgYnVmZmVyU2l6ZSBjaHVua3MgYWJvdmUgYW5kIGJlbG93IHRoZSBvZmZzZXQgcHJvdmlkZWRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgZ2l2ZW4gdG8gY2hlY2sgdGhlIGJ1ZmZlciBhcm91bmRcbiAgICAgKiBAcGFyYW0ge0J1ZmZlck9wdGlvbnN9IGJ1ZmZlck9wdHMgVGhlIG9wdGlvbnMgZGVzY3JpYmluZyBob3cgbWFueSBjaHVua3MgYWJvdmUgYW5kIGJlbG93IHRoZSBnaXZlbiBvZmZzZXQgeW91IHdhbnRcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTx7cmVtb3ZlZDogbnVtYmVyW107IHJlcXVlc3RlZDogUHJvbWlzZTx2b2lkW10+fT59IEEgcHJvbWlzZSB3aXRoIGFuIGFycmF5IG9mIHJlbW92ZWQgY2h1bmsgc3RhcnRzIGFuZCBhIHByb21pc2Ugd2hpY2ggaXMgYXdhaXRpbmcgdGhlIHJlcXVlc3RlZCBjaHVua3NcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgZW5zdXJlQnVmZmVyKG9mZnNldDogbnVtYmVyLCBidWZmZXJPcHRzOiBCdWZmZXJPcHRpb25zKTogUHJvbWlzZTx7cmVtb3ZlZDogbnVtYmVyW107IHJlcXVlc3RlZDogUHJvbWlzZTx2b2lkW10+fT4ge1xuICAgICAgICBjb25zdCBjaHVua3NUb1JlcXVlc3Q6IFNldDxudW1iZXI+ID0gbmV3IFNldDxudW1iZXI+KCk7XG4gICAgICAgIGNvbnN0IGNodW5rU3RhcnQgPSB0aGlzLnJldHJpZXZlQ2h1bmtTdGFydChvZmZzZXQpO1xuXG4gICAgICAgIC8vIElmIGl0IGRvZXNuJ3QgaGF2ZSBldmVuIHRoZSBzdGFydGluZyBjaHVuayBpdCBtZWFucyB3ZSBtdXN0IGhhdmUgc2Nyb2xsZWQgZmFyIG91dHNpZGUgdGhlIHZpZXdwb3J0IGFuZCB3aWxsIG5lZWQgdG8gcmVxdWV0IHN0YXJ0aW5nIGNodW5rXG4gICAgICAgIC8vIFdlIGNhbiBhZGQgdGhpcyBldmVyeXRpbWUgc2luY2Ugd2UgY29tcHV0ZSBhIHNldCBkaWZmZXJlbmNlIGxhdGVyIGl0IHdpbGwgYmUgcmVtb3ZlZFxuICAgICAgICBjaHVua3NUb1JlcXVlc3QuYWRkKGNodW5rU3RhcnQpO1xuICAgICAgICAvLyBHZXQgdGhlIG9mZnNldHMgb2YgdGhlIGNodW5rcyB0aGF0IHdvdWxkIG1ha2UgdXAgdGhlIGJ1ZmZlcnNcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gYnVmZmVyT3B0cy50b3BCdWZmZXJTaXplOyBpKysgKSB7XG4gICAgICAgICAgICBjaHVua3NUb1JlcXVlc3QuYWRkKE1hdGgubWF4KDAsIGNodW5rU3RhcnQgLSAoaSAqIHRoaXMuY2h1bmtTaXplKSkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IGJ1ZmZlck9wdHMuYm90dG9tQnVmZmVyU2l6ZTsgaSsrICkge1xuICAgICAgICAgICAgY2h1bmtzVG9SZXF1ZXN0LmFkZChjaHVua1N0YXJ0ICsgKGkgKiB0aGlzLmNodW5rU2l6ZSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdlIGRvbid0IHJlcXVlc3QgY2h1bmtzIHdlIGFscmVhZHkgaGF2ZSBzbyB3ZSBmaWx0ZXIgdGhlbSBvdXQgaGVyZVxuICAgICAgICBjb25zdCBjaHVua3NUb1JlcXVlc3RBcnI6IG51bWJlcltdID0gWy4uLmNodW5rc1RvUmVxdWVzdF0uZmlsdGVyKHggPT4gIXRoaXMuY2h1bmtzLmhhcyh4KSk7XG4gICAgICAgIC8vSWYgaXQncyBpbnNpZGUgdGhlIGJ1ZmZlciAod2hpY2ggdGhlIGNodW5rc1RvUmVxdWVzdCBzZXQgaG9sZHMpIHRoZW4gd2Uga2VlcCBpdCwgZWxzZSBpdCdzIGRlbGV0ZWRcbiAgICAgICAgY29uc3QgY2h1bmtzT3V0c2lkZUJ1ZmZlcjogbnVtYmVyW10gPSBbLi4udGhpcy5jaHVua3NdLmZpbHRlcih4ID0+ICFjaHVua3NUb1JlcXVlc3QuaGFzKHgpKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFdlIHN0b3AgdHJhY2tpbmcgdGhlIG9sZCBjaHVua3MgYW5kIHdlIHJlcXVlc3QgdGhlIG5ldyBvbmVzXG4gICAgICAgIGNodW5rc091dHNpZGVCdWZmZXIuZm9yRWFjaChjaHVuayA9PiB0aGlzLnJlbW92ZUNodW5rKGNodW5rKSk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RlZDogUHJvbWlzZTx2b2lkPltdID0gW107XG4gICAgICAgIGNodW5rc1RvUmVxdWVzdEFyci5mb3JFYWNoKGNodW5rT2Zmc2V0ID0+IHJlcXVlc3RlZC5wdXNoKHRoaXMucmVxdWVzdE1vcmVDaHVua3MoY2h1bmtPZmZzZXQpKSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHJlbW92ZWQ6IGNodW5rc091dHNpZGVCdWZmZXIsXG4gICAgICAgICAgICByZXF1ZXN0ZWQ6IFByb21pc2UuYWxsKHJlcXVlc3RlZClcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB0aGUgaW5jb21pbmcgY2h1bmtzIGZyb20gdGhlIGV4dGVuc2lvbiAodGhpcyBnZXRzIGNhbGxlZCBieSB0aGUgbWVzc2FnZSBoYW5kbGVyKVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgVGhlIG9mZnNldCB3aGljaCB3YXMgcmVxdWVzdGRcbiAgICAgKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGRhdGEgVGhlIGRhdGEgd2hpY2ggd2FzIHJldHVybmVkIGJhY2tcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmlsZVNpemUgVGhlIHNpemUgb2YgdGhlIGZpbGUsIHRoaXMgaXMgcGFzc2VkIGJhY2sgZnJvbSB0aGUgZXh0aG9zdCBhbmQgaGVscHMgdG8gZW5zdXJlIHRoZSB3ZWJ2aWV3IGFuZCBleHRob3N0IHNpemVzIGFyZSBzeW5jZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgcHJvY2Vzc0NodW5rcyhvZmZzZXQ6IG51bWJlciwgZGF0YTogVWludDhBcnJheSwgZWRpdHM6IEVkaXRNZXNzYWdlW10sIGZpbGVTaXplOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcGFja2V0czogVmlydHVhbGl6ZWRQYWNrZXRbXSA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIC8vIElmIGl0J3MgYSBjaHVuayBib3VuZGFyeSB3ZSB3YW50IHRvIG1ha2Ugc3VyZSB3ZSdyZSB0cmFja2luZyB0aGF0IGNodW5rXG4gICAgICAgICAgICBpZiAoKGkgKyBvZmZzZXQgKSAlIHRoaXMuY2h1bmtTaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDaHVuayhpICsgb2Zmc2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhY2tldHMucHVzaCh7XG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBpICsgb2Zmc2V0LFxuICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBCeXRlRGF0YShkYXRhW2ldKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBBdCB0aGUgdmVyeSBlbmQgd2Ugd2FudCB0aGUgcGx1cyBjZWxsLCBzbyB3ZSBhZGQgYSBkdW1teSBwYWNrZXQgdGhhdCBpcyBncmVhdGVyIHRoYW4gdGhlIGZpbGVzaXplXG4gICAgICAgICAgICBpZiAoaSArIG9mZnNldCArIDEgPT09IHZpcnR1YWxIZXhEb2N1bWVudC5kb2N1bWVudFNpemUpIHtcbiAgICAgICAgICAgICAgICBwYWNrZXRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBvZmZzZXQ6IGkgKyBvZmZzZXQgKyAxLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBuZXcgQnl0ZURhdGEoMClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBpdCdzIGFuIGVtcHR5IGZpbGUgd2UganVzdCBzZW5kIG92ZXIgdGhlIGR1bW15IHBhY2tldCBmb3IgdGhlIHBsdXMgY2VsbFxuICAgICAgICBpZiAoZGF0YS5sZW5ndGggPT09IDAgJiYgZmlsZVNpemUgPT09IDApIHtcbiAgICAgICAgICAgIHBhY2tldHMucHVzaCh7XG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIGRhdGE6IG5ldyBCeXRlRGF0YSgwKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmlydHVhbEhleERvY3VtZW50LnJlbmRlcihwYWNrZXRzKTtcbiAgICAgICAgdmlydHVhbEhleERvY3VtZW50LnJlZG8oZWRpdHMsIGZpbGVTaXplKTtcbiAgICB9XG4gICAgIFxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBBZGRzIGEgY2h1bmsgd2l0aCB0aGUgZ2l2ZW4gY2h1bmsgb2Zmc2V0IHRvIHRoZSBoYW5kbGVyXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBUaGUgb2Zmc2V0IHdoaWNoIGhvbGRzIHRoZSBjaHVuayBzdGFydCBcbiAgICAgKi9cbiAgICBwdWJsaWMgYWRkQ2h1bmsob2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaHVua3MuYWRkKG9mZnNldCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIERlbGV0ZXMgYSBjaHVuayB3aXRoIHRoZSBnaXZlbiBjaHVuayBvZmZzZXQgdG8gdGhlIGhhbmRsZXJcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgd2hpY2ggaG9sZHMgdGhlIGNodW5rIHN0YXJ0IFxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmVDaHVuayhvZmZzZXQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmNodW5rcy5kZWxldGUob2Zmc2V0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gR2V0dGVyIGZvciBhbGwgdGhlIGNodW5rcyBpbiB0aGUgY2h1bmsgaGFuZGxlclxuICAgICAqIEByZXR1cm5zIHtTZXQ8bnVtZXI+fSB0aGUgc3RhcnRpbmcgb2Zmc2V0cyBvZiBhbGwgdGhlIGNodW5rcyBiZWluZyB0cmFja2VkXG4gICAgICovXG4gICAgcHVibGljIGdldCBhbGxDaHVua3MoKTogU2V0PG51bWJlcj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jaHVua3M7XG4gICAgfVxufSIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG5pbXBvcnQgeyBCeXRlRGF0YSB9IGZyb20gXCIuL2J5dGVEYXRhXCI7XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIENsZWFycyB0aGUgZGF0YSBzcGVjdG9yIGJhY2sgdG8gaXRzIGRlZmF1bHQgc3RhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyRGF0YUluc3BlY3RvcigpOiB2b2lkIHtcbiAgICAvLyBUaGlzIGZ1bmN0aW9uIG9ubHkgZ2V0cyBjYWxsZWQgd2hlbiB0aGVzZSBlbGVtZW50cyBleGlzdCBzbyB0aGVzZSBjYXN0cyBhcmUgc2FmZVxuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiaW5hcnk4XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gXCJcIjtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmluYXJ5OFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5kaXNhYmxlZCA9IHRydWU7XG5cdGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG5cdFx0Y29uc3QgbnVtQml0cyA9IChpICsgMSkgKiA4O1xuXHRcdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaW50JHtudW1CaXRzfWApIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmRpc2FibGVkID0gdHJ1ZTtcblx0XHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGludCR7bnVtQml0c31gKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IFwiXCI7XG5cdFx0XG5cdFx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB1aW50JHtudW1CaXRzfWApIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmRpc2FibGVkID0gdHJ1ZTtcblx0XHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHVpbnQke251bUJpdHN9YCkgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBcIlwiO1xuXHR9XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImludDY0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gXCJcIjtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW50NjRcIikgYXMgSFRNTElucHV0RWxlbWVudCkuZGlzYWJsZWQgPSB0cnVlO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1aW50NjRcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBcIlwiO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1aW50NjRcIikgYXMgSFRNTElucHV0RWxlbWVudCkuZGlzYWJsZWQgPSB0cnVlO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1dGY4XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gXCJcIjtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXRmOFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5kaXNhYmxlZCA9IHRydWU7XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInV0ZjE2XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gXCJcIjtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXRmMTZcIikgYXMgSFRNTElucHV0RWxlbWVudCkuZGlzYWJsZWQgPSB0cnVlO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbG9hdDMyXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gXCJcIjtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmxvYXQzMlwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5kaXNhYmxlZCA9IHRydWU7XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsb2F0NjRcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBcIlwiO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbG9hdDY0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmRpc2FibGVkID0gdHJ1ZTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gR2l2aW5nIGEgQnl0ZURhdGEgb2JqZWN0IGFuZCB3aGF0IGVuZGlhbm5lc3MsIHBvcHVsYXRlcyB0aGUgZGF0YSBpbnNwZWN0b3JcbiAqIEBwYXJhbSB7Qnl0ZURhdGF9IGJ5dGVfb2JqIFRoZSBCeXRlRGF0YSBvYmplY3QgdG8gcmVwcmVzZW50IG9uIHRoZSBkYXRhIGluc3BlY3RvclxuICogQHBhcmFtIHtib29sZWFufSBsaXR0bGVFbmRpYW4gV2V0aGVyIHRoZSBkYXRhIGluc3BlY3RvciBpcyBpbiBsaXR0bGVFbmRpYW4gb3IgYmlnRW5kaWFuIG1vZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBvcHVsYXRlRGF0YUluc3BlY3RvcihieXRlX29iajogQnl0ZURhdGEsIGxpdHRsZUVuZGlhbjogYm9vbGVhbik6IHZvaWQge1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJiaW5hcnk4XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gYnl0ZV9vYmoudG9CaW5hcnkoKTtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYmluYXJ5OFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5kaXNhYmxlZCA9IGZhbHNlO1xuXHRmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuXHRcdGNvbnN0IG51bUJpdHMgPSAoaSArIDEpICogODtcblx0XHRjb25zdCBzaWduZWQgPSBieXRlX29iai5ieXRlQ29udmVydGVyKG51bUJpdHMsIHRydWUsIGxpdHRsZUVuZGlhbik7XG5cdFx0Y29uc3QgdW5zaWduZWQgPSBieXRlX29iai5ieXRlQ29udmVydGVyKG51bUJpdHMsIGZhbHNlLCBsaXR0bGVFbmRpYW4pO1xuXHRcblx0XHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGludCR7bnVtQml0c31gKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IGlzTmFOKE51bWJlcihzaWduZWQpKSA/IFwiRW5kIG9mIEZpbGVcIiA6IHNpZ25lZC50b1N0cmluZygpO1xuXHRcdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgaW50JHtudW1CaXRzfWApIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmRpc2FibGVkID0gZmFsc2U7XG5cdFx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB1aW50JHtudW1CaXRzfWApIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gaXNOYU4oTnVtYmVyKHVuc2lnbmVkKSkgPyBcIkVuZCBvZiBGaWxlXCIgOiB1bnNpZ25lZC50b1N0cmluZygpO1xuXHRcdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdWludCR7bnVtQml0c31gKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5kaXNhYmxlZCA9IGZhbHNlO1xuXHRcdGlmIChudW1CaXRzID09PSAzMikge1xuXHRcdFx0Ly8gVGhlIGJvb2xlYW4gZm9yIHNpZ25lZCBkb2Vzbid0IG1hdHRlciBmb3IgZmxvYXRzIHNvIHRoaXMgY291bGQgYWxzbyBiZSAzMiwgZmFsc2UsIGxpdHRsZUVuZGlhbiwgdHJ1ZVxuXHRcdFx0Y29uc3QgZmxvYXQzMiA9IGJ5dGVfb2JqLmJ5dGVDb252ZXJ0ZXIoMzIsIHRydWUsIGxpdHRsZUVuZGlhbiwgdHJ1ZSk7XG5cdFx0XHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmbG9hdDMyXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gaXNOYU4oTnVtYmVyKGZsb2F0MzIpKSA/IFwiRW5kIG9mIEZpbGVcIiA6IGZsb2F0MzIudG9TdHJpbmcoKTtcblx0XHRcdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsb2F0MzJcIikgYXMgSFRNTElucHV0RWxlbWVudCkuZGlzYWJsZWQgPSBmYWxzZTtcblx0XHR9XG5cdH1cblx0Y29uc3Qgc2lnbmVkNjQgPSBieXRlX29iai5ieXRlQ29udmVydGVyKDY0LCB0cnVlLCBsaXR0bGVFbmRpYW4pO1xuXHRjb25zdCB1bnNpZ25lZDY0ID0gYnl0ZV9vYmouYnl0ZUNvbnZlcnRlcig2NCwgZmFsc2UsIGxpdHRsZUVuZGlhbik7XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImludDY0XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gaXNOYU4oTnVtYmVyKHNpZ25lZDY0KSkgPyBcIkVuZCBvZiBGaWxlXCIgOiBzaWduZWQ2NC50b1N0cmluZygpO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnQ2NFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5kaXNhYmxlZCA9IGZhbHNlO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1aW50NjRcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPSBpc05hTihOdW1iZXIodW5zaWduZWQ2NCkpID8gXCJFbmQgb2YgRmlsZVwiIDogdW5zaWduZWQ2NC50b1N0cmluZygpO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1aW50NjRcIikgYXMgSFRNTElucHV0RWxlbWVudCkuZGlzYWJsZWQgPSBmYWxzZTtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXRmOFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IGJ5dGVfb2JqLnRvVVRGOChsaXR0bGVFbmRpYW4pO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1dGY4XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmRpc2FibGVkID0gZmFsc2U7XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInV0ZjE2XCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlID0gYnl0ZV9vYmoudG9VVEYxNihsaXR0bGVFbmRpYW4pO1xuXHQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1dGYxNlwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS5kaXNhYmxlZCA9IGZhbHNlO1xuXHRjb25zdCBmbG9hdDY0ID0gYnl0ZV9vYmouYnl0ZUNvbnZlcnRlcig2NCwgdHJ1ZSwgbGl0dGxlRW5kaWFuLCB0cnVlKTtcblx0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmxvYXQ2NFwiKSBhcyBIVE1MSW5wdXRFbGVtZW50KS52YWx1ZSA9IGlzTmFOKE51bWJlcihmbG9hdDY0KSkgPyBcIkVuZCBvZiBGaWxlXCIgOiBmbG9hdDY0LnRvU3RyaW5nKCk7XG5cdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsb2F0NjRcIikgYXMgSFRNTElucHV0RWxlbWVudCkuZGlzYWJsZWQgPSBmYWxzZTtcbn0iLCIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuaW1wb3J0IHsgZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQsIHVwZGF0ZUFzY2lpVmFsdWUsIGdldEVsZW1lbnRzT2Zmc2V0IH0gZnJvbSBcIi4vdXRpbFwiO1xuaW1wb3J0IHsgQnl0ZURhdGEgfSBmcm9tIFwiLi9ieXRlRGF0YVwiO1xuaW1wb3J0IHsgbWVzc2FnZUhhbmRsZXIsIHZpcnR1YWxIZXhEb2N1bWVudCB9IGZyb20gXCIuL2hleEVkaXRcIjtcbmltcG9ydCB7IFNlbGVjdEhhbmRsZXIgfSBmcm9tIFwiLi9zZWxlY3RIYW5kbGVyXCI7XG5cbmludGVyZmFjZSBEb2N1bWVudEVkaXQge1xuICAgIG9mZnNldDogbnVtYmVyO1xuICAgIHByZXZpb3VzVmFsdWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBuZXdWYWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCB8IHVuZGVmaW5lZDtcbn1cblxuLy8gVGhpcyBpcyB3aGF0IGFuIGVkaXQgdG8vZnJvbSB0aGUgZXh0ZW5zaW9uIGhvc3QgbG9va3MgbGlrZVxuZXhwb3J0IGludGVyZmFjZSBFZGl0TWVzc2FnZSB7XG4gICAgcmVhZG9ubHkgb2xkVmFsdWU6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICByZWFkb25seSBuZXdWYWx1ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIHJlYWRvbmx5IG9mZnNldDogbnVtYmVyO1xuICAgIHJlYWRvbmx5IHNhbWVPbkRpc2s6IGJvb2xlYW47XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIENsYXNzIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyBlZGl0cyB3aXRoaW4gdGhlIHZpcnR1YWwgZG9jdW1lbnRcbiAqL1xuZXhwb3J0IGNsYXNzIEVkaXRIYW5kbGVyIHtcbiAgICBwcml2YXRlIHBlbmRpbmdFZGl0OiBEb2N1bWVudEVkaXQgfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5wZW5kaW5nRWRpdCA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB3aGVuIGEgdXNlciBzdGFydHMgdHlwaW5nIG9uIGEgaGV4IGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge0hUTUxTcGFuRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB3aGljaCB0aGUga2V5cHJlc3Mgd2FzIGZpcmVkIG9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVByZXNzZWQgVGhlIGtleSB3aGljaCB3YXMgcHJlc3NlZFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBlZGl0SGV4KGVsZW1lbnQ6IEhUTUxTcGFuRWxlbWVudCwga2V5UHJlc3NlZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIC8vIElmIHRoZSB1c2VyIHByZXNzZXMgZXNjYXBlIGFuZCB0aGVyZSBpcyBhIGN1cnJlbnQgZWRpdCB0aGVuIHdlIGp1c3QgcmV2ZXJ0IHRoZSBjZWxsIGFzIGlmIG5vIGVkaXQgaGFzIGhhcHBlbmVkXG4gICAgICAgIGlmIChrZXlQcmVzc2VkID09PSBcIkVzY2FwZVwiICYmIHRoaXMucGVuZGluZ0VkaXQgJiYgdGhpcy5wZW5kaW5nRWRpdC5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IHRoaXMucGVuZGluZ0VkaXQucHJldmlvdXNWYWx1ZTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImVkaXRpbmdcIik7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdFZGl0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGl0J3Mgbm90IGEgdmFsaWQgaGV4IGlucHV0IG9yIGRlbGV0ZSB3ZSBpZ25vcmUgaXRcbiAgICAgICAgY29uc3QgcmVnZXggPSBuZXcgUmVnRXhwKC9eW2EtZkEtRjAtOV0kL2dtKTtcbiAgICAgICAgaWYgKGtleVByZXNzZWQubWF0Y2gocmVnZXgpID09PSBudWxsICYmIGtleVByZXNzZWQgIT09IFwiRGVsZXRlXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG9mZnNldDogbnVtYmVyID0gZ2V0RWxlbWVudHNPZmZzZXQoZWxlbWVudCk7XG4gICAgICAgIGlmICghdGhpcy5wZW5kaW5nRWRpdCB8fCB0aGlzLnBlbmRpbmdFZGl0Lm9mZnNldCAhPSBvZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0VkaXQgPSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgICAgICAgICAgcHJldmlvdXNWYWx1ZTogZWxlbWVudC5pbm5lclRleHQgPT09IFwiK1wiID8gdW5kZWZpbmVkIDogZWxlbWVudC5pbm5lclRleHQsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IFwiXCIsXG4gICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJlZGl0aW5nXCIpO1xuICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGVsZW1lbnQuaW5uZXJUZXh0LnRyaW1SaWdodCgpO1xuICAgICAgICAvLyBXaGVuIHRoZSB1c2VyIGhpdHMgZGVsZXRlXG4gICAgICAgIGlmIChrZXlQcmVzc2VkID09PSBcIkRlbGV0ZVwiKSB7XG4gICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IFwiICBcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaGFuZGxlcyB3aGVuIHRoZSB1c2VyIHByZXNzZXMgdGhlIGZpcnN0IGNoYXJhY3RlciBlcmFzaW5nIHRoZSBvbGQgdmFsdWUgdnMgYWRkaW5nIHRvIHRoZSBjdXJyZW50bHkgZWRpdGVkIHZhbHVlXG4gICAgICAgICAgICBlbGVtZW50LmlubmVyVGV4dCA9IGVsZW1lbnQuaW5uZXJUZXh0Lmxlbmd0aCAhPT0gMSB8fCBlbGVtZW50LmlubmVyVGV4dCA9PT0gXCIrXCIgPyBgJHtrZXlQcmVzc2VkLnRvVXBwZXJDYXNlKCl9IGAgOiBlbGVtZW50LmlubmVyVGV4dCArIGtleVByZXNzZWQudG9VcHBlckNhc2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGVuZGluZ0VkaXQubmV3VmFsdWUgPSBlbGVtZW50LmlubmVyVGV4dDtcbiAgICAgICAgaWYgKGVsZW1lbnQuaW5uZXJUZXh0LnRyaW1SaWdodCgpLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhZGQtY2VsbFwiKTtcbiAgICAgICAgICAgIC8vIE5vdCByZWFsbHkgYW4gZWRpdCBpZiBub3RoaW5nIGNoYW5nZWRcbiAgICAgICAgICAgIGlmICh0aGlzLnBlbmRpbmdFZGl0Lm5ld1ZhbHVlID09IHRoaXMucGVuZGluZ0VkaXQucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGVuZGluZ0VkaXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZW5kRWRpdFRvRXh0SG9zdChbdGhpcy5wZW5kaW5nRWRpdF0pO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVBc2NpaShlbGVtZW50LmlubmVyVGV4dCwgb2Zmc2V0KTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImVkaXRlZFwiKTtcbiAgICAgICAgICAgIC8vIE1lYW5zIHRoZSBsYXN0IGNlbGwgb2YgdGhlIGRvY3VtZW50IHdhcyBmaWxsZWQgaW4gc28gd2UgYWRkIGFub3RoZXIgcGxhY2Vob2xkZXIgYWZ0ZXJ3YXJkc1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBlbmRpbmdFZGl0LnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQuY3JlYXRlQWRkQ2VsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nRWRpdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHdoZW4gdGhlIHVzZXIgc3RhcnRzIHR5cGluZyBvbiBhbiBhc2NpaSBlbGVtZW50XG4gICAgICogQHBhcmFtIHtIVE1MU3BhbkVsZW1lbnR9IGVsZW1lbnQgVGhlIGVsZW1lbnQgd2hpY2ggdGhlIGtleXN0cm9rZSB3YXMgZmlyZWQgb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5UHJlc3NlZCBUaGUga2V5IHdoaWNoIHdhcyBwcmVzc2VkXG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIGVkaXRBc2NpaShlbGVtZW50OiBIVE1MU3BhbkVsZW1lbnQsIGtleVByZXNzZWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAvLyBXZSBkb24ndCB3YW50IHRvIGRvIGFueXRoaW5nIGlmIHRoZSB1c2VyIHByZXNzZXMgYSBrZXkgc3VjaCBhcyBob21lIGV0YyB3aGljaCB3aWxsIHJlZ2lzdGVyIGFzIGdyZWF0ZXIgdGhhbiAxIGNoYXJcbiAgICAgICAgaWYgKGtleVByZXNzZWQubGVuZ3RoICE9IDEpIHJldHVybjtcbiAgICAgICAgLy8gTm8gbmVlZCB0byBjYWxsIGl0IGVkaXRlZCBpZiBpdCdzIHRoZSBzYW1lIHZhbHVlXG4gICAgICAgIGlmIChlbGVtZW50LmlubmVyVGV4dCA9PT0ga2V5UHJlc3NlZCkgcmV0dXJuO1xuICAgICAgICBjb25zdCBvZmZzZXQ6IG51bWJlciA9IGdldEVsZW1lbnRzT2Zmc2V0KGVsZW1lbnQpO1xuICAgICAgICBjb25zdCBoZXhFbGVtZW50ID0gZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQob2Zmc2V0KVswXTtcbiAgICAgICAgLy8gV2Ugc3RvcmUgYWxsIHBlbmRpbmcgZWRpdHMgYXMgaGV4IGFzIGFzY2lpIGlzbid0IGFsd2F5cyByZXByZXNlbnRhdGl2ZSBkdWUgdG8gY29udHJvbCBjaGFyYWN0ZXJzXG4gICAgICAgIHRoaXMucGVuZGluZ0VkaXQgPSB7XG4gICAgICAgICAgICBvZmZzZXQ6IG9mZnNldCxcbiAgICAgICAgICAgIHByZXZpb3VzVmFsdWU6IGhleEVsZW1lbnQuaW5uZXJUZXh0ID09PSBcIitcIiA/IHVuZGVmaW5lZCA6IGhleEVsZW1lbnQuaW5uZXJUZXh0LFxuICAgICAgICAgICAgbmV3VmFsdWU6IGtleVByZXNzZWQuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKSxcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgfTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWRkLWNlbGxcIik7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImVkaXRpbmdcIik7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImVkaXRlZFwiKTtcbiAgICAgICAgdGhpcy51cGRhdGVBc2NpaSh0aGlzLnBlbmRpbmdFZGl0Lm5ld1ZhbHVlLCBvZmZzZXQpO1xuICAgICAgICB0aGlzLnVwZGF0ZUhleChrZXlQcmVzc2VkLCBvZmZzZXQpO1xuICAgICAgICBhd2FpdCB0aGlzLnNlbmRFZGl0VG9FeHRIb3N0KFt0aGlzLnBlbmRpbmdFZGl0XSk7XG4gICAgICAgIC8vIE1lYW5zIHRoZSBsYXN0IGNlbGwgb2YgdGhlIGRvY3VtZW50IHdhcyBmaWxsZWQgaW4gc28gd2UgYWRkIGFub3RoZXIgcGxhY2Vob2xkZXIgYWZ0ZXJ3YXJkc1xuICAgICAgICBpZiAoIXRoaXMucGVuZGluZ0VkaXQucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgdmlydHVhbEhleERvY3VtZW50LmNyZWF0ZUFkZENlbGwoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBlbmRpbmdFZGl0ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhIGhleCB2YWx1ZSB1cGRhdGVzIHRoZSByZXNwZWN0aXZlIGFzY2lpIHZhbHVlXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCB1bmRlZmluZWR9IGhleFZhbHVlIFRoZSBoZXggdmFsdWUgdG8gY29udmVydCB0byBhc2NpaVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgVGhlIG9mZnNldCBvZiB0aGUgYXNjaWkgdmFsdWUgdG8gdXBkYXRlXG4gICAgICovXG4gICAgcHJpdmF0ZSB1cGRhdGVBc2NpaShoZXhWYWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkLCBvZmZzZXQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBGb3Igbm93IGlmIGl0J3MgdW5kZWZpbmVkIHdlIHdpbGwganVzdCBpZ25vcmUgaXQsIGJ1dCB0aGlzIHdvdWxkIGJlIHRoZSBkZWxldGUgY2FzZVxuICAgICAgICBpZiAoIWhleFZhbHVlKSByZXR1cm47XG4gICAgICAgIC8vIFRoZSB3YXkgdGhlIERPTSBpcyBjb25zdHJ1Y3RlZCB0aGUgYXNjaWkgZWxlbWVudCB3aWxsIGFsd2F5cyBiZSB0aGUgc2Vjb25kIG9uZVxuICAgICAgICBjb25zdCBhc2NpaSA9IGdldEVsZW1lbnRzV2l0aEdpdmVuT2Zmc2V0KG9mZnNldClbMV07XG4gICAgICAgIGFzY2lpLmNsYXNzTGlzdC5yZW1vdmUoXCJhZGQtY2VsbFwiKTtcbiAgICAgICAgdXBkYXRlQXNjaWlWYWx1ZShuZXcgQnl0ZURhdGEocGFyc2VJbnQoaGV4VmFsdWUsIDE2KSksIGFzY2lpKTtcbiAgICAgICAgYXNjaWkuY2xhc3NMaXN0LmFkZChcImVkaXRlZFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gR2l2ZW4gYW4gYXNjaWkgdmFsdWUgdXBkYXRlcyB0aGUgcmVzcGVjdGl2ZSBoZXggdmFsdWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXNjaWlWYWx1ZSBUaGUgYXNjaWkgdmFsdWUgdG8gY29udmVydCB0byBoZXhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gb2Zmc2V0IFRoZSBvZmZzZXQgb2YgdGhlIGhleCB2YWx1ZSB0byB1cGRhdGVcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZUhleChhc2NpaVZhbHVlOiBzdHJpbmcsIG9mZnNldDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIC8vIFRoZSB3YXkgdGhlIERPTSBpcyBjb25zdHJ1Y3RlZCB0aGUgaGV4IGVsZW1lbnQgd2lsbCBhbHdheXMgYmUgdGhlIGZpcnN0IG9uZVxuICAgICAgICBjb25zdCBoZXggPSBnZXRFbGVtZW50c1dpdGhHaXZlbk9mZnNldChvZmZzZXQpWzBdO1xuICAgICAgICBoZXguaW5uZXJUZXh0ID0gYXNjaWlWYWx1ZS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBoZXguY2xhc3NMaXN0LnJlbW92ZShcImFkZC1jZWxsXCIpO1xuICAgICAgICBoZXguY2xhc3NMaXN0LmFkZChcImVkaXRlZFwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ29tcGxldGVzIHRoZSBjdXJyZW50IGVkaXQsIHRoaXMgaXMgdXNlZCBpZiB0aGUgdXNlciBuYXZpZ2F0ZXMgb2ZmIHRoZSBjZWxsIGFuZCBpdCB3YXNuJ3QgZG9uZSBiZWluZyBlZGl0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgY29tcGxldGVQZW5kaW5nRWRpdHMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICh0aGlzLnBlbmRpbmdFZGl0ICYmIHRoaXMucGVuZGluZ0VkaXQuZWxlbWVudCAmJiB0aGlzLnBlbmRpbmdFZGl0Lm5ld1ZhbHVlKSB7XG4gICAgICAgICAgICAvLyBXZSBkb24ndCB3YW50IHRvIHN0b3AgdGhlIGVkaXQgaWYgaXQgaXMgc2VsZWN0ZWQgYXMgdGhhdCBjYW4gbWVhbiB0aGUgdXNlciB3aWxsIGJlIG1ha2luZyBmdXJ0aGVyIGVkaXRzXG4gICAgICAgICAgICBpZiAodGhpcy5wZW5kaW5nRWRpdC5lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcInNlbGVjdGVkXCIpKSByZXR1cm47XG4gICAgICAgICAgICAvLyBFbnN1cmUgdGhlIGhleCB2YWx1ZSBoYXMgMiBjaGFyYWN0ZXJzLCBpZiBub3Qgd2UgYWRkIGEgMCBpbiBmcm9udFxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nRWRpdC5uZXdWYWx1ZSA9IFwiMDBcIiArIHRoaXMucGVuZGluZ0VkaXQubmV3VmFsdWUudHJpbVJpZ2h0KCk7XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdFZGl0Lm5ld1ZhbHVlID0gdGhpcy5wZW5kaW5nRWRpdC5uZXdWYWx1ZS5zbGljZSh0aGlzLnBlbmRpbmdFZGl0Lm5ld1ZhbHVlLmxlbmd0aCAtIDIpO1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nRWRpdC5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0aW5nXCIpO1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nRWRpdC5lbGVtZW50LmlubmVyVGV4dCA9IHRoaXMucGVuZGluZ0VkaXQubmV3VmFsdWU7XG4gICAgICAgICAgICAvLyBObyBlZGl0IHJlYWxseSBoYXBwZW5lZCBzbyB3ZSBkb24ndCB3YW50IGl0IHRvIHVwZGF0ZSB0aGUgZXh0IGhvc3RcbiAgICAgICAgICAgIGlmICh0aGlzLnBlbmRpbmdFZGl0Lm5ld1ZhbHVlID09PSB0aGlzLnBlbmRpbmdFZGl0LnByZXZpb3VzVmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFzY2lpKHRoaXMucGVuZGluZ0VkaXQubmV3VmFsdWUsIHRoaXMucGVuZGluZ0VkaXQub2Zmc2V0KTtcbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0VkaXQuZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZWRpdGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5wZW5kaW5nRWRpdC5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhZGQtY2VsbFwiKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2VuZEVkaXRUb0V4dEhvc3QoW3RoaXMucGVuZGluZ0VkaXRdKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5wZW5kaW5nRWRpdC5wcmV2aW91c1ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmlydHVhbEhleERvY3VtZW50LmNyZWF0ZUFkZENlbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGVuZGluZ0VkaXQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gR2l2ZW4gYSBsaXN0IG9mIGVkaXRzIHNlbmRzIGl0IHRvIHRoZSBleHRob3N0IHNvIHRoYXQgdGhlIGV4dCBob3N0IGFuZCB3ZWJ2aWV3IGFyZSBpbiBzeW5jXG4gICAgICogQHBhcmFtIHtEb2N1bWVudEVkaXR9IGVkaXRzIFRoZSBlZGl0cyB0byBzZW5kIHRvIHRoZSBleHRob3N0XG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBzZW5kRWRpdFRvRXh0SG9zdChlZGl0czogRG9jdW1lbnRFZGl0W10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgZXh0SG9zdE1lc3NhZ2U6IEVkaXRNZXNzYWdlW10gPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBlZGl0IG9mIGVkaXRzKSB7XG4gICAgICAgICAgICAvLyBUaGUgZXh0IGhvc3Qgb25seSBhY2NlcHRzIDhiaXQgdW5zaWduZWQgaW50cywgc28gd2UgbXVzdCBjb252ZXJ0IHRoZSBlZGl0cyBiYWNrIGludG8gdGhhdCByZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSBlZGl0LnByZXZpb3VzVmFsdWUgPyBwYXJzZUludChlZGl0LnByZXZpb3VzVmFsdWUsIDE2KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZhbHVlID0gZWRpdC5uZXdWYWx1ZSA/IHBhcnNlSW50KGVkaXQubmV3VmFsdWUsIDE2KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgIG9mZnNldDogZWRpdC5vZmZzZXQsXG4gICAgICAgICAgICAgICAgb2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWUsXG4gICAgICAgICAgICAgICAgc2FtZU9uRGlzazogZmFsc2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBleHRIb3N0TWVzc2FnZS5wdXNoKGN1cnJlbnRNZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc3luY2VkRmlsZVNpemUgPSAoYXdhaXQgbWVzc2FnZUhhbmRsZXIucG9zdE1lc3NhZ2VXaXRoUmVzcG9uc2UoXCJlZGl0XCIsIGV4dEhvc3RNZXNzYWdlKSkuZmlsZVNpemU7XG4gICAgICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQudXBkYXRlRG9jdW1lbnRTaXplKHN5bmNlZEZpbGVTaXplKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvLyBFbXB0eSBjYXRjaCBiZWNhdXNlIHdlIGp1c3QgZG9uJ3QgZG8gYW55dGhpbmcgaWYgZm9yIHNvbWUgcmVhc29uIHRoZSBleHRob3N0IGRvZXNuJ3QgcmVzcG9uZCB3aXRoIHRoZSBuZXcgZmlsZVNpemUsXG4gICAgICAgICAgICAvLyB3ZSBqdXN0IHN5bmMgYXQgdGhlIG5leHQgYXZhaWxhYmxlIG9wcG9ydHVuaXR5XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gR2l2ZW4gYSBsaXN0IG9mIGVkaXRzIHVuZG9lcyB0aGVtIGZyb20gdGhlIGRvY3VtZW50XG4gICAgICogQHBhcmFtIHtFZGl0TWVzc2FnZVtdfSBlZGl0cyBUaGUgbGlzdCBvZiBlZGl0cyB0byB1bmRvXG4gICAgICovXG4gICAgcHVibGljIHVuZG8oZWRpdHM6IEVkaXRNZXNzYWdlW10pOiB2b2lkIHtcbiAgICAgICAgLy8gV2Ugd2FudCB0byBwcm9jZXNzIHRoZSBoaWdoZXN0IG9mZnNldCBmaXJzdCBhcyB3ZSBvbmx5IHN1cHBvcnQgcmVtb3ZpbmcgY2VsbHMgZnJvbSB0aGUgZW5kIG9mIHRoZSBkb2N1bWVudFxuICAgICAgICAvLyBTbyBpZiB3ZSBuZWVkIHRvIHJlbW92ZSAzIGNlbGxzIHdlIGNhbid0IHJlbW92ZSB0aGVtIGluIGFyYml0cmFyeSBvcmRlciBpdCBuZWVkcyB0byBiZSBvdXRlcm1vc3QgY2VsbCBmaXJzdFxuICAgICAgICBpZiAoZWRpdHMubGVuZ3RoID4gMSAmJiBlZGl0c1swXS5vZmZzZXQgPCBlZGl0c1tlZGl0cy5sZW5ndGggLSAxXS5vZmZzZXQpIHtcbiAgICAgICAgICAgIGVkaXRzID0gZWRpdHMucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgZWRpdCBvZiBlZGl0cykge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyB0aGUgZGVsZXRlIGNhc2VcbiAgICAgICAgICAgIGlmIChlZGl0Lm9sZFZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQuZm9jdXNFbGVtZW50V2l0aEdpdmVuT2Zmc2V0KHZpcnR1YWxIZXhEb2N1bWVudC5kb2N1bWVudFNpemUpO1xuICAgICAgICAgICAgICAgIHZpcnR1YWxIZXhEb2N1bWVudC5yZW1vdmVMYXN0Q2VsbCgpO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSBnZXRFbGVtZW50c1dpdGhHaXZlbk9mZnNldChlZGl0Lm9mZnNldCk7XG4gICAgICAgICAgICAvLyBXZSdyZSBleGVjdXRpbmcgYW4gdW5kbyBhbmQgdGhlIGVsZW1lbnRzIGFyZW4ndCBvbiB0aGUgRE9NIHNvIHRoZXJlJ3Mgbm8gcG9pbnQgaW4gZG9pbmcgYW55dGhpbmdcbiAgICAgICAgICAgIGlmIChlbGVtZW50cy5sZW5ndGggIT0gMikgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGVkaXQuc2FtZU9uRGlzaykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0ZWRcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNbMV0uY2xhc3NMaXN0LnJlbW92ZShcImVkaXRlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNbMF0uY2xhc3NMaXN0LmFkZChcImVkaXRlZFwiKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50c1sxXS5jbGFzc0xpc3QuYWRkKFwiZWRpdGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlbWVudHNbMF0uaW5uZXJUZXh0ID0gZWRpdC5vbGRWYWx1ZS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGVsZW1lbnRzWzBdLmlubmVyVGV4dCA9IGVsZW1lbnRzWzBdLmlubmVyVGV4dC5sZW5ndGggPT0gMiA/IGVsZW1lbnRzWzBdLmlubmVyVGV4dCA6IGAwJHtlbGVtZW50c1swXS5pbm5lclRleHR9YDtcbiAgICAgICAgICAgIHVwZGF0ZUFzY2lpVmFsdWUobmV3IEJ5dGVEYXRhKGVkaXQub2xkVmFsdWUpLCBlbGVtZW50c1sxXSk7XG4gICAgICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQuZm9jdXNFbGVtZW50V2l0aEdpdmVuT2Zmc2V0KGVkaXQub2Zmc2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhIGxpc3Qgb2YgZWRpdHMgcmVhcHBsaWVzIHRoZW0gdG8gdGhlIGRvY3VtZW50XG4gICAgICogQHBhcmFtIHtFZGl0TWVzc2FnZVtdfSBlZGl0cyBUaGUgbGlzdCBvZiBlZGl0cyB0byByZWRvXG4gICAgICovXG4gICAgcHVibGljIHJlZG8oZWRpdHM6IEVkaXRNZXNzYWdlW10pOiB2b2lkIHtcbiAgICAgICAgZm9yIChjb25zdCBlZGl0IG9mIGVkaXRzKSB7XG4gICAgICAgICAgICBpZiAoZWRpdC5uZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQoZWRpdC5vZmZzZXQpO1xuICAgICAgICAgICAgLy8gV2UncmUgZXhlY3V0aW5nIGFuIHJlZG8gYW5kIHRoZSBlbGVtZW50cyBhcmVuJ3Qgb24gdGhlIERPTSBzbyB0aGVyZSdzIG5vIHBvaW50IGluIGRvaW5nIGFueXRoaW5nXG4gICAgICAgICAgICBpZiAoZWxlbWVudHMubGVuZ3RoICE9IDIpIGNvbnRpbnVlO1xuICAgICAgICAgICAgZWxlbWVudHNbMF0uY2xhc3NMaXN0LnJlbW92ZShcImFkZC1jZWxsXCIpO1xuICAgICAgICAgICAgZWxlbWVudHNbMV0uY2xhc3NMaXN0LnJlbW92ZShcImFkZC1jZWxsXCIpO1xuICAgICAgICAgICAgaWYgKGVkaXQuc2FtZU9uRGlzaykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRzWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0ZWRcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNbMV0uY2xhc3NMaXN0LnJlbW92ZShcImVkaXRlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudHNbMF0uY2xhc3NMaXN0LmFkZChcImVkaXRlZFwiKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50c1sxXS5jbGFzc0xpc3QuYWRkKFwiZWRpdGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlbWVudHNbMF0uaW5uZXJUZXh0ID0gZWRpdC5uZXdWYWx1ZS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIGVsZW1lbnRzWzBdLmlubmVyVGV4dCA9IGVsZW1lbnRzWzBdLmlubmVyVGV4dC5sZW5ndGggPT0gMiA/IGVsZW1lbnRzWzBdLmlubmVyVGV4dCA6IGAwJHtlbGVtZW50c1swXS5pbm5lclRleHR9YDtcbiAgICAgICAgICAgIHVwZGF0ZUFzY2lpVmFsdWUobmV3IEJ5dGVEYXRhKGVkaXQubmV3VmFsdWUpLCBlbGVtZW50c1sxXSk7XG4gICAgICAgICAgICAvLyBJZiBubyBhZGQgY2VsbHMgYXJlIGxlZnQgd2UgbmVlZCB0byBhZGQgbW9yZSBhcyB0aGlzIG1lYW5zIHdlIGp1c3QgcmVwbGFjZWQgdGhlIGVuZFxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhZGQtY2VsbFwiKS5sZW5ndGggPT09IDAgJiYgZWRpdC5vbGRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gV2UgYXJlIGdvaW5nIHRvIGVzdGltYXRlIHRoZSBmaWxlc2l6ZSBhbmQgaXQgd2lsbCBiZSByZXN5bmNlZCBhdCB0aGUgZW5kIGlmIHdyb25nXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBpcyBiZWNhdXNlIHdlIGFkZCAxIGNlbGwgYXQgYSB0aW1lIHRoZXJlZm9yZSBpZiB3ZSBwYXN0ZSB0aGUgZmlsZXNpemUgaXMgbGFyZ2VyIHRoYW4gd2hhdHMgcmVuZGVyZWQgYnJlYWtpbmcgdGhlIHBsdXMgY2VsbCBsb2dpY1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgY2F1c2VzIGlzc3VlcyBzbyB0aGlzIGlzIGEgcXVpY2sgZml4LCBhbm90aGVyIGZpeCB3b3VsZCBiZSB0byBhcHBseSBhbGwgY2VsbHMgYXQgb25jZVxuICAgICAgICAgICAgICAgIHZpcnR1YWxIZXhEb2N1bWVudC51cGRhdGVEb2N1bWVudFNpemUodmlydHVhbEhleERvY3VtZW50LmRvY3VtZW50U2l6ZSArIDEpO1xuICAgICAgICAgICAgICAgIHZpcnR1YWxIZXhEb2N1bWVudC5jcmVhdGVBZGRDZWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQuZm9jdXNFbGVtZW50V2l0aEdpdmVuT2Zmc2V0KGVkaXQub2Zmc2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHdoZW4gYSB1c2VyIGNvcGllc1xuICAgICAqIEBwYXJhbSB7Q2xpcGJvYXJkRXZlbnR9IGV2ZW50IFRoZSBjbGlicG9hcmQgZXZlbnQgcGFzc2VkIHRvIGEgY29weSBldmVudCBoYW5kbGVyXG4gICAgICovXG4gICAgcHVibGljIGNvcHkoZXZlbnQ6IENsaXBib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LmNsaXBib2FyZERhdGE/LnNldERhdGEoXCJ0ZXh0L2pzb25cIiwgSlNPTi5zdHJpbmdpZnkoU2VsZWN0SGFuZGxlci5nZXRTZWxlY3RlZEhleCgpKSk7XG4gICAgICAgIGV2ZW50LmNsaXBib2FyZERhdGE/LnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIFNlbGVjdEhhbmRsZXIuZ2V0U2VsZWN0ZWRWYWx1ZSgpKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB3aGVuIGEgdXNlciBwYXN0ZXNcbiAgICAgKiBAcGFyYW0ge0NsaXBib2FyZEV2ZW50fSBldmVudCBUaGUgY2xpYnBvYXJkIGV2ZW50IHBhc3NlZCB0byBhIHBhc3RlIGV2ZW50IGhhbmRsZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgcGFzdGUoZXZlbnQ6IENsaXBib2FyZEV2ZW50KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIC8vIElmIHdoYXQncyBvbiB0aGUgY2xpcGJvYXJkIGlzbid0IGpzb24gd2Ugd29uJ3QgdHJ5IHRvIHBhc3QgaXQgaW5cbiAgICAgICAgaWYgKCFldmVudC5jbGlwYm9hcmREYXRhIHx8IGV2ZW50LmNsaXBib2FyZERhdGEudHlwZXMuaW5kZXhPZihcInRleHQvanNvblwiKSA8IDApIHJldHVybjtcbiAgICAgICAgY29uc3QgaGV4RGF0YSA9IEpTT04ucGFyc2UoZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKFwidGV4dC9qc29uXCIpKTtcbiAgICAgICAgLy8gV2UgZG8gQXJyYXkuZnJvbSgpIGFzIHRoaXMgbWFrZXMgaXQgc28gdGhlIGFycmF5IG5vIGxvbmdlciBpcyB0aWVkIHRvIHRoZSBkb20gd2hvJ3Mgc2VsZWN0aW9uIG1heSBjaGFuZ2UgZHVyaW5nIHRoaXMgcGFzdGVcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWQgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3RlZCBoZXhcIikgYXMgSFRNTENvbGxlY3Rpb25PZjxIVE1MU3BhbkVsZW1lbnQ+KTtcbiAgICAgICAgY29uc3QgZWRpdHM6IERvY3VtZW50RWRpdFtdID0gW107XG4gICAgICAgIC8vIFdlIGFwcGx5IGFzIG11Y2ggb2YgdGhlIGhleCBkYXRhIGFzIHdlIGNhbiBiYXNlZCBvbiB0aGUgc2VsZWN0aW9uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2VsZWN0ZWQubGVuZ3RoICYmIGkgPCBoZXhEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gc2VsZWN0ZWRbaV07XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQ6IG51bWJlciA9IGdldEVsZW1lbnRzT2Zmc2V0KGVsZW1lbnQpO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEVkaXQ6IERvY3VtZW50RWRpdCA9IHtcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IG9mZnNldCxcbiAgICAgICAgICAgICAgICBwcmV2aW91c1ZhbHVlOiBlbGVtZW50LmlubmVyVGV4dCA9PT0gXCIrXCIgPyB1bmRlZmluZWQgOiBlbGVtZW50LmlubmVyVGV4dCxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogaGV4RGF0YVtpXSxcbiAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWRkLWNlbGxcIik7XG4gICAgICAgICAgICAvLyBOb3QgcmVhbGx5IGFuIGVkaXQgaWYgbm90aGluZyBjaGFuZ2VkXG4gICAgICAgICAgICBpZiAoY3VycmVudEVkaXQubmV3VmFsdWUgPT0gY3VycmVudEVkaXQucHJldmlvdXNWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxlbWVudC5pbm5lclRleHQgPSBoZXhEYXRhW2ldO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVBc2NpaShlbGVtZW50LmlubmVyVGV4dCwgb2Zmc2V0KTtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImVkaXRlZFwiKTtcbiAgICAgICAgICAgIC8vIE1lYW5zIHRoZSBsYXN0IGNlbGwgb2YgdGhlIGRvY3VtZW50IHdhcyBmaWxsZWQgaW4gc28gd2UgYWRkIGFub3RoZXIgcGxhY2Vob2xkZXIgYWZ0ZXJ3YXJkc1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRFZGl0LnByZXZpb3VzVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIFNpbmNlIHdlIGRvbid0IHNlbmQgYWxsIHRoZSBlZGl0cyB1bnRpbCB0aGUgZW5kIHdlIG5lZWQgdG8gZXN0aW1hdGUgd2hhdCB0aGUgY3VycmVudCBmaWxlIHNpemUgaXMgZHVyaW5nIHRoaXMgb3BlcmF0aW9uIG9yIHRoZSBsYXN0IGNlbGxzIHdvbid0IGJlIGFkZGVkIGNvcnJlY3RseVxuICAgICAgICAgICAgICAgIHZpcnR1YWxIZXhEb2N1bWVudC51cGRhdGVEb2N1bWVudFNpemUodmlydHVhbEhleERvY3VtZW50LmRvY3VtZW50U2l6ZSArIDEpO1xuICAgICAgICAgICAgICAgIHZpcnR1YWxIZXhEb2N1bWVudC5jcmVhdGVBZGRDZWxsKCk7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQucHVzaChnZXRFbGVtZW50c1dpdGhHaXZlbk9mZnNldCh2aXJ0dWFsSGV4RG9jdW1lbnQuZG9jdW1lbnRTaXplKVswXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlZGl0cy5wdXNoKGN1cnJlbnRFZGl0KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLnNlbmRFZGl0VG9FeHRIb3N0KGVkaXRzKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ2FsbGVkIHdoZW4gdGhlIHVzZXIgZXhlY3V0ZXMgdGhlIHJldmVydCBjb21tYW5kIG9yIHdoZW4gdGhlIGRvY3VtZW50IGNoYW5nZXMgb24gZGlzayBhbmQgdGhlcmUgYXJlIG5vIHVuc2F2ZWQgZWRpdHNcbiAgICAgKi9cbiAgICBwdWJsaWMgcmV2ZXJ0KCk6IHZvaWQge1xuICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQucmVSZXF1ZXN0Q2h1bmtzKCk7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbmltcG9ydCB7IGdldEVsZW1lbnRzR2l2ZW5Nb3VzZUV2ZW50LCBnZXRFbGVtZW50c1dpdGhHaXZlbk9mZnNldCwgcmV0cmlldmVTZWxlY3RlZEJ5dGVPYmplY3QsIGdldEVsZW1lbnRzT2Zmc2V0IH0gZnJvbSBcIi4vdXRpbFwiO1xuaW1wb3J0IHsgcG9wdWxhdGVEYXRhSW5zcGVjdG9yIH0gZnJvbSBcIi4vZGF0YUluc3BlY3RvclwiO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBUb2dnbGVzIHRoZSBob3ZlciBvbiBhIGNlbGxcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgVGhlIGV2ZW50IHdoaWNoIGlzIGhhbmRlZCB0byBhIG1vdXNlIGV2ZW50IGxpc3RlbmVyIFxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlSG92ZXIoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBlbGVtZW50cyA9IGdldEVsZW1lbnRzR2l2ZW5Nb3VzZUV2ZW50KGV2ZW50KTtcbiAgICBpZiAoZWxlbWVudHMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cdGVsZW1lbnRzWzBdLmNsYXNzTGlzdC50b2dnbGUoXCJob3ZlclwiKTtcblx0ZWxlbWVudHNbMV0uY2xhc3NMaXN0LnRvZ2dsZShcImhvdmVyXCIpO1xufVxuXG4vLyBUaGlzIGlzIGJvdW5kIHRvIHRoZSBvbiBjaGFuZ2UgZXZlbnQgZm9yIHRoZSBzZWxlY3Qgd2hpY2ggZGVjaWRlcyB0byByZW5kZXIgYmlnIG9yIGxpdHRsZSBlbmRpYW5cbi8qKlxuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgd2hlbiB0aGUgdXNlciBjaGFuZ2VzIHRoZSBkcm9wZG93biBmb3Igd2hldGhlciB0aGV5IHdhbnQgbGl0dGxlIG9yIGJpZyBlbmRpYW5uZXNzIFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlRW5kaWFubmVzcygpOiB2b2lkIHtcblx0aWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcblx0XHQvLyBTaW5jZSB0aGUgaW5zcGVjdG9yIGhhcyBubyBzZW5zZSBvZiBzdGF0ZSwgaXQgZG9lc24ndCBrbm93IHdoYXQgYnl0ZSBpdCBpcyBjdXJyZW50bHkgcmVuZGVyaW5nXG5cdFx0Ly8gV2UgbXVzdCByZXRyaWV2ZSBpdCBiYXNlZCBvbiB0aGUgZG9tXG5cdFx0Y29uc3QgZWxlbWVudHMgPSBnZXRFbGVtZW50c1dpdGhHaXZlbk9mZnNldChnZXRFbGVtZW50c09mZnNldChkb2N1bWVudC5hY3RpdmVFbGVtZW50KSk7XG5cdFx0Y29uc3QgYnl0ZV9vYmogPSByZXRyaWV2ZVNlbGVjdGVkQnl0ZU9iamVjdChlbGVtZW50cyk7XG5cdFx0aWYgKCFieXRlX29iaikgcmV0dXJuO1xuXHRcdGNvbnN0IGxpdHRsZUVuZGlhbiA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVuZGlhbm5lc3NcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPT09IFwibGl0dGxlXCI7XG5cdFx0cG9wdWxhdGVEYXRhSW5zcGVjdG9yKGJ5dGVfb2JqLCBsaXR0bGVFbmRpYW4pO1xuXHR9XG59IiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbmltcG9ydCB7IFZpcnR1YWxEb2N1bWVudCB9IGZyb20gXCIuL3ZpcnR1YWxEb2N1bWVudFwiO1xuaW1wb3J0IHsgQ2h1bmtIYW5kbGVyIH0gZnJvbSBcIi4vY2h1bmtIYW5kbGVyXCI7XG5pbXBvcnQgeyBNZXNzYWdlSGFuZGxlciB9IGZyb20gXCIuL21lc3NhZ2VIYW5kbGVyXCI7XG5cbmRlY2xhcmUgY29uc3QgYWNxdWlyZVZzQ29kZUFwaTogYW55O1xuZXhwb3J0IGNvbnN0IHZzY29kZSA9IGFjcXVpcmVWc0NvZGVBcGkoKTtcbmV4cG9ydCBsZXQgdmlydHVhbEhleERvY3VtZW50OiBWaXJ0dWFsRG9jdW1lbnQ7XG4vLyBDb25zdHJ1Y3QgYSBjaHVuayBoYW5kbGVyIHdoaWNoIGhvbGRzIGNodW5rcyBvZiA1MCByb3dzICg1MCAqIDE2KVxuZXhwb3J0IGNvbnN0IGNodW5rSGFuZGxlcjogQ2h1bmtIYW5kbGVyID0gbmV3IENodW5rSGFuZGxlcig4MDApO1xuLy8gTWVzc2FnZSBoYW5kbGVyIHdoaWNoIHdpbGwgaGFuZGxlIHRoZSBtZXNzYWdlcyBiZXR3ZWVuIHRoZSBleHRob3N0IGFuZCB0aGUgd2VidmlldyAoV2UnbGwgYWxsb3cgYSBtYXggb2YgMTAgcGVuZGluZyByZXF1ZXN0cylcbmV4cG9ydCBjb25zdCBtZXNzYWdlSGFuZGxlcjogTWVzc2FnZUhhbmRsZXIgPSBuZXcgTWVzc2FnZUhhbmRsZXIoMTApO1xuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBGaXJlcyB3aGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgb3BlbkFueXdheSBsaW5rIG9uIGxhcmdlIGZpbGVzXG4gKi9cbmZ1bmN0aW9uIG9wZW5Bbnl3YXkoKTogdm9pZCB7XG5cdG1lc3NhZ2VIYW5kbGVyLnBvc3RNZXNzYWdlKFwib3Blbi1hbnl3YXlzXCIpO1xufVxuXG5cbi8vIFNlbGYgZXhlY3V0aW5nIGFub255bW91cyBmdW5jdGlvblxuLy8gVGhpcyBpcyB0aGUgbWFpbiBlbnRyeSBwb2ludFxuKCgpOiB2b2lkPT4ge1xuICAgIC8vIEhhbmRsZSBtZXNzYWdlcyBmcm9tIHRoZSBleHRlbnNpb25cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGFzeW5jIGUgPT4ge1xuXHRcdGNvbnN0IHsgdHlwZSwgYm9keSB9ID0gZS5kYXRhO1xuXHRcdHN3aXRjaCAodHlwZSkge1xuXHRcdFx0Y2FzZSBcImluaXRcIjpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vIExvYWRzIHRoZSBodG1sIGJvZHkgc2VudCBvdmVyXG5cdFx0XHRcdFx0aWYgKGJvZHkuaHRtbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF0uaW5uZXJIVE1MID0gYm9keS5odG1sO1xuXHRcdFx0XHRcdFx0dmlydHVhbEhleERvY3VtZW50ID0gbmV3IFZpcnR1YWxEb2N1bWVudChib2R5LmZpbGVTaXplKTtcblx0XHRcdFx0XHRcdC8vIFdlIGluaXRpYWxseSBsb2FkIDQgY2h1bmtzIGJlbG93IHRoZSB2aWV3cG9ydCAobm9ybWFsbHkgd2UgYnVmZmVyIDIgYWJvdmUgYXMgd2VsbCwgYnV0IHRoZXJlIGlzIG5vIGFib3ZlIGF0IHRoZSBzdGFydClcblx0XHRcdFx0XHRcdGNodW5rSGFuZGxlci5lbnN1cmVCdWZmZXIodmlydHVhbEhleERvY3VtZW50LnRvcE9mZnNldCgpLCB7XG5cdFx0XHRcdFx0XHRcdHRvcEJ1ZmZlclNpemU6IDAsXG5cdFx0XHRcdFx0XHRcdGJvdHRvbUJ1ZmZlclNpemU6IDVcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoYm9keS5maWxlU2l6ZSAhPSAwICYmIGJvZHkuaHRtbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF0uaW5uZXJIVE1MID0gXG5cdFx0XHRcdFx0XHRgXG5cdFx0XHRcdFx0XHRcdDxkaXY+XG5cdFx0XHRcdFx0XHRcdDxwPk9wZW5pbmcgdGhpcyBsYXJnZSBmaWxlIG1heSBjYXVzZSBpbnN0YWJpbGl0eS4gPGEgaWQ9XCJvcGVuLWFueXdheVwiIGhyZWY9XCIjXCI+T3BlbiBhbnl3YXlzPC9hPjwvcD5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgY29uc3RydWN0IHRoZSBlbGVtZW50IHJpZ2h0IGFib3ZlIHRoaXMgc28gaXQgaXMgZGVmaW5pdGVseSBuZXZlciBudWxsXG5cdFx0XHRcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW4tYW55d2F5XCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3BlbkFueXdheSk7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSBcInVwZGF0ZVwiOlxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYgKGJvZHkudHlwZSA9PT0gXCJ1bmRvXCIpIHtcblx0XHRcdFx0XHRcdHZpcnR1YWxIZXhEb2N1bWVudC51bmRvKGJvZHkuZWRpdHMsIGJvZHkuZmlsZVNpemUpO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYm9keS50eXBlID09PSBcInJlZG9cIikge1xuXHRcdFx0XHRcdFx0dmlydHVhbEhleERvY3VtZW50LnJlZG8oYm9keS5lZGl0cywgYm9keS5maWxlU2l6ZSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHZpcnR1YWxIZXhEb2N1bWVudC5yZXZlcnQoYm9keS5maWxlU2l6ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSBcInNhdmVcIjpcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGNvbnN0IGRpcnR5Q2VsbHMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlZGl0ZWRcIikpO1xuXHRcdFx0XHRcdGRpcnR5Q2VsbHMubWFwKGNlbGwgPT4gY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwiZWRpdGVkXCIpKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtZXNzYWdlSGFuZGxlci5pbmNvbWluZ01lc3NhZ2VIYW5kbGVyKGUuZGF0YSk7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHQvLyBTaWduYWwgdG8gVlMgQ29kZSB0aGF0IHRoZSB3ZWJ2aWV3IGlzIGluaXRpYWxpemVkLlxuXHRtZXNzYWdlSGFuZGxlci5wb3N0TWVzc2FnZShcInJlYWR5XCIpO1xufSkoKTsiLCIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuaW1wb3J0IHsgdnNjb2RlIH0gZnJvbSBcIi4vaGV4RWRpdFwiO1xuXG4vKipcbiAqIENsYXNzIHdoaWNoIGhhbmRsZXMgbWVzc2FnZXMgYmV0d2VlbiB0aGUgd2VidmlldyBhbmQgdGhlIGV4dGhvc3RcbiAqL1xuZXhwb3J0IGNsYXNzIE1lc3NhZ2VIYW5kbGVyIHtcbiAgICBwcml2YXRlIG1heFJlcXVlc3RzOiBudW1iZXI7XG4gICAgcHJpdmF0ZSByZXF1ZXN0c01hcDogTWFwPG51bWJlciwge3Jlc29sdmU6ICh2YWx1ZT86IGFueSkgPT4gdm9pZDsgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkfT47XG4gICAgcHJpdmF0ZSByZXF1ZXN0SWQ6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhIG5ldyBNZXNzYWdlSGFuZGxlclxuICAgICAqIEBwYXJhbSBtYXhpbXVtUmVxdWVzdHMgVGhlIG1heGltdW0gbnVtYmVyIG9mIHJlcXVlc3RzIFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1heGltdW1SZXF1ZXN0czogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMubWF4UmVxdWVzdHMgPSBtYXhpbXVtUmVxdWVzdHM7XG4gICAgICAgIHRoaXMucmVxdWVzdHNNYXAgPSBuZXcgTWFwPG51bWJlciwge3Jlc29sdmU6ICh2YWx1ZT86IGFueSkgPT4gdm9pZDsgcmVqZWN0OiAocmVhc29uPzogYW55KSA9PiB2b2lkfT4oKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0SWQgPSAwO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUG9zdHMgdG8gdGhlIGV4dGVuc2lvbiBob3N0IGEgbWVzc2FnZSBhbmQgcmV0dXJucyBhIHByb21pc2Ugd2hpY2ggaWYgc3VjY2Vzc2Z1bCB3aWxsIHJlc29sdmUgdG8gdGhlIHJlc3BvbnNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgQSBzdHJpbmcgZGVmaW5pbmcgdGhlIHR5cGUgb2YgbWVzc2FnZSBzbyBpdCBjYW4gYmUgY29ycmVjdGx5IGhhbmRsZWQgb24gYm90aCBlbmRzXG4gICAgICogQHBhcmFtIHthbnl9IGJvZHkgVGhlIHBheWxvYWRcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fSBBIHByb21pc2Ugd2hpY2ggcmVzb2x2ZXMgdG8gdGhlIHJlc3BvbnNlIG9yIHJlamVjdHMgaWYgdGhlIHJlcXVlc3QgdGltZXMgb3V0XG4gICAgICovXG4gICAgYXN5bmMgcG9zdE1lc3NhZ2VXaXRoUmVzcG9uc2UodHlwZTogc3RyaW5nLCBib2R5PzogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4gdGhpcy5yZXF1ZXN0c01hcC5zZXQodGhpcy5yZXF1ZXN0SWQsIHsgcmVzb2x2ZSwgcmVqZWN0IH0pKTtcbiAgICAgICAgLy8gV2UgcmVtb3ZlIHRoZSBvbGRlc3QgcmVxdWVzdCBpZiB0aGUgY3VycmVudCByZXF1ZXN0IHF1ZXVlIGlzIGZ1bGxcbiAgICAgICAgLy8gVGhpcyBkb2Vzbid0IHN0b3AgdGhlIHJlcXVlc3Qgb24gdGhlIEV4dCBob3N0IHNpZGUsIGJ1dCBpdCB3aWxsIGJlIGRyb3BwZWQgd2hlbiBpdCdzIHJlY2VpdmVkLCB3aGljaCBsZXNzZW5zIHRoZSBsb2FkIG9uIHRoZSB3ZWJ2aWV3XG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RzTWFwLnNpemUgPiB0aGlzLm1heFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBjb25zdCByZW1vdmVkOiBudW1iZXIgPSB0aGlzLnJlcXVlc3RzTWFwLmtleXMoKS5uZXh0KCkudmFsdWU7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RzTWFwLmdldChyZW1vdmVkKT8ucmVqZWN0KFwiUmVxdWVzdCBUaW1lZCBvdXRcIik7XG4gICAgICAgICAgICB0aGlzLnJlcXVlc3RzTWFwLmRlbGV0ZShyZW1vdmVkKTtcbiAgICAgICAgfVxuICAgICAgICB2c2NvZGUucG9zdE1lc3NhZ2UoeyByZXF1ZXN0SWQ6IHRoaXMucmVxdWVzdElkKyssIHR5cGUsIGJvZHkgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUG9zdCB0byB0aGUgZXh0ZW5zaW9uIGhvc3QgYXMgYSBtZXNzYWdlIGluIGEgZmlyZSBhbmQgZm9yZ2V0IG1hbm5lciwgbm90IGV4cGVjdGluZyBhIHJlc3BvbnNlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgQSBzdHJpbmcgZGVmaW5pbmcgdGhlIHR5cGUgb2YgbWVzc2FnZSBzbyBpdCBjYW4gYmUgY29ycmVjdGx5IGhhbmRsZWQgb24gYm90aCBlbmRzXG4gICAgICogQHBhcmFtIHthbnl9IGJvZHkgVGhlIHBheWxvYWRcbiAgICAgKi9cbiAgICBwb3N0TWVzc2FnZSh0eXBlOiBzdHJpbmcsIGJvZHk/OiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdnNjb2RlLnBvc3RNZXNzYWdlKHsgdHlwZSwgYm9keSB9KTtcbiAgICB9XG4gICAgXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEZvciBldmVyeSBpbmNvbWluZyBtZXNzYWdlIHRoYXQgaXNuJ3QgdGhlIGluaXRcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSByZWNlaXZlZFxuICAgICAqL1xuICAgIGluY29taW5nTWVzc2FnZUhhbmRsZXIobWVzc2FnZTogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLnJlcXVlc3RzTWFwLmdldChtZXNzYWdlLnJlcXVlc3RJZCk7XG4gICAgICAgIC8vIFdlIHNob3VsZCBuZXZlciBnZXQgYSByb2d1ZSByZXNwb25zZSBmcm9tIHRoZSB3ZWJ2aWV3IHVubGVzcyBpdCdzIGFuIGluaXQuXG4gICAgICAgIC8vIFNvIGlmIHRoZSBtZXNzYWdlIGlzbid0IGJlaW5nIHRyYWNrZWQgYnkgdGhlIG1lc3NhZ2UgaGFuZGxlciwgd2UgZHJvcCBpdFxuICAgICAgICBpZiAoIXJlcXVlc3QpIHJldHVybjtcbiAgICAgICAgcmVxdWVzdC5yZXNvbHZlKG1lc3NhZ2UuYm9keSk7XG4gICAgICAgIHRoaXMucmVxdWVzdHNNYXAuZGVsZXRlKG1lc3NhZ2UucmVxdWVzdElkKTtcbiAgICB9XG59IiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbmltcG9ydCB7IG1lc3NhZ2VIYW5kbGVyLCB2aXJ0dWFsSGV4RG9jdW1lbnQgfSBmcm9tIFwiLi9oZXhFZGl0XCI7XG5pbXBvcnQgeyBTZWxlY3RIYW5kbGVyIH0gZnJvbSBcIi4vc2VsZWN0SGFuZGxlclwiO1xuaW1wb3J0IHsgaGV4UXVlcnlUb0FycmF5IH0gZnJvbSBcIi4vdXRpbFwiO1xuXG5pbnRlcmZhY2UgU2VhcmNoT3B0aW9ucyB7XG4gICAgcmVnZXg6IGJvb2xlYW47XG4gICAgY2FzZVNlbnNpdGl2ZTogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIFNlYXJjaFJlc3VsdHMge1xuICAgIHJlc3VsdDogbnVtYmVyW11bXTtcbiAgICBwYXJ0aWFsOiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgU2VhcmNoSGFuZGxlciB7XG4gICAgcHJpdmF0ZSBzZWFyY2hSZXN1bHRzOiBudW1iZXJbXVtdO1xuICAgIHByaXZhdGUgc2VhcmNoVHlwZTogXCJoZXhcIiB8IFwiYXNjaWlcIiA9IFwiaGV4XCI7XG4gICAgcHJpdmF0ZSBzZWFyY2hPcHRpb25zOiBTZWFyY2hPcHRpb25zO1xuICAgIHByaXZhdGUgcmVzdWx0SW5kZXggPSAwO1xuICAgIHByaXZhdGUgZmluZFRleHRCb3g6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSByZXBsYWNlVGV4dEJveDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcml2YXRlIHJlcGxhY2VCdXR0b246IEhUTUxTcGFuRWxlbWVudDtcbiAgICBwcml2YXRlIHJlcGxhY2VBbGxCdXR0b246IEhUTUxTcGFuRWxlbWVudDtcbiAgICBwcml2YXRlIHByZXNlcnZlQ2FzZSA9IGZhbHNlO1xuICAgIHByaXZhdGUgZmluZFByZXZpb3VzQnV0dG9uOiBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBmaW5kTmV4dEJ1dHRvbjogSFRNTFNwYW5FbGVtZW50O1xuICAgIHByaXZhdGUgc3RvcFNlYXJjaEJ1dHRvbjogSFRNTFNwYW5FbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IFtdO1xuICAgICAgICB0aGlzLnNlYXJjaE9wdGlvbnMgPSB7XG4gICAgICAgICAgICByZWdleDogZmFsc2UsXG4gICAgICAgICAgICBjYXNlU2Vuc2l0aXZlOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpbmRUZXh0Qm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaW5kXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgICAgIHRoaXMucmVwbGFjZVRleHRCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlcGxhY2VcIikgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICAgICAgdGhpcy5yZXBsYWNlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXBsYWNlLWJ0blwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIHRoaXMucmVwbGFjZUFsbEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVwbGFjZS1hbGxcIikgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICB0aGlzLmZpbmRQcmV2aW91c0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmluZC1wcmV2aW91c1wiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZmluZE5leHRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbmQtbmV4dFwiKSBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc3RvcFNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLXN0b3BcIikgYXMgSFRNTFNwYW5FbGVtZW50O1xuICAgICAgICB0aGlzLmZpbmROZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLmZpbmROZXh0KHRydWUpKTtcbiAgICAgICAgdGhpcy5maW5kUHJldmlvdXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHRoaXMuZmluZFByZXZpb3VzKHRydWUpKTtcbiAgICAgICAgdGhpcy51cGRhdGVJbnB1dEdseXBocygpO1xuICAgICAgICAvLyBXaGVuZXZlciB0aGUgdXNlciBjaGFuZ2VzIHRoZSBkYXRhIHR5cGUgd2UgdXBkYXRlIHRoZSB0eXBlIHdlJ3JlIHNlYXJjaGluZyBmb3IgYW5kIHRoZSBnbHlwaHMgb24gdGhlIGlucHV0IGJveFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRhdGEtdHlwZVwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudCkudmFsdWUgYXMgXCJoZXhcIiB8IFwiYXNjaWlcIjtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoVHlwZSA9IHNlbGVjdGVkVmFsdWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUlucHV0R2x5cGhzKCk7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlYXJjaE9wdGlvbnNIYW5kbGVyKCk7XG4gICAgICAgIHRoaXMucmVwbGFjZU9wdGlvbnNIYW5kbGVyKCk7XG5cbiAgICAgICAgLy8gV2hlbiB0aGUgdXNlciBwcmVzc2VzIGEga2V5IHRyaWdnZXIgYSBzZWFyY2hcbiAgICAgICAgdGhpcy5maW5kVGV4dEJveC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBTb21lIFZTIENvZGUga2V5YmluZGluZyBkZWZ1YWx0cyBmb3IgZmluZCBuZXh0LCBmaW5kIHByZXZpb3VzLCBhbmQgZm9jdXMgcmVzdG9yZVxuICAgICAgICAgICAgaWYgKChldmVudC5rZXkgPT09IFwiRW50ZXJcIiB8fCBldmVudC5rZXkgPT09IFwiRjNcIikgJiYgZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmRQcmV2aW91cyhmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJFbnRlclwiIHx8IGV2ZW50LmtleSA9PT0gXCJGM1wiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maW5kTmV4dChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleSA9PT0gXCJFc2NhcGVcIikge1xuICAgICAgICAgICAgICAgIC8vIFByZXNzaW5nIGVzY2FwZSByZXR1cm5zIGZvY3VzIHRvIHRoZSBlZGl0b3JcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYHNlbGVjdGVkICR7dGhpcy5zZWFyY2hUeXBlfWApWzBdIGFzIEhUTUxTcGFuRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZpcnR1YWxIZXhEb2N1bWVudC5mb2N1c0VsZW1lbnRXaXRoR2l2ZW5PZmZzZXQodmlydHVhbEhleERvY3VtZW50LnRvcE9mZnNldCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmN0cmxLZXkgfHwgbmV3IFJlZ0V4cChcIiheQXJyb3d8XkVuZHxeSG9tZSlcIiwgXCJpXCIpLnRlc3QoZXZlbnQua2V5KSkge1xuICAgICAgICAgICAgICAgIC8vIElmIGl0J3MgYW55IHNvcnQgb2YgbmF2aWdhdGlvbiBrZXkgd2UgZG9uJ3Qgd2FudCB0byB0cmlnZ2VyIGFub3RoZXIgc2VhcmNoIGFzIG5vdGhpbmcgaGFzIGNoYW5nZWRcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gRmluIHByZXZpb3VzICsgZmluZCBuZXh0IHdoZW4gd2lkZ2V0IGlzbid0IGZvY3VzZWRcbiAgICAgICAgICAgIGlmIChldmVudC5rZXkgPT09IFwiRjNcIiAmJiBldmVudC5zaGlmdEtleSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0aGlzLmZpbmRUZXh0Qm94KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maW5kUHJldmlvdXModHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQua2V5ID09PSBcIkYzXCIgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGhpcy5maW5kVGV4dEJveCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmluZE5leHQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yZXBsYWNlVGV4dEJveC5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgdGhpcy51cGRhdGVSZXBsYWNlQnV0dG9ucy5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZXBsYWNlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLnJlcGxhY2UoZmFsc2UpKTtcbiAgICAgICAgdGhpcy5yZXBsYWNlQWxsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB0aGlzLnJlcGxhY2UodHJ1ZSkpO1xuICAgICAgICB0aGlzLnN0b3BTZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2FuY2VsU2VhcmNoLmJpbmQodGhpcykpO1xuICAgICAgICAvLyBIaWRlIHRoZSBtZXNzYWdlIGJveGVzIGZvciBub3cgYXMgYXQgZmlyc3Qgd2UgaGF2ZSBubyBtZXNzYWdlcyB0byBkaXNwbGF5XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmluZC1tZXNzYWdlLWJveFwiKSEuaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXBsYWNlLW1lc3NhZ2UtYm94XCIpIS5oaWRkZW4gPSB0cnVlO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFNlbmRzIGEgc2VhcmNoIHJlcXVlc3QgdG8gdGhlIGV4dGhvc3RcbiAgICAgKi9cbiAgICBwcml2YXRlIGFzeW5jIHNlYXJjaCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gSWYgdGhlIGJveCBpcyBlbXB0eSBubyBuZWVkIHRvIGRpc3BsYXkgYW55IHdhcm5pbmdzXG4gICAgICAgIGlmICh0aGlzLmZpbmRUZXh0Qm94LnZhbHVlID09PSBcIlwiKSB0aGlzLnJlbW92ZUlucHV0TWVzc2FnZShcImZpbmRcIik7XG4gICAgICAgIC8vIFRoaXMgZ2V0cyBjYWxsZWQgdG8gY2FuY2VsIGFueSBzZWFyY2hlcyB0aGF0IG1pZ2h0IGJlIGdvaW5nIG9uIG5vd1xuICAgICAgICB0aGlzLmNhbmNlbFNlYXJjaCgpO1xuICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQuc2V0U2VsZWN0aW9uKFtdKTtcbiAgICAgICAgdGhpcy5zZWFyY2hSZXN1bHRzID0gW107XG4gICAgICAgIHRoaXMudXBkYXRlUmVwbGFjZUJ1dHRvbnMoKTtcbiAgICAgICAgdGhpcy5maW5kTmV4dEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIHRoaXMuZmluZFByZXZpb3VzQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgbGV0IHF1ZXJ5OiBzdHJpbmcgfCBzdHJpbmdbXSA9IHRoaXMuZmluZFRleHRCb3gudmFsdWU7XG4gICAgICAgIGNvbnN0IGhleFNlYXJjaFJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5bYS1mQS1GMC05PyBdKyRcIik7XG4gICAgICAgIC8vIFdlIGNoZWNrIHRvIHNlZSBpZiB0aGUgaGV4IGlzIGEgdmFsaWQgcXVlcnkgZWxzZSB3ZSBkb24ndCBhbGxvdyBhIHNlYXJjaFxuICAgICAgICBpZiAodGhpcy5zZWFyY2hUeXBlID09PSBcImhleFwiICYmICFoZXhTZWFyY2hSZWdleC50ZXN0KHF1ZXJ5KSkge1xuICAgICAgICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA+IDApIHRoaXMuYWRkSW5wdXRNZXNzYWdlKFwiZmluZFwiLCBcIkludmFsaWQgcXVlcnlcIiwgXCJlcnJvclwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBUZXN0IGlmIGl0J3MgYSB2YWxpZCByZWdleFxuICAgICAgICBpZiAodGhpcy5zZWFyY2hPcHRpb25zLnJlZ2V4KSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIG5ldyBSZWdFeHAocXVlcnkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gU3BsaXQgdXAgdGhlIGVycm9yIG1lc3NhZ2UgdG8gZml0IGluIHRoZSBib3guIEluIHRoZSBmdXR1cmUgd2UgbWlnaHQgd2FudCB0aGUgYm94IHRvIGRvIHdvcmQgd3JhcHBpbmdcbiAgICAgICAgICAgICAgICAvLyBTbyB0aGF0IGl0J3Mgbm90IGEgbWFudWFsIGVuZGVhdm9yXG4gICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IChlcnIubWVzc2FnZSBhcyBzdHJpbmcpLnN1YnN0cigwLCAyNykgKyBcIlxcblwiICsgKGVyci5tZXNzYWdlIGFzIHN0cmluZykuc3Vic3RyKDI3KTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZElucHV0TWVzc2FnZShcImZpbmRcIiwgbWVzc2FnZSwgXCJlcnJvclwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVlcnkgPSB0aGlzLnNlYXJjaFR5cGUgPT09IFwiaGV4XCIgPyBoZXhRdWVyeVRvQXJyYXkocXVlcnkpIDogcXVlcnk7XG4gICAgICAgIGlmIChxdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSB1c2VyIGRpZG4ndCB0eXBlIGFueXRoaW5nIGFuZCBpdHMganVzdCBhIGJsYW5rIHF1ZXJ5IHdlIGRvbid0IHdhbnQgdG8gZXJyb3Igb24gdGhlbVxuICAgICAgICAgICAgaWYgKHRoaXMuZmluZFRleHRCb3gudmFsdWUubGVuZ3RoID4gMCkgdGhpcy5hZGRJbnB1dE1lc3NhZ2UoXCJmaW5kXCIsIFwiSW52YWxpZCBxdWVyeVwiLCBcImVycm9yXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RvcFNlYXJjaEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIGxldCByZXN1bHRzOiBTZWFyY2hSZXN1bHRzO1xuICAgICAgICB0aGlzLnJlbW92ZUlucHV0TWVzc2FnZShcImZpbmRcIik7XG4gICAgICAgIC8vIFRoaXMgaXMgd3JhcHBlZCBpbiBhIHRyeSBjYXRjaCBiZWNhdXNlIGlmIHRoZSBtZXNzYWdlIGhhbmRsZXIgZ2V0cyBiYWNrZWQgdXAgdGhpcyB3aWxsIHJlamVjdFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0cyA9IChhd2FpdCBtZXNzYWdlSGFuZGxlci5wb3N0TWVzc2FnZVdpdGhSZXNwb25zZShcInNlYXJjaFwiLCB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuc2VhcmNoVHlwZSxcbiAgICAgICAgICAgICAgICBvcHRpb25zOiB0aGlzLnNlYXJjaE9wdGlvbnNcbiAgICAgICAgICAgIH0pIGFzIHsgcmVzdWx0czogU2VhcmNoUmVzdWx0c30pLnJlc3VsdHM7XG4gICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BTZWFyY2hCdXR0b24uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5hZGRJbnB1dE1lc3NhZ2UoXCJmaW5kXCIsIFwiU2VhcmNoIHJldHVybmVkIGFuIGVycm9yIVwiLCBcImVycm9yXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXN1bHRzLnBhcnRpYWwpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkSW5wdXRNZXNzYWdlKFwiZmluZFwiLCBcIlBhcnRpYWwgcmVzdWx0cyByZXR1cm5lZCwgdHJ5XFxuIG5hcnJvd2luZyB5b3VyIHF1ZXJ5LlwiLCBcIndhcm5pbmdcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9wU2VhcmNoQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgdGhpcy5yZXN1bHRJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuc2VhcmNoUmVzdWx0cyA9IHJlc3VsdHMucmVzdWx0O1xuICAgICAgICAvLyBJZiB3ZSBnb3QgcmVzdWx0cyB0aGVuIHdlIHNlbGVjdCB0aGUgZmlyc3QgcmVzdWx0IGFuZCB1bmxvY2sgdGhlIGJ1dHRvbnNcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoUmVzdWx0cy5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICAgIGF3YWl0IHZpcnR1YWxIZXhEb2N1bWVudC5zY3JvbGxEb2N1bWVudFRvT2Zmc2V0KHRoaXMuc2VhcmNoUmVzdWx0c1t0aGlzLnJlc3VsdEluZGV4XVswXSk7XG4gICAgICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQuc2V0U2VsZWN0aW9uKHRoaXMuc2VhcmNoUmVzdWx0c1t0aGlzLnJlc3VsdEluZGV4XSk7XG4gICAgICAgICAgICAvLyBJZiB0aGVyZSdzIG1vcmUgdGhhbiBvbmUgc2VhcmNoIHJlc3VsdCB3ZSB1bmxvY2sgdGhlIGZpbmQgbmV4dCBidXR0b25cbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3VsdEluZGV4ICsgMSA8IHRoaXMuc2VhcmNoUmVzdWx0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbmROZXh0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlUmVwbGFjZUJ1dHRvbnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHdoZW4gdGhlIHVzZXIgY2xpY2tzIHRoZSBmaW5kIG5leHQgaWNvblxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9jdXMgV2hldGhlciBvciBub3QgdG8gZm9jdXMgdGhlIHNlbGVjdGlvblxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgZmluZE5leHQoZm9jdXM6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gSWYgdGhlIGJ1dHRvbiBpcyBkaXNhYmxlZCB0aGVuIHRoaXMgZnVuY3Rpb24gc2hvdWxkbid0IHdvcmtcbiAgICAgICAgaWYgKHRoaXMuZmluZE5leHRCdXR0b24uY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGlzYWJsZWRcIikpIHJldHVybjtcbiAgICAgICAgYXdhaXQgdmlydHVhbEhleERvY3VtZW50LnNjcm9sbERvY3VtZW50VG9PZmZzZXQodGhpcy5zZWFyY2hSZXN1bHRzWysrdGhpcy5yZXN1bHRJbmRleF1bMF0pO1xuICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQuc2V0U2VsZWN0aW9uKHRoaXMuc2VhcmNoUmVzdWx0c1t0aGlzLnJlc3VsdEluZGV4XSk7XG4gICAgICAgIGlmIChmb2N1cykgU2VsZWN0SGFuZGxlci5mb2N1c1NlbGVjdGlvbih0aGlzLnNlYXJjaFR5cGUpO1xuICAgICAgICAvLyBJZiB0aGVyZSdzIG1vcmUgdGhhbiBvbmUgc2VhcmNoIHJlc3VsdCB3ZSB1bmxvY2sgdGhlIGZpbmQgbmV4dCBidXR0b25cbiAgICAgICAgaWYgKHRoaXMucmVzdWx0SW5kZXggPCB0aGlzLnNlYXJjaFJlc3VsdHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5maW5kTmV4dEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpbmROZXh0QnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXZSBhbHNvIHVubG9jayB0aGUgZmluZCBwcmV2aW91cyBidXR0b24gaWYgdGhlcmUgaXMgYSBwcmV2aW91c1xuICAgICAgICBpZiAodGhpcy5yZXN1bHRJbmRleCAhPSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZpbmRQcmV2aW91c0J1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB3aGVuIHRoZSB1c2VyIGNsaWNrcyB0aGUgZmluZCBwcmV2aW91cyBpY29uXG4gICAgICogQHBhcmFtIHtib29sZWFufSBmb2N1cyBXaGV0aGVyIG9yIG5vdCB0byBmb2N1cyB0aGUgc2VsZWN0aW9uXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBmaW5kUHJldmlvdXMoZm9jdXM6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gSWYgdGhlIGJ1dHRvbiBpcyBkaXNhYmxlZCB0aGVuIHRoaXMgZnVuY3Rpb24gc2hvdWxkbid0IHdvcmtcbiAgICAgICAgaWYgKHRoaXMuZmluZFByZXZpb3VzQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImRpc2FibGVkXCIpKSByZXR1cm47XG4gICAgICAgIGF3YWl0IHZpcnR1YWxIZXhEb2N1bWVudC5zY3JvbGxEb2N1bWVudFRvT2Zmc2V0KHRoaXMuc2VhcmNoUmVzdWx0c1stLXRoaXMucmVzdWx0SW5kZXhdWzBdKTtcbiAgICAgICAgdmlydHVhbEhleERvY3VtZW50LnNldFNlbGVjdGlvbih0aGlzLnNlYXJjaFJlc3VsdHNbdGhpcy5yZXN1bHRJbmRleF0pO1xuICAgICAgICBpZiAoZm9jdXMpIFNlbGVjdEhhbmRsZXIuZm9jdXNTZWxlY3Rpb24odGhpcy5zZWFyY2hUeXBlKTtcbiAgICAgICAgLy8gSWYgdGhleSBwcmVzc2VkIHByZXZpb3VzLCB0aGV5IGNhbiBhbHdheXMgZ28gbmV4dCB0aGVyZWZvcmUgd2UgYWx3YXlzIHVubG9jayB0aGUgbmV4dCBidXR0b25cbiAgICAgICAgdGhpcy5maW5kTmV4dEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIC8vIFdlIGxvY2sgdGhlIGZpbmQgcHJldmlvdXMgaWYgdGhlcmUgaXNuJ3QgYSBwcmV2aW91cyBhbnltb3JlXG4gICAgICAgIGlmICh0aGlzLnJlc3VsdEluZGV4ID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZmluZFByZXZpb3VzQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHdoZW4gdGhlIHVzZXIgdG9nZ2VscyBiZXR3ZWVuIHRleHQgYW5kIGhleCBzaG93aW5nIHRoZSBpbnB1dCBnbHlwaHMgYW5kIGVuc3VyZWluZyBjb3JyZWN0IHBhZGRpbmdcbiAgICAgKi9cbiAgICBwcml2YXRlIHVwZGF0ZUlucHV0R2x5cGhzKCk6IHZvaWQge1xuICAgICAgICAvLyBUaGUgZ2x5cGggaWNvbnMgdGhhdCBzaXQgaW4gdGhlIGZpbmQgYW5kIHJlcGxhY2UgYmFyXG4gICAgICAgIGNvbnN0IGlucHV0R2x5cGhzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImJhci1nbHlwaHNcIikgYXMgSFRNTENvbGxlY3Rpb25PZjxIVE1MU3BhbkVsZW1lbnQ+O1xuICAgICAgICBjb25zdCBpbnB1dEZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmFyID4gLmlucHV0LWdseXBoLWdyb3VwID4gaW5wdXRcIikgYXMgTm9kZUxpc3RPZjxIVE1MSW5wdXRFbGVtZW50PjtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVHlwZSA9PSBcImhleFwiKSB7XG4gICAgICAgICAgICBpbnB1dEdseXBoc1swXS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICAgICAgaW5wdXRHbHlwaHNbMV0uaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0taW5wdXQtZ2x5cGgtcGFkZGluZ1wiLCBcIjBweFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXRHbHlwaHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpbnB1dEdseXBoc1tpXS5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGdseXBoUmVjdCA9IGlucHV0R2x5cGhzWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgY29uc3QgaW5wdXRSZWN0ID0gaW5wdXRGaWVsZHNbMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGVzIGhvdyBtdWNoIHBhZGRpbmcgd2Ugc2hvdWxkIGhhdmUgc28gdGhhdCB0aGUgdGV4dCBkb2Vzbid0IHJ1biBpbnRvIHRoZSBnbHlwaHNcbiAgICAgICAgICAgIGNvbnN0IGlucHV0UGFkZGluZyA9IChpbnB1dFJlY3QueCArIGlucHV0UmVjdC53aWR0aCArIDEpIC0gZ2x5cGhSZWN0Lng7XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoXCItLWlucHV0LWdseXBoLXBhZGRpbmdcIiwgYCR7aW5wdXRQYWRkaW5nfXB4YCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyBsaXN0ZW5pbmcgdG8gdGhlIHNlYXJjaCBvcHRpb25zIGFuZCB1cGRhdGluZyB0aGVtXG4gICAgICovXG4gICAgcHJpdmF0ZSBzZWFyY2hPcHRpb25zSGFuZGxlcigpOiB2b2lkIHtcbiAgICAgICAgLy8gVG9nZ2xlIFJlZ2V4XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVnZXgtaWNvblwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVnZXhJY29uID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgIGlmIChyZWdleEljb24uY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9nZ2xlZFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VhcmNoT3B0aW9ucy5yZWdleCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJlZ2V4SWNvbi5jbGFzc0xpc3QucmVtb3ZlKFwidG9nZ2xlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hPcHRpb25zLnJlZ2V4ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZWdleEljb24uY2xhc3NMaXN0LmFkZChcInRvZ2dsZWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGUgdXNlciBpcyBjaGFuZ2luZyBhbiBvcHRpb24gc28gd2Ugc2hvdWxkIHRyaWdnZXIgYW5vdGhlciBzZWFyY2hcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoKCk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBUb2dnbGUgY2FzZSBzZW5zaXRpdmVcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXNlLXNlbnNpdGl2ZVwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2FzZVNlbnNpdGl2ZSA9IGV2ZW50LnRhcmdldCBhcyBIVE1MU3BhbkVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoY2FzZVNlbnNpdGl2ZS5jbGFzc0xpc3QuY29udGFpbnMoXCJ0b2dnbGVkXCIpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWFyY2hPcHRpb25zLmNhc2VTZW5zaXRpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjYXNlU2Vuc2l0aXZlLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2dnbGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlYXJjaE9wdGlvbnMuY2FzZVNlbnNpdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgY2FzZVNlbnNpdGl2ZS5jbGFzc0xpc3QuYWRkKFwidG9nZ2xlZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRoZSB1c2VyIGlzIGNoYW5naW5nIGFuIG9wdGlvbiBzbyB3ZSBzaG91bGQgdHJpZ2dlciBhbm90aGVyIHNlYXJjaFxuICAgICAgICAgICAgdGhpcy5zZWFyY2goKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSByZXBsYWNlT3B0aW9uc0hhbmRsZXIoKTogdm9pZCB7XG4gICAgICAgIC8vIFRvZ2dsZSBwcmVzZXJ2ZSBjYXNlXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJlc2VydmUtY2FzZVwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJlc2VydmVDYXNlID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxTcGFuRWxlbWVudDtcbiAgICAgICAgICAgIGlmIChwcmVzZXJ2ZUNhc2UuY2xhc3NMaXN0LmNvbnRhaW5zKFwidG9nZ2xlZFwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucHJlc2VydmVDYXNlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcHJlc2VydmVDYXNlLmNsYXNzTGlzdC5yZW1vdmUoXCJ0b2dnbGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByZXNlcnZlQ2FzZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgcHJlc2VydmVDYXNlLmNsYXNzTGlzdC5hZGQoXCJ0b2dnbGVkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB3aGVuIHRoZSB1c2VyIGhpdHMgdGhlIHN0b3Agc2VhcmNoIGJ1dHRvblxuICAgICAqL1xuICAgIHByaXZhdGUgY2FuY2VsU2VhcmNoKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdG9wU2VhcmNoQnV0dG9uLmNsYXNzTGlzdC5jb250YWlucyhcImRpc2FibGVkXCIpKSByZXR1cm47XG4gICAgICAgIC8vIFdlIGRvbid0IHdhbnQgdGhlIHVzZXIgdG8ga2VlcCBleGVjdXRpbmcgdGhpcywgc28gd2UgZGlzYWJsZSB0aGUgYnV0dG9uIGFmdGVyIHRoZSBmaXJzdCBzZWFyY2hcbiAgICAgICAgdGhpcy5zdG9wU2VhcmNoQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgLy8gV2Ugc2VuZCBhIGNhbmNlbGxhdGlvbiBtZXNzYWdlIHRvIHRoZSBleHRob3N0LCB0aGVyZSdzIG5vIG5lZWQgdG8gIHdhaXQgZm9yIGEgcmVzcG9uc2VcbiAgICAgICAgLy8gQXMgd2UncmUgbm90IGV4cGVjdGluZyBhbnl0aGluZyBiYWNrIGp1c3QgdG8gc3RvcCBwcm9jZXNzaW5nIHRoZSBzZWFyY2hcbiAgICAgICAgbWVzc2FnZUhhbmRsZXIucG9zdE1lc3NhZ2VXaXRoUmVzcG9uc2UoXCJzZWFyY2hcIiwgeyBjYW5jZWw6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhlbHBlciBmdW5jdGlvbiB3aGljaCBoYW5kbGVzIGxvY2tpbmcgLyB1bmxvY2tpbmcgdGhlIHJlcGxhY2UgYnV0dG9uc1xuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlUmVwbGFjZUJ1dHRvbnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVtb3ZlSW5wdXRNZXNzYWdlKFwicmVwbGFjZVwiKTtcbiAgICAgICAgY29uc3QgaGV4UmVwbGFjZVJlZ2V4ID0gbmV3IFJlZ0V4cChcIl5bYS1mQS1GMC05XSskXCIpO1xuICAgICAgICAvLyBJZiBpdCdzIG5vdCBhIHZhbGlkIGhleCBxdWVyeSB3ZSBsb2NrIHRoZSBidXR0b25zLCB3ZSByZW1vdmUgd2hpdGVzcGFjZSBmcm9tIHRoZSBzdHJpbmcgdG8gc2ltcGxpZnkgdGhlIHJlZ2V4XG4gICAgICAgIGNvbnN0IHF1ZXJ5Tm9TcGFjZXMgPSB0aGlzLnJlcGxhY2VUZXh0Qm94LnZhbHVlLnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVHlwZSA9PT0gXCJoZXhcIiAmJiAhaGV4UmVwbGFjZVJlZ2V4LnRlc3QocXVlcnlOb1NwYWNlcykpIHtcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZUFsbEJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VCdXR0b24uY2xhc3NMaXN0LmFkZChcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgaWYgKHRoaXMucmVwbGFjZVRleHRCb3gudmFsdWUubGVuZ3RoID4gMCkgdGhpcy5hZGRJbnB1dE1lc3NhZ2UoXCJyZXBsYWNlXCIsIFwiSW52YWxpZCByZXBsYWNlbWVudFwiLCBcImVycm9yXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlcGxhY2VRdWVyeSA9IHRoaXMucmVwbGFjZVRleHRCb3gudmFsdWU7XG4gICAgICAgIGNvbnN0IHJlcGxhY2VBcnJheSA9IHRoaXMuc2VhcmNoVHlwZSA9PT0gXCJoZXhcIiA/IGhleFF1ZXJ5VG9BcnJheShyZXBsYWNlUXVlcnkpIDogQXJyYXkuZnJvbShyZXBsYWNlUXVlcnkpO1xuICAgICAgICBpZiAodGhpcy5zZWFyY2hSZXN1bHRzLmxlbmd0aCAhPT0gMCAmJiByZXBsYWNlQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnJlcGxhY2VBbGxCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5yZXBsYWNlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlcGxhY2VUZXh0Qm94LnZhbHVlLmxlbmd0aCA+IDAgJiYgcmVwbGFjZUFycmF5Lmxlbmd0aCA9PT0gMCkgdGhpcy5hZGRJbnB1dE1lc3NhZ2UoXCJyZXBsYWNlXCIsIFwiSW52YWxpZCByZXBsYWNlbWVudFwiLCBcImVycm9yXCIpO1xuICAgICAgICAgICAgdGhpcy5yZXBsYWNlQWxsQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB3aGVuIHRoZSB1c2VyIGNsaWNrcyByZXBsYWNlIG9yIHJlcGxhY2UgYWxsXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhbGwgd2hldGhlciB0aGlzIGlzIGEgbm9ybWFsIHJlcGxhY2Ugb3IgYSByZXBsYWNlIGFsbFxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgcmVwbGFjZShhbGw6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgcmVwbGFjZVF1ZXJ5ID0gdGhpcy5yZXBsYWNlVGV4dEJveC52YWx1ZTtcbiAgICAgICAgY29uc3QgcmVwbGFjZUFycmF5ID0gdGhpcy5zZWFyY2hUeXBlID09PSBcImhleFwiID8gaGV4UXVlcnlUb0FycmF5KHJlcGxhY2VRdWVyeSkgOiBBcnJheS5mcm9tKHJlcGxhY2VRdWVyeSk7XG4gICAgICAgIGxldCByZXBsYWNlQml0czogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgLy8gU2luY2UgdGhlIGV4dGhvc3Qgb25seSBob2xkcyBkYXRhIGluIDggYml0IHVuc2lnbmVkIGludHMgd2UgbXVzdCBjb252ZXJ0IGl0IGJhY2tcbiAgICAgICAgaWYgKHRoaXMuc2VhcmNoVHlwZSA9PT0gXCJoZXhcIikge1xuICAgICAgICAgICAgcmVwbGFjZUJpdHMgPSByZXBsYWNlQXJyYXkubWFwKHZhbCA9PiBwYXJzZUludCh2YWwsIDE2KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXBsYWNlQml0cyA9IHJlcGxhY2VBcnJheS5tYXAodmFsID0+IHZhbC5jaGFyQ29kZUF0KDApKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBvZmZzZXRzOiBudW1iZXJbXVtdID0gW107XG4gICAgICAgIGlmIChhbGwpIHtcbiAgICAgICAgICAgIG9mZnNldHMgPSB0aGlzLnNlYXJjaFJlc3VsdHM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvZmZzZXRzID0gW3RoaXMuc2VhcmNoUmVzdWx0c1t0aGlzLnJlc3VsdEluZGV4XV07XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlZGl0cyA9IChhd2FpdCBtZXNzYWdlSGFuZGxlci5wb3N0TWVzc2FnZVdpdGhSZXNwb25zZShcInJlcGxhY2VcIiwge1xuICAgICAgICAgICAgcXVlcnk6IHJlcGxhY2VCaXRzLFxuICAgICAgICAgICAgb2Zmc2V0czogb2Zmc2V0cyxcbiAgICAgICAgICAgIHByZXNlcnZlQ2FzZTogdGhpcy5wcmVzZXJ2ZUNhc2VcbiAgICAgICAgfSkpLmVkaXRzO1xuICAgICAgICAvLyBXZSBjYW4gcGFzcyB0aGUgc2l6ZSBvZiB0aGUgZG9jdW1lbnQgYmFjayBpbiBiZWNhdXNlIHdpdGggdGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb25cbiAgICAgICAgLy8gVGhlIHNpemUgb2YgdGhlIGRvY3VtZW50IHdpbGwgbmV2ZXIgY2hhbmdlIGFzIHdlIG9ubHkgcmVwbGFjZSBwcmVleGlzdGluZyBjZWxsc1xuICAgICAgICB2aXJ0dWFsSGV4RG9jdW1lbnQucmVkbyhlZGl0cywgdmlydHVhbEhleERvY3VtZW50LmRvY3VtZW50U2l6ZSk7XG4gICAgICAgIHRoaXMuZmluZE5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEZ1bmN0aW9uIHJlc3BvbnNpYmxlIGZvciBoYW5kbGluZyB3aGVuIHRoZSB1c2VyIHByZXNzZXMgY21kIC8gY3RybCArIGYgdXBkYXRpbmcgdGhlIHdpZGdldCBhbmQgZm9jdXNpbmcgaXRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VhcmNoS2V5YmluZGluZ0hhbmRsZXIoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VhcmNoVHlwZSA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ/LmNsYXNzTGlzdC5jb250YWlucyhcImFzY2lpXCIpID8gXCJhc2NpaVwiIDogXCJoZXhcIjtcbiAgICAgICAgY29uc3QgZGF0YVR5cGVTZWxlY3QgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkYXRhLXR5cGVcIikgYXMgSFRNTFNlbGVjdEVsZW1lbnQpO1xuICAgICAgICBkYXRhVHlwZVNlbGVjdC52YWx1ZSA9IHRoaXMuc2VhcmNoVHlwZTtcbiAgICAgICAgZGF0YVR5cGVTZWxlY3QuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJjaGFuZ2VcIikpO1xuICAgICAgICB0aGlzLmZpbmRUZXh0Qm94LmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEFkZHMgYW4gd2FybmluZyAvIGVycm9yIG1lc3NhZ2UgdG8gdGhlIGlucHV0IGJveCBwYXNzZWQgaW5cbiAgICAgKiBAcGFyYW0ge1wiZmluZFwiIHwgXCJyZXBsYWNlXCJ9IGlucHV0Qm94TmFtZSBXaGV0aGVyIGl0J3MgdGhlIGZpbmQgaW5wdXQgYm94IG9yIHRoZSByZXBsYWNlIGlucHV0IGJveFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBtZXNzYWdlIHRvIGRpc3BsYXlcbiAgICAgKiBAcGFyYW0ge1wiZXJyb3JcIiB8IFwid2FybmluZ1wifSB0eXBlIFdoZXRoZXIgaXQncyBhbiBlcnJvciBtZXNzYWdlIG9yIGEgd2FybmluZyBtZXNzYWdlXG4gICAgICovXG4gICAgcHJpdmF0ZSBhZGRJbnB1dE1lc3NhZ2UoaW5wdXRCb3hOYW1lOiBcImZpbmRcIiB8IFwicmVwbGFjZVwiLCBtZXNzYWdlOiBzdHJpbmcsIHR5cGU6IFwiZXJyb3JcIiB8IFwid2FybmluZ1wiKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlucHV0Qm94OiBIVE1MSW5wdXRFbGVtZW50ID0gaW5wdXRCb3hOYW1lID09PSBcImZpbmRcIiA/IHRoaXMuZmluZFRleHRCb3ggOiB0aGlzLnJlcGxhY2VUZXh0Qm94O1xuICAgICAgICBjb25zdCBtZXNzYWdlQm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7aW5wdXRCb3hOYW1lfS1tZXNzYWdlLWJveGApIGFzIEhUTUxEaXZFbGVtZW50O1xuICAgICAgICAvLyBXZSB0cnkgdG8gZG8gdGhlIGxlYXN0IGFtb3VudCBvZiBET00gY2hhbmdpbmcgYXMgdG8gcmVkdWNlIHRoZSBmbGFzaGluZyB0aGUgdXNlciBzZWVzXG4gICAgICAgIGlmIChtZXNzYWdlQm94LmlubmVyVGV4dCA9PT0gbWVzc2FnZSAmJiBtZXNzYWdlQm94LmNsYXNzTGlzdC5jb250YWlucyhgaW5wdXQtJHt0eXBlfWApKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZUJveC5jbGFzc0xpc3QuY29udGFpbnMoYGlucHV0LSR7dHlwZX1gKSkge1xuICAgICAgICAgICAgbWVzc2FnZUJveC5pbm5lclRleHQgPSBtZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVJbnB1dE1lc3NhZ2UoXCJmaW5kXCIsIHRydWUpO1xuICAgICAgICAgICAgbWVzc2FnZUJveC5pbm5lclRleHQgPSBtZXNzYWdlO1xuICAgICAgICAgICAgLy8gQWRkIHRoZSBjbGFzc2VzIGZvciBwcm9wZXIgc3R5bGluZyBvZiB0aGUgbWVzc2FnZVxuICAgICAgICAgICAgaW5wdXRCb3guY2xhc3NMaXN0LmFkZChgJHt0eXBlfS1ib3JkZXJgKTtcbiAgICAgICAgICAgIG1lc3NhZ2VCb3guY2xhc3NMaXN0LmFkZChgJHt0eXBlfS1ib3JkZXJgLCBgaW5wdXQtJHt0eXBlfWApO1xuICAgICAgICAgICAgbWVzc2FnZUJveC5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW1vdmVzIHRoZSB3YXJuaW5nIC8gZXJyb3IgbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7XCJmaW5kXCIgfCBcInJlcGxhY2VcIn0gaW5wdXRCb3hOYW1lIFdoaWNoIGlucHV0IGJveCB0byByZW1vdmUgdGhlIG1lc3NhZ2UgZnJvbVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbiB8IHVuZGVmaW5lZH0gc2tpcEhpZGluZyBXaGV0aGVyIHdlIHdhbnQgdG8gc2tpcCBoaWRpbmcgdGhlIGVtcHR5IG1lc3NhZ2UgYm94LCB0aGlzIGlzIHVzZWZ1bCBmb3IgY2xlYXJpbmcgdGhlIGJveCB0byBhZGQgbmV3IHRleHRcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbW92ZUlucHV0TWVzc2FnZShpbnB1dEJveE5hbWU6IFwiZmluZFwiIHwgXCJyZXBsYWNlXCIsIHNraXBIaWRpbmc/OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlucHV0Qm94OiBIVE1MSW5wdXRFbGVtZW50ID0gaW5wdXRCb3hOYW1lID09PSBcImZpbmRcIiA/IHRoaXMuZmluZFRleHRCb3ggOiB0aGlzLnJlcGxhY2VUZXh0Qm94O1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2VCb3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtpbnB1dEJveE5hbWV9LW1lc3NhZ2UtYm94YCkgYXMgSFRNTERpdkVsZW1lbnQ7XG4gICAgICAgIC8vIEFkZCB0aGUgY2xhc3NlcyBmb3IgcHJvcGVyIHN0eWxpbmcgb2YgdGhlIG1lc3NhZ2VcbiAgICAgICAgaW5wdXRCb3guY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLWJvcmRlclwiLCBcIndhcm5pbmctYm9yZGVyXCIpO1xuICAgICAgICBlcnJvck1lc3NhZ2VCb3guY2xhc3NMaXN0LnJlbW92ZShcImVycm9yLWJvcmRlclwiLCBcIndhcm5pbmctYm9yZGVyXCIsIFwiaW5wdXQtd2FybmluZ1wiLCBcImlucHV0LWVycm9yXCIpO1xuICAgICAgICBpZiAoc2tpcEhpZGluZyAhPT0gdHJ1ZSkgZXJyb3JNZXNzYWdlQm94LmhpZGRlbiA9IHRydWU7XG4gICAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbmltcG9ydCB7IGdldEVsZW1lbnRzV2l0aEdpdmVuT2Zmc2V0LCByZWxhdGl2ZUNvbXBsZW1lbnQsIGJpbmFyeVNlYXJjaCwgZGlzanVuY3Rpb24gfSBmcm9tIFwiLi91dGlsXCI7XG5pbXBvcnQgeyBXZWJWaWV3U3RhdGVNYW5hZ2VyIH0gZnJvbSBcIi4vd2Vidmlld1N0YXRlTWFuYWdlclwiO1xuXG5leHBvcnQgY2xhc3MgU2VsZWN0SGFuZGxlciB7XG4gICAgcHJpdmF0ZSBfZm9jdXM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICBwcml2YXRlIF9zZWxlY3Rpb246IG51bWJlcltdID0gW107XG4gICAgcHJpdmF0ZSBfc2VsZWN0aW9uU3RhcnQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhbiBvZmZzZXQgc2VsZWN0cyB0aGUgZWxlbWVudHMuIFRoaXMgZG9lcyBub3QgY2xlYXIgdGhlIHByZXZpb3VzbHkgc2VsZWN0ZWQgZWxlbWVudHMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBPZmZzZXQgdG8gc2VsZWN0XG4gICAgICogQHBhcmFtIHtib29sZWFufSBmb3JjZSBJZiBmb3JjZSBpcyBub3QgZ2l2ZW4sIHRvZ2dsZXMgc2VsZWN0aW9uLiBJZiBmb3JjZSBpcyB0cnVlIHNlbGVjdHMgdGhlIGVsZW1lbnQuXG4gICAgICogSWYgZm9yY2UgaXMgZmFsc2UgZGVzZWxlY3RzIHRoZSBlbGVtZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgc3RhdGljIHRvZ2dsZVNlbGVjdE9mZnNldChvZmZzZXQ6IG51bWJlciwgZm9yY2U/OiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQob2Zmc2V0KTtcbiAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gRWxlbWVudCBtYXkgbm90IGJlIHBhcnQgb2YgdGhlIERPTVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsZW1lbnRzWzBdLmNsYXNzTGlzdC50b2dnbGUoXCJzZWxlY3RlZFwiLCBmb3JjZSk7XG4gICAgICAgIGVsZW1lbnRzWzFdLmNsYXNzTGlzdC50b2dnbGUoXCJzZWxlY3RlZFwiLCBmb3JjZSk7XG4gICAgfVxuXG4gICAgLyoqKlxuICAgICAqIEBkZXNjcmlwdGlvbiBSZXR1cm5zIHRoZSBvZmZzZXQgb2YgdGhlIGVsZW1lbnQgY3VycmVudGx5IGZvY3VzZWQuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIG9mZnNldCBvZiB0aGUgZWxlbWVudCBjdXJyZW50bHkgZm9jdXNlZFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXRGb2N1c2VkKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb2N1cztcbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogQGRlc2NyaXB0aW9uIFNldCB0aGUgb2Zmc2V0IG9mIHRoZSBlbGVtZW50IGN1cnJlbnRseSBmb2N1c2VkLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgVGhlIG9mZnNldCB0aGUgZWxlbWVudCBjdXJyZW50bHkgZm9jdXNlZFxuICAgICAqL1xuICAgIHB1YmxpYyBzZXRGb2N1c2VkKG9mZnNldDogbnVtYmVyIHwgdW5kZWZpbmVkKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZvY3VzID0gb2Zmc2V0O1xuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUmV0dXJucyB0aGUgb2Zmc2V0IGZyb20gd2hpY2ggdGhlIHNlbGVjdGlvbiBzdGFydHMuXG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIG9mZnNldCBmcm9tIHdoaWNoIHRoZSBzZWxlY3Rpb24gc3RhcnRzXG4gICAgICovXG4gICAgcHVibGljIGdldFNlbGVjdGlvblN0YXJ0KCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb25TdGFydCA/PyB0aGlzLl9mb2N1cztcbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogQGRlc2NyaXB0aW9uIFJldHVybnMgdGhlIG9mZnNldHMgb2YgdGhlIGVsZW1lbnRzIGN1cnJlbnRseSBzZWxlY3RlZC5cbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119IFRoZSBvZmZzZXRzIG9mIHRoZSBlbGVtZW50cyBjdXJyZW50bHkgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0U2VsZWN0ZWQoKTogbnVtYmVyW10ge1xuICAgICAgICByZXR1cm4gV2ViVmlld1N0YXRlTWFuYWdlci5nZXRQcm9wZXJ0eShcInNlbGVjdGVkX29mZnNldHNcIikgPz8gW107XG4gICAgfVxuXG4gICAgLyoqKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhbiBhcnJheSBvZiBvZmZzZXRzLCBzZWxlY3RzIHRoZSBjb3JyZXNwb25kaW5nIGVsZW1lbnRzLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IG9mZnNldHMgVGhlIG9mZnNldHMgb2YgdGhlIGVsZW1lbnRzIHlvdSB3YW50IHRvIHNlbGVjdFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBUaGUgb2Zmc2V0IGZyb20gd2hpY2ggdGhlIHNlbGVjdGlvbiBzdGFydHNcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlUmVuZGVyIFdoZXRlciB0byBmb3JjZSByZW5kZXJpbmcgb2YgYWxsIGVsZW1lbnRzIHdob3NlXG4gICAgICogc2VsZWN0ZWQgc3RhdGVkIHdpbGwgY2hhbmdlXG4gICAgICovXG4gICAgcHVibGljIHNldFNlbGVjdGVkKG9mZnNldHM6IG51bWJlcltdLCBzdGFydD86IG51bWJlciwgZm9yY2VSZW5kZXIgPSBmYWxzZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBvbGRTZWxlY3Rpb24gPSB0aGlzLl9zZWxlY3Rpb247XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uU3RhcnQgPSBzdGFydDtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gWy4uLm9mZnNldHNdLnNvcnQoKGE6IG51bWJlciwgYjogbnVtYmVyKSA9PiBhIC0gYik7XG4gICAgICAgIFdlYlZpZXdTdGF0ZU1hbmFnZXIuc2V0UHJvcGVydHkoXCJzZWxlY3RlZF9vZmZzZXRzXCIsIHRoaXMuX3NlbGVjdGlvbik7XG5cbiAgICAgICAgLy8gTmVlZCB0byBjYWxsIHJlbmRlclNlbGVjdGlvbiB3aXRoIHRoZSBsZWFzdCBudW1iZXIgb2Ygb2Zmc2V0cyB0byBhdm9pZCBxdWVyeWluZyB0aGUgRE9NXG4gICAgICAgIC8vIGFzIG11Y2ggYXMgcG9zc2libGUsIGlmIG5vdCByZW5kZXJpbmcgbGFyZ2Ugc2VsZWN0aW9ucyBiZWNvbWVzIGxhZ2d5IGFzIHdlIGRvbnQgaG9sZCByZWZlcmVuY2VzXG4gICAgICAgIC8vIHRvIHRoZSBET00gZWxlbWVudHNcbiAgICAgICAgY29uc3QgdG9SZW5kZXIgPSBmb3JjZVJlbmRlciA/IGRpc2p1bmN0aW9uKG9sZFNlbGVjdGlvbiwgdGhpcy5fc2VsZWN0aW9uKSA6IHJlbGF0aXZlQ29tcGxlbWVudChvbGRTZWxlY3Rpb24sIHRoaXMuX3NlbGVjdGlvbik7XG4gICAgICAgIHRoaXMucmVuZGVyU2VsZWN0aW9uKHRvUmVuZGVyKTtcbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbmRlcnMgdGhlIHVwZGF0ZWQgc2VsZWN0aW9uIHN0YXRlIG9mIHNlbGVjdGVkL3Vuc2VsZWN0ZWQgZWxlbWVudHNcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSBvZmZzZXRzIFRoZSBvZmZzZXRzIG9mIHRoZSBlbGVtZW50cyB0byByZW5kZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIHJlbmRlclNlbGVjdGlvbihvZmZzZXRzOiBudW1iZXJbXSk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb250YWlucyA9IChvZmZzZXQ6IG51bWJlcik6IGJvb2xlYW4gPT4gYmluYXJ5U2VhcmNoKHRoaXMuX3NlbGVjdGlvbiwgb2Zmc2V0LCAoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IGEgLSBiKSA+PSAwO1xuXG4gICAgICAgIGZvciAoY29uc3Qgb2Zmc2V0IG9mIG9mZnNldHMpIHtcbiAgICAgICAgICAgIFNlbGVjdEhhbmRsZXIudG9nZ2xlU2VsZWN0T2Zmc2V0KG9mZnNldCwgY29udGFpbnMob2Zmc2V0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogQGRlc2NyaXB0aW9uIEdyYWJzIHRoZSBoZXggdmFsdWVzIG9mIHRoZSBzZWxlY3RlZCBieXRlc1xuICAgICAqIEByZXR1cm5zIHtzdHJpbmdbXX0gVGhlIGhleCB2YWx1ZXNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldFNlbGVjdGVkSGV4KCk6IHN0cmluZ1tdIHtcbiAgICAgICAgY29uc3QgaGV4OiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBjb25zdCBzZWxlY3RlZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzZWxlY3RlZCBoZXhcIikgYXMgSFRNTENvbGxlY3Rpb25PZjxIVE1MU3BhbkVsZW1lbnQ+O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbGVjdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRbaV0uaW5uZXJUZXh0ID09PSBcIitcIikgY29udGludWU7XG4gICAgICAgICAgICBoZXgucHVzaChzZWxlY3RlZFtpXS5pbm5lclRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBoZXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEZvY3VzZXMgdGhlIGZpcnN0IGVsZW1lbnQgaW4gdGhlIGN1cnJlbnQgc2VsZWN0aW9uIGJhc2VkIG9uIHRoZSBzZWN0aW9uIHBhc3NlZCBpblxuICAgICAqIEBwYXJhbSBzZWN0aW9uIHtcImhleFwiIHwgXCJhc2NpaVwifSBUaGUgc2VjdGlvbiB0byBwbGFjZSB0aGUgZm9jdXNcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGZvY3VzU2VsZWN0aW9uKHNlY3Rpb246IFwiaGV4XCIgfCBcImFzY2lpXCIpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgc2VsZWN0ZWQgJHtzZWN0aW9ufWApO1xuICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCAhPT0gMCkgKHNlbGVjdGlvblswXSBhcyBIVE1MU3BhbkVsZW1lbnQpLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFJldHJpZXZlcyB0aGUgc2VsZWN0aW9uIGFzIGEgc3RyaW5nLCBkZWZhdWx0cyB0byBoZXggaWYgdGhlcmUgaXMgbm8gZm9jdXMgb24gZWl0aGVyIHNpZGVcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc2VsZWN0aW9uIHJlcHJlc2VudGVkIGFzIGEgc3RyaW5nXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRTZWxlY3RlZFZhbHVlKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBzZWxlY3RlZFZhbHVlID0gXCJcIjtcbiAgICAgICAgbGV0IHNlY3Rpb24gPSBcImhleFwiO1xuICAgICAgICBsZXQgc2VsZWN0ZWRFbGVtZW50czogSFRNTENvbGxlY3Rpb25PZjxIVE1MU3BhbkVsZW1lbnQ+O1xuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudD8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYXNjaWlcIikpIHtcbiAgICAgICAgICAgIHNlY3Rpb24gPSBcImFzY2lpXCI7XG4gICAgICAgICAgICBzZWxlY3RlZEVsZW1lbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNlbGVjdGVkIGFzY2lpXCIpIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTFNwYW5FbGVtZW50PjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGVjdGVkRWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic2VsZWN0ZWQgaGV4XCIpIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTFNwYW5FbGVtZW50PjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2Ygc2VsZWN0ZWRFbGVtZW50cykge1xuICAgICAgICAgICAgaWYgKGVsZW1lbnQuaW5uZXJUZXh0ID09PSBcIitcIikgY29udGludWU7XG4gICAgICAgICAgICBzZWxlY3RlZFZhbHVlICs9IGVsZW1lbnQuaW5uZXJUZXh0O1xuICAgICAgICAgICAgaWYgKHNlY3Rpb24gPT09IFwiaGV4XCIpIHNlbGVjdGVkVmFsdWUgKz0gXCIgXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgaXQncyBoZXggd2Ugd2FudCB0byByZW1vdmUgdGhlIGxhc3Qgc3BhY2UgYXMgaXQgZG9lc24ndCBtYWtlIHNlbnNlXG4gICAgICAgIC8vIEZvciBhc2NpaSB0aGF0IHNwYWNlIG1pZ2h0IGhhdmUgbWVhbmluZ1xuICAgICAgICBpZiAoc2VjdGlvbiA9PT0gXCJoZXhcIikgc2VsZWN0ZWRWYWx1ZSA9IHNlbGVjdGVkVmFsdWUudHJpbVJpZ2h0KCk7XG4gICAgICAgIHJldHVybiBzZWxlY3RlZFZhbHVlO1xuICAgIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG5cbmltcG9ydCB7IHZpcnR1YWxIZXhEb2N1bWVudCB9IGZyb20gXCIuL2hleEVkaXRcIjtcbmltcG9ydCB7IFdlYlZpZXdTdGF0ZU1hbmFnZXIgfSBmcm9tIFwiLi93ZWJ2aWV3U3RhdGVNYW5hZ2VyXCI7XG5cbmV4cG9ydCBjbGFzcyBTY3JvbGxCYXJIYW5kbGVyIHtcbiAgICBwcml2YXRlIHNjcm9sbEJhcjogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBzY3JvbGxCYXJIZWlnaHQhOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzY3JvbGxUaHVtYjogSFRNTERpdkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBzY3JvbGxUaHVtYkhlaWdodCE6IG51bWJlcjtcbiAgICBwcml2YXRlIHNjcm9sbEp1bXAhOiBudW1iZXI7XG4gICAgcHJpdmF0ZSByb3dIZWlnaHQ6IG51bWJlcjtcbiAgICBwcml2YXRlIHNjcm9sbFRvcDogbnVtYmVyO1xuICAgIHByaXZhdGUgaXNEcmFnZ2luZzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBHaXZlbiBhIHNjcm9sbGJhciBlbGVtZW50IGluc3RhbnRpYXRlcyBhIGhhbmRsZXIgd2hpY2ggaGFuZGxlcyB0aGUgc2Nyb2xsaW5nIGJlaGF2aW9yIGluIHRoZSBlZGl0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2Nyb2xsQmFySWQgdGhlIGlkIG9mIHRoZSBzY3JvbGxiYXIgZWxlbWVudCBvbiB0aGUgRE9NIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3dIZWlnaHQgdGhlIGhlaWdodCBvZiBhIHJvdyBpbiBweFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNjcm9sbEJhcklkOiBzdHJpbmcsIG51bVJvd3M6IG51bWJlciwgcm93SGVpZ2h0OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxUb3AgPSAwO1xuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgLy8gSWYgdGhlIHNjcm9sbGJhciBpc24ndCBvbiB0aGUgRE9NIGZvciBzb21lIHJlYXNvbiB0aGVyZSdzIG5vdGhpbmcgd2UgY2FuIGRvIGJlc2lkZXMgY3JlYXRlIGFuIGVtcHR5IGhhbmRsZXIgYW5kIHRocm93IGFuIGVycm9yXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChzY3JvbGxCYXJJZCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2Nyb2xsQmFySWQpISBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVGh1bWIgPSB0aGlzLnNjcm9sbEJhci5jaGlsZHJlblswXSBhcyBIVE1MRGl2RWxlbWVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVGh1bWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgdGhyb3cgXCJJbnZhbGlkIHNjcm9sbGJhciBpZCFcIjtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIHRoaXMub25Nb3VzZVdoZWVsLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnNjcm9sbEJhci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVGh1bWIuY2xhc3NMaXN0LmFkZChcInNjcm9sbGluZ1wiKTtcbiAgICAgICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNjcm9sbEJhci5hZGRFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRodW1iLmNsYXNzTGlzdC5yZW1vdmUoXCJzY3JvbGxpbmdcIik7XG4gICAgICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuc2Nyb2xsVGh1bWJEcmFnLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnJvd0hlaWdodCA9IHJvd0hlaWdodDtcbiAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxCYXIobnVtUm93cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgZW5zdXJpbmcgdGhlIHNjcm9sbGJhciBpcyB2YWxpZCBhZnRlciB3aW5kb3cgcmVzaXplIFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1Sb3dzIFRoZSBudW1iZXIgb2Ygcm93cyBpbiB0aGUgZmlsZSwgbmVlZGVkIHRvIG1hcCBzY3JvbGwgYmFyIHRvIHJvdyBsb2NhdGlvbnNcbiAgICAgKi9cbiAgICBwdWJsaWMgdXBkYXRlU2Nyb2xsQmFyKG51bVJvd3M6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBTb21lIGNhbGN1bGF0aW9ucyBzbyB0aGF0IHRoZSB0aHVtYiAvIHNjcnViYmVyIGlzIHJlcHJlc2VudGF0aXZlIG9mIGhvdyBtdWNoIGNvbnRlbnQgdGhlcmUgaXNcbiAgICAgICAgLy8gQ3JlZGl0IHRvIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2MzY2Nzk1L2hvdy10by1jYWxjdWxhdGUtdGhlLXNpemUtb2Ytc2Nyb2xsLWJhci10aHVtYiBmb3IgdGhlc2UgY2FsY3VsYXRpb25zXG4gICAgICAgIGNvbnN0IGNvbnRlbnRIZWlnaHQgPSAobnVtUm93cyArIDEpICogdGhpcy5yb3dIZWlnaHQ7XG4gICAgICAgIHRoaXMuc2Nyb2xsQmFySGVpZ2h0ID0gdGhpcy5zY3JvbGxCYXIuY2xpZW50SGVpZ2h0O1xuICAgICAgICAvLyBXZSBkb24ndCB3YW50IHRoZSBzY3JvbGwgdGh1bWIgbGFyZ2VyIHRoYW4gdGhlIHNjcm9sbGJhclxuICAgICAgICB0aGlzLnNjcm9sbFRodW1iSGVpZ2h0ID0gTWF0aC5taW4odGhpcy5zY3JvbGxCYXJIZWlnaHQsIE1hdGgubWF4KHRoaXMuc2Nyb2xsQmFySGVpZ2h0ICogKHRoaXMuc2Nyb2xsQmFySGVpZ2h0IC8gY29udGVudEhlaWdodCksIDMwKSk7XG4gICAgICAgIHRoaXMuc2Nyb2xsVGh1bWIuc3R5bGUuaGVpZ2h0ID0gYCR7dGhpcy5zY3JvbGxUaHVtYkhlaWdodH1weGA7XG4gICAgICAgIC8vIElmIHlvdSBtb3ZlIHRoZSBzY3JvbGxiYXIgMXB4IGhvdyBtdWNoIHNob3VsZCB0aGUgZG9jdW1lbnQgbW92ZVxuICAgICAgICB0aGlzLnNjcm9sbEp1bXAgPSBNYXRoLm1heCgwLCAoY29udGVudEhlaWdodCAtIHRoaXMuc2Nyb2xsQmFySGVpZ2h0KSAvICh0aGlzLnNjcm9sbEJhckhlaWdodCAtIHRoaXMuc2Nyb2xsVGh1bWJIZWlnaHQpKTtcbiAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxlZFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgd2hlbiB0aGUgdXNlciBkcmFncyB0aGUgdGh1bWIgb24gdGhlIHNjcm9sbGJhciBhcm91bmRcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IFRoZSBtb3VzZSBldmVudCBwYXNzZWQgdG8gdGhlIGV2ZW50IGhhbmRsZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIHNjcm9sbFRodW1iRHJhZyhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICAvLyBpZiB0aGVzZSBhcmUgZXF1YWwgaXQgbWVhbnMgdGhlIGRvY3VtZW50IGlzIHRvbyBzaG9ydCB0byBzY3JvbGwgYW55d2F5c1xuICAgICAgICBpZiAodGhpcy5zY3JvbGxCYXJIZWlnaHQgPT09IHRoaXMuc2Nyb2xsVGh1bWJIZWlnaHQpIHJldHVybjtcbiAgICAgICAgLy8gVGhpcyBoZWxwcyB0aGUgY2FzZSB3aGVyZSB3ZSBsb3NlIHRyYWNrIGFzIHRoZSB1c2VyIHJlbGVhc2VzIHRoZSBidXR0b24gb3V0c2lkZSB0aGUgd2Vidmlld1xuICAgICAgICBpZiAoIXRoaXMuaXNEcmFnZ2luZyB8fCBldmVudC5idXR0b25zID09IDApe1xuICAgICAgICAgICAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbFRodW1iLmNsYXNzTGlzdC5yZW1vdmUoXCJzY3JvbGxpbmdcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsVG9wKGV2ZW50LmNsaWVudFkgKiB0aGlzLnNjcm9sbEp1bXApO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbGVkUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gVXBkYWVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgZG9jdW1lbnQgYW5kIHRoZSBzY3JvbGxiYXIgdGh1bWIgYmFzZWQgb24gdGhlIHNjcm9sbFRvcFxuICAgICAqL1xuICAgIHByaXZhdGUgYXN5bmMgdXBkYXRlU2Nyb2xsZWRQb3NpdGlvbigpOiBQcm9taXNlPHZvaWRbXT4ge1xuICAgICAgICAvLyBUaGUgdmlydHVhbCBkb2N1bWVudCB1cG9uIGZpcnN0IGxvYWQgaXMgdW5kZWZpbmVkIHNvIHdlIHdhbnQgdG8gcHJldmVudCBhbnkgZXJyb3JzIGFuZCBqdXN0IG5vdCBkbyBhbnl0aGluZyBpbiB0aGF0IGNhc2VcbiAgICAgICAgaWYgKCF2aXJ0dWFsSGV4RG9jdW1lbnQgfHwgIXZpcnR1YWxIZXhEb2N1bWVudC5kb2N1bWVudEhlaWdodCkgcmV0dXJuIFtdO1xuICAgICAgICB0aGlzLnNjcm9sbFRodW1iLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVZKCR7dGhpcy5zY3JvbGxUb3AgLyB0aGlzLnNjcm9sbEp1bXB9cHgpYDtcbiAgICAgICAgLy8gVGhpcyBtYWtlcyBzdXJlIGl0IGRvZXNuJ3Qgc2Nyb2xsIHBhc3QgdGhlIGJvdHRvbSBvZiB0aGUgdmlld3BvcnRcbiAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyb3d3cmFwcGVyXCIpWzBdIGFzIEhUTUxFbGVtZW50KSEuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7dGhpcy5zY3JvbGxUb3AgJSB2aXJ0dWFsSGV4RG9jdW1lbnQuZG9jdW1lbnRIZWlnaHR9cHgpYDtcbiAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyb3d3cmFwcGVyXCIpWzFdIGFzIEhUTUxFbGVtZW50KSEuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7dGhpcy5zY3JvbGxUb3AgJSB2aXJ0dWFsSGV4RG9jdW1lbnQuZG9jdW1lbnRIZWlnaHR9cHgpYDtcbiAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJyb3d3cmFwcGVyXCIpWzJdIGFzIEhUTUxFbGVtZW50KSEuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVkoLSR7dGhpcy5zY3JvbGxUb3AgJSB2aXJ0dWFsSGV4RG9jdW1lbnQuZG9jdW1lbnRIZWlnaHR9cHgpYDtcbiAgICAgICAgcmV0dXJuIHZpcnR1YWxIZXhEb2N1bWVudC5zY3JvbGxIYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgdGhlIHVzZXIgc2Nyb2xsaW5nIHdpdGggdGhlaXIgbW91c2Ugd2hlZWxcbiAgICAgKiBAcGFyYW0ge01vdXNlV2hlZWxFdmVudH0gZXZlbnQgVGhlIGV2ZW50IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHNjcm9sbCBwYXNzZWQgdG8gdGhlIGV2ZW50IGhhbmRsZXJcbiAgICAgKi9cbiAgICBwcml2YXRlIG9uTW91c2VXaGVlbChldmVudDogTW91c2VXaGVlbEV2ZW50KTogdm9pZCB7XG4gICAgICAgIC8vIGlmIHRoZXNlIGFyZSBlcXVhbCBpdCBtZWFucyB0aGUgZG9jdW1lbnQgaXMgdG9vIHNob3J0IHRvIHNjcm9sbCBhbnl3YXlzXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbEJhckhlaWdodCA9PT0gdGhpcy5zY3JvbGxUaHVtYkhlaWdodCkgcmV0dXJuO1xuICAgICAgICBpZiAoTWF0aC5hYnMoZXZlbnQuZGVsdGFYKSAhPT0gMCB8fCBldmVudC5zaGlmdEtleSkgcmV0dXJuO1xuICAgICAgICBpZiAoZXZlbnQuZGVsdGFZID4gMCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsVG9wKHRoaXMuc2Nyb2xsVG9wICsgdGhpcy5yb3dIZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsVG9wKHRoaXMuc2Nyb2xsVG9wIC0gdGhpcy5yb3dIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbGVkUG9zaXRpb24oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIENhbiBiZSBjYWxsZWQgdG8gc2Nyb2xsIHRoZSBkb2N1bWVudCBzaW1pbGFyIHRvIHdpbmRvdy5zY3JvbGxCeVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW1Sb3dzIFRoZSBudW1iZXIgb2Ygcm93cyB5b3Ugd2FudCB0byBzY3JvbGxcbiAgICAgKiBAcGFyYW0ge1widXBcIiB8IFwiZG93blwifSBkaXJlY3Rpb24gVGhlIGRpcmVjdGlvbiwgdXAgb3IgZG93blxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzY3JvbGxEb2N1bWVudChudW1Sb3dzOiBudW1iZXIsIGRpcmVjdGlvbjogXCJ1cFwiIHwgXCJkb3duXCIpOiBQcm9taXNlPHZvaWRbXT4ge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBcInVwXCIpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlydHVhbFNjcm9sbFRvcCh0aGlzLnNjcm9sbFRvcCAtICh0aGlzLnJvd0hlaWdodCAqIG51bVJvd3MpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlydHVhbFNjcm9sbFRvcCh0aGlzLnNjcm9sbFRvcCArICh0aGlzLnJvd0hlaWdodCAqIG51bVJvd3MpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVTY3JvbGxlZFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFNjcm9sbHMgdG8gdGhlIHRvcCBvZiB0aGUgZG9jdW1lbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2Nyb2xsVG9Ub3AoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlVmlydHVhbFNjcm9sbFRvcCgwKTtcbiAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxlZFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFNjcm9sbHMgdG8gdGhlIGJvdHRvbSBvZiB0aGUgZG9jdW1lbnRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2Nyb2xsVG9Cb3R0b20oKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlVmlydHVhbFNjcm9sbFRvcCgoKHRoaXMuc2Nyb2xsQmFySGVpZ2h0IC0gdGhpcy5zY3JvbGxUaHVtYkhlaWdodCkgKiB0aGlzLnNjcm9sbEp1bXApICsgdGhpcy5yb3dIZWlnaHQpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbGVkUG9zaXRpb24oKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ29udHJvbHMgc2Nyb2xsaW5nIHVwIGFuZCBkb3duIG9uZSB2aWV3cG9ydC4gV2hpY2ggb2NjdXJzIHdoZW4gdGhlIHVzZXIgcHJlc3NlcyBwYWdlIHVwIG9yIHBhZ2UgZG93blxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2aWV3cG9ydEhlaWdodCBUaGUgaGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCBpbiBwaXhlbHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZGlyZWN0aW9uIFdoZXRoZXIgeW91IHdhbnQgdG8gcGFnZSB1cCBvciBkb3duXG4gICAgICovXG4gICAgcHVibGljIHBhZ2Uodmlld3BvcnRIZWlnaHQ6IG51bWJlciwgZGlyZWN0aW9uOiBcInVwXCIgfCBcImRvd25cIik6IHZvaWQge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09IFwidXBcIikge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsVG9wKHRoaXMuc2Nyb2xsVG9wIC0gdmlld3BvcnRIZWlnaHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsVG9wKHRoaXMuc2Nyb2xsVG9wICsgdmlld3BvcnRIZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsZWRQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBAZGVzY3JpcHRpb24gU2V0cyB0aGUgdmlydHVhbFNjcm9sbFRvcCBlbnN1cmluZyBpdCBuZXZlciBleGNlZWRzIHRoZSBkb2N1bWVudCBib3VuZHNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbmV3U2Nyb2xsVG9wIFRoZSBudW1iZXIgeW91J3JlIHRyeWluZyB0byBzZXQgdGhlIHZpcnR1YWwgc2Nyb2xsIHRvcCB0b1xuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlVmlydHVhbFNjcm9sbFRvcChuZXdTY3JvbGxUb3A6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNjcm9sbFRvcCA9IE1hdGgubWF4KDAsIG5ld1Njcm9sbFRvcCk7XG4gICAgICAgIG5ld1Njcm9sbFRvcCA9IHRoaXMuc2Nyb2xsVG9wO1xuICAgICAgICB0aGlzLnNjcm9sbFRvcCA9IE1hdGgubWluKG5ld1Njcm9sbFRvcCwgKCh0aGlzLnNjcm9sbEJhckhlaWdodCAtIHRoaXMuc2Nyb2xsVGh1bWJIZWlnaHQpICogdGhpcy5zY3JvbGxKdW1wKSArIHRoaXMucm93SGVpZ2h0KTtcbiAgICAgICAgV2ViVmlld1N0YXRlTWFuYWdlci5zZXRQcm9wZXJ0eShcInNjcm9sbF90b3BcIiwgdGhpcy5zY3JvbGxUb3ApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBSZXRyaWV2ZXMgdGhlIHBpeGVsIHZhbHVlIGF0IHRoZSB0b3Agb2YgdGhlIHZpZXdwb3J0XG4gICAgICogQHJldHVybnMge251bWJlcn0gVGhlIHBpeGVsIHZhbHVlIG9mIHRoZSB2aXJ0dWFsIHZpZXdwb3J0IHRvcFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgdmlydHVhbFNjcm9sbFRvcCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5zY3JvbGxUb3A7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZXMgdGhlIHNjcm9sbCBwb3NpdGlvbiB0byBiZSB3aGF0ZXZlciB3YXMgc2F2ZWQgaW4gdGhlIHdlYnZpZXcgc3RhdGUuIFNob3VsZCBvbmx5IGJlIGNhbGxlZCBpZiB0aGUgdXNlciBoYXMgcmVsb2FkZWQgdGhlIHdlYnZpZXdcbiAgICAgKi9cbiAgICBwdWJsaWMgcmVzeW5jU2Nyb2xsUG9zaXRpb24oKTogdm9pZCB7XG4gICAgICAgIC8vIElmIHdlIGhhZCBhIHByZXZpb3VzbHkgc2F2ZWQgc3RhdGUgd2hlbiBjcmVhdGluZyB0aGUgc2Nyb2xsYmFyIHdlIHNob3VsZCByZXN0b3JlIHRoZSBzY3JvbGwgcG9zaXRpb25cbiAgICAgICAgaWYgKFdlYlZpZXdTdGF0ZU1hbmFnZXIuZ2V0U3RhdGUoKSAmJiBXZWJWaWV3U3RhdGVNYW5hZ2VyLmdldFN0YXRlKCkuc2Nyb2xsX3RvcCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXJ0dWFsU2Nyb2xsVG9wKFdlYlZpZXdTdGF0ZU1hbmFnZXIuZ2V0U3RhdGUoKS5zY3JvbGxfdG9wKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsZWRQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFNjcm9sbHMgdG8gdGhlIGdpdmVuIG9mZnNldCBpZiBpdCdzIG91dHNpZGUgdGhlIHZpZXdwb3J0XG4gICAgICogQHBhcmFtIG9mZnNldCBUaGUgb2Zmc2V0IHRvIHNjcm9sbCB0byBcbiAgICAgKiBAcGFyYW0gZm9yY2UgV2hldGhlciBvciBub3QgeW91IHNob3VsZCBzY3JvbGwgZXZlbiBpZiBpdCdzIGluIHRoZSB2aWV3cG9ydFxuICAgICAqL1xuICAgIHB1YmxpYyBhc3luYyBzY3JvbGxUb09mZnNldChvZmZzZXQ6IG51bWJlciwgZm9yY2U/OiBib29sZWFuKTogUHJvbWlzZTx2b2lkW10+IHtcbiAgICAgICAgLy8gaWYgdGhlc2UgYXJlIGVxdWFsIGl0IG1lYW5zIHRoZSBkb2N1bWVudCBpcyB0b28gc2hvcnQgdG8gc2Nyb2xsIGFueXdheXNcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsQmFySGVpZ2h0ID09PSB0aGlzLnNjcm9sbFRodW1iSGVpZ2h0KSByZXR1cm4gW107XG4gICAgICAgIGNvbnN0IHRvcE9mZnNldCA9IHZpcnR1YWxIZXhEb2N1bWVudC50b3BPZmZzZXQoKTtcbiAgICAgICAgLy8gRG9uJ3Qgc2Nyb2xsIGlmIGluIHRoZSB2aWV3cG9ydFxuICAgICAgICBpZiAoIWZvcmNlICYmIG9mZnNldCA+PSB0b3BPZmZzZXQgJiYgb2Zmc2V0IDw9IHZpcnR1YWxIZXhEb2N1bWVudC5ib3R0b21PZmZzZXQoKSkgcmV0dXJuIFtdO1xuICAgICAgICBjb25zdCByb3dEaWZmZXJlbmNlID0gTWF0aC5mbG9vcihNYXRoLmFicyhvZmZzZXQgLSB0b3BPZmZzZXQpIC8gMTYpO1xuICAgICAgICAvLyBUaGUgKzMvLTMgaXMgYmVjYXVzZSB0aGVyZSBpcyBiZWNhdXNlIHdlIHdhbnQgdGhlIHJlc3VsdCB0byBub3QgYmUgcHJlc3NlZCBhZ2FpbnN0IHRoZSB0b3BcbiAgICAgICAgaWYgKG9mZnNldCA+IHRvcE9mZnNldCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2Nyb2xsRG9jdW1lbnQocm93RGlmZmVyZW5jZSAtIDMsIFwiZG93blwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNjcm9sbERvY3VtZW50KHJvd0RpZmZlcmVuY2UgKyAzLCBcInVwXCIpO1xuICAgICAgICB9XG4gICAgfVxufSIsIi8vIENvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuXG5pbXBvcnQgeyBCeXRlRGF0YSB9IGZyb20gXCIuL2J5dGVEYXRhXCI7XG5cbi8vIEFzc29ydGVkIGhlbHBlciBmdW5jdGlvbnNcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gQ2xhc3Mgd2hpY2ggcmVwcmVzZW50cyBhIHJhbmdlIG9mIG51bWJlcnNcbiAqL1xuZXhwb3J0IGNsYXNzIFJhbmdlIHtcbiAgICBwdWJsaWMgcmVhZG9ubHkgc3RhcnQ6IG51bWJlcjtcbiAgICBwdWJsaWMgcmVhZG9ubHkgZW5kOiBudW1iZXI7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ29uc3RydWN0cyBhIHJhbmdlIG9iamVjdCByZXByZXNlbnRpbmcgW3N0YXJ0LCBlbmRdIGluY2x1c2l2ZSBvZiBib3RoXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFJlcHJlc2VudHMgdGhlIHN0YXJ0IG9mIHRoZSByYW5nZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgUmVwcmVzZW50cyB0aGUgZW5kIG9mIHRoZSByYW5nZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHN0YXJ0OiBudW1iZXIsIGVuZDogbnVtYmVyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICAgICAgaWYgKHN0YXJ0ID4gZW5kKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0ID0gZW5kO1xuICAgICAgICAgICAgdGhpcy5lbmQgPSBzdGFydDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcbiAgICAgICAgICAgIHRoaXMuZW5kID0gZW5kO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEBkZXNjaXB0aW9uIFRlc3RzIGlmIHRoZSBnaXZlbiBudW1iZXIgaWYgd2l0aGluIHRoZSByYW5nZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBudW0gVGhlIG51bWJlciB0byB0ZXN0XG4gICAgICogQHJldHVybnMge2Jvb2xlYW4gfSBUcnVlIGlmIHRoZSBudW1iZXIgaXMgaW4gdGhlIHJhbmdlLCBmYWxzZSBvdGhlcndpc2VcbiAgICAgKi9cbiAgICBiZXR3ZWVuKG51bTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLmVuZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bSA+PSB0aGlzLnN0YXJ0ICYmIG51bSA8PSB0aGlzLmVuZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudW0gPj0gdGhpcy5zdGFydDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gQ2hlY2tzIGlmIHRoZSBnaXZlbiBudW1iZXIgaXMgaW4gYW55IG9mIHRoZSByYW5nZXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW0gVGhlIG51bWJlciB0byB1c2Ugd2hlbiBjaGVja2luZyB0aGUgcmFuZ2VzXG4gKiBAcGFyYW0ge1JhbmdlW119IHJhbmdlcyBUaGUgcmFuZ2VzIHRvIGNoZWNrIHRoZSBudW1iZXIgYWdhaW5zdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIG51bWJlciBpcyBpbiBhbnkgb2YgdGhlIHJhbmdlcywgZmFsc2Ugb3RoZXJ3aXNlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aXRoaW5BbnlSYW5nZShudW06IG51bWJlciwgcmFuZ2VzOiBSYW5nZVtdKTogYm9vbGVhbiB7XG4gICAgZm9yIChjb25zdCByYW5nZSBvZiByYW5nZXMpIHtcbiAgICAgICAgaWYgKHJhbmdlLmJldHdlZW4obnVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGEgbGlzdCBvZiByYW5nZXMgY29udGFpbmluZyB0aGUgbm9uIHJlbmRlcmFibGUgOCBiaXQgY2hhciBjb2Rlc1xuICogQHJldHVybnMge1JhbmdlW119IFRoZSByYW5nZXMgd2hpY2ggcmVwcmVzZW50IHRoZSBub24gcmVuZGVyYWJsZSA4IGJpdCBjaGFyIGNvZGVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUNoYXJhY3RlclJhbmdlcygpOiBSYW5nZVtdIHtcbiAgICBjb25zdCByYW5nZXM6IFJhbmdlW10gPSBbXTtcbiAgICByYW5nZXMucHVzaChuZXcgUmFuZ2UoMCwgMzEpKTtcbiAgICByYW5nZXMucHVzaChuZXcgUmFuZ2UoMTI3LCAxNjApKTtcbiAgICByYW5nZXMucHVzaChuZXcgUmFuZ2UoMTczLCAxNzMpKTtcbiAgICByYW5nZXMucHVzaChuZXcgUmFuZ2UoMjU2KSk7XG4gICAgcmV0dXJuIHJhbmdlcztcbn1cblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhbiBvZmZzZXQgZ2V0cyBhbGwgc3BhbnMgd2l0aCB0aGF0IG9mZnNldFxuICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBUaGUgb2Zmc2V0IHRvIGZpbmQgZWxlbWVudHMgb2ZcbiAqIEByZXR1cm5zIHtIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50Pn0gcmV0dXJucyBhIGxpc3Qgb2YgSFRNTEVsZW1lbnRzIHdoaWNoIGhhdmUgdGhlIGdpdmVuIG9mZnNldFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQob2Zmc2V0OiBudW1iZXIpOiBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PiB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYGNlbGwtb2Zmc2V0LSR7b2Zmc2V0fWApIGFzIEhUTUxDb2xsZWN0aW9uT2Y8SFRNTEVsZW1lbnQ+O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhbiBlbGVtZW50IHJldHVybnMgaXRzIG9mZnNldCBvciBOYU4gaWYgaXQgZG9lc24ndCBoYXZlIG9uZVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byBnZXQgdGhlIG9mZnNldCBvZlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgb2Zmc2V0IG9mIHRoZSBlbGVtZW50IG9yIE5hTlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0RWxlbWVudHNPZmZzZXQoZWxlbWVudDogRWxlbWVudCk6IG51bWJlciB7XG4gICAgZm9yIChjb25zdCBjdXJyZW50Q2xhc3Mgb2YgZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRDbGFzcy5pbmRleE9mKFwiY2VsbC1vZmZzZXRcIikgIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBwYXJzZUludChjdXJyZW50Q2xhc3MucmVwbGFjZShcImNlbGwtb2Zmc2V0LVwiLCBcIlwiKSk7XG4gICAgICAgICAgICByZXR1cm4gb2Zmc2V0O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBOYU47XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFJldHVybnMgdGhlIGVsZW1lbnRzIHdpdGggdGhlIHNhbWUgb2Zmc2V0IGFzIHRoZSBvbmUgY2xpY2tlZFxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCBUaGUgZXZlbnQgd2hpY2ggaXMgaGFuZGVkIHRvIGEgbW91c2UgZXZlbnQgbGlzdGVuZXJcbiAqIEByZXR1cm5zIHtIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+IHwgQXJyYXk8RWxlbWVudD59IFRoZSBlbGVtZW50cyB3aXRoIHRoZSBzYW1lIG9mZnNldCBhcyB0aGUgY2xpY2tlZCBlbGVtZW50LCBvciB1bmRlZmluZWQgaWYgbm9uZSBjb3VsZCBiZSByZXRyaWV2ZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVsZW1lbnRzR2l2ZW5Nb3VzZUV2ZW50KGV2ZW50OiBNb3VzZUV2ZW50KTogSFRNTENvbGxlY3Rpb25PZjxFbGVtZW50PiB8IEFycmF5PEVsZW1lbnQ+IHtcbiAgICBpZiAoIWV2ZW50IHx8ICFldmVudC50YXJnZXQpIHJldHVybiBbXTtcbiAgICBjb25zdCBob3ZlcmVkID0gZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQ7XG4gICAgcmV0dXJuIGdldEVsZW1lbnRzV2l0aEdpdmVuT2Zmc2V0KGdldEVsZW1lbnRzT2Zmc2V0KGhvdmVyZWQpKTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gR2l2ZW4gYSBieXRlZGF0YSBvYmplY3QgdXBkYXRlcyB0aGUgYXNjaWkgZWxlbWVudCB3aXRoIHRoZSBjb3JyZWN0IGRlY29kZWQgdGV4dFxuICogQHBhcmFtIHtCeXRlRGF0YX0gYnl0ZURhdGEgVGhlIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGEgZ2l2ZW4gYnl0ZVxuICogQHBhcmFtIHtIVE1MU3BhbkVsZW1lbnR9IGFzY2lpRWxlbWVudCBUaGUgZGVjb2RlZCB0ZXh0IGVsZW1lbnQgb24gdGhlIERPTVxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlQXNjaWlWYWx1ZShieXRlRGF0YTogQnl0ZURhdGEsIGFzY2lpRWxlbWVudDogSFRNTFNwYW5FbGVtZW50KTogdm9pZCB7XG4gICAgYXNjaWlFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJub25ncmFwaGljXCIpO1xuICAgIC8vIElmIGl0J3Mgc29tZSBzb3J0IG9mIGNoYXJhY3RlciB3ZSBjYW5ub3QgcmVuZGVyIHdlIGp1c3QgcmVwcmVzZW50IGl0IGFzIGEgcGVyaW9kIHdpdGggdGhlIG5vZ3JhcGhpYyBjbGFzc1xuICAgIGlmICh3aXRoaW5BbnlSYW5nZShieXRlRGF0YS50bzhiaXRVSW50KCksIGdlbmVyYXRlQ2hhcmFjdGVyUmFuZ2VzKCkpKSB7XG4gICAgICAgIGFzY2lpRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibm9uZ3JhcGhpY1wiKTtcbiAgICAgICAgYXNjaWlFbGVtZW50LmlubmVyVGV4dCA9IFwiLlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGFzY2lpX2NoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVEYXRhLnRvOGJpdFVJbnQoKSk7XG4gICAgICAgIGFzY2lpRWxlbWVudC5pbm5lclRleHQgPSBhc2NpaV9jaGFyO1xuICAgIH1cbn1cblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhIHN0cmluZyAwIHBhZHMgaXQgdXAgdW5pdGwgdGhlIHN0cmluZyBpcyBvZiBsZW5ndGggd2lkdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBudW1iZXIgVGhlIG51bWJlciB5b3Ugd2FudCB0byAwIHBhZCAoaXQncyBhIHN0cmluZyBhcyB5b3UncmUgMCBwYWRkaW5nIGl0IHRvIGRpc3BsYXkgaXQsIG5vdCB0byBkbyBhcml0aG1ldGljKVxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIFRoZSBsZW5ndGggb2YgdGhlIGZpbmFsIHN0cmluZyAoaWYgc21hbGxlciB0aGFuIHRoZSBzdHJpbmcgcHJvdmlkZWQgbm90aGluZyBoYXBwZW5zKVxuICogQHJldHVybnMge3N0cmluZ30gVGhlIG5ld2x5IHBhZGRlZCBzdHJpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhZChudW1iZXI6IHN0cmluZywgd2lkdGg6IG51bWJlcik6IHN0cmluZyB7XG4gICAgbnVtYmVyID0gbnVtYmVyICsgXCJcIjtcbiAgICByZXR1cm4gbnVtYmVyLmxlbmd0aCA+PSB3aWR0aCA/IG51bWJlciA6IG5ldyBBcnJheSh3aWR0aCAtIG51bWJlci5sZW5ndGggKyAxKS5qb2luKFwiMFwiKSArIG51bWJlcjtcbn1cblxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBHaXZlbiB0d28gZWxlbWVudHMgKHRoZSBoZXggYW5kIGFzY2lpIGVsZW1lbnRzKSwgcmV0dXJucyBhIEJ5dGVEYXRhIG9iamVjdCByZXByZXNlbnRpbmcgYm90aCBvZiB0aGVtXG4gKiBAcGFyYW0ge0hUTUxDb2xsZWN0aW9uT2Y8RWxlbWVudD59IGVsZW1lbnRzIFRoZSBlbGVtZW50cyByZXByZXNlbnRpbmcgdGhlIGhleCBhbmQgYXNzb2NpYXRlZCBhc2NpaSBvbiB0aGUgRE9NXG4gKiBAcmV0dXJucyB7Qnl0ZURhdGEgfCB1bmRlZmluZWR9IFRoZSBCeXRlRGF0YSBvYmplY3Qgb3IgdW5kZWZpbmVkIGlmIGVsZW1lbnRzIHdhcyBtYWxmb3JtZWQgb3IgZW1wdHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJldHJpZXZlU2VsZWN0ZWRCeXRlT2JqZWN0KGVsZW1lbnRzOiBIVE1MQ29sbGVjdGlvbk9mPEVsZW1lbnQ+KTogQnl0ZURhdGEgfCB1bmRlZmluZWQge1xuICAgIGZvciAoY29uc3QgZWxlbWVudCBvZiBBcnJheS5mcm9tKGVsZW1lbnRzKSkge1xuICAgICAgICBpZiAoZWxlbWVudC5wYXJlbnRFbGVtZW50ICYmIGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGV4XCIpKSB7XG4gICAgICAgICAgICBjb25zdCBieXRlX29iamVjdCA9IG5ldyBCeXRlRGF0YShwYXJzZUludChlbGVtZW50LmlubmVySFRNTCwgMTYpKTtcbiAgICAgICAgICAgIGxldCBjdXJyZW50X2VsZW1lbnQgPSBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZyB8fCBlbGVtZW50LnBhcmVudEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nPy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJyZW50X2VsZW1lbnQgfHwgY3VycmVudF9lbGVtZW50LmlubmVySFRNTCA9PT0gXCIrXCIpIGJyZWFrO1xuICAgICAgICAgICAgICAgIGJ5dGVfb2JqZWN0LmFkZEFkamFjZW50Qnl0ZShuZXcgQnl0ZURhdGEocGFyc2VJbnQoY3VycmVudF9lbGVtZW50LmlubmVySFRNTCwgMTYpKSk7XG4gICAgICAgICAgICAgICAgY3VycmVudF9lbGVtZW50ID0gY3VycmVudF9lbGVtZW50Lm5leHRFbGVtZW50U2libGluZyB8fCBjdXJyZW50X2VsZW1lbnQucGFyZW50RWxlbWVudD8ubmV4dEVsZW1lbnRTaWJsaW5nPy5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBieXRlX29iamVjdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG59XG4vKipcbiAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhIHN0YXJ0IGFuZCBlbmQgb2Zmc2V0IGNyZWF0ZXMgYW4gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIG9mZnNldHMgaW4gYmV0d2VlbiwgaW5jbHVzaXZlIG9mIHN0YXJ0IGFuZCBlbmRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydE9mZnNldCBUaGUgb2Zmc2V0IHdoaWNoIGRlZmluZXMgdGhlIHN0YXJ0IG9mIHRoZSByYW5nZVxuICogQHBhcmFtIHtudW1iZXJ9IGVuZE9mZnNldCBUaGUgb2Zmc2V0IHdoaWNoIGRlZmluZXMgdGhlIGVuZCBvZiB0aGUgcmFuZ2VcbiAqIEByZXR1cm5zIHtudW1iZXJbXX0gVGhlIHJhbmdlIFtzdGFydE9mZnNldCwgZW5kT2Zmc2V0XVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlT2Zmc2V0UmFuZ2Uoc3RhcnRPZmZzZXQ6IG51bWJlciwgZW5kT2Zmc2V0OiBudW1iZXIpOiBudW1iZXJbXSB7XG4gICAgY29uc3Qgb2Zmc2V0c1RvU2VsZWN0ID0gW107XG4gICAgLy8gV2UgZmxpcCB0aGVtIHNvIHRoYXQgdGhlIGZvciBsb29wIGNyZWF0ZXMgdGhlIHJhbmdlIGNvcnJlY3RseVxuICAgIGlmIChlbmRPZmZzZXQgPCBzdGFydE9mZnNldCkge1xuICAgICAgICBjb25zdCB0ZW1wID0gZW5kT2Zmc2V0O1xuICAgICAgICBlbmRPZmZzZXQgPSBzdGFydE9mZnNldDtcbiAgICAgICAgc3RhcnRPZmZzZXQgPSB0ZW1wO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgYW4gYXJyYXkgb2Ygb2Zmc2V0cyB3aXRoIGV2ZXJ5dGhpbmcgYmV0d2VlbiB0aGUgbGFzdCBzZWxlY3RlZCBlbGVtZW50IGFuZCB3aGF0IHRoZSB1c2VyIGhpdCBzaGlmdFxuICAgIGZvciAobGV0IGkgPSBzdGFydE9mZnNldDsgaSA8PSBlbmRPZmZzZXQ7IGkrKykge1xuICAgICAgICBvZmZzZXRzVG9TZWxlY3QucHVzaChpKTtcbiAgICB9XG4gICAgcmV0dXJuIG9mZnNldHNUb1NlbGVjdDtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gQ29udmVydHMgYSBoZXggcXVlcnkgdG8gYSBzdHJpbmcgYXJyYXkgaWdub3Jpbmcgc3BhY2VzLCBpZiBub3QgZXZlbmx5IGRpdmlzaWJsZSB3ZSBhcHBlbmQgYSBsZWFkaW5nIDAgXG4gKiBpLmUgQSAtPiAwQVxuICogQHBhcmFtIHtzdHJpbmd9IHF1ZXJ5IFRoZSBxdWVyeSB0byBjb252ZXJ0IHRvIGFuIGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoZXhRdWVyeVRvQXJyYXkocXVlcnk6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBsZXQgY3VycmVudENoYXJhY3RlclNlcXVlbmNlID0gXCJcIjtcbiAgICBjb25zdCBxdWVyeUFycmF5OiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHF1ZXJ5W2ldID09PSBcIiBcIikgY29udGludWU7XG4gICAgICAgIGN1cnJlbnRDaGFyYWN0ZXJTZXF1ZW5jZSArPSBxdWVyeVtpXTtcbiAgICAgICAgaWYgKGN1cnJlbnRDaGFyYWN0ZXJTZXF1ZW5jZS5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIHF1ZXJ5QXJyYXkucHVzaChjdXJyZW50Q2hhcmFjdGVyU2VxdWVuY2UpO1xuICAgICAgICAgICAgY3VycmVudENoYXJhY3RlclNlcXVlbmNlID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoY3VycmVudENoYXJhY3RlclNlcXVlbmNlLmxlbmd0aCA+IDApICB7XG4gICAgICAgIHF1ZXJ5QXJyYXkucHVzaChcIjBcIiArIGN1cnJlbnRDaGFyYWN0ZXJTZXF1ZW5jZSk7XG4gICAgfVxuICAgIHJldHVybiBxdWVyeUFycmF5O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBHaXZlbiB0d28gc29ydGVkIGNvbGxlY3Rpb25zIG9mIG51bWJlcnMsIHJldHVybnMgdGhlIHVuaW9uXG4gKiBiZXR3ZWVuIHRoZW0gKE9SKS5cbiAqIEBwYXJhbSB7bnVtYmVyW119IG9uZSBUaGUgZmlyc3Qgc29ydGVkIGFycmF5IG9mIG51bWJlcnNcbiAqIEBwYXJhbSB7bnVtYmVyW119IG90aGVyIFRoZSBvdGhlciBzb3J0ZWQgYXJyYXkgb2YgbnVtYmVyc1xuICogQHJldHVybnMge251bWJlcltdfSBBIHNvcnRlZCBjb2xsZWN0aW9ucyBvZiBudW1iZXJzIHJlcHJlc2VudGluZyB0aGUgdW5pb24gKE9SKVxuICogYmV0d2VlbiB0byBzb3J0ZWQgY29sbGVjdGlvbnMgb2YgbnVtYmVyc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzanVuY3Rpb24ob25lOiBudW1iZXJbXSwgb3RoZXI6IG51bWJlcltdKTogbnVtYmVyW10ge1xuICAgIGNvbnN0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcbiAgICBsZXQgaSA9IDAsIGogPSAwO1xuXG4gICAgd2hpbGUgKGkgPCBvbmUubGVuZ3RoIHx8IGogPCBvdGhlci5sZW5ndGgpIHtcbiAgICAgICAgaWYgKGkgPj0gb25lLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gob3RoZXJbaisrXSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaiA+PSBvdGhlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9uZVtpKytdKTtcbiAgICAgICAgfSBlbHNlIGlmIChvbmVbaV0gPT09IG90aGVyW2pdKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChvbmVbaV0pO1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH0gZWxzZSBpZiAob25lW2ldIDwgb3RoZXJbal0pIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9uZVtpKytdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG90aGVyW2orK10pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gR2l2ZW4gdHdvIHNvcnRlZCBjb2xsZWN0aW9ucyBvZiBudW1iZXJzLCByZXR1cm5zIHRoZSByZWxhdGl2ZVxuICogY29tcGxlbWVudCBiZXR3ZWVuIHRoZW0gKFhPUikuXG4gKiBAcGFyYW0ge251bWJlcltdfSBvbmUgVGhlIGZpcnN0IHNvcnRlZCBhcnJheSBvZiBudW1iZXJzXG4gKiBAcGFyYW0ge251bWJlcltdfSBvdGhlciBUaGUgb3RoZXIgc29ydGVkIGFycmF5IG9mIG51bWJlcnNcbiAqIEByZXR1cm5zIHtudW1iZXJbXX0gQSBzb3J0ZWQgY29sbGVjdGlvbnMgb2YgbnVtYmVycyByZXByZXNlbnRpbmcgdGhlIGNvbXBsZW1lbnQgKFhPUilcbiAqIGJldHdlZW4gdG8gc29ydGVkIGNvbGxlY3Rpb25zIG9mIG51bWJlcnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlbGF0aXZlQ29tcGxlbWVudChvbmU6IG51bWJlcltdLCBvdGhlcjogbnVtYmVyW10pOiBudW1iZXJbXSB7XG4gICAgY29uc3QgcmVzdWx0OiBudW1iZXJbXSA9IFtdO1xuICAgIGxldCBpID0gMCwgaiA9IDA7XG5cbiAgICB3aGlsZSAoaSA8IG9uZS5sZW5ndGggfHwgaiA8IG90aGVyLmxlbmd0aCkge1xuICAgICAgICBpZiAoaSA+PSBvbmUubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChvdGhlcltqKytdKTtcbiAgICAgICAgfSBlbHNlIGlmIChqID49IG90aGVyLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gob25lW2krK10pO1xuICAgICAgICB9IGVsc2UgaWYgKG9uZVtpXSA9PT0gb3RoZXJbal0pIHtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9IGVsc2UgaWYgKG9uZVtpXSA8IG90aGVyW2pdKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChvbmVbaSsrXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChvdGhlcltqKytdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIFNlYXJjaGVzIGEga2V5IGVsZW1lbnQgaW5zaWRlIGEgc29ydGVkIGFycmF5LlxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7VFtdfSBhcnJheSBUaGUgc29ydGVkIGFycmF5IHRvIHNlYXJjaCBpblxuICogQHBhcmFtIHtUfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yIGluIHRoZSBzb3J0ZWQgYXJyYXlcbiAqIEBwYXJhbSB7Y29tcGFyYXRvckNhbGxiYWNrfSBjb21wYXJhdG9yIFRoZSBjb21wYXJhdG9yIGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgYXQgd2hpY2ggYSBnaXZlbiBlbGVtZW50IGNhbiBiZSBmb3VuZCBpbiB0aGUgYXJyYXksIG9yIGEgbmVnYXRpdmUgdmFsdWUgaWYgaXQgaXMgbm90IHByZXNlbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeVNlYXJjaDxUPihhcnJheTogUmVhZG9ubHlBcnJheTxUPiwga2V5OiBULCBjb21wYXJhdG9yOiAob3AxOiBULCBvcDI6IFQpID0+IG51bWJlcik6IG51bWJlciB7XG4gICAgbGV0IGxvdyA9IDAsXG4gICAgICAgIGhpZ2ggPSBhcnJheS5sZW5ndGggLSAxO1xuXG4gICAgd2hpbGUgKGxvdyA8PSBoaWdoKSB7XG4gICAgICAgIGNvbnN0IG1pZCA9ICgobG93ICsgaGlnaCkgLyAyKSB8IDA7XG4gICAgICAgIGNvbnN0IGNvbXAgPSBjb21wYXJhdG9yKGFycmF5W21pZF0sIGtleSk7XG4gICAgICAgIGlmIChjb21wIDwgMCkge1xuICAgICAgICAgICAgbG93ID0gbWlkICsgMTtcbiAgICAgICAgfSBlbHNlIGlmIChjb21wID4gMCkge1xuICAgICAgICAgICAgaGlnaCA9IG1pZCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbWlkO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAtKGxvdyArIDEpO1xufVxuIiwiLy8gQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcblxuaW1wb3J0IHsgQnl0ZURhdGEgfSBmcm9tIFwiLi9ieXRlRGF0YVwiO1xuaW1wb3J0IHsgZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQsIHVwZGF0ZUFzY2lpVmFsdWUsIHBhZCwgY3JlYXRlT2Zmc2V0UmFuZ2UsIHJldHJpZXZlU2VsZWN0ZWRCeXRlT2JqZWN0LCBnZXRFbGVtZW50c09mZnNldCB9IGZyb20gXCIuL3V0aWxcIjtcbmltcG9ydCB7IHRvZ2dsZUhvdmVyLCBjaGFuZ2VFbmRpYW5uZXNzIH0gZnJvbSBcIi4vZXZlbnRIYW5kbGVyc1wiO1xuaW1wb3J0IHsgY2h1bmtIYW5kbGVyLCB2aXJ0dWFsSGV4RG9jdW1lbnQgfSBmcm9tIFwiLi9oZXhFZGl0XCI7XG5pbXBvcnQgeyBTY3JvbGxCYXJIYW5kbGVyIH0gZnJvbSBcIi4vc3JvbGxCYXJIYW5kbGVyXCI7XG5pbXBvcnQgeyBFZGl0SGFuZGxlciwgRWRpdE1lc3NhZ2UgfSBmcm9tIFwiLi9lZGl0SGFuZGxlclwiO1xuaW1wb3J0IHsgV2ViVmlld1N0YXRlTWFuYWdlciB9IGZyb20gXCIuL3dlYnZpZXdTdGF0ZU1hbmFnZXJcIjtcbmltcG9ydCB7IFNlbGVjdEhhbmRsZXIgfSBmcm9tIFwiLi9zZWxlY3RIYW5kbGVyXCI7XG5pbXBvcnQgeyBTZWFyY2hIYW5kbGVyIH0gZnJvbSBcIi4vc2VhcmNoSGFuZGxlclwiO1xuaW1wb3J0IHsgcG9wdWxhdGVEYXRhSW5zcGVjdG9yIH0gZnJvbSBcIi4vZGF0YUluc3BlY3RvclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZpcnR1YWxpemVkUGFja2V0IHtcbiAgICBvZmZzZXQ6IG51bWJlcjtcbiAgICBkYXRhOiBCeXRlRGF0YTtcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB0aGUgcHJlc2VudGF0aW9uIGxheWVyIHZpcnR1YWxpemluZyB0aGUgaGV4IGRvY3VtZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBWaXJ0dWFsRG9jdW1lbnQge1xuICAgIHByaXZhdGUgZmlsZVNpemU6IG51bWJlcjtcbiAgICBwcml2YXRlIHJvd0hlaWdodDogbnVtYmVyO1xuICAgIHB1YmxpYyByZWFkb25seSBkb2N1bWVudEhlaWdodDogbnVtYmVyO1xuICAgIHByaXZhdGUgdmlld1BvcnRIZWlnaHQhOiBudW1iZXJcbiAgICBwcml2YXRlIGhleEFkZHJQYWRkaW5nOiBudW1iZXI7XG4gICAgcHJpdmF0ZSByZWFkb25seSBzY3JvbGxCYXJIYW5kbGVyOiBTY3JvbGxCYXJIYW5kbGVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgZWRpdEhhbmRsZXI6IEVkaXRIYW5kbGVyO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VsZWN0SGFuZGxlcjogU2VsZWN0SGFuZGxlcjtcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlYXJjaEhhbmRsZXI6IFNlYXJjaEhhbmRsZXI7XG4gICAgcHJpdmF0ZSByb3dzOiBNYXA8c3RyaW5nLCBIVE1MRGl2RWxlbWVudD5bXTtcbiAgICBwcml2YXRlIHJlYWRvbmx5IGVkaXRvckNvbnRhaW5lcjogSFRNTEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ29uc3RydWN0cyBhIFZpcnR1YWxEb2N1bWVudCBmb3IgYSBmaWxlIG9mIGEgZ2l2ZW4gc2l6ZS4gQWxzbyBoYW5kbGVzIHRoZSBpbml0aWFsIERPTSBsYXlvdXRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmlsZVNpemUgVGhlIHNpemUsIGluIGJ5dGVzLCBvZiB0aGUgZmlsZSB3aGljaCBpcyBiZWluZyBkaXNwbGF5ZWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihmaWxlU2l6ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZmlsZVNpemUgPSBmaWxlU2l6ZTtcbiAgICAgICAgdGhpcy5lZGl0SGFuZGxlciA9IG5ldyBFZGl0SGFuZGxlcigpO1xuICAgICAgICB0aGlzLnNlbGVjdEhhbmRsZXIgPSBuZXcgU2VsZWN0SGFuZGxlcigpO1xuICAgICAgICB0aGlzLnNlYXJjaEhhbmRsZXIgPSBuZXcgU2VhcmNoSGFuZGxlcigpO1xuICAgICAgICAvLyBUaGlzIGhvbGRzIHRoZSAzIG1haW4gY29sdW1ucyByb3dzIChoZXhhZGRyLCBoZXhib2R5LCBhc2NpaSlcbiAgICAgICAgdGhpcy5yb3dzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnJvd3MucHVzaChuZXcgTWFwPHN0cmluZywgSFRNTERpdkVsZW1lbnQ+KCkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdlIGNyZWF0ZSBlbGVtZW50cyBhbmQgcGxhY2UgdGhlbSBvbiB0aGUgRE9NIGJlZm9yZSByZW1vdmluZyB0aGVtIHRvIGdldCBoZWlnaHRzIGFuZCB3aWR0aHMgb2Ygcm93cyB0byBzZXR1cCBsYXlvdXQgY29ycmVjdGx5XG4gICAgICAgIGNvbnN0IGFzY2lpID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhc2NpaVwiKSE7XG4gICAgICAgIGNvbnN0IGhleCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGV4Ym9keVwiKSE7XG4gICAgICAgIGNvbnN0IGhleGFkZHIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhleGFkZHJcIikhO1xuICAgICAgICBjb25zdCBvbGRIZXhBZGRySHRtbCA9IGhleGFkZHIuaW5uZXJIVE1MO1xuICAgICAgICBjb25zdCBvbGRIZXhIdG1sID0gaGV4LmlubmVySFRNTDtcbiAgICAgICAgY29uc3Qgb2xkQXNjaWlIdG1sID0gYXNjaWkuaW5uZXJIVE1MO1xuICAgICAgICAvLyBXZSBoYXZlIHRvIHNldCB0aGUgYXNjaWkgY29sdW1ucyB3aWR0aCB0byBiZSBsYXJnZSBiZWZvcmUgYXBwZW5kaW5nIHRoZSBhc2NpaSBvciBlbHNlIGl0IHdyYXBzIGFuZCBtZXNzZXMgdXAgdGhlIHdpZHRoIGNhbGN1bGF0aW9uXG4gICAgICAgIC8vIFRoaXMgaXMgYSBjaGFuZ2UgaW4gdGhlIG5leHQgZ2VuIGxheW91dCBlbmdpbmVcbiAgICAgICAgYXNjaWkuc3R5bGUud2lkdGggPSBcIjUwMHB4XCI7XG4gICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNvbnN0IGFzY2lpUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgY29uc3QgaGV4QWRkclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGhleEFkZHJSb3cuY2xhc3NOYW1lID0gXCJyb3dcIjtcbiAgICAgICAgYXNjaWlSb3cuY2xhc3NOYW1lID0gXCJyb3dcIjtcbiAgICAgICAgcm93LmNsYXNzTmFtZSA9IFwicm93XCI7XG4gICAgICAgIC8vIEZvciBhc2NpaSB3ZSB3YW50IHRvIHRlc3QgbW9yZSB0aGFuIGp1c3Qgb25lIGNoYXJhY3RlciBhcyBzb21ldGltZXMgdGhhdCBkb2Vzbid0IHNldCB0aGUgd2lkdGggY29ycmVjdGx5XG4gICAgICAgIGNvbnN0IGFzY2lpVGVzdFN0cmluZyA9IFwiVGVzdGluZyBTdHJpbmchIVwiO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGhleF9lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBjb25zdCBhc2NpaV9lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBoZXhfZWxlbWVudC5pbm5lclRleHQgPSBcIkZGXCI7XG4gICAgICAgICAgICBhc2NpaV9lbGVtZW50LmlubmVyVGV4dCA9IGFzY2lpVGVzdFN0cmluZ1tpXTtcbiAgICAgICAgICAgIGFzY2lpUm93LmFwcGVuZENoaWxkKGFzY2lpX2VsZW1lbnQpO1xuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGhleF9lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBoZXhBZGRyUm93LmlubmVyVGV4dCA9IFwiMDAwMDAwMDBcIjtcbiAgICAgICAgcm93LnN0eWxlLnRvcCA9IFwiMHB4XCI7XG4gICAgICAgIGFzY2lpUm93LnN0eWxlLnRvcCA9IFwiMHB4XCI7XG4gICAgICAgIGhleC5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICBoZXhhZGRyLmFwcGVuZENoaWxkKGhleEFkZHJSb3cpO1xuICAgICAgICBhc2NpaS5hcHBlbmRDaGlsZChhc2NpaVJvdyk7XG5cbiAgICAgICAgY29uc3Qgc3BhbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNwYW5cIik7XG4gICAgICAgIHRoaXMucm93SGVpZ2h0ID0gc3BhbnNbMTZdLm9mZnNldEhlaWdodDtcbiAgICAgICAgLy8gVXRpbGl6ZSB0aGUgZmFrZSByb3dzIHRvIGdldCB0aGUgd2lkdGhzIG9mIHRoZW0gYW5kIGFsdGVyIHRoZSB3aWR0aHMgb2YgdGhlIGhlYWRlcnMgZXRjIHRvIGZpdFxuICAgICAgICAvLyBUaGUgcGx1cyBvbmUgaXMgYmVjYXVzZSB0aGUgbmV3IGxheW91dCBlbmdpbmUgaW4gY2hyb21lIHdvdWxkIHdyYXAgdGhlIHRleHQgb3RoZXJ3aXNlIHdoaWNoIEknbSB1bnN1cmUgd2h5XG4gICAgICAgIGNvbnN0IGFzY2lpUm93V2lkdGggPSBhc2NpaVJvdy5vZmZzZXRXaWR0aCArIDE7XG4gICAgICAgIGNvbnN0IGhleFJvd1dpZHRoID0gc3BhbnNbMTZdLnBhcmVudEVsZW1lbnQhLm9mZnNldFdpZHRoO1xuICAgICAgICAvLyBDYWxjdWxhdGUgZG9jdW1lbnQgaGVpZ2h0LCB3ZSBtYXggb3V0IGF0IDUwMGsgZHVlIHRvIGJyb3dzZXIgbGltaXRhdGlvbnMgb24gbGFyZ2UgZGl2XG4gICAgICAgIHRoaXMuZG9jdW1lbnRIZWlnaHQgPSA1MDAwMDA7XG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgcGFkZGluZyBuZWVkZWQgdG8gbWFrZSB0aGUgb2Zmc2V0IGNvbHVtbiByaWdodCBhbGlnbmVkXG4gICAgICAgIHRoaXMuaGV4QWRkclBhZGRpbmcgPSBoZXhBZGRyUm93LnBhcmVudEVsZW1lbnQhLmNsaWVudFdpZHRoIC0gaGV4QWRkclJvdy5jbGllbnRXaWR0aDtcblxuXG4gICAgICAgIC8vIFdlIHNldCB0aGUgZG9jdW1lbnQgYmFjayB0byBpdHMgb3JpZ2luYWwgc3RhdGVcbiAgICAgICAgaGV4LmlubmVySFRNTCA9IG9sZEhleEh0bWw7XG4gICAgICAgIGFzY2lpLmlubmVySFRNTCA9IG9sZEFzY2lpSHRtbDtcbiAgICAgICAgaGV4YWRkci5pbm5lckhUTUwgPSBvbGRIZXhBZGRySHRtbDtcblxuICAgICAgICAvLyBTZXRzIHRoZSBjb2x1bW5zIGhlaWdodHMgZm9yIHN0aWNreSBzY3JvbGxpbmcgdG8gd29ya1xuICAgICAgICBjb25zdCBjb2x1bW5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbHVtblwiKSBhcyBIVE1MQ29sbGVjdGlvbk9mPEhUTUxFbGVtZW50PjtcbiAgICAgICAgZm9yIChjb25zdCBjb2x1bW4gb2YgY29sdW1ucykge1xuICAgICAgICAgICAgY29sdW1uLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuZG9jdW1lbnRIZWlnaHR9cHhgO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRHVlIHRvIGFic29sdXRlIHBvc2l0aW9uaW5nIG9uIHRoZSBlZGl0b3IgcG9zaXRpb24gd2UgaGF2ZSB0byBzZXQgYSBsb3Qgb2Ygc2l6ZXMgb3Vyc2VsdmVzIGFzIHRoZSBlbGVtZW50cyBhcmUgbm90IHBhcnQgb2YgdGhlIGRvY3VtZW50IGZsb3dcbiAgICAgICAgY29uc3Qgcm93V3JhcHBlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicm93d3JhcHBlclwiKSBhcyBIVE1MQ29sbGVjdGlvbk9mPEhUTUxEaXZFbGVtZW50PjtcbiAgICAgICAgLy8gU2V0cyB0aGUgaGV4YWRkciBjb2x1bW4gdG8gdGhlIHNhbWUgd2lkdGggYXMgaXRzIGhlYWRlciAoIHRoZSArIDEgaXMgbmVlZGVkIHRvIClcbiAgICAgICAgcm93V3JhcHBlcnNbMF0uc3R5bGUud2lkdGggPSBgJHsoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhlYWRlclwiKVswXSBhcyBIVE1MRWxlbWVudCkub2Zmc2V0V2lkdGh9cHhgO1xuICAgICAgICAvLyBXZSByZW1vdmUgdGhlIHRleHQgZnJvbSB0aGUgaGVhZGVyIHRvIG1ha2UgaXQgbG9vayBsaWtlIGl0J3Mgbm90IHRoZXJlXG4gICAgICAgIGNvbnN0IGhlYWRlckhlaWdodCA9IChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGVhZGVyXCIpWzBdIGFzIEhUTUxFbGVtZW50KS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGVhZGVyXCIpWzBdIGFzIEhUTUxFbGVtZW50KS5pbm5lclRleHQgPSBcIlwiO1xuICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhlYWRlclwiKVswXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUud2lkdGggPSBgJHtyb3dXcmFwcGVyc1swXS5zdHlsZS53aWR0aH1weGA7XG4gICAgICAgIC8vIFRoZSBwbHVzIG9uZSBpcyB0byBhY2NvdW50IGZvciBhbGwgb3RoZXIgaGVhZGVycyBoYXZpbmcgYm9yZGVyc1xuICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhlYWRlclwiKVswXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUuaGVpZ2h0ID0gYCR7aGVhZGVySGVpZ2h0ICsgMX1weGA7XG4gICAgICAgIHJvd1dyYXBwZXJzWzBdLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuZG9jdW1lbnRIZWlnaHR9cHhgO1xuICAgICAgICAvLyBUaGlzIGlzIHRoZSBoZXggc2VjdGlvblxuICAgICAgICAoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhlYWRlclwiKVsxXSBhcyBIVE1MRWxlbWVudCkuc3R5bGUud2lkdGggPSBgJHtoZXhSb3dXaWR0aH1weGA7XG4gICAgICAgIHJvd1dyYXBwZXJzWzFdLnN0eWxlLndpZHRoID0gYCR7aGV4Um93V2lkdGh9cHhgO1xuICAgICAgICByb3dXcmFwcGVyc1sxXS5zdHlsZS5oZWlnaHQgPSBgJHt0aGlzLmRvY3VtZW50SGVpZ2h0fXB4YDtcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgYXNjaWkgIHNlY3Rpb25cbiAgICAgICAgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoZWFkZXJcIilbMl0gYXMgSFRNTEVsZW1lbnQpLnN0eWxlLndpZHRoID0gYCR7YXNjaWlSb3dXaWR0aH1weGA7XG4gICAgICAgIHJvd1dyYXBwZXJzWzJdLnN0eWxlLndpZHRoID0gYCR7YXNjaWlSb3dXaWR0aH1weGA7XG4gICAgICAgIHJvd1dyYXBwZXJzWzJdLnN0eWxlLmhlaWdodCA9IGAke3RoaXMuZG9jdW1lbnRIZWlnaHR9cHhgO1xuXG4gICAgICAgIC8vIENyZWF0ZXMgdGhlIHNjcm9sbEJhciBIYW5kbGVyXG4gICAgICAgIHRoaXMuc2Nyb2xsQmFySGFuZGxlciA9IG5ldyBTY3JvbGxCYXJIYW5kbGVyKFwic2Nyb2xsYmFyXCIsIHRoaXMuZmlsZVNpemUgLyAxNiwgdGhpcy5yb3dIZWlnaHQpO1xuICAgICAgICAvLyBJbnRpYWxpemVzIGEgZmV3IHRoaW5ncyBzdWNoIGFzIHZpZXdwb3J0IHNpemUgYW5kIHRoZSBzY3JvbGxiYXIgcG9zaXRpb25zXG4gICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemUoKTtcblxuICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWRpdG9yLWNvbnRhaW5lclwiKSE7XG4gICAgICAgIC8vIEJpbmQgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAvLyBXaWxsIG5lZWQgdG8gcmVmYWN0b3IgdGhpcyBzZWN0aW9uIHNvb24gYXMgaXRzIGdldHRpbmcgcHJldHR5IG1lc3N5XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZW5kaWFubmVzc1wiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBjaGFuZ2VFbmRpYW5uZXNzKTtcbiAgICAgICAgdGhpcy5lZGl0b3JDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5lZGl0b3JLZXlCb2FyZEhhbmRsZXIuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgdG9nZ2xlSG92ZXIpO1xuICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0b2dnbGVIb3Zlcik7XG5cbiAgICAgICAgLy8gRXZlbnQgaGFuZGxlcyB0byBoYW5kbGUgd2hlbiB0aGUgdXNlciBkcmFncyB0byBjcmVhdGUgYSBzZWxlY3Rpb25cbiAgICAgICAgdGhpcy5lZGl0b3JDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRoaXMubW91c2VEb3duSGFuZGxlci5iaW5kKHRoaXMpKTtcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImNvcHlcIiwgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ/LmNsYXNzTGlzdC5jb250YWlucyhcImhleFwiKSB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50Py5jbGFzc0xpc3QuY29udGFpbnMoXCJhc2NpaVwiKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdEhhbmRsZXIuY29weShldmVudCBhcyBDbGlwYm9hcmRFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBhc3RlXCIsIChldmVudDogRXZlbnQpID0+IHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50Py5jbGFzc0xpc3QuY29udGFpbnMoXCJoZXhcIikgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudD8uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYXNjaWlcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRIYW5kbGVyLnBhc3RlKGV2ZW50IGFzIENsaXBib2FyZEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMuZG9jdW1lbnRSZXNpemUuYmluZCh0aGlzKSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLndpbmRvd0tleWJvYXJkSGFuZGxlci5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVuZGVycyB0aGUgbmV3bHkgcHJvdmlkZWQgcGFja2V0cyBvbnRvIHRoZSBET01cbiAgICAgKiBAcGFyYW0ge1ZpcnR1YWxpemVkUGFja2V0W119IG5ld1BhY2tldHMgdGhlIHBhY2tldHMgd2hpY2ggd2lsbCBiZSByZW5kZXJlZFxuICAgICAqL1xuICAgIHB1YmxpYyByZW5kZXIobmV3UGFja2V0czogVmlydHVhbGl6ZWRQYWNrZXRbXSk6IHZvaWQge1xuICAgICAgICBsZXQgcm93RGF0YTogVmlydHVhbGl6ZWRQYWNrZXRbXSA9IFtdO1xuICAgICAgICBjb25zdCBhZGRyRnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGNvbnN0IGhleEZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBjb25zdCBhc2NpaUZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAvLyBDb25zdHJ1Y3Qgcm93cyBvZiAxNiBhbmQgYWRkIHRoZW0gdG8gdGhlIGFzc29jaWF0ZWQgZnJhZ21lbnRzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmV3UGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcm93RGF0YS5wdXNoKG5ld1BhY2tldHNbaV0pO1xuICAgICAgICAgICAgaWYgKGkgPT09IG5ld1BhY2tldHMubGVuZ3RoIC0gMSB8fCByb3dEYXRhLmxlbmd0aCA9PSAxNikge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5yb3dzWzBdLmdldChyb3dEYXRhWzBdLm9mZnNldC50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlSGV4QWRyZXNzZXMoYWRkckZyYWdtZW50LCByb3dEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb3B1bGF0ZUhleEJvZHkoaGV4RnJhZ21lbnQsIHJvd0RhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvcHVsYXRlQXNjaWlUYWJsZShhc2NpaUZyYWdtZW50LCByb3dEYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcm93RGF0YSA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVuZGVyIHRoZSBmcmFnbWVudHMgdG8gdGhlIERPTVxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhleGFkZHJcIik/LmFwcGVuZENoaWxkKGFkZHJGcmFnbWVudCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGV4Ym9keVwiKT8uYXBwZW5kQ2hpbGQoaGV4RnJhZ21lbnQpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFzY2lpXCIpPy5hcHBlbmRDaGlsZChhc2NpaUZyYWdtZW50KTtcblxuICAgICAgICBpZiAoV2ViVmlld1N0YXRlTWFuYWdlci5nZXRTdGF0ZSgpKSB7XG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZE9mZnNldHMgPSB0aGlzLnNlbGVjdEhhbmRsZXIuZ2V0U2VsZWN0ZWQoKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZE9mZnNldHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SGFuZGxlci5zZXRTZWxlY3RlZChzZWxlY3RlZE9mZnNldHMsIHNlbGVjdGVkT2Zmc2V0c1swXSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGlzIGlzbid0IHRoZSBiZXN0IHBsYWNlIGZvciB0aGlzLCBidXQgaXQgY2FuJ3QgZ28gaW4gdGhlIGNvbnN0cnVjdG9yIGR1ZSB0byB0aGUgZG9jdW1lbnQgbm90IGJlaW5nIGluc3RhbnRpYXRlZCB5ZXRcbiAgICAgICAgICAgIC8vIFRoaXMgZW5zdXJlcyB0aGF0IHRoZSBzcm9sbFRvcCBpcyB0aGUgc2FtZSBhcyBpbiB0aGUgc3RhdGUgb2JqZWN0LCBzaG91bGQgb25seSBiZSBvdXQgb2Ygc3luYyBvbiBpbml0aWFsIHdlYnZpZXcgbG9hZFxuICAgICAgICAgICAgY29uc3Qgc2F2ZWRTY3JvbGxUb3AgPSBXZWJWaWV3U3RhdGVNYW5hZ2VyLmdldFN0YXRlKCkuc2Nyb2xsX3RvcDtcbiAgICAgICAgICAgIGlmIChzYXZlZFNjcm9sbFRvcCAmJiBzYXZlZFNjcm9sbFRvcCAhPT0gdGhpcy5zY3JvbGxCYXJIYW5kbGVyLnZpcnR1YWxTY3JvbGxUb3ApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEJhckhhbmRsZXIucmVzeW5jU2Nyb2xsUG9zaXRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBFdmVudCBoYW5kbGVyIHdoaWNoIGlzIGNhbGxlZCBldmVyeXRpbWUgdGhlIHZpZXdwb3J0IGlzIHJlc2l6ZWRcbiAgICAgKi9cbiAgICBwcml2YXRlIGRvY3VtZW50UmVzaXplKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnZpZXdQb3J0SGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsQmFySGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxCYXJIYW5kbGVyLnVwZGF0ZVNjcm9sbEJhcih0aGlzLmZpbGVTaXplIC8gMTYpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEdldHMgdGhlIG9mZnNldCBvZiB0aGUgcGFja2V0IGF0IHRoZSB0b3Agb2YgdGhlIHZpZXdwb3J0XG4gICAgICogQHJldHVybnMge251bWJlcn0gdGhlIG9mZnNldFxuICAgICAqL1xuICAgIHB1YmxpYyB0b3BPZmZzZXQoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIChNYXRoLmZsb29yKHRoaXMuc2Nyb2xsQmFySGFuZGxlci52aXJ0dWFsU2Nyb2xsVG9wIC8gdGhpcy5yb3dIZWlnaHQpICogMTYpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXRzIHRoZSBvZmZzZXQgb2YgdGhlIHBhY2tldCBhdCB0aGUgYm90dG9tIHJpZ2h0IG9mIHRoZSB2aWV3cG9ydFxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IHRoZSBvZmZzZXRcbiAgICAgKi9cbiAgICBwdWJsaWMgYm90dG9tT2Zmc2V0KCk6IG51bWJlciB7XG4gICAgICAgIGNvbnN0IGNsaWVudEhlaWdodCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaHRtbFwiKVswXS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIGNvbnN0IG51bVJvd3NJblZpZXdwb3J0ID0gTWF0aC5mbG9vcihjbGllbnRIZWlnaHQgLyB0aGlzLnJvd0hlaWdodCk7XG4gICAgICAgIC8vIElmIGl0J3MgdGhlIGVuZCBvZiB0aGUgZmlsZSBpdCB3aWxsIGZhbGwgdG8gdGhlIHRoaXMuZmlsZVNpemUgLSAxIGNhc2VcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKCh0aGlzLnRvcE9mZnNldCgpICsgKG51bVJvd3NJblZpZXdwb3J0ICogMTYpKSAtIDEsIHRoaXMuZmlsZVNpemUgLSAxKTtcbiAgICB9ICAgXG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUmV0cmlldmVzIHRoZSBZIHBvc2l0aW9uIGEgZ2l2ZW4gb2Zmc2V0IGlzIGF0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCBUaGUgb2Zmc2V0IHRvIGNhbGN1bGF0ZSB0aGUgeSBwb3NpdGlvbiBvZlxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBZIHBvc2l0aW9uIHRoZSBvZmZzZXQgaXMgYXRcbiAgICAgKi9cbiAgICBwdWJsaWMgb2Zmc2V0WVBvcyhvZmZzZXQ6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAoTWF0aC5mbG9vcihvZmZzZXQgLyAxNikgKiB0aGlzLnJvd0hlaWdodCkgJSB0aGlzLmRvY3VtZW50SGVpZ2h0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHZXRzIGV4ZWN1dGVkIGV2ZXJ5dGltZSB0aGUgZG9jdW1lbnQgaXMgc2Nyb2xsZWQsIHRoaXMgdGFsa3MgdG8gdGhlIGRhdGEgbGF5ZXIgdG8gcmVxdWVzdCBtb3JlIHBhY2tldHNcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2Nyb2xsSGFuZGxlcigpOiBQcm9taXNlPHZvaWRbXT4ge1xuICAgICAgICAvLyBXZSB3YW50IHRvIGVuc3VyZSB0aGVyZSBhcmUgYXQgbGVhc3QgMiBjaHVua3MgYWJvdmUgdXMgYW5kIDQgY2h1bmtzIGJlbG93IHVzXG4gICAgICAgIC8vIFRoZXNlIG51bWJlcnMgd2VyZSBjaG9zZW4gYXJiaXRyYXJpbHkgdW5kZXIgdGhlIGFzc3VtcHRpb24gdGhhdCBzY3JvbGxpbmcgZG93biBpcyBtb3JlIGNvbW1vblxuICAgICAgICBjb25zdCBjaHVua0hhbmRsZXJSZXNwb25zZSA9IGF3YWl0IGNodW5rSGFuZGxlci5lbnN1cmVCdWZmZXIodmlydHVhbEhleERvY3VtZW50LnRvcE9mZnNldCgpLCB7XG4gICAgICAgICAgICB0b3BCdWZmZXJTaXplOiAyLFxuICAgICAgICAgICAgYm90dG9tQnVmZmVyU2l6ZTogNFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgcmVtb3ZlZENodW5rczogbnVtYmVyW10gPSBjaHVua0hhbmRsZXJSZXNwb25zZS5yZW1vdmVkO1xuICAgICAgICAvLyBXZSByZW1vdmUgdGhlIGNodW5rcyBmcm9tIHRoZSBET00gYXMgdGhlIGNodW5rIGhhbmRsZXIgaXMgbm8gbG9uZ2VyIHRyYWNraW5nIHRoZW1cbiAgICAgICAgZm9yIChjb25zdCBjaHVuayBvZiByZW1vdmVkQ2h1bmtzKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gY2h1bms7IGkgPCBjaHVuayArIGNodW5rSGFuZGxlci5jaHVua1NpemU7IGkgKz0gMTYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd3NbMF0uZ2V0KGkudG9TdHJpbmcoKSk/LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucm93c1swXS5kZWxldGUoaS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd3NbMV0uZ2V0KGkudG9TdHJpbmcoKSk/LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucm93c1sxXS5kZWxldGUoaS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd3NbMl0uZ2V0KGkudG9TdHJpbmcoKSk/LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucm93c1syXS5kZWxldGUoaS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2h1bmtIYW5kbGVyUmVzcG9uc2UucmVxdWVzdGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW5kZXJzIHRoZSBndXR0ZXIgd2hpY2ggaG9sZHMgdGhlIGhleCBhZGRyZXNzIG1lbW9yeSBvZmZzZXRcbiAgICAgKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IGZyYWdtZW50IFRoZSBmcmFnbWVudCB3aGljaCBlbGVtZW50cyBnZXQgYWRkZWQgdG9cbiAgICAgKiBAcGFyYW0ge1ZpcnR1YWxpemVkUGFja2V0W119IHJvd0RhdGEgQW4gYXJyYXkgb2YgMTYgYnl0ZXMgcmVwcmVzZW50aW5nIG9uZSByb3dcbiAgICAgKi9cbiAgICBwcml2YXRlIHBvcHVsYXRlSGV4QWRyZXNzZXMoZnJhZ21lbnQ6IERvY3VtZW50RnJhZ21lbnQsIHJvd0RhdGE6IFZpcnR1YWxpemVkUGFja2V0W10pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gcm93RGF0YVswXS5vZmZzZXQ7XG4gICAgICAgIGNvbnN0IGFkZHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBhZGRyLmNsYXNzTmFtZSA9IFwicm93XCI7XG4gICAgICAgIGFkZHIuc2V0QXR0cmlidXRlKFwiZGF0YS1vZmZzZXRcIiwgb2Zmc2V0LnRvU3RyaW5nKCkpO1xuICAgICAgICBhZGRyLmlubmVyVGV4dCA9IHBhZChvZmZzZXQudG9TdHJpbmcoMTYpLCA4KS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChhZGRyKTtcbiAgICAgICAgdGhpcy5yb3dzWzBdLnNldChvZmZzZXQudG9TdHJpbmcoKSwgYWRkcik7XG4gICAgICAgIC8vIFdlIGFkZCBhIGxlZnQgcHggb2Zmc2V0IHRvIGVmZmVjdGl2ZWx5IHJpZ2h0IGFsaWduIHRoZSBjb2x1bW5cbiAgICAgICAgYWRkci5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5oZXhBZGRyUGFkZGluZ31weGA7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlUm93KGFkZHIsIG9mZnNldCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbmRlcnMgdGhlIGRlY29kZWQgdGV4dCBzZWN0aW9uXG4gICAgICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSBmcmFnbWVudCBUaGUgZnJhZ21lbnQgd2hpY2ggZWxlbWVudHMgZ2V0IGFkZGVkIHRvXG4gICAgICogQHBhcmFtIHtWaXJ0dWFsaXplZFBhY2tldFtdfSByb3dEYXRhIEFuIGFycmF5IG9mIDE2IGJ5dGVzIHJlcHJlc2VudGluZyBvbmUgcm93XG4gICAgICovXG4gICAgcHJpdmF0ZSBwb3B1bGF0ZUFzY2lpVGFibGUoZnJhZ21lbnQ6IERvY3VtZW50RnJhZ21lbnQsIHJvd0RhdGE6IFZpcnR1YWxpemVkUGFja2V0W10pOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgcm93LmNsYXNzTmFtZSA9IFwicm93XCI7XG4gICAgICAgIGNvbnN0IHJvd09mZnNldCA9IHJvd0RhdGFbMF0ub2Zmc2V0LnRvU3RyaW5nKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93RGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgYXNjaWlfZWxlbWVudCA9IHRoaXMuY3JlYXRlQXNjaWlFbGVtZW50KHJvd0RhdGFbaV0pO1xuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGFzY2lpX2VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKHJvdyk7XG4gICAgICAgIHRoaXMucm93c1syXS5zZXQocm93T2Zmc2V0LCByb3cpO1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZVJvdyhyb3csIHBhcnNlSW50KHJvd09mZnNldCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBSZW5kZXJzIHRoZSBkZWNvZGVkIHRleHQgc2VjdGlvblxuICAgICAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gZnJhZ21lbnQgVGhlIGZyYWdtZW50IHdoaWNoIGVsZW1lbnRzIGdldCBhZGRlZCB0b1xuICAgICAqIEBwYXJhbSB7VmlydHVhbGl6ZWRQYWNrZXRbXX0gcm93RGF0YSBBbiBhcnJheSBvZiAxNiBieXRlcyByZXByZXNlbnRpbmcgb25lIHJvd1xuICAgICAqL1xuICAgIHByaXZhdGUgcG9wdWxhdGVIZXhCb2R5KGZyYWdtZW50OiBEb2N1bWVudEZyYWdtZW50LCByb3dEYXRhOiBWaXJ0dWFsaXplZFBhY2tldFtdKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHJvdy5jbGFzc05hbWUgPSBcInJvd1wiO1xuICAgICAgICBjb25zdCByb3dPZmZzZXQgPSByb3dEYXRhWzBdLm9mZnNldC50b1N0cmluZygpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd0RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGhleF9lbGVtZW50ID0gdGhpcy5jcmVhdGVIZXhFbGVtZW50KHJvd0RhdGFbaV0pO1xuICAgICAgICAgICAgcm93LmFwcGVuZENoaWxkKGhleF9lbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZChyb3cpO1xuICAgICAgICB0aGlzLnJvd3NbMV0uc2V0KHJvd09mZnNldCwgcm93KTtcbiAgICAgICAgdGhpcy50cmFuc2xhdGVSb3cocm93LCBwYXJzZUludChyb3dPZmZzZXQpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhIHNpbmdsZSBoZXggc3BhbiBlbGVtZW50IGZyb20gYSBwYWNrZXRcbiAgICAgKiBAcGFyYW0ge1ZpcnR1YWxpemVkUGFja2V0fSBwYWNrZXQgVGhlIFZpcnR1YWxpemVkUGFja2V0IGhvbGRpbmcgdGhlIGRhdGEgbmVlZGVkIHRvIGdlbmVyYXRlIHRoZSBlbGVtZW50XG4gICAgICogQHJldHVybnMge0hUTUxTcGFuRWxlbWVudH0gVGhlIGh0bWwgc3BhbiBlbGVtZW50IHJlYWR5IHRvIGJlIGFkZGVkIHRvIHRoZSBET01cbiAgICAgKi9cbiAgICBwcml2YXRlIGNyZWF0ZUhleEVsZW1lbnQocGFja2V0OiBWaXJ0dWFsaXplZFBhY2tldCk6IEhUTUxTcGFuRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGhleF9lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgIGhleF9lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJoZXhcIik7XG4gICAgICAgIGhleF9lbGVtZW50LmNsYXNzTGlzdC5hZGQoYGNlbGwtb2Zmc2V0LSR7cGFja2V0Lm9mZnNldC50b1N0cmluZygpfWApO1xuICAgICAgICAvLyBJZiB0aGUgb2Zmc2V0IGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBmaWxlU2l6ZSB0aGF0J3Mgb3VyIHBsYWNlaG9sZGVyIHNvIGl0J3MganVzdCBhICsgc3ltYm9sIHRvIHNpZ25hbCB5b3UgY2FuIHR5cGUgYW5kIGFkZCBieXRlcyB0aGVyZVxuICAgICAgICBpZiAocGFja2V0Lm9mZnNldCA8IHRoaXMuZmlsZVNpemUpIHtcbiAgICAgICAgICAgIGhleF9lbGVtZW50LmlubmVyVGV4dCA9IHBhZChwYWNrZXQuZGF0YS50b0hleCgpLCAyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhleF9lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhZGQtY2VsbFwiKTtcbiAgICAgICAgICAgIGhleF9lbGVtZW50LmlubmVyVGV4dCA9IFwiK1wiO1xuICAgICAgICB9XG4gICAgICAgIGhleF9lbGVtZW50LnRhYkluZGV4ID0gLTE7XG4gICAgICAgIGhleF9lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIHRvZ2dsZUhvdmVyKTtcbiAgICAgICAgcmV0dXJuIGhleF9lbGVtZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBDcmVhdGVzIGEgc2luZ2xlIGFzY2lpIHNwYW4gZWxlbWVudCBmcm9tIGEgcGFja2V0XG4gICAgICogQHBhcmFtIHtWaXJ0dWFsaXplZFBhY2tldH0gcGFja2V0IFRoZSBWaXJ0dWFsaXplZFBhY2tldCBob2xkaW5nIHRoZSBkYXRhIG5lZWRlZCB0byBnZW5lcmF0ZSB0aGUgZWxlbWVudFxuICAgICAqIEByZXR1cm5zIHtIVE1MU3BhbkVsZW1lbnR9IFRoZSBodG1sIHNwYW4gZWxlbWVudCByZWFkeSB0byBiZSBhZGRlZCB0byB0aGUgRE9NXG4gICAgICovXG4gICAgcHJpdmF0ZSBjcmVhdGVBc2NpaUVsZW1lbnQocGFja2V0OiBWaXJ0dWFsaXplZFBhY2tldCk6IEhUTUxTcGFuRWxlbWVudCB7XG4gICAgICAgIGNvbnN0IGFzY2lpX2VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgYXNjaWlfZWxlbWVudC5jbGFzc0xpc3QuYWRkKGBjZWxsLW9mZnNldC0ke3BhY2tldC5vZmZzZXQudG9TdHJpbmcoKX1gKTtcbiAgICAgICAgYXNjaWlfZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYXNjaWlcIik7XG4gICAgICAgIC8vIElmIHRoZSBvZmZzZXQgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIGZpbGVTaXplIHRoYXQncyBvdXIgcGxhY2Vob2xkZXIgc28gaXQncyBqdXN0IGEgKyBzeW1ib2wgdG8gc2lnbmFsIHlvdSBjYW4gdHlwZSBhbmQgYWRkIGJ5dGVzIHRoZXJlXG4gICAgICAgIGlmIChwYWNrZXQub2Zmc2V0IDwgdGhpcy5maWxlU2l6ZSkge1xuICAgICAgICAgICAgdXBkYXRlQXNjaWlWYWx1ZShwYWNrZXQuZGF0YSwgYXNjaWlfZWxlbWVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhc2NpaV9lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhZGQtY2VsbFwiKTtcbiAgICAgICAgICAgIGFzY2lpX2VsZW1lbnQuaW5uZXJUZXh0ID0gXCIrXCI7XG4gICAgICAgIH1cbiAgICAgICAgYXNjaWlfZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCB0b2dnbGVIb3Zlcik7XG4gICAgICAgIGFzY2lpX2VsZW1lbnQudGFiSW5kZXggPSAtMTtcbiAgICAgICAgcmV0dXJuIGFzY2lpX2VsZW1lbnQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIE1vdmVzIHRoZSByb3dzIGZyb20gd2hlcmUgdGhleSB3ZXJlIHBsYWNlZCB0byB3aGVyZSB0aGV5IGFyZSBzdXBwb3NlZCB0byBiZSAodGhpcyBpcyBkdWUgdG8gYWJzb2x1dGUgcG9zaXRpb25pbmcpXG4gICAgICogQHBhcmFtIHtIVE1MRGl2RWxlbWVudH0gcm93ICBUaGUgRGl2RWxlbWVudCB3aGljaCBuZWVkcyB0byBiZSBtb3ZlZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgVGhlIG9mZnNldCBvZiB0aGUgZWxlbWVudCBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSByb3dcbiAgICAgKi9cbiAgICBwcml2YXRlIHRyYW5zbGF0ZVJvdyhyb3c6IEhUTUxEaXZFbGVtZW50LCBvZmZzZXQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAvLyBHZXQgdGhlIGV4cGVjdGVkIFkgdmFsdWVcbiAgICAgICAgY29uc3QgZXhwZWN0ZWRZID0gdGhpcy5vZmZzZXRZUG9zKG9mZnNldCk7XG4gICAgICAgIHJvdy5zdHlsZS50b3AgPSBgJHtleHBlY3RlZFl9cHhgO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHRoZSBjbGljayBldmVudHMgd2l0aGluIHRoZSBlZGl0b3JcbiAgICAgKiBAcGFyYW0ge01vdXNlRXZlbnR9IGV2ZW50IFRoZSBNb3VzZUV2ZW50IHBhc3NlZCB0byB0aGUgZXZlbnQgaGFuZGxlci5cbiAgICAgKi9cbiAgICBwcml2YXRlIGNsaWNrSGFuZGxlcihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9ucyA+IDEpIHJldHVybjtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBpZiAoIXRhcmdldCB8fCBpc05hTihnZXRFbGVtZW50c09mZnNldCh0YXJnZXQpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5lZGl0SGFuZGxlci5jb21wbGV0ZVBlbmRpbmdFZGl0cygpO1xuICAgICAgICBjb25zdCBvZmZzZXQgPSBnZXRFbGVtZW50c09mZnNldCh0YXJnZXQpO1xuICAgICAgICBpZiAoZXZlbnQuc2hpZnRLZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0U2VsZWN0aW9uID0gdGhpcy5zZWxlY3RIYW5kbGVyLmdldFNlbGVjdGlvblN0YXJ0KCk7XG4gICAgICAgICAgICBpZiAoc3RhcnRTZWxlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SGFuZGxlci5zZXRGb2N1c2VkKG9mZnNldCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWluID0gTWF0aC5taW4oc3RhcnRTZWxlY3Rpb24sIG9mZnNldCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4ID0gTWF0aC5tYXgoc3RhcnRTZWxlY3Rpb24sIG9mZnNldCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RIYW5kbGVyLnNldFNlbGVjdGVkKGNyZWF0ZU9mZnNldFJhbmdlKG1pbiwgbWF4KSwgc3RhcnRTZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgIHRhcmdldC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEhhbmRsZXIuc2V0Rm9jdXNlZChvZmZzZXQpO1xuICAgICAgICAgICAgaWYgKGV2ZW50LmN0cmxLZXkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLnNlbGVjdEhhbmRsZXIuZ2V0U2VsZWN0ZWQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZmlsdGVyKGkgPT4gaSAhPT0gb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uLmxlbmd0aCA9PT0gbmV3U2VsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEhhbmRsZXIuc2V0U2VsZWN0ZWQoWy4uLm5ld1NlbGVjdGlvbiwgb2Zmc2V0XSwgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEhhbmRsZXIuc2V0U2VsZWN0ZWQobmV3U2VsZWN0aW9uLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RIYW5kbGVyLnNldFNlbGVjdGVkKFtvZmZzZXRdLCBvZmZzZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVJbnNwZWN0b3IoKTtcbiAgICAgICAgICAgIHRhcmdldC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyB0aGUgbW91c2Vkb3duIGV2ZW50cyB3aXRoaW4gdGhlIGVkaXRvclxuICAgICAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnQgVGhlIE1vdXNlRXZlbnQgcGFzc2VkIHRvIHRoZSBldmVudCBoYW5kbGVyLlxuICAgICAqL1xuICAgIHByaXZhdGUgbW91c2VEb3duSGFuZGxlcihldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoZXZlbnQuYnV0dG9ucyAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBpZiAoIXRhcmdldCB8fCBpc05hTihnZXRFbGVtZW50c09mZnNldCh0YXJnZXQpKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5lZGl0SGFuZGxlci5jb21wbGV0ZVBlbmRpbmdFZGl0cygpO1xuICAgICAgICBjb25zdCBvZmZzZXQgPSBnZXRFbGVtZW50c09mZnNldCh0YXJnZXQpO1xuICAgICAgICBjb25zdCBzdGFydE1vdXNlTW92ZU9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgY29uc3Qgc3RhcnRTZWxlY3Rpb24gPSBldmVudC5zaGlmdEtleSA/IHRoaXMuc2VsZWN0SGFuZGxlci5nZXRTZWxlY3Rpb25TdGFydCgpIDogb2Zmc2V0O1xuXG4gICAgICAgIGNvbnN0IG9uTW91c2VNb3ZlID0gKGV2ZW50OiBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuYnV0dG9ucyAhPT0gMSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgaWYgKCF0YXJnZXQgfHwgaXNOYU4oZ2V0RWxlbWVudHNPZmZzZXQodGFyZ2V0KSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IGdldEVsZW1lbnRzT2Zmc2V0KHRhcmdldCk7XG4gICAgICAgICAgICBpZiAoc3RhcnRTZWxlY3Rpb24gIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IHN0YXJ0TW91c2VNb3ZlT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RIYW5kbGVyLnNldEZvY3VzZWQob2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBtaW4gPSBNYXRoLm1pbihzdGFydFNlbGVjdGlvbiwgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXggPSBNYXRoLm1heChzdGFydFNlbGVjdGlvbiwgb2Zmc2V0KTtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdEhhbmRsZXIuc2V0U2VsZWN0ZWQoY3JlYXRlT2Zmc2V0UmFuZ2UobWluLCBtYXgpLCBzdGFydFNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBvbk1vdXNlVXAgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvckNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2V1cFwiLCBvbk1vdXNlVXApO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZWRpdG9yQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgb25Nb3VzZVVwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gSGFuZGxlcyBhbGwga2V5Ym9hcmQgaW50ZXJhY3Rpb24gd2l0aCB0aGUgbWFpbiBlZGl0b3Igd2luZG93XG4gICAgICogQHBhcmFtIHtLZXlib2FyZEV2ZW50fSBldmVudCBUaGUgS2V5Ym9hcmRFdmVudCBwYXNzZWQgdG8gdGhlIGV2ZW50IGhhbmRsZXIuXG4gICAgICovXG4gICAgcHJpdmF0ZSBhc3luYyBlZGl0b3JLZXlCb2FyZEhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKCFldmVudCB8fCAhZXZlbnQudGFyZ2V0KSByZXR1cm47XG4gICAgICAgIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IG1vZGlmaWVyS2V5UHJlc3NlZCA9IGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuYWx0S2V5IHx8IGV2ZW50LmN0cmxLZXk7XG4gICAgICAgIGlmICgoZXZlbnQua2V5Q29kZSA+PSAzNyAmJiBldmVudC5rZXlDb2RlIDw9IDQwIC8qQXJyb3dzKi8pXG4gICAgICAgICAgICB8fCAoKGV2ZW50LmtleUNvZGUgPT09IDM1IC8qRW5kKi8gfHwgZXZlbnQua2V5Q29kZSA9PT0gMzYgLypIb21lKi8pICYmICFldmVudC5jdHJsS2V5KSkge1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0ZUJ5S2V5KGV2ZW50LmtleUNvZGUsIHRhcmdldEVsZW1lbnQsIGV2ZW50LnNoaWZ0S2V5KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIW1vZGlmaWVyS2V5UHJlc3NlZCAmJiB0YXJnZXRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcImhleFwiKSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5lZGl0SGFuZGxlci5lZGl0SGV4KHRhcmdldEVsZW1lbnQsIGV2ZW50LmtleSk7XG4gICAgICAgICAgICAvLyBJZiB0aGlzIGNlbGwgaGFzIGJlZW4gZWRpdGVkXG4gICAgICAgICAgICBpZiAodGFyZ2V0RWxlbWVudC5pbm5lclRleHQudHJpbVJpZ2h0KCkubGVuZ3RoID09IDIgJiYgdGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0aW5nXCIpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZWRpdGluZ1wiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRlQnlLZXkoMzksIHRhcmdldEVsZW1lbnQsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghbW9kaWZpZXJLZXlQcmVzc2VkICYmIGV2ZW50LmtleS5sZW5ndGggPT09IDEgJiYgdGFyZ2V0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJhc2NpaVwiKSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5lZGl0SGFuZGxlci5lZGl0QXNjaWkodGFyZ2V0RWxlbWVudCwgZXZlbnQua2V5KTtcbiAgICAgICAgICAgIHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImVkaXRpbmdcIik7XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRlQnlLZXkoMzksIHRhcmdldEVsZW1lbnQsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB0aGlzLmVkaXRIYW5kbGVyLmNvbXBsZXRlUGVuZGluZ0VkaXRzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIEhhbmRsZXMga2V5Ym9hcmQgaXRlcmF0aW9uIHdpdGggdGhlIHdpbmRvd1xuICAgICAqIEBwYXJhbSB7S2V5Ym9hcmRFdmVudH0gZXZlbnQgVGhlIEtleWJvYXJkRXZlbnQgcGFzc2VkIHRvIHRoZSBldmVudCBoYW5kbGVyLlxuICAgICAqL1xuICAgIHByaXZhdGUgd2luZG93S2V5Ym9hcmRIYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghZXZlbnQgfHwgIWV2ZW50LnRhcmdldCkgcmV0dXJuO1xuICAgICAgICBpZiAoKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleSkgJiYgZXZlbnQua2V5ID09PSBcImZcIikge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgcHJlc3NlcyBjdHJsIC8gY21kICsgZiB3ZSBmb2N1cyB0aGUgc2VhcmNoIGJveCBhbmQgY2hhbmdlIHRoZSBkcm9wZG93blxuICAgICAgICAgICAgdGhpcy5zZWFyY2hIYW5kbGVyLnNlYXJjaEtleWJpbmRpbmdIYW5kbGVyKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoKGV2ZW50LmtleUNvZGUgPT0gMzYgfHwgZXZlbnQua2V5Q29kZSA9PSAzNSkgJiYgZXZlbnQuY3RybEtleSkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgcHJlc3NlZCBDVFJMICsgSG9tZSBvciBDVFJMICsgRW5kIHdlIHNjcm9sbCB0aGUgd2hvbGUgZG9jdW1lbnRcbiAgICAgICAgICAgIGV2ZW50LmtleUNvZGUgPT0gMzYgPyB0aGlzLnNjcm9sbEJhckhhbmRsZXIuc2Nyb2xsVG9Ub3AoKSA6IHRoaXMuc2Nyb2xsQmFySGFuZGxlci5zY3JvbGxUb0JvdHRvbSgpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT0gMzMpIHtcbiAgICAgICAgICAgIC8vIFBHIFVwXG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJhckhhbmRsZXIucGFnZSh0aGlzLnZpZXdQb3J0SGVpZ2h0LCBcInVwXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT0gMzQpIHtcbiAgICAgICAgICAgIC8vIFBHIERvd25cbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFySGFuZGxlci5wYWdlKHRoaXMudmlld1BvcnRIZWlnaHQsIFwiZG93blwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHdoZW4gdGhlIHVzZXIgdXNlcyB0aGUgYXJyb3cga2V5cywgSG9tZSBvciBFbmQgdG8gbmF2aWdhdGUgdGhlIGVkaXRvclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBrZXlDb2RlIFRoZSBrZXlDb2RlIG9mIHRoZSBrZXkgcHJlc3NlZFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldEVsZW1lbnQgVGhlIGVsZW1lbnRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzUmFuZ2VTZWxlY3Rpb24gSWYgd2UgYXJlIHNlbGVjdGluZyBhIHJhbmdlIChzaGlmdCBrZXkgcHJlc3NlZClcbiAgICAgKi9cbiAgICBwcml2YXRlIG5hdmlnYXRlQnlLZXkoa2V5Q29kZTogbnVtYmVyLCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCwgaXNSYW5nZVNlbGVjdGlvbjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBsZXQgbmV4dDogSFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gICAgICAgIHN3aXRjaCAoa2V5Q29kZSkge1xuICAgICAgICAgICAgY2FzZSAzNTpcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdXNlciBwcmVzc2VzIEVuZCB3ZSBnbyB0byB0aGUgZW5kIG9mIHRoZSBsaW5lXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyZW50Q2hpbGRyZW4gPSB0YXJnZXRFbGVtZW50LnBhcmVudEVsZW1lbnQhLmNoaWxkcmVuO1xuICAgICAgICAgICAgICAgIG5leHQgPSBwYXJlbnRDaGlsZHJlbltwYXJlbnRDaGlsZHJlbi5sZW5ndGggLSAxXSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzY6XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIHVzZXIgcHJlc3NlcyBIb21lIHdlIGdvIHRvIHRoZSBmcm9udCBvZiB0aGUgbGluZVxuICAgICAgICAgICAgICAgIG5leHQgPSB0YXJnZXRFbGVtZW50LnBhcmVudEVsZW1lbnQhLmNoaWxkcmVuWzBdIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICAvLyBsZWZ0XG4gICAgICAgICAgICAgICAgbmV4dCA9ICh0YXJnZXRFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcgfHwgdGFyZ2V0RWxlbWVudC5wYXJlbnRFbGVtZW50Py5wcmV2aW91c0VsZW1lbnRTaWJsaW5nPy5jaGlsZHJlblsxNV0pIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICAvLyB1cFxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzX2Fib3ZlID0gZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQoZ2V0RWxlbWVudHNPZmZzZXQodGFyZ2V0RWxlbWVudCkgLSAxNik7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRzX2Fib3ZlLmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgbmV4dCA9IHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGV4XCIpID8gZWxlbWVudHNfYWJvdmVbMF0gOiBlbGVtZW50c19hYm92ZVsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzk6XG4gICAgICAgICAgICAgICAgLy8gcmlnaHRcbiAgICAgICAgICAgICAgICBuZXh0ID0gKHRhcmdldEVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nIHx8IHRhcmdldEVsZW1lbnQucGFyZW50RWxlbWVudD8ubmV4dEVsZW1lbnRTaWJsaW5nPy5jaGlsZHJlblswXSkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQwOlxuICAgICAgICAgICAgICAgIC8vIGRvd25cbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50c19iZWxvdyA9IGdldEVsZW1lbnRzV2l0aEdpdmVuT2Zmc2V0KE1hdGgubWluKGdldEVsZW1lbnRzT2Zmc2V0KHRhcmdldEVsZW1lbnQpICsgMTYsIHRoaXMuZmlsZVNpemUgLSAxKSk7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRzX2JlbG93Lmxlbmd0aCA9PT0gMCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgbmV4dCA9IHRhcmdldEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGV4XCIpID8gZWxlbWVudHNfYmVsb3dbMF0gOiBlbGVtZW50c19iZWxvd1sxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dCAmJiBuZXh0LnRhZ05hbWUgPT09IFwiU1BBTlwiKSB7XG4gICAgICAgICAgICBjb25zdCBuZXh0UmVjdCA9IG5leHQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAodGhpcy52aWV3UG9ydEhlaWdodCA8PSBuZXh0UmVjdC5ib3R0b20pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbEJhckhhbmRsZXIuc2Nyb2xsRG9jdW1lbnQoMSwgXCJkb3duXCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuZXh0UmVjdC50b3AgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFySGFuZGxlci5zY3JvbGxEb2N1bWVudCgxLCBcInVwXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBnZXRFbGVtZW50c09mZnNldChuZXh0KTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SGFuZGxlci5zZXRGb2N1c2VkKG9mZnNldCk7XG4gICAgICAgICAgICBjb25zdCBzdGFydFNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0SGFuZGxlci5nZXRTZWxlY3Rpb25TdGFydCgpO1xuICAgICAgICAgICAgaWYgKGlzUmFuZ2VTZWxlY3Rpb24gJiYgc3RhcnRTZWxlY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1pbiA9IE1hdGgubWluKHN0YXJ0U2VsZWN0aW9uLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KHN0YXJ0U2VsZWN0aW9uLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SGFuZGxlci5zZXRTZWxlY3RlZChjcmVhdGVPZmZzZXRSYW5nZShtaW4sIG1heCksIHN0YXJ0U2VsZWN0aW9uKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RIYW5kbGVyLnNldFNlbGVjdGVkKFtvZmZzZXRdLCBvZmZzZXQpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlSW5zcGVjdG9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUG9wdWxhdGVzIHRoZSBpbnNwZWN0b3IgZGF0YSB3aXRoIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBlbGVtZW50LlxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlSW5zcGVjdG9yKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLnNlbGVjdEhhbmRsZXIuZ2V0Rm9jdXNlZCgpO1xuICAgICAgICBpZiAob2Zmc2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZ2V0RWxlbWVudHNXaXRoR2l2ZW5PZmZzZXQob2Zmc2V0KTtcbiAgICAgICAgICAgIGNvbnN0IGJ5dGVfb2JqID0gcmV0cmlldmVTZWxlY3RlZEJ5dGVPYmplY3QoZWxlbWVudHMpITtcbiAgICAgICAgICAgIGNvbnN0IGxpdHRsZUVuZGlhbiA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVuZGlhbm5lc3NcIikgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWUgPT09IFwibGl0dGxlXCI7XG4gICAgICAgICAgICBwb3B1bGF0ZURhdGFJbnNwZWN0b3IoYnl0ZV9vYmosIGxpdHRsZUVuZGlhbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKioqXG4gICAgICogQGRlc2NyaXB0aW9uIEdpdmVuIGFuIGFycmF5IG9mIG9mZnNldHMsIHNlbGVjdHMgdGhlIGNvcnJlc3BvbmRpbmcgZWxlbWVudHMuXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gb2Zmc2V0cyBUaGUgb2Zmc2V0cyBvZiB0aGUgZWxlbWVudHMgeW91IHdhbnQgdG8gc2VsZWN0XG4gICAgICovXG4gICAgcHVibGljIHNldFNlbGVjdGlvbihvZmZzZXRzOiBudW1iZXJbXSk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdEhhbmRsZXIuc2V0U2VsZWN0ZWQob2Zmc2V0cywgb2Zmc2V0cy5sZW5ndGggPiAwID8gb2Zmc2V0c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgfVxuXG4gICAgLyoqKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhbiBvZmZzZXQsIHNlbGVjdHMgdGhlIGVsZW1lbnRzIGFuZCBmb2N1c2VzIHRoZSBlbGVtZW50IGluIHRoZSBzYW1lIGNvbHVtbiBhcyBwcmV2aW91cyBmb2N1cy4gRGVmYXVsdHMgdG8gaGV4LlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvZmZzZXQgVGhlIG9mZnNldCBvZiB0aGUgZWxlbWVudHMgeW91IHdhbnQgdG8gc2VsZWN0IGFuZCBmb2N1c1xuICAgICAqL1xuICAgIHB1YmxpYyBmb2N1c0VsZW1lbnRXaXRoR2l2ZW5PZmZzZXQob2Zmc2V0OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZWxlbWVudHMgPSBnZXRFbGVtZW50c1dpdGhHaXZlbk9mZnNldChvZmZzZXQpO1xuICAgICAgICBpZiAoZWxlbWVudHMubGVuZ3RoICE9IDIpIHJldHVybjtcbiAgICAgICAgdGhpcy5zZWxlY3RIYW5kbGVyLnNldFNlbGVjdGVkKFtvZmZzZXRdLCBvZmZzZXQpO1xuICAgICAgICAvLyBJZiBhbiBhc2NpaSBlbGVtZW50IGlzIGN1cnJlbnRseSBmb2N1c2VkIHRoZW4gd2UgZm9jdXMgdGhhdCwgZWxzZSB3ZSBmb2N1cyBoZXhcbiAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LmNsYXNzTGlzdC5jb250YWlucyhcInJpZ2h0XCIpKSB7XG4gICAgICAgICAgICBlbGVtZW50c1sxXS5mb2N1cygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudHNbMF0uZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBVbmRvZXMgdGhlIGdpdmVuIGVkaXRzIGZyb20gdGhlIGRvY3VtZW50XG4gICAgICogQHBhcmFtIHtFZGl0TWVzc2FnZVtdfSBlZGl0cyBUaGUgZWRpdHMgdGhhdCB3aWxsIGJlIHVuZG9uZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBmaWxlU2l6ZSBUaGUgc2l6ZSBvZiB0aGUgZmlsZSwgdGhlIGV4dCBob3N0IHRyYWNrcyB0aGlzIGFuZCBwYXNzZXMgaXQgYmFja1xuICAgICAqL1xuICAgIHB1YmxpYyB1bmRvKGVkaXRzOiBFZGl0TWVzc2FnZVtdLCBmaWxlU2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsZVNpemUgPSBmaWxlU2l6ZTtcbiAgICAgICAgdGhpcy5lZGl0SGFuZGxlci51bmRvKGVkaXRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUmVkb2VzIHRoZSBnaXZlbiBlZGl0cyBmcm9tIHRoZSBkb2N1bWVudFxuICAgICAqIEBwYXJhbSB7RWRpdE1lc3NhZ2VbXX0gZWRpdHMgVGhlIGVkaXRzIHRoYXQgd2lsbCBiZSByZWRvbmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmlsZVNpemUgVGhlIHNpemUgb2YgdGhlIGZpbGUsIHRoZSBleHQgaG9zdCB0cmFja3MgdGhpcyBhbmQgcGFzc2VzIGl0IGJhY2tlZG9uZVxuICAgICAqL1xuICAgIHB1YmxpYyByZWRvKGVkaXRzOiBFZGl0TWVzc2FnZVtdLCBmaWxlU2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWRpdEhhbmRsZXIucmVkbyhlZGl0cyk7XG4gICAgICAgIHRoaXMuZmlsZVNpemUgPSBmaWxlU2l6ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ2FsbGVkIHdoZW4gdGhlIHVzZXIgZXhlY3V0ZXMgcmV2ZXJ0XG4gICAgICovXG4gICAgcHVibGljIHJldmVydChmaWxlU2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsZVNpemUgPSBmaWxlU2l6ZTtcbiAgICAgICAgdGhpcy5lZGl0SGFuZGxlci5yZXZlcnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gQ3JlYXRlcyBhbiBhZGQgY2VsbCAodGhlIGxpdHRsZSBwbHVzIHBsYWNlaG9sZGVyKSBhbmQgcGxhY2VzIGl0IGF0IHRoZSBlbmQgb2YgdGhlIGRvY3VtZW50XG4gICAgICovXG4gICAgcHVibGljIGNyZWF0ZUFkZENlbGwoKTogdm9pZCB7XG4gICAgICAgIC8vIERvbid0IG1ha2UgbW9yZSBtb3JlIGFkZCBjZWxscyB1bnRpbCB0aGVyZSBhcmUgbm9uZSBsZWZ0IG9uIHRoZSBET01cbiAgICAgICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJhZGQtY2VsbFwiKS5sZW5ndGggIT09IDApIHJldHVybjtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHN0YXJ0IGEgbmV3IHJvd1xuICAgICAgICBjb25zdCBwYWNrZXQ6IFZpcnR1YWxpemVkUGFja2V0ID0ge1xuICAgICAgICAgICAgb2Zmc2V0OiB0aGlzLmZpbGVTaXplLFxuICAgICAgICAgICAgZGF0YTogbmV3IEJ5dGVEYXRhKDApXG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLmZpbGVTaXplICUgMTYgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKFtwYWNrZXRdKTtcbiAgICAgICAgICAgIC8vIElmIGl0J3MgYSBuZXcgY2h1bmsgd2Ugd2FudCB0aGUgY2h1bmtoYW5kbGVyIHRvIHRyYWNrIGl0XG4gICAgICAgICAgICBpZiAodGhpcy5maWxlU2l6ZSAlIGNodW5rSGFuZGxlci5jaHVua1NpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjaHVua0hhbmRsZXIuYWRkQ2h1bmsodGhpcy5maWxlU2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNjcm9sbEJhckhhbmRsZXIudXBkYXRlU2Nyb2xsQmFyKHRoaXMuZmlsZVNpemUgLyAxNik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBoZXhfZWxlbWVudCA9IHRoaXMuY3JlYXRlSGV4RWxlbWVudChwYWNrZXQpO1xuICAgICAgICAgICAgY29uc3QgYXNjaWlfZWxlbWVudCA9IHRoaXMuY3JlYXRlQXNjaWlFbGVtZW50KHBhY2tldCk7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IGdldEVsZW1lbnRzV2l0aEdpdmVuT2Zmc2V0KHRoaXMuZmlsZVNpemUgLSAxKTtcbiAgICAgICAgICAgIGVsZW1lbnRzWzBdLnBhcmVudEVsZW1lbnQ/LmFwcGVuZENoaWxkKGhleF9lbGVtZW50KTtcbiAgICAgICAgICAgIGVsZW1lbnRzWzFdLnBhcmVudEVsZW1lbnQ/LmFwcGVuZENoaWxkKGFzY2lpX2VsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFJlbW92ZXMgdGhlIGxhc3QgY2VsbCBmcm9tIHRoZSB2aXJ0dWFsIGRvY3VtZW50XG4gICAgICovXG4gICAgcHVibGljIHJlbW92ZUxhc3RDZWxsKCk6IHZvaWQge1xuICAgICAgICAvLyBXZSBjYW4gdXNlIHRoZSBhZGQgY2VsbCBhcyB0aGUgbGFzdCBjZWxsIG9mZnNldCBzaW5jZSBhIHBsdXMgY2VsbCBzaG91bGQgYWx3YXlzIGJlIHRoZSBsYXN0IGNlbGxcbiAgICAgICAgY29uc3QgcGx1c0NlbGxPZmZzZXQgPSBnZXRFbGVtZW50c09mZnNldChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiYWRkLWNlbGxcIilbMF0pO1xuICAgICAgICBpZiAoaXNOYU4ocGx1c0NlbGxPZmZzZXQpKSByZXR1cm47XG4gICAgICAgIGNvbnN0IGxhc3RDZWxscyA9IGdldEVsZW1lbnRzV2l0aEdpdmVuT2Zmc2V0KHBsdXNDZWxsT2Zmc2V0KTtcbiAgICAgICAgY29uc3Qgc2Vjb25kVG9MYXN0Q2VsbHMgPSBnZXRFbGVtZW50c1dpdGhHaXZlbk9mZnNldChwbHVzQ2VsbE9mZnNldCAtIDEpO1xuICAgICAgICAvLyBJZiB0aGUgbGFzdCBjZWxsIHdhcyBvbiBpdHMgb3duIHJvdyB3ZSByZW1vdmUgdGhlIG5ldyByb3dcbiAgICAgICAgaWYgKHBsdXNDZWxsT2Zmc2V0ICUgMTYgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMucm93c1swXS5nZXQocGx1c0NlbGxPZmZzZXQudG9TdHJpbmcoKSk/LnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5yb3dzWzBdLmRlbGV0ZShwbHVzQ2VsbE9mZnNldC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIHRoaXMucm93c1sxXS5nZXQocGx1c0NlbGxPZmZzZXQudG9TdHJpbmcoKSk/LnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5yb3dzWzFdLmRlbGV0ZShwbHVzQ2VsbE9mZnNldC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIHRoaXMucm93c1syXS5nZXQocGx1c0NlbGxPZmZzZXQudG9TdHJpbmcoKSk/LnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5yb3dzWzJdLmRlbGV0ZShwbHVzQ2VsbE9mZnNldC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQmFySGFuZGxlci51cGRhdGVTY3JvbGxCYXIoKHBsdXNDZWxsT2Zmc2V0IC0gMSkgLyAxNik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYXN0Q2VsbHNbMF0ucmVtb3ZlKCk7XG4gICAgICAgICAgICBsYXN0Q2VsbHNbMV0ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgc2Vjb25kVG9MYXN0Q2VsbHNbMF0uaW5uZXJUZXh0ID0gXCIrXCI7XG4gICAgICAgIHNlY29uZFRvTGFzdENlbGxzWzBdLmNsYXNzTGlzdC5hZGQoXCJhZGQtY2VsbFwiKTtcbiAgICAgICAgc2Vjb25kVG9MYXN0Q2VsbHNbMF0uY2xhc3NMaXN0LnJlbW92ZShcIm5vbmdyYXBoaWNcIik7XG4gICAgICAgIHNlY29uZFRvTGFzdENlbGxzWzBdLmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0ZWRcIik7XG4gICAgICAgIHNlY29uZFRvTGFzdENlbGxzWzFdLmlubmVyVGV4dCA9IFwiK1wiO1xuICAgICAgICBzZWNvbmRUb0xhc3RDZWxsc1sxXS5jbGFzc0xpc3QucmVtb3ZlKFwibm9uZ3JhcGhpY1wiKTtcbiAgICAgICAgc2Vjb25kVG9MYXN0Q2VsbHNbMV0uY2xhc3NMaXN0LmFkZChcImFkZC1jZWxsXCIpO1xuICAgICAgICBzZWNvbmRUb0xhc3RDZWxsc1sxXS5jbGFzc0xpc3QucmVtb3ZlKFwiZWRpdGVkXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBTaW1wbGUgZ2V0dGVyIGZvciB0aGUgZmlsZVNpemVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBUaGUgZmlsZVNpemVcbiAgICAgKi9cbiAgICBwdWJsaWMgZ2V0IGRvY3VtZW50U2l6ZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5maWxlU2l6ZTsgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFVwZGF0ZXMgdGhlIGZpbGUgc2l6ZSBzbyBpdHMgaW4gc3luYyB3aXRoIGV4dCBob3N0XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG5ld1NpemUgVGhlIG5ldyBmaWxlc2l6ZVxuICAgICAqL1xuICAgIHB1YmxpYyB1cGRhdGVEb2N1bWVudFNpemUobmV3U2l6ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsZVNpemUgPSBuZXdTaXplO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUmUtcmVxdWVzdHMgYWxsIHRoZSBjaHVua3Mgb24gdGhlIERPTSBmb3IgcmVuZGVyaW5nLiBUaGlzIGlzIG5lZWRlZCBmb3IgcmV2ZXJ0XG4gICAgICovXG4gICAgcHVibGljIGFzeW5jIHJlUmVxdWVzdENodW5rcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgLy8gSWYgd2UgZG9uJ3QgZG8gQXJyYXkuZnJvbSBpdCB3aWxsIHN0aWxsIHJlZmVyZW5jZSB0aGUgb3JpZ2luYWwgc2V0IGNhdXNpbmcgaXQgdG8gaW5maW5pdGVseSByZXF1ZXN0IGFuZCBkZWxldGUgdGhlIGNodW5rc1xuICAgICAgICBjb25zdCBhbGxDaHVua3MgPSBBcnJheS5mcm9tKGNodW5rSGFuZGxlci5hbGxDaHVua3MpO1xuICAgICAgICBmb3IgKGNvbnN0IGNodW5rIG9mIGFsbENodW5rcykge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCB0aGUgY2h1bmtzIGZyb20gdGhlIERPTVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IGNodW5rOyBpIDwgY2h1bmsgKyBjaHVua0hhbmRsZXIuY2h1bmtTaXplOyBpICs9IDE2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzWzBdLmdldChpLnRvU3RyaW5nKCkpPy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd3NbMF0uZGVsZXRlKGkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzWzFdLmdldChpLnRvU3RyaW5nKCkpPy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd3NbMV0uZGVsZXRlKGkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3dzWzJdLmdldChpLnRvU3RyaW5nKCkpPy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvd3NbMl0uZGVsZXRlKGkudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaHVua0hhbmRsZXIucmVtb3ZlQ2h1bmsoY2h1bmspO1xuICAgICAgICAgICAgYXdhaXQgY2h1bmtIYW5kbGVyLnJlcXVlc3RNb3JlQ2h1bmtzKGNodW5rKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBTY3JvbGxzIHRvIHRoZSBnaXZlbiBvZmZzZXQgaWYgaXQncyBvdXRzaWRlIHRoZSB2aWV3cG9ydFxuICAgICAqIEBwYXJhbSBvZmZzZXQgVGhlIG9mZnNldCB0byBzY3JvbGwgdG8gXG4gICAgICogQHBhcmFtIGZvcmNlIFdoZXRoZXIgb3Igbm90IHlvdSBzaG91bGQgc2Nyb2xsIGV2ZW4gaWYgaXQncyBpbiB0aGUgdmlld3BvcnRcbiAgICAgKi9cbiAgICBwdWJsaWMgYXN5bmMgc2Nyb2xsRG9jdW1lbnRUb09mZnNldChvZmZzZXQ6IG51bWJlciwgZm9yY2U/OiBib29sZWFuKTogUHJvbWlzZTx2b2lkW10+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Nyb2xsQmFySGFuZGxlci5zY3JvbGxUb09mZnNldChvZmZzZXQsIGZvcmNlKTtcbiAgICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cblxuaW1wb3J0IHsgdnNjb2RlIH0gZnJvbSBcIi4vaGV4RWRpdFwiO1xuXG4vKipcbiAqIFNpbXBsZSBzdGF0aWMgY2xhc3Mgd2hpY2ggaGFuZGxlcyBzZXR0aW5nIGFuZCBjbGVhcmluZyB0aGUgd2Vidmlld3Mgc3RhdGVcbiAqIFdlIHVzZSB0aGlzIG92ZXIgdGhlIGRlZmF1bHQgLnNldFN0YXRlIGFzIGl0IGltcGxlbWVudHMgYSBzZXRTdGF0ZSB3aGljaCBkb2Vzbid0IG92ZXJyaWRlIHRoZSBlbnRpcmUgb2JqZWN0IGp1c3QgdGhlIGdpdmVuIHByb3BlcnR5XG4gKi9cbmV4cG9ydCBjbGFzcyBXZWJWaWV3U3RhdGVNYW5hZ2VyIHtcblxuICAgIC8qKlxuICAgICAqIEBkZXNjcmlwdGlvbiBHaXZlbiBhIHByb3BlcnR5IGFuZCBhIHZhbHVlIGVpdGhlciB1cGRhdGVzIG9yIGFkZHMgaXQgdG8gdGhlIHN0YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5TmFtZSBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHlcbiAgICAgKiBAcGFyYW0ge2FueX0gcHJvcGVydHlWYWx1ZSBUaGUgdmFsdWUgdG8gc3RvcmUgZm9yIHRoZSBwcm9wZXJ0eVxuICAgICAqL1xuICAgIHN0YXRpYyBzZXRQcm9wZXJ0eShwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHJvcGVydHlWYWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBjdXJyZW50U3RhdGUgPSBXZWJWaWV3U3RhdGVNYW5hZ2VyLmdldFN0YXRlKCk7XG4gICAgICAgIGlmIChjdXJyZW50U3RhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY3VycmVudFN0YXRlID0geyB9O1xuICAgICAgICB9XG4gICAgICAgIGN1cnJlbnRTdGF0ZVtwcm9wZXJ0eU5hbWVdID0gcHJvcGVydHlWYWx1ZTtcbiAgICAgICAgdnNjb2RlLnNldFN0YXRlKGN1cnJlbnRTdGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqKlxuICAgICAqIEBkZXNjcmlwdGlvbiBDbGVhcnMgdGhlIHN0YXRlIG9iamVjdFxuICAgICAqL1xuICAgIHN0YXRpYyBjbGVhclN0YXRlKCk6IHZvaWQge1xuICAgICAgICB2c2NvZGUuc2V0U3RhdGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzY3JpcHRpb24gUmV0cmlldmVzIHRoZSBzdGF0ZSBvYmplY3RcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0U3RhdGUoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB2c2NvZGUuZ2V0U3RhdGUoKSA9PT0gXCJzdHJpbmdcIiA/IEpTT04ucGFyc2UodnNjb2RlLmdldFN0YXRlKCkpIDogdnNjb2RlLmdldFN0YXRlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2NyaXB0aW9uIFJldHJpZXZlcyBhIHByb3BlcnR5IG9uIHRoZSBzdGF0ZSBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlOYW1lIFRoZSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB0byByZXRyaWV2ZSB0aGUgdmFsdWUgb2ZcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0UHJvcGVydHkocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBjb25zdCBzdGF0ZSA9ICBXZWJWaWV3U3RhdGVNYW5hZ2VyLmdldFN0YXRlKCk7XG4gICAgICAgIHJldHVybiBzdGF0ZVtwcm9wZXJ0eU5hbWVdO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9
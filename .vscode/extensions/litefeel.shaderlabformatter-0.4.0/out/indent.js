"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Indent {
    constructor() {
        this.indentCode = 32;
        this.indentStr = "";
        this.isIndentSpaces = false;
        this.indentMap = new Map();
    }
    initIndent(insertSpaces, tabSize) {
        this.isIndentSpaces = insertSpaces;
        this.indentCode = (insertSpaces ? " " : "\t").charCodeAt(0);
        this.indentStr = insertSpaces ? " ".repeat(tabSize) : "\t";
        this.indentMap.clear();
        for (let i = 1; i <= 3; i++) {
            this.indentMap.set(i, this.indentStr.repeat(i));
        }
    }
    getIndent(indent) {
        if (indent <= 0) {
            return "";
        }
        if (this.indentMap.has(indent)) {
            return this.indentMap.get(indent) || "";
        }
        return this.indentStr.repeat(indent);
    }
    isIndent(s, len, indent) {
        let count = this.indentStr === "\t" ? indent : indent * this.indentStr.length;
        if (len !== count) {
            return false;
        }
        for (var i = 0; i < len; i++) {
            if (s.charCodeAt(i) !== this.indentCode) {
                return false;
            }
        }
        return true;
    }
}
exports.Indent = Indent;
//# sourceMappingURL=indent.js.map
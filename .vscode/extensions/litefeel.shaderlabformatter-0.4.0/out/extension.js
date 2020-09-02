"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const indent_1 = require("./indent");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "shaderlabformatter" is now active!');
    let MacroIndentation;
    (function (MacroIndentation) {
        MacroIndentation["Dont"] = "dont";
        MacroIndentation["Indent"] = "indent";
        MacroIndentation["Normal"] = "normal";
    })(MacroIndentation || (MacroIndentation = {}));
    const MACRO_BEGIN = /^\s*#if/;
    const MACRO_END = /^\s*#endif/;
    const MACRO_MIDDLE = /^\s*(#else|#elif)/;
    const BRACKET_LEFT = /\{(?!})/;
    const BRACKET_RIGHT = /(?<!{)\}/;
    let indentUtil = new indent_1.Indent();
    function isComment(line) {
        return line.startsWith("//");
    }
    let disposable2 = vscode.languages.registerDocumentFormattingEditProvider('shaderlab', {
        provideDocumentFormattingEdits(document, options, token) {
            indentUtil.initIndent(options.insertSpaces, options.tabSize);
            let config = vscode.workspace.getConfiguration("shaderlabformatter.indentation");
            let macroIndentation = config.get("conditionMacro", MacroIndentation.Indent);
            // vscode.window.showInformationMessage('Hello World!');
            const result = [];
            const lineCount = document.lineCount;
            var indent = 0;
            for (var lineIdx = 0; lineIdx < lineCount; lineIdx++) {
                var line = document.lineAt(lineIdx);
                if (line.range.isEmpty) {
                    continue;
                }
                const lineText = line.text;
                const bracketLeft = BRACKET_LEFT.test(lineText);
                const bracketRight = BRACKET_RIGHT.test(lineText);
                const macroBegin = MACRO_BEGIN.test(lineText);
                const macroEnd = MACRO_END.test(lineText);
                const macroMiddle = MACRO_MIDDLE.test(lineText);
                if (!bracketLeft && bracketRight) {
                    indent--;
                }
                let nowIndent = indent;
                if (macroEnd || macroMiddle || macroBegin) {
                    switch (macroIndentation) {
                        case MacroIndentation.Dont:
                            nowIndent = 0;
                            break;
                        case MacroIndentation.Indent:
                            if (macroEnd) {
                                indent--;
                                nowIndent = indent;
                            }
                            else if (macroMiddle) {
                                nowIndent = indent - 1;
                            }
                            break;
                        case MacroIndentation.Normal:
                            // do nothing
                            break;
                    }
                }
                var firstCharIdx = line.firstNonWhitespaceCharacterIndex;
                if (!indentUtil.isIndent(lineText, firstCharIdx, nowIndent)) {
                    var pos = new vscode.Position(lineIdx, 0);
                    result.push(vscode.TextEdit.delete(new vscode.Range(lineIdx, 0, lineIdx, firstCharIdx)));
                    result.push(vscode.TextEdit.insert(line.range.start, indentUtil.getIndent(nowIndent)));
                }
                if (bracketLeft && !bracketRight) {
                    indent++;
                }
                if (macroBegin && macroIndentation === MacroIndentation.Indent) {
                    indent++;
                }
            }
            return result;
        }
    });
    context.subscriptions.push(disposable2);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
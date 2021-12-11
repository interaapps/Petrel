import AutoCompletion from "../AutoCompletion.js"

export default class JavaScriptAutoComplete extends AutoCompletion {

    constructor(environment = {}){
        super()
        this.defaultVariables = [
            ...Object.keys(window),
            ...(environment.variables ? environment.variables : [])
        ]
    }

    autoComplete(word, editor){
        const ret = []
        if (word == "")
            return []

        const variables = [...this.defaultVariables]
        const val = editor.value
        for (const varRes of val.matchAll(/(^| |\n)(const|let|var) (\s*?)([A-Za-z0-9]*)(\s*?)(=|;|\n|$)/gm))
            variables.push(varRes[4])
        
        for (const varRes of val.matchAll(/(^|;(\s*)?|\n)(class) (\s*?)([A-Za-z0-9]*)(\s*?)(extends (\s*?)[A-Za-z0-9]*)?(\s*?)({|\n|$)/gm))
            variables.push(varRes[5])

        for (const varRes of val.matchAll(/(^|;(\s*)?|\n)(function) (\s*?)([A-Za-z0-9]*)(\s*?)((\s*?)(\([^(]*)\))(\s*?){/gm))
            variables.push(varRes[5])
        
        for (const key of JavaScriptAutoComplete.KEYWORDS) {
            if (key.toLowerCase().startsWith(word.toLowerCase()) && word !== key){
                ret.push({
                    text: key,
                    type: 'KEYWORD',
                    replace: ()=> key+" " 
                })
            }
        }
        
        for (const key in JavaScriptAutoComplete.KEYWORDS_OWN_LOGIC) {
            if (key.toLowerCase().startsWith(word.toLowerCase()) && word !== key){
                ret.push({
                    text: key,
                    type: 'KEYWORD',
                    replace: ()=> key+" ",
                    ...JavaScriptAutoComplete.KEYWORDS_OWN_LOGIC[key](key)
                })
            }
        }

        variables.forEach(key => {
            if (key.toLowerCase().startsWith(word.toLowerCase()) && word !== key){
                ret.push({
                    text: key,
                    type: 'VARIABLE',
                    replace: ()=> key
                })
            }
        })
        return ret
    }
    
}
JavaScriptAutoComplete.KEYWORDS_OWN_LOGIC = {
    'function () {\n    \n}': key=>({
        text: "function",
        replace: ()=>key,
        cursorMove: -11
    }),
    'if () {\n    \n}': key=>({
        text: "if",
        replace: ()=>key,
        cursorMove: -10
    }),
    'else if () {\n    \n}': key=>({
        text: "else if",
        replace: ()=>key,
        cursorMove: -10
    }),
    'else {\n    \n}': key=>({
        text: "else",
        replace: ()=>key,
        cursorMove: -3
    }),
    'console.log()': key=>({
        text: "console.log(...)",
        replace: ()=>key,
        cursorMove: -1
    })
}

JavaScriptAutoComplete.KEYWORDS = ["await", "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "enum", "export", "extends", "false", "finally", "for", "implements", "import", "in", "instanceof", "interface", "let", "new", "null", "package", "private", "protected", "public", "return", "super", "switch", "static", "this", "throw", "try", "true", "typeof", "var", "void", "while", "with", "yield"]
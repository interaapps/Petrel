import AutoCompletion from "../AutoCompletion.js"

export default class HTMLAutoComplete extends AutoCompletion {
    constructor({extraKeyWords = [], extraTags = []} = {}){
        super()
        this.keyWords = [...HTMLAutoComplete.KEYWORDS, ...extraKeyWords]

        this.keyWords = []

        for (const tag of [...HTMLAutoComplete.TAGS, ...extraTags]) {
            this.keyWords.push({
                key: tag,
                text: tag,
                replace: ()=>`<${tag}></${tag}>`,
                cursorMove: -`</${tag}>`.length
            })
            this.keyWords.push({replace: ()=>`<${tag}>`, key: `<${tag}>`, text: `<${tag}>`})
            this.keyWords.push({replace: ()=>`</${tag}>`, key: `</${tag}>`, text: `</${tag}>`})
        }
    }

    autoComplete(word, editor){
        const searchWord = word.replaceAll(/\(|{|;/g, "")
        
        const ret = []
        if (searchWord == "")
            return []
        
        for (let key of this.keyWords) {
            let ownInfo = null
            if (typeof key == 'object'){
                ownInfo = key
                key = key.key
            }
            if (key.toLowerCase().startsWith(searchWord.toLowerCase()) && searchWord !== key){
                if (ownInfo) {
                    ret.push(ownInfo)
                } else {
                    ret.push({
                        text: key,
                        type: 'KEYWORD',
                        replace: () => key
                    })
                }
            }
        }
        
        return ret
    }   
}
HTMLAutoComplete.FILE_EXTENSIONS = ["html", "html5", "html4", "html3", "html2", "htm", "xhtml"]
HTMLAutoComplete.KEYWORDS = []
HTMLAutoComplete.TAGS = ["!DOCTYPE", "a", "abbr", "acronym", "address", "applet", "area", "article", "aside", "audio", "b", "base", "basefont", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "datalist", "dd", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "font", "footer", "form", "frame", "frameset", "h1 to h6", "head", "header", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noframes", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]
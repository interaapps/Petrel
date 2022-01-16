import AutoCompletion from "../AutoCompletion.js"

export default class YAMLAutoComplete extends AutoCompletion {
    constructor({extraKeyWords = []} = {}){
        super()
        this.keyWords = [...YAMLAutoComplete.KEYWORDS, ...extraKeyWords]
    }

    autoComplete(word, editor){
        const searchWord = word.replaceAll(/\(|{|;/g, "")
        
        const ret = []
        if (searchWord == "")
            return []
        
        for (const key of this.keyWords) {
            if (key.toLowerCase().startsWith(searchWord.toLowerCase()) && searchWord !== key){
                ret.push({
                    text: key,
                    type: 'KEYWORD',
                    replace: ()=> key
                })
            }
        }
        
        return ret
    }   
}

YAMLAutoComplete.KEYWORDS = ["true", "false", "no", "yes", "off", "on", "null", "none", "- ", "---"]
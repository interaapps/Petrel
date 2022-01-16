import AutoCompletion from "../AutoCompletion.js"

export default class JSONAutoComplete extends AutoCompletion {
    constructor({extraKeyWords = []} = {}){
        super()
        this.keyWords = [...JSONAutoComplete.KEYWORDS, ...extraKeyWords]
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

JSONAutoComplete.KEYWORDS = ["true", "false", "null"]
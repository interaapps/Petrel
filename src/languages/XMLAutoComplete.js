import AutoCompletion from "../AutoCompletion.js"

export default class XMLAutoComplete extends AutoCompletion {
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

XMLAutoComplete.KEYWORDS = []
XMLAutoComplete.TAGS = []
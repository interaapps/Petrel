import AutoCompletion from "../AutoCompletion.js"

export default class MarkdownAutoComplete extends AutoCompletion {
    autoComplete(word, editor){
        const searchWord = word.replaceAll(/\(|{|;/g, "")
        
        const ret = []
        if (searchWord == "")
            return []
        
        for (const key of MarkdownAutoComplete.KEYWORDS) {
            if (key.toLowerCase().startsWith(searchWord.toLowerCase()) && searchWord !== key){

                let compl = key
                let moveCursor = 1
                switch (key) {
                    case '```':
                        compl = '```\n```'
                        moveCursor = -3
                        break;
                    case 'table':
                        compl = 'key|value\n---|-----\n   |     '
                        break;
                    case '__':
                        moveCursor = -1
                        break;
                    case '****':
                        moveCursor = -2
                        break;
                    case '![alt](image)':
                        moveCursor = -8
                        break;
                }

                ret.push({
                    text: key,
                    type: 'KEYWORD',
                    replace: () => compl,
                    cursorMove: moveCursor
                })
            }
        }
        
        return ret
    }   
}
MarkdownAutoComplete.FILE_EXTENSIONS = ["md"]
MarkdownAutoComplete.KEYWORDS = ["## ", "### ", "#### ", "##### ", "###### ", "```", "table", "[link](url)", "![alt](image)", "****", "__"]
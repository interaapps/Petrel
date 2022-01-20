import AutoCompletion from "../AutoCompletion.js"

export default class DockerfileAutoComplete extends AutoCompletion {
    autoComplete(word, editor){
        const searchWord = word.replaceAll(/\(|{|;/g, "")
        
        const ret = []
        if (searchWord == "")
            return []
        
        for (const key of DockerfileAutoComplete.KEYWORDS) {
            if (key.toLowerCase().startsWith(searchWord.toLowerCase()) && searchWord !== key){

                ret.push({
                    text: key,
                    type: 'KEYWORD',
                    replace: () => key+" "
                })
            }
        }
        
        return ret
    }   
}
DockerfileAutoComplete.FILE_EXTENSIONS = ["Dockerfile"]

DockerfileAutoComplete.KEYWORDS = ["RUN", "CMD", "FROM", "COPY", "MOVE", "WORKDIR", "ENTRYPOINT", "AS"]
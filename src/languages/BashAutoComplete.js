import AutoCompletion from "../AutoCompletion.js"

export default class BashAutoComplete extends AutoCompletion {
    constructor({extraKeyWords = []} = {}){
        super()
        this.keyWords = [...BashAutoComplete.KEYWORDS, ...extraKeyWords]
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
                    replace: ()=> key+" "
                })
            }
        }
        
        return ret
    }   
}

BashAutoComplete.FILE_EXTENSIONS = ["bash", "sh"]

BashAutoComplete.KEYWORDS = ['else', 'for', 'function', 'in', 'select', 'until', 'while', 'if', 'fi', 'elif', 'then', 'set', 'do', 'done', 'let', 'case', 'esac', 'export', 'unset', 'declare', 'typeset', 'local', 'source', 'alias', 'bg', 'bind', 'break', 'builtin', 'cd', 'command', 'compgen', 'complete', 'continue', 'dirs', 'disown', 'echo', 'enable', 'eval', 'exec', 'exit', 'fc', 'fg', 'getopts', 'hash', 'help', 'history', 'jobs', 'kill', 'logout', 'popd', 'printf', 'pushd', 'pwd', 'read', 'readonly', 'return', 'set', 'shift', 'shopt', 'suspend', 'test', 'times', 'trap', 'type', 'ulimit', 'umask', 'unalias', 'wait', 'arch', 'awk', 'bash', 'bunzip2', 'bzcat', 'bzcmp', 'bzdiff', 'bzegrep', 'bzfgrep', 'bzgrep', 'bzip2', 'bzip2recover', 'bzless', 'bzmore', 'cat', 'chattr', 'chgrp', 'chmod', 'chown', 'chvt', 'cp', 'date', 'dd', 'deallocvt', 'df', 'dir', 'dircolors', 'dmesg', 'dnsdomainname', 'domainname', 'du', 'dumpkeys', 'echo', 'ed', 'egrep', 'false', 'fgconsole', 'fgrep', 'fuser', 'gawk', 'getkeycodes', 'gocr', 'grep', 'groups', 'gunzip', 'gzexe', 'gzip', 'hostname', 'igawk', 'install', 'kbd_mode', 'kbdrate', 'killall', 'last', 'lastb', 'link', 'ln', 'loadkeys', 'loadunimap', 'login', 'ls', 'lsattr', 'lsmod', 'lsmod', 'mapscrn', 'mesg', 'mkdir', 'mkfifo', 'mknod', 'mktemp', 'more', 'mount', 'mv', 'nano', 'netstat', 'nisdomainname', 'openvt', 'pgawk', 'pidof', 'ping', 'ps', 'psfaddtable', 'psfgettable', 'psfstriptable', 'psfxtable', 'pstree', 'pwd', 'rbash', 'rc', 'readlink', 'resizecons', 'rm', 'rmdir', 'run', 'sash', 'sed', 'setfont', 'setkeycodes', 'setleds', 'setmetamode', 'setserial', 'sh', 'showconsolefont', 'showkey', 'shred', 'sleep', 'ssed', 'stat', 'stty', 'su', 'sync', 'tar', 'tempfile', 'touch', 'true', 'umount', 'uname', 'unicode_start', 'unicode_stop', 'unlink', 'utmpdump', 'uuidgen', 'vdir', 'wall', 'wc', 'ypdomainname', 'zcat', 'zcmp', 'zdiff', 'zegrep', 'zfgrep', 'zforce', 'zgrep', 'zless', 'zmore', 'znew', 'zsh', 'aclocal', 'aconnect', 'aplay', 'apm', 'apmsleep', 'apropos', 'ar', 'arecord', 'as', 'as86', 'autoconf', 'autoheader', 'automake', 'awk', 'basename', 'bashbug', 'bc', 'bison', 'c', 'cal', 'cat', 'cc', 'cdda2wav', 'cdparanoia', 'cdrdao', 'cd', 'cdrecord', 'chfn', 'chgrp', 'chmod', 'chown', 'chroot', 'chsh', 'clear', 'cmp', 'co', 'col', 'comm', 'cp', 'cpio', 'cpp', 'cut', 'dc', 'dd', 'df', 'diff', 'diff3', 'dir', 'dircolors', 'directomatic', 'dirname', 'du', 'env', 'expr', 'fbset', 'file', 'find', 'flex', 'flex', 'fmt', 'free', 'ftp', 'funzip', 'fuser', 'g', 'gawk', 'gc', 'gcc', 'gdb', 'getent', 'getopt', 'gettext', 'gettextize', 'gimp', 'gimp', 'gimptool', 'gmake', 'gs', 'head', 'hexdump', 'id', 'install', 'join', 'kill', 'killall', 'ld', 'ld86', 'ldd', 'less', 'lex', 'ln', 'locate', 'lockfile', 'logname', 'lp', 'lpr', 'ls', 'lynx', 'm4', 'make', 'man', 'mkdir', 'mknod', 'msgfmt', 'mv', 'namei', 'nasm', 'nawk', 'nice', 'nl', 'nm', 'nm86', 'nmap', 'nohup', 'nop', 'od', 'passwd', 'patch', 'pcregrep', 'pcretest', 'perl', 'perror', 'pidof', 'pr', 'printf', 'procmail', 'prune', 'ps2ascii', 'ps2epsi', 'ps2frag', 'ps2pdf', 'ps2ps', 'psbook', 'psmerge', 'psnup', 'psresize', 'psselect', 'pstops', 'rcs', 'rev', 'rm', 'scp', 'sed', 'seq', 'setterm', 'shred', 'size', 'size86', 'skill', 'slogin', 'snice', 'sort', 'sox', 'split', 'ssh', 'ssh', 'ssh', 'ssh', 'ssh', 'stat', 'strings', 'strip', 'sudo', 'suidperl', 'sum', 'tac', 'tail', 'tee', 'test', 'tr', 'uniq', 'unlink', 'unzip', 'updatedb', 'updmap', 'uptime', 'users', 'vmstat', 'w', 'wc', 'wget', 'whatis', 'whereis', 'which', 'who', 'whoami', 'write', 'xargs', 'yacc', 'yes', 'zip', 'zsoelim']
import AutoCompletion from "../AutoCompletion.js"

export default class PHPAutoComplete extends AutoCompletion {

    constructor(environment = {}){
        super()
        this.defaultVariables = [
            ...PHPAutoComplete.DEFAULT_FUNCTIONS,
            ...(environment.variables ? environment.variables : [])
        ]
        console.log("TEST");
        console.log(this.defaultVariables);
    }

    autoComplete(word, editor){
        const ret = []
        if (word == "")
            return []

        const variables = [...this.defaultVariables]
        const val = editor.value
        for (const varRes of val.matchAll(/(^|;(\s*)|^([{()}])?(\s*)|\n)\$([^\$ ()/*#-,.]*)(\s*?)(=|;|\n|$)/gm))
            variables.push('$'+varRes[5])
        
        for (const varRes of val.matchAll(/(^|;(\s*)?|\n)(class) (\s*?)([A-Za-z0-9]*)(\s*?)((extends|implements) (\s*?)[A-Za-z0-9]*)?(\s*?)({|\n|$)/gm))
            variables.push(varRes[5])

        for (const varRes of val.matchAll(/(^|;(\s*)?|\n)(function) (\s*?)([A-Za-z0-9]*)(\s*?)((\s*?)(\([^(]*)\))(\s*?){/gm))
            variables.push(varRes[5])
        
        for (const key of PHPAutoComplete.KEYWORDS) {
            if (key.toLowerCase().startsWith(word.toLowerCase()) && word !== key){
                ret.push({
                    text: key,
                    type: 'KEYWORD',
                    replace: ()=> key+" " 
                })
            }
        }
        
        for (const key in PHPAutoComplete.KEYWORDS_OWN_LOGIC) {
            if (key.toLowerCase().startsWith(word.toLowerCase()) && word !== key){
                ret.push({
                    text: key,
                    type: 'KEYWORD',
                    replace: ()=> key,
                    ...PHPAutoComplete.KEYWORDS_OWN_LOGIC[key](key)
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
PHPAutoComplete.KEYWORDS_OWN_LOGIC = {
    'function () {\n    \n}': key=>({ text: "function", cursorMove: -11 }),
    'foreach ( as $k=>$v) {\n    \n}': key=>({ text: "foreach", cursorMove: -20 }),
    'if () {\n    \n}': key=>({ text: "if", cursorMove: -10 }),
    'else if () {\n    \n}': key=>({ text: "else if", cursorMove: -10 }),
    'else {\n    \n}': key=>({ text: "else", cursorMove: -3 }),
    'declare(""=value);': key=>({text: "declare",cursorMove: -8 }),
    'require ""': key=>({ text: "require", cursorMove: -1 }),
    'require_once ""': key=>({ text: "require_once", cursorMove: -1 }),
    'include ""': key=>({ text: "include", cursorMove: -1 }),
    'include_once ""': key=>({ text: "include_once", cursorMove: -1 }),
    'do {\n    \n} while ();': key=>({ text: "function", cursorMove: -2 }),
    'public function () {\n    \n}': key=>({ text: "pubf", cursorMove: -11 }),
    'public static function () {\n    \n}': key=>({ text: "pubfs", cursorMove: -11 }),
}

PHPAutoComplete.KEYWORDS = ['__halt_compiler', 'abstract', 'and', 'array', 'as', 'break', 'callable', 'case', 'catch', 'class', 'clone', 'const', 'continue', 'default', 'do', 'echo', 'empty', 'enddeclare', 'endfor', 'endforeach', 'endif', 'endswitch', 'endwhile', 'eval', 'exit', 'extends', 'final', 'for', 'global', 'goto', 'if', 'implements', 'include', 'include_once', 'instanceof', 'insteadof', 'interface', 'isset', 'list', 'namespace', 'new', 'or', 'print', 'private', 'protected', 'public', 'return', 'static', 'switch', 'throw', 'trait', 'try', 'unset', 'use', 'var', 'while', 'xor']

PHPAutoComplete.DEFAULT_FUNCTIONS = ["die", "zend_version", "func_num_args", "func_get_arg", "func_get_args", "strlen", "strcmp", "strncmp", "strcasecmp", "strncasecmp", "error_reporting", "define", "defined", "get_class", "get_called_class", "get_parent_class", "is_subclass_of", "is_a", "get_class_vars", "get_object_vars", "get_mangled_object_vars", "get_class_methods", "method_exists", "property_exists", "class_exists", "interface_exists", "trait_exists", "function_exists", "class_alias", "get_included_files", "get_required_files", "trigger_error", "user_error", "set_error_handler", "restore_error_handler", "set_exception_handler", "restore_exception_handler", "get_declared_classes", "get_declared_traits", "get_declared_interfaces", "get_defined_functions", "get_defined_vars", "get_resource_type", "get_resource_id", "get_resources", "get_loaded_extensions", "get_defined_constants", "debug_backtrace", "debug_print_backtrace", "extension_loaded", "get_extension_funcs", "gc_mem_caches", "gc_collect_cycles", "gc_enabled", "gc_enable", "gc_disable", "gc_status", "strtotime", "date", "idate", "gmdate", "mktime", "gmmktime", "checkdate", "strftime", "gmstrftime", "time", "localtime", "getdate", "date_create", "date_create_immutable", "date_create_from_format", "date_create_immutable_from_format", "date_parse", "date_parse_from_format", "date_get_last_errors", "date_format", "date_modify", "date_add", "date_sub", "date_timezone_get", "date_timezone_set", "date_offset_get", "date_diff", "date_time_set", "date_date_set", "date_isodate_set", "date_timestamp_set", "date_timestamp_get", "timezone_open", "timezone_name_get", "timezone_name_from_abbr", "timezone_offset_get", "timezone_transitions_get", "timezone_location_get", "timezone_identifiers_list", "timezone_abbreviations_list", "timezone_version_get", "date_interval_create_from_date_string", "date_interval_format", "date_default_timezone_set", "date_default_timezone_get", "date_sunrise", "date_sunset", "date_sun_info", "libxml_set_streams_context", "libxml_use_internal_errors", "libxml_get_last_error", "libxml_get_errors", "libxml_clear_errors", "libxml_disable_entity_loader", "libxml_set_external_entity_loader", "openssl_x509_export_to_file", "openssl_x509_export", "openssl_x509_fingerprint", "openssl_x509_check_private_key", "openssl_x509_verify", "openssl_x509_parse", "openssl_x509_checkpurpose", "openssl_x509_read", "openssl_x509_free", "openssl_pkcs12_export_to_file", "openssl_pkcs12_export", "openssl_pkcs12_read", "openssl_csr_export_to_file", "openssl_csr_export", "openssl_csr_sign", "openssl_csr_new", "openssl_csr_get_subject", "openssl_csr_get_public_key", "openssl_pkey_new", "openssl_pkey_export_to_file", "openssl_pkey_export", "openssl_pkey_get_public", "openssl_get_publickey", "openssl_pkey_free", "openssl_free_key", "openssl_pkey_get_private", "openssl_get_privatekey", "openssl_pkey_get_details", "openssl_pbkdf2", "openssl_pkcs7_verify", "openssl_pkcs7_encrypt", "openssl_pkcs7_sign", "openssl_pkcs7_decrypt", "openssl_pkcs7_read", "openssl_cms_verify", "openssl_cms_encrypt", "openssl_cms_sign", "openssl_cms_decrypt", "openssl_cms_read", "openssl_private_encrypt", "openssl_private_decrypt", "openssl_public_encrypt", "openssl_public_decrypt", "openssl_error_string", "openssl_sign", "openssl_verify", "openssl_seal", "openssl_open", "openssl_get_md_methods", "openssl_get_cipher_methods", "openssl_get_curve_names", "openssl_digest", "openssl_encrypt", "openssl_decrypt", "openssl_cipher_iv_length", "openssl_dh_compute_key", "openssl_pkey_derive", "openssl_random_pseudo_bytes", "openssl_spki_new", "openssl_spki_verify", "openssl_spki_export", "openssl_spki_export_challenge", "openssl_get_cert_locations", "preg_match", "preg_match_all", "preg_replace", "preg_filter", "preg_replace_callback", "preg_replace_callback_array", "preg_split", "preg_quote", "preg_grep", "preg_last_error", "preg_last_error_msg", "ob_gzhandler", "zlib_get_coding_type", "gzfile", "gzopen", "readgzfile", "zlib_encode", "zlib_decode", "gzdeflate", "gzencode", "gzcompress", "gzinflate", "gzdecode", "gzuncompress", "gzwrite", "gzputs", "gzrewind", "gzclose", "gzeof", "gzgetc", "gzpassthru", "gzseek", "gztell", "gzread", "gzgets", "deflate_init", "deflate_add", "inflate_init", "inflate_add", "inflate_get_status", "inflate_get_read_len", "filter_has_var", "filter_input", "filter_var", "filter_input_array", "filter_var_array", "filter_list", "filter_id", "hash", "hash_file", "hash_hmac", "hash_hmac_file", "hash_init", "hash_update", "hash_update_stream", "hash_update_file", "hash_final", "hash_copy", "hash_algos", "hash_hmac_algos", "hash_pbkdf2", "hash_equals", "hash_hkdf", "mhash_get_block_size", "mhash_get_hash_name", "mhash_keygen_s2k", "mhash_count", "mhash", "json_encode", "json_decode", "json_last_error", "json_last_error_msg", "pcntl_fork", "pcntl_waitpid", "pcntl_wait", "pcntl_signal", "pcntl_signal_get_handler", "pcntl_signal_dispatch", "pcntl_sigprocmask", "pcntl_sigwaitinfo", "pcntl_sigtimedwait", "pcntl_wifexited", "pcntl_wifstopped", "pcntl_wifcontinued", "pcntl_wifsignaled", "pcntl_wexitstatus", "pcntl_wtermsig", "pcntl_wstopsig", "pcntl_exec", "pcntl_alarm", "pcntl_get_last_error", "pcntl_errno", "pcntl_getpriority", "pcntl_setpriority", "pcntl_strerror", "pcntl_async_signals", "pcntl_unshare", "class_implements", "class_parents", "class_uses", "spl_autoload", "spl_autoload_call", "spl_autoload_extensions", "spl_autoload_functions", "spl_autoload_register", "spl_autoload_unregister", "spl_classes", "spl_object_hash", "spl_object_id", "iterator_apply", "iterator_count", "iterator_to_array", "session_name", "session_module_name", "session_save_path", "session_id", "session_create_id", "session_regenerate_id", "session_decode", "session_encode", "session_destroy", "session_unset", "session_gc", "session_get_cookie_params", "session_write_close", "session_abort", "session_reset", "session_status", "session_register_shutdown", "session_commit", "session_set_save_handler", "session_cache_limiter", "session_cache_expire", "session_set_cookie_params", "session_start", "sodium_crypto_aead_aes256gcm_is_available", "sodium_crypto_aead_aes256gcm_decrypt", "sodium_crypto_aead_aes256gcm_encrypt", "sodium_crypto_aead_aes256gcm_keygen", "sodium_crypto_aead_chacha20poly1305_decrypt", "sodium_crypto_aead_chacha20poly1305_encrypt", "sodium_crypto_aead_chacha20poly1305_keygen", "sodium_crypto_aead_chacha20poly1305_ietf_decrypt", "sodium_crypto_aead_chacha20poly1305_ietf_encrypt", "sodium_crypto_aead_chacha20poly1305_ietf_keygen", "sodium_crypto_aead_xchacha20poly1305_ietf_decrypt", "sodium_crypto_aead_xchacha20poly1305_ietf_keygen", "sodium_crypto_aead_xchacha20poly1305_ietf_encrypt", "sodium_crypto_auth", "sodium_crypto_auth_keygen", "sodium_crypto_auth_verify", "sodium_crypto_box", "sodium_crypto_box_keypair", "sodium_crypto_box_seed_keypair", "sodium_crypto_box_keypair_from_secretkey_and_publickey", "sodium_crypto_box_open", "sodium_crypto_box_publickey", "sodium_crypto_box_publickey_from_secretkey", "sodium_crypto_box_seal", "sodium_crypto_box_seal_open", "sodium_crypto_box_secretkey", "sodium_crypto_kx_keypair", "sodium_crypto_kx_publickey", "sodium_crypto_kx_secretkey", "sodium_crypto_kx_seed_keypair", "sodium_crypto_kx_client_session_keys", "sodium_crypto_kx_server_session_keys", "sodium_crypto_generichash", "sodium_crypto_generichash_keygen", "sodium_crypto_generichash_init", "sodium_crypto_generichash_update", "sodium_crypto_generichash_final", "sodium_crypto_kdf_derive_from_key", "sodium_crypto_kdf_keygen", "sodium_crypto_pwhash", "sodium_crypto_pwhash_str", "sodium_crypto_pwhash_str_verify", "sodium_crypto_pwhash_str_needs_rehash", "sodium_crypto_pwhash_scryptsalsa208sha256", "sodium_crypto_pwhash_scryptsalsa208sha256_str", "sodium_crypto_pwhash_scryptsalsa208sha256_str_verify", "sodium_crypto_scalarmult", "sodium_crypto_secretbox", "sodium_crypto_secretbox_keygen", "sodium_crypto_secretbox_open", "sodium_crypto_secretstream_xchacha20poly1305_keygen", "sodium_crypto_secretstream_xchacha20poly1305_init_push", "sodium_crypto_secretstream_xchacha20poly1305_push", "sodium_crypto_secretstream_xchacha20poly1305_init_pull", "sodium_crypto_secretstream_xchacha20poly1305_pull", "sodium_crypto_secretstream_xchacha20poly1305_rekey", "sodium_crypto_shorthash", "sodium_crypto_shorthash_keygen", "sodium_crypto_sign", "sodium_crypto_sign_detached", "sodium_crypto_sign_ed25519_pk_to_curve25519", "sodium_crypto_sign_ed25519_sk_to_curve25519", "sodium_crypto_sign_keypair", "sodium_crypto_sign_keypair_from_secretkey_and_publickey", "sodium_crypto_sign_open", "sodium_crypto_sign_publickey", "sodium_crypto_sign_secretkey", "sodium_crypto_sign_publickey_from_secretkey", "sodium_crypto_sign_seed_keypair", "sodium_crypto_sign_verify_detached", "sodium_crypto_stream", "sodium_crypto_stream_keygen", "sodium_crypto_stream_xor", "sodium_add", "sodium_compare", "sodium_increment", "sodium_memcmp", "sodium_memzero", "sodium_pad", "sodium_unpad", "sodium_bin2hex", "sodium_hex2bin", "sodium_bin2base64", "sodium_base642bin", "sodium_crypto_scalarmult_base", "set_time_limit", "header_register_callback", "ob_start", "ob_flush", "ob_clean", "ob_end_flush", "ob_end_clean", "ob_get_flush", "ob_get_clean", "ob_get_contents", "ob_get_level", "ob_get_length", "ob_list_handlers", "ob_get_status", "ob_implicit_flush", "output_reset_rewrite_vars", "output_add_rewrite_var", "stream_wrapper_register", "stream_register_wrapper", "stream_wrapper_unregister", "stream_wrapper_restore", "array_push", "krsort", "ksort", "count", "sizeof", "natsort", "natcasesort", "asort", "arsort", "sort", "rsort", "usort", "uasort", "uksort", "end", "prev", "next", "reset", "current", "pos", "key", "min", "max", "array_walk", "array_walk_recursive", "in_array", "array_search", "extract", "compact", "array_fill", "array_fill_keys", "range", "shuffle", "array_pop", "array_shift", "array_unshift", "array_splice", "array_slice", "array_merge", "array_merge_recursive", "array_replace", "array_replace_recursive", "array_keys", "array_key_first", "array_key_last", "array_values", "array_count_values", "array_column", "array_reverse", "array_pad", "array_flip", "array_change_key_case", "array_unique", "array_intersect_key", "array_intersect_ukey", "array_intersect", "array_uintersect", "array_intersect_assoc", "array_uintersect_assoc", "array_intersect_uassoc", "array_uintersect_uassoc", "array_diff_key", "array_diff_ukey", "array_diff", "array_udiff", "array_diff_assoc", "array_diff_uassoc", "array_udiff_assoc", "array_udiff_uassoc", "array_multisort", "array_rand", "array_sum", "array_product", "array_reduce", "array_filter", "array_map", "array_key_exists", "key_exists", "array_chunk", "array_combine", "base64_encode", "base64_decode", "constant", "ip2long", "long2ip", "getenv", "putenv", "getopt", "flush", "sleep", "usleep", "time_nanosleep", "time_sleep_until", "get_current_user", "get_cfg_var", "error_log", "error_get_last", "error_clear_last", "call_user_func", "call_user_func_array", "forward_static_call", "forward_static_call_array", "register_shutdown_function", "highlight_file", "show_source", "php_strip_whitespace", "highlight_string", "ini_get", "ini_get_all", "ini_set", "ini_alter", "ini_restore", "set_include_path", "get_include_path", "print_r", "connection_aborted", "connection_status", "ignore_user_abort", "getservbyname", "getservbyport", "getprotobyname", "getprotobynumber", "register_tick_function", "unregister_tick_function", "is_uploaded_file", "move_uploaded_file", "parse_ini_file", "parse_ini_string", "sys_getloadavg", "get_browser", "crc32", "crypt", "strptime", "gethostname", "gethostbyaddr", "gethostbyname", "gethostbynamel", "dns_check_record", "checkdnsrr", "dns_get_record", "dns_get_mx", "getmxrr", "net_get_interfaces", "ftok", "hrtime", "lcg_value", "md5", "md5_file", "getmyuid", "getmygid", "getmypid", "getmyinode", "getlastmod", "sha1", "sha1_file", "openlog", "closelog", "syslog", "inet_ntop", "inet_pton", "metaphone", "header", "header_remove", "setrawcookie", "setcookie", "http_response_code", "headers_sent", "headers_list", "htmlspecialchars", "htmlspecialchars_decode", "html_entity_decode", "htmlentities", "get_html_translation_table", "assert", "assert_options", "bin2hex", "hex2bin", "strspn", "strcspn", "nl_langinfo", "strcoll", "trim", "rtrim", "chop", "ltrim", "wordwrap", "explode", "implode", "join", "strtok", "strtoupper", "strtolower", "basename", "dirname", "pathinfo", "stristr", "strstr", "strchr", "strpos", "stripos", "strrpos", "strripos", "strrchr", "str_contains", "str_starts_with", "str_ends_with", "chunk_split", "substr", "substr_replace", "quotemeta", "ord", "chr", "ucfirst", "lcfirst", "ucwords", "strtr", "strrev", "similar_text", "addcslashes", "addslashes", "stripcslashes", "stripslashes", "str_replace", "str_ireplace", "hebrev", "nl2br", "strip_tags", "setlocale", "parse_str", "str_getcsv", "str_repeat", "count_chars", "strnatcmp", "localeconv", "strnatcasecmp", "substr_count", "str_pad", "sscanf", "str_rot13", "str_shuffle", "str_word_count", "str_split", "strpbrk", "substr_compare", "utf8_encode", "utf8_decode", "opendir", "dir", "closedir", "chdir", "chroot", "getcwd", "rewinddir", "readdir", "scandir", "glob", "exec", "system", "passthru", "escapeshellcmd", "escapeshellarg", "shell_exec", "proc_nice", "flock", "get_meta_tags", "pclose", "popen", "readfile", "rewind", "rmdir", "umask", "fclose", "feof", "fgetc", "fgets", "fread", "fopen", "fscanf", "fpassthru", "ftruncate", "fstat", "fseek", "ftell", "fflush", "fwrite", "fputs", "mkdir", "rename", "copy", "tempnam", "tmpfile", "file", "file_get_contents", "unlink", "file_put_contents", "fputcsv", "fgetcsv", "realpath", "fnmatch", "sys_get_temp_dir", "fileatime", "filectime", "filegroup", "fileinode", "filemtime", "fileowner", "fileperms", "filesize", "filetype", "file_exists", "is_writable", "is_writeable", "is_readable", "is_executable", "is_file", "is_dir", "is_link", "stat", "lstat", "chown", "chgrp", "lchown", "lchgrp", "chmod", "touch", "clearstatcache", "disk_total_space", "disk_free_space", "diskfreespace", "realpath_cache_get", "realpath_cache_size", "sprintf", "printf", "vprintf", "vsprintf", "fprintf", "vfprintf", "fsockopen", "pfsockopen", "http_build_query", "image_type_to_mime_type", "image_type_to_extension", "getimagesize", "getimagesizefromstring", "phpinfo", "phpversion", "phpcredits", "php_sapi_name", "php_uname", "php_ini_scanned_files", "php_ini_loaded_file", "iptcembed", "iptcparse", "levenshtein", "readlink", "linkinfo", "symlink", "link", "mail", "abs", "ceil", "floor", "round", "sin", "cos", "tan", "asin", "acos", "atan", "atanh", "atan2", "sinh", "cosh", "tanh", "asinh", "acosh", "expm1", "log1p", "pi", "is_finite", "is_nan", "intdiv", "is_infinite", "pow", "exp", "log", "log10", "sqrt", "hypot", "deg2rad", "rad2deg", "bindec", "hexdec", "octdec", "decbin", "decoct", "dechex", "base_convert", "number_format", "fmod", "fdiv", "microtime", "gettimeofday", "getrusage", "pack", "unpack", "password_get_info", "password_hash", "password_needs_rehash", "password_verify", "password_algos", "proc_open", "proc_close", "proc_terminate", "proc_get_status", "quoted_printable_decode", "quoted_printable_encode", "mt_srand", "srand", "rand", "mt_rand", "mt_getrandmax", "getrandmax", "random_bytes", "random_int", "soundex", "stream_select", "stream_context_create", "stream_context_set_params", "stream_context_get_params", "stream_context_set_option", "stream_context_get_options", "stream_context_get_default", "stream_context_set_default", "stream_filter_prepend", "stream_filter_append", "stream_filter_remove", "stream_socket_client", "stream_socket_server", "stream_socket_accept", "stream_socket_get_name", "stream_socket_recvfrom", "stream_socket_sendto", "stream_socket_enable_crypto", "stream_socket_shutdown", "stream_socket_pair", "stream_copy_to_stream", "stream_get_contents", "stream_supports_lock", "stream_set_write_buffer", "set_file_buffer", "stream_set_read_buffer", "stream_set_blocking", "socket_set_blocking", "stream_get_meta_data", "socket_get_status", "stream_get_line", "stream_resolve_include_path", "stream_get_wrappers", "stream_get_transports", "stream_is_local", "stream_isatty", "stream_set_chunk_size", "stream_set_timeout", "socket_set_timeout", "gettype", "get_debug_type", "settype", "intval", "floatval", "doubleval", "boolval", "strval", "is_null", "is_resource", "is_bool", "is_int", "is_integer", "is_long", "is_float", "is_double", "is_numeric", "is_string", "is_array", "is_object", "is_scalar", "is_callable", "is_iterable", "is_countable", "uniqid", "parse_url", "urlencode", "urldecode", "rawurlencode", "rawurldecode", "get_headers", "stream_bucket_make_writeable", "stream_bucket_prepend", "stream_bucket_append", "stream_bucket_new", "stream_get_filters", "stream_filter_register", "convert_uuencode", "convert_uudecode", "var_dump", "var_export", "debug_zval_dump", "serialize", "unserialize", "memory_get_usage", "memory_get_peak_usage", "version_compare", "pdo_drivers", "cal_days_in_month", "cal_from_jd", "cal_info", "cal_to_jd", "easter_date", "easter_days", "frenchtojd", "gregoriantojd", "jddayofweek", "jdmonthname", "jdtofrench", "jdtogregorian", "jdtojewish", "jdtojulian", "jdtounix", "jewishtojd", "juliantojd", "unixtojd", "ctype_alnum", "ctype_alpha", "ctype_cntrl", "ctype_digit", "ctype_lower", "ctype_graph", "ctype_print", "ctype_punct", "ctype_space", "ctype_upper", "ctype_xdigit", "curl_close", "curl_copy_handle", "curl_errno", "curl_error", "curl_escape", "curl_unescape", "curl_multi_setopt", "curl_exec", "curl_file_create", "curl_getinfo", "curl_init", "curl_multi_add_handle", "curl_multi_close", "curl_multi_errno", "curl_multi_exec", "curl_multi_getcontent", "curl_multi_info_read", "curl_multi_init", "curl_multi_remove_handle", "curl_multi_select", "curl_multi_strerror", "curl_pause", "curl_reset", "curl_setopt_array", "curl_setopt", "curl_share_close", "curl_share_errno", "curl_share_init", "curl_share_setopt", "curl_share_strerror", "curl_strerror", "curl_version", "exif_tagname", "exif_read_data", "exif_thumbnail", "exif_imagetype", "finfo_open", "finfo_close", "finfo_set_flags", "finfo_file", "finfo_buffer", "mime_content_type", "ftp_connect", "ftp_ssl_connect", "ftp_login", "ftp_pwd", "ftp_cdup", "ftp_chdir", "ftp_exec", "ftp_raw", "ftp_mkdir", "ftp_rmdir", "ftp_chmod", "ftp_alloc", "ftp_nlist", "ftp_rawlist", "ftp_mlsd", "ftp_systype", "ftp_fget", "ftp_nb_fget", "ftp_pasv", "ftp_get", "ftp_nb_get", "ftp_nb_continue", "ftp_fput", "ftp_nb_fput", "ftp_put", "ftp_append", "ftp_nb_put", "ftp_size", "ftp_mdtm", "ftp_rename", "ftp_delete", "ftp_site", "ftp_close", "ftp_quit", "ftp_set_option", "ftp_get_option", "textdomain", "gettext", "_", "dgettext", "dcgettext", "bindtextdomain", "ngettext", "dngettext", "dcngettext", "bind_textdomain_codeset", "iconv_strlen", "iconv_substr", "iconv_strpos", "iconv_strrpos", "iconv_mime_encode", "iconv_mime_decode", "iconv_mime_decode_headers", "iconv", "iconv_set_encoding", "iconv_get_encoding", "mysqli_affected_rows", "mysqli_autocommit", "mysqli_begin_transaction", "mysqli_change_user", "mysqli_character_set_name", "mysqli_close", "mysqli_commit", "mysqli_connect", "mysqli_connect_errno", "mysqli_connect_error", "mysqli_data_seek", "mysqli_dump_debug_info", "mysqli_debug", "mysqli_errno", "mysqli_error", "mysqli_error_list", "mysqli_stmt_execute", "mysqli_execute", "mysqli_fetch_field", "mysqli_fetch_fields", "mysqli_fetch_field_direct", "mysqli_fetch_lengths", "mysqli_fetch_all", "mysqli_fetch_array", "mysqli_fetch_assoc", "mysqli_fetch_object", "mysqli_fetch_row", "mysqli_field_count", "mysqli_field_seek", "mysqli_field_tell", "mysqli_free_result", "mysqli_get_connection_stats", "mysqli_get_client_stats", "mysqli_get_charset", "mysqli_get_client_info", "mysqli_get_client_version", "mysqli_get_links_stats", "mysqli_get_host_info", "mysqli_get_proto_info", "mysqli_get_server_info", "mysqli_get_server_version", "mysqli_get_warnings", "mysqli_init", "mysqli_info", "mysqli_insert_id", "mysqli_kill", "mysqli_more_results", "mysqli_multi_query", "mysqli_next_result", "mysqli_num_fields", "mysqli_num_rows", "mysqli_options", "mysqli_set_opt", "mysqli_ping", "mysqli_poll", "mysqli_prepare", "mysqli_report", "mysqli_query", "mysqli_real_connect", "mysqli_real_escape_string", "mysqli_escape_string", "mysqli_real_query", "mysqli_reap_async_query", "mysqli_release_savepoint", "mysqli_rollback", "mysqli_savepoint", "mysqli_select_db", "mysqli_set_charset", "mysqli_stmt_affected_rows", "mysqli_stmt_attr_get", "mysqli_stmt_attr_set", "mysqli_stmt_bind_param", "mysqli_stmt_bind_result", "mysqli_stmt_close", "mysqli_stmt_data_seek", "mysqli_stmt_errno", "mysqli_stmt_error", "mysqli_stmt_error_list", "mysqli_stmt_fetch", "mysqli_stmt_field_count", "mysqli_stmt_free_result", "mysqli_stmt_get_result", "mysqli_stmt_get_warnings", "mysqli_stmt_init", "mysqli_stmt_insert_id", "mysqli_stmt_more_results", "mysqli_stmt_next_result", "mysqli_stmt_num_rows", "mysqli_stmt_param_count", "mysqli_stmt_prepare", "mysqli_stmt_reset", "mysqli_stmt_result_metadata", "mysqli_stmt_send_long_data", "mysqli_stmt_store_result", "mysqli_stmt_sqlstate", "mysqli_sqlstate", "mysqli_ssl_set", "mysqli_stat", "mysqli_store_result", "mysqli_thread_id", "mysqli_thread_safe", "mysqli_use_result", "mysqli_warning_count", "mysqli_refresh", "posix_kill", "posix_getpid", "posix_getppid", "posix_getuid", "posix_setuid", "posix_geteuid", "posix_seteuid", "posix_getgid", "posix_setgid", "posix_getegid", "posix_setegid", "posix_getgroups", "posix_getlogin", "posix_getpgrp", "posix_setsid", "posix_setpgid", "posix_getpgid", "posix_getsid", "posix_uname", "posix_times", "posix_ctermid", "posix_ttyname", "posix_isatty", "posix_getcwd", "posix_mkfifo", "posix_mknod", "posix_access", "posix_getgrnam", "posix_getgrgid", "posix_getpwnam", "posix_getpwuid", "posix_getrlimit", "posix_setrlimit", "posix_get_last_error", "posix_errno", "posix_strerror", "posix_initgroups", "readline", "readline_info", "readline_add_history", "readline_clear_history", "readline_list_history", "readline_read_history", "readline_write_history", "readline_completion_function", "readline_callback_handler_install", "readline_callback_read_char", "readline_callback_handler_remove", "readline_redisplay", "readline_on_new_line", "shmop_open", "shmop_read", "shmop_close", "shmop_size", "shmop_write", "shmop_delete", "socket_select", "socket_create_listen", "socket_accept", "socket_set_nonblock", "socket_set_block", "socket_listen", "socket_close", "socket_write", "socket_read", "socket_getsockname", "socket_getpeername", "socket_create", "socket_connect", "socket_strerror", "socket_bind", "socket_recv", "socket_send", "socket_recvfrom", "socket_sendto", "socket_get_option", "socket_getopt", "socket_set_option", "socket_setopt", "socket_create_pair", "socket_shutdown", "socket_last_error", "socket_clear_error", "socket_import_stream", "socket_export_stream", "socket_sendmsg", "socket_recvmsg", "socket_cmsg_space", "socket_addrinfo_lookup", "socket_addrinfo_connect", "socket_addrinfo_bind", "socket_addrinfo_explain", "msg_get_queue", "msg_send", "msg_receive", "msg_remove_queue", "msg_stat_queue", "msg_set_queue", "msg_queue_exists", "sem_get", "sem_acquire", "sem_release", "sem_remove", "shm_attach", "shm_detach", "shm_has_var", "shm_remove", "shm_put_var", "shm_get_var", "shm_remove_var", "token_get_all", "token_name", "zip_open", "zip_close", "zip_read", "zip_entry_open", "zip_entry_close", "zip_entry_read", "zip_entry_name", "zip_entry_compressedsize", "zip_entry_filesize", "zip_entry_compressionmethod", "opcache_reset", "opcache_get_status", "opcache_compile_file", "opcache_invalidate", "opcache_get_configuration", "opcache_is_script_cached", "dl", "cli_set_process_title", "cli_get_process_title"]
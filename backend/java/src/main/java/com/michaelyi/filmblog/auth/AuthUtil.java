package com.michaelyi.filmblog.auth;

import com.michaelyi.filmblog.util.StringUtil;

public class AuthUtil {
    public static final String ADMIN_EMAIL = "admin@michael-yi.com";
    public static final int BEARER_PREFIX_LENGTH = 7;

    public static boolean isAuthHeaderValid(String authHeader) {
        return StringUtil.isStringValid(authHeader)
                && authHeader.startsWith("Bearer ");
    }
}

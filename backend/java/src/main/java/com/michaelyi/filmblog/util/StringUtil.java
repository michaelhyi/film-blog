package com.michaelyi.filmblog.util;

public class StringUtil {
    public static boolean isStringValid(String s) {
        return s != null && !s.isBlank() && !s.isEmpty();
    }
}

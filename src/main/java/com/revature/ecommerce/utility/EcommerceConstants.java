package com.revature.ecommerce.utility;

import java.security.SecureRandom;

public final class EcommerceConstants {
    //Used when generating a session token, which is a long randomized String.
    static SecureRandom sr = new SecureRandom();
    static final int SESSION_TOKEN_LENGTH = 160;
    static final String SESSION_TOKEN_CHARS = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890";
    //Used when generating a session expiry date
    static final long EXPIRY_EXTRA_TIME = 15; //Indicates the number of minutes for which a session token is valid

    private EcommerceConstants(){}

    //This will generate a session token, which the database can use to determine if a user
    // is logged in and able to take actions.
    public static synchronized String generateSessionToken(){
        StringBuilder sb = new StringBuilder();
        int stcLength = SESSION_TOKEN_CHARS.length();
        for(int i = 0; i < SESSION_TOKEN_LENGTH; i++){
            sb.append(SESSION_TOKEN_CHARS.charAt(sr.nextInt(stcLength)));
        }
        return sb.toString();
    }

    public static long generateSessionExpiry(){
        return System.currentTimeMillis() + (EXPIRY_EXTRA_TIME * 60000L);
    }
}

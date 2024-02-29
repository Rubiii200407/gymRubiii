package com.gymruben.es.config;
import org.hashids.Hashids;

/**
 * Application constants.
 */
public final class Constants {

    // Regex for acceptable logins
    public static final String LOGIN_REGEX = "^(?>[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*)|(?>[_.@A-Za-z0-9-]+)$";

    public static final String SYSTEM = "system";
    public static final String DEFAULT_LANGUAGE = "es";
    public static final Hashids HASHIDS = new Hashids("Q80cxIawnQr2loMwHd1B", 6);

    private Constants() {}
}

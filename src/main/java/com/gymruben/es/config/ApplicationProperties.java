package com.gymruben.es.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Properties specific to Gym Ruben.
 * <p>
 * Properties are configured in the {@code application.yml} file.
 * See {@link tech.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    // jhipster-needle-application-properties-property
    private final FileSavePath fileSavePath = new FileSavePath();

    // jhipster-needle-application-properties-property-getter
    public FileSavePath getFileSavepath() {
        return fileSavePath;
    }

    // jhipster-needle-application-properties-property-class
    public static class FileSavePath {

        private String fileSavePathString = "";

        public String getFileSavePathString() {
            return fileSavePathString;
        }

        public void setFileSavePathString(String fileSavePathString) {
            this.fileSavePathString = fileSavePathString;
        }
    }
}

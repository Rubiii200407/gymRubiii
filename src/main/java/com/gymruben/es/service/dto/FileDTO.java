package com.gymruben.es.service.dto;

public class FileDTO {

    private String base64;

    private String contentType;

    private String fileName;

    private byte[] byteArray;

    public FileDTO() {}

    public FileDTO(String base64, String contentType, String fileName) {
        this.base64 = base64;
        this.contentType = contentType;
        this.fileName = fileName;
    }

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public byte[] getByteArray() {
        return byteArray;
    }

    public void setByteArray(byte[] byteArray) {
        this.byteArray = byteArray;
    }
}

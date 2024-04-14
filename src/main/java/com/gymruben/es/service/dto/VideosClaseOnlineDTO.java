package com.gymruben.es.service.dto;

import java.util.Objects;

public class VideosClaseOnlineDTO {
    private String id;
    private String tituloVideo;
    private String urlVideo;



    
    public String getId() {
        return this.id;
    }
    public void setId(String id) {
        this.id = id;

    } public String getTituloVideo() {
        return this.tituloVideo;
    }
    public void setTituloVideo(String tituloVideo) {
        this.tituloVideo = tituloVideo;

    }
    public String getUrlVideo() {
        return this.urlVideo;
    }
    public void setUrlVideo(String urlVideo) {
        this.urlVideo = urlVideo;
    }


       @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VideosClaseOnlineDTO)) {
            return false;
        }
        VideosClaseOnlineDTO videosClaseOnlineDTO = (VideosClaseOnlineDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, videosClaseOnlineDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return (
            "VideosClaseDTO{" +
            "id=" +
            getId() +
            "'" +
            ", tituloVideo='" +
            getTituloVideo() +
            "'" +
            ", urlVideo='" +
            getUrlVideo() +
            "" +
            "}"
            );
        }

    }


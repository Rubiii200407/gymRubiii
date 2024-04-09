package com.gymruben.es.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * A VideosPlanEntrenamiento.
 */
@Entity
@Table(name = "videos_plan_entrenamiento")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class VideosPlanEntrenamiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "titulo_video")
    private String tituloVideo;

    @Column(name = "url_video")
    private String urlVideo;



    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public VideosPlanEntrenamiento id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTituloVideo() {
        return this.tituloVideo;
    }

    public VideosPlanEntrenamiento tituloVideo(String tituloVideo) {
        this.setTituloVideo(tituloVideo);
        return this;
    }

    public void setTituloVideo(String tituloVideo) {
        this.tituloVideo = tituloVideo;
    }

   

    public String getUrlVideo() {
        return this.urlVideo;
    }

    public VideosPlanEntrenamiento urlVideo(String urlVideo) {
        this.setUrlVideo(urlVideo);
        return this;
    }

    public void setUrlVideo(String urlVideo) {
        this.urlVideo = urlVideo;
    }
   


    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VideosPlanEntrenamiento)) {
            return false;
        }
        return id != null && id.equals(((VideosPlanEntrenamiento) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VideosPlanEntrenamiento{" +
            "id=" + getId() +
            ", tituloVideo='" + getTituloVideo() + "'" +
            ", urlVideo='" + getUrlVideo() + "'" +
  
            "}";
    }
}

package com.gymruben.es.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 * A VideosClaseOnline.
 */
@Entity
@Table(name = "videos_clase_online")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class VideosClaseOnline implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "titulo_video")
    private String tituloVideo;

    @Column(name = "descripcion_video")
    private String descripcionVideo;

    @Column(name = "url_video")
    private String urlVideo;

    @Column(name = "duracion")
    private Long duracion;

    @ManyToOne
    private ClasesOnline claseOnline;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public VideosClaseOnline id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTituloVideo() {
        return this.tituloVideo;
    }

    public VideosClaseOnline tituloVideo(String tituloVideo) {
        this.setTituloVideo(tituloVideo);
        return this;
    }

    public void setTituloVideo(String tituloVideo) {
        this.tituloVideo = tituloVideo;
    }

    public String getDescripcionVideo() {
        return this.descripcionVideo;
    }

    public VideosClaseOnline descripcionVideo(String descripcionVideo) {
        this.setDescripcionVideo(descripcionVideo);
        return this;
    }

    public void setDescripcionVideo(String descripcionVideo) {
        this.descripcionVideo = descripcionVideo;
    }

    public String getUrlVideo() {
        return this.urlVideo;
    }

    public VideosClaseOnline urlVideo(String urlVideo) {
        this.setUrlVideo(urlVideo);
        return this;
    }

    public void setUrlVideo(String urlVideo) {
        this.urlVideo = urlVideo;
    }

    public Long getDuracion() {
        return this.duracion;
    }

    public VideosClaseOnline duracion(Long duracion) {
        this.setDuracion(duracion);
        return this;
    }

    public void setDuracion(Long duracion) {
        this.duracion = duracion;
    }

    public ClasesOnline getClaseOnline() {
        return this.claseOnline;
    }

    public void setClaseOnline(ClasesOnline clasesOnline) {
        this.claseOnline = clasesOnline;
    }

    public VideosClaseOnline claseOnline(ClasesOnline clasesOnline) {
        this.setClaseOnline(clasesOnline);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof VideosClaseOnline)) {
            return false;
        }
        return id != null && id.equals(((VideosClaseOnline) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "VideosClaseOnline{" +
            "id=" + getId() +
            ", tituloVideo='" + getTituloVideo() + "'" +
            ", descripcionVideo='" + getDescripcionVideo() + "'" +
            ", urlVideo='" + getUrlVideo() + "'" +
            ", duracion=" + getDuracion() +
            "}";
    }
}

package com.gymruben.es.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;

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

    @Column(name = "descripcion_video")
    private String descripcionVideo;

    @Column(name = "url_video")
    private String urlVideo;

    @Column(name = "duracion")
    private Long duracion;

    @Column(name = "fecha_publicacion")
    private Instant fechaPublicacion;

    @ManyToOne
    private PlanesEntrenamiento planEntrenamiento;

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

    public String getDescripcionVideo() {
        return this.descripcionVideo;
    }

    public VideosPlanEntrenamiento descripcionVideo(String descripcionVideo) {
        this.setDescripcionVideo(descripcionVideo);
        return this;
    }

    public void setDescripcionVideo(String descripcionVideo) {
        this.descripcionVideo = descripcionVideo;
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

    public Long getDuracion() {
        return this.duracion;
    }

    public VideosPlanEntrenamiento duracion(Long duracion) {
        this.setDuracion(duracion);
        return this;
    }

    public void setDuracion(Long duracion) {
        this.duracion = duracion;
    }

    public Instant getFechaPublicacion() {
        return this.fechaPublicacion;
    }

    public VideosPlanEntrenamiento fechaPublicacion(Instant fechaPublicacion) {
        this.setFechaPublicacion(fechaPublicacion);
        return this;
    }

    public void setFechaPublicacion(Instant fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }

    public PlanesEntrenamiento getPlanEntrenamiento() {
        return this.planEntrenamiento;
    }

    public void setPlanEntrenamiento(PlanesEntrenamiento planesEntrenamiento) {
        this.planEntrenamiento = planesEntrenamiento;
    }

    public VideosPlanEntrenamiento planEntrenamiento(PlanesEntrenamiento planesEntrenamiento) {
        this.setPlanEntrenamiento(planesEntrenamiento);
        return this;
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
            ", descripcionVideo='" + getDescripcionVideo() + "'" +
            ", urlVideo='" + getUrlVideo() + "'" +
            ", duracion=" + getDuracion() +
            ", fechaPublicacion='" + getFechaPublicacion() + "'" +
            "}";
    }
}

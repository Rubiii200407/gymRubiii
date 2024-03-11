package com.gymruben.es.domain;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * A ClasesOnline.
 */
@Entity
@Table(name = "clases_online")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ClasesOnline implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre_clase")
    private String nombreClase;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "fecha_clase")
    private Date fechaClase;

    @Column(name = "instructor")
    private String instructor;


    @Column(name = "hora_clase")
    private String horaClase;

    
    @Column(name = "codigo")
    private String codigo;
    @Column(name = "video_id")
    private String videoId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ClasesOnline id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreClase() {
        return this.nombreClase;
    }

    public ClasesOnline nombreClase(String nombreClase) {
        this.setNombreClase(nombreClase);
        return this;
    }

    public void setNombreClase(String nombreClase) {
        this.nombreClase = nombreClase;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public ClasesOnline descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Date getFechaClase() {
        return this.fechaClase;
    }

    public ClasesOnline fechaClase(Date fechaClase) {
        this.setFechaClase(fechaClase);
        return this;
    }

    public void setFechaClase(Date fechaClase) {
        this.fechaClase = fechaClase;
    }

    public String getInstructor() {
        return this.instructor;
    }

    public ClasesOnline instructor(String instructor) {
        this.setInstructor(instructor);
        return this;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    public String getHoraClase() {
        return this.horaClase;
    }

    public ClasesOnline horaClase(String horaClase) {
        this.setHoraClase(horaClase);
        return this;
    }

    public void setHoraClase(String horaClase) {
        this.horaClase = horaClase;
    }
    public String getCodigo() {
        return this.codigo;
    }

    public ClasesOnline codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    public String getVideoId() {
        return this.videoId;
    }

    public ClasesOnline videoId(String videoId) {
        this.setVideoId(videoId);
        return this;
    }

    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClasesOnline)) {
            return false;
        }
        return id != null && id.equals(((ClasesOnline) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ClasesOnline{" +
            "id=" + getId() +
            ", nombreClase='" + getNombreClase() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", fechaClase='" + getFechaClase() + "'" +
            ", instructor='" + getInstructor() + "'" +
            ", horaClase='" + getHoraClase() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", videoId='" + getVideoId() + "'" +
            "}";
    }
}

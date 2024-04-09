package com.gymruben.es.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * A PlanesEntrenamiento.
 */
@Entity
@Table(name = "planes_entrenamiento")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PlanesEntrenamiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre_plan")
    private String nombrePlan;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "instrucciones")
    private String instrucciones;

    @Column(name = "codigo")
    private String codigo;
    @Column(name = "video_id")
    private String videoId;

    @ManyToOne
    @JoinColumn(name ="usuario_id",referencedColumnName = "id")
    private User user;


    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PlanesEntrenamiento id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombrePlan() {
        return this.nombrePlan;
    }

    public PlanesEntrenamiento nombrePlan(String nombrePlan) {
        this.setNombrePlan(nombrePlan);
        return this;
    }

    public void setNombrePlan(String nombrePlan) {
        this.nombrePlan = nombrePlan;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public PlanesEntrenamiento descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getInstrucciones() {
        return this.instrucciones;
    }

    public PlanesEntrenamiento instrucciones(String instrucciones) {
        this.setInstrucciones(instrucciones);
        return this;
    }

    public void setInstrucciones(String instrucciones) {
        this.instrucciones = instrucciones;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public PlanesEntrenamiento codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PlanesEntrenamiento user(User user) {
        this.setUser(user);
        return this;
    }

    public String getVideoId() {
        return this.videoId;
    }

    public PlanesEntrenamiento videoId(String videoId) {
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
        if (!(o instanceof PlanesEntrenamiento)) {
            return false;
        }
        return id != null && id.equals(((PlanesEntrenamiento) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlanesEntrenamiento{" +
            "id=" + getId() +
            ", nombrePlan='" + getNombrePlan() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", instrucciones='" + getInstrucciones() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", videoId='" + getVideoId() + "'" +
            ", user='" + getUser() + "'" +
            "}";
    }
}


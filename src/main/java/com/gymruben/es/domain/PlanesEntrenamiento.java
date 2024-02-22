package com.gymruben.es.domain;

import java.io.Serializable;
import javax.persistence.*;

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

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "duracion")
    private Long duracion;

    @Column(name = "instrucciones")
    private String instrucciones;

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

    public String getTipo() {
        return this.tipo;
    }

    public PlanesEntrenamiento tipo(String tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Long getDuracion() {
        return this.duracion;
    }

    public PlanesEntrenamiento duracion(Long duracion) {
        this.setDuracion(duracion);
        return this;
    }

    public void setDuracion(Long duracion) {
        this.duracion = duracion;
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
            ", tipo='" + getTipo() + "'" +
            ", duracion=" + getDuracion() +
            ", instrucciones='" + getInstrucciones() + "'" +
            "}";
    }
}

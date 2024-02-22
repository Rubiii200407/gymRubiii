package com.gymruben.es.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 * A PlanesNutricion.
 */
@Entity
@Table(name = "planes_nutricion")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PlanesNutricion implements Serializable {

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

    @ManyToOne
    private Nutricion planNutricion;

    @ManyToOne
    private PlanesEntrenamiento planEntrenamiento;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PlanesNutricion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombrePlan() {
        return this.nombrePlan;
    }

    public PlanesNutricion nombrePlan(String nombrePlan) {
        this.setNombrePlan(nombrePlan);
        return this;
    }

    public void setNombrePlan(String nombrePlan) {
        this.nombrePlan = nombrePlan;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public PlanesNutricion descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipo() {
        return this.tipo;
    }

    public PlanesNutricion tipo(String tipo) {
        this.setTipo(tipo);
        return this;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Long getDuracion() {
        return this.duracion;
    }

    public PlanesNutricion duracion(Long duracion) {
        this.setDuracion(duracion);
        return this;
    }

    public void setDuracion(Long duracion) {
        this.duracion = duracion;
    }

    public String getInstrucciones() {
        return this.instrucciones;
    }

    public PlanesNutricion instrucciones(String instrucciones) {
        this.setInstrucciones(instrucciones);
        return this;
    }

    public void setInstrucciones(String instrucciones) {
        this.instrucciones = instrucciones;
    }

    public Nutricion getPlanNutricion() {
        return this.planNutricion;
    }

    public void setPlanNutricion(Nutricion nutricion) {
        this.planNutricion = nutricion;
    }

    public PlanesNutricion planNutricion(Nutricion nutricion) {
        this.setPlanNutricion(nutricion);
        return this;
    }

    public PlanesEntrenamiento getPlanEntrenamiento() {
        return this.planEntrenamiento;
    }

    public void setPlanEntrenamiento(PlanesEntrenamiento planesEntrenamiento) {
        this.planEntrenamiento = planesEntrenamiento;
    }

    public PlanesNutricion planEntrenamiento(PlanesEntrenamiento planesEntrenamiento) {
        this.setPlanEntrenamiento(planesEntrenamiento);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlanesNutricion)) {
            return false;
        }
        return id != null && id.equals(((PlanesNutricion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlanesNutricion{" +
            "id=" + getId() +
            ", nombrePlan='" + getNombrePlan() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", tipo='" + getTipo() + "'" +
            ", duracion=" + getDuracion() +
            ", instrucciones='" + getInstrucciones() + "'" +
            "}";
    }
}

package com.gymruben.es.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 * A Nutricion.
 */
@Entity
@Table(name = "nutricion")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Nutricion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre_plan_nutricion")
    private String nombrePlanNutricion;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "tipo_dieta")
    private String tipoDieta;

    @Column(name = "alimentos_recomendados")
    private String alimentosRecomendados;

    @Column(name = "instrucciones")
    private String instrucciones;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Nutricion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombrePlanNutricion() {
        return this.nombrePlanNutricion;
    }

    public Nutricion nombrePlanNutricion(String nombrePlanNutricion) {
        this.setNombrePlanNutricion(nombrePlanNutricion);
        return this;
    }

    public void setNombrePlanNutricion(String nombrePlanNutricion) {
        this.nombrePlanNutricion = nombrePlanNutricion;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Nutricion descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipoDieta() {
        return this.tipoDieta;
    }

    public Nutricion tipoDieta(String tipoDieta) {
        this.setTipoDieta(tipoDieta);
        return this;
    }

    public void setTipoDieta(String tipoDieta) {
        this.tipoDieta = tipoDieta;
    }

    public String getAlimentosRecomendados() {
        return this.alimentosRecomendados;
    }

    public Nutricion alimentosRecomendados(String alimentosRecomendados) {
        this.setAlimentosRecomendados(alimentosRecomendados);
        return this;
    }

    public void setAlimentosRecomendados(String alimentosRecomendados) {
        this.alimentosRecomendados = alimentosRecomendados;
    }

    public String getInstrucciones() {
        return this.instrucciones;
    }

    public Nutricion instrucciones(String instrucciones) {
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
        if (!(o instanceof Nutricion)) {
            return false;
        }
        return id != null && id.equals(((Nutricion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Nutricion{" +
            "id=" + getId() +
            ", nombrePlanNutricion='" + getNombrePlanNutricion() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", tipoDieta='" + getTipoDieta() + "'" +
            ", alimentosRecomendados='" + getAlimentosRecomendados() + "'" +
            ", instrucciones='" + getInstrucciones() + "'" +
            "}";
    }
}

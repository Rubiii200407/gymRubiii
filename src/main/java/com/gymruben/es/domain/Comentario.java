package com.gymruben.es.domain;

import java.io.Serializable;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * A Deportes.
 */
@Entity
@Table(name = "comentario")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Comentario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "fecha_creacion")
    private Instant fechaCreacion;

    @Column(name = "creador")
    private String creador;
    
    @ManyToOne()
    @JoinColumn(name ="deportes_id",referencedColumnName = "id")
    private Deportes deportes;
   
    @ManyToOne()
    @JoinColumn(name ="clases_online_id",referencedColumnName = "id")
    private ClasesOnline clasesOnline;   

    @ManyToOne()
    @JoinColumn(name ="planes_nutricion_id",referencedColumnName = "id")
    private PlanesNutricion planesNutricion;   

    @ManyToOne()
    @JoinColumn(name ="planes_entrenamiento_id",referencedColumnName = "id")
    private PlanesEntrenamiento planesEntrenamiento;
    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Comentario id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Comentario descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }


    public Instant getFechaCreacion() {
        return this.fechaCreacion;
    }

    public Comentario fechaCreacion(Instant fechaCreacion) {
        this.setFechaCreacion(fechaCreacion);
        return this;
    }

    public void setFechaCreacion(Instant fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }
    public String getCreador() {
        return this.creador;
    }

    public Comentario creador(String creador) {
        this.setCreador(creador);
        return this;
    }

    public void setCreador(String creador) {
        this.creador = creador;
    }

    public Deportes getDeportes() {
        return this.deportes;
    }

    public void setDeportes(Deportes deportes) {
        this.deportes = deportes;
    }

    public Comentario deportes(Deportes deportes) {
        this.setDeportes(deportes);
        return this;
    }
    public ClasesOnline getClasesOnline() {
        return this.clasesOnline;
    }

    public void setClasesOnline(ClasesOnline clasesOnline) {
        this.clasesOnline = clasesOnline;
    }

    public Comentario clasesOnline(ClasesOnline clasesOnline) {
        this.setClasesOnline(clasesOnline);
        return this;
    }
    public PlanesNutricion getPlanesNutricion() {
        return this.planesNutricion;
    }

    public void setPlanesNutricion(PlanesNutricion planesNutricion) {
        this.planesNutricion = planesNutricion;
    }

    public Comentario planesNutricion(PlanesNutricion planesNutricion) {
        this.setPlanesNutricion(planesNutricion);
        return this;
    }
    public PlanesEntrenamiento getPlanesEntrenamiento() {
        return this.planesEntrenamiento;
    }

    public void setPlanesEntrenamiento(PlanesEntrenamiento planesEntrenamiento) {
        this.planesEntrenamiento = planesEntrenamiento;
    }

    public Comentario planesEntrenamiento(PlanesEntrenamiento planesEntrenamiento) {
        this.setPlanesEntrenamiento(planesEntrenamiento);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Comentario)) {
            return false;
        }
        return id != null && id.equals(((Comentario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Comentario{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", fechaCreacion='" + getFechaCreacion() + "'" +   
            ", creador='" + getCreador() + "'" +
            ", deportes='" + getDeportes() + "'" +
            ", clasesOnline='" + getClasesOnline() + "'" +
            ", planEntrenamiento='" + getPlanesEntrenamiento() + "'" +
            ", planNutricion='" + getPlanesNutricion() + "'" +
            "}";
    }
}

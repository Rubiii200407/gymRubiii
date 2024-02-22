package com.gymruben.es.domain;

import java.io.Serializable;
import javax.persistence.*;

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

    @Column(name = "horario")
    private String horario;

    @Column(name = "instructor")
    private String instructor;

    @Column(name = "capacidad")
    private String capacidad;

    @Column(name = "participantes_inscritos")
    private String participantesInscritos;

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

    public String getHorario() {
        return this.horario;
    }

    public ClasesOnline horario(String horario) {
        this.setHorario(horario);
        return this;
    }

    public void setHorario(String horario) {
        this.horario = horario;
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

    public String getCapacidad() {
        return this.capacidad;
    }

    public ClasesOnline capacidad(String capacidad) {
        this.setCapacidad(capacidad);
        return this;
    }

    public void setCapacidad(String capacidad) {
        this.capacidad = capacidad;
    }

    public String getParticipantesInscritos() {
        return this.participantesInscritos;
    }

    public ClasesOnline participantesInscritos(String participantesInscritos) {
        this.setParticipantesInscritos(participantesInscritos);
        return this;
    }

    public void setParticipantesInscritos(String participantesInscritos) {
        this.participantesInscritos = participantesInscritos;
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
            ", horario='" + getHorario() + "'" +
            ", instructor='" + getInstructor() + "'" +
            ", capacidad='" + getCapacidad() + "'" +
            ", participantesInscritos='" + getParticipantesInscritos() + "'" +
            "}";
    }
}

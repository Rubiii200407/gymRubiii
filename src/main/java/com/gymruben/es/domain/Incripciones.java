package com.gymruben.es.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;

/**
 * A Incripciones.
 */
@Entity
@Table(name = "incripciones")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Incripciones implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre_usuario")
    private String nombreUsuario;

    @Column(name = "tipo_evento")
    private String tipoEvento;

    @Column(name = "nombre_evento")
    private String nombreEvento;

    @Column(name = "fecha_inscripcion")
    private Instant fechaInscripcion;

    @ManyToOne
    private ClasesOnline claseOnline;

    @ManyToOne
    private Deportes deporte;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Incripciones id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreUsuario() {
        return this.nombreUsuario;
    }

    public Incripciones nombreUsuario(String nombreUsuario) {
        this.setNombreUsuario(nombreUsuario);
        return this;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getTipoEvento() {
        return this.tipoEvento;
    }

    public Incripciones tipoEvento(String tipoEvento) {
        this.setTipoEvento(tipoEvento);
        return this;
    }

    public void setTipoEvento(String tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public String getNombreEvento() {
        return this.nombreEvento;
    }

    public Incripciones nombreEvento(String nombreEvento) {
        this.setNombreEvento(nombreEvento);
        return this;
    }

    public void setNombreEvento(String nombreEvento) {
        this.nombreEvento = nombreEvento;
    }

    public Instant getFechaInscripcion() {
        return this.fechaInscripcion;
    }

    public Incripciones fechaInscripcion(Instant fechaInscripcion) {
        this.setFechaInscripcion(fechaInscripcion);
        return this;
    }

    public void setFechaInscripcion(Instant fechaInscripcion) {
        this.fechaInscripcion = fechaInscripcion;
    }

    public ClasesOnline getClaseOnline() {
        return this.claseOnline;
    }

    public void setClaseOnline(ClasesOnline clasesOnline) {
        this.claseOnline = clasesOnline;
    }

    public Incripciones claseOnline(ClasesOnline clasesOnline) {
        this.setClaseOnline(clasesOnline);
        return this;
    }

    public Deportes getDeporte() {
        return this.deporte;
    }

    public void setDeporte(Deportes deportes) {
        this.deporte = deportes;
    }

    public Incripciones deporte(Deportes deportes) {
        this.setDeporte(deportes);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Incripciones)) {
            return false;
        }
        return id != null && id.equals(((Incripciones) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Incripciones{" +
            "id=" + getId() +
            ", nombreUsuario='" + getNombreUsuario() + "'" +
            ", tipoEvento='" + getTipoEvento() + "'" +
            ", nombreEvento='" + getNombreEvento() + "'" +
            ", fechaInscripcion='" + getFechaInscripcion() + "'" +
            "}";
    }
}

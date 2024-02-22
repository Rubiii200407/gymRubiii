package com.gymruben.es.domain;

import java.io.Serializable;
import javax.persistence.*;

/**
 * A Deportes.
 */
@Entity
@Table(name = "deportes")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Deportes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre_deporte")
    private String nombreDeporte;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "horarios_disponibles")
    private String horariosDisponibles;

    @Column(name = "participantes_inscritos")
    private String participantesInscritos;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Deportes id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreDeporte() {
        return this.nombreDeporte;
    }

    public Deportes nombreDeporte(String nombreDeporte) {
        this.setNombreDeporte(nombreDeporte);
        return this;
    }

    public void setNombreDeporte(String nombreDeporte) {
        this.nombreDeporte = nombreDeporte;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Deportes descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getHorariosDisponibles() {
        return this.horariosDisponibles;
    }

    public Deportes horariosDisponibles(String horariosDisponibles) {
        this.setHorariosDisponibles(horariosDisponibles);
        return this;
    }

    public void setHorariosDisponibles(String horariosDisponibles) {
        this.horariosDisponibles = horariosDisponibles;
    }

    public String getParticipantesInscritos() {
        return this.participantesInscritos;
    }

    public Deportes participantesInscritos(String participantesInscritos) {
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
        if (!(o instanceof Deportes)) {
            return false;
        }
        return id != null && id.equals(((Deportes) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Deportes{" +
            "id=" + getId() +
            ", nombreDeporte='" + getNombreDeporte() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", horariosDisponibles='" + getHorariosDisponibles() + "'" +
            ", participantesInscritos='" + getParticipantesInscritos() + "'" +
            "}";
    }
}

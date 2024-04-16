package com.gymruben.es.service.dto;

import java.time.Instant;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class ComentarioDTO  {
    private Long id;
    private String descripcion;
    private Instant fechaCreacion;
    private String creador;
    private DeportesDTO deportes;
    private ClasesOnlineDTO clasesOnline;
    private PlanesEntrenamientoDTO planesEntrenamiento;
    private PlanesNutricionDTO planesNutricion;

    private Set<FicheroDTO> ficheros = new HashSet<>();

    public Long getId() {
        return this.id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getDescripcion() {
        return this.descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;

    } 
    public String getCreador() {
        return this.creador;
    }
    public void setCreador(String creador) {
        this.creador = creador;

    } 
   
    public DeportesDTO getDeportes() {
        return this.deportes;
    }

    public void setDeportes(DeportesDTO deportesDTO) {
        this.deportes = deportesDTO;
    }

    public Instant getFechaCreacion() {
        return this.fechaCreacion;
    }
    public void setFechaCreacion(Instant fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }
    public ClasesOnlineDTO getClasesOnline() {
        return this.clasesOnline;
    }

    public void setClasesOnline(ClasesOnlineDTO clasesOnlineDTO) {
        this.clasesOnline = clasesOnlineDTO;
    }
    public PlanesNutricionDTO getPlanesNutricion() {
        return this.planesNutricion;
    }

    public void setPlanesNutricion(PlanesNutricionDTO planesNutricionDTO) {
        this.planesNutricion = planesNutricionDTO;
    }
    public PlanesEntrenamientoDTO getPlanesEntrenamiento() {
        return this.planesEntrenamiento;
    }

    public void setPlanesEntrenamiento(PlanesEntrenamientoDTO planesEntrenamientoDTO) {
        this.planesEntrenamiento = planesEntrenamientoDTO;
    }
    public Set<FicheroDTO> getFicheros() {
        return this.ficheros;
    }

    public void setFicheros(Set<FicheroDTO> ficheros) {
        this.ficheros = ficheros;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ComentarioDTO)) {
            return false;
        }
        ComentarioDTO comentarioDTO = (ComentarioDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, comentarioDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return (
            "ComentarioDTO{" +
            "id=" +
            getId() +
            "'" +
            ", descripcion='" +
            getDescripcion() +
            "" +
            ", fechaCreacion='" +
            getFechaCreacion() +
            ", creador='" +
            getCreador() +
            ", deportesDTO='" +
            getDeportes() +
            ", clasesOnlineDTO='" +
            getClasesOnline() +
            ", planesNutricionDTO='" +
            getPlanesNutricion() +
            ", planesEntrenamiento='" +
            getPlanesEntrenamiento() +
            "}"
            );
        }
}

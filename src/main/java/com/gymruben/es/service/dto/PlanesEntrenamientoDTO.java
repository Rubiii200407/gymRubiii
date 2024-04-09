package com.gymruben.es.service.dto;

import java.util.Objects;

public class PlanesEntrenamientoDTO {
     private String id;
    private String codigo;
    private String nombrePlan;
    private String descripcion;
    private String instrucciones;
    private String videoId;






    public String getId() {
        return this.id;
    }
    public void setId(String id) {
        this.id = id;

    } public String getCodigo() {
        return this.codigo;
    }
    public void setCodigo(String codigo) {
        this.codigo = codigo;

    } public String getNombrePlan() {
        return this.nombrePlan;
    }
    public void setNombrePlan(String nombrePlan) {
        this.nombrePlan = nombrePlan;
    }

    public String getDescripcion() {
        return this.descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public String getInstrucciones() {
        return this.instrucciones;
    }
    public void setInstrucciones(String instrucciones) {
        this.instrucciones = instrucciones;
    }
    public String getVideoId() {
        return this.videoId;
    }
    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlanesEntrenamientoDTO)) {
            return false;
        }
        PlanesEntrenamientoDTO planesEntrenamientoDTO = (PlanesEntrenamientoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, planesEntrenamientoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return (
            "PlanesEntrenamientonDTO{" +
            "id=" +
            getId() +
            "'" +
            ", titulo='" +
            getCodigo() +
            "'" +
            ", nombrePlan='" +
            getNombrePlan() +
            "'" +
            ", descripcion='" +
            getDescripcion() +
            "" +
            ", instrucciones='" +
            getInstrucciones() +
            "" +
            ", videoId='" +
            getVideoId() +
            "" +
            "}"
            );
        }
}


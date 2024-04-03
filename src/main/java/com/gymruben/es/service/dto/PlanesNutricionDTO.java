package com.gymruben.es.service.dto;

import java.util.Objects;

public class PlanesNutricionDTO {
     private String id;
    private String codigo;
    private String nombrePlan;
    private String descripcion;
    private String instrucciones;
    private String alimentosRecomendados;





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
    public String getAlimentosRecomendados() {
        return this.alimentosRecomendados;
    }
    public void setAlimentosRecomendados(String hoalimentosRecomendadosraClase) {
        this.alimentosRecomendados = alimentosRecomendados;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlanesNutricionDTO)) {
            return false;
        }
        PlanesNutricionDTO planesNutricionDTO = (PlanesNutricionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, planesNutricionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return (
            "EmpresaDenunciaDTO{" +
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
            ", alimentosRecomendados='" +
            getAlimentosRecomendados() +
            "" +
      
            "}"
            );
        }
}
    


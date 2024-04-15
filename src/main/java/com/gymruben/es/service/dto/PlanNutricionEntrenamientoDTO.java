package com.gymruben.es.service.dto;

import java.util.Objects;

public class PlanNutricionEntrenamientoDTO {


    private String id;
    private String nombrePlan;
    private String instrucciones;
    private String videoId;


    public String getId() {
        return this.id;
    }
    public void setId(String id) {
        this.id = id;


    } public String getNombrePlan() {
        return this.nombrePlan;
    }
    public void setNombrePlan(String nombrePlan) {
        this.nombrePlan = nombrePlan;
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
        if (!(o instanceof PlanNutricionEntrenamientoDTO)) {
            return false;
        }
        PlanNutricionEntrenamientoDTO planNutricionEntrenamientoDTO = (PlanNutricionEntrenamientoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, planNutricionEntrenamientoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return (
            "PlanNutricionEntrenamientoDTO{" +
            "id=" +
            getId() +
            "'" +
    
            ", nombrePlan='" +
            getNombrePlan() +
            "'" +
        
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


    


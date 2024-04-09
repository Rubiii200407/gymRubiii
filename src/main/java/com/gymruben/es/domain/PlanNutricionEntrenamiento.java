package com.gymruben.es.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * A VideosPlanEntrenamiento.
 */
@Entity
@Table(name = "plan_nutricion_entrenamiento")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PlanNutricionEntrenamiento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre_plan")
    private String nombrePlan;

    @Column(name = "instrucciones")
    private String instrucciones;

    @Column(name = "video")
    private String video;



    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PlanNutricionEntrenamiento id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombrePlan() {
        return this.nombrePlan;
    }

    public PlanNutricionEntrenamiento nombrePlan(String nombrePlan) {
        this.setNombrePlan(nombrePlan);
        return this;
    }

    public void setNombrePlan(String nombrePlan) {
        this.nombrePlan = nombrePlan;
    }

   

    public String getInstrucciones() {
        return this.instrucciones;
    }

    public PlanNutricionEntrenamiento instrucciones(String instrucciones) {
        this.setInstrucciones(instrucciones);
        return this;
    }

    public void setInstrucciones(String instrucciones) {
        this.instrucciones = instrucciones;
    }
    public String getVideo() {
        return this.video;
    }

    public PlanNutricionEntrenamiento video(String video) {
        this.setVideo(video);
        return this;
    }

    public void setVideo(String video) {
        this.video = video;
    }
   


    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlanNutricionEntrenamiento)) {
            return false;
        }
        return id != null && id.equals(((PlanNutricionEntrenamiento) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlanNutricionEntrenamiento{" +
            "id=" + getId() +
            ", nombrePlan='" + getNombrePlan() + "'" +
            ", instrucciones='" + getInstrucciones() + "'" +
            ", video='" + getVideo() + "'" +
  
            "}";
    }
}

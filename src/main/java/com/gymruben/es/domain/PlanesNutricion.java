package com.gymruben.es.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 * A PlanesNutricion.
 */
@Entity
@Table(name = "planes_nutricion")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PlanesNutricion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre_plan")
    private String nombrePlan;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "instrucciones")
    private String instrucciones;

    @Column(name = "alimentos_recomendados")
    private String alimentosRecomendados;

    
    @Column(name = "codigo")
    private String codigo;
    
    @OneToMany(mappedBy = "planesNutricion",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Comentario>comentarios=new ArrayList<>();

    @ManyToOne
    @JoinColumn(name ="usuario_id",referencedColumnName = "id")
    private User user;


    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PlanesNutricion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombrePlan() {
        return this.nombrePlan;
    }

    public PlanesNutricion nombrePlan(String nombrePlan) {
        this.setNombrePlan(nombrePlan);
        return this;
    }

    public void setNombrePlan(String nombrePlan) {
        this.nombrePlan = nombrePlan;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public PlanesNutricion descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getInstrucciones() {
        return this.instrucciones;
    }

    public PlanesNutricion instrucciones(String instrucciones) {
        this.setInstrucciones(instrucciones);
        return this;
    }

    public void setInstrucciones(String instrucciones) {
        this.instrucciones = instrucciones;
    }
    public String getAlimentosRecomendados() {
        return this.alimentosRecomendados;
    }

    public PlanesNutricion alimentosRecomendados(String alimentosRecomendados) {
        this.setAlimentosRecomendados(alimentosRecomendados);
        return this;
    }

    public void setAlimentosRecomendados(String alimentosRecomendados) {
        this.alimentosRecomendados = alimentosRecomendados;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public PlanesNutricion codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public PlanesNutricion user(User user) {
        this.setUser(user);
        return this;
    }

    

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlanesNutricion)) {
            return false;
        }
        return id != null && id.equals(((PlanesNutricion) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PlanesNutricion{" +
            "id=" + getId() +
            ", nombrePlan='" + getNombrePlan() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", instrucciones='" + getInstrucciones() + "'" +
            ", alimentosRecomendados='" + getAlimentosRecomendados() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", user='" + getUser() + "'" +
            "}";
    }
}

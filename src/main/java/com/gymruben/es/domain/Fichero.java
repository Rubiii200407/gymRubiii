package com.gymruben.es.domain;


import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Fichero.
 */
@Entity
@Table(name = "fichero")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Fichero implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "path")
    private String path;

    @Column(name = "content_type")
    private String contentType;

    @Column(name = "nombre")
    private String nombre;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    @ManyToOne
    @JsonIgnore
    private Comentario comentario;


 

    public Long getId() {
        return this.id;
    }

    public Fichero id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPath() {
        return this.path;
    }

    public Fichero path(String path) {
        this.setPath(path);
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getContentType() {
        return this.contentType;
    }

    public Fichero contentType(String contentType) {
        this.setContentType(contentType);
        return this;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Fichero nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public Comentario getComentario() {
        return this.comentario;
    }
    public Fichero comentario(Comentario comentario) {
        this.setComentario(comentario);
        return this;
    }
    public void setComentario(Comentario comentario) {
        this.comentario = comentario;
    }

  

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fichero)) {
            return false;
        }
        return id != null && id.equals(((Fichero) o).id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EmpresaDenuncia{" +
            "id=" + getId() + 
            "path="+getPath()+
            "contentType="+getContentType()+
            "nombre="+getNombre()+
            "}";
    }
}

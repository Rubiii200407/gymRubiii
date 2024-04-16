package com.gymruben.es.service.dto;

import java.io.Serializable;
import java.util.Objects;

import com.gymruben.es.domain.Comentario;

@SuppressWarnings("common-java:DuplicatedBlocks")
public class FicheroDTO implements Serializable {

    private Long id;

    private String path;

    private String contentType;

    private String nombre;

    private Comentario comentario;

    private Long tamano;


    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPath() {
        return this.path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getContentType() {
        return this.contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getNombre() {
        return this.nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Comentario getComentario() {
        return this.comentario;
    }

    public void setComentario(Comentario comentario) {
        this.comentario = comentario;
    }

    public Long gettamano() {
        return this.tamano;
    }

    public void settamano(Long tamano) {
        this.tamano = tamano;
    }

   

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FicheroDTO)) {
            return false;
        }
        FicheroDTO ficheroDTO = (FicheroDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, ficheroDTO.id);
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
            ", path='" +
            getPath() +
            "'" +
            ", contentType='" +
            getContentType() +
            "'" +
            ", nombre='" +
            getNombre() +
            "" +
            "'" +
            "}"
        );
    }
}

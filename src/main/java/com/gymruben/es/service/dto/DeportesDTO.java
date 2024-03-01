package com.gymruben.es.service.dto;

import java.util.Objects;

public class DeportesDTO {
     private String id;
    private String codigo;
    private String codigoCompleto;

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

    } public String getCodigoCompleto() {
        return this.codigoCompleto;
    }
    public void setCodigoCompleto(String codigoCompleto) {
        this.codigoCompleto = codigoCompleto;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DeportesDTO)) {
            return false;
        }
        DeportesDTO deportesDTO = (DeportesDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, deportesDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return (
            "DeportesDTO{" +
            "id=" +
            getId() +
            "'" +
    
            ", titulo='" +
            getCodigo() +
            "'" +
            ", descripcion='" +
            getCodigoCompleto() +
            "" +
            "}"
            );
        }
}

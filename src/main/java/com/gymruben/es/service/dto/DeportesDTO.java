package com.gymruben.es.service.dto;

import java.time.Instant;
import java.util.Objects;


public class DeportesDTO {
    private String id;
    private String codigo;
    private String nombreDeporte;
    private String descripcion;
    private Instant fechaDeporte;
    private String horaDeporte;
    private String instructor;
    private String codigoCompleto;
    private UserDTO user;

    public String getId() {
        return this.id;
    }
    public void setId(String id) {
        this.id = id;

    } 
    public String getCodigo() {
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
    public UserDTO getUser() {
        return this.user;
    }

    public void setUser(UserDTO userDTO) {
        this.user = userDTO;
    }
    public String getNombreDeporte() {
        return this.nombreDeporte;
    }
    public void setNombreDeporte(String nombreDeporte) {
        this.nombreDeporte = nombreDeporte;
    }
    public String getDescripcion() {
        return this.descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public String getHoraDeporte() {
        return this.horaDeporte;
    }
    public void setHoraDeporte(String horaDeporte) {
        this.horaDeporte = horaDeporte;
    }
    public String getInstructor() {
        return this.instructor;
    }
    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }
    public Instant getFechaDeporte() {
        return this.fechaDeporte;
    }
    public void setFechaDeporte(Instant fechaDeporte) {
        this.fechaDeporte = fechaDeporte;
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
            ", nombreDeporte='" +
            getNombreDeporte() +
            ", fechaDeporte='" +
            getFechaDeporte() +
            ", instructor='" +
            getInstructor() +
            ", horaDeporte='" +
            getHoraDeporte() +
            ", descripcion='" +
            getDescripcion() +
            ", userDto='" +
            getUser() +
            "}"
            );
        }
}

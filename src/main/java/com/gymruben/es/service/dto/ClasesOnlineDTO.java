package com.gymruben.es.service.dto;

import java.util.Date;
import java.util.Objects;

public class ClasesOnlineDTO {
    private String id;
    private String codigo;
    private String codigoCompleto;
    private String nombreClase;
    private String descripcion;
    private Date fechaClase;
    private String horaClase;
    private String videoId;
    private String instructor;
    private UserDTO user;




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
    public String getNombreClase() {
        return this.nombreClase;
    }
    public void setNombreClase(String nombreClase) {
        this.nombreClase = nombreClase;
    }
    public String getDescripcion() {
        return this.descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
    public Date getFechaClase() {
        return this.fechaClase;
    }
    public void setFechaClase(Date fechaClase) {
        this.fechaClase = fechaClase;
    }
    public String getHoraClase() {
        return this.horaClase;
    }
    public void setHoraClase(String horaClase) {
        this.horaClase = horaClase;
    }
    public String getVideoId() {
        return this.videoId;
    }
    public void setVideoId(String videoId) {
        this.videoId = videoId;
    }
    public String getInstructor() {
        return this.instructor;
    }
    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }
     public UserDTO getUser() {
        return this.user;
    }

    public void setUser(UserDTO userDTO) {
        this.user = userDTO;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ClasesOnlineDTO)) {
            return false;
        }
        ClasesOnlineDTO clasesOnlineDTO = (ClasesOnlineDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, clasesOnlineDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    @Override
    public String toString() {
        return (
            "ClasesOnlineDTO{" +
            "id=" +
            getId() +
            "'" +
            ", titulo='" +
            getCodigo() +
            "'" +
            ", codigoCompleto='" +
            getCodigoCompleto() +
            "'" +
            ", descripcion='" +
            getDescripcion() +
            "" +
            ", nombreClase='" +
            getNombreClase() +
            "" +
            ", fechaClase='" +
            getFechaClase() +
            "" +
            ", horaClase='" +
            getHoraClase() +
            "" +
            ", horaClase='" +
            getVideoId() +
            "" +
            "}"
            );
        }
}

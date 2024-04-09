package com.gymruben.es.service.helper;


import java.io.Serializable;
import java.time.Instant;

public class FilterHelper implements Serializable {



    private Instant fechaInicio;
    private Instant fechaFin;
    private String hora;
    private String nombre;
    private String codigo;

    private Boolean interno;

    public Instant getFechaInicio() {
        return this.fechaInicio;
    }

    public FilterHelper fechaInicio(Instant fechaInicio) {
        this.setFechaInicio(fechaInicio);
        return this;
    }

    public void setFechaInicio(Instant fechaInicio) {
        this.fechaInicio = fechaInicio;
    }
    public Instant getFechaFin() {
        return this.fechaFin;
    }

    public FilterHelper fechaFin(Instant fechaFin) {
        this.setFechaFin(fechaFin);
        return this;
    }

    public void setFechaFin(Instant fechaFin) {
        this.fechaFin = fechaFin;
    }

   

    public String getNombre() {
        return this.nombre;
    }

    public FilterHelper nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public FilterHelper codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    public String getHora() {
        return this.hora;
    }

    public FilterHelper hora(String hora) {
        this.setHora(hora);
        return this;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

  

    @Override
    public String toString() {
        return (
            "FilterHelper{" +
            ", fechaInicio=" +
            fechaInicio+
            ", fechaFin=" +
            fechaFin+
            ", codigo=" +
            codigo +
            ", nombre=" +
            nombre +
            "}"
        );
    }
}

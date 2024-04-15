package com.gymruben.es.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
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
 * A Deportes.
 */
@Entity
@Table(name = "deportes")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Deportes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nombre_deporte")
    private String nombreDeporte;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "fecha_deporte")
    private Date fechaDeporte;

    @Column(name = "hora_deporte")
    private String horaDeporte;

    @Column(name = "codigo")
    private String codigo;

    @Column(name = "instructor")
    private String instructor;

   @OneToMany(mappedBy = "deportes",cascade = CascadeType.ALL,orphanRemoval = true)
   private List<Comentario>comentarios=new ArrayList<>();

    @ManyToOne
    @JoinColumn(name ="usuario_id",referencedColumnName = "id")
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Deportes id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreDeporte() {
        return this.nombreDeporte;
    }

    public Deportes nombreDeporte(String nombreDeporte) {
        this.setNombreDeporte(nombreDeporte);
        return this;
    }

    public void setNombreDeporte(String nombreDeporte) {
        this.nombreDeporte = nombreDeporte;
    }

    public String getDescripcion() {
        return this.descripcion;
    }

    public Deportes descripcion(String descripcion) {
        this.setDescripcion(descripcion);
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Date getFechaDeporte() {
        return this.fechaDeporte;
    }

    public Deportes fechaDeporte(Date fechaDeporte) {
        this.setFechaDeporte(fechaDeporte);
        return this;
    }

    public void setFechaDeporte(Date fechaDeporte) {
        this.fechaDeporte = fechaDeporte;
    }
    public String getHoraDeporte() {
        return this.horaDeporte;
    }

    public Deportes horaDeporte(String horaDeporte) {
        this.setHoraDeporte(horaDeporte);
        return this;
    }

    public void setHoraDeporte(String horaDeporte) {
        this.horaDeporte = horaDeporte;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Deportes codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }
    public String getInstructor() {
        return this.instructor;
    }

    public Deportes instructor(String instructor) {
        this.setInstructor(instructor);
        return this;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }
    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Deportes user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Deportes)) {
            return false;
        }
        return id != null && id.equals(((Deportes) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Deportes{" +
            "id=" + getId() +
            ", nombreDeporte='" + getNombreDeporte() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", horaFecha='" + getFechaDeporte() + "'" +
            ", horaDeporte='" + getHoraDeporte() + "'" +     
            ", codigo='" + getCodigo() + "'" +
            ", instructor='" + getInstructor() + "'" +
            ", user='" + getUser() + "'" +
            "}";
    }
}

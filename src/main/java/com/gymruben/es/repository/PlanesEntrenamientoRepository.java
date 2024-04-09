package com.gymruben.es.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gymruben.es.domain.PlanesEntrenamiento;

/**
 * Spring Data JPA repository for the PlanesEntrenamiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanesEntrenamientoRepository extends JpaRepository<PlanesEntrenamiento, Long>,JpaSpecificationExecutor<PlanesEntrenamiento>  {
     @Query("SELECT e FROM PlanesEntrenamiento e WHERE e.codigo = ?1")
    Optional<PlanesEntrenamiento>findByCodigo(String codigo);
}

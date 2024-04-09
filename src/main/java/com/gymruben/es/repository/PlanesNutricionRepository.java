package com.gymruben.es.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gymruben.es.domain.PlanesNutricion;

/**
 * Spring Data JPA repository for the PlanesNutricion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanesNutricionRepository extends JpaRepository<PlanesNutricion, Long>,JpaSpecificationExecutor<PlanesNutricion> {
    @Query("SELECT e FROM PlanesNutricion e WHERE e.codigo = ?1")
    Optional<PlanesNutricion>findByCodigo(String codigo);
}

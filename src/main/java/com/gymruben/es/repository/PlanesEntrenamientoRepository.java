package com.gymruben.es.repository;

import com.gymruben.es.domain.PlanesEntrenamiento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PlanesEntrenamiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanesEntrenamientoRepository extends JpaRepository<PlanesEntrenamiento, Long> {}

package com.gymruben.es.repository;

import com.gymruben.es.domain.PlanesNutricion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the PlanesNutricion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanesNutricionRepository extends JpaRepository<PlanesNutricion, Long> {}

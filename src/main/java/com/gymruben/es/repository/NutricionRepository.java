package com.gymruben.es.repository;

import com.gymruben.es.domain.Nutricion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Nutricion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NutricionRepository extends JpaRepository<Nutricion, Long> {}

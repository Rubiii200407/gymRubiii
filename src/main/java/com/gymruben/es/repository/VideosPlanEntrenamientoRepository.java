package com.gymruben.es.repository;

import com.gymruben.es.domain.VideosPlanEntrenamiento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the VideosPlanEntrenamiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VideosPlanEntrenamientoRepository extends JpaRepository<VideosPlanEntrenamiento, Long> {}

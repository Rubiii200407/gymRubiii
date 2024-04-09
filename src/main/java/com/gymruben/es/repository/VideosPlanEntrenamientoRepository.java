package com.gymruben.es.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gymruben.es.domain.VideosPlanEntrenamiento;

/**
 * Spring Data JPA repository for the VideosPlanEntrenamiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VideosPlanEntrenamientoRepository extends JpaRepository<VideosPlanEntrenamiento, Long> {
         Optional<VideosPlanEntrenamiento>findByTituloVideo(String tituloVideo);
}

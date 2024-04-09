package com.gymruben.es.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gymruben.es.domain.PlanNutricionEntrenamiento;

/**
 * Spring Data JPA repository for the PlanNutricionEntrenamiento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PlanNutricionEntrenamientoRepository extends JpaRepository<PlanNutricionEntrenamiento, Long> {

}

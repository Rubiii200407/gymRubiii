package com.gymruben.es.repository;

import com.gymruben.es.domain.Incripciones;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Incripciones entity.
 */
@SuppressWarnings("unused")
@Repository
public interface IncripcionesRepository extends JpaRepository<Incripciones, Long> {}

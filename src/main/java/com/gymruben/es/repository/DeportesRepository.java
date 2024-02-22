package com.gymruben.es.repository;

import com.gymruben.es.domain.Deportes;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Deportes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeportesRepository extends JpaRepository<Deportes, Long> {}

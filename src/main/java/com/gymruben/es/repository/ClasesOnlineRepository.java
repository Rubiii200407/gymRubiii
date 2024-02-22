package com.gymruben.es.repository;

import com.gymruben.es.domain.ClasesOnline;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the ClasesOnline entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClasesOnlineRepository extends JpaRepository<ClasesOnline, Long> {}

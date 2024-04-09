package com.gymruben.es.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gymruben.es.domain.ClasesOnline;

/**
 * Spring Data JPA repository for the ClasesOnline entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ClasesOnlineRepository extends JpaRepository<ClasesOnline, Long>,JpaSpecificationExecutor<ClasesOnline>  {
     @Query("SELECT e FROM ClasesOnline e WHERE e.codigo = ?1")
    Optional<ClasesOnline> findByCodigo(String codigo);
}

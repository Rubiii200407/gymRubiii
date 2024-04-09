package com.gymruben.es.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gymruben.es.domain.Deportes;

/**
 * Spring Data JPA repository for the Deportes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DeportesRepository extends JpaRepository<Deportes, Long>,JpaSpecificationExecutor<Deportes> {
    @Query("SELECT e FROM Deportes e WHERE e.codigo = ?1")
    Optional<Deportes> findByCodigo(String codigo);
}

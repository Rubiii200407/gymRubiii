package com.gymruben.es.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.gymruben.es.domain.Fichero;

/**
 * Spring Data JPA repository for the EmpresaReferencia entity.
 */
public interface FicheroRepository extends JpaRepository<Fichero, Long>, JpaSpecificationExecutor<Fichero> {}

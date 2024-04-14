package com.gymruben.es.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.gymruben.es.domain.Comentario;

/**
 * Spring Data JPA repository for the Deportes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, Long>, JpaSpecificationExecutor<Comentario> {
    @Query("SELECT c FROM Comentario c WHERE c.deportes.id = ?1")
    List<Comentario> findAllByDeportes(Long id);
    @Query("SELECT c FROM Comentario c WHERE c.clasesOnline.id = ?1")
    List<Comentario> findAllByClasesOnline(Long id);
    @Query("SELECT c FROM Comentario c WHERE c.planesEntrenamiento.id = ?1")
    List<Comentario> findAllByPlanesEntrenamiento(Long id);
    @Query("SELECT c FROM Comentario c WHERE c.planesNutricion.id = ?1")
    List<Comentario> findAllByPlanesNutricion(Long id);
}


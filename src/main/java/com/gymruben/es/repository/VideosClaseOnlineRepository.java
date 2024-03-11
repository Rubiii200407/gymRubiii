package com.gymruben.es.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gymruben.es.domain.VideosClaseOnline;

/**
 * Spring Data JPA repository for the VideosClaseOnline entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VideosClaseOnlineRepository extends JpaRepository<VideosClaseOnline, Long> {
   
     Optional<VideosClaseOnline>findByTituloVideo(String tituloVideo);

}

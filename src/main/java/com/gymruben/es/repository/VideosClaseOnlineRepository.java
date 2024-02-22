package com.gymruben.es.repository;

import com.gymruben.es.domain.VideosClaseOnline;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the VideosClaseOnline entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VideosClaseOnlineRepository extends JpaRepository<VideosClaseOnline, Long> {}

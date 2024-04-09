package com.gymruben.es.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gymruben.es.domain.VideosPlanEntrenamiento;
import com.gymruben.es.repository.VideosPlanEntrenamientoRepository;
import com.gymruben.es.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.gymruben.es.domain.VideosPlanEntrenamiento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VideosPlanEntrenamientoResource {

    private final Logger log = LoggerFactory.getLogger(VideosPlanEntrenamientoResource.class);

    private static final String ENTITY_NAME = "videosPlanEntrenamiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VideosPlanEntrenamientoRepository videosPlanEntrenamientoRepository;

    public VideosPlanEntrenamientoResource(VideosPlanEntrenamientoRepository videosPlanEntrenamientoRepository) {
        this.videosPlanEntrenamientoRepository = videosPlanEntrenamientoRepository;
    }

    /**
     * {@code POST  /videos-plan-entrenamientos} : Create a new videosPlanEntrenamiento.
     *
     * @param videosPlanEntrenamiento the videosPlanEntrenamiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new videosPlanEntrenamiento, or with status {@code 400 (Bad Request)} if the videosPlanEntrenamiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/videos-plan-entrenamientos")
    public ResponseEntity<VideosPlanEntrenamiento> createVideosPlanEntrenamiento(
        @RequestBody VideosPlanEntrenamiento videosPlanEntrenamiento
    ) throws URISyntaxException {
        log.debug("REST request to save VideosPlanEntrenamiento : {}", videosPlanEntrenamiento);
        if (videosPlanEntrenamiento.getId() != null) {
            throw new BadRequestAlertException("A new videosPlanEntrenamiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VideosPlanEntrenamiento result = videosPlanEntrenamientoRepository.save(videosPlanEntrenamiento);
        return ResponseEntity
            .created(new URI("/api/videos-plan-entrenamientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /videos-plan-entrenamientos/:id} : Updates an existing videosPlanEntrenamiento.
     *
     * @param id the id of the videosPlanEntrenamiento to save.
     * @param videosPlanEntrenamiento the videosPlanEntrenamiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated videosPlanEntrenamiento,
     * or with status {@code 400 (Bad Request)} if the videosPlanEntrenamiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the videosPlanEntrenamiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/videos-plan-entrenamientos/{id}")
    public ResponseEntity<VideosPlanEntrenamiento> updateVideosPlanEntrenamiento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VideosPlanEntrenamiento videosPlanEntrenamiento
    ) throws URISyntaxException {
        log.debug("REST request to update VideosPlanEntrenamiento : {}, {}", id, videosPlanEntrenamiento);
        if (videosPlanEntrenamiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, videosPlanEntrenamiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!videosPlanEntrenamientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        VideosPlanEntrenamiento result = videosPlanEntrenamientoRepository.save(videosPlanEntrenamiento);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, videosPlanEntrenamiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /videos-plan-entrenamientos/:id} : Partial updates given fields of an existing videosPlanEntrenamiento, field will ignore if it is null
     *
     * @param id the id of the videosPlanEntrenamiento to save.
     * @param videosPlanEntrenamiento the videosPlanEntrenamiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated videosPlanEntrenamiento,
     * or with status {@code 400 (Bad Request)} if the videosPlanEntrenamiento is not valid,
     * or with status {@code 404 (Not Found)} if the videosPlanEntrenamiento is not found,
     * or with status {@code 500 (Internal Server Error)} if the videosPlanEntrenamiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/videos-plan-entrenamientos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<VideosPlanEntrenamiento> partialUpdateVideosPlanEntrenamiento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VideosPlanEntrenamiento videosPlanEntrenamiento
    ) throws URISyntaxException {
        log.debug("REST request to partial update VideosPlanEntrenamiento partially : {}, {}", id, videosPlanEntrenamiento);
        if (videosPlanEntrenamiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, videosPlanEntrenamiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!videosPlanEntrenamientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VideosPlanEntrenamiento> result = videosPlanEntrenamientoRepository
            .findById(videosPlanEntrenamiento.getId())
            .map(existingVideosPlanEntrenamiento -> {
                if (videosPlanEntrenamiento.getTituloVideo() != null) {
                    existingVideosPlanEntrenamiento.setTituloVideo(videosPlanEntrenamiento.getTituloVideo());
                }
                if (videosPlanEntrenamiento.getUrlVideo() != null) {
                    existingVideosPlanEntrenamiento.setUrlVideo(videosPlanEntrenamiento.getUrlVideo());
                }
            

                return existingVideosPlanEntrenamiento;
            })
            .map(videosPlanEntrenamientoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, videosPlanEntrenamiento.getId().toString())
        );
    }

    /**
     * {@code GET  /videos-plan-entrenamientos} : get all the videosPlanEntrenamientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of videosPlanEntrenamientos in body.
     */
    @GetMapping("/videos-plan-entrenamientos")
    public List<VideosPlanEntrenamiento> getAllVideosPlanEntrenamientos() {
        log.debug("REST request to get all VideosPlanEntrenamientos");
        return videosPlanEntrenamientoRepository.findAll();
    }

    /**
     * {@code GET  /videos-plan-entrenamientos/:id} : get the "id" videosPlanEntrenamiento.
     *
     * @param id the id of the videosPlanEntrenamiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the videosPlanEntrenamiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/videos-plan-entrenamientos/{id}")
    public ResponseEntity<VideosPlanEntrenamiento> getVideosPlanEntrenamiento(@PathVariable Long id) {
        log.debug("REST request to get VideosPlanEntrenamiento : {}", id);
        Optional<VideosPlanEntrenamiento> videosPlanEntrenamiento = videosPlanEntrenamientoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(videosPlanEntrenamiento);
    }

    /**
     * {@code DELETE  /videos-plan-entrenamientos/:id} : delete the "id" videosPlanEntrenamiento.
     *
     * @param id the id of the videosPlanEntrenamiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/videos-plan-entrenamientos/{id}")
    public ResponseEntity<Void> deleteVideosPlanEntrenamiento(@PathVariable Long id) {
        log.debug("REST request to delete VideosPlanEntrenamiento : {}", id);
        videosPlanEntrenamientoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

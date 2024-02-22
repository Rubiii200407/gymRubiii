package com.gymruben.es.web.rest;

import com.gymruben.es.domain.VideosClaseOnline;
import com.gymruben.es.repository.VideosClaseOnlineRepository;
import com.gymruben.es.web.rest.errors.BadRequestAlertException;
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
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.gymruben.es.domain.VideosClaseOnline}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class VideosClaseOnlineResource {

    private final Logger log = LoggerFactory.getLogger(VideosClaseOnlineResource.class);

    private static final String ENTITY_NAME = "videosClaseOnline";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final VideosClaseOnlineRepository videosClaseOnlineRepository;

    public VideosClaseOnlineResource(VideosClaseOnlineRepository videosClaseOnlineRepository) {
        this.videosClaseOnlineRepository = videosClaseOnlineRepository;
    }

    /**
     * {@code POST  /videos-clase-onlines} : Create a new videosClaseOnline.
     *
     * @param videosClaseOnline the videosClaseOnline to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new videosClaseOnline, or with status {@code 400 (Bad Request)} if the videosClaseOnline has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/videos-clase-onlines")
    public ResponseEntity<VideosClaseOnline> createVideosClaseOnline(@RequestBody VideosClaseOnline videosClaseOnline)
        throws URISyntaxException {
        log.debug("REST request to save VideosClaseOnline : {}", videosClaseOnline);
        if (videosClaseOnline.getId() != null) {
            throw new BadRequestAlertException("A new videosClaseOnline cannot already have an ID", ENTITY_NAME, "idexists");
        }
        VideosClaseOnline result = videosClaseOnlineRepository.save(videosClaseOnline);
        return ResponseEntity
            .created(new URI("/api/videos-clase-onlines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /videos-clase-onlines/:id} : Updates an existing videosClaseOnline.
     *
     * @param id the id of the videosClaseOnline to save.
     * @param videosClaseOnline the videosClaseOnline to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated videosClaseOnline,
     * or with status {@code 400 (Bad Request)} if the videosClaseOnline is not valid,
     * or with status {@code 500 (Internal Server Error)} if the videosClaseOnline couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/videos-clase-onlines/{id}")
    public ResponseEntity<VideosClaseOnline> updateVideosClaseOnline(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VideosClaseOnline videosClaseOnline
    ) throws URISyntaxException {
        log.debug("REST request to update VideosClaseOnline : {}, {}", id, videosClaseOnline);
        if (videosClaseOnline.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, videosClaseOnline.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!videosClaseOnlineRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        VideosClaseOnline result = videosClaseOnlineRepository.save(videosClaseOnline);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, videosClaseOnline.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /videos-clase-onlines/:id} : Partial updates given fields of an existing videosClaseOnline, field will ignore if it is null
     *
     * @param id the id of the videosClaseOnline to save.
     * @param videosClaseOnline the videosClaseOnline to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated videosClaseOnline,
     * or with status {@code 400 (Bad Request)} if the videosClaseOnline is not valid,
     * or with status {@code 404 (Not Found)} if the videosClaseOnline is not found,
     * or with status {@code 500 (Internal Server Error)} if the videosClaseOnline couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/videos-clase-onlines/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<VideosClaseOnline> partialUpdateVideosClaseOnline(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody VideosClaseOnline videosClaseOnline
    ) throws URISyntaxException {
        log.debug("REST request to partial update VideosClaseOnline partially : {}, {}", id, videosClaseOnline);
        if (videosClaseOnline.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, videosClaseOnline.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!videosClaseOnlineRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<VideosClaseOnline> result = videosClaseOnlineRepository
            .findById(videosClaseOnline.getId())
            .map(existingVideosClaseOnline -> {
                if (videosClaseOnline.getTituloVideo() != null) {
                    existingVideosClaseOnline.setTituloVideo(videosClaseOnline.getTituloVideo());
                }
                if (videosClaseOnline.getDescripcionVideo() != null) {
                    existingVideosClaseOnline.setDescripcionVideo(videosClaseOnline.getDescripcionVideo());
                }
                if (videosClaseOnline.getUrlVideo() != null) {
                    existingVideosClaseOnline.setUrlVideo(videosClaseOnline.getUrlVideo());
                }
                if (videosClaseOnline.getDuracion() != null) {
                    existingVideosClaseOnline.setDuracion(videosClaseOnline.getDuracion());
                }

                return existingVideosClaseOnline;
            })
            .map(videosClaseOnlineRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, videosClaseOnline.getId().toString())
        );
    }

    /**
     * {@code GET  /videos-clase-onlines} : get all the videosClaseOnlines.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of videosClaseOnlines in body.
     */
    @GetMapping("/videos-clase-onlines")
    public List<VideosClaseOnline> getAllVideosClaseOnlines() {
        log.debug("REST request to get all VideosClaseOnlines");
        return videosClaseOnlineRepository.findAll();
    }

    /**
     * {@code GET  /videos-clase-onlines/:id} : get the "id" videosClaseOnline.
     *
     * @param id the id of the videosClaseOnline to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the videosClaseOnline, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/videos-clase-onlines/{id}")
    public ResponseEntity<VideosClaseOnline> getVideosClaseOnline(@PathVariable Long id) {
        log.debug("REST request to get VideosClaseOnline : {}", id);
        Optional<VideosClaseOnline> videosClaseOnline = videosClaseOnlineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(videosClaseOnline);
    }

    /**
     * {@code DELETE  /videos-clase-onlines/:id} : delete the "id" videosClaseOnline.
     *
     * @param id the id of the videosClaseOnline to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/videos-clase-onlines/{id}")
    public ResponseEntity<Void> deleteVideosClaseOnline(@PathVariable Long id) {
        log.debug("REST request to delete VideosClaseOnline : {}", id);
        videosClaseOnlineRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

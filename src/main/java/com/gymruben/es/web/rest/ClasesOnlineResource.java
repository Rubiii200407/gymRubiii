package com.gymruben.es.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

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

import com.gymruben.es.domain.ClasesOnline;
import com.gymruben.es.repository.ClasesOnlineRepository;
import com.gymruben.es.service.dto.ClasesOnlineDTO;
import com.gymruben.es.service.mapper.ClasesOnlineMapper;
import com.gymruben.es.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.gymruben.es.domain.ClasesOnline}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ClasesOnlineResource {

    private final Logger log = LoggerFactory.getLogger(ClasesOnlineResource.class);

    private static final String ENTITY_NAME = "clasesOnline";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClasesOnlineRepository clasesOnlineRepository;

    private final ClasesOnlineMapper clasesOnlineMapper;

    public ClasesOnlineResource(ClasesOnlineRepository clasesOnlineRepository,ClasesOnlineMapper clasesOnlineMapper) {
        this.clasesOnlineRepository = clasesOnlineRepository;
        this.clasesOnlineMapper = clasesOnlineMapper;
    }

    /**
     * {@code POST  /clases-onlines} : Create a new clasesOnline.
     *
     * @param clasesOnline the clasesOnline to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clasesOnline, or with status {@code 400 (Bad Request)} if the clasesOnline has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/clases-onlines")
    public ResponseEntity<ClasesOnline> createClasesOnline(@RequestBody ClasesOnline clasesOnline) throws URISyntaxException {
        log.debug("REST request to save ClasesOnline : {}", clasesOnline);
        if (clasesOnline.getId() != null) {
            throw new BadRequestAlertException("A new clasesOnline cannot already have an ID", ENTITY_NAME, "idexists");
        }
        String uuid = UUID.randomUUID().toString();
        clasesOnline.setCodigo(uuid);
        ClasesOnline result = clasesOnlineRepository.save(clasesOnline);
        return ResponseEntity
            .created(new URI("/api/clases-onlines/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /clases-onlines/:id} : Updates an existing clasesOnline.
     *
     * @param id the id of the clasesOnline to save.
     * @param clasesOnline the clasesOnline to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clasesOnline,
     * or with status {@code 400 (Bad Request)} if the clasesOnline is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clasesOnline couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/clases-onlines/{id}")
    public ResponseEntity<ClasesOnline> updateClasesOnline(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ClasesOnline clasesOnline
    ) throws URISyntaxException {
        log.debug("REST request to update ClasesOnline : {}, {}", id, clasesOnline);
        if (clasesOnline.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, clasesOnline.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clasesOnlineRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        ClasesOnline result = clasesOnlineRepository.save(clasesOnline);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clasesOnline.getId().toString()))
            .body(result);
    }
    @GetMapping("/clases-onlines/UUID/{codigoCreador}")
    public ResponseEntity<ClasesOnlineDTO> getClasesOnlineUUID(@PathVariable String codigo) {
        log.debug("REST request to get clasesOnline : {}", codigo);
        Optional<ClasesOnlineDTO> clasesOnline = clasesOnlineRepository
            .findByCodigo(codigo)
            .map(clasesOnlineMapper::toDtoCodigo);
        return ResponseUtil.wrapOrNotFound(clasesOnline);
    }

    /**
     * {@code PATCH  /clases-onlines/:id} : Partial updates given fields of an existing clasesOnline, field will ignore if it is null
     *
     * @param id the id of the clasesOnline to save.
     * @param clasesOnline the clasesOnline to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clasesOnline,
     * or with status {@code 400 (Bad Request)} if the clasesOnline is not valid,
     * or with status {@code 404 (Not Found)} if the clasesOnline is not found,
     * or with status {@code 500 (Internal Server Error)} if the clasesOnline couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/clases-onlines/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ClasesOnline> partialUpdateClasesOnline(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ClasesOnline clasesOnline
    ) throws URISyntaxException {
        log.debug("REST request to partial update ClasesOnline partially : {}, {}", id, clasesOnline);
        if (clasesOnline.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, clasesOnline.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!clasesOnlineRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ClasesOnline> result = clasesOnlineRepository
            .findById(clasesOnline.getId())
            .map(existingClasesOnline -> {
                if (clasesOnline.getNombreClase() != null) {
                    existingClasesOnline.setNombreClase(clasesOnline.getNombreClase());
                }
                if (clasesOnline.getDescripcion() != null) {
                    existingClasesOnline.setDescripcion(clasesOnline.getDescripcion());
                }
                if (clasesOnline.getFechaClase() != null) {
                    existingClasesOnline.setFechaClase(clasesOnline.getFechaClase());
                }
                if (clasesOnline.getInstructor() != null) {
                    existingClasesOnline.setInstructor(clasesOnline.getInstructor());
                }
                if (clasesOnline.getHoraClase() != null) {
                    existingClasesOnline.setHoraClase(clasesOnline.getHoraClase());
                }
                if (clasesOnline.getCodigo() != null) {
                    existingClasesOnline.setCodigo(clasesOnline.getCodigo());
                }

                return existingClasesOnline;
            })
            .map(clasesOnlineRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clasesOnline.getId().toString())
        );
    }

    /**
     * {@code GET  /clases-onlines} : get all the clasesOnlines.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clasesOnlines in body.
     */
    @GetMapping("/clases-onlines")
    public List<ClasesOnline> getAllClasesOnlines() {
        log.debug("REST request to get all ClasesOnlines");
        return clasesOnlineRepository.findAll();
    }

    /**
     * {@code GET  /clases-onlines/:id} : get the "id" clasesOnline.
     *
     * @param id the id of the clasesOnline to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clasesOnline, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/clases-onlines/{id}")
    public ResponseEntity<ClasesOnline> getClasesOnline(@PathVariable Long id) {
        log.debug("REST request to get ClasesOnline : {}", id);
        Optional<ClasesOnline> clasesOnline = clasesOnlineRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(clasesOnline);
    }

    /**
     * {@code DELETE  /clases-onlines/:id} : delete the "id" clasesOnline.
     *
     * @param id the id of the clasesOnline to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/clases-onlines/{id}")
    public ResponseEntity<Void> deleteClasesOnline(@PathVariable Long id) {
        log.debug("REST request to delete ClasesOnline : {}", id);
        clasesOnlineRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

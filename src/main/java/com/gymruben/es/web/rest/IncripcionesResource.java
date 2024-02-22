package com.gymruben.es.web.rest;

import com.gymruben.es.domain.Incripciones;
import com.gymruben.es.repository.IncripcionesRepository;
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
 * REST controller for managing {@link com.gymruben.es.domain.Incripciones}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class IncripcionesResource {

    private final Logger log = LoggerFactory.getLogger(IncripcionesResource.class);

    private static final String ENTITY_NAME = "incripciones";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IncripcionesRepository incripcionesRepository;

    public IncripcionesResource(IncripcionesRepository incripcionesRepository) {
        this.incripcionesRepository = incripcionesRepository;
    }

    /**
     * {@code POST  /incripciones} : Create a new incripciones.
     *
     * @param incripciones the incripciones to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new incripciones, or with status {@code 400 (Bad Request)} if the incripciones has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/incripciones")
    public ResponseEntity<Incripciones> createIncripciones(@RequestBody Incripciones incripciones) throws URISyntaxException {
        log.debug("REST request to save Incripciones : {}", incripciones);
        if (incripciones.getId() != null) {
            throw new BadRequestAlertException("A new incripciones cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Incripciones result = incripcionesRepository.save(incripciones);
        return ResponseEntity
            .created(new URI("/api/incripciones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /incripciones/:id} : Updates an existing incripciones.
     *
     * @param id the id of the incripciones to save.
     * @param incripciones the incripciones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated incripciones,
     * or with status {@code 400 (Bad Request)} if the incripciones is not valid,
     * or with status {@code 500 (Internal Server Error)} if the incripciones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/incripciones/{id}")
    public ResponseEntity<Incripciones> updateIncripciones(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Incripciones incripciones
    ) throws URISyntaxException {
        log.debug("REST request to update Incripciones : {}, {}", id, incripciones);
        if (incripciones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, incripciones.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!incripcionesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Incripciones result = incripcionesRepository.save(incripciones);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, incripciones.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /incripciones/:id} : Partial updates given fields of an existing incripciones, field will ignore if it is null
     *
     * @param id the id of the incripciones to save.
     * @param incripciones the incripciones to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated incripciones,
     * or with status {@code 400 (Bad Request)} if the incripciones is not valid,
     * or with status {@code 404 (Not Found)} if the incripciones is not found,
     * or with status {@code 500 (Internal Server Error)} if the incripciones couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/incripciones/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Incripciones> partialUpdateIncripciones(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Incripciones incripciones
    ) throws URISyntaxException {
        log.debug("REST request to partial update Incripciones partially : {}, {}", id, incripciones);
        if (incripciones.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, incripciones.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!incripcionesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Incripciones> result = incripcionesRepository
            .findById(incripciones.getId())
            .map(existingIncripciones -> {
                if (incripciones.getNombreUsuario() != null) {
                    existingIncripciones.setNombreUsuario(incripciones.getNombreUsuario());
                }
                if (incripciones.getTipoEvento() != null) {
                    existingIncripciones.setTipoEvento(incripciones.getTipoEvento());
                }
                if (incripciones.getNombreEvento() != null) {
                    existingIncripciones.setNombreEvento(incripciones.getNombreEvento());
                }
                if (incripciones.getFechaInscripcion() != null) {
                    existingIncripciones.setFechaInscripcion(incripciones.getFechaInscripcion());
                }

                return existingIncripciones;
            })
            .map(incripcionesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, incripciones.getId().toString())
        );
    }

    /**
     * {@code GET  /incripciones} : get all the incripciones.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of incripciones in body.
     */
    @GetMapping("/incripciones")
    public List<Incripciones> getAllIncripciones() {
        log.debug("REST request to get all Incripciones");
        return incripcionesRepository.findAll();
    }

    /**
     * {@code GET  /incripciones/:id} : get the "id" incripciones.
     *
     * @param id the id of the incripciones to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the incripciones, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/incripciones/{id}")
    public ResponseEntity<Incripciones> getIncripciones(@PathVariable Long id) {
        log.debug("REST request to get Incripciones : {}", id);
        Optional<Incripciones> incripciones = incripcionesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(incripciones);
    }

    /**
     * {@code DELETE  /incripciones/:id} : delete the "id" incripciones.
     *
     * @param id the id of the incripciones to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/incripciones/{id}")
    public ResponseEntity<Void> deleteIncripciones(@PathVariable Long id) {
        log.debug("REST request to delete Incripciones : {}", id);
        incripcionesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

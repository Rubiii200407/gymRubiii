package com.gymruben.es.web.rest;

import com.gymruben.es.domain.PlanesEntrenamiento;
import com.gymruben.es.repository.PlanesEntrenamientoRepository;
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
 * REST controller for managing {@link com.gymruben.es.domain.PlanesEntrenamiento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlanesEntrenamientoResource {

    private final Logger log = LoggerFactory.getLogger(PlanesEntrenamientoResource.class);

    private static final String ENTITY_NAME = "planesEntrenamiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlanesEntrenamientoRepository planesEntrenamientoRepository;

    public PlanesEntrenamientoResource(PlanesEntrenamientoRepository planesEntrenamientoRepository) {
        this.planesEntrenamientoRepository = planesEntrenamientoRepository;
    }

    /**
     * {@code POST  /planes-entrenamientos} : Create a new planesEntrenamiento.
     *
     * @param planesEntrenamiento the planesEntrenamiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new planesEntrenamiento, or with status {@code 400 (Bad Request)} if the planesEntrenamiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/planes-entrenamientos")
    public ResponseEntity<PlanesEntrenamiento> createPlanesEntrenamiento(@RequestBody PlanesEntrenamiento planesEntrenamiento)
        throws URISyntaxException {
        log.debug("REST request to save PlanesEntrenamiento : {}", planesEntrenamiento);
        if (planesEntrenamiento.getId() != null) {
            throw new BadRequestAlertException("A new planesEntrenamiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlanesEntrenamiento result = planesEntrenamientoRepository.save(planesEntrenamiento);
        return ResponseEntity
            .created(new URI("/api/planes-entrenamientos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /planes-entrenamientos/:id} : Updates an existing planesEntrenamiento.
     *
     * @param id the id of the planesEntrenamiento to save.
     * @param planesEntrenamiento the planesEntrenamiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planesEntrenamiento,
     * or with status {@code 400 (Bad Request)} if the planesEntrenamiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the planesEntrenamiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/planes-entrenamientos/{id}")
    public ResponseEntity<PlanesEntrenamiento> updatePlanesEntrenamiento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PlanesEntrenamiento planesEntrenamiento
    ) throws URISyntaxException {
        log.debug("REST request to update PlanesEntrenamiento : {}, {}", id, planesEntrenamiento);
        if (planesEntrenamiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, planesEntrenamiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!planesEntrenamientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PlanesEntrenamiento result = planesEntrenamientoRepository.save(planesEntrenamiento);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planesEntrenamiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /planes-entrenamientos/:id} : Partial updates given fields of an existing planesEntrenamiento, field will ignore if it is null
     *
     * @param id the id of the planesEntrenamiento to save.
     * @param planesEntrenamiento the planesEntrenamiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planesEntrenamiento,
     * or with status {@code 400 (Bad Request)} if the planesEntrenamiento is not valid,
     * or with status {@code 404 (Not Found)} if the planesEntrenamiento is not found,
     * or with status {@code 500 (Internal Server Error)} if the planesEntrenamiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/planes-entrenamientos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PlanesEntrenamiento> partialUpdatePlanesEntrenamiento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PlanesEntrenamiento planesEntrenamiento
    ) throws URISyntaxException {
        log.debug("REST request to partial update PlanesEntrenamiento partially : {}, {}", id, planesEntrenamiento);
        if (planesEntrenamiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, planesEntrenamiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!planesEntrenamientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PlanesEntrenamiento> result = planesEntrenamientoRepository
            .findById(planesEntrenamiento.getId())
            .map(existingPlanesEntrenamiento -> {
                if (planesEntrenamiento.getNombrePlan() != null) {
                    existingPlanesEntrenamiento.setNombrePlan(planesEntrenamiento.getNombrePlan());
                }
                if (planesEntrenamiento.getDescripcion() != null) {
                    existingPlanesEntrenamiento.setDescripcion(planesEntrenamiento.getDescripcion());
                }
                if (planesEntrenamiento.getTipo() != null) {
                    existingPlanesEntrenamiento.setTipo(planesEntrenamiento.getTipo());
                }
                if (planesEntrenamiento.getDuracion() != null) {
                    existingPlanesEntrenamiento.setDuracion(planesEntrenamiento.getDuracion());
                }
                if (planesEntrenamiento.getInstrucciones() != null) {
                    existingPlanesEntrenamiento.setInstrucciones(planesEntrenamiento.getInstrucciones());
                }

                return existingPlanesEntrenamiento;
            })
            .map(planesEntrenamientoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planesEntrenamiento.getId().toString())
        );
    }

    /**
     * {@code GET  /planes-entrenamientos} : get all the planesEntrenamientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planesEntrenamientos in body.
     */
    @GetMapping("/planes-entrenamientos")
    public List<PlanesEntrenamiento> getAllPlanesEntrenamientos() {
        log.debug("REST request to get all PlanesEntrenamientos");
        return planesEntrenamientoRepository.findAll();
    }

    /**
     * {@code GET  /planes-entrenamientos/:id} : get the "id" planesEntrenamiento.
     *
     * @param id the id of the planesEntrenamiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planesEntrenamiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/planes-entrenamientos/{id}")
    public ResponseEntity<PlanesEntrenamiento> getPlanesEntrenamiento(@PathVariable Long id) {
        log.debug("REST request to get PlanesEntrenamiento : {}", id);
        Optional<PlanesEntrenamiento> planesEntrenamiento = planesEntrenamientoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(planesEntrenamiento);
    }

    /**
     * {@code DELETE  /planes-entrenamientos/:id} : delete the "id" planesEntrenamiento.
     *
     * @param id the id of the planesEntrenamiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/planes-entrenamientos/{id}")
    public ResponseEntity<Void> deletePlanesEntrenamiento(@PathVariable Long id) {
        log.debug("REST request to delete PlanesEntrenamiento : {}", id);
        planesEntrenamientoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

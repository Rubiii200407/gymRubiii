package com.gymruben.es.web.rest;

import com.gymruben.es.domain.PlanesNutricion;
import com.gymruben.es.repository.PlanesNutricionRepository;
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
 * REST controller for managing {@link com.gymruben.es.domain.PlanesNutricion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlanesNutricionResource {

    private final Logger log = LoggerFactory.getLogger(PlanesNutricionResource.class);

    private static final String ENTITY_NAME = "planesNutricion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlanesNutricionRepository planesNutricionRepository;

    public PlanesNutricionResource(PlanesNutricionRepository planesNutricionRepository) {
        this.planesNutricionRepository = planesNutricionRepository;
    }

    /**
     * {@code POST  /planes-nutricions} : Create a new planesNutricion.
     *
     * @param planesNutricion the planesNutricion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new planesNutricion, or with status {@code 400 (Bad Request)} if the planesNutricion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/planes-nutricions")
    public ResponseEntity<PlanesNutricion> createPlanesNutricion(@RequestBody PlanesNutricion planesNutricion) throws URISyntaxException {
        log.debug("REST request to save PlanesNutricion : {}", planesNutricion);
        if (planesNutricion.getId() != null) {
            throw new BadRequestAlertException("A new planesNutricion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlanesNutricion result = planesNutricionRepository.save(planesNutricion);
        return ResponseEntity
            .created(new URI("/api/planes-nutricions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /planes-nutricions/:id} : Updates an existing planesNutricion.
     *
     * @param id the id of the planesNutricion to save.
     * @param planesNutricion the planesNutricion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planesNutricion,
     * or with status {@code 400 (Bad Request)} if the planesNutricion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the planesNutricion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/planes-nutricions/{id}")
    public ResponseEntity<PlanesNutricion> updatePlanesNutricion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PlanesNutricion planesNutricion
    ) throws URISyntaxException {
        log.debug("REST request to update PlanesNutricion : {}, {}", id, planesNutricion);
        if (planesNutricion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, planesNutricion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!planesNutricionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PlanesNutricion result = planesNutricionRepository.save(planesNutricion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planesNutricion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /planes-nutricions/:id} : Partial updates given fields of an existing planesNutricion, field will ignore if it is null
     *
     * @param id the id of the planesNutricion to save.
     * @param planesNutricion the planesNutricion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planesNutricion,
     * or with status {@code 400 (Bad Request)} if the planesNutricion is not valid,
     * or with status {@code 404 (Not Found)} if the planesNutricion is not found,
     * or with status {@code 500 (Internal Server Error)} if the planesNutricion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/planes-nutricions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PlanesNutricion> partialUpdatePlanesNutricion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PlanesNutricion planesNutricion
    ) throws URISyntaxException {
        log.debug("REST request to partial update PlanesNutricion partially : {}, {}", id, planesNutricion);
        if (planesNutricion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, planesNutricion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!planesNutricionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PlanesNutricion> result = planesNutricionRepository
            .findById(planesNutricion.getId())
            .map(existingPlanesNutricion -> {
                if (planesNutricion.getNombrePlan() != null) {
                    existingPlanesNutricion.setNombrePlan(planesNutricion.getNombrePlan());
                }
                if (planesNutricion.getDescripcion() != null) {
                    existingPlanesNutricion.setDescripcion(planesNutricion.getDescripcion());
                }
                if (planesNutricion.getTipo() != null) {
                    existingPlanesNutricion.setTipo(planesNutricion.getTipo());
                }
                if (planesNutricion.getDuracion() != null) {
                    existingPlanesNutricion.setDuracion(planesNutricion.getDuracion());
                }
                if (planesNutricion.getInstrucciones() != null) {
                    existingPlanesNutricion.setInstrucciones(planesNutricion.getInstrucciones());
                }

                return existingPlanesNutricion;
            })
            .map(planesNutricionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planesNutricion.getId().toString())
        );
    }

    /**
     * {@code GET  /planes-nutricions} : get all the planesNutricions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planesNutricions in body.
     */
    @GetMapping("/planes-nutricions")
    public List<PlanesNutricion> getAllPlanesNutricions() {
        log.debug("REST request to get all PlanesNutricions");
        return planesNutricionRepository.findAll();
    }

    /**
     * {@code GET  /planes-nutricions/:id} : get the "id" planesNutricion.
     *
     * @param id the id of the planesNutricion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planesNutricion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/planes-nutricions/{id}")
    public ResponseEntity<PlanesNutricion> getPlanesNutricion(@PathVariable Long id) {
        log.debug("REST request to get PlanesNutricion : {}", id);
        Optional<PlanesNutricion> planesNutricion = planesNutricionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(planesNutricion);
    }

    /**
     * {@code DELETE  /planes-nutricions/:id} : delete the "id" planesNutricion.
     *
     * @param id the id of the planesNutricion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/planes-nutricions/{id}")
    public ResponseEntity<Void> deletePlanesNutricion(@PathVariable Long id) {
        log.debug("REST request to delete PlanesNutricion : {}", id);
        planesNutricionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

package com.gymruben.es.web.rest;

import com.gymruben.es.domain.Nutricion;
import com.gymruben.es.repository.NutricionRepository;
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
 * REST controller for managing {@link com.gymruben.es.domain.Nutricion}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NutricionResource {

    private final Logger log = LoggerFactory.getLogger(NutricionResource.class);

    private static final String ENTITY_NAME = "nutricion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NutricionRepository nutricionRepository;

    public NutricionResource(NutricionRepository nutricionRepository) {
        this.nutricionRepository = nutricionRepository;
    }

    /**
     * {@code POST  /nutricions} : Create a new nutricion.
     *
     * @param nutricion the nutricion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nutricion, or with status {@code 400 (Bad Request)} if the nutricion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/nutricions")
    public ResponseEntity<Nutricion> createNutricion(@RequestBody Nutricion nutricion) throws URISyntaxException {
        log.debug("REST request to save Nutricion : {}", nutricion);
        if (nutricion.getId() != null) {
            throw new BadRequestAlertException("A new nutricion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Nutricion result = nutricionRepository.save(nutricion);
        return ResponseEntity
            .created(new URI("/api/nutricions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /nutricions/:id} : Updates an existing nutricion.
     *
     * @param id the id of the nutricion to save.
     * @param nutricion the nutricion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nutricion,
     * or with status {@code 400 (Bad Request)} if the nutricion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the nutricion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/nutricions/{id}")
    public ResponseEntity<Nutricion> updateNutricion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Nutricion nutricion
    ) throws URISyntaxException {
        log.debug("REST request to update Nutricion : {}, {}", id, nutricion);
        if (nutricion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nutricion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nutricionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Nutricion result = nutricionRepository.save(nutricion);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nutricion.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /nutricions/:id} : Partial updates given fields of an existing nutricion, field will ignore if it is null
     *
     * @param id the id of the nutricion to save.
     * @param nutricion the nutricion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nutricion,
     * or with status {@code 400 (Bad Request)} if the nutricion is not valid,
     * or with status {@code 404 (Not Found)} if the nutricion is not found,
     * or with status {@code 500 (Internal Server Error)} if the nutricion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/nutricions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Nutricion> partialUpdateNutricion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Nutricion nutricion
    ) throws URISyntaxException {
        log.debug("REST request to partial update Nutricion partially : {}, {}", id, nutricion);
        if (nutricion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, nutricion.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!nutricionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Nutricion> result = nutricionRepository
            .findById(nutricion.getId())
            .map(existingNutricion -> {
                if (nutricion.getNombrePlanNutricion() != null) {
                    existingNutricion.setNombrePlanNutricion(nutricion.getNombrePlanNutricion());
                }
                if (nutricion.getDescripcion() != null) {
                    existingNutricion.setDescripcion(nutricion.getDescripcion());
                }
                if (nutricion.getTipoDieta() != null) {
                    existingNutricion.setTipoDieta(nutricion.getTipoDieta());
                }
                if (nutricion.getAlimentosRecomendados() != null) {
                    existingNutricion.setAlimentosRecomendados(nutricion.getAlimentosRecomendados());
                }
                if (nutricion.getInstrucciones() != null) {
                    existingNutricion.setInstrucciones(nutricion.getInstrucciones());
                }

                return existingNutricion;
            })
            .map(nutricionRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nutricion.getId().toString())
        );
    }

    /**
     * {@code GET  /nutricions} : get all the nutricions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nutricions in body.
     */
    @GetMapping("/nutricions")
    public List<Nutricion> getAllNutricions() {
        log.debug("REST request to get all Nutricions");
        return nutricionRepository.findAll();
    }

    /**
     * {@code GET  /nutricions/:id} : get the "id" nutricion.
     *
     * @param id the id of the nutricion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nutricion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/nutricions/{id}")
    public ResponseEntity<Nutricion> getNutricion(@PathVariable Long id) {
        log.debug("REST request to get Nutricion : {}", id);
        Optional<Nutricion> nutricion = nutricionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(nutricion);
    }

    /**
     * {@code DELETE  /nutricions/:id} : delete the "id" nutricion.
     *
     * @param id the id of the nutricion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/nutricions/{id}")
    public ResponseEntity<Void> deleteNutricion(@PathVariable Long id) {
        log.debug("REST request to delete Nutricion : {}", id);
        nutricionRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

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

import com.gymruben.es.domain.Deportes;
import com.gymruben.es.repository.DeportesRepository;
import com.gymruben.es.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.gymruben.es.domain.Deportes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DeportesResource {

    private final Logger log = LoggerFactory.getLogger(DeportesResource.class);

    private static final String ENTITY_NAME = "deportes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DeportesRepository deportesRepository;

    public DeportesResource(DeportesRepository deportesRepository) {
        this.deportesRepository = deportesRepository;
    }

    /**
     * {@code POST  /deportes} : Create a new deportes.
     *
     * @param deportes the deportes to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new deportes, or with status {@code 400 (Bad Request)} if the deportes has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/deportes")
    public ResponseEntity<Deportes> createDeportes(@RequestBody Deportes deportes) throws URISyntaxException {
        log.debug("REST request to save Deportes : {}", deportes);
        if (deportes.getId() != null) {
            throw new BadRequestAlertException("A new deportes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        String uuid = UUID.randomUUID().toString();
        deportes.setCodigo(uuid);
        Deportes result = deportesRepository.save(deportes);
        return ResponseEntity
            .created(new URI("/api/deportes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /deportes/:id} : Updates an existing deportes.
     *
     * @param id the id of the deportes to save.
     * @param deportes the deportes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deportes,
     * or with status {@code 400 (Bad Request)} if the deportes is not valid,
     * or with status {@code 500 (Internal Server Error)} if the deportes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/deportes/{id}")
    public ResponseEntity<Deportes> updateDeportes(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Deportes deportes
    ) throws URISyntaxException {
        log.debug("REST request to update Deportes : {}, {}", id, deportes);
        if (deportes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, deportes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deportesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Deportes result = deportesRepository.save(deportes);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deportes.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /deportes/:id} : Partial updates given fields of an existing deportes, field will ignore if it is null
     *
     * @param id the id of the deportes to save.
     * @param deportes the deportes to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deportes,
     * or with status {@code 400 (Bad Request)} if the deportes is not valid,
     * or with status {@code 404 (Not Found)} if the deportes is not found,
     * or with status {@code 500 (Internal Server Error)} if the deportes couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/deportes/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Deportes> partialUpdateDeportes(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Deportes deportes
    ) throws URISyntaxException {
        log.debug("REST request to partial update Deportes partially : {}, {}", id, deportes);
        if (deportes.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, deportes.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!deportesRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Deportes> result = deportesRepository
            .findById(deportes.getId())
            .map(existingDeportes -> {
                if (deportes.getNombreDeporte() != null) {
                    existingDeportes.setNombreDeporte(deportes.getNombreDeporte());
                }
                if (deportes.getDescripcion() != null) {
                    existingDeportes.setDescripcion(deportes.getDescripcion());
                }
                if (deportes.getFechaDeporte() != null) {
                    existingDeportes.setFechaDeporte(deportes.getFechaDeporte());
                }
                if (deportes.getHoraDeporte() != null) {
                    existingDeportes.setHoraDeporte(deportes.getHoraDeporte());
                }
                if (deportes.getCodigo() != null) {
                    existingDeportes.setCodigo(deportes.getCodigo());
                }

                return existingDeportes;
            })
            .map(deportesRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deportes.getId().toString())
        );
    }

    /**
     * {@code GET  /deportes} : get all the deportes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of deportes in body.
     */
    @GetMapping("/deportes")
    public List<Deportes> getAllDeportes() {
        log.debug("REST request to get all Deportes");
        return deportesRepository.findAll();
    }

    /**
     * {@code GET  /deportes/:id} : get the "id" deportes.
     *
     * @param id the id of the deportes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the deportes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/deportes/{id}")
    public ResponseEntity<Deportes> getDeportes(@PathVariable Long id) {
        log.debug("REST request to get Deportes : {}", id);
        Optional<Deportes> deportes = deportesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(deportes);
    }

    /**
     * {@code DELETE  /deportes/:id} : delete the "id" deportes.
     *
     * @param id the id of the deportes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/deportes/{id}")
    public ResponseEntity<Void> deleteDeportes(@PathVariable Long id) {
        log.debug("REST request to delete Deportes : {}", id);
        deportesRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

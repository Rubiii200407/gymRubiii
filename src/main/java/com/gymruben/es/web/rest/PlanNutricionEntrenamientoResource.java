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

import com.gymruben.es.domain.PlanNutricionEntrenamiento;
import com.gymruben.es.repository.PlanNutricionEntrenamientoRepository;
import com.gymruben.es.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.gymruben.es.domain.PlanNutricionEntrenamiento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PlanNutricionEntrenamientoResource {

    private final Logger log = LoggerFactory.getLogger(PlanNutricionEntrenamientoResource.class);

    private static final String ENTITY_NAME = "planNutricionEntrenamiento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlanNutricionEntrenamientoRepository planNutricionEntrenamientoRepository;

    public PlanNutricionEntrenamientoResource(PlanNutricionEntrenamientoRepository planNutricionEntrenamientoRepository) {
        this.planNutricionEntrenamientoRepository = planNutricionEntrenamientoRepository;
    }

    /**
     * {@code POST  /plan-nutricion-entrenamiento} : Create a new planNutricionEntrenamiento.
     *
     * @param planNutricionEntrenamiento the planNutricionEntrenamiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new planNutricionEntrenamiento, or with status {@code 400 (Bad Request)} if the planNutricionEntrenamiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/plan-nutricion-entrenamiento")
    public ResponseEntity<PlanNutricionEntrenamiento> createPlanNutricionEntrenamiento(@RequestBody PlanNutricionEntrenamiento planNutricionEntrenamiento)
        throws URISyntaxException {
        log.debug("REST request to save PlanNutricionEntrenamiento : {}", planNutricionEntrenamiento);
        if (planNutricionEntrenamiento.getId() != null) {
            throw new BadRequestAlertException("A new planNutricionEntrenamiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlanNutricionEntrenamiento result = planNutricionEntrenamientoRepository.save(planNutricionEntrenamiento);
        return ResponseEntity
            .created(new URI("/api/plan-nutricion-entrenamiento/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /plan-nutricion-entrenamiento/:id} : Updates an existing planNutricionEntrenamiento.
     *
     * @param id the id of the planNutricionEntrenamiento to save.
     * @param planNutricionEntrenamiento the planNutricionEntrenamiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planNutricionEntrenamiento,
     * or with status {@code 400 (Bad Request)} if the planNutricionEntrenamiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the planNutricionEntrenamiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/plan-nutricion-entrenamiento/{id}")
    public ResponseEntity<PlanNutricionEntrenamiento> updatePlanNutricionEntrenamiento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PlanNutricionEntrenamiento planNutricionEntrenamiento
    ) throws URISyntaxException {
        log.debug("REST request to update PlanNutricionEntrenamiento : {}, {}", id, planNutricionEntrenamiento);
        if (planNutricionEntrenamiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, planNutricionEntrenamiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!planNutricionEntrenamientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PlanNutricionEntrenamiento result = planNutricionEntrenamientoRepository.save(planNutricionEntrenamiento);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planNutricionEntrenamiento.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /plan-nutricion-entrenamiento/:id} : Partial updates given fields of an existing planNutricionEntrenamiento, field will ignore if it is null
     *
     * @param id the id of the planNutricionEntrenamiento to save.
     * @param planNutricionEntrenamiento the planNutricionEntrenamiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planNutricionEntrenamiento,
     * or with status {@code 400 (Bad Request)} if the planNutricionEntrenamiento is not valid,
     * or with status {@code 404 (Not Found)} if the planNutricionEntrenamiento is not found,
     * or with status {@code 500 (Internal Server Error)} if the planNutricionEntrenamiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/plan-nutricion-entrenamiento/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PlanNutricionEntrenamiento> partialUpdatePlanNutricionEntrenamiento(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PlanNutricionEntrenamiento planNutricionEntrenamiento
    ) throws URISyntaxException {
        log.debug("REST request to partial update PlanNutricionEntrenamiento partially : {}, {}", id, planNutricionEntrenamiento);
        if (planNutricionEntrenamiento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, planNutricionEntrenamiento.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!planNutricionEntrenamientoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PlanNutricionEntrenamiento> result = planNutricionEntrenamientoRepository
            .findById(planNutricionEntrenamiento.getId())
            .map(existingPlanNutricionEntrenamiento -> {
                if (planNutricionEntrenamiento.getNombrePlan() != null) {
                    existingPlanNutricionEntrenamiento.setNombrePlan(planNutricionEntrenamiento.getNombrePlan());
                }
                if (planNutricionEntrenamiento.getInstrucciones() != null) {
                    existingPlanNutricionEntrenamiento.setInstrucciones(planNutricionEntrenamiento.getInstrucciones());
                }
                if (planNutricionEntrenamiento.getVideo() != null) {
                    existingPlanNutricionEntrenamiento.setVideo(planNutricionEntrenamiento.getVideo());
                }


                return existingPlanNutricionEntrenamiento;
            })
            .map(planNutricionEntrenamientoRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, planNutricionEntrenamiento.getId().toString())
        );
    }

    /**
     * {@code GET  /plan-nutricion-entrenamiento} : get all the planNutricionEntrenamientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planNutricionEntrenamientos in body.
     */
    @GetMapping("/plan-nutricion-entrenamiento")
    public List<PlanNutricionEntrenamiento> getAllPlanNutricionEntrenamientos() {
        log.debug("REST request to get all PlanNutricionEntrenamientos");
        return planNutricionEntrenamientoRepository.findAll();
    }

    /**
     * {@code GET  /plan-nutricion-entrenamiento/:id} : get the "id" planNutricionEntrenamiento.
     *
     * @param id the id of the planNutricionEntrenamiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planNutricionEntrenamiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/plan-nutricion-entrenamiento/{id}")
    public ResponseEntity<PlanNutricionEntrenamiento> getPlanNutricionEntrenamiento(@PathVariable Long id) {
        log.debug("REST request to get PlanNutricionEntrenamiento : {}", id);
        Optional<PlanNutricionEntrenamiento> planNutricionEntrenamiento = planNutricionEntrenamientoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(planNutricionEntrenamiento);
    }

    /**
     * {@code DELETE  /plan-nutricion-entrenamiento/:id} : delete the "id" planNutricionEntrenamiento.
     *
     * @param id the id of the planNutricionEntrenamiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/plan-nutricion-entrenamiento/{id}")
    public ResponseEntity<Void> deletePlanNutricionEntrenamiento(@PathVariable Long id) {
        log.debug("REST request to delete PlanNutricionEntrenamiento : {}", id);
        planNutricionEntrenamientoRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

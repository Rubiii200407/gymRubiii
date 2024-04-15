package com.gymruben.es.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.hashids.Hashids;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gymruben.es.config.Constants;
import com.gymruben.es.domain.PlanesEntrenamiento;
import com.gymruben.es.repository.PlanesEntrenamientoRepository;
import com.gymruben.es.repository.UserRepository;
import com.gymruben.es.security.AuthoritiesConstants;
import com.gymruben.es.service.PlanesEntrenamientoService;
import com.gymruben.es.service.dto.PlanesEntrenamientoDTO;
import com.gymruben.es.service.helper.FilterHelper;
import com.gymruben.es.service.mapper.PlanesEntrenamientoMapper;
import com.gymruben.es.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
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
    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(
        Arrays.asList(
            "id",
            "codigo",
            "nombre",
            "descripcion",
            "instructor"
         
        )
    );

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Hashids hashids = Constants.HASHIDS;

    private final PlanesEntrenamientoRepository planesEntrenamientoRepository;
    private final UserRepository userRepository;
    private final PlanesEntrenamientoMapper planesEntrenamientoMapper;
    private final PlanesEntrenamientoService planesEntrenamientoService;

    public PlanesEntrenamientoResource(PlanesEntrenamientoRepository planesEntrenamientoRepository,UserRepository userRepository,PlanesEntrenamientoMapper planesEntrenamientoMapper,PlanesEntrenamientoService planesEntrenamientoService) {
        this.planesEntrenamientoRepository = planesEntrenamientoRepository;
        this.userRepository = userRepository;
        this.planesEntrenamientoMapper = planesEntrenamientoMapper;
        this.planesEntrenamientoService = planesEntrenamientoService;
    }

    /**
     * {@code POST  /planes-entrenamiento} : Create a new planesEntrenamiento.
     *
     * @param planesEntrenamiento the planesEntrenamiento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new planesEntrenamiento, or with status {@code 400 (Bad Request)} if the planesEntrenamiento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/planes-entrenamiento")
    public ResponseEntity<PlanesEntrenamiento> createPlanesEntrenamiento(@RequestBody PlanesEntrenamiento planesEntrenamiento)
        throws URISyntaxException {
        log.debug("REST request to save PlanesEntrenamiento : {}", planesEntrenamiento);
        if (planesEntrenamiento.getId() != null) {
            throw new BadRequestAlertException("A new planesEntrenamiento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlanesEntrenamiento result = planesEntrenamientoService.createPlanesEntrenamiento(planesEntrenamiento);

        return ResponseEntity
                .created(new URI("/api/planes-entrenamiento/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

      @GetMapping("/planes-entrenamiento/UUID/{codigo}")
    public ResponseEntity<PlanesEntrenamientoDTO> getPlanesEntrenamientoUUID(@PathVariable String codigo) {
        log.debug("REST request to get EmpresaDenuncia : {}", codigo);
        Optional<PlanesEntrenamientoDTO> planesEntrenamiento = planesEntrenamientoRepository
            .findByCodigo(codigo)
            .map(planesEntrenamientoMapper::toDtoCodigo);
        return ResponseUtil.wrapOrNotFound(planesEntrenamiento);
    }

    /**
     * {@code PUT  /planes-entrenamiento/:id} : Updates an existing planesEntrenamiento.
     *
     * @param id the id of the planesEntrenamiento to save.
     * @param planesEntrenamiento the planesEntrenamiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planesEntrenamiento,
     * or with status {@code 400 (Bad Request)} if the planesEntrenamiento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the planesEntrenamiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/planes-entrenamiento/{id}")
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
     * {@code PATCH  /planes-entrenamiento/:id} : Partial updates given fields of an existing planesEntrenamiento, field will ignore if it is null
     *
     * @param id the id of the planesEntrenamiento to save.
     * @param planesEntrenamiento the planesEntrenamiento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planesEntrenamiento,
     * or with status {@code 400 (Bad Request)} if the planesEntrenamiento is not valid,
     * or with status {@code 404 (Not Found)} if the planesEntrenamiento is not found,
     * or with status {@code 500 (Internal Server Error)} if the planesEntrenamiento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/planes-entrenamiento/{id}", consumes = { "application/json", "application/merge-patch+json" })
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
                if (planesEntrenamiento.getInstrucciones() != null) {
                    existingPlanesEntrenamiento.setInstrucciones(planesEntrenamiento.getInstrucciones());
                }
                if (planesEntrenamiento.getVideoId() != null) {
                    existingPlanesEntrenamiento.setVideoId(planesEntrenamiento.getVideoId());
                }
                if (planesEntrenamiento.getVideoNutricion() != null) {
                    existingPlanesEntrenamiento.setVideoNutricion(planesEntrenamiento.getVideoNutricion());
                }
                if (planesEntrenamiento.getInstruccionesNutricion() != null) {
                    existingPlanesEntrenamiento.setInstruccionesNutricion(planesEntrenamiento.getInstruccionesNutricion());
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
     * {@code GET  /planes-entrenamiento} : get all the planesEntrenamientos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planesEntrenamientos in body.
     */
    @GetMapping("/planes-entrenamiento")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<PlanesEntrenamientoDTO>> getAllPlanesEntrenamiento(@ParameterObject Pageable pageable, FilterHelper filterHelper) {
        log.debug("REST request to get all EmpresaDenuncia for an admin");
        if (!onlyContainsAllowedProperties(pageable)) {
            return ResponseEntity.badRequest().build();
        }
        final Page<PlanesEntrenamientoDTO> page = planesEntrenamientoService
            .findAll(pageable, filterHelper)
            .map(planesEntrenamientoMapper::toDtoCodigo);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    private boolean onlyContainsAllowedProperties(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getProperty).allMatch(ALLOWED_ORDERED_PROPERTIES::contains);
    }

    
    

    /**
     * {@code GET  /planes-entrenamiento/:id} : get the "id" planesEntrenamiento.
     *
     * @param id the id of the planesEntrenamiento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planesEntrenamiento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/planes-entrenamiento/{id}")
    public ResponseEntity<PlanesEntrenamientoDTO> getPlanesEntrenamiento(@PathVariable String id) {
        log.debug("REST request to get PlanesEntrenamiento : {}", id);
        Long idDecodificado = hashids.decode(id)[0];
        Optional<PlanesEntrenamientoDTO> planesEntrenamiento = planesEntrenamientoRepository.findById(idDecodificado).map(planesEntrenamientoMapper::toDto);
        return ResponseUtil.wrapOrNotFound(planesEntrenamiento);
    }

    /**
     * {@code DELETE  /planes-entrenamiento/:id} : delete the "id" planesEntrenamiento.
     *
     * @param id the id of the planesEntrenamiento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/planes-entrenamiento/{id}")
    public ResponseEntity<Void> deletePlanesEntrenamiento(@PathVariable String id) {
        log.debug("REST request to delete PlanesEntrenamiento : {}", id);
        Long idDecodificado = hashids.decode(id)[0];
        planesEntrenamientoRepository.deleteById(idDecodificado);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

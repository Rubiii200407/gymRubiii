package com.gymruben.es.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hashids.Hashids;
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

import com.gymruben.es.config.ApplicationProperties;
import com.gymruben.es.config.Constants;
import com.gymruben.es.domain.Fichero;
import com.gymruben.es.repository.FicheroRepository;
import com.gymruben.es.service.FicheroService;
import com.gymruben.es.service.dto.FicheroDTO;
import com.gymruben.es.service.mapper.FicheroMapper;
import com.gymruben.es.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link es.melit.gestordenuncias.domain.Fichero}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FicheroResource {

    private final Logger log = LoggerFactory.getLogger(FicheroResource.class);

    private static final String ENTITY_NAME = "fichero";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FicheroRepository ficheroRepository;
    private final FicheroMapper ficheroMapper;
    private final FicheroService ficheroService;
    private final Hashids hashids = Constants.HASHIDS;
    private final String path;

    public FicheroResource(
        FicheroRepository ficheroRepository,
        FicheroMapper ficheroMapper,
        ApplicationProperties applicationProperties,
        FicheroService ficheroService
    ) {
        this.ficheroRepository = ficheroRepository;
        this.ficheroMapper = ficheroMapper;
        this.ficheroService = ficheroService;
        this.path = applicationProperties.getFileSavepath().getFileSavePathString();
    }

    /**
     * {@code POST  /fichero} : Create a new Fichero.
     *
     * @param Fichero the Fichero to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new Fichero, or with status {@code 400 (Bad Request)} if the Fichero has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fichero")
    public ResponseEntity<FicheroDTO> createFichero(@RequestBody Fichero fichero) throws URISyntaxException {
        log.debug("REST request to save Fichero : {}", fichero);
        if (fichero.getId() != null) {
            throw new BadRequestAlertException("A new Fichero cannot already have an ID", ENTITY_NAME, "idexists");
        }
        fichero.setPath(path + fichero.getPath());
        fichero = ficheroRepository.save(fichero);
        FicheroDTO result = ficheroMapper.toDto(fichero);

        return ResponseEntity
            .created(new URI("/api/fichero/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fichero/:id} : Updates an existing Fichero.
     *
     * @param id the id of the Fichero to save.
     * @param Fichero the Fichero to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated Fichero,
     * or with status {@code 400 (Bad Request)} if the Fichero is not valid,
     * or with status {@code 500 (Internal Server Error)} if the Fichero couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fichero/{id}")
    public ResponseEntity<FicheroDTO> updateFichero(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody FicheroDTO ficheroDTO
    ) throws URISyntaxException {
        Fichero fichero = ficheroMapper.toEntity(ficheroDTO);
        log.debug("REST request to update Fichero : {}, {}", id, fichero);
        if (fichero.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fichero.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ficheroRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        fichero = ficheroRepository.save(fichero);
        FicheroDTO result = ficheroMapper.toDto(fichero);

        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fichero.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /fichero/:id} : Partial updates given fields of an existing Fichero, field will ignore if it is null
     *
     * @param id the id of the Fichero to save.
     * @param Fichero the Fichero to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated Fichero,
     * or with status {@code 400 (Bad Request)} if the Fichero is not valid,
     * or with status {@code 404 (Not Found)} if the Fichero is not found,
     * or with status {@code 500 (Internal Server Error)} if the Fichero couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/fichero/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Fichero> partialUpdateFichero(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Fichero fichero
    ) throws URISyntaxException {
        log.debug("REST request to partial update Fichero partially : {}, {}", id, fichero);
        if (fichero.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fichero.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!ficheroRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Fichero> result = ficheroRepository
            .findById(fichero.getId())
            .map(existingFichero -> {
                return existingFichero;
            })
            .map(ficheroRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fichero.getId().toString())
        );
    }

    /**
     * {@code GET  /fichero} : get all the Ficheros.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Ficheros in body.
     */
    @GetMapping("/fichero")
    public List<FicheroDTO> getAllFicheros() {
        log.debug("REST request to get all Ficheros");
        return ficheroRepository.findAll().stream().map(ficheroMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     * {@code GET  /fichero/:id} : get the "id" Fichero.
     *
     * @param id the id of the Fichero to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the Fichero, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fichero/{id}")
    public ResponseEntity<FicheroDTO> getFichero(@PathVariable Long id) {
        log.debug("REST request to get Fichero CÓDIGO: {}", id);
        Optional<FicheroDTO> fichero = ficheroRepository.findById(id).map(ficheroMapper::toDto);
        return ResponseUtil.wrapOrNotFound(fichero);
    }

    /**
     * {@code DELETE  /fichero/:id} : delete the "id" Fichero.
     *
     * @param id the id of the Fichero to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fichero/{id}")
    public ResponseEntity<Void> deleteFichero(@PathVariable Long id) {
        log.debug("REST request to delete Fichero : {}", id);
        ficheroRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }

  
}

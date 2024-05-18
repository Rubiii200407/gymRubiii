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
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
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
import com.gymruben.es.domain.ClasesOnline;
import com.gymruben.es.repository.ClasesOnlineRepository;
import com.gymruben.es.repository.VideosClaseOnlineRepository;
import com.gymruben.es.security.AuthoritiesConstants;
import com.gymruben.es.service.ClasesOnlineService;
import com.gymruben.es.service.VideosClaseOnlineService;
import com.gymruben.es.service.dto.ClasesOnlineDTO;
import com.gymruben.es.service.helper.FilterHelper;
import com.gymruben.es.service.mapper.ClasesOnlineMapper;
import com.gymruben.es.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
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
    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(
        Arrays.asList(
            "id",
            "codigo",
            "nombreClase",
            "descripcion",
            "fechaClase",
            "horaClase",
            "instructor"
         
        )
    );

    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    private final Hashids hashids = Constants.HASHIDS;
    private final ClasesOnlineRepository clasesOnlineRepository;

    private final ClasesOnlineMapper clasesOnlineMapper;
    private final ClasesOnlineService clasesOnlineService;
    private final VideosClaseOnlineService videosClaseOnlineService;
    private final VideosClaseOnlineRepository videosClaseOnlineRepository;

    public ClasesOnlineResource(ClasesOnlineRepository clasesOnlineRepository,ClasesOnlineMapper clasesOnlineMapper,ClasesOnlineService clasesOnlineService,VideosClaseOnlineService videosClaseOnlineService,VideosClaseOnlineRepository videosClaseOnlineRepository) {
        this.clasesOnlineRepository = clasesOnlineRepository;
        this.clasesOnlineMapper = clasesOnlineMapper;
        this.clasesOnlineService = clasesOnlineService;
        this.videosClaseOnlineService = videosClaseOnlineService;
        this.videosClaseOnlineRepository = videosClaseOnlineRepository;
    }

    /**
     * {@code POST  /clases-online} : Create a new clasesOnline.
     *
     * @param clasesOnline the clasesOnline to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clasesOnline, or with status {@code 400 (Bad Request)} if the clasesOnline has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     * @throws NotFoundException 
     */
    @PostMapping("/clases-online")
    public ResponseEntity<ClasesOnline> createClasesOnline(@RequestBody ClasesOnline clasesOnline) throws URISyntaxException {
        log.debug("REST request to save ClasesOnline: {}", clasesOnline);
       
        ClasesOnline result = clasesOnlineService.createClasesOnline(clasesOnline);

        return ResponseEntity
                .created(new URI("/api/clases-online/" + result.getId()))
                .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                .body(result);
    }

    

    

    /**
     * {@code PUT  /clases-online/:id} : Updates an existing clasesOnline.
     *
     * @param id the id of the clasesOnline to save.
     * @param clasesOnline the clasesOnline to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clasesOnline,
     * or with status {@code 400 (Bad Request)} if the clasesOnline is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clasesOnline couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/clases-online/{id}")
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
    @GetMapping("/clases-online/UUID/{codigo}")
    public ResponseEntity<ClasesOnlineDTO> getClasesOnlineUUID(@PathVariable String codigo) {
        log.debug("REST request to get clasesOnline : {}", codigo);
        Optional<ClasesOnlineDTO> clasesOnline = clasesOnlineRepository
            .findByCodigo(codigo)
            .map(clasesOnlineMapper::toDtoCodigo);
        return ResponseUtil.wrapOrNotFound(clasesOnline);
    }

    /**
     * {@code PATCH  /clases-online/:id} : Partial updates given fields of an existing clasesOnline, field will ignore if it is null
     *
     * @param id the id of the clasesOnline to save.
     * @param clasesOnline the clasesOnline to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clasesOnline,
     * or with status {@code 400 (Bad Request)} if the clasesOnline is not valid,
     * or with status {@code 404 (Not Found)} if the clasesOnline is not found,
     * or with status {@code 500 (Internal Server Error)} if the clasesOnline couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/clases-online/{id}", consumes = { "application/json", "application/merge-patch+json" })
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
                if (clasesOnline.getVideoId() != null) {
                    existingClasesOnline.setVideoId(clasesOnline.getVideoId());
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
     * {@code GET  /clases-online} : get all the clasesOnlines.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clasesOnlines in body.
     */
    @GetMapping("/clases-online")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<ClasesOnlineDTO>> getAllClasesOnline(@ParameterObject Pageable pageable, FilterHelper filterHelper) {
        log.debug("REST request to get all EmpresaDenuncia for an admin");
        if (!onlyContainsAllowedProperties(pageable)) {
            return ResponseEntity.badRequest().build();
        }
        final Page<ClasesOnlineDTO> page = clasesOnlineService
            .findAll(pageable, filterHelper)
            .map(clasesOnlineMapper::toDtoCodigo);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    private boolean onlyContainsAllowedProperties(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getProperty).allMatch(ALLOWED_ORDERED_PROPERTIES::contains);
    }


    /**
     * {@code GET  /clases-online/:id} : get the "id" clasesOnline.
     *
     * @param id the id of the clasesOnline to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clasesOnline, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/clases-online/{id}")
    public ResponseEntity<ClasesOnlineDTO> getClasesOnline(@PathVariable String id) {
        log.debug("REST request to get EmpresaDenuncia : {}", id);
        Long idDecodificado = hashids.decode(id)[0];
        Optional<ClasesOnlineDTO> clasesOnline = clasesOnlineRepository.findById(idDecodificado).map(clasesOnlineMapper::toDto);
        return ResponseUtil.wrapOrNotFound(clasesOnline);
    }
    /**
     * {@code DELETE  /clases-online/:id} : delete the "id" clasesOnline.
     *
     * @param id the id of the clasesOnline to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/clases-online/{id}")
    public ResponseEntity<Void> deleteClasesOnline(@PathVariable String id) {
        log.debug("REST request to delete ClasesOnline : {}", id);
        Long idDecodificado = hashids.decode(id)[0];
        clasesOnlineRepository.deleteById(idDecodificado);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

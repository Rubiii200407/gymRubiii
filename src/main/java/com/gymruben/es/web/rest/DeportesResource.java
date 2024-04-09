package com.gymruben.es.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
import com.gymruben.es.domain.Deportes;
import com.gymruben.es.domain.User;
import com.gymruben.es.repository.DeportesRepository;
import com.gymruben.es.repository.UserRepository;
import com.gymruben.es.security.AuthoritiesConstants;
import com.gymruben.es.service.DeportesService;
import com.gymruben.es.service.dto.DeportesDTO;
import com.gymruben.es.service.helper.FilterHelper;
import com.gymruben.es.service.mapper.DeportesMapper;
import com.gymruben.es.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.gymruben.es.domain.Deportes}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DeportesResource {

    private final Logger log = LoggerFactory.getLogger(DeportesResource.class);
    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(
        Arrays.asList(
            "id",
            "codigo",
            "nombre",
            "descripcion",
            "fechaDeporte",
            "horaDeporte",
            "instructor"
         
        )
    );


    private static final String ENTITY_NAME = "deportes";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    private final Hashids hashids = Constants.HASHIDS;
    private final DeportesRepository deportesRepository;

    private final DeportesMapper deportesMapper;

    private final DeportesService deportesService;

    private final UserRepository userRepository;

    public DeportesResource(DeportesRepository deportesRepository,DeportesMapper deportesMapper,UserRepository userRepository,DeportesService deportesService) {
        this.deportesRepository = deportesRepository;
        this.deportesMapper = deportesMapper;
        this.userRepository = userRepository;
        this.deportesService = deportesService;
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username= authentication.getName();
        User user= userRepository.findOneByLogin(username).orElseThrow(() ->new UsernameNotFoundException("username"));
        deportes.setUser(user);
        Deportes result = deportesRepository.save(deportes);
        return ResponseEntity
            .created(new URI("/api/deportes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    @GetMapping("/deportes/UUID/{codigo}")
    public ResponseEntity<DeportesDTO> getDeportesUUID(@PathVariable String codigo) {
        log.debug("REST request to get EmpresaDenuncia : {}", codigo);
        Optional<DeportesDTO> deportes = deportesRepository
            .findByCodigo(codigo)
            .map(deportesMapper::toDtoCodigo);
        return ResponseUtil.wrapOrNotFound(deportes);
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
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<DeportesDTO>> getAllDeportes(@ParameterObject Pageable pageable, FilterHelper filterHelper) {
        log.debug("REST request to get all EmpresaDenuncia for an admin");
        if (!onlyContainsAllowedProperties(pageable)) {
            return ResponseEntity.badRequest().build();
        }
        final Page<DeportesDTO> page = deportesService
            .findAll(pageable, filterHelper)
            .map(deportesMapper::toDtoCodigo);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    private boolean onlyContainsAllowedProperties(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getProperty).allMatch(ALLOWED_ORDERED_PROPERTIES::contains);
    }

    /**
     * {@code GET  /deportes/:id} : get the "id" deportes.
     *
     * @param id the id of the deportes to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the deportes, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/deportes/{id}")
    public ResponseEntity<DeportesDTO> getDeportes(@PathVariable String id) {
        log.debug("REST request to get Deportes : {}", id);
        Long idDecodificado = hashids.decode(id)[0];
        Optional<DeportesDTO> deportes = deportesRepository.findById(idDecodificado).map(deportesMapper::toDto);
        return ResponseUtil.wrapOrNotFound(deportes);
    }

    /**
     * {@code DELETE  /deportes/:id} : delete the "id" deportes.
     *
     * @param id the id of the deportes to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/deportes/{id}")
    public ResponseEntity<Void> deleteDeportes(@PathVariable String id) {
        log.debug("REST request to delete Deportes : {}", id);
        Long idDecodificado = hashids.decode(id)[0];
        deportesRepository.deleteById(idDecodificado);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();

            
    }
}

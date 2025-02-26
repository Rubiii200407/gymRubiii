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
import com.gymruben.es.domain.PlanesNutricion;
import com.gymruben.es.domain.User;
import com.gymruben.es.repository.PlanesNutricionRepository;
import com.gymruben.es.repository.UserRepository;
import com.gymruben.es.security.AuthoritiesConstants;
import com.gymruben.es.service.PlanesNutricionService;
import com.gymruben.es.service.dto.PlanesNutricionDTO;
import com.gymruben.es.service.helper.FilterHelper;
import com.gymruben.es.service.mapper.PlanesNutricionMapper;
import com.gymruben.es.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
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
    private static final List<String> ALLOWED_ORDERED_PROPERTIES = Collections.unmodifiableList(
        Arrays.asList(
            "id",
            "nombrePlan",
            "codigo",
            "instrucciones",
            "descripcion",
            "alimentosRecomendados"
         
        )
    );
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    private final Hashids hashids = Constants.HASHIDS;

    private final PlanesNutricionRepository planesNutricionRepository;
    private final PlanesNutricionService planesNutricionService;
    private final UserRepository userRepository;
    private final PlanesNutricionMapper planesNutricionMapper;

    public PlanesNutricionResource(PlanesNutricionRepository planesNutricionRepository,UserRepository userRepository,PlanesNutricionMapper planesNutricionMapper,PlanesNutricionService planesNutricionService) {
        this.planesNutricionRepository = planesNutricionRepository;
        this.userRepository=userRepository;
        this.planesNutricionMapper=planesNutricionMapper;
        this.planesNutricionService=planesNutricionService;
    }

    /**
     * {@code POST  /planes-nutricion} : Create a new planesNutricion.
     *
     * @param planesNutricion the planesNutricion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new planesNutricion, or with status {@code 400 (Bad Request)} if the planesNutricion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/planes-nutricion")
    public ResponseEntity<PlanesNutricion> createPlanesNutricion(@RequestBody PlanesNutricion planesNutricion) throws URISyntaxException {
        log.debug("REST request to save PlanesNutricion : {}", planesNutricion);
        if (planesNutricion.getId() != null) {
            throw new BadRequestAlertException("A new planesNutricion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        String uuid = UUID.randomUUID().toString();
        planesNutricion.setCodigo(uuid);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username= authentication.getName();
        User user= userRepository.findOneByLogin(username).orElseThrow(() ->new UsernameNotFoundException("username"));
        planesNutricion.setUser(user);
        PlanesNutricion result = planesNutricionRepository.save(planesNutricion);
        return ResponseEntity
            .created(new URI("/api/planes-nutricion/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    @GetMapping("/planes-nutricion/UUID/{codigo}")
    public ResponseEntity<PlanesNutricionDTO> getPlanesNutricionUUID(@PathVariable String codigo) {
        log.debug("REST request to get EmpresaDenuncia : {}", codigo);
        Optional<PlanesNutricionDTO> planesNutricion = planesNutricionRepository
            .findByCodigo(codigo)
            .map(planesNutricionMapper::toDtoCodigo);
        return ResponseUtil.wrapOrNotFound(planesNutricion);
    }

    /**
     * {@code PUT  /planes-nutricion/:id} : Updates an existing planesNutricion.
     *
     * @param id the id of the planesNutricion to save.
     * @param planesNutricion the planesNutricion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planesNutricion,
     * or with status {@code 400 (Bad Request)} if the planesNutricion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the planesNutricion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/planes-nutricion/{id}")
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
     * {@code PATCH  /planes-nutricion/:id} : Partial updates given fields of an existing planesNutricion, field will ignore if it is null
     *
     * @param id the id of the planesNutricion to save.
     * @param planesNutricion the planesNutricion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planesNutricion,
     * or with status {@code 400 (Bad Request)} if the planesNutricion is not valid,
     * or with status {@code 404 (Not Found)} if the planesNutricion is not found,
     * or with status {@code 500 (Internal Server Error)} if the planesNutricion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/planes-nutricion/{id}", consumes = { "application/json", "application/merge-patch+json" })
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
                if (planesNutricion.getInstrucciones() != null) {
                    existingPlanesNutricion.setInstrucciones(planesNutricion.getInstrucciones());
                }
                if (planesNutricion.getAlimentosRecomendados() != null) {
                    existingPlanesNutricion.setAlimentosRecomendados(planesNutricion.getAlimentosRecomendados());
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
     * {@code GET  /planes-nutricion} : get all the planesNutricions.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planesNutricions in body.
     */
    @GetMapping("/planes-nutricion")
    @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
    public ResponseEntity<List<PlanesNutricionDTO>> getAllPlanesNutricion(@ParameterObject Pageable pageable, FilterHelper filterHelper) {
        log.debug("REST request to get all EmpresaDenuncia for an admin");
        if (!onlyContainsAllowedProperties(pageable)) {
            return ResponseEntity.badRequest().build();
        }
        final Page<PlanesNutricionDTO> page = planesNutricionService
            .findAll(pageable, filterHelper)
            .map(planesNutricionMapper::toDtoCodigo);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    private boolean onlyContainsAllowedProperties(Pageable pageable) {
        return pageable.getSort().stream().map(Sort.Order::getProperty).allMatch(ALLOWED_ORDERED_PROPERTIES::contains);
    }

    

    /**
     * {@code GET  /planes-nutricion/:id} : get the "id" planesNutricion.
     *
     * @param id the id of the planesNutricion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planesNutricion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/planes-nutricion/{id}")
    public ResponseEntity<PlanesNutricionDTO> getPlanesNutricion(@PathVariable String id) {
        log.debug("REST request to get PlanesNutricion : {}", id);
        Long idDecodificado = hashids.decode(id)[0];
        Optional<PlanesNutricionDTO> planesNutricion = planesNutricionRepository.findById(idDecodificado).map(planesNutricionMapper::toDto);
        return ResponseUtil.wrapOrNotFound(planesNutricion);
    }

    /**
     * {@code DELETE  /planes-nutricion/:id} : delete the "id" planesNutricion.
     *
     * @param id the id of the planesNutricion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/planes-nutricion/{id}")
    public ResponseEntity<Void> deletePlanesNutricion(@PathVariable String id) {
        log.debug("REST request to delete PlanesNutricion : {}", id);
        Long idDecodificado = hashids.decode(id)[0];
        planesNutricionRepository.deleteById(idDecodificado);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}

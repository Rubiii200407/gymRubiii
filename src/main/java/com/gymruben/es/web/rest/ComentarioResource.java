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
import org.springdoc.api.annotations.ParameterObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.gymruben.es.config.Constants;
import com.gymruben.es.domain.Comentario;
import com.gymruben.es.repository.ComentarioRepository;
import com.gymruben.es.repository.specification.ComentarioSpecification;
import com.gymruben.es.service.ComentarioService;
import com.gymruben.es.service.dto.ComentarioDTO;
import com.gymruben.es.service.mapper.ComentarioMapper;
import com.gymruben.es.web.rest.errors.BadRequestAlertException;

import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.gymruben.es.domain.Comentario}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ComentarioResource {

    private final Logger log = LoggerFactory.getLogger(ComentarioResource.class);
    private final Hashids hashids = Constants.HASHIDS;
    private static final String ENTITY_NAME = "comentario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ComentarioRepository comentarioRepository;

    private final ComentarioMapper comentarioMapper;
    private final ComentarioService comentarioService;

    public ComentarioResource(ComentarioRepository comentarioRepository,ComentarioMapper comentarioMapper,ComentarioService comentarioService) {
        this.comentarioRepository = comentarioRepository;
        this.comentarioMapper = comentarioMapper;
        this.comentarioService = comentarioService;
    }

    /**
     * {@code POST  /plan-nutricion-entrenamiento} : Create a new comentario.
     *
     * @param comentario the comentario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new comentario, or with status {@code 400 (Bad Request)} if the comentario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/comentario")
    public ResponseEntity<ComentarioDTO> createComentario(@RequestBody ComentarioDTO comentarioDTO) throws URISyntaxException {
        ComentarioDTO resultDTO = comentarioService.createComentario(comentarioMapper.toEntity(comentarioDTO));

        return ResponseEntity
            .created(new URI("/api/comentario/" + resultDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, resultDTO.getId().toString()))
            .body(resultDTO);
    }

    /**
     * {@code PUT  /plan-nutricion-entrenamiento/:id} : Updates an existing comentario.
     *
     * @param id the id of the comentario to save.
     * @param comentario the comentario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comentario,
     * or with status {@code 400 (Bad Request)} if the comentario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the comentario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/comentario/{id}")
    public ResponseEntity<Comentario> updateComentario(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Comentario comentario
    ) throws URISyntaxException {
        log.debug("REST request to update Comentario : {}, {}", id, comentario);
        if (comentario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, comentario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!comentarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Comentario result = comentarioRepository.save(comentario);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, comentario.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /plan-nutricion-entrenamiento/:id} : Partial updates given fields of an existing comentario, field will ignore if it is null
     *
     * @param id the id of the comentario to save.
     * @param comentario the comentario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comentario,
     * or with status {@code 400 (Bad Request)} if the comentario is not valid,
     * or with status {@code 404 (Not Found)} if the comentario is not found,
     * or with status {@code 500 (Internal Server Error)} if the comentario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/comentario/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Comentario> partialUpdateComentario(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Comentario comentario
    ) throws URISyntaxException {
        log.debug("REST request to partial update Comentario partially : {}, {}", id, comentario);
        if (comentario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, comentario.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!comentarioRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Comentario> result = comentarioRepository
            .findById(comentario.getId())
            .map(existingComentario -> {
                if (comentario.getDescripcion() != null) {
                    existingComentario.setDescripcion(comentario.getDescripcion());
                }
                if (comentario.getFechaCreacion() != null) {
                    existingComentario.setFechaCreacion(comentario.getFechaCreacion());
                }
                if (comentario.getCreador() != null) {
                    existingComentario.setCreador(comentario.getCreador());
                }


                return existingComentario;
            })
            .map(comentarioRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, comentario.getId().toString())
        );
    }

    /**
     * {@code GET  /plan-nutricion-entrenamiento} : get all the comentario.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of comentario in body.
     */
    @GetMapping("/comentario")
    public List<ComentarioDTO> getAllComentarios(@RequestParam(value = "clasesOnlineId", required = false) final String clasesOnlineId) {
        log.debug("REST request to get all Comentarios");
        if (clasesOnlineId != null) {
            Long idDecodificado = hashids.decode(clasesOnlineId)[0];
            return comentarioRepository
                .findAllByDeportes(idDecodificado)
                .stream()
                .map(comentarioMapper::toDto)
                .collect(Collectors.toCollection(LinkedList::new));
        } else {
            return comentarioRepository.findAll().stream().map(comentarioMapper::toDto).collect(Collectors.toCollection(LinkedList::new));
        }
    }

    /**
     * {@code GET  /plan-nutricion-entrenamiento/:id} : get the "id" comentario.
     *
     * @param id the id of the comentario to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the comentario, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/comentario/{id}")
    public ResponseEntity<Comentario> getComentario(@PathVariable Long id) {
        log.debug("REST request to get Comentario : {}", id);
        Optional<Comentario> comentario = comentarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(comentario);
    }

    /**
     * {@code DELETE  /plan-nutricion-entrenamiento/:id} : delete the "id" comentario.
     *
     * @param id the id of the comentario to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/comentario/{id}")
    public ResponseEntity<Void> deleteComentario(@PathVariable String id) {
        log.debug("REST request to delete Comentario : {}", id);
        Long idDecodificado = hashids.decode(id)[0];
        comentarioRepository.deleteById(idDecodificado);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
    @GetMapping("/comentario/deportes/{id}")
    public ResponseEntity<List<ComentarioDTO>> getAllComentarioDeporte(@PathVariable String id, @ParameterObject Pageable pageable) {
        Long idDecodificado = hashids.decode(id)[0];
        log.debug("REST request to get all EmpresaDenuncia for an admin");
        final Page<ComentarioDTO> page = comentarioRepository
            .findAll(ComentarioSpecification.findAllByDeportes(idDecodificado), pageable)
            .map(comentarioMapper::toDto);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    @GetMapping("/comentario/clases-online/{id}")
    public ResponseEntity<List<ComentarioDTO>> getAllComentarioClasesOnline(@PathVariable String id, @ParameterObject Pageable pageable) {
        Long idDecodificado = hashids.decode(id)[0];
        log.debug("REST request to get all EmpresaDenuncia for an admin");
        final Page<ComentarioDTO> page = comentarioRepository
            .findAll(ComentarioSpecification.findAllByClasesOnline(idDecodificado), pageable)
            .map(comentarioMapper::toDto);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    @GetMapping("/comentario/planes-entrenamiento/{id}")
    public ResponseEntity<List<ComentarioDTO>> getAllComentarioPlanesEntrenamiento(@PathVariable String id, @ParameterObject Pageable pageable) {
        Long idDecodificado = hashids.decode(id)[0];
        log.debug("REST request to get all EmpresaDenuncia for an admin");
        final Page<ComentarioDTO> page = comentarioRepository
            .findAll(ComentarioSpecification.findAllByPlanesEntrenamiento(idDecodificado), pageable)
            .map(comentarioMapper::toDto);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    @GetMapping("/comentario/planes-nutricion/{id}")
    public ResponseEntity<List<ComentarioDTO>> getAllComentarioPlanesNutricion(@PathVariable String id, @ParameterObject Pageable pageable) {
        Long idDecodificado = hashids.decode(id)[0];
        log.debug("REST request to get all EmpresaDenuncia for an admin");
        final Page<ComentarioDTO> page = comentarioRepository
            .findAll(ComentarioSpecification.findAllByPlanesNutricion(idDecodificado), pageable)
            .map(comentarioMapper::toDto);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}

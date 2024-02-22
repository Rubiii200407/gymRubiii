package com.gymruben.es.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.gymruben.es.IntegrationTest;
import com.gymruben.es.domain.PlanesEntrenamiento;
import com.gymruben.es.repository.PlanesEntrenamientoRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PlanesEntrenamientoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PlanesEntrenamientoResourceIT {

    private static final String DEFAULT_NOMBRE_PLAN = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_PLAN = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO = "BBBBBBBBBB";

    private static final Long DEFAULT_DURACION = 1L;
    private static final Long UPDATED_DURACION = 2L;

    private static final String DEFAULT_INSTRUCCIONES = "AAAAAAAAAA";
    private static final String UPDATED_INSTRUCCIONES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/planes-entrenamientos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PlanesEntrenamientoRepository planesEntrenamientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlanesEntrenamientoMockMvc;

    private PlanesEntrenamiento planesEntrenamiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanesEntrenamiento createEntity(EntityManager em) {
        PlanesEntrenamiento planesEntrenamiento = new PlanesEntrenamiento()
            .nombrePlan(DEFAULT_NOMBRE_PLAN)
            .descripcion(DEFAULT_DESCRIPCION)
            .tipo(DEFAULT_TIPO)
            .duracion(DEFAULT_DURACION)
            .instrucciones(DEFAULT_INSTRUCCIONES);
        return planesEntrenamiento;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanesEntrenamiento createUpdatedEntity(EntityManager em) {
        PlanesEntrenamiento planesEntrenamiento = new PlanesEntrenamiento()
            .nombrePlan(UPDATED_NOMBRE_PLAN)
            .descripcion(UPDATED_DESCRIPCION)
            .tipo(UPDATED_TIPO)
            .duracion(UPDATED_DURACION)
            .instrucciones(UPDATED_INSTRUCCIONES);
        return planesEntrenamiento;
    }

    @BeforeEach
    public void initTest() {
        planesEntrenamiento = createEntity(em);
    }

    @Test
    @Transactional
    void createPlanesEntrenamiento() throws Exception {
        int databaseSizeBeforeCreate = planesEntrenamientoRepository.findAll().size();
        // Create the PlanesEntrenamiento
        restPlanesEntrenamientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(planesEntrenamiento))
            )
            .andExpect(status().isCreated());

        // Validate the PlanesEntrenamiento in the database
        List<PlanesEntrenamiento> planesEntrenamientoList = planesEntrenamientoRepository.findAll();
        assertThat(planesEntrenamientoList).hasSize(databaseSizeBeforeCreate + 1);
        PlanesEntrenamiento testPlanesEntrenamiento = planesEntrenamientoList.get(planesEntrenamientoList.size() - 1);
        assertThat(testPlanesEntrenamiento.getNombrePlan()).isEqualTo(DEFAULT_NOMBRE_PLAN);
        assertThat(testPlanesEntrenamiento.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testPlanesEntrenamiento.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testPlanesEntrenamiento.getDuracion()).isEqualTo(DEFAULT_DURACION);
        assertThat(testPlanesEntrenamiento.getInstrucciones()).isEqualTo(DEFAULT_INSTRUCCIONES);
    }

    @Test
    @Transactional
    void createPlanesEntrenamientoWithExistingId() throws Exception {
        // Create the PlanesEntrenamiento with an existing ID
        planesEntrenamiento.setId(1L);

        int databaseSizeBeforeCreate = planesEntrenamientoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanesEntrenamientoMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(planesEntrenamiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesEntrenamiento in the database
        List<PlanesEntrenamiento> planesEntrenamientoList = planesEntrenamientoRepository.findAll();
        assertThat(planesEntrenamientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPlanesEntrenamientos() throws Exception {
        // Initialize the database
        planesEntrenamientoRepository.saveAndFlush(planesEntrenamiento);

        // Get all the planesEntrenamientoList
        restPlanesEntrenamientoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planesEntrenamiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombrePlan").value(hasItem(DEFAULT_NOMBRE_PLAN)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].duracion").value(hasItem(DEFAULT_DURACION.intValue())))
            .andExpect(jsonPath("$.[*].instrucciones").value(hasItem(DEFAULT_INSTRUCCIONES)));
    }

    @Test
    @Transactional
    void getPlanesEntrenamiento() throws Exception {
        // Initialize the database
        planesEntrenamientoRepository.saveAndFlush(planesEntrenamiento);

        // Get the planesEntrenamiento
        restPlanesEntrenamientoMockMvc
            .perform(get(ENTITY_API_URL_ID, planesEntrenamiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(planesEntrenamiento.getId().intValue()))
            .andExpect(jsonPath("$.nombrePlan").value(DEFAULT_NOMBRE_PLAN))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO))
            .andExpect(jsonPath("$.duracion").value(DEFAULT_DURACION.intValue()))
            .andExpect(jsonPath("$.instrucciones").value(DEFAULT_INSTRUCCIONES));
    }

    @Test
    @Transactional
    void getNonExistingPlanesEntrenamiento() throws Exception {
        // Get the planesEntrenamiento
        restPlanesEntrenamientoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPlanesEntrenamiento() throws Exception {
        // Initialize the database
        planesEntrenamientoRepository.saveAndFlush(planesEntrenamiento);

        int databaseSizeBeforeUpdate = planesEntrenamientoRepository.findAll().size();

        // Update the planesEntrenamiento
        PlanesEntrenamiento updatedPlanesEntrenamiento = planesEntrenamientoRepository.findById(planesEntrenamiento.getId()).get();
        // Disconnect from session so that the updates on updatedPlanesEntrenamiento are not directly saved in db
        em.detach(updatedPlanesEntrenamiento);
        updatedPlanesEntrenamiento
            .nombrePlan(UPDATED_NOMBRE_PLAN)
            .descripcion(UPDATED_DESCRIPCION)
            .tipo(UPDATED_TIPO)
            .duracion(UPDATED_DURACION)
            .instrucciones(UPDATED_INSTRUCCIONES);

        restPlanesEntrenamientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPlanesEntrenamiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPlanesEntrenamiento))
            )
            .andExpect(status().isOk());

        // Validate the PlanesEntrenamiento in the database
        List<PlanesEntrenamiento> planesEntrenamientoList = planesEntrenamientoRepository.findAll();
        assertThat(planesEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
        PlanesEntrenamiento testPlanesEntrenamiento = planesEntrenamientoList.get(planesEntrenamientoList.size() - 1);
        assertThat(testPlanesEntrenamiento.getNombrePlan()).isEqualTo(UPDATED_NOMBRE_PLAN);
        assertThat(testPlanesEntrenamiento.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testPlanesEntrenamiento.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testPlanesEntrenamiento.getDuracion()).isEqualTo(UPDATED_DURACION);
        assertThat(testPlanesEntrenamiento.getInstrucciones()).isEqualTo(UPDATED_INSTRUCCIONES);
    }

    @Test
    @Transactional
    void putNonExistingPlanesEntrenamiento() throws Exception {
        int databaseSizeBeforeUpdate = planesEntrenamientoRepository.findAll().size();
        planesEntrenamiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanesEntrenamientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, planesEntrenamiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(planesEntrenamiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesEntrenamiento in the database
        List<PlanesEntrenamiento> planesEntrenamientoList = planesEntrenamientoRepository.findAll();
        assertThat(planesEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPlanesEntrenamiento() throws Exception {
        int databaseSizeBeforeUpdate = planesEntrenamientoRepository.findAll().size();
        planesEntrenamiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanesEntrenamientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(planesEntrenamiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesEntrenamiento in the database
        List<PlanesEntrenamiento> planesEntrenamientoList = planesEntrenamientoRepository.findAll();
        assertThat(planesEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPlanesEntrenamiento() throws Exception {
        int databaseSizeBeforeUpdate = planesEntrenamientoRepository.findAll().size();
        planesEntrenamiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanesEntrenamientoMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(planesEntrenamiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PlanesEntrenamiento in the database
        List<PlanesEntrenamiento> planesEntrenamientoList = planesEntrenamientoRepository.findAll();
        assertThat(planesEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePlanesEntrenamientoWithPatch() throws Exception {
        // Initialize the database
        planesEntrenamientoRepository.saveAndFlush(planesEntrenamiento);

        int databaseSizeBeforeUpdate = planesEntrenamientoRepository.findAll().size();

        // Update the planesEntrenamiento using partial update
        PlanesEntrenamiento partialUpdatedPlanesEntrenamiento = new PlanesEntrenamiento();
        partialUpdatedPlanesEntrenamiento.setId(planesEntrenamiento.getId());

        partialUpdatedPlanesEntrenamiento.nombrePlan(UPDATED_NOMBRE_PLAN).descripcion(UPDATED_DESCRIPCION);

        restPlanesEntrenamientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlanesEntrenamiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPlanesEntrenamiento))
            )
            .andExpect(status().isOk());

        // Validate the PlanesEntrenamiento in the database
        List<PlanesEntrenamiento> planesEntrenamientoList = planesEntrenamientoRepository.findAll();
        assertThat(planesEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
        PlanesEntrenamiento testPlanesEntrenamiento = planesEntrenamientoList.get(planesEntrenamientoList.size() - 1);
        assertThat(testPlanesEntrenamiento.getNombrePlan()).isEqualTo(UPDATED_NOMBRE_PLAN);
        assertThat(testPlanesEntrenamiento.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testPlanesEntrenamiento.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testPlanesEntrenamiento.getDuracion()).isEqualTo(DEFAULT_DURACION);
        assertThat(testPlanesEntrenamiento.getInstrucciones()).isEqualTo(DEFAULT_INSTRUCCIONES);
    }

    @Test
    @Transactional
    void fullUpdatePlanesEntrenamientoWithPatch() throws Exception {
        // Initialize the database
        planesEntrenamientoRepository.saveAndFlush(planesEntrenamiento);

        int databaseSizeBeforeUpdate = planesEntrenamientoRepository.findAll().size();

        // Update the planesEntrenamiento using partial update
        PlanesEntrenamiento partialUpdatedPlanesEntrenamiento = new PlanesEntrenamiento();
        partialUpdatedPlanesEntrenamiento.setId(planesEntrenamiento.getId());

        partialUpdatedPlanesEntrenamiento
            .nombrePlan(UPDATED_NOMBRE_PLAN)
            .descripcion(UPDATED_DESCRIPCION)
            .tipo(UPDATED_TIPO)
            .duracion(UPDATED_DURACION)
            .instrucciones(UPDATED_INSTRUCCIONES);

        restPlanesEntrenamientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlanesEntrenamiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPlanesEntrenamiento))
            )
            .andExpect(status().isOk());

        // Validate the PlanesEntrenamiento in the database
        List<PlanesEntrenamiento> planesEntrenamientoList = planesEntrenamientoRepository.findAll();
        assertThat(planesEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
        PlanesEntrenamiento testPlanesEntrenamiento = planesEntrenamientoList.get(planesEntrenamientoList.size() - 1);
        assertThat(testPlanesEntrenamiento.getNombrePlan()).isEqualTo(UPDATED_NOMBRE_PLAN);
        assertThat(testPlanesEntrenamiento.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testPlanesEntrenamiento.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testPlanesEntrenamiento.getDuracion()).isEqualTo(UPDATED_DURACION);
        assertThat(testPlanesEntrenamiento.getInstrucciones()).isEqualTo(UPDATED_INSTRUCCIONES);
    }

    @Test
    @Transactional
    void patchNonExistingPlanesEntrenamiento() throws Exception {
        int databaseSizeBeforeUpdate = planesEntrenamientoRepository.findAll().size();
        planesEntrenamiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanesEntrenamientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, planesEntrenamiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(planesEntrenamiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesEntrenamiento in the database
        List<PlanesEntrenamiento> planesEntrenamientoList = planesEntrenamientoRepository.findAll();
        assertThat(planesEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPlanesEntrenamiento() throws Exception {
        int databaseSizeBeforeUpdate = planesEntrenamientoRepository.findAll().size();
        planesEntrenamiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanesEntrenamientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(planesEntrenamiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesEntrenamiento in the database
        List<PlanesEntrenamiento> planesEntrenamientoList = planesEntrenamientoRepository.findAll();
        assertThat(planesEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPlanesEntrenamiento() throws Exception {
        int databaseSizeBeforeUpdate = planesEntrenamientoRepository.findAll().size();
        planesEntrenamiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanesEntrenamientoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(planesEntrenamiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PlanesEntrenamiento in the database
        List<PlanesEntrenamiento> planesEntrenamientoList = planesEntrenamientoRepository.findAll();
        assertThat(planesEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePlanesEntrenamiento() throws Exception {
        // Initialize the database
        planesEntrenamientoRepository.saveAndFlush(planesEntrenamiento);

        int databaseSizeBeforeDelete = planesEntrenamientoRepository.findAll().size();

        // Delete the planesEntrenamiento
        restPlanesEntrenamientoMockMvc
            .perform(delete(ENTITY_API_URL_ID, planesEntrenamiento.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlanesEntrenamiento> planesEntrenamientoList = planesEntrenamientoRepository.findAll();
        assertThat(planesEntrenamientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

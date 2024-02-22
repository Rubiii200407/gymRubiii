package com.gymruben.es.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.gymruben.es.IntegrationTest;
import com.gymruben.es.domain.PlanesNutricion;
import com.gymruben.es.repository.PlanesNutricionRepository;
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
 * Integration tests for the {@link PlanesNutricionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PlanesNutricionResourceIT {

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

    private static final String ENTITY_API_URL = "/api/planes-nutricions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PlanesNutricionRepository planesNutricionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPlanesNutricionMockMvc;

    private PlanesNutricion planesNutricion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanesNutricion createEntity(EntityManager em) {
        PlanesNutricion planesNutricion = new PlanesNutricion()
            .nombrePlan(DEFAULT_NOMBRE_PLAN)
            .descripcion(DEFAULT_DESCRIPCION)
            .tipo(DEFAULT_TIPO)
            .duracion(DEFAULT_DURACION)
            .instrucciones(DEFAULT_INSTRUCCIONES);
        return planesNutricion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanesNutricion createUpdatedEntity(EntityManager em) {
        PlanesNutricion planesNutricion = new PlanesNutricion()
            .nombrePlan(UPDATED_NOMBRE_PLAN)
            .descripcion(UPDATED_DESCRIPCION)
            .tipo(UPDATED_TIPO)
            .duracion(UPDATED_DURACION)
            .instrucciones(UPDATED_INSTRUCCIONES);
        return planesNutricion;
    }

    @BeforeEach
    public void initTest() {
        planesNutricion = createEntity(em);
    }

    @Test
    @Transactional
    void createPlanesNutricion() throws Exception {
        int databaseSizeBeforeCreate = planesNutricionRepository.findAll().size();
        // Create the PlanesNutricion
        restPlanesNutricionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(planesNutricion))
            )
            .andExpect(status().isCreated());

        // Validate the PlanesNutricion in the database
        List<PlanesNutricion> planesNutricionList = planesNutricionRepository.findAll();
        assertThat(planesNutricionList).hasSize(databaseSizeBeforeCreate + 1);
        PlanesNutricion testPlanesNutricion = planesNutricionList.get(planesNutricionList.size() - 1);
        assertThat(testPlanesNutricion.getNombrePlan()).isEqualTo(DEFAULT_NOMBRE_PLAN);
        assertThat(testPlanesNutricion.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testPlanesNutricion.getTipo()).isEqualTo(DEFAULT_TIPO);
        assertThat(testPlanesNutricion.getDuracion()).isEqualTo(DEFAULT_DURACION);
        assertThat(testPlanesNutricion.getInstrucciones()).isEqualTo(DEFAULT_INSTRUCCIONES);
    }

    @Test
    @Transactional
    void createPlanesNutricionWithExistingId() throws Exception {
        // Create the PlanesNutricion with an existing ID
        planesNutricion.setId(1L);

        int databaseSizeBeforeCreate = planesNutricionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanesNutricionMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(planesNutricion))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesNutricion in the database
        List<PlanesNutricion> planesNutricionList = planesNutricionRepository.findAll();
        assertThat(planesNutricionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPlanesNutricions() throws Exception {
        // Initialize the database
        planesNutricionRepository.saveAndFlush(planesNutricion);

        // Get all the planesNutricionList
        restPlanesNutricionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planesNutricion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombrePlan").value(hasItem(DEFAULT_NOMBRE_PLAN)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO)))
            .andExpect(jsonPath("$.[*].duracion").value(hasItem(DEFAULT_DURACION.intValue())))
            .andExpect(jsonPath("$.[*].instrucciones").value(hasItem(DEFAULT_INSTRUCCIONES)));
    }

    @Test
    @Transactional
    void getPlanesNutricion() throws Exception {
        // Initialize the database
        planesNutricionRepository.saveAndFlush(planesNutricion);

        // Get the planesNutricion
        restPlanesNutricionMockMvc
            .perform(get(ENTITY_API_URL_ID, planesNutricion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(planesNutricion.getId().intValue()))
            .andExpect(jsonPath("$.nombrePlan").value(DEFAULT_NOMBRE_PLAN))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO))
            .andExpect(jsonPath("$.duracion").value(DEFAULT_DURACION.intValue()))
            .andExpect(jsonPath("$.instrucciones").value(DEFAULT_INSTRUCCIONES));
    }

    @Test
    @Transactional
    void getNonExistingPlanesNutricion() throws Exception {
        // Get the planesNutricion
        restPlanesNutricionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingPlanesNutricion() throws Exception {
        // Initialize the database
        planesNutricionRepository.saveAndFlush(planesNutricion);

        int databaseSizeBeforeUpdate = planesNutricionRepository.findAll().size();

        // Update the planesNutricion
        PlanesNutricion updatedPlanesNutricion = planesNutricionRepository.findById(planesNutricion.getId()).get();
        // Disconnect from session so that the updates on updatedPlanesNutricion are not directly saved in db
        em.detach(updatedPlanesNutricion);
        updatedPlanesNutricion
            .nombrePlan(UPDATED_NOMBRE_PLAN)
            .descripcion(UPDATED_DESCRIPCION)
            .tipo(UPDATED_TIPO)
            .duracion(UPDATED_DURACION)
            .instrucciones(UPDATED_INSTRUCCIONES);

        restPlanesNutricionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPlanesNutricion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPlanesNutricion))
            )
            .andExpect(status().isOk());

        // Validate the PlanesNutricion in the database
        List<PlanesNutricion> planesNutricionList = planesNutricionRepository.findAll();
        assertThat(planesNutricionList).hasSize(databaseSizeBeforeUpdate);
        PlanesNutricion testPlanesNutricion = planesNutricionList.get(planesNutricionList.size() - 1);
        assertThat(testPlanesNutricion.getNombrePlan()).isEqualTo(UPDATED_NOMBRE_PLAN);
        assertThat(testPlanesNutricion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testPlanesNutricion.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testPlanesNutricion.getDuracion()).isEqualTo(UPDATED_DURACION);
        assertThat(testPlanesNutricion.getInstrucciones()).isEqualTo(UPDATED_INSTRUCCIONES);
    }

    @Test
    @Transactional
    void putNonExistingPlanesNutricion() throws Exception {
        int databaseSizeBeforeUpdate = planesNutricionRepository.findAll().size();
        planesNutricion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanesNutricionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, planesNutricion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(planesNutricion))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesNutricion in the database
        List<PlanesNutricion> planesNutricionList = planesNutricionRepository.findAll();
        assertThat(planesNutricionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPlanesNutricion() throws Exception {
        int databaseSizeBeforeUpdate = planesNutricionRepository.findAll().size();
        planesNutricion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanesNutricionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(planesNutricion))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesNutricion in the database
        List<PlanesNutricion> planesNutricionList = planesNutricionRepository.findAll();
        assertThat(planesNutricionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPlanesNutricion() throws Exception {
        int databaseSizeBeforeUpdate = planesNutricionRepository.findAll().size();
        planesNutricion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanesNutricionMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(planesNutricion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PlanesNutricion in the database
        List<PlanesNutricion> planesNutricionList = planesNutricionRepository.findAll();
        assertThat(planesNutricionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePlanesNutricionWithPatch() throws Exception {
        // Initialize the database
        planesNutricionRepository.saveAndFlush(planesNutricion);

        int databaseSizeBeforeUpdate = planesNutricionRepository.findAll().size();

        // Update the planesNutricion using partial update
        PlanesNutricion partialUpdatedPlanesNutricion = new PlanesNutricion();
        partialUpdatedPlanesNutricion.setId(planesNutricion.getId());

        partialUpdatedPlanesNutricion.nombrePlan(UPDATED_NOMBRE_PLAN).tipo(UPDATED_TIPO).instrucciones(UPDATED_INSTRUCCIONES);

        restPlanesNutricionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlanesNutricion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPlanesNutricion))
            )
            .andExpect(status().isOk());

        // Validate the PlanesNutricion in the database
        List<PlanesNutricion> planesNutricionList = planesNutricionRepository.findAll();
        assertThat(planesNutricionList).hasSize(databaseSizeBeforeUpdate);
        PlanesNutricion testPlanesNutricion = planesNutricionList.get(planesNutricionList.size() - 1);
        assertThat(testPlanesNutricion.getNombrePlan()).isEqualTo(UPDATED_NOMBRE_PLAN);
        assertThat(testPlanesNutricion.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testPlanesNutricion.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testPlanesNutricion.getDuracion()).isEqualTo(DEFAULT_DURACION);
        assertThat(testPlanesNutricion.getInstrucciones()).isEqualTo(UPDATED_INSTRUCCIONES);
    }

    @Test
    @Transactional
    void fullUpdatePlanesNutricionWithPatch() throws Exception {
        // Initialize the database
        planesNutricionRepository.saveAndFlush(planesNutricion);

        int databaseSizeBeforeUpdate = planesNutricionRepository.findAll().size();

        // Update the planesNutricion using partial update
        PlanesNutricion partialUpdatedPlanesNutricion = new PlanesNutricion();
        partialUpdatedPlanesNutricion.setId(planesNutricion.getId());

        partialUpdatedPlanesNutricion
            .nombrePlan(UPDATED_NOMBRE_PLAN)
            .descripcion(UPDATED_DESCRIPCION)
            .tipo(UPDATED_TIPO)
            .duracion(UPDATED_DURACION)
            .instrucciones(UPDATED_INSTRUCCIONES);

        restPlanesNutricionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPlanesNutricion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPlanesNutricion))
            )
            .andExpect(status().isOk());

        // Validate the PlanesNutricion in the database
        List<PlanesNutricion> planesNutricionList = planesNutricionRepository.findAll();
        assertThat(planesNutricionList).hasSize(databaseSizeBeforeUpdate);
        PlanesNutricion testPlanesNutricion = planesNutricionList.get(planesNutricionList.size() - 1);
        assertThat(testPlanesNutricion.getNombrePlan()).isEqualTo(UPDATED_NOMBRE_PLAN);
        assertThat(testPlanesNutricion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testPlanesNutricion.getTipo()).isEqualTo(UPDATED_TIPO);
        assertThat(testPlanesNutricion.getDuracion()).isEqualTo(UPDATED_DURACION);
        assertThat(testPlanesNutricion.getInstrucciones()).isEqualTo(UPDATED_INSTRUCCIONES);
    }

    @Test
    @Transactional
    void patchNonExistingPlanesNutricion() throws Exception {
        int databaseSizeBeforeUpdate = planesNutricionRepository.findAll().size();
        planesNutricion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanesNutricionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, planesNutricion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(planesNutricion))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesNutricion in the database
        List<PlanesNutricion> planesNutricionList = planesNutricionRepository.findAll();
        assertThat(planesNutricionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPlanesNutricion() throws Exception {
        int databaseSizeBeforeUpdate = planesNutricionRepository.findAll().size();
        planesNutricion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanesNutricionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(planesNutricion))
            )
            .andExpect(status().isBadRequest());

        // Validate the PlanesNutricion in the database
        List<PlanesNutricion> planesNutricionList = planesNutricionRepository.findAll();
        assertThat(planesNutricionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPlanesNutricion() throws Exception {
        int databaseSizeBeforeUpdate = planesNutricionRepository.findAll().size();
        planesNutricion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPlanesNutricionMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(planesNutricion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PlanesNutricion in the database
        List<PlanesNutricion> planesNutricionList = planesNutricionRepository.findAll();
        assertThat(planesNutricionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePlanesNutricion() throws Exception {
        // Initialize the database
        planesNutricionRepository.saveAndFlush(planesNutricion);

        int databaseSizeBeforeDelete = planesNutricionRepository.findAll().size();

        // Delete the planesNutricion
        restPlanesNutricionMockMvc
            .perform(delete(ENTITY_API_URL_ID, planesNutricion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlanesNutricion> planesNutricionList = planesNutricionRepository.findAll();
        assertThat(planesNutricionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

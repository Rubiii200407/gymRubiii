package com.gymruben.es.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.gymruben.es.IntegrationTest;
import com.gymruben.es.domain.Nutricion;
import com.gymruben.es.repository.NutricionRepository;
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
 * Integration tests for the {@link NutricionResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class NutricionResourceIT {

    private static final String DEFAULT_NOMBRE_PLAN_NUTRICION = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_PLAN_NUTRICION = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO_DIETA = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_DIETA = "BBBBBBBBBB";

    private static final String DEFAULT_ALIMENTOS_RECOMENDADOS = "AAAAAAAAAA";
    private static final String UPDATED_ALIMENTOS_RECOMENDADOS = "BBBBBBBBBB";

    private static final String DEFAULT_INSTRUCCIONES = "AAAAAAAAAA";
    private static final String UPDATED_INSTRUCCIONES = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/nutricions";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private NutricionRepository nutricionRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNutricionMockMvc;

    private Nutricion nutricion;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nutricion createEntity(EntityManager em) {
        Nutricion nutricion = new Nutricion()
            .nombrePlanNutricion(DEFAULT_NOMBRE_PLAN_NUTRICION)
            .descripcion(DEFAULT_DESCRIPCION)
            .tipoDieta(DEFAULT_TIPO_DIETA)
            .alimentosRecomendados(DEFAULT_ALIMENTOS_RECOMENDADOS)
            .instrucciones(DEFAULT_INSTRUCCIONES);
        return nutricion;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Nutricion createUpdatedEntity(EntityManager em) {
        Nutricion nutricion = new Nutricion()
            .nombrePlanNutricion(UPDATED_NOMBRE_PLAN_NUTRICION)
            .descripcion(UPDATED_DESCRIPCION)
            .tipoDieta(UPDATED_TIPO_DIETA)
            .alimentosRecomendados(UPDATED_ALIMENTOS_RECOMENDADOS)
            .instrucciones(UPDATED_INSTRUCCIONES);
        return nutricion;
    }

    @BeforeEach
    public void initTest() {
        nutricion = createEntity(em);
    }

    @Test
    @Transactional
    void createNutricion() throws Exception {
        int databaseSizeBeforeCreate = nutricionRepository.findAll().size();
        // Create the Nutricion
        restNutricionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nutricion)))
            .andExpect(status().isCreated());

        // Validate the Nutricion in the database
        List<Nutricion> nutricionList = nutricionRepository.findAll();
        assertThat(nutricionList).hasSize(databaseSizeBeforeCreate + 1);
        Nutricion testNutricion = nutricionList.get(nutricionList.size() - 1);
        assertThat(testNutricion.getNombrePlanNutricion()).isEqualTo(DEFAULT_NOMBRE_PLAN_NUTRICION);
        assertThat(testNutricion.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testNutricion.getTipoDieta()).isEqualTo(DEFAULT_TIPO_DIETA);
        assertThat(testNutricion.getAlimentosRecomendados()).isEqualTo(DEFAULT_ALIMENTOS_RECOMENDADOS);
        assertThat(testNutricion.getInstrucciones()).isEqualTo(DEFAULT_INSTRUCCIONES);
    }

    @Test
    @Transactional
    void createNutricionWithExistingId() throws Exception {
        // Create the Nutricion with an existing ID
        nutricion.setId(1L);

        int databaseSizeBeforeCreate = nutricionRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restNutricionMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nutricion)))
            .andExpect(status().isBadRequest());

        // Validate the Nutricion in the database
        List<Nutricion> nutricionList = nutricionRepository.findAll();
        assertThat(nutricionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllNutricions() throws Exception {
        // Initialize the database
        nutricionRepository.saveAndFlush(nutricion);

        // Get all the nutricionList
        restNutricionMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(nutricion.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombrePlanNutricion").value(hasItem(DEFAULT_NOMBRE_PLAN_NUTRICION)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].tipoDieta").value(hasItem(DEFAULT_TIPO_DIETA)))
            .andExpect(jsonPath("$.[*].alimentosRecomendados").value(hasItem(DEFAULT_ALIMENTOS_RECOMENDADOS)))
            .andExpect(jsonPath("$.[*].instrucciones").value(hasItem(DEFAULT_INSTRUCCIONES)));
    }

    @Test
    @Transactional
    void getNutricion() throws Exception {
        // Initialize the database
        nutricionRepository.saveAndFlush(nutricion);

        // Get the nutricion
        restNutricionMockMvc
            .perform(get(ENTITY_API_URL_ID, nutricion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(nutricion.getId().intValue()))
            .andExpect(jsonPath("$.nombrePlanNutricion").value(DEFAULT_NOMBRE_PLAN_NUTRICION))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.tipoDieta").value(DEFAULT_TIPO_DIETA))
            .andExpect(jsonPath("$.alimentosRecomendados").value(DEFAULT_ALIMENTOS_RECOMENDADOS))
            .andExpect(jsonPath("$.instrucciones").value(DEFAULT_INSTRUCCIONES));
    }

    @Test
    @Transactional
    void getNonExistingNutricion() throws Exception {
        // Get the nutricion
        restNutricionMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingNutricion() throws Exception {
        // Initialize the database
        nutricionRepository.saveAndFlush(nutricion);

        int databaseSizeBeforeUpdate = nutricionRepository.findAll().size();

        // Update the nutricion
        Nutricion updatedNutricion = nutricionRepository.findById(nutricion.getId()).get();
        // Disconnect from session so that the updates on updatedNutricion are not directly saved in db
        em.detach(updatedNutricion);
        updatedNutricion
            .nombrePlanNutricion(UPDATED_NOMBRE_PLAN_NUTRICION)
            .descripcion(UPDATED_DESCRIPCION)
            .tipoDieta(UPDATED_TIPO_DIETA)
            .alimentosRecomendados(UPDATED_ALIMENTOS_RECOMENDADOS)
            .instrucciones(UPDATED_INSTRUCCIONES);

        restNutricionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedNutricion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedNutricion))
            )
            .andExpect(status().isOk());

        // Validate the Nutricion in the database
        List<Nutricion> nutricionList = nutricionRepository.findAll();
        assertThat(nutricionList).hasSize(databaseSizeBeforeUpdate);
        Nutricion testNutricion = nutricionList.get(nutricionList.size() - 1);
        assertThat(testNutricion.getNombrePlanNutricion()).isEqualTo(UPDATED_NOMBRE_PLAN_NUTRICION);
        assertThat(testNutricion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testNutricion.getTipoDieta()).isEqualTo(UPDATED_TIPO_DIETA);
        assertThat(testNutricion.getAlimentosRecomendados()).isEqualTo(UPDATED_ALIMENTOS_RECOMENDADOS);
        assertThat(testNutricion.getInstrucciones()).isEqualTo(UPDATED_INSTRUCCIONES);
    }

    @Test
    @Transactional
    void putNonExistingNutricion() throws Exception {
        int databaseSizeBeforeUpdate = nutricionRepository.findAll().size();
        nutricion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNutricionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, nutricion.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(nutricion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Nutricion in the database
        List<Nutricion> nutricionList = nutricionRepository.findAll();
        assertThat(nutricionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchNutricion() throws Exception {
        int databaseSizeBeforeUpdate = nutricionRepository.findAll().size();
        nutricion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNutricionMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(nutricion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Nutricion in the database
        List<Nutricion> nutricionList = nutricionRepository.findAll();
        assertThat(nutricionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamNutricion() throws Exception {
        int databaseSizeBeforeUpdate = nutricionRepository.findAll().size();
        nutricion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNutricionMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(nutricion)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Nutricion in the database
        List<Nutricion> nutricionList = nutricionRepository.findAll();
        assertThat(nutricionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateNutricionWithPatch() throws Exception {
        // Initialize the database
        nutricionRepository.saveAndFlush(nutricion);

        int databaseSizeBeforeUpdate = nutricionRepository.findAll().size();

        // Update the nutricion using partial update
        Nutricion partialUpdatedNutricion = new Nutricion();
        partialUpdatedNutricion.setId(nutricion.getId());

        partialUpdatedNutricion
            .nombrePlanNutricion(UPDATED_NOMBRE_PLAN_NUTRICION)
            .descripcion(UPDATED_DESCRIPCION)
            .tipoDieta(UPDATED_TIPO_DIETA)
            .instrucciones(UPDATED_INSTRUCCIONES);

        restNutricionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNutricion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNutricion))
            )
            .andExpect(status().isOk());

        // Validate the Nutricion in the database
        List<Nutricion> nutricionList = nutricionRepository.findAll();
        assertThat(nutricionList).hasSize(databaseSizeBeforeUpdate);
        Nutricion testNutricion = nutricionList.get(nutricionList.size() - 1);
        assertThat(testNutricion.getNombrePlanNutricion()).isEqualTo(UPDATED_NOMBRE_PLAN_NUTRICION);
        assertThat(testNutricion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testNutricion.getTipoDieta()).isEqualTo(UPDATED_TIPO_DIETA);
        assertThat(testNutricion.getAlimentosRecomendados()).isEqualTo(DEFAULT_ALIMENTOS_RECOMENDADOS);
        assertThat(testNutricion.getInstrucciones()).isEqualTo(UPDATED_INSTRUCCIONES);
    }

    @Test
    @Transactional
    void fullUpdateNutricionWithPatch() throws Exception {
        // Initialize the database
        nutricionRepository.saveAndFlush(nutricion);

        int databaseSizeBeforeUpdate = nutricionRepository.findAll().size();

        // Update the nutricion using partial update
        Nutricion partialUpdatedNutricion = new Nutricion();
        partialUpdatedNutricion.setId(nutricion.getId());

        partialUpdatedNutricion
            .nombrePlanNutricion(UPDATED_NOMBRE_PLAN_NUTRICION)
            .descripcion(UPDATED_DESCRIPCION)
            .tipoDieta(UPDATED_TIPO_DIETA)
            .alimentosRecomendados(UPDATED_ALIMENTOS_RECOMENDADOS)
            .instrucciones(UPDATED_INSTRUCCIONES);

        restNutricionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedNutricion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedNutricion))
            )
            .andExpect(status().isOk());

        // Validate the Nutricion in the database
        List<Nutricion> nutricionList = nutricionRepository.findAll();
        assertThat(nutricionList).hasSize(databaseSizeBeforeUpdate);
        Nutricion testNutricion = nutricionList.get(nutricionList.size() - 1);
        assertThat(testNutricion.getNombrePlanNutricion()).isEqualTo(UPDATED_NOMBRE_PLAN_NUTRICION);
        assertThat(testNutricion.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testNutricion.getTipoDieta()).isEqualTo(UPDATED_TIPO_DIETA);
        assertThat(testNutricion.getAlimentosRecomendados()).isEqualTo(UPDATED_ALIMENTOS_RECOMENDADOS);
        assertThat(testNutricion.getInstrucciones()).isEqualTo(UPDATED_INSTRUCCIONES);
    }

    @Test
    @Transactional
    void patchNonExistingNutricion() throws Exception {
        int databaseSizeBeforeUpdate = nutricionRepository.findAll().size();
        nutricion.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNutricionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, nutricion.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(nutricion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Nutricion in the database
        List<Nutricion> nutricionList = nutricionRepository.findAll();
        assertThat(nutricionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchNutricion() throws Exception {
        int databaseSizeBeforeUpdate = nutricionRepository.findAll().size();
        nutricion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNutricionMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(nutricion))
            )
            .andExpect(status().isBadRequest());

        // Validate the Nutricion in the database
        List<Nutricion> nutricionList = nutricionRepository.findAll();
        assertThat(nutricionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamNutricion() throws Exception {
        int databaseSizeBeforeUpdate = nutricionRepository.findAll().size();
        nutricion.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restNutricionMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(nutricion))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Nutricion in the database
        List<Nutricion> nutricionList = nutricionRepository.findAll();
        assertThat(nutricionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteNutricion() throws Exception {
        // Initialize the database
        nutricionRepository.saveAndFlush(nutricion);

        int databaseSizeBeforeDelete = nutricionRepository.findAll().size();

        // Delete the nutricion
        restNutricionMockMvc
            .perform(delete(ENTITY_API_URL_ID, nutricion.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Nutricion> nutricionList = nutricionRepository.findAll();
        assertThat(nutricionList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

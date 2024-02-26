package com.gymruben.es.web.rest;

import static org.assertj.core.api.Assertions.*;
import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

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

import com.gymruben.es.IntegrationTest;
import com.gymruben.es.domain.Deportes;
import com.gymruben.es.repository.DeportesRepository;

/**
 * Integration tests for the {@link DeportesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class DeportesResourceIT {

    private static final String DEFAULT_NOMBRE_DEPORTE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_DEPORTE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_HORARIOS_DISPONIBLES = "AAAAAAAAAA";
    private static final String UPDATED_HORARIOS_DISPONIBLES = "BBBBBBBBBB";

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/deportes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DeportesRepository deportesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDeportesMockMvc;

    private Deportes deportes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Deportes createEntity(EntityManager em) {
        Deportes deportes = new Deportes()
            .nombreDeporte(DEFAULT_NOMBRE_DEPORTE)
            .descripcion(DEFAULT_DESCRIPCION)
            .horariosDisponibles(DEFAULT_HORARIOS_DISPONIBLES)
            .codigo(DEFAULT_CODIGO);
        return deportes;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Deportes createUpdatedEntity(EntityManager em) {
        Deportes deportes = new Deportes()
            .nombreDeporte(UPDATED_NOMBRE_DEPORTE)
            .descripcion(UPDATED_DESCRIPCION)
            .horariosDisponibles(UPDATED_HORARIOS_DISPONIBLES)
            .codigo(UPDATED_CODIGO);
        return deportes;
    }

    @BeforeEach
    public void initTest() {
        deportes = createEntity(em);
    }

    @Test
    @Transactional
    void createDeportes() throws Exception {
        int databaseSizeBeforeCreate = deportesRepository.findAll().size();
        // Create the Deportes
        restDeportesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(deportes)))
            .andExpect(status().isCreated());

        // Validate the Deportes in the database
        List<Deportes> deportesList = deportesRepository.findAll();
        assertThat(deportesList).hasSize(databaseSizeBeforeCreate + 1);
        Deportes testDeportes = deportesList.get(deportesList.size() - 1);
        assertThat(testDeportes.getNombreDeporte()).isEqualTo(DEFAULT_NOMBRE_DEPORTE);
        assertThat(testDeportes.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testDeportes.getHorariosDisponibles()).isEqualTo(DEFAULT_HORARIOS_DISPONIBLES);
        assertThat(testDeportes.getCodigo()).isEqualTo(DEFAULT_CODIGO);
    }

    @Test
    @Transactional
    void createDeportesWithExistingId() throws Exception {
        // Create the Deportes with an existing ID
        deportes.setId(1L);

        int databaseSizeBeforeCreate = deportesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeportesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(deportes)))
            .andExpect(status().isBadRequest());

        // Validate the Deportes in the database
        List<Deportes> deportesList = deportesRepository.findAll();
        assertThat(deportesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllDeportes() throws Exception {
        // Initialize the database
        deportesRepository.saveAndFlush(deportes);

        // Get all the deportesList
        restDeportesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deportes.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreDeporte").value(hasItem(DEFAULT_NOMBRE_DEPORTE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].horariosDisponibles").value(hasItem(DEFAULT_HORARIOS_DISPONIBLES)))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)));
    }

    @Test
    @Transactional
    void getDeportes() throws Exception {
        // Initialize the database
        deportesRepository.saveAndFlush(deportes);

        // Get the deportes
        restDeportesMockMvc
            .perform(get(ENTITY_API_URL_ID, deportes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(deportes.getId().intValue()))
            .andExpect(jsonPath("$.nombreDeporte").value(DEFAULT_NOMBRE_DEPORTE))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.horariosDisponibles").value(DEFAULT_HORARIOS_DISPONIBLES))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO));
    }

    @Test
    @Transactional
    void getNonExistingDeportes() throws Exception {
        // Get the deportes
        restDeportesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingDeportes() throws Exception {
        // Initialize the database
        deportesRepository.saveAndFlush(deportes);

        int databaseSizeBeforeUpdate = deportesRepository.findAll().size();

        // Update the deportes
        Deportes updatedDeportes = deportesRepository.findById(deportes.getId()).get();
        // Disconnect from session so that the updates on updatedDeportes are not directly saved in db
        em.detach(updatedDeportes);
        updatedDeportes
            .nombreDeporte(UPDATED_NOMBRE_DEPORTE)
            .descripcion(UPDATED_DESCRIPCION)
            .horariosDisponibles(UPDATED_HORARIOS_DISPONIBLES)
            .codigo(UPDATED_CODIGO);

        restDeportesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedDeportes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedDeportes))
            )
            .andExpect(status().isOk());

        // Validate the Deportes in the database
        List<Deportes> deportesList = deportesRepository.findAll();
        assertThat(deportesList).hasSize(databaseSizeBeforeUpdate);
        Deportes testDeportes = deportesList.get(deportesList.size() - 1);
        assertThat(testDeportes.getNombreDeporte()).isEqualTo(UPDATED_NOMBRE_DEPORTE);
        assertThat(testDeportes.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testDeportes.getHorariosDisponibles()).isEqualTo(UPDATED_HORARIOS_DISPONIBLES);
        assertThat(testDeportes.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    void putNonExistingDeportes() throws Exception {
        int databaseSizeBeforeUpdate = deportesRepository.findAll().size();
        deportes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeportesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, deportes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(deportes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Deportes in the database
        List<Deportes> deportesList = deportesRepository.findAll();
        assertThat(deportesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchDeportes() throws Exception {
        int databaseSizeBeforeUpdate = deportesRepository.findAll().size();
        deportes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeportesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(deportes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Deportes in the database
        List<Deportes> deportesList = deportesRepository.findAll();
        assertThat(deportesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamDeportes() throws Exception {
        int databaseSizeBeforeUpdate = deportesRepository.findAll().size();
        deportes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeportesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(deportes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Deportes in the database
        List<Deportes> deportesList = deportesRepository.findAll();
        assertThat(deportesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateDeportesWithPatch() throws Exception {
        // Initialize the database
        deportesRepository.saveAndFlush(deportes);

        int databaseSizeBeforeUpdate = deportesRepository.findAll().size();

        // Update the deportes using partial update
        Deportes partialUpdatedDeportes = new Deportes();
        partialUpdatedDeportes.setId(deportes.getId());

        partialUpdatedDeportes
            .nombreDeporte(UPDATED_NOMBRE_DEPORTE)
            .horariosDisponibles(UPDATED_HORARIOS_DISPONIBLES)
            .codigo(UPDATED_CODIGO);

        restDeportesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDeportes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDeportes))
            )
            .andExpect(status().isOk());

        // Validate the Deportes in the database
        List<Deportes> deportesList = deportesRepository.findAll();
        assertThat(deportesList).hasSize(databaseSizeBeforeUpdate);
        Deportes testDeportes = deportesList.get(deportesList.size() - 1);
        assertThat(testDeportes.getNombreDeporte()).isEqualTo(UPDATED_NOMBRE_DEPORTE);
        assertThat(testDeportes.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testDeportes.getHorariosDisponibles()).isEqualTo(UPDATED_HORARIOS_DISPONIBLES);
        assertThat(testDeportes.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    void fullUpdateDeportesWithPatch() throws Exception {
        // Initialize the database
        deportesRepository.saveAndFlush(deportes);

        int databaseSizeBeforeUpdate = deportesRepository.findAll().size();

        // Update the deportes using partial update
        Deportes partialUpdatedDeportes = new Deportes();
        partialUpdatedDeportes.setId(deportes.getId());

        partialUpdatedDeportes
            .nombreDeporte(UPDATED_NOMBRE_DEPORTE)
            .descripcion(UPDATED_DESCRIPCION)
            .horariosDisponibles(UPDATED_HORARIOS_DISPONIBLES)
            .codigo(UPDATED_CODIGO);

        restDeportesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedDeportes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedDeportes))
            )
            .andExpect(status().isOk());

        // Validate the Deportes in the database
        List<Deportes> deportesList = deportesRepository.findAll();
        assertThat(deportesList).hasSize(databaseSizeBeforeUpdate);
        Deportes testDeportes = deportesList.get(deportesList.size() - 1);
        assertThat(testDeportes.getNombreDeporte()).isEqualTo(UPDATED_NOMBRE_DEPORTE);
        assertThat(testDeportes.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testDeportes.getHorariosDisponibles()).isEqualTo(UPDATED_HORARIOS_DISPONIBLES);
        assertThat(testDeportes.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    void patchNonExistingDeportes() throws Exception {
        int databaseSizeBeforeUpdate = deportesRepository.findAll().size();
        deportes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDeportesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, deportes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(deportes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Deportes in the database
        List<Deportes> deportesList = deportesRepository.findAll();
        assertThat(deportesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchDeportes() throws Exception {
        int databaseSizeBeforeUpdate = deportesRepository.findAll().size();
        deportes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeportesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(deportes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Deportes in the database
        List<Deportes> deportesList = deportesRepository.findAll();
        assertThat(deportesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamDeportes() throws Exception {
        int databaseSizeBeforeUpdate = deportesRepository.findAll().size();
        deportes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restDeportesMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(deportes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Deportes in the database
        List<Deportes> deportesList = deportesRepository.findAll();
        assertThat(deportesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteDeportes() throws Exception {
        // Initialize the database
        deportesRepository.saveAndFlush(deportes);

        int databaseSizeBeforeDelete = deportesRepository.findAll().size();

        // Delete the deportes
        restDeportesMockMvc
            .perform(delete(ENTITY_API_URL_ID, deportes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Deportes> deportesList = deportesRepository.findAll();
        assertThat(deportesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

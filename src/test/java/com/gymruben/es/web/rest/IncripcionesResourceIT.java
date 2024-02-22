package com.gymruben.es.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.gymruben.es.IntegrationTest;
import com.gymruben.es.domain.Incripciones;
import com.gymruben.es.repository.IncripcionesRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
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
 * Integration tests for the {@link IncripcionesResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class IncripcionesResourceIT {

    private static final String DEFAULT_NOMBRE_USUARIO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_USUARIO = "BBBBBBBBBB";

    private static final String DEFAULT_TIPO_EVENTO = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_EVENTO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE_EVENTO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_EVENTO = "BBBBBBBBBB";

    private static final Instant DEFAULT_FECHA_INSCRIPCION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_INSCRIPCION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/incripciones";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private IncripcionesRepository incripcionesRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restIncripcionesMockMvc;

    private Incripciones incripciones;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Incripciones createEntity(EntityManager em) {
        Incripciones incripciones = new Incripciones()
            .nombreUsuario(DEFAULT_NOMBRE_USUARIO)
            .tipoEvento(DEFAULT_TIPO_EVENTO)
            .nombreEvento(DEFAULT_NOMBRE_EVENTO)
            .fechaInscripcion(DEFAULT_FECHA_INSCRIPCION);
        return incripciones;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Incripciones createUpdatedEntity(EntityManager em) {
        Incripciones incripciones = new Incripciones()
            .nombreUsuario(UPDATED_NOMBRE_USUARIO)
            .tipoEvento(UPDATED_TIPO_EVENTO)
            .nombreEvento(UPDATED_NOMBRE_EVENTO)
            .fechaInscripcion(UPDATED_FECHA_INSCRIPCION);
        return incripciones;
    }

    @BeforeEach
    public void initTest() {
        incripciones = createEntity(em);
    }

    @Test
    @Transactional
    void createIncripciones() throws Exception {
        int databaseSizeBeforeCreate = incripcionesRepository.findAll().size();
        // Create the Incripciones
        restIncripcionesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(incripciones)))
            .andExpect(status().isCreated());

        // Validate the Incripciones in the database
        List<Incripciones> incripcionesList = incripcionesRepository.findAll();
        assertThat(incripcionesList).hasSize(databaseSizeBeforeCreate + 1);
        Incripciones testIncripciones = incripcionesList.get(incripcionesList.size() - 1);
        assertThat(testIncripciones.getNombreUsuario()).isEqualTo(DEFAULT_NOMBRE_USUARIO);
        assertThat(testIncripciones.getTipoEvento()).isEqualTo(DEFAULT_TIPO_EVENTO);
        assertThat(testIncripciones.getNombreEvento()).isEqualTo(DEFAULT_NOMBRE_EVENTO);
        assertThat(testIncripciones.getFechaInscripcion()).isEqualTo(DEFAULT_FECHA_INSCRIPCION);
    }

    @Test
    @Transactional
    void createIncripcionesWithExistingId() throws Exception {
        // Create the Incripciones with an existing ID
        incripciones.setId(1L);

        int databaseSizeBeforeCreate = incripcionesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restIncripcionesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(incripciones)))
            .andExpect(status().isBadRequest());

        // Validate the Incripciones in the database
        List<Incripciones> incripcionesList = incripcionesRepository.findAll();
        assertThat(incripcionesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllIncripciones() throws Exception {
        // Initialize the database
        incripcionesRepository.saveAndFlush(incripciones);

        // Get all the incripcionesList
        restIncripcionesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(incripciones.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreUsuario").value(hasItem(DEFAULT_NOMBRE_USUARIO)))
            .andExpect(jsonPath("$.[*].tipoEvento").value(hasItem(DEFAULT_TIPO_EVENTO)))
            .andExpect(jsonPath("$.[*].nombreEvento").value(hasItem(DEFAULT_NOMBRE_EVENTO)))
            .andExpect(jsonPath("$.[*].fechaInscripcion").value(hasItem(DEFAULT_FECHA_INSCRIPCION.toString())));
    }

    @Test
    @Transactional
    void getIncripciones() throws Exception {
        // Initialize the database
        incripcionesRepository.saveAndFlush(incripciones);

        // Get the incripciones
        restIncripcionesMockMvc
            .perform(get(ENTITY_API_URL_ID, incripciones.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(incripciones.getId().intValue()))
            .andExpect(jsonPath("$.nombreUsuario").value(DEFAULT_NOMBRE_USUARIO))
            .andExpect(jsonPath("$.tipoEvento").value(DEFAULT_TIPO_EVENTO))
            .andExpect(jsonPath("$.nombreEvento").value(DEFAULT_NOMBRE_EVENTO))
            .andExpect(jsonPath("$.fechaInscripcion").value(DEFAULT_FECHA_INSCRIPCION.toString()));
    }

    @Test
    @Transactional
    void getNonExistingIncripciones() throws Exception {
        // Get the incripciones
        restIncripcionesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingIncripciones() throws Exception {
        // Initialize the database
        incripcionesRepository.saveAndFlush(incripciones);

        int databaseSizeBeforeUpdate = incripcionesRepository.findAll().size();

        // Update the incripciones
        Incripciones updatedIncripciones = incripcionesRepository.findById(incripciones.getId()).get();
        // Disconnect from session so that the updates on updatedIncripciones are not directly saved in db
        em.detach(updatedIncripciones);
        updatedIncripciones
            .nombreUsuario(UPDATED_NOMBRE_USUARIO)
            .tipoEvento(UPDATED_TIPO_EVENTO)
            .nombreEvento(UPDATED_NOMBRE_EVENTO)
            .fechaInscripcion(UPDATED_FECHA_INSCRIPCION);

        restIncripcionesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedIncripciones.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedIncripciones))
            )
            .andExpect(status().isOk());

        // Validate the Incripciones in the database
        List<Incripciones> incripcionesList = incripcionesRepository.findAll();
        assertThat(incripcionesList).hasSize(databaseSizeBeforeUpdate);
        Incripciones testIncripciones = incripcionesList.get(incripcionesList.size() - 1);
        assertThat(testIncripciones.getNombreUsuario()).isEqualTo(UPDATED_NOMBRE_USUARIO);
        assertThat(testIncripciones.getTipoEvento()).isEqualTo(UPDATED_TIPO_EVENTO);
        assertThat(testIncripciones.getNombreEvento()).isEqualTo(UPDATED_NOMBRE_EVENTO);
        assertThat(testIncripciones.getFechaInscripcion()).isEqualTo(UPDATED_FECHA_INSCRIPCION);
    }

    @Test
    @Transactional
    void putNonExistingIncripciones() throws Exception {
        int databaseSizeBeforeUpdate = incripcionesRepository.findAll().size();
        incripciones.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIncripcionesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, incripciones.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(incripciones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Incripciones in the database
        List<Incripciones> incripcionesList = incripcionesRepository.findAll();
        assertThat(incripcionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchIncripciones() throws Exception {
        int databaseSizeBeforeUpdate = incripcionesRepository.findAll().size();
        incripciones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIncripcionesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(incripciones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Incripciones in the database
        List<Incripciones> incripcionesList = incripcionesRepository.findAll();
        assertThat(incripcionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamIncripciones() throws Exception {
        int databaseSizeBeforeUpdate = incripcionesRepository.findAll().size();
        incripciones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIncripcionesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(incripciones)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Incripciones in the database
        List<Incripciones> incripcionesList = incripcionesRepository.findAll();
        assertThat(incripcionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateIncripcionesWithPatch() throws Exception {
        // Initialize the database
        incripcionesRepository.saveAndFlush(incripciones);

        int databaseSizeBeforeUpdate = incripcionesRepository.findAll().size();

        // Update the incripciones using partial update
        Incripciones partialUpdatedIncripciones = new Incripciones();
        partialUpdatedIncripciones.setId(incripciones.getId());

        partialUpdatedIncripciones.nombreEvento(UPDATED_NOMBRE_EVENTO).fechaInscripcion(UPDATED_FECHA_INSCRIPCION);

        restIncripcionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIncripciones.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIncripciones))
            )
            .andExpect(status().isOk());

        // Validate the Incripciones in the database
        List<Incripciones> incripcionesList = incripcionesRepository.findAll();
        assertThat(incripcionesList).hasSize(databaseSizeBeforeUpdate);
        Incripciones testIncripciones = incripcionesList.get(incripcionesList.size() - 1);
        assertThat(testIncripciones.getNombreUsuario()).isEqualTo(DEFAULT_NOMBRE_USUARIO);
        assertThat(testIncripciones.getTipoEvento()).isEqualTo(DEFAULT_TIPO_EVENTO);
        assertThat(testIncripciones.getNombreEvento()).isEqualTo(UPDATED_NOMBRE_EVENTO);
        assertThat(testIncripciones.getFechaInscripcion()).isEqualTo(UPDATED_FECHA_INSCRIPCION);
    }

    @Test
    @Transactional
    void fullUpdateIncripcionesWithPatch() throws Exception {
        // Initialize the database
        incripcionesRepository.saveAndFlush(incripciones);

        int databaseSizeBeforeUpdate = incripcionesRepository.findAll().size();

        // Update the incripciones using partial update
        Incripciones partialUpdatedIncripciones = new Incripciones();
        partialUpdatedIncripciones.setId(incripciones.getId());

        partialUpdatedIncripciones
            .nombreUsuario(UPDATED_NOMBRE_USUARIO)
            .tipoEvento(UPDATED_TIPO_EVENTO)
            .nombreEvento(UPDATED_NOMBRE_EVENTO)
            .fechaInscripcion(UPDATED_FECHA_INSCRIPCION);

        restIncripcionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedIncripciones.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedIncripciones))
            )
            .andExpect(status().isOk());

        // Validate the Incripciones in the database
        List<Incripciones> incripcionesList = incripcionesRepository.findAll();
        assertThat(incripcionesList).hasSize(databaseSizeBeforeUpdate);
        Incripciones testIncripciones = incripcionesList.get(incripcionesList.size() - 1);
        assertThat(testIncripciones.getNombreUsuario()).isEqualTo(UPDATED_NOMBRE_USUARIO);
        assertThat(testIncripciones.getTipoEvento()).isEqualTo(UPDATED_TIPO_EVENTO);
        assertThat(testIncripciones.getNombreEvento()).isEqualTo(UPDATED_NOMBRE_EVENTO);
        assertThat(testIncripciones.getFechaInscripcion()).isEqualTo(UPDATED_FECHA_INSCRIPCION);
    }

    @Test
    @Transactional
    void patchNonExistingIncripciones() throws Exception {
        int databaseSizeBeforeUpdate = incripcionesRepository.findAll().size();
        incripciones.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIncripcionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, incripciones.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(incripciones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Incripciones in the database
        List<Incripciones> incripcionesList = incripcionesRepository.findAll();
        assertThat(incripcionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchIncripciones() throws Exception {
        int databaseSizeBeforeUpdate = incripcionesRepository.findAll().size();
        incripciones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIncripcionesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(incripciones))
            )
            .andExpect(status().isBadRequest());

        // Validate the Incripciones in the database
        List<Incripciones> incripcionesList = incripcionesRepository.findAll();
        assertThat(incripcionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamIncripciones() throws Exception {
        int databaseSizeBeforeUpdate = incripcionesRepository.findAll().size();
        incripciones.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restIncripcionesMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(incripciones))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Incripciones in the database
        List<Incripciones> incripcionesList = incripcionesRepository.findAll();
        assertThat(incripcionesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteIncripciones() throws Exception {
        // Initialize the database
        incripcionesRepository.saveAndFlush(incripciones);

        int databaseSizeBeforeDelete = incripcionesRepository.findAll().size();

        // Delete the incripciones
        restIncripcionesMockMvc
            .perform(delete(ENTITY_API_URL_ID, incripciones.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Incripciones> incripcionesList = incripcionesRepository.findAll();
        assertThat(incripcionesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

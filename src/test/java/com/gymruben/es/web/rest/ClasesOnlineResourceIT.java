package com.gymruben.es.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.gymruben.es.IntegrationTest;
import com.gymruben.es.domain.ClasesOnline;
import com.gymruben.es.repository.ClasesOnlineRepository;
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
 * Integration tests for the {@link ClasesOnlineResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class ClasesOnlineResourceIT {

    private static final String DEFAULT_NOMBRE_CLASE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_CLASE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_HORARIO = "AAAAAAAAAA";
    private static final String UPDATED_HORARIO = "BBBBBBBBBB";

    private static final String DEFAULT_INSTRUCTOR = "AAAAAAAAAA";
    private static final String UPDATED_INSTRUCTOR = "BBBBBBBBBB";

    private static final String DEFAULT_CAPACIDAD = "AAAAAAAAAA";
    private static final String UPDATED_CAPACIDAD = "BBBBBBBBBB";

    private static final String DEFAULT_PARTICIPANTES_INSCRITOS = "AAAAAAAAAA";
    private static final String UPDATED_PARTICIPANTES_INSCRITOS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/clases-onlines";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ClasesOnlineRepository clasesOnlineRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restClasesOnlineMockMvc;

    private ClasesOnline clasesOnline;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClasesOnline createEntity(EntityManager em) {
        ClasesOnline clasesOnline = new ClasesOnline()
            .nombreClase(DEFAULT_NOMBRE_CLASE)
            .descripcion(DEFAULT_DESCRIPCION)
            .horario(DEFAULT_HORARIO)
            .instructor(DEFAULT_INSTRUCTOR)
            .capacidad(DEFAULT_CAPACIDAD)
            .participantesInscritos(DEFAULT_PARTICIPANTES_INSCRITOS);
        return clasesOnline;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClasesOnline createUpdatedEntity(EntityManager em) {
        ClasesOnline clasesOnline = new ClasesOnline()
            .nombreClase(UPDATED_NOMBRE_CLASE)
            .descripcion(UPDATED_DESCRIPCION)
            .horario(UPDATED_HORARIO)
            .instructor(UPDATED_INSTRUCTOR)
            .capacidad(UPDATED_CAPACIDAD)
            .participantesInscritos(UPDATED_PARTICIPANTES_INSCRITOS);
        return clasesOnline;
    }

    @BeforeEach
    public void initTest() {
        clasesOnline = createEntity(em);
    }

    @Test
    @Transactional
    void createClasesOnline() throws Exception {
        int databaseSizeBeforeCreate = clasesOnlineRepository.findAll().size();
        // Create the ClasesOnline
        restClasesOnlineMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(clasesOnline)))
            .andExpect(status().isCreated());

        // Validate the ClasesOnline in the database
        List<ClasesOnline> clasesOnlineList = clasesOnlineRepository.findAll();
        assertThat(clasesOnlineList).hasSize(databaseSizeBeforeCreate + 1);
        ClasesOnline testClasesOnline = clasesOnlineList.get(clasesOnlineList.size() - 1);
        assertThat(testClasesOnline.getNombreClase()).isEqualTo(DEFAULT_NOMBRE_CLASE);
        assertThat(testClasesOnline.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testClasesOnline.getHorario()).isEqualTo(DEFAULT_HORARIO);
        assertThat(testClasesOnline.getInstructor()).isEqualTo(DEFAULT_INSTRUCTOR);
        assertThat(testClasesOnline.getCapacidad()).isEqualTo(DEFAULT_CAPACIDAD);
        assertThat(testClasesOnline.getParticipantesInscritos()).isEqualTo(DEFAULT_PARTICIPANTES_INSCRITOS);
    }

    @Test
    @Transactional
    void createClasesOnlineWithExistingId() throws Exception {
        // Create the ClasesOnline with an existing ID
        clasesOnline.setId(1L);

        int databaseSizeBeforeCreate = clasesOnlineRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restClasesOnlineMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(clasesOnline)))
            .andExpect(status().isBadRequest());

        // Validate the ClasesOnline in the database
        List<ClasesOnline> clasesOnlineList = clasesOnlineRepository.findAll();
        assertThat(clasesOnlineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllClasesOnlines() throws Exception {
        // Initialize the database
        clasesOnlineRepository.saveAndFlush(clasesOnline);

        // Get all the clasesOnlineList
        restClasesOnlineMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clasesOnline.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreClase").value(hasItem(DEFAULT_NOMBRE_CLASE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].horario").value(hasItem(DEFAULT_HORARIO)))
            .andExpect(jsonPath("$.[*].instructor").value(hasItem(DEFAULT_INSTRUCTOR)))
            .andExpect(jsonPath("$.[*].capacidad").value(hasItem(DEFAULT_CAPACIDAD)))
            .andExpect(jsonPath("$.[*].participantesInscritos").value(hasItem(DEFAULT_PARTICIPANTES_INSCRITOS)));
    }

    @Test
    @Transactional
    void getClasesOnline() throws Exception {
        // Initialize the database
        clasesOnlineRepository.saveAndFlush(clasesOnline);

        // Get the clasesOnline
        restClasesOnlineMockMvc
            .perform(get(ENTITY_API_URL_ID, clasesOnline.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(clasesOnline.getId().intValue()))
            .andExpect(jsonPath("$.nombreClase").value(DEFAULT_NOMBRE_CLASE))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.horario").value(DEFAULT_HORARIO))
            .andExpect(jsonPath("$.instructor").value(DEFAULT_INSTRUCTOR))
            .andExpect(jsonPath("$.capacidad").value(DEFAULT_CAPACIDAD))
            .andExpect(jsonPath("$.participantesInscritos").value(DEFAULT_PARTICIPANTES_INSCRITOS));
    }

    @Test
    @Transactional
    void getNonExistingClasesOnline() throws Exception {
        // Get the clasesOnline
        restClasesOnlineMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingClasesOnline() throws Exception {
        // Initialize the database
        clasesOnlineRepository.saveAndFlush(clasesOnline);

        int databaseSizeBeforeUpdate = clasesOnlineRepository.findAll().size();

        // Update the clasesOnline
        ClasesOnline updatedClasesOnline = clasesOnlineRepository.findById(clasesOnline.getId()).get();
        // Disconnect from session so that the updates on updatedClasesOnline are not directly saved in db
        em.detach(updatedClasesOnline);
        updatedClasesOnline
            .nombreClase(UPDATED_NOMBRE_CLASE)
            .descripcion(UPDATED_DESCRIPCION)
            .horario(UPDATED_HORARIO)
            .instructor(UPDATED_INSTRUCTOR)
            .capacidad(UPDATED_CAPACIDAD)
            .participantesInscritos(UPDATED_PARTICIPANTES_INSCRITOS);

        restClasesOnlineMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedClasesOnline.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedClasesOnline))
            )
            .andExpect(status().isOk());

        // Validate the ClasesOnline in the database
        List<ClasesOnline> clasesOnlineList = clasesOnlineRepository.findAll();
        assertThat(clasesOnlineList).hasSize(databaseSizeBeforeUpdate);
        ClasesOnline testClasesOnline = clasesOnlineList.get(clasesOnlineList.size() - 1);
        assertThat(testClasesOnline.getNombreClase()).isEqualTo(UPDATED_NOMBRE_CLASE);
        assertThat(testClasesOnline.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testClasesOnline.getHorario()).isEqualTo(UPDATED_HORARIO);
        assertThat(testClasesOnline.getInstructor()).isEqualTo(UPDATED_INSTRUCTOR);
        assertThat(testClasesOnline.getCapacidad()).isEqualTo(UPDATED_CAPACIDAD);
        assertThat(testClasesOnline.getParticipantesInscritos()).isEqualTo(UPDATED_PARTICIPANTES_INSCRITOS);
    }

    @Test
    @Transactional
    void putNonExistingClasesOnline() throws Exception {
        int databaseSizeBeforeUpdate = clasesOnlineRepository.findAll().size();
        clasesOnline.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClasesOnlineMockMvc
            .perform(
                put(ENTITY_API_URL_ID, clasesOnline.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(clasesOnline))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClasesOnline in the database
        List<ClasesOnline> clasesOnlineList = clasesOnlineRepository.findAll();
        assertThat(clasesOnlineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchClasesOnline() throws Exception {
        int databaseSizeBeforeUpdate = clasesOnlineRepository.findAll().size();
        clasesOnline.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClasesOnlineMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(clasesOnline))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClasesOnline in the database
        List<ClasesOnline> clasesOnlineList = clasesOnlineRepository.findAll();
        assertThat(clasesOnlineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamClasesOnline() throws Exception {
        int databaseSizeBeforeUpdate = clasesOnlineRepository.findAll().size();
        clasesOnline.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClasesOnlineMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(clasesOnline)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the ClasesOnline in the database
        List<ClasesOnline> clasesOnlineList = clasesOnlineRepository.findAll();
        assertThat(clasesOnlineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateClasesOnlineWithPatch() throws Exception {
        // Initialize the database
        clasesOnlineRepository.saveAndFlush(clasesOnline);

        int databaseSizeBeforeUpdate = clasesOnlineRepository.findAll().size();

        // Update the clasesOnline using partial update
        ClasesOnline partialUpdatedClasesOnline = new ClasesOnline();
        partialUpdatedClasesOnline.setId(clasesOnline.getId());

        partialUpdatedClasesOnline
            .descripcion(UPDATED_DESCRIPCION)
            .capacidad(UPDATED_CAPACIDAD)
            .participantesInscritos(UPDATED_PARTICIPANTES_INSCRITOS);

        restClasesOnlineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClasesOnline.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedClasesOnline))
            )
            .andExpect(status().isOk());

        // Validate the ClasesOnline in the database
        List<ClasesOnline> clasesOnlineList = clasesOnlineRepository.findAll();
        assertThat(clasesOnlineList).hasSize(databaseSizeBeforeUpdate);
        ClasesOnline testClasesOnline = clasesOnlineList.get(clasesOnlineList.size() - 1);
        assertThat(testClasesOnline.getNombreClase()).isEqualTo(DEFAULT_NOMBRE_CLASE);
        assertThat(testClasesOnline.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testClasesOnline.getHorario()).isEqualTo(DEFAULT_HORARIO);
        assertThat(testClasesOnline.getInstructor()).isEqualTo(DEFAULT_INSTRUCTOR);
        assertThat(testClasesOnline.getCapacidad()).isEqualTo(UPDATED_CAPACIDAD);
        assertThat(testClasesOnline.getParticipantesInscritos()).isEqualTo(UPDATED_PARTICIPANTES_INSCRITOS);
    }

    @Test
    @Transactional
    void fullUpdateClasesOnlineWithPatch() throws Exception {
        // Initialize the database
        clasesOnlineRepository.saveAndFlush(clasesOnline);

        int databaseSizeBeforeUpdate = clasesOnlineRepository.findAll().size();

        // Update the clasesOnline using partial update
        ClasesOnline partialUpdatedClasesOnline = new ClasesOnline();
        partialUpdatedClasesOnline.setId(clasesOnline.getId());

        partialUpdatedClasesOnline
            .nombreClase(UPDATED_NOMBRE_CLASE)
            .descripcion(UPDATED_DESCRIPCION)
            .horario(UPDATED_HORARIO)
            .instructor(UPDATED_INSTRUCTOR)
            .capacidad(UPDATED_CAPACIDAD)
            .participantesInscritos(UPDATED_PARTICIPANTES_INSCRITOS);

        restClasesOnlineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedClasesOnline.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedClasesOnline))
            )
            .andExpect(status().isOk());

        // Validate the ClasesOnline in the database
        List<ClasesOnline> clasesOnlineList = clasesOnlineRepository.findAll();
        assertThat(clasesOnlineList).hasSize(databaseSizeBeforeUpdate);
        ClasesOnline testClasesOnline = clasesOnlineList.get(clasesOnlineList.size() - 1);
        assertThat(testClasesOnline.getNombreClase()).isEqualTo(UPDATED_NOMBRE_CLASE);
        assertThat(testClasesOnline.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testClasesOnline.getHorario()).isEqualTo(UPDATED_HORARIO);
        assertThat(testClasesOnline.getInstructor()).isEqualTo(UPDATED_INSTRUCTOR);
        assertThat(testClasesOnline.getCapacidad()).isEqualTo(UPDATED_CAPACIDAD);
        assertThat(testClasesOnline.getParticipantesInscritos()).isEqualTo(UPDATED_PARTICIPANTES_INSCRITOS);
    }

    @Test
    @Transactional
    void patchNonExistingClasesOnline() throws Exception {
        int databaseSizeBeforeUpdate = clasesOnlineRepository.findAll().size();
        clasesOnline.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClasesOnlineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, clasesOnline.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(clasesOnline))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClasesOnline in the database
        List<ClasesOnline> clasesOnlineList = clasesOnlineRepository.findAll();
        assertThat(clasesOnlineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchClasesOnline() throws Exception {
        int databaseSizeBeforeUpdate = clasesOnlineRepository.findAll().size();
        clasesOnline.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClasesOnlineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(clasesOnline))
            )
            .andExpect(status().isBadRequest());

        // Validate the ClasesOnline in the database
        List<ClasesOnline> clasesOnlineList = clasesOnlineRepository.findAll();
        assertThat(clasesOnlineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamClasesOnline() throws Exception {
        int databaseSizeBeforeUpdate = clasesOnlineRepository.findAll().size();
        clasesOnline.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restClasesOnlineMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(clasesOnline))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the ClasesOnline in the database
        List<ClasesOnline> clasesOnlineList = clasesOnlineRepository.findAll();
        assertThat(clasesOnlineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteClasesOnline() throws Exception {
        // Initialize the database
        clasesOnlineRepository.saveAndFlush(clasesOnline);

        int databaseSizeBeforeDelete = clasesOnlineRepository.findAll().size();

        // Delete the clasesOnline
        restClasesOnlineMockMvc
            .perform(delete(ENTITY_API_URL_ID, clasesOnline.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ClasesOnline> clasesOnlineList = clasesOnlineRepository.findAll();
        assertThat(clasesOnlineList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

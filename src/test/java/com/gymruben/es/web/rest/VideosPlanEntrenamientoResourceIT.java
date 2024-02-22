package com.gymruben.es.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.gymruben.es.IntegrationTest;
import com.gymruben.es.domain.VideosPlanEntrenamiento;
import com.gymruben.es.repository.VideosPlanEntrenamientoRepository;
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
 * Integration tests for the {@link VideosPlanEntrenamientoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VideosPlanEntrenamientoResourceIT {

    private static final String DEFAULT_TITULO_VIDEO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO_VIDEO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION_VIDEO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION_VIDEO = "BBBBBBBBBB";

    private static final String DEFAULT_URL_VIDEO = "AAAAAAAAAA";
    private static final String UPDATED_URL_VIDEO = "BBBBBBBBBB";

    private static final Long DEFAULT_DURACION = 1L;
    private static final Long UPDATED_DURACION = 2L;

    private static final Instant DEFAULT_FECHA_PUBLICACION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_FECHA_PUBLICACION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/videos-plan-entrenamientos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VideosPlanEntrenamientoRepository videosPlanEntrenamientoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVideosPlanEntrenamientoMockMvc;

    private VideosPlanEntrenamiento videosPlanEntrenamiento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VideosPlanEntrenamiento createEntity(EntityManager em) {
        VideosPlanEntrenamiento videosPlanEntrenamiento = new VideosPlanEntrenamiento()
            .tituloVideo(DEFAULT_TITULO_VIDEO)
            .descripcionVideo(DEFAULT_DESCRIPCION_VIDEO)
            .urlVideo(DEFAULT_URL_VIDEO)
            .duracion(DEFAULT_DURACION)
            .fechaPublicacion(DEFAULT_FECHA_PUBLICACION);
        return videosPlanEntrenamiento;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VideosPlanEntrenamiento createUpdatedEntity(EntityManager em) {
        VideosPlanEntrenamiento videosPlanEntrenamiento = new VideosPlanEntrenamiento()
            .tituloVideo(UPDATED_TITULO_VIDEO)
            .descripcionVideo(UPDATED_DESCRIPCION_VIDEO)
            .urlVideo(UPDATED_URL_VIDEO)
            .duracion(UPDATED_DURACION)
            .fechaPublicacion(UPDATED_FECHA_PUBLICACION);
        return videosPlanEntrenamiento;
    }

    @BeforeEach
    public void initTest() {
        videosPlanEntrenamiento = createEntity(em);
    }

    @Test
    @Transactional
    void createVideosPlanEntrenamiento() throws Exception {
        int databaseSizeBeforeCreate = videosPlanEntrenamientoRepository.findAll().size();
        // Create the VideosPlanEntrenamiento
        restVideosPlanEntrenamientoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(videosPlanEntrenamiento))
            )
            .andExpect(status().isCreated());

        // Validate the VideosPlanEntrenamiento in the database
        List<VideosPlanEntrenamiento> videosPlanEntrenamientoList = videosPlanEntrenamientoRepository.findAll();
        assertThat(videosPlanEntrenamientoList).hasSize(databaseSizeBeforeCreate + 1);
        VideosPlanEntrenamiento testVideosPlanEntrenamiento = videosPlanEntrenamientoList.get(videosPlanEntrenamientoList.size() - 1);
        assertThat(testVideosPlanEntrenamiento.getTituloVideo()).isEqualTo(DEFAULT_TITULO_VIDEO);
        assertThat(testVideosPlanEntrenamiento.getDescripcionVideo()).isEqualTo(DEFAULT_DESCRIPCION_VIDEO);
        assertThat(testVideosPlanEntrenamiento.getUrlVideo()).isEqualTo(DEFAULT_URL_VIDEO);
        assertThat(testVideosPlanEntrenamiento.getDuracion()).isEqualTo(DEFAULT_DURACION);
        assertThat(testVideosPlanEntrenamiento.getFechaPublicacion()).isEqualTo(DEFAULT_FECHA_PUBLICACION);
    }

    @Test
    @Transactional
    void createVideosPlanEntrenamientoWithExistingId() throws Exception {
        // Create the VideosPlanEntrenamiento with an existing ID
        videosPlanEntrenamiento.setId(1L);

        int databaseSizeBeforeCreate = videosPlanEntrenamientoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVideosPlanEntrenamientoMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(videosPlanEntrenamiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the VideosPlanEntrenamiento in the database
        List<VideosPlanEntrenamiento> videosPlanEntrenamientoList = videosPlanEntrenamientoRepository.findAll();
        assertThat(videosPlanEntrenamientoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllVideosPlanEntrenamientos() throws Exception {
        // Initialize the database
        videosPlanEntrenamientoRepository.saveAndFlush(videosPlanEntrenamiento);

        // Get all the videosPlanEntrenamientoList
        restVideosPlanEntrenamientoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(videosPlanEntrenamiento.getId().intValue())))
            .andExpect(jsonPath("$.[*].tituloVideo").value(hasItem(DEFAULT_TITULO_VIDEO)))
            .andExpect(jsonPath("$.[*].descripcionVideo").value(hasItem(DEFAULT_DESCRIPCION_VIDEO)))
            .andExpect(jsonPath("$.[*].urlVideo").value(hasItem(DEFAULT_URL_VIDEO)))
            .andExpect(jsonPath("$.[*].duracion").value(hasItem(DEFAULT_DURACION.intValue())))
            .andExpect(jsonPath("$.[*].fechaPublicacion").value(hasItem(DEFAULT_FECHA_PUBLICACION.toString())));
    }

    @Test
    @Transactional
    void getVideosPlanEntrenamiento() throws Exception {
        // Initialize the database
        videosPlanEntrenamientoRepository.saveAndFlush(videosPlanEntrenamiento);

        // Get the videosPlanEntrenamiento
        restVideosPlanEntrenamientoMockMvc
            .perform(get(ENTITY_API_URL_ID, videosPlanEntrenamiento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(videosPlanEntrenamiento.getId().intValue()))
            .andExpect(jsonPath("$.tituloVideo").value(DEFAULT_TITULO_VIDEO))
            .andExpect(jsonPath("$.descripcionVideo").value(DEFAULT_DESCRIPCION_VIDEO))
            .andExpect(jsonPath("$.urlVideo").value(DEFAULT_URL_VIDEO))
            .andExpect(jsonPath("$.duracion").value(DEFAULT_DURACION.intValue()))
            .andExpect(jsonPath("$.fechaPublicacion").value(DEFAULT_FECHA_PUBLICACION.toString()));
    }

    @Test
    @Transactional
    void getNonExistingVideosPlanEntrenamiento() throws Exception {
        // Get the videosPlanEntrenamiento
        restVideosPlanEntrenamientoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingVideosPlanEntrenamiento() throws Exception {
        // Initialize the database
        videosPlanEntrenamientoRepository.saveAndFlush(videosPlanEntrenamiento);

        int databaseSizeBeforeUpdate = videosPlanEntrenamientoRepository.findAll().size();

        // Update the videosPlanEntrenamiento
        VideosPlanEntrenamiento updatedVideosPlanEntrenamiento = videosPlanEntrenamientoRepository
            .findById(videosPlanEntrenamiento.getId())
            .get();
        // Disconnect from session so that the updates on updatedVideosPlanEntrenamiento are not directly saved in db
        em.detach(updatedVideosPlanEntrenamiento);
        updatedVideosPlanEntrenamiento
            .tituloVideo(UPDATED_TITULO_VIDEO)
            .descripcionVideo(UPDATED_DESCRIPCION_VIDEO)
            .urlVideo(UPDATED_URL_VIDEO)
            .duracion(UPDATED_DURACION)
            .fechaPublicacion(UPDATED_FECHA_PUBLICACION);

        restVideosPlanEntrenamientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVideosPlanEntrenamiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedVideosPlanEntrenamiento))
            )
            .andExpect(status().isOk());

        // Validate the VideosPlanEntrenamiento in the database
        List<VideosPlanEntrenamiento> videosPlanEntrenamientoList = videosPlanEntrenamientoRepository.findAll();
        assertThat(videosPlanEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
        VideosPlanEntrenamiento testVideosPlanEntrenamiento = videosPlanEntrenamientoList.get(videosPlanEntrenamientoList.size() - 1);
        assertThat(testVideosPlanEntrenamiento.getTituloVideo()).isEqualTo(UPDATED_TITULO_VIDEO);
        assertThat(testVideosPlanEntrenamiento.getDescripcionVideo()).isEqualTo(UPDATED_DESCRIPCION_VIDEO);
        assertThat(testVideosPlanEntrenamiento.getUrlVideo()).isEqualTo(UPDATED_URL_VIDEO);
        assertThat(testVideosPlanEntrenamiento.getDuracion()).isEqualTo(UPDATED_DURACION);
        assertThat(testVideosPlanEntrenamiento.getFechaPublicacion()).isEqualTo(UPDATED_FECHA_PUBLICACION);
    }

    @Test
    @Transactional
    void putNonExistingVideosPlanEntrenamiento() throws Exception {
        int databaseSizeBeforeUpdate = videosPlanEntrenamientoRepository.findAll().size();
        videosPlanEntrenamiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVideosPlanEntrenamientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, videosPlanEntrenamiento.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(videosPlanEntrenamiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the VideosPlanEntrenamiento in the database
        List<VideosPlanEntrenamiento> videosPlanEntrenamientoList = videosPlanEntrenamientoRepository.findAll();
        assertThat(videosPlanEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVideosPlanEntrenamiento() throws Exception {
        int databaseSizeBeforeUpdate = videosPlanEntrenamientoRepository.findAll().size();
        videosPlanEntrenamiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVideosPlanEntrenamientoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(videosPlanEntrenamiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the VideosPlanEntrenamiento in the database
        List<VideosPlanEntrenamiento> videosPlanEntrenamientoList = videosPlanEntrenamientoRepository.findAll();
        assertThat(videosPlanEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVideosPlanEntrenamiento() throws Exception {
        int databaseSizeBeforeUpdate = videosPlanEntrenamientoRepository.findAll().size();
        videosPlanEntrenamiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVideosPlanEntrenamientoMockMvc
            .perform(
                put(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(videosPlanEntrenamiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VideosPlanEntrenamiento in the database
        List<VideosPlanEntrenamiento> videosPlanEntrenamientoList = videosPlanEntrenamientoRepository.findAll();
        assertThat(videosPlanEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVideosPlanEntrenamientoWithPatch() throws Exception {
        // Initialize the database
        videosPlanEntrenamientoRepository.saveAndFlush(videosPlanEntrenamiento);

        int databaseSizeBeforeUpdate = videosPlanEntrenamientoRepository.findAll().size();

        // Update the videosPlanEntrenamiento using partial update
        VideosPlanEntrenamiento partialUpdatedVideosPlanEntrenamiento = new VideosPlanEntrenamiento();
        partialUpdatedVideosPlanEntrenamiento.setId(videosPlanEntrenamiento.getId());

        partialUpdatedVideosPlanEntrenamiento.urlVideo(UPDATED_URL_VIDEO).fechaPublicacion(UPDATED_FECHA_PUBLICACION);

        restVideosPlanEntrenamientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVideosPlanEntrenamiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVideosPlanEntrenamiento))
            )
            .andExpect(status().isOk());

        // Validate the VideosPlanEntrenamiento in the database
        List<VideosPlanEntrenamiento> videosPlanEntrenamientoList = videosPlanEntrenamientoRepository.findAll();
        assertThat(videosPlanEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
        VideosPlanEntrenamiento testVideosPlanEntrenamiento = videosPlanEntrenamientoList.get(videosPlanEntrenamientoList.size() - 1);
        assertThat(testVideosPlanEntrenamiento.getTituloVideo()).isEqualTo(DEFAULT_TITULO_VIDEO);
        assertThat(testVideosPlanEntrenamiento.getDescripcionVideo()).isEqualTo(DEFAULT_DESCRIPCION_VIDEO);
        assertThat(testVideosPlanEntrenamiento.getUrlVideo()).isEqualTo(UPDATED_URL_VIDEO);
        assertThat(testVideosPlanEntrenamiento.getDuracion()).isEqualTo(DEFAULT_DURACION);
        assertThat(testVideosPlanEntrenamiento.getFechaPublicacion()).isEqualTo(UPDATED_FECHA_PUBLICACION);
    }

    @Test
    @Transactional
    void fullUpdateVideosPlanEntrenamientoWithPatch() throws Exception {
        // Initialize the database
        videosPlanEntrenamientoRepository.saveAndFlush(videosPlanEntrenamiento);

        int databaseSizeBeforeUpdate = videosPlanEntrenamientoRepository.findAll().size();

        // Update the videosPlanEntrenamiento using partial update
        VideosPlanEntrenamiento partialUpdatedVideosPlanEntrenamiento = new VideosPlanEntrenamiento();
        partialUpdatedVideosPlanEntrenamiento.setId(videosPlanEntrenamiento.getId());

        partialUpdatedVideosPlanEntrenamiento
            .tituloVideo(UPDATED_TITULO_VIDEO)
            .descripcionVideo(UPDATED_DESCRIPCION_VIDEO)
            .urlVideo(UPDATED_URL_VIDEO)
            .duracion(UPDATED_DURACION)
            .fechaPublicacion(UPDATED_FECHA_PUBLICACION);

        restVideosPlanEntrenamientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVideosPlanEntrenamiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVideosPlanEntrenamiento))
            )
            .andExpect(status().isOk());

        // Validate the VideosPlanEntrenamiento in the database
        List<VideosPlanEntrenamiento> videosPlanEntrenamientoList = videosPlanEntrenamientoRepository.findAll();
        assertThat(videosPlanEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
        VideosPlanEntrenamiento testVideosPlanEntrenamiento = videosPlanEntrenamientoList.get(videosPlanEntrenamientoList.size() - 1);
        assertThat(testVideosPlanEntrenamiento.getTituloVideo()).isEqualTo(UPDATED_TITULO_VIDEO);
        assertThat(testVideosPlanEntrenamiento.getDescripcionVideo()).isEqualTo(UPDATED_DESCRIPCION_VIDEO);
        assertThat(testVideosPlanEntrenamiento.getUrlVideo()).isEqualTo(UPDATED_URL_VIDEO);
        assertThat(testVideosPlanEntrenamiento.getDuracion()).isEqualTo(UPDATED_DURACION);
        assertThat(testVideosPlanEntrenamiento.getFechaPublicacion()).isEqualTo(UPDATED_FECHA_PUBLICACION);
    }

    @Test
    @Transactional
    void patchNonExistingVideosPlanEntrenamiento() throws Exception {
        int databaseSizeBeforeUpdate = videosPlanEntrenamientoRepository.findAll().size();
        videosPlanEntrenamiento.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVideosPlanEntrenamientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, videosPlanEntrenamiento.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(videosPlanEntrenamiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the VideosPlanEntrenamiento in the database
        List<VideosPlanEntrenamiento> videosPlanEntrenamientoList = videosPlanEntrenamientoRepository.findAll();
        assertThat(videosPlanEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVideosPlanEntrenamiento() throws Exception {
        int databaseSizeBeforeUpdate = videosPlanEntrenamientoRepository.findAll().size();
        videosPlanEntrenamiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVideosPlanEntrenamientoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(videosPlanEntrenamiento))
            )
            .andExpect(status().isBadRequest());

        // Validate the VideosPlanEntrenamiento in the database
        List<VideosPlanEntrenamiento> videosPlanEntrenamientoList = videosPlanEntrenamientoRepository.findAll();
        assertThat(videosPlanEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVideosPlanEntrenamiento() throws Exception {
        int databaseSizeBeforeUpdate = videosPlanEntrenamientoRepository.findAll().size();
        videosPlanEntrenamiento.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVideosPlanEntrenamientoMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(videosPlanEntrenamiento))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VideosPlanEntrenamiento in the database
        List<VideosPlanEntrenamiento> videosPlanEntrenamientoList = videosPlanEntrenamientoRepository.findAll();
        assertThat(videosPlanEntrenamientoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVideosPlanEntrenamiento() throws Exception {
        // Initialize the database
        videosPlanEntrenamientoRepository.saveAndFlush(videosPlanEntrenamiento);

        int databaseSizeBeforeDelete = videosPlanEntrenamientoRepository.findAll().size();

        // Delete the videosPlanEntrenamiento
        restVideosPlanEntrenamientoMockMvc
            .perform(delete(ENTITY_API_URL_ID, videosPlanEntrenamiento.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VideosPlanEntrenamiento> videosPlanEntrenamientoList = videosPlanEntrenamientoRepository.findAll();
        assertThat(videosPlanEntrenamientoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

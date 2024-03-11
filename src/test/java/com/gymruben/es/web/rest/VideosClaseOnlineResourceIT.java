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
import com.gymruben.es.domain.VideosClaseOnline;
import com.gymruben.es.repository.VideosClaseOnlineRepository;

/**
 * Integration tests for the {@link VideosClaseOnlineResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VideosClaseOnlineResourceIT {

    private static final String DEFAULT_TITULO_VIDEO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO_VIDEO = "BBBBBBBBBB";



    private static final String DEFAULT_URL_VIDEO = "AAAAAAAAAA";
    private static final String UPDATED_URL_VIDEO = "BBBBBBBBBB";


    private static final String ENTITY_API_URL = "/api/videos-clase-onlines";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VideosClaseOnlineRepository videosClaseOnlineRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVideosClaseOnlineMockMvc;

    private VideosClaseOnline videosClaseOnline;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VideosClaseOnline createEntity(EntityManager em) {
        VideosClaseOnline videosClaseOnline = new VideosClaseOnline()
            .tituloVideo(DEFAULT_TITULO_VIDEO)
            .urlVideo(DEFAULT_URL_VIDEO);

        return videosClaseOnline;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VideosClaseOnline createUpdatedEntity(EntityManager em) {
        VideosClaseOnline videosClaseOnline = new VideosClaseOnline()
            .tituloVideo(UPDATED_TITULO_VIDEO)
            .urlVideo(UPDATED_URL_VIDEO);
        return videosClaseOnline;
    }

    @BeforeEach
    public void initTest() {
        videosClaseOnline = createEntity(em);
    }

    @Test
    @Transactional
    void createVideosClaseOnline() throws Exception {
        int databaseSizeBeforeCreate = videosClaseOnlineRepository.findAll().size();
        // Create the VideosClaseOnline
        restVideosClaseOnlineMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(videosClaseOnline))
            )
            .andExpect(status().isCreated());

        // Validate the VideosClaseOnline in the database
        List<VideosClaseOnline> videosClaseOnlineList = videosClaseOnlineRepository.findAll();
        assertThat(videosClaseOnlineList).hasSize(databaseSizeBeforeCreate + 1);
        VideosClaseOnline testVideosClaseOnline = videosClaseOnlineList.get(videosClaseOnlineList.size() - 1);
        assertThat(testVideosClaseOnline.getTituloVideo()).isEqualTo(DEFAULT_TITULO_VIDEO); 
        assertThat(testVideosClaseOnline.getUrlVideo()).isEqualTo(DEFAULT_URL_VIDEO);
       
    }

    @Test
    @Transactional
    void createVideosClaseOnlineWithExistingId() throws Exception {
        // Create the VideosClaseOnline with an existing ID
        videosClaseOnline.setId(1L);

        int databaseSizeBeforeCreate = videosClaseOnlineRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVideosClaseOnlineMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(videosClaseOnline))
            )
            .andExpect(status().isBadRequest());

        // Validate the VideosClaseOnline in the database
        List<VideosClaseOnline> videosClaseOnlineList = videosClaseOnlineRepository.findAll();
        assertThat(videosClaseOnlineList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllVideosClaseOnlines() throws Exception {
        // Initialize the database
        videosClaseOnlineRepository.saveAndFlush(videosClaseOnline);

        // Get all the videosClaseOnlineList
        restVideosClaseOnlineMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(videosClaseOnline.getId().intValue())))
            .andExpect(jsonPath("$.[*].tituloVideo").value(hasItem(DEFAULT_TITULO_VIDEO)))
            .andExpect(jsonPath("$.[*].urlVideo").value(hasItem(DEFAULT_URL_VIDEO)));

    }

    @Test
    @Transactional
    void getVideosClaseOnline() throws Exception {
        // Initialize the database
        videosClaseOnlineRepository.saveAndFlush(videosClaseOnline);

        // Get the videosClaseOnline
        restVideosClaseOnlineMockMvc
            .perform(get(ENTITY_API_URL_ID, videosClaseOnline.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(videosClaseOnline.getId().intValue()))
            .andExpect(jsonPath("$.tituloVideo").value(DEFAULT_TITULO_VIDEO))
            .andExpect(jsonPath("$.urlVideo").value(DEFAULT_URL_VIDEO));
    }

    @Test
    @Transactional
    void getNonExistingVideosClaseOnline() throws Exception {
        // Get the videosClaseOnline
        restVideosClaseOnlineMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingVideosClaseOnline() throws Exception {
        // Initialize the database
        videosClaseOnlineRepository.saveAndFlush(videosClaseOnline);

        int databaseSizeBeforeUpdate = videosClaseOnlineRepository.findAll().size();

        // Update the videosClaseOnline
        VideosClaseOnline updatedVideosClaseOnline = videosClaseOnlineRepository.findById(videosClaseOnline.getId()).get();
        // Disconnect from session so that the updates on updatedVideosClaseOnline are not directly saved in db
        em.detach(updatedVideosClaseOnline);
        updatedVideosClaseOnline
            .tituloVideo(UPDATED_TITULO_VIDEO)
            .urlVideo(UPDATED_URL_VIDEO);

        restVideosClaseOnlineMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVideosClaseOnline.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedVideosClaseOnline))
            )
            .andExpect(status().isOk());

        // Validate the VideosClaseOnline in the database
        List<VideosClaseOnline> videosClaseOnlineList = videosClaseOnlineRepository.findAll();
        assertThat(videosClaseOnlineList).hasSize(databaseSizeBeforeUpdate);
        VideosClaseOnline testVideosClaseOnline = videosClaseOnlineList.get(videosClaseOnlineList.size() - 1);
        assertThat(testVideosClaseOnline.getTituloVideo()).isEqualTo(UPDATED_TITULO_VIDEO);
        assertThat(testVideosClaseOnline.getUrlVideo()).isEqualTo(UPDATED_URL_VIDEO);
    }

    @Test
    @Transactional
    void putNonExistingVideosClaseOnline() throws Exception {
        int databaseSizeBeforeUpdate = videosClaseOnlineRepository.findAll().size();
        videosClaseOnline.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVideosClaseOnlineMockMvc
            .perform(
                put(ENTITY_API_URL_ID, videosClaseOnline.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(videosClaseOnline))
            )
            .andExpect(status().isBadRequest());

        // Validate the VideosClaseOnline in the database
        List<VideosClaseOnline> videosClaseOnlineList = videosClaseOnlineRepository.findAll();
        assertThat(videosClaseOnlineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVideosClaseOnline() throws Exception {
        int databaseSizeBeforeUpdate = videosClaseOnlineRepository.findAll().size();
        videosClaseOnline.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVideosClaseOnlineMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(videosClaseOnline))
            )
            .andExpect(status().isBadRequest());

        // Validate the VideosClaseOnline in the database
        List<VideosClaseOnline> videosClaseOnlineList = videosClaseOnlineRepository.findAll();
        assertThat(videosClaseOnlineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVideosClaseOnline() throws Exception {
        int databaseSizeBeforeUpdate = videosClaseOnlineRepository.findAll().size();
        videosClaseOnline.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVideosClaseOnlineMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(videosClaseOnline))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VideosClaseOnline in the database
        List<VideosClaseOnline> videosClaseOnlineList = videosClaseOnlineRepository.findAll();
        assertThat(videosClaseOnlineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVideosClaseOnlineWithPatch() throws Exception {
        // Initialize the database
        videosClaseOnlineRepository.saveAndFlush(videosClaseOnline);

        int databaseSizeBeforeUpdate = videosClaseOnlineRepository.findAll().size();

        // Update the videosClaseOnline using partial update
        VideosClaseOnline partialUpdatedVideosClaseOnline = new VideosClaseOnline();
        partialUpdatedVideosClaseOnline.setId(videosClaseOnline.getId());


        restVideosClaseOnlineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVideosClaseOnline.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVideosClaseOnline))
            )
            .andExpect(status().isOk());

        // Validate the VideosClaseOnline in the database
        List<VideosClaseOnline> videosClaseOnlineList = videosClaseOnlineRepository.findAll();
        assertThat(videosClaseOnlineList).hasSize(databaseSizeBeforeUpdate);
        VideosClaseOnline testVideosClaseOnline = videosClaseOnlineList.get(videosClaseOnlineList.size() - 1);
        assertThat(testVideosClaseOnline.getTituloVideo()).isEqualTo(DEFAULT_TITULO_VIDEO);      
        assertThat(testVideosClaseOnline.getUrlVideo()).isEqualTo(DEFAULT_URL_VIDEO);

    }

    @Test
    @Transactional
    void fullUpdateVideosClaseOnlineWithPatch() throws Exception {
        // Initialize the database
        videosClaseOnlineRepository.saveAndFlush(videosClaseOnline);

        int databaseSizeBeforeUpdate = videosClaseOnlineRepository.findAll().size();

        // Update the videosClaseOnline using partial update
        VideosClaseOnline partialUpdatedVideosClaseOnline = new VideosClaseOnline();
        partialUpdatedVideosClaseOnline.setId(videosClaseOnline.getId());

        partialUpdatedVideosClaseOnline
            .tituloVideo(UPDATED_TITULO_VIDEO)
            .urlVideo(UPDATED_URL_VIDEO);

        restVideosClaseOnlineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVideosClaseOnline.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVideosClaseOnline))
            )
            .andExpect(status().isOk());

        // Validate the VideosClaseOnline in the database
        List<VideosClaseOnline> videosClaseOnlineList = videosClaseOnlineRepository.findAll();
        assertThat(videosClaseOnlineList).hasSize(databaseSizeBeforeUpdate);
        VideosClaseOnline testVideosClaseOnline = videosClaseOnlineList.get(videosClaseOnlineList.size() - 1);
        assertThat(testVideosClaseOnline.getTituloVideo()).isEqualTo(UPDATED_TITULO_VIDEO);    
        assertThat(testVideosClaseOnline.getUrlVideo()).isEqualTo(UPDATED_URL_VIDEO);
    }

    @Test
    @Transactional
    void patchNonExistingVideosClaseOnline() throws Exception {
        int databaseSizeBeforeUpdate = videosClaseOnlineRepository.findAll().size();
        videosClaseOnline.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVideosClaseOnlineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, videosClaseOnline.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(videosClaseOnline))
            )
            .andExpect(status().isBadRequest());

        // Validate the VideosClaseOnline in the database
        List<VideosClaseOnline> videosClaseOnlineList = videosClaseOnlineRepository.findAll();
        assertThat(videosClaseOnlineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVideosClaseOnline() throws Exception {
        int databaseSizeBeforeUpdate = videosClaseOnlineRepository.findAll().size();
        videosClaseOnline.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVideosClaseOnlineMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(videosClaseOnline))
            )
            .andExpect(status().isBadRequest());

        // Validate the VideosClaseOnline in the database
        List<VideosClaseOnline> videosClaseOnlineList = videosClaseOnlineRepository.findAll();
        assertThat(videosClaseOnlineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVideosClaseOnline() throws Exception {
        int databaseSizeBeforeUpdate = videosClaseOnlineRepository.findAll().size();
        videosClaseOnline.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVideosClaseOnlineMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(videosClaseOnline))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VideosClaseOnline in the database
        List<VideosClaseOnline> videosClaseOnlineList = videosClaseOnlineRepository.findAll();
        assertThat(videosClaseOnlineList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVideosClaseOnline() throws Exception {
        // Initialize the database
        videosClaseOnlineRepository.saveAndFlush(videosClaseOnline);

        int databaseSizeBeforeDelete = videosClaseOnlineRepository.findAll().size();

        // Delete the videosClaseOnline
        restVideosClaseOnlineMockMvc
            .perform(delete(ENTITY_API_URL_ID, videosClaseOnline.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VideosClaseOnline> videosClaseOnlineList = videosClaseOnlineRepository.findAll();
        assertThat(videosClaseOnlineList).hasSize(databaseSizeBeforeDelete - 1);
    }
}

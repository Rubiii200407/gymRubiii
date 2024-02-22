package com.gymruben.es.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.gymruben.es.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VideosPlanEntrenamientoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VideosPlanEntrenamiento.class);
        VideosPlanEntrenamiento videosPlanEntrenamiento1 = new VideosPlanEntrenamiento();
        videosPlanEntrenamiento1.setId(1L);
        VideosPlanEntrenamiento videosPlanEntrenamiento2 = new VideosPlanEntrenamiento();
        videosPlanEntrenamiento2.setId(videosPlanEntrenamiento1.getId());
        assertThat(videosPlanEntrenamiento1).isEqualTo(videosPlanEntrenamiento2);
        videosPlanEntrenamiento2.setId(2L);
        assertThat(videosPlanEntrenamiento1).isNotEqualTo(videosPlanEntrenamiento2);
        videosPlanEntrenamiento1.setId(null);
        assertThat(videosPlanEntrenamiento1).isNotEqualTo(videosPlanEntrenamiento2);
    }
}

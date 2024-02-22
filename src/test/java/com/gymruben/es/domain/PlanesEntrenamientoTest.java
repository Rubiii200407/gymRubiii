package com.gymruben.es.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.gymruben.es.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PlanesEntrenamientoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlanesEntrenamiento.class);
        PlanesEntrenamiento planesEntrenamiento1 = new PlanesEntrenamiento();
        planesEntrenamiento1.setId(1L);
        PlanesEntrenamiento planesEntrenamiento2 = new PlanesEntrenamiento();
        planesEntrenamiento2.setId(planesEntrenamiento1.getId());
        assertThat(planesEntrenamiento1).isEqualTo(planesEntrenamiento2);
        planesEntrenamiento2.setId(2L);
        assertThat(planesEntrenamiento1).isNotEqualTo(planesEntrenamiento2);
        planesEntrenamiento1.setId(null);
        assertThat(planesEntrenamiento1).isNotEqualTo(planesEntrenamiento2);
    }
}

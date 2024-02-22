package com.gymruben.es.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.gymruben.es.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PlanesNutricionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlanesNutricion.class);
        PlanesNutricion planesNutricion1 = new PlanesNutricion();
        planesNutricion1.setId(1L);
        PlanesNutricion planesNutricion2 = new PlanesNutricion();
        planesNutricion2.setId(planesNutricion1.getId());
        assertThat(planesNutricion1).isEqualTo(planesNutricion2);
        planesNutricion2.setId(2L);
        assertThat(planesNutricion1).isNotEqualTo(planesNutricion2);
        planesNutricion1.setId(null);
        assertThat(planesNutricion1).isNotEqualTo(planesNutricion2);
    }
}

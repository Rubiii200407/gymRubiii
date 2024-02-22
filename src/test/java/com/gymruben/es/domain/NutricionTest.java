package com.gymruben.es.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.gymruben.es.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class NutricionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Nutricion.class);
        Nutricion nutricion1 = new Nutricion();
        nutricion1.setId(1L);
        Nutricion nutricion2 = new Nutricion();
        nutricion2.setId(nutricion1.getId());
        assertThat(nutricion1).isEqualTo(nutricion2);
        nutricion2.setId(2L);
        assertThat(nutricion1).isNotEqualTo(nutricion2);
        nutricion1.setId(null);
        assertThat(nutricion1).isNotEqualTo(nutricion2);
    }
}

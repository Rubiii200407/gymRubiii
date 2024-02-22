package com.gymruben.es.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.gymruben.es.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class IncripcionesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Incripciones.class);
        Incripciones incripciones1 = new Incripciones();
        incripciones1.setId(1L);
        Incripciones incripciones2 = new Incripciones();
        incripciones2.setId(incripciones1.getId());
        assertThat(incripciones1).isEqualTo(incripciones2);
        incripciones2.setId(2L);
        assertThat(incripciones1).isNotEqualTo(incripciones2);
        incripciones1.setId(null);
        assertThat(incripciones1).isNotEqualTo(incripciones2);
    }
}

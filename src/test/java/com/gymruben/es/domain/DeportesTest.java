package com.gymruben.es.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.gymruben.es.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DeportesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Deportes.class);
        Deportes deportes1 = new Deportes();
        deportes1.setId(1L);
        Deportes deportes2 = new Deportes();
        deportes2.setId(deportes1.getId());
        assertThat(deportes1).isEqualTo(deportes2);
        deportes2.setId(2L);
        assertThat(deportes1).isNotEqualTo(deportes2);
        deportes1.setId(null);
        assertThat(deportes1).isNotEqualTo(deportes2);
    }
}

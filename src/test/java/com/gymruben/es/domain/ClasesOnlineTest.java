package com.gymruben.es.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.gymruben.es.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ClasesOnlineTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ClasesOnline.class);
        ClasesOnline clasesOnline1 = new ClasesOnline();
        clasesOnline1.setId(1L);
        ClasesOnline clasesOnline2 = new ClasesOnline();
        clasesOnline2.setId(clasesOnline1.getId());
        assertThat(clasesOnline1).isEqualTo(clasesOnline2);
        clasesOnline2.setId(2L);
        assertThat(clasesOnline1).isNotEqualTo(clasesOnline2);
        clasesOnline1.setId(null);
        assertThat(clasesOnline1).isNotEqualTo(clasesOnline2);
    }
}

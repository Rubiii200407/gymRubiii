package com.gymruben.es.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.gymruben.es.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VideosClaseOnlineTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VideosClaseOnline.class);
        VideosClaseOnline videosClaseOnline1 = new VideosClaseOnline();
        videosClaseOnline1.setId(1L);
        VideosClaseOnline videosClaseOnline2 = new VideosClaseOnline();
        videosClaseOnline2.setId(videosClaseOnline1.getId());
        assertThat(videosClaseOnline1).isEqualTo(videosClaseOnline2);
        videosClaseOnline2.setId(2L);
        assertThat(videosClaseOnline1).isNotEqualTo(videosClaseOnline2);
        videosClaseOnline1.setId(null);
        assertThat(videosClaseOnline1).isNotEqualTo(videosClaseOnline2);
    }
}

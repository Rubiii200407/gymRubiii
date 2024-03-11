package com.gymruben.es.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gymruben.es.repository.VideosClaseOnlineRepository;
@Service
public class VideosClaseOnlineService {

    @Autowired
    private VideosClaseOnlineRepository videosClaseOnlineRepository;

    @Autowired
     public VideosClaseOnlineService(VideosClaseOnlineRepository videosClaseOnlineRepository) {
        this.videosClaseOnlineRepository = videosClaseOnlineRepository;
    }
 
}



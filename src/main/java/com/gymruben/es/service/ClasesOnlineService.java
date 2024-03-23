package com.gymruben.es.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.gymruben.es.domain.ClasesOnline;
import com.gymruben.es.domain.User;
import com.gymruben.es.domain.VideosClaseOnline;
import com.gymruben.es.repository.ClasesOnlineRepository;
import com.gymruben.es.repository.UserRepository;
import com.gymruben.es.repository.VideosClaseOnlineRepository;
import com.gymruben.es.service.mapper.ClasesOnlineMapper;

@Service
public class ClasesOnlineService {
    private static final String ENTITY_NAME = "clasesOnline";
    @Autowired
    private ClasesOnlineRepository clasesOnlineRepository;

    @Autowired
    private VideosClaseOnlineRepository videosClaseOnlineRepository;

    @Autowired
    private ClasesOnlineMapper clasesOnlineMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public ClasesOnlineService(ClasesOnlineRepository clasesOnlineRepository,VideosClaseOnlineRepository videosClaseOnlineRepository,UserRepository userRepository) {
        this.clasesOnlineRepository = clasesOnlineRepository;
        this.videosClaseOnlineRepository = videosClaseOnlineRepository;
        this.userRepository = userRepository;
    }

     public ClasesOnline createClasesOnline(ClasesOnline clasesOnline){
        if(clasesOnline.getId()!=null){
         
        }
        String uuid=UUID.randomUUID().toString();
        clasesOnline.setCodigo(uuid);
        String nombreClase= clasesOnline.getNombreClase();
        Optional<VideosClaseOnline>videoClaseOptional=videosClaseOnlineRepository.findByTituloVideo(nombreClase);

        if (videoClaseOptional.isPresent()) {
            VideosClaseOnline videoClase = videoClaseOptional.get();
            clasesOnline.setVideoId(videoClase.getUrlVideo());
        }
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        String username= authentication.getName();
        User user= userRepository.findOneByLogin(username).orElseThrow(()->new UsernameNotFoundException(""));
        clasesOnline.setUser(user);
        return clasesOnlineRepository.save(clasesOnline);

            
        }


    }
  
    

